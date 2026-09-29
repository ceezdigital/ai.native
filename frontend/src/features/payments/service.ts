import { env } from "@/lib/env";
import { db } from "@/lib/db";
import { confirmBookingAndClaimSeat, findBookingById } from "@/features/bookings";
import { confirmMembership, findMembershipById, COMMUNITY_TIER_PRICING_KES } from "@/features/community";
import { runInlineOrEnqueue } from "@/features/jobs";
import { getTransactionStatus, submitOrder } from "./pesapalClient";
import { createPendingPayment, findPaymentByTrackingId, markPaymentConfirmed, markPaymentFailed } from "./repository";

const CLONE_CAMP_PRICE_KES = 10_000;

export async function startCheckout(bookingId: string) {
  const booking = await findBookingById(bookingId);
  if (!booking) throw new Error(`No booking found for id ${bookingId}`);

  if (booking.payment) {
    // Checkout already started for this booking — send them back to the
    // same Pesapal order instead of creating a duplicate one.
    const status = await getTransactionStatus(booking.payment.pesapalOrderTrackingId);
    if (status.payment_status_description !== "FAILED" && status.payment_status_description !== "INVALID") {
      return booking.payment.pesapalOrderTrackingId;
    }
  }

  const order = await submitOrder({
    merchantReference: booking.id,
    amount: CLONE_CAMP_PRICE_KES,
    currency: "KES",
    description: "Ai-Nativ Clone Camp — Cohort One",
    callbackUrl: `${env.appUrl}/api/checkout/callback`,
    billingEmail: booking.attendeeEmail,
    billingPhone: booking.attendeePhone,
  });

  await createPendingPayment(booking.id, null, order.order_tracking_id, order.merchant_reference, CLONE_CAMP_PRICE_KES, "KES");

  return order.redirect_url;
}

export async function startCommunityCheckout(membershipId: string) {
  const membership = await findMembershipById(membershipId);
  if (!membership) throw new Error(`No membership found for id ${membershipId}`);

  if (membership.payment) {
    const status = await getTransactionStatus(membership.payment.pesapalOrderTrackingId);
    if (status.payment_status_description !== "FAILED" && status.payment_status_description !== "INVALID") {
      return membership.payment.pesapalOrderTrackingId;
    }
  }

  const amount = COMMUNITY_TIER_PRICING_KES[membership.tier as keyof typeof COMMUNITY_TIER_PRICING_KES];
  if (!amount) throw new Error(`No price configured for community tier "${membership.tier}"`);

  const order = await submitOrder({
    merchantReference: membership.id,
    amount,
    currency: "KES",
    description: `Ai-Nativ Community — ${membership.tier}`,
    callbackUrl: `${env.appUrl}/api/checkout/callback`,
    billingEmail: membership.memberEmail,
    billingPhone: membership.memberPhone,
  });

  await createPendingPayment(null, membership.id, order.order_tracking_id, order.merchant_reference, amount, "KES");

  return order.redirect_url;
}

async function handleConfirmedBookingPayment(payment: NonNullable<Awaited<ReturnType<typeof findPaymentByTrackingId>>>) {
  if (!payment.bookingId || !payment.booking) return null;

  if (payment.booking.status === "confirmed" || payment.booking.status === "overbooked") {
    return { status: payment.booking.status };
  }

  const { booking, overbooked } = await confirmBookingAndClaimSeat(payment.bookingId, payment.booking.cohortId);

  if (overbooked) {
    await runInlineOrEnqueue("gmail_send", {
      to: env.ownerAlertEmail,
      subject: "Ai-Nativ — overbooked seat needs manual review",
      bodyText: `Booking ${booking.id} (${booking.attendeeName}, ${booking.attendeeEmail}) paid after the cohort filled. Resolve manually: extra seat, refund, or move to the next cohort.`,
    });
    return { status: "overbooked" as const };
  }

  const cohort = await db.cohort.findUniqueOrThrow({ where: { id: payment.booking.cohortId } });

  await Promise.all([
    runInlineOrEnqueue("sheets_sync", {
      kind: "booking_confirmed",
      bookingId: booking.id,
      attendeeName: booking.attendeeName,
      attendeeEmail: booking.attendeeEmail,
      attendeePhone: booking.attendeePhone,
      cohortLabel: cohort.label,
      amount: `${payment.amount} ${payment.currency}`,
    }),
    runInlineOrEnqueue("gmail_send", {
      to: booking.attendeeEmail,
      subject: "You're confirmed for Ai-Nativ Clone Camp",
      bodyText: `Hi ${booking.attendeeName}, your seat for ${cohort.label} is confirmed. See you there.`,
    }),
    runInlineOrEnqueue("calendar_update", {
      cohortId: cohort.id,
      calendarEventId: cohort.calendarEventId,
      cohortLabel: cohort.label,
      eventDate: cohort.eventDate.toISOString().slice(0, 10),
      seatsConfirmed: cohort.seatsConfirmed,
      seatCap: cohort.seatCap,
    }),
  ]);

  return { status: "confirmed" as const };
}

async function handleConfirmedMembershipPayment(payment: NonNullable<Awaited<ReturnType<typeof findPaymentByTrackingId>>>) {
  if (!payment.membershipId || !payment.membership) return null;

  if (payment.membership.status === "active") {
    return { status: "active" as const };
  }

  const membership = await confirmMembership(payment.membershipId, payment.membership.tier);

  await runInlineOrEnqueue("gmail_send", {
    to: membership.memberEmail,
    subject: "Welcome to the Ai-Nativ Community!",
    bodyText: `Hi ${membership.memberName}, your payment was successful. Join our WhatsApp community here: ${env.communityWhatsappInviteUrl}`,
  });

  return { status: "confirmed" as const };
}

// Called from the Pesapal IPN handler once a tracking id arrives. Pesapal
// doesn't sign the IPN call itself — trust comes from calling back into
// Pesapal's own API with our credentials to fetch the real status, not from
// anything in the inbound request.
export async function confirmPaymentFromCallback(orderTrackingId: string) {
  const status = await getTransactionStatus(orderTrackingId);
  const payment = await findPaymentByTrackingId(orderTrackingId);
  if (!payment) throw new Error(`No payment found for Pesapal order tracking id ${orderTrackingId}`);

  if (status.payment_status_description === "COMPLETED") {
    await markPaymentConfirmed(payment.id, status);

    const bookingResult = await handleConfirmedBookingPayment(payment);
    if (bookingResult) return bookingResult;

    const membershipResult = await handleConfirmedMembershipPayment(payment);
    if (membershipResult) return membershipResult;

    throw new Error(`Payment ${payment.id} is linked to neither a booking nor a membership.`);
  }

  if (status.payment_status_description === "FAILED" || status.payment_status_description === "INVALID") {
    await markPaymentFailed(payment.id, status);
    return { status: "failed" as const };
  }

  // PENDING or REVERSED — leave the record as pending. Pesapal will call
  // the IPN again on a status change; nothing to do yet.
  return { status: "pending" as const };
}

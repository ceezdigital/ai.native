import { env } from "@/lib/env";
import { getOrCreateBooking, confirmBookingAndClaimSeat } from "@/features/bookings";
import { bookingReservedEmail } from "@/features/emails";
import { runInlineOrEnqueue } from "@/features/jobs";
import { db } from "@/lib/db";

function readField(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const phone = readField(formData, "phone");
  const idempotencyKey = readField(formData, "idempotencyKey");

  if (!name || !email || !phone || !idempotencyKey) {
    return Response.redirect(`${env.appUrl}/?error=missing_fields#event`, 302);
  }

  try {
    const pendingBooking = await getOrCreateBooking({ name, email, phone }, idempotencyKey);

    // Payments are on hold while a provider is chosen (Payhero, etc.) —
    // seats are confirmed immediately in the meantime, with an invoice and
    // payment link to follow once that's settled. Revert this once a
    // provider is live: gate confirmation on a real payment again, the way
    // payments/service.ts already does for the Pesapal path.
    const { booking, overbooked } = await confirmBookingAndClaimSeat(pendingBooking.id, pendingBooking.cohortId);

    if (overbooked) {
      await runInlineOrEnqueue("gmail_send", {
        to: env.ownerAlertEmail,
        subject: "Ai-Nativ: overbooked seat needs manual review",
        bodyText: `Booking ${booking.id} (${booking.attendeeName}, ${booking.attendeeEmail}) was confirmed after the cohort filled. Resolve manually: extra seat, or move to the next cohort.`,
      });
    } else {
      const cohort = await db.cohort.findUniqueOrThrow({ where: { id: pendingBooking.cohortId } });
      const emailContent = bookingReservedEmail({
        attendeeName: booking.attendeeName,
        cohortLabel: cohort.label,
        eventDate: cohort.eventDate,
      });

      await Promise.all([
        runInlineOrEnqueue("sheets_sync", {
          kind: "booking_confirmed",
          bookingId: booking.id,
          attendeeName: booking.attendeeName,
          attendeeEmail: booking.attendeeEmail,
          attendeePhone: booking.attendeePhone,
          cohortLabel: cohort.label,
          amount: "Pending, invoice to follow",
        }),
        runInlineOrEnqueue("gmail_send", {
          to: booking.attendeeEmail,
          subject: emailContent.subject,
          bodyText: emailContent.text,
          bodyHtml: emailContent.html,
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
    }

    return Response.redirect(`${env.appUrl}/?status=success#event`, 302);
  } catch (error) {
    console.error("Booking creation failed:", error);
    return Response.redirect(`${env.appUrl}/?error=checkout_failed#event`, 302);
  }
}

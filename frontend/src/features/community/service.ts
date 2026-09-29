import { env } from "@/lib/env";
import { submitOrder, getTransactionStatus } from "@/features/payments/pesapalClient";
import { createPendingPayment } from "@/features/payments/repository";
import { createPendingMembership, findMembershipBySubmissionId, findMembershipById } from "./repository";
import type { TallyWebhookPayload, TallyField } from "@/features/bookings/types";
import type { CommunityTier } from "@prisma/client";

function extractCommunityInfo(fields: TallyField[]) {
  const find = (needle: string) => fields.find((field) => field.label.toLowerCase().includes(needle));

  const name = find("name")?.value;
  const email = find("email")?.value;
  const phone = find("phone")?.value;
  const rawTier = find("plan")?.value || find("tier")?.value || find("subscription")?.value;

  if (typeof name !== "string" || typeof email !== "string" || typeof phone !== "string") {
    throw new Error("Tally submission missing name, email, or phone.");
  }

  let tier: CommunityTier = "monthly";
  const tierString = String(rawTier).toLowerCase();
  
  if (tierString.includes("6") || tierString.includes("six")) {
    tier = "six_month";
  } else if (tierString.includes("annual") || tierString.includes("12") || tierString.includes("year")) {
    tier = "annual";
  }

  return { name, email, phone, tier };
}

export async function getOrCreateMembershipFromTallySubmission(payload: TallyWebhookPayload) {
  const existing = await findMembershipBySubmissionId(payload.data.submissionId);
  if (existing) return existing;

  const info = extractCommunityInfo(payload.data.fields);
  return createPendingMembership(payload.data.submissionId, info.name, info.email, info.phone, info.tier);
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

  let amount = 1000;
  if (membership.tier === "six_month") amount = 5000;
  if (membership.tier === "annual") amount = 9000;

  const order = await submitOrder({
    merchantReference: membership.id,
    amount,
    currency: "KES",
    description: `Ai-Nativ Community - ${membership.tier}`,
    callbackUrl: `${env.appUrl}/api/checkout/callback`,
    billingEmail: membership.memberEmail,
    billingPhone: membership.memberPhone,
  });

  await createPendingPayment(null, membership.id, order.order_tracking_id, order.merchant_reference, amount, "KES");

  return order.redirect_url;
}

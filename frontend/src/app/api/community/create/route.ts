import type { CommunityTier } from "@prisma/client";
import { env } from "@/lib/env";
import { getOrCreateMembership, confirmMembership, COMMUNITY_TIER_LABELS } from "@/features/community";
import { membershipRequestEmail } from "@/features/emails";
import { runInlineOrEnqueue } from "@/features/jobs";

const VALID_TIERS: CommunityTier[] = ["monthly", "six_month", "annual"];

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
  const tierInput = readField(formData, "tier");
  const tier = VALID_TIERS.find((t) => t === tierInput);

  if (!name || !email || !phone || !idempotencyKey || !tier) {
    return Response.redirect(`${env.appUrl}/?error=missing_fields#community`, 302);
  }

  try {
    const pendingMembership = await getOrCreateMembership({ name, email, phone }, idempotencyKey, tier);

    // Payments are on hold while a provider is chosen (Payhero, etc.) —
    // membership is activated immediately in the meantime, with an invoice
    // and WhatsApp invite to follow once that's settled. Revert this once
    // a provider is live: gate activation on a real payment again, the way
    // payments/service.ts already does for the Pesapal path.
    const membership = await confirmMembership(pendingMembership.id, tier);

    const tierLabel = COMMUNITY_TIER_LABELS[tier];
    const emailContent = membershipRequestEmail({ memberName: membership.memberName, tierLabel });

    await Promise.all([
      runInlineOrEnqueue("sheets_sync", {
        kind: "membership_confirmed",
        membershipId: membership.id,
        memberName: membership.memberName,
        memberEmail: membership.memberEmail,
        memberPhone: membership.memberPhone,
        tierLabel,
        amount: "Pending, invoice to follow",
      }),
      runInlineOrEnqueue("gmail_send", {
        to: membership.memberEmail,
        subject: emailContent.subject,
        bodyText: emailContent.text,
        bodyHtml: emailContent.html,
      }),
    ]);

    return Response.redirect(`${env.appUrl}/?status=success#community`, 302);
  } catch (error) {
    console.error("Membership creation failed:", error);
    return Response.redirect(`${env.appUrl}/?error=checkout_failed#community`, 302);
  }
}

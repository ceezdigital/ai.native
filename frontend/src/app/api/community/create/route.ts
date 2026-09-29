import type { CommunityTier } from "@prisma/client";
import { env } from "@/lib/env";
import { getOrCreateMembership } from "@/features/community";
import { confirmMembership } from "@/features/community/repository";
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
    
    // TEMPORARY: Bypass payments for presentation
    const membership = await confirmMembership(pendingMembership.id, tier);

    await runInlineOrEnqueue("gmail_send", {
      to: membership.memberEmail,
      subject: "Welcome to the Ai-Nativ Community!",
      bodyText: `Hi ${membership.memberName}, your payment was successful. Join our WhatsApp community here: ${env.communityWhatsappInviteUrl}`,
    });

    return Response.redirect(`${env.appUrl}/?status=success#community`, 302);
  } catch (error) {
    console.error("Membership creation/checkout failed:", error);
    return Response.redirect(`${env.appUrl}/?error=checkout_failed#community`, 302);
  }
}

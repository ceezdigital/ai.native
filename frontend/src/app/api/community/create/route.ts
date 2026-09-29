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
      bodyText: `Hi ${membership.memberName}, we've received your membership request. We'll send you an invoice and your WhatsApp invite link shortly.`,
      bodyHtml: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0c10; color: #c5c6c7; border-radius: 8px; overflow: hidden; border: 1px solid #1f2833;">
          <div style="background-color: #1f2833; padding: 24px; text-align: center; border-bottom: 1px solid #d4af37;">
            <h1 style="margin: 0; color: #d4af37; font-family: Georgia, serif; font-size: 28px;">Ai-Nativ</h1>
          </div>
          <div style="padding: 32px; line-height: 1.6;">
            <h2 style="margin-top: 0; color: #ffffff; font-weight: normal;">Membership Request Received</h2>
            <p>Hi ${membership.memberName},</p>
            <p>Thank you for requesting to join the Ai-Nativ Community!</p>
            <p>We are currently onboarding new members for this quarter. We will follow up shortly with your official invoice and your private invite link to the WhatsApp group.</p>
            <p>Your spot in the community is reserved in the meantime.</p>
            <br>
            <p style="color: #d4af37;">Welcome aboard,<br><strong>The Ai-Nativ Team</strong></p>
          </div>
        </div>
      `
    });

    return Response.redirect(`${env.appUrl}/?status=success#community`, 302);
  } catch (error) {
    console.error("Membership creation/checkout failed:", error);
    return Response.redirect(`${env.appUrl}/?error=checkout_failed#community`, 302);
  }
}

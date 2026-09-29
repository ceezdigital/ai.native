import { EMAIL_COLORS } from "./constants";
import { renderEmailShell } from "./shell";

export type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

type BookingReservedInput = {
  attendeeName: string;
  cohortLabel: string;
  eventDate: Date;
};

export function bookingReservedEmail({ attendeeName, cohortLabel, eventDate }: BookingReservedInput): EmailContent {
  const dateLabel = eventDate.toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const ink = EMAIL_COLORS.ink;

  const html = renderEmailShell({
    preheaderText: `Your seat for ${cohortLabel} is reserved — invoice and payment link to follow.`,
    eyebrow: "Clone Camp · Seat Reserved",
    heading: "You're on the list.",
    bodyHtml: `
      <p style="margin:0 0 16px; color:${ink};">Hi ${attendeeName},</p>
      <p style="margin:0 0 16px;">Your seat for <strong style="color:${ink};">${cohortLabel}</strong> is reserved — <strong style="color:${ink};">${dateLabel}</strong>.</p>
      <p style="margin:0 0 16px;">We're finalizing the roster for this cohort. We'll follow up directly with your official invoice and a secure payment link as the event approaches — you don't need to do anything else for now.</p>
      <p style="margin:0;">See you there,<br /><strong style="color:${ink};">The Ai-Nativ Team</strong></p>
    `,
  });

  const text = `Hi ${attendeeName},

Your seat for ${cohortLabel} is reserved — ${dateLabel}.

We're finalizing the roster for this cohort. We'll follow up directly with your official invoice and a secure payment link as the event approaches — you don't need to do anything else for now.

See you there,
The Ai-Nativ Team`;

  return { subject: `You're on the list — Ai-Nativ Clone Camp`, html, text };
}

type MembershipRequestInput = {
  memberName: string;
  tierLabel: string;
};

export function membershipRequestEmail({ memberName, tierLabel }: MembershipRequestInput): EmailContent {
  const ink = EMAIL_COLORS.ink;

  const html = renderEmailShell({
    preheaderText: "Your Ai-Nativ Community membership request is in — invoice and WhatsApp invite to follow.",
    eyebrow: "Ai-Nativ Community",
    heading: "Welcome aboard.",
    bodyHtml: `
      <p style="margin:0 0 16px; color:${ink};">Hi ${memberName},</p>
      <p style="margin:0 0 16px;">Thanks for requesting to join the Ai-Nativ Community on the <strong style="color:${ink};">${tierLabel}</strong> plan.</p>
      <p style="margin:0 0 16px;">We're onboarding new members this quarter. We'll follow up shortly with your official invoice and your private invite link to the WhatsApp group — your spot is reserved in the meantime.</p>
      <p style="margin:0;">Welcome aboard,<br /><strong style="color:${ink};">The Ai-Nativ Team</strong></p>
    `,
  });

  const text = `Hi ${memberName},

Thanks for requesting to join the Ai-Nativ Community on the ${tierLabel} plan.

We're onboarding new members this quarter. We'll follow up shortly with your official invoice and your private invite link to the WhatsApp group — your spot is reserved in the meantime.

Welcome aboard,
The Ai-Nativ Team`;

  return { subject: "Welcome to the Ai-Nativ Community", html, text };
}

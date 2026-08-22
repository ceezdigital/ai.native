export type OfferCard = {
  title: string;
  anchor: string;
  lead: string;
  leadStrong: string;
  bullets: string[];
  ctaLabel: string;
  meta?: string;
  featured?: boolean;
};

export const OFFERS_HEADING = "Get Cloned, Stay Sharp, or Have It Run For You";
export const OFFERS_LEDE =
  "Every comparable in this market sells understanding. Ai-Nativ sells possession: a tangible, personal, shareable asset, whichever path you take.";

export const OFFERS_CONTENT: OfferCard[] = [
  {
    title: "Clone Camp",
    anchor: "#event",
    lead: "Get cloned once, live, in one Saturday. ",
    leadStrong: "Leave with headshots, a voice, and a brand, not notes.",
    bullets: [
      "Four-angle headshots + motion clips from the booth",
      "A cloned voice, captured reading your own script",
      "Brand voice script + intake brief, built live inside Claude",
      "A 30-day content roadmap, mapped out before you leave",
      "Hands-on training: AI copywriting, posting, prompts, trend-scouting",
      "Starter kit + viral hook and post template library",
      "3 months free in the Ai-Nativ community",
    ],
    ctaLabel: "Reserve your seat",
    meta: "50 seats · Cohort One · Ksh 10,000",
  },
  {
    title: "Ai-Nativ Community",
    anchor: "#community",
    lead: "Your learning doesn't stop when Clone Camp ends. ",
    leadStrong: "Continued guidance on WhatsApp, where everybody already is.",
    bullets: [
      "Continued guidance after the event, so you're never building alone",
      "Built on WhatsApp, no new app to check",
      "Community calls, open floor, regular touchpoints",
      "Expert sessions with outside voices",
      "Office hours, the session people renew to keep",
      "Capped at 1,020 members, high-signal by design",
      "3 months free for every Clone Camp attendee",
      "Ksh 1,000/mo after the trial · save on 6 or 12 months packages",
    ],
    ctaLabel: "Join the community",
    meta: "From Ksh 1,000/month",
    featured: true,
  },
  {
    title: "Done-For-You",
    anchor: "#retainer",
    lead: "Skip the shoot, not the presence. ",
    leadStrong: "Ai-Nativ Labs runs your content off the clone you already built.",
    bullets: [
      "14 Reels, 2 LinkedIn posts, and a newsletter, every week",
      "Photo variations generated on demand from your clone",
      "DM automation, lead magnets, and a WhatsApp channel included",
      "Built for founders ready to scale their brand and business with content, without being in front of the camera daily",
    ],
    ctaLabel: "Talk to Ai-Nativ Labs",
  },
];

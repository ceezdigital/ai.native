import type { ValueStackItem } from "@/features/shared";

export const COMMUNITY_HEADING = "The Ai-Nativ Community";

export const COMMUNITY_LEDE =
  "Clone Camp gets you built in one Saturday. The community is where the guidance continues, a WhatsApp space with other Ai-Nativ Founders doing the same work, so building doesn't go back to being a solo project once the event ends. 3 months free with every Clone Camp ticket. After the trial, it's Ksh 1,000/mo, or save on the 6 or 12 month packages.";

export const COMMUNITY_ITEMS: ValueStackItem[] = [
  {
    title: "Continued guidance after the event",
    body: "Clone Camp hands you the system in a day. Turning it into a habit takes longer than a day, and this is where you keep getting steered while it does.",
  },
  {
    title: "Other Ai-Nativ Founders, same journey",
    body: "Everyone in the space built their clone the same way you did and is running the same 30-day roadmap. You're not the only one figuring this out in real time.",
  },
  {
    title: "Somewhere to ask, not just watch",
    body: "Questions about your content, your roadmap, or what isn't working get answered inside the group, not saved for a future cohort.",
  },
  {
    title: "Updates as the tools change",
    body: "AI tools move fast. New workflows and prompts get shared with the group as they prove useful, not held back for a future paid course.",
  },
];

// Matches the Prisma CommunityTier enum's string values — kept as a plain
// union here (not imported from @prisma/client) so this presentation file
// doesn't depend on generated backend types.
export type PurchasableTier = "monthly" | "six_month" | "annual";

export type PricingTier = {
  name: string;
  price: string;
  amount: number;
  note: string;
  featured?: boolean;
  muted?: boolean;
  tag?: string;
  tier: PurchasableTier | null;
};

export const COMMUNITY_TIERS: PricingTier[] = [
  {
    name: "Event Ticket",
    price: "10,000",
    amount: 10_000,
    note: "Included with your Clone Camp ticket",
    muted: true,
    tier: null,
  },
  {
    name: "Monthly",
    price: "1,000",
    amount: 1_000,
    note: "Full ongoing programming",
    featured: true,
    tag: "Most flexible",
    tier: "monthly",
  },
  { name: "6 Months", price: "5,000", amount: 5_000, note: "Save 1,000", tier: "six_month" },
  { name: "Annual", price: "9,000", amount: 9_000, note: "Save 3,000", tier: "annual" },
];

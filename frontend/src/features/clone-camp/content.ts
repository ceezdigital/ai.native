import type { ValueStackItem } from "@/features/shared";

export const CLONE_CAMP_LEDE_LEAD =
  "Saturday, 9:00am – 3:00pm. Seated with a number tag, a live group Brand Voice Session while you wait, then a booth: four-angle headshots and a teleprompter read of your own script. ";
export const CLONE_CAMP_LEDE_STRONG =
  "You leave holding a cloned voice, motion content, and headshots, not notes.";

export const CLONE_CAMP_ITEMS: ValueStackItem[] = [
  {
    title: "Cloning booth",
    body: "Four-angle headshot photos, run through image-to-video tools for short, animated motion clips.",
  },
  {
    title: "Cloned voice, on camera",
    body: "Roughly 3 minutes reading your own brand voice script off a teleprompter, targeting about 3 videos' worth of usable material.",
  },
  {
    title: "Brand voice script + intake brief",
    body: "Built live inside Claude during the group session: your real Why, What, How, Who, and Promise, not a generic template.",
  },
  {
    title: "30-day content roadmap",
    body: "A day-by-day posting plan for your first month, built live from your intake brief. You leave with a plan, not just proof.",
  },
  {
    title: "Hands-on training",
    body: "AI copywriting, system design prompts, script generation, posting through Meta Business Tools, and trend-scouting, learned live, post-booth, inside Claude.",
  },
  {
    title: "Lead magnet creation, taught live",
    body: "How to build a high-value lead magnet tied directly to your product, the piece that turns your content into an actual list, not just views.",
  },
  {
    title: "Starter kit + viral template library",
    body: "Brand-from-scratch prompts, viral hook and post templates, thought-leadership carousel templates, and niche-ready content templates to plug in immediately.",
  },
  {
    title: "3 months in the community",
    body: "Free entry into the Ai-Nativ WhatsApp community as part of the ticket.",
  },
  {
    title: "You don't leave with potential",
    body: "You leave with a cloned voice, headshots, motion content, a brand voice script, a 30-day content roadmap, a lead magnet, and a viral template library. All of it built, none of it theoretical.",
    isClosing: true,
  },
];

export const CLONE_CAMP_PRICE = {
  label: "Clone Camp · Cohort One",
  amount: "10,000",
  currency: "Ksh",
  note: "50 seats. Saturday, 9:00am–3:00pm. Every comparable in this market sells understanding. This sells a tangible, personal, shareable asset.",
  ctaLabel: "Reserve your seat",
};

export const CLONE_CAMP_META = [
  { label: "Format", value: "In-person, Nairobi" },
  { label: "Capacity", value: "50 seats" },
  { label: "Includes", value: "3 months community" },
];

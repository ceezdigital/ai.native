export type HeroStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type SubheadPart = {
  text: string;
  emphasis?: boolean;
};

export const HERO_HEADLINE_LEAD = "You stop being the bottleneck. ";
export const HERO_HEADLINE_EMPHASIS = "Your brand gets ";
export const HERO_FLOURISH_WORD = "amplified";

export const HERO_SUBHEAD_PARTS: SubheadPart[] = [
  {
    text: "Ai-Nativ Founders don't have time to be creators, so AI does the work: your brand gets amplified. Clone Camp is where you build your digital twin once, live in one Saturday in Nairobi: ",
  },
  { text: "LinkedIn-ready headshots", emphasis: true },
  { text: ", plus " },
  { text: "a cloned voice", emphasis: true },
  { text: " and " },
  { text: "a 30-day content roadmap", emphasis: true },
  { text: ". Leave with the system, not another course or event notes." },
];

export const HERO_PRIMARY_CTA = { label: "Reserve your seat, Ksh 10,000", href: "#offers" };
export const HERO_SECONDARY_CTA = { label: "See how it works", href: "#why" };

export const HERO_STATS: HeroStat[] = [
  { value: 50, label: "Seats · Cohort One" },
  { value: 3, suffix: " mo", label: "Free Community Access" },
  { value: 1, prefix: "$", suffix: "K", label: "/mo Retainer via Ai-Nativ Labs" },
];

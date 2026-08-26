export const RIBBON_TOP_TEXT = "CLONE CAMP · NAIROBI, KENYA · AI CLONING · CONTENT SYSTEM";
export const RIBBON_BOTTOM_TEXT = "COHORT ONE NOW BOOKING · 50 SEATS";

export type ProofStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const PROOF_STATS: ProofStat[] = [
  { value: 50, label: "Seats · Cohort One" },
  { value: 3, suffix: " mo", label: "Free Community Access" },
  { value: 6, suffix: " hrs", label: "Hands-On, One Saturday" },
];

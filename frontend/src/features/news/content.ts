export type NewsEntry = {
  category: string;
  headline: string;
  timestamp: string;
};

export const NEWS_HEADING = "Running commentary, not just an event brand";

export const NEWS_LEDE =
  "Ongoing AI and tech news coverage keeps Nativ in the feed between cohorts, the same proof of first mover the @ai.nativ account has been building since March.";

/**
 * Placeholder entries (see doc section 9, "Open / Not Yet Decided"). These
 * follow the approved pattern: category tag, headline, relative timestamp.
 */
export const NEWS_ENTRIES: NewsEntry[] = [
  {
    category: "Tooling",
    headline: "What the newest Claude release actually changes for solo founders",
    timestamp: "2H AGO",
  },
  {
    category: "Field Notes",
    headline: "Cloning your own voice: what a clean 60-second sample actually needs",
    timestamp: "1D AGO",
  },
  {
    category: "Market",
    headline: "Nairobi's AI-teaching market is selling knowledge. Here's why that's the gap",
    timestamp: "2D AGO",
  },
  {
    category: "Playbook",
    headline: "Meta Business Tools, explained the way we teach it at the booth",
    timestamp: "4D AGO",
  },
];

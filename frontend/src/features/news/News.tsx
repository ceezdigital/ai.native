import type { ReactNode } from "react";
import { SectionHeading } from "@/features/shared";
import { NEWS_ENTRIES, NEWS_HEADING, NEWS_LEDE } from "./content";
import styles from "./News.module.css";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  Tooling: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "Field Notes": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  ),
  Market: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  ),
  Playbook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

export function News() {
  return (
    <section id="news" className="container">
      <SectionHeading heading={NEWS_HEADING} lede={NEWS_LEDE} />

      <div className={styles.shell}>
        <div className={styles.head}>
          <div className={styles.brand}>Ai-Nativ / DAILY BRIEF</div>
          <div className={styles.live}>
            <span className={styles.pulse} /> LIVE COVERAGE
          </div>
        </div>
        <div className={styles.list}>
          {NEWS_ENTRIES.map((entry) => (
            <div key={entry.headline} className={styles.row}>
              <span className={styles.category}>
                {CATEGORY_ICONS[entry.category]}
                {entry.category}
              </span>
              <span className={styles.title}>{entry.headline}</span>
              <span className={styles.time}>{entry.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

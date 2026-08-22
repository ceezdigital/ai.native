import { SectionHeading } from "@/features/shared";
import { NEWS_ENTRIES, NEWS_HEADING, NEWS_LEDE } from "./content";
import styles from "./News.module.css";

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
              <span className={styles.category}>{entry.category}</span>
              <span className={styles.title}>{entry.headline}</span>
              <span className={styles.time}>{entry.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

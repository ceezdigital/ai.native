import { GlassCard, SectionHeading } from "@/features/shared";
import { WHY_CARDS, WHY_HEADING, WHY_LEDE } from "./content";
import styles from "./Why.module.css";

const ICONS = [
  <svg key="visibility" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  <svg key="camera" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>,
  <svg key="asset" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8l-9-5-9 5 9 5 9-5z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </svg>,
];

export function Why() {
  return (
    <section id="why" className={`${styles.section} container`}>
      <span className={styles.watermark} aria-hidden="true">
        03
      </span>

      <SectionHeading heading={WHY_HEADING} lede={WHY_LEDE} />

      <div className={styles.grid}>
        {WHY_CARDS.map((card, index) => (
          <GlassCard key={card.title} className={styles.card}>
            <div className={styles.icon}>{ICONS[index]}</div>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.body}>{card.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

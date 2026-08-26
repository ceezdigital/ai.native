import { Button, SectionHeading, ValueStack } from "@/features/shared";
import type { ValueStackItem } from "@/features/shared";
import {
  DFY_HEADING,
  DFY_KICKER,
  DFY_PARAGRAPH_ONE_LEAD,
  DFY_PARAGRAPH_ONE_STRONG,
  DFY_PARAGRAPH_TWO,
  RETAINER_HEADING,
  RETAINER_ITEMS,
  RETAINER_LEDE,
  RETAINER_PRICE_CARD,
  RETAINER_QUALIFIER_PARAGRAPHS,
  RETAINER_TURN_LEAD,
  RETAINER_TURN_REST,
} from "./content";
import styles from "./Retainer.module.css";

const RETAINER_ICONS = [
  <svg key="reels" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="graphics" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>,
  <svg key="youtube" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="linkedin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 6l-9.5 9.5-5-5L1 18" />
    <path d="M17 6h6v6" />
  </svg>,
  <svg key="camera" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>,
  <svg key="newsletter" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>,
  <svg key="dm" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>,
  <svg key="magnet" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v9a6 6 0 0 0 12 0V3" />
    <path d="M6 3H3v3h3" />
    <path d="M18 3h3v3h-3" />
  </svg>,
  <svg key="whatsapp" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12h.01M12 12h.01M16 12h.01" />
    <path d="M21 12c0 4.97-4.03 9-9 9-1.49 0-2.89-.36-4.13-1L3 21l1.09-3.27A8.96 8.96 0 0 1 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" />
  </svg>,
  <svg key="dashboard" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>,
];

const RETAINER_ITEMS_WITH_ICONS: ValueStackItem[] = RETAINER_ITEMS.map((item, index) => ({
  ...item,
  icon: RETAINER_ICONS[index],
}));

export function Retainer() {
  return (
    <section id="retainer" className="container">
      <SectionHeading heading={RETAINER_HEADING} lede={RETAINER_LEDE} />

      <div className={styles.copy}>
        {RETAINER_QUALIFIER_PARAGRAPHS.map((line) => (
          <div key={line} className={styles.qualifierRow}>
            <span className={styles.markNo} aria-hidden="true">
              ✕
            </span>
            <p>{line}</p>
          </div>
        ))}
        <div className={styles.qualifierRow}>
          <span className={styles.markYes} aria-hidden="true">
            ✓
          </span>
          <p>
            <strong>{RETAINER_TURN_LEAD}</strong>
            {RETAINER_TURN_REST}
          </p>
        </div>
      </div>

      <div className={styles.dfy}>
        <div className={styles.dfyHead}>
          <span className={styles.dfyIcon} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </span>
          <div>
            <span className={styles.dfyKicker}>{DFY_KICKER}</span>
            <h3 className={styles.dfyHeading}>{DFY_HEADING}</h3>
          </div>
        </div>
        <p>
          {DFY_PARAGRAPH_ONE_LEAD}
          <strong className={styles.dfyStrong}>{DFY_PARAGRAPH_ONE_STRONG}</strong>
        </p>
        <p>{DFY_PARAGRAPH_TWO}</p>
      </div>

      <div className={styles.layout}>
        <div>
          <ValueStack items={RETAINER_ITEMS_WITH_ICONS} />
        </div>

        <div className={styles.priceCard}>
          <span className={styles.priceLabel}>{RETAINER_PRICE_CARD.label}</span>
          <p className={styles.priceNote}>{RETAINER_PRICE_CARD.note}</p>
          <Button href="#" variant="primary" className={styles.priceCta}>
            {RETAINER_PRICE_CARD.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

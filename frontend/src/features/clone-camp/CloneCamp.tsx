import { Button, SectionHeading, ValueStack } from "@/features/shared";
import {
  CLONE_CAMP_ITEMS,
  CLONE_CAMP_LEDE_LEAD,
  CLONE_CAMP_LEDE_STRONG,
  CLONE_CAMP_META,
  CLONE_CAMP_POINTER,
  CLONE_CAMP_PRICE,
  CLONE_CAMP_SEAT_TAG,
} from "./content";
import styles from "./CloneCamp.module.css";

export function CloneCamp() {
  return (
    <section id="event" className="container">
      <SectionHeading
        heading="Clone Camp"
        lede={
          <>
            {CLONE_CAMP_LEDE_LEAD}
            <strong className={styles.ledeStrong}>{CLONE_CAMP_LEDE_STRONG}</strong>
          </>
        }
      />

      <div className={styles.layout}>
        <span className={styles.pointer} aria-hidden="true">
          <span className={styles.pointerLabel}>{CLONE_CAMP_POINTER}</span>
          <svg width="90" height="92" viewBox="0 0 90 92" fill="none">
            <path
              d="M6 4C6 36 18 56 62 84"
              stroke="var(--glow-cyan)"
              strokeWidth="2"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
            <path
              d="M50 78L64 86L60 70"
              stroke="var(--glow-cyan)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>

        <div>
          <ValueStack items={CLONE_CAMP_ITEMS} />
        </div>

        <div className={styles.priceCard}>
          <span className={styles.priceLabel}>{CLONE_CAMP_PRICE.label}</span>
          <div className={styles.priceValue}>
            {CLONE_CAMP_PRICE.amount}
            <span className={styles.priceCurrency}> {CLONE_CAMP_PRICE.currency}</span>
          </div>
          <p className={styles.priceNote}>{CLONE_CAMP_PRICE.note}</p>
          <div className={styles.seatTag}>
            <span className={styles.seatDot} aria-hidden="true" />
            {CLONE_CAMP_SEAT_TAG}
          </div>
          <Button href="#" variant="primary" className={styles.priceCta}>
            {CLONE_CAMP_PRICE.ctaLabel}
          </Button>
          <div className={styles.priceMeta}>
            {CLONE_CAMP_META.map((row) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

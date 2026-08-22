import { Button, SectionHeading, ValueStack } from "@/features/shared";
import {
  CLONE_CAMP_ITEMS,
  CLONE_CAMP_LEDE_LEAD,
  CLONE_CAMP_LEDE_STRONG,
  CLONE_CAMP_META,
  CLONE_CAMP_PRICE,
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

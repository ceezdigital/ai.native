import { Button, SectionHeading, ValueStack } from "@/features/shared";
import {
  DFY_HEADING,
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

export function Retainer() {
  return (
    <section id="retainer" className="container">
      <SectionHeading heading={RETAINER_HEADING} lede={RETAINER_LEDE} />

      <div className={styles.copy}>
        {RETAINER_QUALIFIER_PARAGRAPHS.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>
          <strong>{RETAINER_TURN_LEAD}</strong>
          {RETAINER_TURN_REST}
        </p>
      </div>

      <div className={styles.dfy}>
        <h3 className={styles.dfyHeading}>{DFY_HEADING}</h3>
        <p>
          {DFY_PARAGRAPH_ONE_LEAD}
          <strong className={styles.dfyStrong}>{DFY_PARAGRAPH_ONE_STRONG}</strong>
        </p>
        <p>{DFY_PARAGRAPH_TWO}</p>
      </div>

      <div className={styles.layout}>
        <div>
          <ValueStack items={RETAINER_ITEMS} />
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

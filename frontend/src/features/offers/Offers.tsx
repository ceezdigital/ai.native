"use client";

import { useRevealOnScroll } from "@/lib/hooks";
import { Button, SectionHeading } from "@/features/shared";
import { OFFERS_CONTENT, OFFERS_HEADING, OFFERS_LEDE } from "./content";
import styles from "./Offers.module.css";

export function Offers() {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>(0.15);

  return (
    <section id="offers" className="container">
      <SectionHeading heading={OFFERS_HEADING} lede={OFFERS_LEDE} />

      <div ref={ref} className={styles.grid}>
        {OFFERS_CONTENT.map((card, index) => (
          <div
            key={card.title}
            className={`${styles.card} ${card.featured ? styles.featured : ""} ${
              isVisible ? styles.inView : ""
            }`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.lead}>
              {card.lead}
              <strong>{card.leadStrong}</strong>
            </p>
            <ul className={styles.bullets}>
              {card.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Button href={card.anchor} variant="primary" className={styles.cardCta}>
              {card.ctaLabel}
            </Button>
            {card.meta ? <p className={styles.meta}>{card.meta}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

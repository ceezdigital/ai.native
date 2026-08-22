import { GlassCard, SectionHeading } from "@/features/shared";
import { WHY_CARDS, WHY_HEADING, WHY_LEDE } from "./content";
import styles from "./Why.module.css";

export function Why() {
  return (
    <section id="why" className="container">
      <SectionHeading heading={WHY_HEADING} lede={WHY_LEDE} />

      <div className={styles.grid}>
        {WHY_CARDS.map((card) => (
          <GlassCard key={card.title} className={styles.card}>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.body}>{card.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

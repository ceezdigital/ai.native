import { GlassCard, SectionHeading, ValueStack } from "@/features/shared";
import { COMMUNITY_HEADING, COMMUNITY_ITEMS, COMMUNITY_LEDE, COMMUNITY_TIERS } from "./content";
import styles from "./Community.module.css";

export function Community() {
  return (
    <section id="community" className="container">
      <SectionHeading heading={COMMUNITY_HEADING} lede={COMMUNITY_LEDE} />

      <div className={styles.stack}>
        <ValueStack items={COMMUNITY_ITEMS} />
      </div>

      <div className={styles.tiers}>
        {COMMUNITY_TIERS.map((tier) => (
          <GlassCard
            key={tier.name}
            className={`${styles.tier} ${tier.featured ? styles.featured : ""}`}
          >
            <span className={styles.tierName}>{tier.name}</span>
            <div className={styles.tierPrice}>{tier.price}</div>
            <span className={styles.tierSave}>{tier.note}</span>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

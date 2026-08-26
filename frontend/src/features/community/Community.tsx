import { GlassCard, SectionHeading, ValueStack } from "@/features/shared";
import type { ValueStackItem } from "@/features/shared";
import { COMMUNITY_HEADING, COMMUNITY_ITEMS, COMMUNITY_LEDE, COMMUNITY_TIERS } from "./content";
import styles from "./Community.module.css";

const COMMUNITY_ICONS = [
  <svg key="guidance" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>,
  <svg key="founders" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="ask" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
    <circle cx="12" cy="12" r="10" />
  </svg>,
  <svg key="updates" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>,
];

const COMMUNITY_ITEMS_WITH_ICONS: ValueStackItem[] = COMMUNITY_ITEMS.map((item, index) => ({
  ...item,
  icon: COMMUNITY_ICONS[index],
}));

export function Community() {
  return (
    <section id="community" className="container">
      <SectionHeading heading={COMMUNITY_HEADING} lede={COMMUNITY_LEDE} />

      <div className={styles.stack}>
        <ValueStack items={COMMUNITY_ITEMS_WITH_ICONS} />
      </div>

      <div className={styles.tiers}>
        {COMMUNITY_TIERS.map((tier) => (
          <GlassCard
            key={tier.name}
            className={`${styles.tier} ${tier.featured ? styles.featured : ""} ${tier.muted ? styles.muted : ""}`}
          >
            {tier.tag && <span className={styles.tierTag}>{tier.tag}</span>}
            <span className={styles.tierName}>{tier.name}</span>
            <div className={styles.tierPrice}>
              {tier.price}
              <span className={styles.tierCurrency}> Ksh</span>
            </div>
            <span className={styles.tierSave}>{tier.note}</span>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

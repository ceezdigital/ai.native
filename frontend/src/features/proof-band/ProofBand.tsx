import { StatCounter } from "@/features/shared";
import { PROOF_STATS, RIBBON_BOTTOM_TEXT, RIBBON_TOP_TEXT } from "./content";
import styles from "./ProofBand.module.css";

const RIBBON_REPEAT = Array.from({ length: 4 }, (_, index) => index);

export function ProofBand() {
  return (
    <section id="proof" className={styles.section}>
      <div className={styles.ribbon}>
        <div className={`${styles.ribbonStrip} ${styles.ribbonAccent}`}>
          <div className={styles.ribbonTrack}>
            {RIBBON_REPEAT.map((index) => (
              <span key={index} className={styles.ribbonItem}>
                {RIBBON_TOP_TEXT}
              </span>
            ))}
          </div>
        </div>
        <div className={`${styles.ribbonStrip} ${styles.ribbonDark}`}>
          <div className={styles.ribbonTrack}>
            {RIBBON_REPEAT.map((index) => (
              <span key={index} className={styles.ribbonItem}>
                {RIBBON_BOTTOM_TEXT}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.stats} container`}>
        {PROOF_STATS.map((stat) => (
          <StatCounter
            key={stat.label}
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            label={stat.label}
            size="large"
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useCountUp, useRevealOnScroll } from "@/lib/hooks";
import styles from "./StatCounter.module.css";

type StatCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export function StatCounter({ value, prefix = "", suffix = "", label }: StatCounterProps) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>(0.4);
  const displayValue = useCountUp(value, isVisible);

  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.value}>
        {prefix}
        {displayValue}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

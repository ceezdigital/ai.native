"use client";

import { useScrollProgress } from "@/lib/hooks";
import styles from "./ScrollProgressBar.module.css";

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.fill} style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

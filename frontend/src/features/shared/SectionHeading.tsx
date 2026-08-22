"use client";

import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/lib/hooks";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  heading: ReactNode;
  lede?: ReactNode;
};

export function SectionHeading({ heading, lede }: SectionHeadingProps) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>(0.2);

  return (
    <div ref={ref}>
      <div className={`${styles.rule} ${isVisible ? styles.inView : ""}`} />
      <div className={`${styles.head} ${isVisible ? styles.inView : ""}`}>
        <h2 className={styles.title}>{heading}</h2>
        {lede ? <p className={styles.desc}>{lede}</p> : null}
      </div>
    </div>
  );
}

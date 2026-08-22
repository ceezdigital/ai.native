"use client";

import { useRevealOnScroll } from "@/lib/hooks";
import styles from "./ValueStack.module.css";

export type ValueStackItem = {
  title: string;
  body: string;
  isClosing?: boolean;
};

type ValueStackProps = {
  items: ValueStackItem[];
};

export function ValueStack({ items }: ValueStackProps) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className={styles.stack}>
      {items.map((item, index) => (
        <div
          key={item.title}
          className={`${styles.row} ${isVisible ? styles.inView : ""}`}
          style={{ transitionDelay: `${index * 70}ms` }}
        >
          <span className={styles.number}>
            {item.isClosing ? "✓" : String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

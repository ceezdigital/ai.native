import type { HTMLAttributes, ReactNode } from "react";
import styles from "./GlassCard.module.css";

type GlassCardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function GlassCard({ children, className, ...rest }: GlassCardProps) {
  const combinedClassName = className ? `${styles.card} ${className}` : styles.card;

  return (
    <div className={combinedClassName} {...rest}>
      {children}
    </div>
  );
}

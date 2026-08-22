import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ variant = "primary", children, className, ...rest }: ButtonProps) {
  const variantClass = variant === "primary" ? styles.primary : styles.ghost;
  const combinedClassName = className
    ? `${styles.button} ${variantClass} ${className}`
    : `${styles.button} ${variantClass}`;

  return (
    <a className={combinedClassName} {...rest}>
      <span className={styles.label}>{children}</span>
    </a>
  );
}

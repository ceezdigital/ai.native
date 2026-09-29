import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

// A form-submit mode alongside the existing link mode — same two visual
// variants, just a real <button> so Enter-to-submit and disabled state
// work correctly inside a <form>.
type SubmitProps = CommonProps & {
  href?: undefined;
  type: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

type ButtonProps = LinkProps | SubmitProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className } = props;
  const variantClass = variant === "primary" ? styles.primary : styles.ghost;
  const combinedClassName = [styles.button, variantClass, className].filter(Boolean).join(" ");

  if (props.href !== undefined) {
    return (
      <a className={combinedClassName} href={props.href} target={props.target} rel={props.rel} aria-label={props["aria-label"]}>
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <button
      type={props.type}
      className={combinedClassName}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
    >
      <span className={styles.label}>{children}</span>
    </button>
  );
}

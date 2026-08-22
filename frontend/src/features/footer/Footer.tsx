import { FOOTER_LINE, FOOTER_MARK } from "./content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`${styles.footer} container`}>
      <div className={styles.mark}>{FOOTER_MARK}</div>
      <p>{FOOTER_LINE}</p>
    </footer>
  );
}

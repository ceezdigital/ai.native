import styles from "./AmbientBackground.module.css";

export function AmbientBackground() {
  return (
    <>
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
    </>
  );
}

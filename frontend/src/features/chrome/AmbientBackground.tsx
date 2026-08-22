import styles from "./AmbientBackground.module.css";

export function AmbientBackground() {
  return (
    <>
      <div className={`${styles.blob} ${styles.blobOne}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blobTwo}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blobThree}`} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
    </>
  );
}

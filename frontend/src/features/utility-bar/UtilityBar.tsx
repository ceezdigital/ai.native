import styles from "./UtilityBar.module.css";

const MESSAGE = "Clone Camp · Nairobi, Kenya · Cohort One Now Booking";
const REPEAT_COUNT = 4;
const items = Array.from({ length: REPEAT_COUNT }, (_, index) => index);

export function UtilityBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        {items.map((index) => (
          <span key={index} className={styles.item}>
            {MESSAGE}
          </span>
        ))}
      </div>
    </div>
  );
}

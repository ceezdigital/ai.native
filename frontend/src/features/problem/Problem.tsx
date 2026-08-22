import { SectionHeading } from "@/features/shared";
import {
  PROBLEM_CLOSE,
  PROBLEM_FOLLOWUP,
  PROBLEM_HEADING,
  PROBLEM_INTRO,
  PROBLEM_QUOTE,
  PROBLEM_WHY_LEAD,
  PROBLEM_WHY_REST,
} from "./content";
import styles from "./Problem.module.css";

export function Problem() {
  return (
    <section id="problem" className="container">
      <SectionHeading heading={PROBLEM_HEADING} />

      <div className={styles.copy}>
        {PROBLEM_INTRO.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className={styles.quote}>&ldquo;{PROBLEM_QUOTE}&rdquo;</p>
        <p>{PROBLEM_FOLLOWUP}</p>
        <p>
          <strong>{PROBLEM_WHY_LEAD}</strong>
          {PROBLEM_WHY_REST}
        </p>
        <p>{PROBLEM_CLOSE}</p>
      </div>
    </section>
  );
}

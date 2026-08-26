"use client";

import { useRevealOnScroll } from "@/lib/hooks";
import { Button } from "@/features/shared";
import {
  ROOM_MOMENT_ALT,
  ROOM_MOMENT_BODY,
  ROOM_MOMENT_CAPTION,
  ROOM_MOMENT_CTA,
  ROOM_MOMENT_EMPHASIS,
  ROOM_MOMENT_FLOURISH,
  ROOM_MOMENT_HEADLINE_LEAD,
  ROOM_MOMENT_MID,
  ROOM_MOMENT_TAIL,
} from "./content";
import styles from "./RoomMoment.module.css";

export function RoomMoment() {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>(0.2);

  return (
    <section id="room" className={styles.section}>
      <img src="/images/room-moment.jpg" alt={ROOM_MOMENT_ALT} className={styles.photo} />
      <div className={styles.scrimX} aria-hidden="true" />
      <div className={styles.scrimY} aria-hidden="true" />

      <div ref={ref} className={`${styles.content} ${isVisible ? styles.inView : ""}`}>
        <span className={styles.rule} />
        <h2 className={styles.headline}>
          {ROOM_MOMENT_HEADLINE_LEAD}
          <strong className={styles.emphasis}>{ROOM_MOMENT_EMPHASIS}</strong>
          {ROOM_MOMENT_MID}
          <span className="flourish">{ROOM_MOMENT_FLOURISH}</span>
          {ROOM_MOMENT_TAIL}
        </h2>
        <p className={styles.body}>{ROOM_MOMENT_BODY}</p>
        <Button href={ROOM_MOMENT_CTA.href} variant="ghost">
          {ROOM_MOMENT_CTA.label}
        </Button>
      </div>

      <div className={styles.caption}>{ROOM_MOMENT_CAPTION}</div>
    </section>
  );
}

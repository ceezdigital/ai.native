"use client";

import { useEffect, useState } from "react";
import { Button } from "@/features/shared";
import { usePrefersReducedMotion } from "@/lib/hooks";
import {
  HERO_HEADLINE,
  HERO_OUTPUT_MORE_LABEL,
  HERO_PHOTO_TAG,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_SUBHEAD,
} from "./content";
import styles from "./Hero.module.css";

export function Hero() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          setParallaxOffset(y * 0.06);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  return (
    <header id="hero" className={styles.hero}>
      <div className={`${styles.layout} container`}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>{HERO_HEADLINE}</h1>
          <p className={styles.sub}>{HERO_SUBHEAD}</p>

          <div className={styles.ctaRow}>
            <Button href={HERO_PRIMARY_CTA.href} variant="primary">
              {HERO_PRIMARY_CTA.label}
            </Button>
            <a href={HERO_SECONDARY_CTA.href} className={styles.iconCta} aria-label={HERO_SECONDARY_CTA.label}>
              <span aria-hidden="true">&#8594;</span>
            </a>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <div className={styles.visual}>
            <div
              className={styles.visualInner}
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            >
              <img
                src="/images/hero-photo.jpg"
                alt="An Ai-Nativ founder in conversation with her AI clone"
                className={styles.photo}
              />
            </div>
            <div className={styles.photoTag}>{HERO_PHOTO_TAG}</div>
          </div>

          <div className={styles.outputRow}>
            <span className={`${styles.outputCard} ${styles.outputAccent}`} />
            <span className={`${styles.outputCard} ${styles.outputGold}`} />
            <span className={`${styles.outputCard} ${styles.outputOutline}`} />
            <span className={`${styles.outputCard} ${styles.outputMore}`}>{HERO_OUTPUT_MORE_LABEL}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button, StatCounter } from "@/features/shared";
import { usePrefersReducedMotion } from "@/lib/hooks";
import {
  HERO_FLOURISH_WORD,
  HERO_HEADLINE_EMPHASIS,
  HERO_HEADLINE_LEAD,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_STATS,
  HERO_SUBHEAD_PARTS,
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
        <h1 className={styles.headline}>
          {HERO_HEADLINE_LEAD}
          <span className={styles.soft}>
            {HERO_HEADLINE_EMPHASIS}
            <span className="flourish">{HERO_FLOURISH_WORD}</span>
          </span>
        </h1>

        <div className={styles.visual}>
          <div className={styles.visualInner} style={{ transform: `translateY(${parallaxOffset}px)` }}>
            <img
              src="/images/hero-photo.jpg"
              alt="An Ai-Nativ founder in conversation with her AI clone"
              className={styles.photo}
            />
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.sub}>
            {HERO_SUBHEAD_PARTS.map((part, index) =>
              part.emphasis ? (
                <em key={index} className={styles.emphasis}>
                  {part.text}
                </em>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )}
          </p>

          <div className={styles.ctaRow}>
            <Button href={HERO_PRIMARY_CTA.href} variant="primary">
              {HERO_PRIMARY_CTA.label}
            </Button>
            <Button href={HERO_SECONDARY_CTA.href} variant="ghost">
              {HERO_SECONDARY_CTA.label}
            </Button>
          </div>

          <div className={styles.statRow}>
            {HERO_STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

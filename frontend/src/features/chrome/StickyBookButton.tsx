"use client";

import { useEffect, useState } from "react";
import { Button } from "@/features/shared";
import styles from "./StickyBookButton.module.css";

export function StickyBookButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");
    if (!hero) return;

    const toggleSticky = () => {
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const reachedFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setIsVisible(pastHero && !reachedFooter);
    };

    toggleSticky();
    window.addEventListener("scroll", toggleSticky, { passive: true });
    return () => window.removeEventListener("scroll", toggleSticky);
  }, []);

  return (
    <Button
      href="#event"
      variant="primary"
      className={`${styles.sticky} ${isVisible ? styles.visible : ""}`}
    >
      Book a seat
    </Button>
  );
}

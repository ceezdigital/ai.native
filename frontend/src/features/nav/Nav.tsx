"use client";

import { useEffect, useState } from "react";
import { Button } from "@/features/shared";
import { NAV_LINKS } from "./content";
import styles from "./Nav.module.css";

export function Nav() {
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsCondensed(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.nav} ${isCondensed ? styles.scrolled : ""}`}>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <img className={styles.mark} src="/images/logo-mark.png" alt="Ai-Nativ logo" />
        </div>

        <nav className={styles.navlinks}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.navRight}>
          <button
            type="button"
            className={styles.navToggle}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            &#9776;
          </button>
          <Button href="#event" variant="primary" className={styles.navCta}>
            Book a seat
          </Button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

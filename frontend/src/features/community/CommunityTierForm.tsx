"use client";

import { useState } from "react";
import { Button } from "@/features/shared";
import type { PurchasableTier } from "./content";
import styles from "./CommunityTierForm.module.css";

type CommunityTierFormProps = {
  tier: PurchasableTier;
  ctaLabel: string;
  className?: string;
};

// Which tier this form submits for comes from the card it's rendered
// inside, not a dropdown the attendee has to pick — the "Select Plan"
// button they clicked already told us that.
export function CommunityTierForm({ tier, ctaLabel, className }: CommunityTierFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  if (!isOpen) {
    return (
      <Button type="button" variant="primary" className={className} onClick={() => setIsOpen(true)}>
        {ctaLabel}
      </Button>
    );
  }

  return (
    <form method="POST" action="/api/community/create" className={styles.form} onSubmit={() => setIsSubmitting(true)}>
      <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
      <input type="hidden" name="tier" value={tier} />
      <input className={styles.input} type="text" name="name" placeholder="Full name" required autoComplete="name" />
      <input className={styles.input} type="email" name="email" placeholder="Email" required autoComplete="email" />
      <input className={styles.input} type="tel" name="phone" placeholder="Phone" required autoComplete="tel" />
      <Button type="submit" variant="primary" className={className} disabled={isSubmitting}>
        {isSubmitting ? "Redirecting…" : "Continue to payment"}
      </Button>
    </form>
  );
}

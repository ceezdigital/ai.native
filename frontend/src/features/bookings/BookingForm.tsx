"use client";

import { useState } from "react";
import { Button } from "@/features/shared";
import styles from "./BookingForm.module.css";

type BookingFormProps = {
  ctaLabel: string;
  className?: string;
};

// Submits straight to our own API — no third party, no webhook, no waiting.
// The button itself doubles as the reveal trigger before the fields exist,
// then becomes the real submit button once they're shown.
export function BookingForm({ ctaLabel, className }: BookingFormProps) {
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
    <form method="POST" action="/api/bookings/create" className={styles.form} onSubmit={() => setIsSubmitting(true)}>
      <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
      <input className={styles.input} type="text" name="name" placeholder="Full name" required autoComplete="name" />
      <input className={styles.input} type="email" name="email" placeholder="Email" required autoComplete="email" />
      <input className={styles.input} type="tel" name="phone" placeholder="Phone (e.g. 07XX XXX XXX)" required autoComplete="tel" />
      <Button type="submit" variant="primary" className={className} disabled={isSubmitting}>
        {isSubmitting ? "Redirecting to payment…" : "Continue to payment"}
      </Button>
    </form>
  );
}

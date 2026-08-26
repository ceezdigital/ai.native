# Room Moment

`src/features/room-moment/` — renders `<section id="room">`, placed between News and Clone Camp.

## Purpose

A full-bleed photographic pacing break, not part of either source document's original site structure. Added deliberately at the operator's request to sell the in-person energy of Clone Camp visually before the page moves into full event detail. Breaks the established rhythm of dark-canvas-plus-glass-panels for one cinematic moment, then returns to it.

## Design process

Two directions were mocked up first as a design canvas (a photo mosaic vs. this full-bleed editorial break) using the operator's own event-atmosphere photography, and the operator picked this one before it was built into the codebase.

## Copy

The headline ("You don't leave with potential. You leave holding it.") reuses the exact approved closing line from the Clone Camp value stack verbatim, not new copy — this section functions as a visual preview/echo of that line rather than an independent claim. The CTA reuses the Hero's exact "See how it works" label and `#why` destination.

## Honesty note on the photo

The photograph is real event-atmosphere photography, not a photo from an actual past Ai-Nativ Clone Camp (Cohort One has not run yet). The alt text and on-image caption are written to avoid asserting this specific image is documented proof of a past Ai-Nativ event: alt text is plainly descriptive of what's in the frame, and the "Clone Camp · Nairobi, Kenya" caption is a thematic label (identical in spirit to the existing utility-bar marquee text), not a factual attribution claim. Replace with real Cohort One photography once it exists.

## Behavior

Fade/rise reveal on scroll via the shared `useRevealOnScroll` hook, gated behind `prefers-reduced-motion` like every other animated element on the site.

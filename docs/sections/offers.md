# Offers

`src/features/offers/` — renders `<section id="offers">`

## Purpose

Three-card summary grid: Clone Camp, Ai-Nativ Community, and Done-For-You. Each card is a complete pitch with its own checkmark bullet list and CTA, not just a teaser.

## Behavior

- The Community card is visually "featured" (gold-tinted border and glow) since it's the natural upsell after Clone Camp.
- Cards fade/rise in on scroll, staggered 70ms apart, same as the value-stack pattern.
- Card CTAs: "Reserve your seat" → `#event`, "Join the community" → `#community`, "Talk to Ai-Nativ Labs" → `#retainer`.
- Meta line (seats/price) shows only on the Clone Camp and Community cards — Ai-Nativ Labs never shows a price anywhere on the site.

# Hero

`src/features/hero/`

## Purpose

First section on the page. States the core promise ("You stop being the bottleneck. Your brand gets amplified.") and gives the primary conversion path.

## Copy

Verbatim from the reference implementation — headline, subhead (with three inline-emphasized phrases), both CTAs, and the three stats are locked copy, not to be edited without operator sign-off. "Your brand gets" renders as a bold accent-colored block; "amplified" within it renders in Sacramento script gold, the one flourish word for this composition.

## Behavior

- Load-in: headline → visual → copy fade/rise in on mount via a CSS animation, staggered 0.05s / 0.15s / 0.25s.
- Stats count up from 0 when they scroll into view (`useCountUp` + `useRevealOnScroll` at 40% visibility threshold).
- Hero photo has a subtle parallax on desktop only (disabled under `max-width: 900px` or `prefers-reduced-motion`), capped once scroll exceeds 1.2x viewport height.
- Mobile layout order (headline → visual → copy) and desktop's two-column reorder both come from one `grid-template-areas` definition per breakpoint — no duplicated markup.
- Primary CTA ("Reserve your seat") links to `#offers`; secondary CTA ("See how it works") links to `#why`.

## Assets

`public/images/hero-photo.jpg` is the real photograph, extracted from the source reference file and resized from its original 2048×1152 to 1100px wide (matching its ~520px max display width at up to 2x density). Rendered via plain `<img>`; switching to `next/image` is an optional follow-up.

# Agent Rulebook — Ai-Nativ

Read this before touching anything in this repo. It is written for an AI coding agent, not a human contributor — see `README.md` for that.

## What this project is

A one-page Next.js marketing site for Ai-Nativ, an AI education brand in Nairobi. The site's copy, palette, typography, section order, and CSS are **already fully specified** in two source-of-truth documents the operator maintains outside this repo (a content/copy brief and a design-system/theme-consistency guide). This repo is the implementation of those documents, not a greenfield design exercise. When in doubt, match the source documents exactly rather than improvising.

## Architecture layers

There is no Controller/Service/Model split here — this is a static-content marketing site, not a data-driven app. The layers that exist:

- **`src/app/`** — Next.js App Router entry points only: `layout.tsx` (fonts, metadata, global chrome), `page.tsx` (section composition, in the exact order from the site structure spec), `globals.css` (design tokens and resets only).
- **`src/features/<name>/`** — one folder per site section or shared concern. Every feature folder is self-contained: `Component.tsx`, `Component.module.css`, `content.ts` (copy, typed), `index.ts` (public exports only). Nothing outside a feature imports from inside it except through `index.ts`.
- **`src/features/shared/`** — cross-feature UI atoms (`Button`, `GlassCard`, `SectionHeading`, `ValueStack`, `StatCounter`) used by 3+ features. Do not add a component here that only one feature uses.
- **`src/features/chrome/`** — global page chrome mounted once in `layout.tsx`: `ScrollProgressBar`, `StickyBookButton`, `AmbientBackground`.
- **`src/lib/hooks/`** — reusable browser-state hooks (`useScrollProgress`, `useRevealOnScroll`, `useCountUp`, `usePrefersReducedMotion`). One hook per file.

## Protocol- and pattern-specific rules

- **Design tokens are law.** Every color is a CSS custom property defined once in `globals.css` (`--bg-deep`, `--ink`, `--glow-cyan`, `--gold`, etc. — see the design-system doc for the full token table). Never hardcode a hex value in a component stylesheet. If a component seems to need a new color, it almost certainly needs an existing token at a different opacity instead.
- **Three fonts, three jobs, no exceptions:** Playfair Display (headlines, buttons, labels, numbers), EB Garamond (body copy), Sacramento (exactly one flourish word per composition, never body text).
- **Buttons are `.primary` or `.ghost`, nothing else.** Primary = the main conversion action per section. Ghost = secondary action beside a primary, or a lower-urgency/consultative CTA (e.g. "Talk to Ai-Nativ Labs"). Never invent a third button style.
- **The numbered value-stack (`ValueStack`) is the default way to present a multi-item offer or feature list** — not bullet points, not icon grids. A closing/summary row uses `isClosing: true` to render a checkmark instead of a number.
- **No eyebrow/kicker labels above section headlines, ever.** This was explicitly tested and removed from the source design. Every section opens directly on its headline (via `SectionHeading`'s self-drawing hairline rule) or, if no headline copy is approved for that section (see Offers), a visually-hidden `<h2>` for accessibility only.
- **Every animated element must respect `prefers-reduced-motion`.** The global CSS rule in `globals.css` handles most of this by zeroing animation/transition durations; the `usePrefersReducedMotion` hook (via `useSyncExternalStore`, not `useState`+`useEffect`, to avoid the `react-hooks/set-state-in-effect` lint error) exists for JS-driven motion like the hero parallax.
- **Breakpoints come from the fixed list in the design-system doc** (480/560/600/640/760/860/900/920px). Don't introduce a new breakpoint without a specific content-wrapping reason; check the existing list first.

## Storage / config rules

- No database, no environment variables, and no secrets exist in this repo today. If a future change needs one (e.g. a payment webhook secret), add it via `.env.local` (gitignored) and document it in `frontend/README.md`'s env var table — never commit it.
- Images live in `public/images/` as real files, referenced by relative path. Never re-introduce base64-embedded images (a previous version of this site did this and bloated the page to 3.9MB).

## Testing conventions

There is no test suite yet (no test framework is installed). Before calling a change done: `npm run build` (catches type errors and most correctness issues) and `npx eslint .` (catches hook-rule violations and the expected `no-img-element` warnings on the logo/hero-photo `<img>` tags). If you add real interactive logic beyond scroll/motion chrome, this is the point to introduce a test runner rather than skip testing — ask the operator which one they want (Vitest is the natural fit for this stack) rather than assuming.

## Common mistakes

- Misspelling the brand name. It is **Ai-Nativ** — capital A, lowercase i, hyphen, capital N, lowercase "ativ". Never AI-NATIV, AI-Nativ, or AI-Native. Check every place a rename touches: headings, alt text, `<title>`, `content.ts` files, filenames.
- Showing a price for Ai-Nativ Labs anywhere on the page. It is a sales-call-only number by design.
- Fabricating testimonials, attendee photos, or results for Cohort One — it has not run yet as of this writing. If you need placeholder content (e.g. the Daily Brief feed), follow the source document's own explicitly-sanctioned placeholder pattern instead of inventing engagement stats.
- Adding an eyebrow label, a fourth font, a fourth button style, or a new CSS breakpoint without checking the design-system doc first.
- The logo, hero photo, and favicon are real assets (extracted and resized from the source reference file), rendered via plain `<img>`. Switching them to `next/image` is a reasonable optional improvement, not a correctness fix — don't treat it as blocking.

## Human handoff

When behavior is ambiguous and the two source documents don't resolve it, prefer in this order: (1) an existing pattern already implemented elsewhere in this codebase, (2) the closest analogous pattern in the design-system doc extended conservatively, (3) flagging the ambiguity to the operator rather than inventing new copy or a new visual pattern. Do not guess at marketing copy, pricing, or claims — the source brief is explicit that nothing is placeholder unless marked as such, and Cohort One has no real results to draw on yet.

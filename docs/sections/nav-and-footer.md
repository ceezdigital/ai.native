# Nav, Utility Bar, Footer & Chrome

`src/features/nav/`, `src/features/utility-bar/`, `src/features/footer/`, `src/features/chrome/`

## Nav

A floating glass pill, inset 16px from the top and sides (not a full-bleed bar). Condenses (smaller logo, tighter padding, more opaque/blurred glass) once scrolled past 40px. Mobile (`max-width: 760px`) hides the inline links and reorders via flexbox `order` (toggle+CTA grouped first, logo pushed right via `margin-left: auto`) rather than grid-template-areas — this matches the shipped reference exactly, even though it differs from the grid-area technique used for the Hero's mobile reorder.

## Utility bar

Marquee strip, gold text, seamless CSS-only loop via `translateX(-50%)` on duplicated content.

## Footer

Text-only mark + one line. Per an explicit operator decision, this repo uses the brand's non-negotiable "Ai-Nativ" spelling here even though the raw reference file's footer text had regressed to an inconsistent earlier spelling — see `AGENTS.md`.

## Chrome (global, mounted once in `layout.tsx`)

- `ScrollProgressBar` — thin top bar, fills by `scrollY / scrollHeight`.
- `StickyBookButton` — appears once the hero's bottom edge scrolls above the viewport.
- `AmbientBackground` — three blurred, slow-drifting color blobs plus a fixed noise-texture overlay, all decorative and `aria-hidden`.

## Assets

`public/images/logo-mark.png` and `src/app/icon.png` are the real logo mark and favicon, extracted from the source reference file's embedded base64 and resized down from their original 4000×4000 / 2000×2000 sources (per the content brief's explicit warning against oversized embedded source files).

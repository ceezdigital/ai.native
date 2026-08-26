# Ai-Nativ — Frontend

Next.js 16 (App Router) marketing site. TypeScript strict, no backend dependency.

## Stack

- **Framework:** Next.js 16, App Router, Server Components by default — Client Components only where scroll/motion state requires them (`Nav`, `Hero`, `Offers`, `RoomMoment`, `SectionHeading`, `ValueStack`, `StatCounter`, and the `chrome/` components).
- **Language:** TypeScript, `strict: true`. No `any`, no forced casting.
- **Styling:** CSS Modules, one stylesheet per component, design tokens in `src/app/globals.css`. No CSS framework.
- **Fonts:** `next/font/google` — Playfair Display, EB Garamond, Sacramento.
- **Deployment target:** Vercel.

## Environment variables

None currently required. This table gets filled in when a real one is needed (e.g. a payment webhook secret) — see the root `AGENTS.md` storage/config rules before adding one.

| Variable | Purpose | Required |
|---|---|---|
| _(none yet)_ | | |

## Folder structure

```
src/
├── app/
│   ├── layout.tsx        Root layout: fonts, metadata, JSON-LD mount, global chrome mount points
│   ├── page.tsx          Section composition, in site-structure order
│   ├── globals.css       Design tokens, resets, .container/.flourish/.visually-hidden utilities
│   ├── robots.ts         robots.txt (allows AI crawlers explicitly)
│   ├── sitemap.ts        sitemap.xml
│   └── icon.png          Favicon (real logo mark)
├── features/
│   ├── shared/           Cross-feature UI atoms (Button, GlassCard, SectionHeading, ValueStack, StatCounter)
│   ├── chrome/           Global page chrome (ScrollProgressBar, StickyBookButton, AmbientBackground, OrganizationSchema)
│   ├── utility-bar/      Top marquee strip
│   ├── nav/              Site nav, incl. NAV_LINKS reused by the footer
│   ├── hero/  problem/  offers/  why/  news/  room-moment/
│   ├── clone-camp/  community/  retainer/
│   └── footer/
└── lib/
    ├── seo.ts            Site-wide SEO constants (URL, title, description, image paths)
    └── hooks/            useScrollProgress, useRevealOnScroll, useCountUp, usePrefersReducedMotion
```

Each `features/<name>/` folder follows the same shape: `Component.tsx`, `Component.module.css`, `content.ts` (typed copy), `index.ts` (public exports). See the root `AGENTS.md` for why this structure is non-negotiable.

## Commands

```bash
npm run dev      # dev server (auto-picks a free port if 3000 is busy)
npm run build    # production build, also runs the TypeScript check
npm run start    # serve the production build
npx eslint .     # lint
```

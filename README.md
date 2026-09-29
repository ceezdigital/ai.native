# Ai-Nativ

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript) ![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel) ![License](https://img.shields.io/badge/license-proprietary-lightgrey)

Marketing site for **Ai-Nativ**, an AI education and content brand based in Nairobi, Kenya. The site sells three products: **Clone Camp** (a one-day, in-person AI content-building event), the **Ai-Nativ Community** (a WhatsApp membership), and **Ai-Nativ Labs** (a Done-For-You content retainer).

## Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Supported Modules](#supported-modules)
- [SEO](#seo)
- [Migration / Troubleshooting](#migration--troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` (Next.js will pick the next free port if 3000 is busy). Production build:

```bash
npm run build
npm run start
```

## Features

- Full one-page marketing site: hero, problem framing, three-offer grid, "why us", a live-coverage feed, and full detail sections for Clone Camp, the Community, and Ai-Nativ Labs (with a deliberate self-disqualification section ahead of the Labs pitch).
- Scroll-driven motion: progress bar, nav condense, section reveal-on-scroll, stat count-up, sticky booking CTA, hero parallax — all gated behind `prefers-reduced-motion`.
- Design system implemented as reusable primitives (`Button`, `GlassCard`, `SectionHeading`, `ValueStack`, `StatCounter`) driven entirely by CSS custom properties, no hardcoded colors in components.

## Architecture Overview

The backend lives inside the same Next.js app as the frontend — API routes, not a separate service — deliberately, because the frontend is already hosted on Vercel and a separate service would need its own always-on host just to run background workers. See [`SYSTEM_DESIGN.md`](./SYSTEM_DESIGN.md) for the full architecture (system map, critical-path sequence, data model, integrations) and the reasoning behind that call.

Live now: Clone Camp booking and Community subscriptions, both via native forms on the marketing site submitting directly to our own API — Pesapal payment, Postgres as the source of truth, Google Workspace sync (Sheets/Gmail/Calendar). Ai-Nativ Labs lead capture follows the same pattern next.

```
/
├── frontend/           Next.js 16 App Router site — UI *and* API routes (see frontend/README.md)
├── SYSTEM_DESIGN.md     Backend architecture: system map, data model, integrations
└── docs/sections/       One page per site section, kept in sync with content.ts changes
```

## Supported Modules

| Section | Route anchor | Doc |
|---|---|---|
| Hero | `#hero` | [docs/sections/hero.md](./docs/sections/hero.md) |
| Problem | `#problem` | [docs/sections/problem.md](./docs/sections/problem.md) |
| Offers | `#offers` | [docs/sections/offers.md](./docs/sections/offers.md) |
| Why | `#why` | [docs/sections/why.md](./docs/sections/why.md) |
| News (Daily Brief) | `#news` | [docs/sections/news.md](./docs/sections/news.md) |
| Room Moment (photo break) | `#room` | [docs/sections/room-moment.md](./docs/sections/room-moment.md) |
| Clone Camp | `#event` | [docs/sections/clone-camp.md](./docs/sections/clone-camp.md) |
| Community | `#community` | [docs/sections/community.md](./docs/sections/community.md) |
| Retainer (qualifier + Ai-Nativ Labs) | `#retainer` | [docs/sections/retainer.md](./docs/sections/retainer.md) |
| Nav / Utility bar / Footer / chrome | — | [docs/sections/nav-and-footer.md](./docs/sections/nav-and-footer.md) |

## SEO

Full technical SEO (metadata, Open Graph, Twitter Card, JSON-LD Organization schema, `robots.txt` with explicit AI-crawler allowances, `sitemap.xml`, `llms.txt`) is implemented against a dedicated SEO brief — see [docs/seo.md](./docs/seo.md) for exactly what's in place and what's explicitly flagged as needing manual, non-code steps (Search Console/Bing verification, Google Business Profile).

## Migration / Troubleshooting

- **Real assets are in place** (`public/images/logo-mark.png`, `public/images/hero-photo.jpg`, `src/app/icon.png`), extracted and resized from the source reference file. `Nav` and `Hero` still render them via plain `<img>` rather than `next/image` — switching over is a reasonable follow-up now that both files are properly sized raster images, but wasn't required to ship.
- **Clone Camp and Community payment flows are built end-to-end** — native forms on the marketing page submit directly to our API, which starts a Pesapal checkout and confirms on payment. See `frontend/README.md`'s environment variable table for what needs configuring before this goes live (notably `COMMUNITY_WHATSAPP_INVITE_URL`, still a placeholder).
- **Ai-Nativ Labs scheduling link is a placeholder.** "Talk to Ai-Nativ Labs" has no destination yet until a scheduling tool is chosen. (Its lead-capture backend is Phase 3, not built yet either.)
- Port 3000 busy on `npm run dev`? Next.js auto-selects the next open port and logs it — check terminal output.

## Contributing

This is a single-operator business site, not an open-source project. If you're picking up work here, read [`AGENTS.md`](./AGENTS.md) first — it has the section-by-section rules (brand name spelling, no em-dashes, no fabricated proof, no eyebrow labels) that are easy to violate by accident.

## License

Proprietary. All rights reserved.

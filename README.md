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

This repo is currently **frontend-only** by deliberate scope decision: the site has no backend requirement today (payments, DM automation, and voice/likeness cloning are all handled by third-party tools referenced in copy, not built here). A `/backend` service gets added only when a real server-side need appears (e.g. payment webhook handling once Pesapal/IntaSend is wired up) — see [`AGENTS.md`](./AGENTS.md) for the human-handoff rule on this.

```
/
├── frontend/         Next.js 16 App Router site (see frontend/README.md)
└── docs/sections/    One page per site section, kept in sync with content.ts changes
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
- **Payment flow is not built.** The Clone Camp and Ai-Nativ Labs price-card CTAs are literal `href="#"` placeholders. Wire the Clone Camp one to the real Tally → Pesapal/IntaSend flow once that gateway decision is finalized; the Labs one needs a scheduling tool decision first (see below).
- **Ai-Nativ Labs scheduling link is a placeholder.** "Talk to Ai-Nativ Labs" has no destination yet until a scheduling tool is chosen.
- Port 3000 busy on `npm run dev`? Next.js auto-selects the next open port and logs it — check terminal output.

## Contributing

This is a single-operator business site, not an open-source project. If you're picking up work here, read [`AGENTS.md`](./AGENTS.md) first — it has the section-by-section rules (brand name spelling, no em-dashes, no fabricated proof, no eyebrow labels) that are easy to violate by accident.

## License

Proprietary. All rights reserved.

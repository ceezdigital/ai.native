# Ai-Nativ — Frontend & Backend

Next.js 16 (App Router). Marketing site UI and the booking/payment backend live in the same app — API routes under `src/app/api/`, not a separate service. See [`/SYSTEM_DESIGN.md`](../SYSTEM_DESIGN.md) for why and how.

## Stack

- **Framework:** Next.js 16, App Router, Server Components by default — Client Components only where scroll/motion state requires them (`Nav`, `Hero`, `Offers`, `RoomMoment`, `SectionHeading`, `ValueStack`, `StatCounter`, and the `chrome/` components).
- **Language:** TypeScript, `strict: true`. No `any`, no forced casting.
- **Styling:** CSS Modules, one stylesheet per component, design tokens in `src/app/globals.css`. No CSS framework.
- **Fonts:** `next/font/google` — Space Grotesk (display), Inter (body).
- **Database:** PostgreSQL (Neon) via Prisma. Schema in `prisma/schema.prisma`.
- **Integrations:** Pesapal (payment — the only inbound webhook), Google Workspace (Sheets/Gmail/Calendar sync). Booking/Community intake is a native form on the site itself, not a third-party integration — see `/SYSTEM_DESIGN.md` for why Tally was removed.
- **Deployment target:** Vercel — one project, no separate backend host. Background/retry jobs run via Vercel Cron rather than a persistent worker (see `vercel.json`).

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values — see that file's comments for where each one comes from.

| Variable | Purpose | Required |
|---|---|---|
| `DATABASE_URL` | Postgres connection string | Yes |
| `PESAPAL_CONSUMER_KEY` / `PESAPAL_CONSUMER_SECRET` | Pesapal API auth | Yes |
| `PESAPAL_IPN_ID` | From a one-time `registerIpnUrl()` call, not the dashboard | Yes |
| `PESAPAL_ENV` | `sandbox` (default) or `live` | No |
| `APP_URL` | This site's own deployed URL, used to build callback URLs | Yes |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Target spreadsheet for booking/membership sync | Yes |
| `GOOGLE_CALENDAR_ID` | Defaults to `"primary"` if unset | No |
| `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` / `GOOGLE_OAUTH_REFRESH_TOKEN` | Testing-phase Google auth (personal account OAuth2, not domain-wide delegation — see `/SYSTEM_DESIGN.md`'s Integrations section) | Yes |
| `CRON_SECRET` | Vercel auto-sends this as a Bearer token to the cron route | Yes |
| `OWNER_ALERT_EMAIL` | Where internal alerts (e.g. an overbooked seat) get sent | Yes |
| `COMMUNITY_WHATSAPP_INVITE_URL` | Real WhatsApp group invite link — still a placeholder, needed before a confirmed Community payment's welcome email works | Yes |

## Folder structure

```
prisma/
├── schema.prisma        Cohort, Booking, CommunityMembership, Payment, Job, WebhookEvent
└── seed.ts               Creates the active Cohort row if one doesn't exist

src/
├── app/
│   ├── layout.tsx        Root layout: fonts, metadata, JSON-LD mount, global chrome mount points
│   ├── page.tsx          Section composition, in site-structure order
│   ├── globals.css       Design tokens, resets, .container/.flourish/.visually-hidden utilities
│   ├── robots.ts         robots.txt (allows AI crawlers explicitly)
│   ├── sitemap.ts        sitemap.xml
│   ├── icon.png          Favicon (real logo mark)
│   └── api/
│       ├── bookings/create/      Clone Camp form submits here — creates the booking and starts Pesapal checkout in one request
│       ├── community/create/     Community form submits here — same shape, plus a tier field
│       ├── webhooks/pesapal/     Pesapal IPN — payment status callback (the only inbound webhook)
│       ├── checkout/callback/    Where Pesapal sends the attendee's browser back after paying
│       └── cron/retry-jobs/      Vercel Cron target — retries failed Google Workspace syncs
├── features/
│   ├── shared/            Cross-feature UI atoms (Button, GlassCard, SectionHeading, ValueStack, StatCounter)
│   ├── chrome/            Global page chrome (ScrollProgressBar, StickyBookButton, AmbientBackground, OrganizationSchema)
│   ├── utility-bar/       Top marquee strip
│   ├── nav/               Site nav, incl. NAV_LINKS reused by the footer
│   ├── hero/  problem/  offers/  why/  news/  room-moment/
│   ├── clone-camp/  retainer/
│   ├── footer/
│   ├── webhooks/          The WebhookEvent audit log (Pesapal IPN calls only now)
│   ├── bookings/          Seat-cap booking logic + the Clone Camp form component
│   ├── community/         Membership logic + the Community tier-select form component
│   ├── payments/          Pesapal client + checkout start/confirm for every product
│   ├── jobs/               Retry-queue table + inline-first job dispatch
│   └── google-workspace/  Sheets, Gmail, Calendar clients (one shared auth — see the Integrations section above)
└── lib/
    ├── seo.ts             Site-wide SEO constants (URL, title, description, image paths)
    ├── db.ts              Prisma client singleton
    ├── env.ts             Typed, lazily-validated environment variable access
    └── hooks/             useScrollProgress, useRevealOnScroll, useCountUp, usePrefersReducedMotion
```

Each `features/<name>/` folder follows the same shape: implementation files plus `index.ts` (public exports) — nothing outside a feature imports from inside it except through that file. See the root `AGENTS.md` for why this structure is non-negotiable, and `/SYSTEM_DESIGN.md` for what each backend feature is responsible for.

## Commands

```bash
npm run dev              # dev server (auto-picks a free port if 3000 is busy)
npm run build            # production build, also runs the TypeScript check
npm run start             # serve the production build
npx eslint .              # lint

npm run db:migrate        # create/apply a local migration (needs DATABASE_URL)
npm run db:migrate:deploy # apply migrations in production (run in CI/deploy, not locally)
npm run db:seed            # create the active Cohort row
npm run db:studio          # Prisma's local data browser
```

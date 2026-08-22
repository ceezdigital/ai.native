# SEO & Indexing

Implemented against the SEO brief's exact requirements. Source of truth for constants: `frontend/src/lib/seo.ts`.

## What's implemented

- **Metadata** (`src/app/layout.tsx`, Next.js Metadata API): title (59 chars), description (146 chars), `robots: index, follow`, canonical via `alternates.canonical`, all resolved to absolute URLs off `metadataBase` (`https://ainativ.io`).
- **Open Graph**: `og:type`, `og:url`, `og:title`, `og:description`, `og:image` (1200×630, absolute), `og:image:width/height`, `og:locale: en_KE`, `og:site_name`.
- **Twitter/X Card**: `summary_large_image` plus title/description/image, reusing the same OG image.
- **JSON-LD Organization schema** (`src/features/chrome/OrganizationSchema.tsx`, mounted in `layout.tsx`'s `<head>`): name, url, logo, description, Nairobi/KE address. `sameAs` is an empty array since no real social profile URLs exist yet — populate it when they do, never with invented links.
- **No Event schema.** Clone Camp has no confirmed date as of this writing. Per the brief, a wrong date in structured data is worse than no structured data, so this is intentionally omitted rather than guessed. Add it once a real `startDate` exists.
- **`robots.txt`** (`src/app/robots.ts`): allows `*` plus explicit entries for GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, PerplexityBot, and CCBot. The explicit AI-bot entries are redundant with the wildcard allow (nothing is disallowed) but make the intent to be AI-discoverable unambiguous for future maintainers.
- **`sitemap.xml`** (`src/app/sitemap.ts`): one `<url>` entry for the homepage, matching the single-page site. Add an entry per page if the site ever splits into multiple routes — each with its own title/description/canonical, never duplicated.
- **`llms.txt`** (`frontend/public/llms.txt`): a plain-language summary for AI crawlers/answer engines, following the emerging llms.txt convention. Not part of the brief; added because the operator specifically asked for AI discoverability. Facts only, drawn straight from the approved content brief.
- **Heading hierarchy**: exactly one `<h1>` per page (the hero headline). Fixed two skip-level violations found during implementation: `ValueStack` item titles were `<h4>` directly under a section's `<h2>` (now `<h3>`), and the Retainer section's nested "Done-For-You" heading was a second `<h2>` (now `<h3>`, correctly nested under that section's own `<h2>`).
- **Alt text**: descriptive, human-language, not keyword-stuffed (e.g. nav logo is `alt="Ai-Nativ logo"`, not empty or a filename).
- **og-image.png**: created and installed at `public/images/og-image.png` (1200×630), matching the site's exact design tokens (Playfair Display, Sacramento flourish, brand colors, ambient blobs).

## What the brief explicitly says can't be done from code (flagged, not attempted)

- **Submitting the sitemap to Google Search Console or Bing Webmaster Tools** requires manual account verification by the site owner.
- **Creating a Google Business Profile** is a manual, human-verified process tied to a real business address. Per the brief, this is the trigger to wait for a fixed address, not something to do preemptively.

## Setting expectations on ranking

Technical, on-page SEO (everything above) is necessary but not sufficient for ranking first for any given search term — that also depends on backlinks, content freshness, competitor strength, and time indexed, none of which code can produce directly. The highest-leverage next steps once the site is live: get the domain verified in Google Search Console (manual, above), build a few real backlinks (social profiles, local Nairobi business directories), and keep the Daily Brief section genuinely updated once Cohort One has real content to post.

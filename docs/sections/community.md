# Community

`src/features/community/` — renders `<section id="community">`

## Structure

A 4-item value stack leading with continued guidance and peer connection (never price), followed by a 4-tier pricing grid (Event Ticket / Monthly / 6 Months / Annual). The Monthly tier is visually "featured" since it's the primary ongoing-membership product once someone isn't buying via the Clone Camp ticket bundle.

## Payment flow

Only the three purchasable tiers (Monthly / 6 Months / Annual) render a "Select Plan" CTA — `CommunityTierForm` (`src/features/community/CommunityTierForm.tsx`), with the tier baked in as a hidden field so there's no separate tier-selection step. The Event Ticket card is informational only ("included with your Clone Camp ticket") and has no form. Submitting POSTs to `/api/community/create`, which creates the membership and starts Pesapal checkout in one request. See `/SYSTEM_DESIGN.md` for the full flow.

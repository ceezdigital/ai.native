# Clone Camp

`src/features/clone-camp/` — renders `<section id="event">` (note: id is `event`, not `clone-camp` — matches the nav anchor and every internal link to this section)

## Structure

Two-column layout: a 9-item value stack (plus a checkmark closing row) on the left, and a sticky price card on the right (price, note, CTA, and a Format/Capacity/Includes breakdown). Collapses to one column under 900px.

## Booking flow

The price card's "Reserve your seat" CTA is `BookingForm` (`src/features/bookings/BookingForm.tsx`), not a link — clicking it reveals a name/email/phone form inline that POSTs to `/api/bookings/create`, which creates the booking and starts Pesapal checkout in one request. See `/SYSTEM_DESIGN.md` for the full flow.

## Open items

None — the payment flow is built end-to-end. Remaining backend items (refund policy, the Google auth path for handoff) are tracked in `/SYSTEM_DESIGN.md`'s Open Decisions table, not here.

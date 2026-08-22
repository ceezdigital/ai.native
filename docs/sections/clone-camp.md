# Clone Camp

`src/features/clone-camp/` — renders `<section id="event">` (note: id is `event`, not `clone-camp` — matches the nav anchor and every internal link to this section)

## Structure

Two-column layout: a 9-item value stack (plus a checkmark closing row) on the left, and a sticky price card on the right (price, note, CTA, and a Format/Capacity/Includes breakdown). Collapses to one column under 900px.

## Open items

The price card's "Reserve your seat" CTA is `href="#"` — a real placeholder pending the Tally → Pesapal/IntaSend payment flow.

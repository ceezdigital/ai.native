# Retainer

`src/features/retainer/` — renders `<section id="retainer">`

## Purpose

This single section merges what the original content brief described as two separate pieces: the "Let Me Talk You Out of the Retainer" self-disqualification copy, and the full Ai-Nativ Labs done-for-you detail. The reference implementation treats them as one continuous section, so this repo does too — see `AGENTS.md` on preferring an existing shipped pattern over inventing a new one.

## Structure

1. Section heading + lede.
2. A glass copy panel: three disqualifier paragraphs, then a merged "Still here? Good." turn line flowing directly into who the retainer is actually for.
3. A `.dfy` glass panel: "Done-For-You, run by Ai-Nativ Labs" headline + two paragraphs.
4. The same two-column value-stack + sticky-card layout as Clone Camp, but the price card has **no price** — only a label, a note, and the "Talk to Ai-Nativ Labs" CTA (`href="#"`, pending a real scheduling link — see root README).

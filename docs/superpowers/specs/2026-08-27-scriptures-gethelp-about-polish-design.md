# /scriptures, /get-help, /about Polish — Design Spec

**Sub-project 4 of 5** in the full-site level-up. Sub-projects 1-3 (shared `PageHero`, `/my-story` Netflix rebuild, `/book` editorial rebuild) are complete and live. Sub-project 5 (`/deliverances` redesign) follows this one.

## Goal

Fix two real presentational gaps shared across `apps/web/app/scriptures/page.tsx`, `apps/web/app/get-help/page.tsx`, and `apps/web/app/about/page.tsx`, both confirmed by reading the current code directly.

## Gap 1: Blockquote treatment misapplied to non-quoted narration

**Current state:** All three pages use the same `border-l-4 border-rc-accent pl-6 md:pl-8` (or `border-white/30` on `/get-help`'s dark section) left-border "blockquote" signifier. On `/scriptures` this is correct — it wraps only the actual Bible verse text, which is a genuine quotation. On `/get-help` and `/about`, the identical treatment wraps the founder's own first-person narration (his own words, not a quote of anyone else's) — `/about`'s entire bio paragraph block, and `/get-help`'s entire "Fraud is not just a habit..." paragraph block.

**Fix:** Remove the left-border treatment from `/get-help` and `/about`'s narration blocks entirely — plain paragraph text, matching how first-person narration reads everywhere else on the site (e.g. the homepage witness section, `/my-story`'s hero paragraph). The left-border treatment remains exclusively on `/scriptures`' verse quotations, where it's the correct signifier — `/scriptures` itself needs no change for this gap.

## Gap 2: Triple-repeated-warning fade

**Current state:** On `/scriptures`, the 1 Thessalonians 4:6 verse block ends with the line "Take this as a warning." printed three times in a row at decreasing opacity (`text-rc-accent`, `text-rc-accent/70`, `text-rc-accent/40`) — a fade-echo repetition effect. This is the only place on the entire site using this specific technique.

**Fix:** Replace the three-line fade with a single line at full weight and full opacity — "Take this as a warning." once, matching how the rest of the site delivers punchy single-line statements (e.g. the homepage's dark-band declaration lines) rather than relying on a one-off repetition device.

## Global Constraints

- No image/illustration generation.
- Do not alter any scripture verse text, explanation text, or bio facts — presentation only.
- Stay inside existing `rc-*` color tokens and Fraunces serif + sans body typography.
- No em dashes anywhere in any new copy.
- `apps/web/src/components/PageHero.tsx` is out of scope — do not modify it.
- No `git add -A`/`.` — stage explicit file paths only.
- Files expected to change: `apps/web/app/get-help/page.tsx`, `apps/web/app/about/page.tsx` (Gap 1), `apps/web/app/scriptures/page.tsx` (Gap 2).

## Out of Scope

- `/deliverances` redesign (Sub-project 5) — untouched.
- No structural/layout changes beyond the two gaps above — this is a narrow polish pass, not a rebuild of these three already-functional pages.

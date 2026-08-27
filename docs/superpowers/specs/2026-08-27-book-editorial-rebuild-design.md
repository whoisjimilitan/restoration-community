# /book Editorial Rebuild — Design Spec

**Sub-project 3 of 5** in the full-site level-up. Sub-projects 1 (shared `PageHero`) and 2 (`/my-story` Netflix rebuild) are complete and live. Sub-projects 4 (further `/scriptures`+`/get-help`+`/about` polish) and 5 (`/deliverances` redesign) follow this one.

## Goal

Rebuild `apps/web/app/book/page.tsx` to feel like an actual book — an editorial reading/browsing experience — while staying honest that the book is unpublished and waitlist-only. Wire the waitlist form to a real backend (it currently only sets local React state with no persistence).

## Context

Current page: hero (flat book-cover image + title + a marketing-pitch paragraph) → a non-functional waitlist form (client state only, explicit `TODO` noting no real backend) → a flat numbered list of 12 chapter titles. The cover art (`apps/web/public/images/book-cover.png`) is a flat teal-gradient card, visually identical in treatment to the `/my-story` episode thumbnails — it doesn't yet read as a book object.

## Sections

### 1. Hero — evolve the existing bespoke book-cover treatment, don't replace it with `PageHero`

- Keep the existing structure (cover image + title + pitch paragraph), since it's already specific to this page's purpose in a way the generic inner-page hero isn't.
- Apply a 3D mockup effect to the existing `book-cover.png` via CSS only (perspective transform + drop shadow) so it reads as a physical object rather than a flat card — no new artwork needed.
- Title and pitch paragraph copy unchanged from current: "Weje: The Spirit of Waste Lived Inside Me" / "The spirit of waste lived inside me for twenty years. He drove me across nations. He built an empire of deception through my hands. And then Jesus Christ cast him out. This is the full story."

### 2. NEW — "Look Inside" excerpt section

- A new section, positioned after the hero and before the waitlist, presenting a real, founder-authored Chapter One excerpt as an honest preview — clearly labeled as an excerpt/preview, not the whole chapter or the whole book.
- Exact text (founder-authored and approved, five short paragraphs):

> There is a spirit moving among young people right now. I know because it lived inside me for twenty years. This spirit was named Weje when it lived in me.
>
> It entered when I was removed from the covering of God that protected me from the attacks of the devil. My mother died in 1996. Her last words to me were that she was taking her death because of me. I carried that for years.
>
> Then came trafficking. Drug runs across multiple countries. Then finally, fraud, a scam that preyed on people's fear and made tens of thousands of dollars a week. None of it brought peace.
>
> But in May 2015, Jesus Christ cast Weje out of me, through the ministry of Prophet T.B. Joshua.
>
> This book is the story of how Weje got in, what it did while it was in me, and how I got free.

- Typeset as a manuscript excerpt: serif body type, generous line-height, a card/paper-toned surface distinct from the surrounding section background (matching the existing Surface & Elevation pattern in `DESIGN_LANGUAGE.md`), labeled "Chapter One — Preview" so it's honest about being a preview, not the finished chapter.

### 3. Waitlist — wire to a real backend (Resend Audiences)

- Keep the existing form UI (name + email fields, submit button, thank-you state) — no visual redesign needed here, only real persistence.
- Add a new API route (`apps/web/app/api/book-waitlist/route.ts`) that calls Resend's Contacts API to add the submitted name/email to a Resend Audience.
- Requires two new environment variables the founder must supply before this goes live: `RESEND_API_KEY` and `RESEND_AUDIENCE_ID`. Until supplied, the route fails loudly (a real error state, not a silent fake-success) — the form's existing thank-you state must only show on an actual successful API response, not unconditionally like the current implementation.
- No new database, no new vendor account beyond Resend (already an installed dependency in this codebase, used elsewhere for `email-sequences.ts`).

### 4. Chapters — real table-of-contents treatment

- Same 12 chapter titles, same order, unchanged.
- Replace the flat numbered list with a proper TOC typographic treatment: chapter number in a distinct serif numeral style, a dot-leader rule between the title and the (currently absent, since unpublished) page number column — since there's no real pagination yet, the right-hand column is omitted rather than faked, so the dot-leader visually terminates at the row's edge instead of pointing to a fabricated page number.
- Keep the existing note ("The book follows the same arc as the series...") and the link back to `/my-story`, unchanged.

## Global Constraints

- No image/illustration generation — the cover mockup effect is CSS-only, applied to the existing `book-cover.png`; no new visual assets.
- Do not alter the 12 chapter titles or their order.
- Stay inside `rc-*` color tokens and Fraunces serif + sans body typography.
- Site voice (short, blunt, declarative, "But" as structural pivot) applies to any new copy. No em dashes anywhere.
- Honest-CTA rule: the waitlist form's success state only shows on a real successful submission; the excerpt section is explicitly labeled as a preview, not the whole book; no page numbers are fabricated in the chapter list.
- No `git add -A`/`.` — stage explicit file paths only.
- Files expected to change: `apps/web/app/book/page.tsx` (new section, TOC treatment, cover mockup, form wiring), `apps/web/app/api/book-waitlist/route.ts` (new file, the API route). `DESIGN_LANGUAGE.md` may get a short note on the manuscript-excerpt surface pattern if it's judged reusable for future pages.

## Out of Scope

- `/scriptures`, `/get-help`, `/about` further polish (Sub-project 4), `/deliverances` (Sub-project 5) — untouched.
- No real database/Prisma wiring — the existing 40-model Prisma schema in this repo belongs to a separate, larger "restoration platform" initiative with no live `DATABASE_URL` configured; mixing this simple waitlist into that schema would conflate two unrelated efforts. Resend Audiences is the deliberately lighter-weight choice.
- No additional chapter excerpts beyond Chapter One — nothing else is written yet.

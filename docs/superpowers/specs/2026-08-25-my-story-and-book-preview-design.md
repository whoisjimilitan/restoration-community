# /my-story and /book: Real Content, Real Assets, No Invented Placeholders

**Status:** Approved by founder (Brother Jimi), ready for implementation plan
**Scope:** `apps/web/app/my-story/page.tsx` and `apps/web/app/book/page.tsx`, in the isolated prototype worktree (`restoration-community-prototype`, branch `prototype/hiartem-story`). Reference/production site (port 4021) untouched.

## Why

The homepage hero now links to both `/my-story` and `/book`, added specifically so visitors know upfront that a testimony series and a book both exist. Both destination pages currently undersell what's actually real:

- `/my-story` already has all 9 real episode titles and descriptions in code, but marks every episode "Coming Soon" — false for Episodes 1 and 7, which are live on YouTube right now.
- `/book` already has a real 12-chapter title list and an honest (no-purchase) waitlist, but its cover art is a placeholder styled div instead of the real cover graphic already made this session, and "preview the chapters" isn't backed by anything visual.
- Real, on-brand thumbnail artwork for all 9 episodes already exists in `~/Downloads` (1280x720, generated earlier this session) and is currently unused.

## Content inventory (verified real, not invented)

**Episodes** (`apps/web/app/my-story/page.tsx`, existing `EPISODES` array — unchanged):
1. "There Is a Spirit Moving" — **live**, corresponds to YouTube video `fc9g750tqdQ`
2. "Before the Spirit" — not yet produced
3. "Rise Up and Walk" — not yet produced
4. "Weje" — not yet produced
5. "I'm Taking This Death Because of You" — not yet produced
6. "A Very Good Idea" — not yet produced
7. "The Spirit of Waste" — **live**, corresponds to YouTube video `A9X9TrMBda0`
8. "Heart of Stone" — not yet produced
9. "Today It Has Turned to Victory" — not yet produced

**Chapters** (`apps/web/app/book/page.tsx`, existing `CHAPTERS` array — unchanged, 12 entries, titles only, no chapter body text exists).

**Thumbnail assets** (already generated, in `~/Downloads`, 1280x720 PNG, on-brand teal/charcoal gradient + Georgia Bold + episode label + wordmark):
- `BrotherJimi_Thumbnail_Episode01.png` through `BrotherJimi_Thumbnail_Episode09.png` — one per episode
- `BrotherJimi_Thumbnail_ExistingVideo_InfluencedDemonically.png` and `BrotherJimi_Thumbnail_ExistingVideo_MyTestimony.png` — for the two published videos specifically

**Book cover** (already generated this session): `apps/web/public/images/book-cover.png` — teal gradient, "Weje: The Spirit of Waste / Lived Inside Me / Brother Jimi."

## Hard constraints (carried over, still binding)

- Never invent chapter body text, episode content, or facts beyond what's listed above. If a chapter has no real preview content, it stays title-only — no fabricated summary.
- Stay inside `DESIGN_LANGUAGE.md`: `py-24 md:py-32` spacing, alternating `bg-rc-bg`/`bg-rc-warm-gray` backgrounds, `border-t border-rc-border` dividers, `max-w-2xl`/`max-w-5xl` containers, serif bold headers + light body, the three approved button patterns, no inline styles, no new colors.
- No motivational-speaker language.
- "Less is more" — no decorative elements without a real content reason.

## Design

### `/my-story`

Hero section: **unchanged** — already correct (name, Weje introduction, no video redundancy).

Episode section: replace the current bordered-list layout with a responsive grid.

- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`, inside the existing `max-w-5xl mx-auto` container (grid content per `DESIGN_LANGUAGE.md`).
- Each card:
  - Thumbnail image, `aspect-video w-full object-cover rounded-lg`, using the real per-episode PNG (copied into `apps/web/public/images/episodes/episode-0N.png` for episodes without a "live" status, and the `ExistingVideo` thumbnails for Episodes 1 and 7 specifically, since those are the ones an actual visitor will click through to and should show the exact thumbnail used on YouTube).
  - Below the image: `Episode N` label (existing style: `text-xs uppercase tracking-wider text-rc-accent font-medium`), episode title (`text-xl font-rc-serif font-bold`), one-line description (existing text, unchanged, `text-sm text-rc-text/70 font-light`).
  - Status: Episodes 1 and 7 render as a real `<a>` linking to their YouTube URL (`https://www.youtube.com/watch?v=fc9g750tqdQ` and `https://www.youtube.com/watch?v=A9X9TrMBda0` respectively) with a "Watch Now →" label styled with the existing hover-underline pattern. The other 7 render as a static (non-link) card with a small "Coming Soon" badge overlaid on the bottom-left corner of the thumbnail (`absolute`, semi-transparent `bg-rc-text/80`, small `text-white text-xs uppercase tracking-wide px-3 py-1 rounded-full`) — matching the visual language of a real YouTube playlist showing a mix of published and upcoming content in the same grid.

### `/book`

Cover section: replace the current styled-div mock cover with an `<img src="/images/book-cover.png">`, same sizing/position the mock currently occupies (`mx-auto w-40 md:w-48` container, adjusted to the real image's aspect ratio — cover is 800x500, so height should scale proportionally rather than the current fixed square-ish box).

Waitlist section: **unchanged** — already honest, no purchase language, already correct.

Chapters section: keep the existing numbered list exactly as-is for the 10 chapters with no matching video. For the 2 chapters that match a live episode (Chapter 1 "There Is a Spirit Moving" ↔ Episode 1; Chapter 7 "The Spirit of Waste" ↔ Episode 7), add a small thumbnail (using the same `ExistingVideo` PNG used on `/my-story` for that episode, `w-16 h-9 object-cover rounded shrink-0`) to the left of the chapter number, and make that row a link to the same YouTube URL used on `/my-story`, with a small "Watch this chapter →" micro-label beneath the title in `text-xs text-rc-accent`. This is the closest honest version of "preview the chapters" available — the two chapters that have a real audiovisual counterpart get a way to actually experience that part of the story; the other 10 stay as titles only.

## Out of scope

- Any chapter body-text preview beyond the title — no real content exists to preview.
- Episodes 2–6, 8–9 stay non-clickable "Coming Soon" — no video exists to link to yet.
- Homepage, other pages — untouched.
- Promotion to the 4021 reference site — separate, explicit step later.

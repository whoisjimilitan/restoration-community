# /deliverances Redesign — Design Spec

**Sub-project 5 of 5** (final) in the full-site level-up. Sub-projects 1-4 (shared `PageHero`, `/my-story` Netflix rebuild, `/book` editorial rebuild, scriptures/get-help/about polish) are complete and live.

## Goal

Convert `/deliverances` from a page hardcoded to a single testimony into a real, data-driven multi-testimony system (even though only one real testimony exists right now), and bring its colors in line with the site-wide `rc-*` token system.

## Context

The page is already substantially built and genuinely well-crafted — a cinematic full-story treatment for Samuel Johnson (video hero, play-button modal, before/encounter narrative sections), preceded by a "Not Just Me" bridge and followed by "Face of Fraud" / "Spirit of Fraud" teaching sections and a closing CTA. The structural gap: the `StoryCard` interface exists but is populated by a single hardcoded `const samuel: StoryCard`, not an array — despite the page's own copy ("Now hear **theirs**") and page name (`StoriesPage`) implying multiple testimonies. There is currently only one real testimony (Samuel's); the founder confirmed no others are ready yet.

The page also uses its own color tokens instead of the site-wide system: `border-testimony-gold` (a distinct gold-rust, `#D4A574`, unrelated to `rc-accent`'s deep teal `#0D5E57`) and hardcoded hex values (`from-[#0F0F0F] to-[#1a1a1a]`, `text-[#0F0F0F]`) that are near-identical in value to the existing `rc-text` token (`#1A1A18`).

## Changes

### 1. Convert to a real array-based testimony system

- Rename `const samuel: StoryCard = {...}` to `const STORIES: StoryCard[] = [{ ...samuel's exact same data... }]` — one array with Samuel's one real entry, all fields unchanged.
- Refactor the Samuel-specific render block (currently written against the single `samuel` variable) into a `STORIES.map((story) => (...))` — so adding a second real testimony in the future is purely a data change (append to the array), matching the established pattern already used for `DECLARATIONS`/`EPISODES` (`/my-story`), `CHAPTERS` (`/book`), and `SCRIPTURES` (`/scriptures`) elsewhere on the site.
- The video modal's `selectedVideo` state stays a single `string | null` (shared across however many story cards exist) — no change needed there, since only one video can play at a time regardless of how many stories exist.

### 2. Honest hero copy for a single-testimony page

- Current: "You've heard mine. / Now hear **theirs**." — overclaims plurality when only one testimony exists.
- New: "You've heard mine. / Now hear **his**." — accurate to the current single-testimony state, and reads naturally as more testimonies are added later (a copy update at that point, not a structural one).

### 3. Standardize colors to the rc-* token system

- `border-testimony-gold` → `border-rc-accent` (both occurrences: the bridge section's quote block, and Samuel's own quote blockquote).
- `bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]` → `bg-rc-text` (both occurrences: the "Not Just Me" bridge section, and Samuel's cinematic story section) — simplified from a two-stop gradient between two near-identical dark values to a flat `rc-text` fill, matching the "dark passage" pattern already established on `/my-story`'s dark sections.
- `text-[#0F0F0F]` (the play-button icon's fill, for contrast against its white circle) → `text-rc-text` — same visual result, now token-based.

## Global Constraints

- No image/illustration generation.
- Do not alter Samuel's testimony data (name, role, quote, year, duration, story text, image, video URL) — presentation/structure only.
- Do not alter the "Face of Fraud" / "Spirit of Fraud" / "Not Just Me" line content — presentation only (only their color tokens change per item 3 above).
- Stay inside existing `rc-*` color tokens and Fraunces serif + sans body typography.
- No em dashes anywhere in any new copy.
- The video modal's existing behavior (backdrop click, X button, iframe autoplay) is functionally correct and stays as-is — this sub-project does not extract it into a shared component with `/my-story`'s separate modal implementation. That's a reasonable future refactor (both pages now have near-identical hand-rolled video modals) but is out of scope here, since `/my-story` was already shipped and reviewed in a prior sub-project and touching it now would be scope creep.
- No `git add -A`/`.` — stage explicit file paths only.
- Only `apps/web/app/deliverances/page.tsx` is expected to change.

## Out of Scope

- No other page touched.
- No shared `VideoModal` component extraction (noted above as a reasonable future follow-up, not part of this plan).
- No additional testimonies — Samuel remains the only real entry in the `STORIES` array.

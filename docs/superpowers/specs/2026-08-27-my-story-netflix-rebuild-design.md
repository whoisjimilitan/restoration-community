# /my-story Netflix-Style Rebuild — Design Spec

**Sub-project 2 of 5** in the full-site level-up (Sub-project 1, shared `PageHero`, is complete and live). Sub-projects 3-5 (`/book` editorial rebuild, further `/scriptures`+`/get-help`+`/about` polish, `/deliverances` redesign) follow this one in sequence.

## Goal

Rebuild `apps/web/app/my-story/page.tsx` to feel like a dark, cinematic streaming-series browsing experience, honestly distinguishing the 2 real/live declaration videos from the 9 still-unproduced series episodes.

## Context

Current page: flat-gradient hero with generic title/summary → "The Declaration" section (2 real YouTube videos) → grid of 9 episode cards (all `youtubeId: null`, "Coming Soon" badge). All 11 thumbnails currently share one identical typography-card treatment (dark teal-to-charcoal gradient, bold serif hook line, small series/episode-number labels) — visually indistinguishable between what's real and watchable today versus what doesn't exist yet.

## Design Decision: This Page Breaks the Site's Alternating-Band Rhythm — On Purpose

Every other rebuilt page (`/about`, `/get-help`, `/scriptures`) follows the established light/dark alternating section rhythm documented in `DESIGN_LANGUAGE.md`. `/my-story` is a deliberate, single, documented exception: the entire page stays dark end-to-end, matching how real streaming platforms never interrupt a browsing session with a light section. This is the same category of exception as the homepage's single dark band — a considered choice, not a lapse.

## Sections

### 1. Hero

- Full-bleed background: `apps/web/public/images/portrait-hero.jpg` (real 1920×1080 widescreen video still, already teal-toned).
- `min-h-[85svh]` — matching the homepage's own hero height (taller than the standard inner-page `PageHero`'s `min-h-[60svh]`, since this page needs more cinematic presence).
- Overlay: `bg-gradient-to-br from-rc-accent/85 to-rc-text/90` — the same overlay math used everywhere else on the site, for tonal consistency across every photo-backed hero.
- Title: "My Story" — same serif treatment as other page heroes (`text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight`).
- Subhead: existing copy, unchanged verbatim: "My name is Brother Jimi. When I was a boy, God healed me through Prophet T.B. Joshua. But when the covering of God was removed from my life, a spirit entered and controlled me for twenty years. His name was Weje. This is the story of how he entered, what he did, and how Jesus Christ cast him out."
- CTA: a scroll cue reading "Begin with the Declaration ↓" linking to the Declaration section's anchor — not a fake Play/More-Info button, since nothing in the hero itself is playable. Honest-CTA rule applies.
- This hero is bespoke to this page (not the shared `PageHero` component) — `PageHero`'s inner-page height and generic treatment don't carry the cinematic weight this page's direction calls for.

### 2. The Declaration (2 real, live videos)

- Section anchor: `id="declaration"` for the hero's scroll cue to target.
- Keep existing 2-column grid, same 2 videos, same titles, same YouTube links — content unchanged.
- New treatment: each thumbnail gets a centered play-button glyph overlay (a simple circular white/translucent play triangle, CSS-drawn — no new image asset needed) visible at rest (not just on hover, since these are real content and should read as immediately watchable).
- Replace the current plain "Watch Now →" text link below the thumbnail with a small pill badge overlaid on the thumbnail itself (bottom-left, matching the existing "Coming Soon" pill's position/style elsewhere on the site) reading "Watch Now" — on a solid/vivid background, no dimming.
- These cards render at full color/saturation — no treatment change beyond the play-button + pill addition.

### 3. Episodes (9 unproduced)

- Keep existing 3-column grid, same 9 episodes, same titles/descriptions/thumbnails — content unchanged.
- New treatment: each card gets `opacity-70` relative to the Declaration cards above, giving a real visual "not yet available" signal beyond the existing text-based "Coming Soon" pill.
- Existing "Coming Soon" pill stays as-is (position, style, copy unchanged).
- No play-button glyph on these cards (nothing to play).

### 4. Footer

- `<SiteFooter precededByDarkSection />` — since the entire page above it is dark, matching the homepage's existing use of this prop for the same reason.

## Global Constraints

- No image/illustration generation — all new visuals come from real existing assets (`portrait-hero.jpg`) or from CSS/layout/typography treatment (the play-button glyph is CSS-drawn, not a generated image).
- Do not alter any episode title, description, thumbnail image, or the 2 declaration video titles/links — presentation only.
- Stay inside existing `rc-*` color tokens and Fraunces serif + sans body typography — no new colors, no new typeface.
- Site voice (short, blunt, declarative) applies to any new copy — the only new copy introduced is "Begin with the Declaration ↓" and "Watch Now" pill text, both already minimal and consistent with existing CTA language elsewhere on the site.
- No `git add -A`/`.` — stage explicit file paths only.
- Only `apps/web/app/my-story/page.tsx` is expected to change. If `DESIGN_LANGUAGE.md` needs a note about this page's rhythm exception, that's a small addition to the same doc Sub-project 1 already extended — not a new file.

## Out of Scope

- `/book` (Sub-project 3), `/scriptures`/`/get-help`/`/about` further polish (Sub-project 4), `/deliverances` (Sub-project 5) — untouched by this plan.
- No new episode content, no episode video production, no real stills for the 9 unproduced episodes (they don't exist yet).
- No horizontal-scroll/carousel browsing pattern — content volume (11 items total) doesn't warrant introducing a new interaction pattern the rest of the site doesn't use; the existing vertical grid stays.

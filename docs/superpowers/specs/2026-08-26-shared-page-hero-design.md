# Shared Photo-Backed Page Hero

**Status:** Approved by founder (Brother Jimi), ready for implementation plan
**Scope:** `apps/web/app/about/page.tsx`, `apps/web/app/get-help/page.tsx`, `apps/web/app/scriptures/page.tsx`, plus a new shared `PageHero` component. Working in the `restoration-community` repo, `main` branch, served at `localhost:4021` — the active development target now that this branch has been promoted to production at brotherjimi.com.

## Why

A full-site narrative and design audit found that 5 of 7 pages share one identical flat gradient hero (`bg-gradient-to-br from-rc-accent to-rc-text`, text only, no photography) — `/my-story`, `/book`, `/scriptures`, `/get-help`, `/about`. Only the homepage has a photography-driven hero. This is the first of five sub-projects addressing the full audit:

1. **Shared photo-backed hero pattern** (this spec) — `/about`, `/get-help`, `/scriptures`
2. `/my-story` full rebuild — fully dark, Netflix-style browse experience (separate spec)
3. `/book` full rebuild — editorial/typeset treatment (separate spec)
4. `/scriptures`, `/get-help`, `/about` further polish (remove one-off devices: the blockquote pattern, the triple-repeated "warning" fade) — likely folds into this sub-project or follows immediately after
5. `/deliverances` redesign — multi-testimony showcase, rebuilt on the real `rc-*` token system (separate spec)

`/my-story` and `/book` are explicitly out of scope here — they get their own hero treatment as part of their full rebuilds (sub-projects 2 and 3), not this shared pattern.

## Hard constraints (carried over from the whole prior session, still binding)

- No image/illustration generation used in this spec — real assets only. (A Cloudflare Workers AI / Flux setup is being configured in parallel for possible future use on clearly-abstract/decorative needs, but this sub-project uses only already-existing real photography.)
- Never invent facts, quotes, or biographical details.
- Stay inside the existing `rc-*` color tokens and Fraunces serif + sans body typography — no new colors, no new typeface.
- The established voice (short, blunt, declarative, "But" as a structural pivot, no motivational-speaker language) carries through; this spec does not change any page's existing body copy, only the hero.

## Design

### `PageHero` component (new, shared)

A reusable hero for inner pages — real photo background, charcoal gradient overlay using the exact same math as the homepage's hero (`bg-gradient-to-br from-rc-accent/85 to-rc-text/90`), so every page's hero shares one tonal identity. Centered serif-bold headline (matching the existing H1 treatment already used on these pages: `text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight`), optional subhead below it. Sized at `min-h-[60svh]` (small viewport height, matching the homepage's unit choice — `svh` avoids the mobile Safari viewport-jump bug that `vh` causes when the address bar collapses/expands on scroll) — smaller than the homepage's full `85svh`, since these are inner pages arriving after the front door, not repeating its full-bleed moment.

Props: `image` (src path), `alt`, `headline`, `subhead` (optional), and a `hasPhoto` flag — when `false`, the component renders the existing flat gradient background instead of a photo (needed for `/scriptures`, see below), so the same component serves both cases rather than needing a separate code path per page.

### Per-page asset assignment

- **`/about`** — `portrait-hero-website.jpg` (the fuller-length editorial shot). Deliberately different crop from the homepage's tight close-up (`portrait-declaration-closeup.png`) so the two don't feel like the same image repeated — "about the person" suits a fuller, more composed shot.
- **`/get-help`** — `portrait-declaration-closeup.png` (the same tight, direct-eye-contact crop used in the homepage's dark band). Direct eye contact suits "if you identify with this, there is a way out" — a direct address, not a distant portrait.
- **`/scriptures`** — no photo. `hasPhoto={false}`, keeps the existing flat gradient. Scripture isn't about him personally, and giving it a portrait would imply a connection to himself that the content doesn't call for — this is the one page that stays text-first deliberately, not by omission.

### What doesn't change

Headline copy, subhead copy (none of these pages currently have a hero subhead — none is being added), body content below the hero, footer, navigation. This spec touches only the hero section markup and the new shared component — nothing else on these three pages.

## Out of scope

- `/my-story`, `/book` — separate full rebuilds (sub-projects 2, 3).
- `/deliverances` — separate redesign (sub-project 5).
- Removing the blockquote pattern (`/scriptures`) or the triple-repeated warning fade — those are body-content changes, not hero changes; may be folded into a follow-up pass on the same three pages.
- Any Cloudflare/Flux image generation — not used in this sub-project, real assets only.

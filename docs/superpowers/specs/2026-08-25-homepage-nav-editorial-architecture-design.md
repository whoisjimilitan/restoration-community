# Homepage + Navigation: Editorial Architecture Upgrade

**Status:** Approved by founder (Brother Jimi), ready for implementation plan
**Scope:** `apps/web/app/page.tsx` (homepage), a new site-wide `Navigation.tsx` wired into `apps/web/app/layout.tsx`, and `apps/web/DESIGN_LANGUAGE.md` updates. Isolated prototype worktree (`restoration-community-prototype`, branch `prototype/hiartem-story`, served at `localhost:4022`). Reference/production site (port 4021, sibling repo) untouched.

## Why

A structural comparison against the "Superhuman" warm-editorial design system (golden hour editorial dashboard — warm parchment canvas, cinematic full-bleed photography, floating glass cards, a single deliberate dark tonal band, one confident CTA color, formal type scale with tight tracking at display sizes) surfaced six concrete, ranked gaps in the current site, all approved by the founder:

1. No site navigation at all — the only wayfinding on the entire site is the footer link row; a dead, stale `Navigation.tsx` component exists but is never imported.
2. Zero surface hierarchy — the homepage is entirely flat text on flat backgrounds, no card/elevation vocabulary anywhere.
3. Real photography (portrait shots of the founder, already committed to the repo) is used exactly once (hero video) and never again.
4. No mid-page dramatic dark band — the page's highest-stakes theological line sits on a plain gray box, visually identical in weight to filler sections.
5. No confident primary CTA — every homepage action is a bare text link; the existing `SiteButton.tsx` component (three approved patterns: solid/outline-dark/outline-light) is built but never used.
6. Typography voice (Fraunces, bold serif) and the existing button-pattern system are correct and stay unchanged — but need a formalized, consistently-applied type scale and a more generous radius.

The founder explicitly wants to keep his existing color palette and typeface — this upgrade pulls structure/architecture only from the reference, never colors or fonts.

## Hard constraints (carried over from the whole session, still binding)

- Never invent facts, quotes, photography, or content. Only real, already-existing assets are used.
- Stay inside `DESIGN_LANGUAGE.md` for anything not explicitly changed here (`py-24 md:py-32` spacing, alternating backgrounds, `max-w-2xl`/`max-w-5xl` containers, no inline styles) — this spec updates that doc so it remains the single source of truth.
- All work happens in the prototype worktree/4022 only. The reference/production site (port 4021) is not touched. Promotion to 4021 happens later, only with explicit approval.
- A safety checkpoint commit (`df6e8fc`) captures the full current state of 4022 before this work begins — if the founder doesn't like the result, `git reset --hard df6e8fc` restores everything exactly as it was, including today's Let's Connect widget work and the `/my-story`+`/book` rebuild.

## Scope boundary

This plan covers the **homepage only**, plus the **navigation**, which is unavoidably site-wide since it lives in the shared layout. The other six pages (`/my-story`, `/book`, `/scriptures`, `/get-help`, `/about`, `/deliverances`) inherit the new nav automatically but do not otherwise get the card/photography/dark-band/CTA treatment in this pass — that is an explicit follow-up plan once the homepage version is reviewed and approved.

## Design

### 1. Navigation (new, site-wide)

Replace the current dead `Navigation.tsx` (stale links to `/testimonies`, `/partnership`, `/auth/signin` — routes that don't exist) with a working component wired into `apps/web/app/layout.tsx` so it renders on every page.

- Fixed/sticky top bar. `backdrop-blur` applied always. A hairline `border-b border-rc-border` starts invisible and fades in once the page scrolls past ~10px (tracked via a scroll listener), not present at the very top.
- Left: "Brother Jimi" wordmark, links to `/`.
- Right (desktop): 7 real routes only — Home (`/`), My Story (`/my-story`), Book (`/book`), Scriptures (`/scriptures`), Get Help (`/get-help`), About (`/about`), Deliverances (`/deliverances`). `/journey` and `/login` are excluded (frozen / not built out).
- Mobile (`<768px`, where 7 links won't fit): collapses to a hamburger icon that opens a slide-down sheet (animated open/closed with `framer-motion`, already a project dependency) containing the same 7 links stacked vertically.
- Text color mode: because the homepage hero is full-bleed dark (video + gradient), the nav needs light text while positioned over the hero and dark text once scrolled onto a light section below. This uses two independent triggers: (a) the hairline border reveal fires on a simple `window.scrollY > 10` check; (b) the light/dark text-color mode is controlled by an `IntersectionObserver` watching the hero `<section>` — while the hero is intersecting the viewport, nav text/wordmark render in white/light tones; once the hero scrolls fully out of view, they switch to `rc-text` tones. Pages without a dark hero (everything except the homepage) render the nav in its dark-text mode from the top, since there is no hero section for the observer to watch.

### 2. Homepage sections

- **Hero:** structure unchanged (full-bleed video, gradient overlay, centered headline/subhead, `max-w-2xl`). The two quiet text links become one confident primary action: `Watch My Story` becomes a filled `<SiteButton variant="solid">`. `Read The Book` remains a quiet text link beside it — one unmistakable primary action, one secondary, not two competing buttons.
- **Witness section:** unchanged in structure, copy, and left-alignment. Only touched to apply the formalized type scale (see below) if its current classes don't already match.
- **Dark band (replaces the current plain gray scripture section):** full-bleed `bg-rc-text`. Two-column on desktop (`portrait-hero-website.jpg` on one side, the declaration + Jeremiah 17:11 verse in white text on the other), stacked vertically on mobile (image above text). This becomes the page's one deliberate dramatic peak — the visual and theological climax happen in the same section, at the same weight.
- **Closing section:** the two quiet links ("Watch the full series →", "Read the book →") become two small elevated cards — white surface, `border border-rc-border`, `rounded-xl`, no shadow, sitting on the `bg-rc-bg` canvas so they visibly lift. Same copy, same destinations (`/my-story`, `/book`) as today — only the surface treatment changes.
- **Footer:** untouched.

### 3. Cross-cutting system changes

- **Type scale:** serif headers `text-3xl` and above always get `tracking-tight`; the hero headline (the largest text on the site) steps further to `tracking-tighter` for more architectural presence. Body text (`text-base md:text-lg font-light leading-relaxed`) is unchanged. This becomes a documented, fixed rule in `DESIGN_LANGUAGE.md` rather than a per-page judgment call.
- **Radius bump:** buttons and the new cards move from `rounded-lg` (8px) to `rounded-xl` (12px) sitewide going forward — a subtle, more contemporary step without going full pill-shape.
- **`DESIGN_LANGUAGE.md` updates:**
  - New "Surface & Elevation" section documenting the card pattern (white, `border border-rc-border`, `rounded-xl`, zero shadow, used deliberately — not everywhere).
  - New "Navigation" section documenting the sticky nav pattern described above.
  - Update the three existing CTA button examples from `rounded-lg` to `rounded-xl`.
  - Note `SiteButton.tsx` as the required component for all CTAs going forward, replacing hand-copied button class strings (the component file already carries this intent as a comment; this makes it a documented rule).
  - Add the formalized type-scale rule (tracking-tight at `text-3xl`+, tracking-tighter for the hero).

## Out of scope

- Any page other than the homepage and the site-wide nav (My Story, Book, Scriptures, Get Help, About, Deliverances keep their current styling this pass — follow-up plan).
- Reintroducing a 3-card "Series / Book / Get Help" promotional section (considered and explicitly rejected — would re-litigate an earlier deliberate restraint decision).
- Any change to copy/content — every line of text on the homepage stays exactly as it is today; only structure, surface, and layout change.
- Promotion to the 4021 reference site — separate, explicit step later.

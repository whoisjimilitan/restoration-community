# Homepage Redesign: Cinematic Restraint

**Status:** Approved by founder (Brother Jimi), ready for implementation plan
**Scope:** `apps/web/app/page.tsx` only, in the isolated prototype worktree (`restoration-community-prototype`, branch `prototype/hiartem-story`). Reference/production homepage at `restoration-community` (port 4021) is untouched.

## Why

After a long iterative session (hero treatment, witness/scripture sections, video grid, card navigation, CTA hierarchy — each patched reactively based on feedback), the founder felt the result still wasn't "very thought out and deeply intentional" the way premium/upscale sites feel. This spec replaces reactive patching with an intentional design, arrived at through structured brainstorming.

## Target feel

Two references, combined:
1. **Documentary/editorial depth** — real footage, real narrative craft, feels like a story told with care.
2. **Minimalist restraint** — like a luxury brand or Apple product page: obsessive whitespace, nothing decorative, every element deliberate.

Combined implication: **rich content, minimal chrome.** Fewer, deeper sections rather than many small decorated ones.

## Pacing decision

One dominant cinematic moment (the video hero), followed by spare, quiet text-only sections, ending in one clear closing action. Most narrative depth (9-episode series, full video library, extended story) is deliberately deferred to `/my-story` — the homepage's job is to move someone emotionally and offer one immediate response, not to be a directory of destinations.

## Hard constraints carried over from this session (non-negotiable)

- Never invent quotes or facts. Every line of copy in this spec is either already-published copy or copy the founder has explicitly confirmed himself (see Content section below).
- Stay inside the existing teal/charcoal/off-white brand system defined in `apps/web/DESIGN_LANGUAGE.md` — no new colors, no black, no gold.
- No motivational-speaker language (no "moment," "momentum," "climax," "escalation," or persuasion-structure phrasing). The founder's voice is short, blunt, declarative.
- No portfolio-site gimmicks that don't fit a ministry context (no client testimonial carousels, no company logo grids, no decorative skill dials).
- Follow `DESIGN_LANGUAGE.md` mechanically: `py-24 md:py-32` spacing on every section, alternating `bg-rc-bg`/`bg-rc-warm-gray` backgrounds (hero/closing action may break pattern), `border-t border-rc-border` dividers, `max-w-2xl`/`max-w-5xl` containers only, serif bold headers + light body text, the three approved button patterns, no inline styles, no new fonts beyond what's already loaded.

## Section-by-section design

### 1. Hero
- Full-bleed `public/videos/hero-optimized.mp4` background: `autoPlay muted loop playsInline`, `object-cover`, absolutely positioned behind content.
- `bg-gradient-to-br from-rc-accent/85 to-rc-text/90` overlay on top of the video (not replacing it) — keeps brand color governing the frame and keeps text legible everywhere, not just one side.
- Headline unchanged: "Fraud is not just a crime. It is a spirit." / "I know because it lived inside me for over 20 years."
- No competing button pair. One quiet, understated cue only: a single small text link, "Watch My Story" — `text-white/70`, no button chrome (no border, no fill, no box), positioned below the subhead with generous top margin. The hero's job is to move the visitor, not sell a click.
- `min-h-[85vh]`, centered text, `max-w-2xl` — matches current hero sizing.

### 2. Witness
- `bg-rc-bg`, `border-t border-rc-border`, standard `py-24 md:py-32` spacing.
- Plain background — no image, no card, no gradient. Pure typography.
- Copy (already established, unchanged):
  1. "His name was Weje. Yoruba for the prodigal spirit, the wasteful one. He controlled my life for over twenty years."
  2. "In 2015, Jesus Christ delivered me completely, through Prophet T.B. Joshua's ministry."
  3. "Now I tell this story so someone else does not have to walk it for twenty years before finding the way out." (`font-medium`)
- `max-w-xl` (narrower than the standard `max-w-2xl`, for a more deliberate, quiet column), generous line-height.
- No button, no link.

### 3. Scripture
- `bg-rc-warm-gray`, `border-t border-rc-border` — distinct background so it registers as its own beat, not a continuation of Witness.
- Jeremiah 17:11, full verse, set larger (`text-2xl md:text-3xl font-rc-serif font-bold`) than the Witness body text — the one section on the page with typographic emphasis.
- Reference line: "Jeremiah 17:11" (`font-medium text-rc-accent`).
- Caption (already corrected and approved this session): "This is the end for everyone who does not repent and receive God's mercy. It would have been mine."
- No card, no border, no icon.

### 4. Closing action
- `bg-white` card or `border-t-4 border-rc-accent` treatment — the one section allowed to visually anchor attention beyond the standard pattern, since it's the page's actual goal.
- Header: "If you identify with the spirit described on this site, there is a way out."
- Reassurance line: "No registration. No pressure. I read every request personally."
- `DeliveranceForm` component embedded directly — no extra click between deciding and acting.
- Below the form, small and quiet: two plain text links, "Watch the full series →" (`/my-story`) and "Read the book →" (`/book`) — present, clearly secondary, not cards or buttons.

### Removed from the homepage entirely
- The two-video grid (duplicated `/my-story`'s job; the hero's real footage now carries the video-cinematic role).
- The tilted "Where To Go From Here" card menu (replaced by the quiet text links in Closing).
- The Friday prayer-call strip (already agreed removed earlier this session — a scheduled, high-friction ask doesn't belong in the page's one closing beat).
- The attendance modal code can stay dormant (reachable via `?attend=1` if linked from elsewhere) but is not surfaced on the homepage.

## Assets used (all real, already in the project)

- `public/videos/hero-optimized.mp4` — hero background loop
- No other images/photos are used on the homepage in this design — the restraint principle means the middle sections stay text-only, and the hero's video is the page's single visual centerpiece.

## Out of scope for this spec

- `/my-story`, `/book`, `/get-help`, `/about`, `/scriptures` — untouched.
- Approaches B (continuous video thread through scroll) and C (editorial page-turns) — noted as possible future refinements, not part of this implementation.
- Any new photo assets, watermark treatments, or card-based imagery explored earlier this session — superseded by this spec's text-only middle sections.

# Brother Jimi Ministries — Design Language & Polish Standards

**Status:** CANONICAL. Apply to all pages and future builds.

This document is the single source of truth for visual consistency across all ministry pages. When building or refining pages, follow these standards exactly.

---

## Core Principle

Every page should feel like a beautifully typeset, perfectly-spaced book. Same words, different impact through intentional spacing, rhythm, and visual hierarchy.

---

## Section Spacing (MANDATORY)

All page sections use consistent vertical spacing for breathing room:

```tsx
<section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 border-t border-rc-border">
```

**Values:**
- `py-24` (mobile): 96px padding top/bottom
- `md:py-32` (desktop): 128px padding top/bottom
- `px-6 sm:px-8 md:px-12` (horizontal padding for breathing room)
- `border-t border-rc-border` (divider between sections)

**Non-negotiable:** Every major content section uses this spacing. Never reduce to `py-20` or `py-28`—those feel cramped. The breathing room is what creates the premium feel.

---

## Background Color Pattern (MANDATORY)

Create visual rhythm by alternating background colors:

```
Section 1: bg-rc-bg (white #FFFFFF)
Section 2: bg-rc-warm-gray (light gray #F5F5F5)
Section 3: bg-rc-bg (white #FFFFFF)
Section 4: bg-rc-warm-gray (light gray #F5F5F5)
... and so on
```

**Rules:**
1. Never use inline `style={{ backgroundColor: '#...' }}`—use Tailwind classes only
2. Alternate consistently: white → gray → white → gray
3. Special sections (Hero, Return, Footer) can break pattern if they use gradient or dark backgrounds
4. The alternation creates flow without being chaotic

**Example Pattern (Homepage):**
- Hero: `bg-gradient-to-br from-rc-accent to-rc-text` (intro)
- The Trap: `bg-rc-bg`
- The Witness: `bg-rc-warm-gray`
- The Only Way: `bg-rc-bg`
- The Journey Out: `bg-rc-warm-gray`
- The New Life: `bg-rc-bg`
- Return: `bg-gradient-to-br from-rc-accent to-rc-text` (closer)
- Footer: `bg-rc-text` (dark anchor)

---

## Surface & Elevation (NEW)

Most of the site is flat — text directly on `bg-rc-bg` or `bg-rc-warm-gray`, no elevation. Cards are the deliberate exception, used only where content genuinely needs to feel like a distinct, liftable unit (not as a default container for everything).

**Card pattern:**

```tsx
<a href="..." className="block bg-white border border-rc-border rounded-xl p-8 hover:border-rc-accent transition-colors duration-200">
  {/* content */}
</a>
```

**Rules:**
1. Card surface is always `bg-white` — even on sections whose canvas is `bg-rc-bg` (off-white, not pure white), so the card visibly lifts off the page.
2. Never add a `shadow-*` class to a card. Depth comes from the border/background contrast, not elevation.
3. Border is always `border border-rc-border`, `rounded-xl`. On hover, the border may switch to `border-rc-accent` to signal interactivity.
4. Use cards sparingly and deliberately — most content should stay flat. A page with cards everywhere loses the contrast that makes cards feel special.

---

## Content Max-Width (RECOMMENDED)

Wrap section content in max-width containers for intimacy:

```tsx
<div className="max-w-2xl mx-auto">
  {/* Content */}
</div>
```

**Standard widths:**
- `max-w-2xl` (42rem) — for narrative sections, copy-heavy content
- `max-w-5xl` (64rem) — for grid-based content, logo displays, testimonials

Narrow containers create intimacy. Wide containers feel more open. Choose based on content type, not page type.

---

## Section Dividers (MANDATORY)

Every section except the first uses a top border:

```tsx
<section className="... border-t border-rc-border">
```

**Why:** Creates visual separation and rhythm. Makes the page feel segmented and intentional.

**Never skip:** Dividers are part of the visual language. Even if a section has a different background color, still include `border-t border-rc-border`.

---

## Typography Hierarchy

Each section follows this pattern:

```tsx
{/* Section title */}
<h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">
  Section Title
</h2>

{/* Body text */}
<div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>
```

**Rules:**
- Headlines: serif (`font-rc-serif`), bold, large
- Body: sans-serif (default), light weight, 16-18px
- Use `space-y-4` for paragraph spacing (not `space-y-6`)
- Use `leading-relaxed` for body text (improves readability)
- Serif headers `text-3xl` and above always get `tracking-tight`. The single largest headline on a page (typically the hero `<h1>`) steps further to `tracking-tighter`. This is a fixed rule, not a per-page judgment call.

---

## CTA Button Styling (UNIFIED)

All CTA buttons should use the shared `SiteButton` component (`apps/web/src/components/SiteButton.tsx`) rather than hand-copied classes:

```tsx
import SiteButton from '@/components/SiteButton';

{/* Primary CTA (accent background) */}
<SiteButton variant="solid" href="/some-path">Request Deliverance</SiteButton>

{/* Secondary CTA (outlined, dark text) */}
<SiteButton variant="outline-dark" href="/some-path">Start a Conversation</SiteButton>

{/* On dark background */}
<SiteButton variant="outline-light" href="/some-path">Return to Your Journey</SiteButton>
```

**Properties (baked into `SiteButton`, do not override):**
- `min-h-[48px]` — ensures touch-friendly size
- `rounded-xl` — generous but not pill-shaped
- `transition-all duration-300 ease-out` — smooth hover effects
- Consistent padding: `px-8 py-3`

If a one-off case genuinely can't use `SiteButton` (rare — flag it in review rather than assuming), match these properties by hand, using `rounded-xl` (not the old `rounded-lg`).

---

## Navigation Links (CONSISTENT)

Links between pages use hover-reveal underline animation:

```tsx
<a href="/testimonies" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
  Success Stories
  <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
</a>
```

**Applied to:**
- Bottom "Explore" sections on all pages
- Any cross-page navigation
- Creates premium feel with subtle interaction

---

## Navigation (NEW)

Every page gets the shared `Navigation` component (`apps/web/src/components/Navigation.tsx`), rendered once from `layout.tsx` — never re-implement or duplicate nav markup on a per-page basis.

**Behavior:**
- Fixed to the top, `backdrop-blur-md`, `z-50`. Any full-screen modal or overlay on a page must use a higher z-index (`z-[60]` or above) to render above the nav.
- On the homepage, the nav is transparent and its text switches between light (over the dark hero) and dark (once scrolled past it), tracked via `IntersectionObserver` on the hero section's `id="hero"`.
- On every other page, the nav renders as a solid `bg-rc-bg/95` bar with dark text from the very top — those pages may open with their own dark gradient section (per the Background Color Pattern's hero exception below), and the nav can't assume anything about a given page's content color without inspecting it, so it stays deliberately safe/opaque everywhere except the homepage.
- Links: Home, My Story, Book, Scriptures, Get Help, About, Deliverances — the 7 real, built routes. Do not add a link to `/journey` or `/login` until those pages are actually ready.
- Below `768px`, the link row collapses into a hamburger-triggered slide-down sheet with the same 7 links.

---

## Footer (MINIMAL & CONSISTENT)

All pages use this footer:

```tsx
<footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
  <div className="max-w-2xl mx-auto text-center space-y-3">
    <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
    <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
  </div>
</footer>
```

Never change the footer structure or copy. It's consistent across all pages.

---

## Responsive Behavior

**Mobile-first approach:**
- All spacing classes have mobile base + `md:` overrides
- `py-24` on mobile, `md:py-32` on desktop
- Never make sections cramped on mobile—maintain breathing room

**Test at:**
- 375px (iPhone SE)
- 768px (iPad)
- 1024px+ (desktop)

---

## Color Palette (REFERENCE)

- **Accent (Teal):** `#4DB5A6` (used in buttons, highlights)
- **Dark Teal:** `#0D5E57` (used in gradients)
- **White:** `#FFFFFF` (primary background)
- **Warm Gray:** `#F5F5F5` (secondary background)
- **Dark Text:** `#1A1A18` (main copy)
- **Text Muted:** `#888888` (secondary copy, 60% opacity)

Never hardcode colors—use the design tokens from Tailwind config.

---

## Quick Checklist for New Pages

Before shipping any page, verify:

- [ ] All sections use `py-24 md:py-32` spacing
- [ ] Background colors alternate (white/gray/white/...)
- [ ] Every section has `border-t border-rc-border` (except first)
- [ ] Content wrapped in `max-w-2xl` or `max-w-5xl` container
- [ ] Headlines use serif, bold, appropriate size
- [ ] Body text uses `leading-relaxed`, light weight
- [ ] CTAs use consistent button styling
- [ ] Links have hover underline animation
- [ ] Footer is identical across all pages
- [ ] No inline styles—all Tailwind classes
- [ ] Mobile spacing and layout tested
- [ ] Cards (if any) use `bg-white`, `border border-rc-border`, `rounded-xl`, zero shadow
- [ ] All CTAs use the `SiteButton` component, not hand-copied button classes

---

## Examples

### Correct Section Structure

```tsx
<section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
  <div className="max-w-2xl mx-auto space-y-8">
    <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">
      Section Title
    </h2>
    <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
      <p>Content here</p>
    </div>
  </div>
</section>
```

### Navigation Between Pages

```tsx
<div className="pt-8 border-t border-rc-border/40">
  <p className="text-xs font-medium text-rc-text/60 uppercase tracking-widest mb-6">Explore</p>
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
    <a href="/" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
      Home
      <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
    </a>
  </div>
</div>
```

---

## When to Break the Rules

Special cases where deviation is allowed:

1. **Hero sections** — Can use full-width, centered layout with gradient background
2. **Modals/overlays** — Different spacing rules apply
3. **Admin dashboards** — Different design system applies
4. **API responses** — Data display may have unique structure

For all public-facing ministry pages (homepage, testimonies, partnership, etc.), this language is non-negotiable.

---

## Design Philosophy

This language exists because:

1. **Breathing room** creates premium feel (generous py-24 md:py-32)
2. **Visual rhythm** prevents monotony (alternating backgrounds)
3. **Consistency** builds trust (same spacing everywhere)
4. **Intentionality** shows respect for the visitor (every element serves a purpose)

When a page follows these standards, it feels like it was built with care. When it breaks them, it feels rushed or template-based.

---

## Future Updates

If this design language needs changes, update this document first, then update all existing pages and brief new team members.

Never create a new design language for a single page. If the standard doesn't fit, either:
1. Adjust the page design to fit the language
2. Update this document to include the exception
3. Create a new document for a different page type (if truly different)

---

**This is canonical. Follow it exactly.**

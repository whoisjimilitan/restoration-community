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

---

## CTA Button Styling (UNIFIED)

All CTA buttons should follow this pattern:

```tsx
{/* Primary CTA (accent background) */}
<button className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200">
  Request Deliverance
</button>

{/* Secondary CTA (outlined) */}
<button className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-rc-accent font-medium border-2 border-rc-accent rounded-lg hover:bg-rc-accent/5 transition-all duration-200">
  Start a Conversation
</button>

{/* On dark background */}
<button className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border-2 border-white rounded-lg hover:bg-white/10 transition-all duration-200">
  Return to Your Journey
</button>
```

**Properties:**
- `min-h-[48px]` — ensures touch-friendly size
- `rounded-lg` — slightly rounded, not pill-shaped
- `transition-all duration-200` — smooth hover effects
- Consistent padding: `px-8 py-3`

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

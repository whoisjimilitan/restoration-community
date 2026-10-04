---
name: premium-quality-standards
description: Complete quality standards ensuring all refactored pages rival enterprise site polish and consistency
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0d00840f-0829-441c-8608-48ef987b78ee
---

# Premium Quality Standards — Page Refactoring

Your restoration community site must rival enterprise-level design. These are the non-negotiable standards that ensure premium quality across all public pages.

---

## The 8-Point Premium Design Standard

All pages follow the canonical design language from `/Users/jimilitan/Projects/restoration-community/apps/web/DESIGN_LANGUAGE.md`

### 1. Spacing (MANDATORY)
**Every section: `py-24 md:py-32`**
- Mobile: 96px top/bottom padding
- Desktop: 128px top/bottom padding
- Creates generous breathing room = premium feel
- Cramped spacing = cheap feel (forbidden)

### 2. Background Rhythm (MANDATORY)
**Alternating pattern: white → gray → white → gray**
- White: `bg-rc-bg` (#FFFFFF)
- Gray: `bg-rc-warm-gray` (#F5F5F5)
- Special sections (hero, footer): can break pattern
- Creates visual flow without chaos

### 3. Section Dividers (MANDATORY)
**Every section except first: `border-t border-rc-border`**
- Visible separation between sections
- Makes page feel segmented and intentional
- Never skip—even when background changes

### 4. Content Containers (MANDATORY)
**Wrap content in max-width for intimacy**
- `max-w-2xl` (42rem) — narrative, copy sections
- `max-w-5xl` (64rem) — grids, testimonials
- Centered: `mx-auto`
- Narrow width = premium reading experience

### 5. Typography Hierarchy (MANDATORY)
**Headers:** Serif + bold + large
- `text-3xl md:text-4xl font-rc-serif font-bold`
- Creates weight and intention

**Body:** Light + relaxed
- `text-base md:text-lg font-light leading-relaxed`
- Easy to read, premium feel

**Emphasis:** Medium weight only
- `font-medium` (never bold, never italic)
- Subtle but clear hierarchy

### 6. Buttons (UNIFIED)
**Three approved patterns:**
- Primary accent: `bg-rc-accent text-white`
- Secondary outlined: `border-2 border-rc-accent text-rc-accent`
- On dark: `border-2 border-white text-white`

**Requirements:**
- `min-h-[48px]` (touch-friendly)
- `rounded-lg` (not pill, not square)
- `transition-all duration-200` (smooth hover)
- `px-8 py-3` (consistent padding)

### 7. Navigation (PREMIUM)
**Hover-reveal underline animation**
- Underline starts at width 0
- Grows to full width on hover
- Uses `group` and `group-hover` pattern
- Creates subtle premium interaction

### 8. Footer (IDENTICAL)
**Same footer on every page:**
```tsx
<footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
  <div className="max-w-2xl mx-auto text-center space-y-3">
    <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
    <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
  </div>
</footer>
```
- Never change structure or copy
- Anchors the site visually

---

## Anti-Patterns (Automatic Failure)

❌ **Inline styles** — `style={{ backgroundColor: '...' }}` (forbidden)
❌ **Non-Tailwind colors** — Hardcoded hex values (forbidden)
❌ **Cramped spacing** — Anything less than `py-24` (forbidden)
❌ **Random backgrounds** — Not alternating white/gray (forbidden)
❌ **Typography chaos** — Headers not serif, body not light (forbidden)
❌ **Custom buttons** — Any pattern not in the approved three (forbidden)
❌ **Missing dividers** — Sections without `border-t` (forbidden)
❌ **Full-width content** — Not wrapped in max-width (forbidden)
❌ **Changed footer** — Different structure or copy (forbidden)

---

## Before Deployment: Quality Checklist

Every page must pass **all 10 checkpoints:**

- [ ] **Spacing:** All sections `py-24 md:py-32`
- [ ] **Backgrounds:** White/gray alternation throughout
- [ ] **Dividers:** `border-t border-rc-border` on every section except first
- [ ] **Containers:** Content wrapped in `max-w-2xl` or `max-w-5xl`
- [ ] **Typography:** Serif headers, light body, medium emphasis
- [ ] **Buttons:** Only approved patterns used, `min-h-[48px]`
- [ ] **Navigation:** Links have hover underline animation
- [ ] **Footer:** Identical copy and structure
- [ ] **Responsive:** Tested at 375px, 768px, 1024px+
- [ ] **No inline styles:** 100% Tailwind-only

---

## Visual Harmony Test

After refactoring, compare the page to the homepage:

1. **Open homepage** (`/` route)
2. **Open refactored page** (e.g., `/impact`, `/testimonies`, `/partnership`)
3. **Side-by-side visual comparison:**
   - Do sections feel like they use the same spacing rhythm?
   - Do backgrounds follow the same alternation?
   - Do headers look the same weight and size?
   - Do body paragraphs have the same line height?
   - Do CTAs look unified?
   - Does the page feel like a sibling to the homepage?

**If anything looks different:** It needs adjustment. Premium sites have perfect consistency.

---

## The Premium Feeling

This design standard creates pages that feel:
- **Intentional** (nothing random, every element purposeful)
- **Spacious** (generous vertical rhythm)
- **Rhythmic** (predictable alternation creates flow)
- **Readable** (serif headers, light body, relaxed line height)
- **Consistent** (same spacing, colors, buttons everywhere)
- **Premium** (rivaling enterprise site polish)

When these standards are followed, visitors feel the care taken in design. When they're broken, visitors feel it's cheap or template-based.

---

## Current Refactoring Status

**Pages being refactored:**
1. ✅ **Partnership Page** — Narrative bridges added (COMPLETE)
2. ⏳ **Impact Page** — Visual system refactor (IN PROGRESS)
3. ⏳ **Testimonies Page** — Hero + bridges (IN PROGRESS)

**Before merging:**
- Impact page: verify against all 10 checkpoints
- Testimonies page: verify against all 10 checkpoints
- Compare both to homepage for visual harmony
- Test responsive behavior
- Commit all three together
- Deploy to Vercel

---

## Quality Guardrail

**Non-negotiable:** Every page must pass the 10-point checklist before merge.

If a page fails even one checkpoint, it's not ready. Return it to the implementer.

Your site's premium quality depends on this consistency.

---

**This standard is canonical. Never compromise on these 8 points.**

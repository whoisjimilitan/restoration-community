---
name: design-quality-checklist
description: Non-negotiable design standards from DESIGN_LANGUAGE.md — ensure all refactored pages meet premium quality standards
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0d00840f-0829-441c-8608-48ef987b78ee
---

# Design Quality Checklist

**Source:** `/Users/jimilitan/Projects/restoration-community/apps/web/DESIGN_LANGUAGE.md`

All pages must pass every checkpoint. Failure means regression from premium standard.

---

## 1. Section Spacing (MANDATORY)

**Rule:** All sections use `py-24 md:py-32` (no exceptions for public pages)

**Checklist:**
- [ ] Every major content section has `py-24 md:py-32`
- [ ] No `py-20`, `py-28`, or other values
- [ ] Horizontal padding: `px-6 sm:px-8 md:px-12` (breathing room on sides)
- [ ] Creates 96px mobile / 128px desktop top/bottom padding

**Why:** Generates the premium, "beautifully typeset book" feeling. Cramped spacing = cheap/rushed feel.

---

## 2. Background Color Pattern (MANDATORY)

**Rule:** Alternate white → gray → white → gray

**Pattern:**
```
Section 1 (Hero):    Special (gradient or dark)
Section 2:           bg-rc-bg (white #FFFFFF)
Section 3:           bg-rc-warm-gray (#F5F5F5)
Section 4:           bg-rc-bg (white #FFFFFF)
Section 5:           bg-rc-warm-gray (#F5F5F5)
...continue...
Section N (Footer):  bg-rc-text (dark anchor)
```

**Checklist:**
- [ ] Sections alternate white/gray correctly
- [ ] NO inline `style={{ backgroundColor: '...' }}`—Tailwind only
- [ ] No random background colors
- [ ] Pattern is consistent and predictable

**Why:** Creates visual rhythm without chaos. Guides the eye down the page naturally.

---

## 3. Section Dividers (MANDATORY)

**Rule:** Every section except the first has `border-t border-rc-border`

**Checklist:**
- [ ] All non-first sections have top border
- [ ] Uses `border-rc-border` color (not hardcoded)
- [ ] Border is always present, even if section has different background
- [ ] Creates visual segmentation

**Why:** Makes page feel intentional and segmented. Improves readability.

---

## 4. Content Max-Width (RECOMMENDED)

**Rule:** Wrap content in narrow containers for intimacy

**Widths:**
- `max-w-2xl` (42rem) — narrative, copy-heavy sections
- `max-w-5xl` (64rem) — grids, partner logos, testimonials

**Checklist:**
- [ ] Content wrapped in appropriate max-width container
- [ ] Centered with `mx-auto`
- [ ] No full-width content dumps
- [ ] Creates intimate reading experience

**Why:** Narrow text reads better. Feels curated, not generic.

---

## 5. Typography Hierarchy (MANDATORY)

**Headers:**
- [ ] `text-3xl md:text-4xl` (section headers)
- [ ] `font-rc-serif` (serif font, not sans)
- [ ] `font-bold`
- [ ] `leading-tight`
- [ ] `text-rc-text` (dark text)

**Body Text:**
- [ ] `text-base md:text-lg` (16-18px)
- [ ] `font-light` (not normal or medium)
- [ ] `leading-relaxed` (improves readability)
- [ ] `text-rc-text` or `text-rc-text/80` (for hierarchy)

**Emphasis:**
- [ ] `font-medium` (not bold, not italic)
- [ ] Used sparingly for key statements
- [ ] Creates weight difference without drama

**Checklist:**
- [ ] All headers follow serif/bold/large pattern
- [ ] All body text is light weight + relaxed line height
- [ ] No exceptions for "creative" typography
- [ ] Text hierarchy is clear and readable

**Why:** Serif headers feel intentional. Light body text with good spacing = premium readability.

---

## 6. CTA Button Styling (UNIFIED)

**Primary CTA (accent background):**
```tsx
className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
```

**Secondary CTA (outlined):**
```tsx
className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-rc-accent font-medium border-2 border-rc-accent rounded-lg hover:bg-rc-accent/5 transition-all duration-200"
```

**On dark background:**
```tsx
className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border-2 border-white rounded-lg hover:bg-white/10 transition-all duration-200"
```

**Checklist:**
- [ ] All buttons use one of the three approved patterns
- [ ] `min-h-[48px]` for touch-friendly sizing
- [ ] `rounded-lg` (not pill-shaped, not square)
- [ ] `transition-all duration-200` for smooth hover
- [ ] Consistent padding: `px-8 py-3`
- [ ] No custom button styles

**Why:** Consistent CTAs build trust. Touch-friendly sizing = accessible. Smooth transitions = premium.

---

## 7. Navigation Links (CONSISTENT)

**Pattern:**
```tsx
<a href="/page" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
  Page Name
  <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
</a>
```

**Checklist:**
- [ ] Links have hover-reveal underline animation
- [ ] Underline grows on hover (width 0 → full)
- [ ] Uses `group` and `group-hover` pattern
- [ ] Smooth transition timing

**Why:** Subtle interaction = premium feel. Shows intentional design.

---

## 8. Footer (IDENTICAL ACROSS ALL PAGES)

**Pattern:**
```tsx
<footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
  <div className="max-w-2xl mx-auto text-center space-y-3">
    <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
    <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
  </div>
</footer>
```

**Checklist:**
- [ ] Footer structure is identical on all pages
- [ ] Dark background (`bg-rc-text`)
- [ ] Centered text
- [ ] Same copy (never change)
- [ ] Top border present

**Why:** Consistency = trust. Same footer everywhere = cohesive site.

---

## 9. Responsive Behavior

**Mobile-first approach:**
- [ ] All spacing has mobile base + `md:` overrides
- [ ] `py-24` on mobile, `md:py-32` on desktop
- [ ] No cramped layouts on mobile
- [ ] All interactive elements touch-friendly (min 48px)

**Test at these widths:**
- [ ] 375px (iPhone SE)
- [ ] 768px (iPad)
- [ ] 1024px+ (desktop)

**Why:** Premium sites work everywhere. Responsive design = professional.

---

## 10. No Inline Styles

**Rule:** All styling via Tailwind classes. Never use `style={{ ... }}`

**Checklist:**
- [ ] Zero inline styles in entire page
- [ ] All colors use Tailwind rc-* classes
- [ ] All spacing uses Tailwind (py-, px-, space-, etc.)
- [ ] All typography uses Tailwind (text-, font-, leading-)

**Why:** Inline styles break the design system. Makes pages hard to maintain. Creates inconsistency.

---

## Visual System Harmony

**Every page should feel like:**
- Premium and intentional
- Beautifully typeset (serif headers, light body)
- Spacious (generous py-24 md:py-32)
- Rhythmic (alternating backgrounds)
- Consistent (same spacing, colors, buttons everywhere)

**Red Flags (automatic failure):**
- Inline styles found
- Spacing tighter than py-24
- Background colors not alternating
- Typography hierarchy broken
- CTAs styled differently
- Links missing hover animation
- Content not wrapped in max-width
- No section dividers
- Footer changed

---

## Deployment Gate

**Before any page is merged:**
- [ ] Pass entire checklist
- [ ] Visual comparison to homepage (should feel like siblings)
- [ ] Responsive test at 375px, 768px, 1024px+
- [ ] No regressions from existing pages
- [ ] All animations smooth
- [ ] Build passes without errors

**If any check fails:** Do not merge. Return to implementer for fixes.

---

**This is not negotiable. These standards exist to create premium quality that rivals enterprise sites.**

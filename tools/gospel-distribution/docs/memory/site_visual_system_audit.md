---
name: site-visual-system-audit
description: "Audit of all public pages, showing visual consistency gaps and how to unify rhythm/spacing/design language across the entire restoration community site"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0d00840f-0829-441c-8608-48ef987b78ee
---

# Site Visual System Audit

## Objective

Unify all public pages under **one visual system** (rhythm, spacing, typography, colors) so the site feels like a cohesive whole—not disconnected pages. Each page retains its natural narrative voice; only the **visual container** becomes consistent.

---

## What to Unify (Visual Layer)

✓ Spacing: `py-24 md:py-32`, `space-y-4/8`, `pt-2/3` grouping
✓ Typography: serif headers, light body text, medium emphasis
✓ Section structure: max-width container, border-top dividers
✓ Color palette: bg-rc-bg, bg-rc-warm-gray, rc-accent, rc-text
✓ Animations: Framer Motion fade-in on scroll
✓ Section breathing: Consistent vertical rhythm between sections

---

## What NOT to Unify (Voice Layer)

✗ Narrative structure (each page's purpose is different)
✗ Grammar mechanics (only content engine outputs inherit full grammar)
✗ Message/copy tone (varies by page purpose)
✗ CTA language (varies by page's call-to-action)

Each page speaks naturally to its purpose. The **container** is unified. The **message** is authentic to the page.

---

## Current Page Inventory & Status

### 1. Homepage ✓ DONE
**File:** `/app/page.tsx`
**Status:** Complete. Template established.
**Visual:** Matches the unified system perfectly.
**Next:** Reference for all other pages.

---

### 2. Impact Page ❌ NEEDS MAJOR REFACTOR
**File:** `/app/impact/page.tsx`
**Current Issue:** 
- Uses inline styles (no Tailwind)
- Doesn't inherit rc-colors or design system
- Metric cards are isolated, not part of narrative flow
- No motion/animations
- Doesn't use the spacing rhythm

**Should Be:**
- Section-based layout matching homepage structure
- Inherit rc-colors and typography
- Metrics presented with prophetic context (why they matter, what they mean spiritually)
- Same section spacing: `py-24 md:py-32`
- Same animation patterns

**Refactor Pattern:**
```
Hero (dark gradient, like homepage)
  ↓
Opening context (why metrics matter)
  ↓
Metrics section (grid, but with spacing rhythm)
  ↓
What metrics reveal (theological meaning)
  ↓
Invitation to partnership
```

**Key Changes:**
- Remove inline styles → use Tailwind
- Add motion reveal animations
- Inherit color palette
- Use consistent spacing (not `64px` everywhere—use `py-24`)

---

### 3. Partnership Page ✓ MOSTLY DONE
**File:** `/app/partnership/page.tsx`
**Status:** About 80% aligned.
**Visual:** Good—uses Tailwind, rc-colors, spacing, animations.
**Gaps:**
- Hero is strong ✓
- Partner grids work, but could use narrative framing
- "Why This Matters" section is short (could expand with narrative)
- Form is functional but could inherit more home page aesthetic

**Minor Tweaks Needed:**
- Add a brief context section between hero and partner listings (why partnerships matter)
- Expand "Why This Matters" with more narrative depth
- Ensure form styling matches homepage CTA aesthetic
- Add narrative flow between sections (transitions feel abrupt)

**Example:** Between hero and partner lists, add:
```
"Our work cannot happen without partners.
Three kinds of people are answering this call."
```

This contextualizes the partner sections without changing their visual structure.

---

### 4. Testimonies Page ✓ MOSTLY DONE
**File:** `/app/testimonies/page.tsx`
**Status:** About 75% aligned.
**Visual:** Good—uses Tailwind, animations, grid layout.
**Gaps:**
- No opening context/hero (jumps straight to stories)
- Stories themselves could inherit more homepage aesthetic
- Transitions between stories feel scattered
- Could use narrative framing (what these stories reveal)

**Missing Pieces:**
- Hero section (dark gradient, like home/partnership)
- Opening statement about what testimonies mean
- Narrative throughline (these aren't random stories; they're progress through the 7 stages)

**Example Structure:**
```
Hero (dark): "These are not stories of shame. They are stories of freedom."

Bridge: "Real people. Real transformation. Real Jesus."

Stories (grid, alternating left/right image):
  - Each story tagged with its stage (Stage 4: Forgiveness, etc.)
  - Story quote
  - Story narrative
  - Stage indicator

Closing: "This journey is possible for you, too."
```

---

### 5. Journey Page ⚠️ NEEDS AUDIT
**File:** `/app/journey/page.tsx`
**Status:** Unknown (not reviewed yet)
**Need to check:** Does it explain the 7 stages? Current structure/layout?

---

### 6. Prayer Page ⚠️ NEEDS AUDIT
**File:** `/app/prayer/page.tsx`
**Status:** Unknown
**Need to check:** Is this the prayer booking page or prayer teaching page?

---

### 7. Request Prayer Page ✓ LIKELY GOOD
**File:** `/app/request-prayer/page.tsx`
**Status:** Appears functional (booking interface)
**Note:** Booking pages are transactional—less narrative, more form-focused. Align spacing only.

---

## Visual System Checklist (Apply to Each Page)

Before any page goes live, verify:

### Spacing & Layout
- [ ] Top/bottom section padding: `py-24 md:py-32`
- [ ] Container max-width: `max-w-2xl` (narrow sections) or `max-w-6xl` (grid sections)
- [ ] Inner spacing: `space-y-4`, `space-y-6`, `space-y-8` (not arbitrary padding)
- [ ] Between sections: `border-t border-rc-border` divider
- [ ] Section rhythm: sections breathing room, not stacked

### Typography
- [ ] Headers: `text-3xl md:text-4xl font-rc-serif font-bold` (or `font-medium` for subsections)
- [ ] Body text: `text-base md:text-lg text-rc-text leading-relaxed font-light`
- [ ] Emphasis: `font-medium` (not bold, not italic)
- [ ] Small labels: `text-xs font-medium uppercase tracking-wider`

### Colors
- [ ] Background: Alternate `bg-rc-bg` and `bg-rc-warm-gray`
- [ ] Hero sections: `bg-gradient-to-br from-rc-accent to-rc-text`
- [ ] Borders: `border-rc-border`
- [ ] Text: `text-rc-text`, `text-rc-text/80`, `text-rc-text/70` for hierarchy
- [ ] Accents: `rc-accent` for buttons, highlights

### Motion & Interaction
- [ ] Page load: staggered fade-in animation (120ms, 240ms, 360ms delays)
- [ ] Scroll reveal: `whileInView` with `opacity-0, y-20` → `opacity-1, y-0`
- [ ] Easing: `ease: [0.25, 0.46, 0.45, 0.94]` (consistent across site)
- [ ] Duration: `0.8s` for scroll reveals

### Structure
- [ ] Hero or opening context section
- [ ] Body sections (2-4 main content areas)
- [ ] Closing section or CTA
- [ ] Footer (if public-facing page)
- [ ] Consistent section naming pattern (no random section identifiers)

---

## Refactoring Priority

### High Priority (Breaks visual cohesion)
1. **Impact page** — Completely off-system (inline styles). Major refactor.
2. **Testimonies hero** — Missing opening context/hero section.

### Medium Priority (Mostly aligned, needs tweaks)
3. **Partnership page** — Add narrative bridges between sections.
4. **Journey page** — Need to audit first.

### Low Priority (Transactional, alignment-only)
5. **Request Prayer page** — Booking form. Keep simple, align spacing only.

---

## Template for New Public Pages

Every new public page should follow this structure:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageName() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          {/* Tagline */}
          {/* Main heading */}
          {/* Subheading */}
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          {/* Content */}
        </motion.div>
      </section>

      {/* SECTION 2 */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          {/* Content */}
        </motion.div>
      </section>

      {/* CTA / CLOSING */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        {/* Closing content */}
      </section>
    </div>
  );
}
```

This structure ensures every page has:
- Consistent hero experience
- Predictable spacing rhythm
- Predictable color flow (dark/light alternation)
- Consistent animations
- Room for natural narrative variation

---

## Next Steps

1. **Audit remaining pages** (journey, prayer, etc.)
2. **Refactor impact page** (highest priority)
3. **Add narrative bridges to partnership page**
4. **Add hero + context to testimonies page**
5. **Verify all pages use the visual checklist**
6. **Test full site for rhythm consistency** (scroll through all pages, verify spacing feels unified)

---

## Why This Approach Works

- **Visual coherence** — Site feels designed, not assembled
- **Performance** — Consistent structure = predictable performance
- **Maintenance** — Changes to spacing/colors ripple through consistently
- **Narrative freedom** — Each page keeps its authentic voice
- **User experience** — Familiar rhythm across pages; readers know what to expect

The site becomes a **unified container with authentic voices**—not a collection of different sites forced to match.

# Literary Stack Hero — Design Specification

**Date:** 2026-08-13  
**Goal:** Redesign landing page hero section to feel world-class premium, intentional, and literary—while preserving prophetic voice and message integrity.

---

## Executive Summary

Transform the hero from a text-stack layout into a **book-like reading experience** where each statement lands separately with generous whitespace and staggered animation. The result: premium, meditative, intentional—without noise or distraction.

**Core principle:** Like opening a book of Scripture, each revelation is given its own moment. Whitespace creates premium feeling. Reading time signals wisdom-reception.

---

## Current State vs. Desired State

### Current Hero Issues
- Multiple ideas compete visually (Lie + Truth + Full Scripture + Consequence = 5 revelations)
- Scripture takes 30% of hero (overpowers the primary message "It is a curse")
- No animation timing (all text appears at once)
- Feels busy despite excellent messaging

### Desired State
- Clear visual hierarchy: The Truth dominates, others support
- Scripture shortened to focused excerpt (validates without overwhelming)
- Staggered animation creates felt journey (meditation, not rushes)
- Whitespace signals premium (breathing room between ideas)
- Reading time indicator prepares mind for wisdom reception

---

## Design Specification

### 1. Visual Architecture

Hero is structured as **literary verses**, each with its own visual "stanza":

```
[Hero Container: centered, generous max-width, gradient background]

  ┌─ Section 1: The Lie
  │  "YOU THINK IT IS A BLESSING."
  │  [whitespace: mb-12 md:mb-16]
  │
  ├─ Section 2: The Truth (PRIMARY FOCAL POINT)
  │  "It is a curse."
  │  [whitespace: mb-12 md:mb-16]
  │
  ├─ Section 3: Scripture Validation
  │  Like a partridge that hatches eggs it did not lay
  │  are those who gain riches by fraud.
  │  
  │  At midlife they will prove to be fools.
  │  In the end, they face the consequences of their folly.
  │  — Jeremiah 17:11
  │  [whitespace: mb-12 md:mb-16]
  │
  ├─ Section 4: Consequence + Call
  │  "Unjust gain invokes His judgment."
  │  "Only Jesus can deliver you from it."
  │  [whitespace: mb-8 md:mb-12]
  │
  └─ Section 5: Reading Time Indicator
     "Est. reading time: 2 minutes"
```

**Principle:** Whitespace between sections creates meditation moments. No visual competition. Each statement gets its breath.

---

### 2. Typography & Responsive Scaling

| Element | Desktop | Mobile | Rationale |
|---------|---------|--------|-----------|
| **The Lie** | `text-xs uppercase tracking-widest text-white/60` | `text-xs tracking-widest text-white/60` | Opens quietly; prepares attention |
| **The Truth** | `text-7xl font-rc-serif font-bold text-white` | `text-4xl font-rc-serif font-bold text-white` | Primary focal point; scales responsively |
| **Scripture** | `text-lg font-rc-serif font-normal text-white/90 leading-relaxed` | `text-base font-rc-serif font-normal text-white/90 leading-relaxed` | Supporting validation; readable at all sizes |
| **Consequence** | `text-lg font-rc-serif font-medium text-white/95` | `text-base font-rc-serif font-medium text-white/95` | Call to action; prophetic directness |
| **Reading Time** | `text-xs text-white/50 font-light` | `text-xs text-white/50 font-light` | Subtle intent signal; same across devices |

**Responsive principle:** Text scales proportionally; no breakage on mobile. "It is a curse" stays bold but readable (`text-4xl` mobile vs. `text-7xl` desktop).

---

### 3. Spacing & Whitespace

```
Hero Container: py-24 md:py-32 (top/bottom padding)
Content max-width: max-w-3xl

The Lie                                [mb-12 md:mb-16]
[breathing room]

It is a curse.                         [mb-12 md:mb-16]
[breathing room]

Scripture excerpt (4 lines)            [mb-12 md:mb-16]
[breathing room]

Consequence (2 lines)                  [mb-8 md:mb-12]
[breathing room]

Reading time indicator
```

**Why generous margins?**
- Creates premium aesthetic through negative space
- Gives each statement visual weight
- Prevents visual clustering (busy feeling)
- Mobile: Scroll depth is comfortable (~1.1-1.2 screens), not excessive

---

### 4. Animation & Reveal Sequence

**Staggered fade-in creates reading experience (not theatrical shock):**

| Element | Delay | Duration | Easing | Effect |
|---------|-------|----------|--------|--------|
| The Lie | 0ms | 400ms | ease-in-out | Fade in from opacity 0 → 1 |
| The Truth | 500ms | 600ms | ease-in-out | Fade in + subtle scale (1.0 → 1.02) |
| Scripture | 1200ms | 500ms | ease-in-out | Fade in |
| Consequence | 1800ms | 500ms | ease-in-out | Fade in |
| Reading Time | 2400ms | 400ms | ease-in-out | Fade in |

**Total reveal:** ~3 seconds  
**User experience:** Read "You think it's a blessing" (~1 sec) → absorb → "It is a curse" impacts → pause → Scripture validates → consequence lands → reading time signals intent.

**No jarring moments.** Smooth, meditative pacing.

---

### 5. Scripture Excerpt (Shortened from Full Verse)

**Current:** Full Jeremiah 17:11 (6 lines) in hero
**New:** Focused excerpt (4 lines) + reference

```
Like a partridge that hatches eggs it did not lay
are those who gain riches by fraud.

At midlife they will prove to be fools.
In the end, they face the consequences of their folly.

— Jeremiah 17:11
```

**Why shorter?**
- Full verse (6 lines) competes with "It is a curse" for visual dominance
- Excerpt (4 lines) validates without overwhelming
- Still fully Scripture-grounded
- Maintains premium proportion (Scripture supports, doesn't dominate)

---

### 6. Reading Time Indicator

Placed at hero bottom, before fold:

```
Est. reading time: 2 minutes
```

**Styling:** `text-xs text-white/50 font-light tracking-wide`

**Purpose:**
- Signals intentionality ("this is a moment, not a scroll")
- Prepares mind for wisdom reception
- Respects user's attention
- Prophetic voice: honors the teaching as worthy of time

---

### 7. Mobile Considerations

**Responsive Behavior:**
- Font scaling: Proportional reduction (`text-4xl` mobile, `text-7xl` desktop)
- Spacing: Proportional margins maintained, not removed
- Hero height: ~1.1-1.2 screens on mobile (scrollable, not excessive)
- Animation: Same stagger timing (smooth on modern phones, no jank)
- Layout: Vertical stack (no reflow needed)

**Touch-friendly:**
- Tap targets below hero are 52px+ (comfortable)
- Scroll depth is natural, not frustrating
- Text remains readable without zoom

---

### 8. Code Structure

**Component:** `HeroSection` (refactored from current)

**Sub-components:**
- `HeroElement` — wraps each verse with fade-in animation, delay, timing
- `HeroSpacing` — consistent margin/padding system

**Key classes:**
- `space-y-12 md:space-y-16` — whitespace between sections
- `transform transition-all duration-[duration]` — animation base
- `opacity-0 translate-y-4` → `opacity-100 translate-y-0` — fade + micro-movement
- `text-white/60`, `text-white/90`, `text-white/95` — opacity hierarchy

---

### 9. Accessibility & Performance

**Accessibility:**
- Semantic HTML: `<section>`, `<h1>`, `<p>`, `<blockquote>`
- ARIA labels for animated elements if needed
- Reading time indicator helps prepare cognitive load
- Color contrast: all text meets WCAG AA (white on gradient bg)

**Performance:**
- Animation: CSS transitions (GPU-accelerated, smooth)
- No heavy JavaScript (just Framer Motion fade-in)
- Lazy-load images if added
- Mobile: Animations disable if `prefers-reduced-motion`

---

### 10. Success Criteria

✓ **Premium feeling:** Whitespace and staggered animation create elegance  
✓ **Intentional pacing:** Each statement lands separately (readable, not rushed)  
✓ **Message intact:** "It is a curse" dominates; Scripture validates; Jesus delivers  
✓ **Mobile-perfect:** No layout breaks; proportional scaling; comfortable scroll  
✓ **Prophetic voice:** Direct, bold, unadorned (no poetic softening)  
✓ **World-class:** Rivals premium SaaS/luxury brand hero sections  

---

### 11. Implementation Notes

**File to modify:** `/apps/web/app/page.tsx` (hero section, ~lines 37-82)

**Changes:**
1. Restructure hero into 5 distinct `<div>` sections with individual animation delays
2. Shorten Scripture excerpt (remove full Jeremiah verse, use 4-line version)
3. Add `space-y-12 md:space-y-16` wrapper for consistent whitespace
4. Update `transitionDelay` values for staggered reveal (0ms, 500ms, 1200ms, 1800ms, 2400ms)
5. Ensure responsive typography scales correctly

**Testing:**
- Desktop (1920px): Full impact of large typography
- Tablet (768px): Proportional scaling
- Mobile (375px): Readable, no horizontal overflow, comfortable scroll
- Animation: Smooth across all devices; `prefers-reduced-motion` respected

---

## Appendix: Before/After Comparison

### Before
```
YOU THINK IT IS A BLESSING.
It is a curse.
Like a partridge that hatches eggs it did not lay
are those who gain riches by fraud.
At midlife they will prove to be fools.
And in the end they will face
the consequences of their folly.
— Jeremiah 17:11
Unjust gain invokes His judgment.
Only Jesus can deliver you from it.
```
**Feeling:** Busy, competitive ideas, Scripture overpowers message.

### After
```
YOU THINK IT IS A BLESSING.
                [whitespace]
It is a curse.
                [whitespace]
Like a partridge that hatches eggs it did not lay
are those who gain riches by fraud.

At midlife they will prove to be fools.
In the end, they face the consequences of their folly.
— Jeremiah 17:11
                [whitespace]
Unjust gain invokes His judgment.
Only Jesus can deliver you from it.
                [whitespace]
Est. reading time: 2 minutes
```
**Feeling:** Literary, meditative, intentional. Each idea lands. Premium.

---

## Sign-Off

**Design approved for implementation:** Pending user review and feedback.

**Next step:** Invoke writing-plans skill to create implementation plan with exact code changes and testing strategy.

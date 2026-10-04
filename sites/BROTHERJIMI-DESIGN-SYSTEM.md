# Brother Jimi Website — Design System

**Status:** LOCKED (Oct 4, 2026)  
**Based On:** Apple iPhone Duo design methodology  
**Purpose:** Salvation-centered website with premium, minimal aesthetic

---

## DESIGN PHILOSOPHY

**Less is more. Intention is everything.**

- Extreme whitespace as luxury signal
- Typography carries the message
- One focal point per section
- No decorative elements
- Every pixel earns its place

---

## COLOR PALETTE

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| White | `#ffffff` | Background, primary surface |
| Off-White | `#fafafc` | Secondary surface, cards |
| Black | `#1d1d1f` | Text, headings, primary content |
| Gray Light | `#f5f5f7` | Subtle backgrounds |
| Gray Medium | `#e6e6e8` | Borders, dividers |
| Gray Dark | `#707070` | Secondary text |

### Accent Color (Choose One)
- **Deep Gold** `#d4af37` → Warmth, revelation, spiritual light
- **Deep Sage** `#6b8e6f` → Grounding, prophetic clarity
- **Deep Burgundy** `#800020` → Authority, depth, richness

**Decision:** [TO BE CHOSEN]

---

## TYPOGRAPHY

### Font Families

| Usage | Font | Fallback |
|-------|------|----------|
| Headings | Fraunces | Georgia, serif |
| Body Text | Inter | SF Pro Text, system-ui |

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Typography Scale

| Level | Size | Line Height | Usage |
|-------|------|-------------|-------|
| Hero | 64px | 1.1 | Main headline (H1) |
| Feature | 28px | 1.1 | Section headings (H2) |
| Body Large | 20px | 1.5 | Large body text |
| Body | 17px | 1.5 | Standard body text |
| Label | 14px | 1.5 | Small text, captions |
| Nav | 12px | 1 | Navigation, labels |

### Letter Spacing
- Tight: -0.5px (large headlines)
- Normal: 0px (default)
- Loose: 0.5px (small text)

---

## SPACING SYSTEM

**Base Unit:** 4px

| Size | Value | Usage |
|------|-------|-------|
| XS | 4px | Micro spacing |
| SM | 8px | Small gaps |
| MD | 12px | Standard gaps |
| LG | 16px | Component spacing |
| XL | 24px | Element spacing |
| 2XL | 32px | Larger gaps |
| 3XL | 48px | Section spacing |
| 4XL | 64px | Major sections |
| 5XL | 80px | Page top/bottom |
| 6XL | 120px | Extreme gaps |

### Section Gaps (Critical)
- **Extra Large:** 100px (between major sections)
- **Large:** 80px (between content blocks)
- **Medium:** 60px (mobile adjustments)

**Note:** These gaps are LOCKED. They create the premium feel through breathing room.

---

## BORDER RADIUS

| Size | Value | Usage |
|------|-------|-------|
| SM | 4px | Subtle corners |
| MD | 8px | Cards, elements |
| LG | 12px | Larger components |
| Full | 9999px | Buttons (pill shape) |

---

## SHADOWS

**Intentionally Minimal** (Apple-style flat design)

- **None:** Default (no drop shadows)
- **Hairline:** 1px subtle border only
- **Subtle:** Minimal 1px soft shadow

No heavy shadows. Design speaks through spacing and typography, not depth effects.

---

## COMPONENTS

### Buttons

**Primary Button**
- Background: Accent color
- Text: White
- Padding: 16px 32px
- Border Radius: 9999px (full pill)
- Font Weight: Semibold
- On Hover: Slight opacity change + scale 1.02

**Secondary Button**
- Background: Transparent
- Border: 1px accent color
- Text: Accent color
- On Hover: Fill background with accent color

```html
<button class="btn btn-primary">Start Free</button>
<button class="btn btn-secondary">Learn More</button>
```

### Cards

- Padding: 40px
- Background: Off-white
- Border: 1px medium gray
- Border Radius: 12px
- No shadows

### Quotable

- Font Family: Serif
- Font Size: 24px
- Font Style: Italic
- Left Border: 4px accent color
- Padding: 32px
- Line Height: 1.7

```html
<div class="quotable">
  "Your words determine the life you enjoy because you cannot rise above the level of your words."
</div>
```

### Scripture Reference

- Font Family: Serif
- Font Size: 18px
- Background: Off-white
- Border Radius: 12px
- Padding: 24px
- Line Height: 1.7

```html
<div class="scripture">
  <div class="scripture-ref">Romans 8:5-6</div>
  <p>"Those who live according to the flesh have their minds set on what the flesh desires..."</p>
</div>
```

---

## PAGE STRUCTURE

### Homepage
```
Section 1: Hero (100px gap before)
  - Hands holding Bible image (center)
  - H1: "Receive Jesus"
  - P: "Start discovering who you are in Him"
  - Button: "Start Free"

(100px gap)

Section 2: About (optional)
  - Optional supporting text
  - Keep minimal

(100px gap)

Footer
  - Links
  - Copyright
```

### Journey Pages (/day/1, /day/2, etc.)
```
Section 1: Today's Reflection (80px padding top)
  - H1: Title
  - Quote Card Image
  - Body: Full reflection
  - Quotable: Highlighted line
  - Scripture: Reference + text
  - Share Buttons

(80px gap)

Section 2: Share & Next
  - Share buttons (WhatsApp, Copy, Twitter)
  - Email signup (optional)
  - Navigation (Previous/Next)
```

### Partner Page (/partner)
```
Section 1: Gentle Ask
  - H2: "Partner Monthly"
  - P: Why partnership matters
  - Button: "Become a Partner"

(100px gap)

Section 2: Stripe Form
  - Payment form
  - Amount selector
  - Submit

(80px gap)

Footer: Assurance message
```

---

## RESPONSIVE DESIGN

### Mobile Breakpoints

**Tablet (768px and below)**
- Hero: 48px (down from 64px)
- Feature: 24px (down from 28px)
- Section gaps: 60px (down from 100px)
- Padding: 32px (down from 60px)

**Mobile (480px and below)**
- Hero: 36px
- Feature: 20px
- Section gaps: 48px
- Padding: 20px
- Single column layout

**Critical:** Maintain whitespace principle on mobile. Don't compress too aggressively.

---

## LOCKED DECISIONS

✓ **No gradients**
✓ **No decorative graphics**
✓ **No shadows (flat design)**
✓ **No animations (except hover states)**
✓ **No multiple fonts (serif + sans only)**
✓ **No multiple accent colors (one only)**
✓ **Buttons always pill-shaped**
✓ **Hero always centered**
✓ **Text always centered or left-aligned (never justified)**

---

## WHAT NOT TO DO

✗ Add more than one accent color
✗ Use drop shadows
✗ Add decorative elements "for visual interest"
✗ Compress whitespace to fit content
✗ Use different button styles
✗ Add animations or transitions (beyond subtle hover)
✗ Mix serif fonts
✗ Create asymmetric layouts
✗ Add background patterns

---

## FILE REFERENCE

- **CSS Variables:** `brotherjimi-design-system.css`
- **HTML/Next.js:** All components use CSS variable values
- **Notio Integration:** Design system applies to both static + dynamic content

---

## STATUS

**LOCKED.** Do not modify without explicit approval. This consistency is non-negotiable. Every page, every component, every spacing value serves the core message: **Receive Jesus.**

All future pages must follow this system exactly.

---

**Last Updated:** October 4, 2026  
**Approved By:** [User]  
**Next Review:** After first 3 pages launched
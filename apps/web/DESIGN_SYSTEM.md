# Brother Jimi Design System

## Visual Language Foundation

This design system extracts principles from premium, human-centered interfaces and applies them to the deliverance ministry.

**Core Philosophy:** Calm, spacious, clear, intentional. Every element exists for a reason.

---

## Color Palette

### Primary
- **rc-bg:** #F8F6F2 — Warm, breathing background (like premium paper)
- **rc-text:** #202124 — Deep, readable primary text
- **rc-text-secondary:** #8B8680 — Muted secondary text

### Accent & Spiritual
- **rc-accent:** #0F766E — Deep teal (restoration, healing, hope)
- **rc-gold:** #D4A574 — Warm gold (grace, warmth, humanity)
- **rc-gold-light:** #E8DCC8 — Light gold (gentle emphasis)
- **rc-warm-gray:** #E8E3DC — Soft gray (subtle contrast)

### Usage Rules
- Use **rc-text** for all body copy
- Use **rc-accent** for CTAs, cross logo, interactive elements
- Use **rc-gold** for secondary emphasis, warmth points
- Use **rc-warm-gray** for dividers, subtle backgrounds
- Never use pure black; use rc-text

---

## Typography

### Font Stack
- **Serif (Headers):** Georgia, Garamond, serif
- **Sans (Body):** Inter, system-ui, sans-serif

### Hierarchy

#### Display (Hero Headlines)
- Size: 48px–56px (mobile: 36px)
- Weight: Bold (700)
- Line-height: 1.2
- Font: Serif
- Letter-spacing: -0.02em (tight for intimacy)

#### Section Headers
- Size: 36px–44px (mobile: 28px)
- Weight: Bold (700)
- Line-height: 1.3
- Font: Serif
- Letter-spacing: -0.01em

#### Body Text
- Size: 18px (mobile: 16px)
- Weight: Regular (400)
- Line-height: 1.6 (relaxed, readable)
- Font: Sans
- Letter-spacing: 0

#### Small Text (Meta, Captions)
- Size: 14px
- Weight: Medium (500)
- Line-height: 1.4
- Font: Sans
- Letter-spacing: 0.04em (subtle spread for clarity)

#### Button Text
- Size: 16px
- Weight: Medium (500)
- Font: Sans
- Letter-spacing: 0.01em

---

## Spacing System

**Base unit: 8px grid**

### Standard Spacing
- **xs:** 4px — micro adjustments
- **sm:** 8px — tight spacing
- **md:** 16px — standard spacing
- **lg:** 24px — generous spacing
- **xl:** 32px — breathing room
- **2xl:** 48px — section breaks

### Section Padding
- **Mobile:** py-16 (64px vertical)
- **Desktop:** py-24–py-32 (96–128px vertical)
- **Horizontal:** px-6 mobile, px-12 desktop

### Element Spacing
- **Within sections:** space-y-6 to space-y-8
- **Between paragraphs:** mt-6
- **CTA spacing:** pt-4 to pt-8 from preceding content

---

## Border & Radius

### Corners
- **Buttons & Cards:** rounded-lg (8px)
- **Subtle elements:** rounded-md (6px)
- **Icons:** no radius (square or circular)

### Borders
- **Section dividers:** border-t border-rc-text/5 (barely visible)
- **Card borders:** border border-rc-warm-gray (subtle, warm)
- **Focus states:** 2px outline with rc-accent

---

## Shadows & Depth

### Philosophy
Avoid heavy shadows. Use subtle lift.

- **No shadow default** — content is flat
- **Hover lift:** subtle shadow on interactive elements
- **Card shadow:** `shadow-sm` only on hover

Tailwind shadow definitions:
```css
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
```

---

## Components & States

### Buttons

#### Primary CTA
- Background: rc-accent
- Text: white
- Padding: px-8 py-4
- Radius: rounded-lg
- Hover: opacity-90, subtle shadow
- Focus: ring-2 ring-rc-accent ring-offset-2

#### Secondary Link
- Text: rc-accent
- Hover: text-rc-text
- Icon: → arrow (right-pointing)
- No background

### Links
- Color: rc-accent
- Hover: rc-text
- Underline: none (unless inline in paragraph)
- Transition: color 200ms

### Separators
- Color: rc-text/5 (nearly transparent)
- Height: 1px
- Margin: my-8 to my-12 between sections

---

## Animations & Transitions

### Philosophy
Subtle, purposeful. Never gratuitous.

#### Standard Transition
- Duration: 200ms
- Easing: ease-in-out (cubic-bezier(0.4, 0, 0.2, 1))
- Properties: color, opacity, transform

#### Hero Load Animation
- Duration: 700ms per element
- Stagger: 120ms between items
- Motion: translateY(16px) → translateY(0)
- Opacity: 0 → 1

#### Scroll Indicator
- Animation: gentle bounce
- Duration: 3s
- Opacity: 50%

---

## Accessibility

### Color Contrast
- Text on rc-bg: minimum 4.5:1 (AA standard)
- All interactive elements: 3:1 minimum for visual indicators

### Interactive Elements
- Focus states: Always visible (ring-2 ring-offset-2)
- Hover states: Always obvious
- Touch targets: Minimum 44px × 44px
- Keyboard navigation: Fully supported

### Semantic HTML
- Use `<section>` with `id` for page sections
- Use `<h1>` for page title, `<h2>` for sections
- Links use `<a>` tags
- Buttons use `<button>` or `<a role="button">`

---

## Layout Rules

### Max Width
- Content: max-w-2xl (672px)
- Full width on mobile
- Padding: px-6 sm:px-8 md:px-12

### Centering
- Container: mx-auto
- All sections centered horizontally

### Alignment
- Text: left-aligned (default)
- Headings: left-aligned (not centered)
- CTAs: not centered; allow natural flow

---

## Dark Mode (Future)
Not currently implemented. Light mode only.

---

## Usage Examples

### Section Template
```tsx
<section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
  <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
    <div className="space-y-8">
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
        Section Title
      </h2>
      <div className="space-y-6 text-lg text-rc-text leading-relaxed">
        {/* Body copy */}
      </div>
      <div className="pt-4">
        <a href="#" className="inline-flex items-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
          Call to Action
        </a>
      </div>
    </div>
  </div>
</section>
```

### Button Template
```tsx
<button className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg">
  Get Delivered
</button>
```

---

## Deployment Checklist

- [ ] All sections follow spacing rules
- [ ] Typography hierarchy is consistent
- [ ] Color usage is intentional
- [ ] Focus states are visible
- [ ] Hover states are smooth
- [ ] Mobile responsive (tested on 375px+)
- [ ] Navigation is sticky and clear
- [ ] All CTAs are accessible
- [ ] No broken links
- [ ] Performance: < 3s load time


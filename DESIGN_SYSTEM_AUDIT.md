# Brother Jimi Ministry — Design System Audit

**Status:** Complete  
**Date:** 2026-08-06  
**Version:** 1.0

---

## PREMIUM DESIGN PILLARS

What makes brotherjimi.com feel premium, prophetic, and authoritative:

### 1. COLOR PALETTE

**Foundation:**
- `rc-bg`: #FAFAF7 (ultra-refined off-white — luxury paper feel)
- `rc-text`: #1A1A18 (premium deep charcoal)
- `rc-accent`: #0D5E57 (refined deep teal — restoration/authority)
- `rc-warm-gray`: #EBE7E0 (refined warm gray — breathing room)
- `rc-border`: #E0D9D0 (premium border — subtle separation)

**Hero/Power Moments:**
- `from-rc-accent to-rc-text` gradient (dark, authoritative, prophetic)
- White text on dark background (maximum contrast, clarity)
- No bright colors, no generic web palettes

**Why this works:** The palette is "quiet luxury" — not shouty, not trendy. Deep teals and warm grays convey trust, faith, and stability. Off-white background keeps it premium (not clinical white).

### 2. TYPOGRAPHY

**Serif (Prophetic voice):**
- Font: Fraunces (Georgia/Garamond fallback)
- Class: `font-rc-serif`
- Usage: Headings, declarations, spiritual language
- Weight: Bold (700) for headlines, regular (400) for body
- Effect: Elevates language, makes it feel intentional

**Sans (Navigation/utility):**
- Font: System-ui defaults
- Class: `font-rc-sans`
- Usage: Labels, CTAs, metadata
- Weight: Medium (500) for emphasis

**Hierarchy:**
- H1: 3xl → 5xl (text-3xl sm:text-4xl md:text-5xl)
- H2: 4xl → 5xl (text-4xl md:text-5xl)
- Body: base → lg (text-base md:text-lg)
- Labels: xs → sm (text-xs, text-sm)

**Why this works:** Serif carries prophetic weight. Sans keeps interface clear. No mixing (never serif nav, never sans headings).

### 3. SPACING & RHYTHM

**Section Rhythm:**
- `py-24 md:py-32` — 96px→128px (generous vertical breathing)
- `px-6 sm:px-8 md:px-12` — 24px→48px (responsive horizontal)
- `max-w-2xl mx-auto` — 672px max content width (premium narrowness)
- `space-y-12` — 48px between elements (visual rest)

**Text Spacing:**
- Line-height: relaxed (1.625) — never tight
- Letter-spacing: tight tracking-tight (prophetic precision)
- `pt-2`, `pt-4` — intentional breathing between paragraphs

**Animation Spacing:**
- `transition: "duration: 0.8"` (never jarring, always smooth)
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (custom smooth curve)
- Stagger delays: 120ms, 240ms, 360ms (orchestrated entrance)

**Why this works:** Generous spacing creates premium feeling. Slow animations convey control and authority. Nothing rushes.

### 4. VISUAL HIERARCHY

**Importance levels (bottom to top):**
1. **Background** — rc-bg (refined off-white)
2. **Accents** — rc-accent color, borders
3. **Secondary Text** — rc-text/70 (70% opacity)
4. **Primary Text** — rc-text (full opacity)
5. **Emphasis** — font-medium (Jésus Christ, key phrases)
6. **Power Statements** — white text on dark (hero, CTAs)

**Visual Contrast:**
- Dark gradient sections anchor authority
- Light sections provide breathing room
- Border dividers (border-rc-border) separate without noise

### 5. COMPONENTS & PATTERNS

**Section Container:**
```
<section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-[color]">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    viewport={{ once: true, amount: 0.15 }}
    className="max-w-2xl mx-auto space-y-12"
  >
    {content}
  </motion.div>
</section>
```

**Consistent Patterns:**
- All sections scroll-trigger into view (motion)
- All content maxes at 2xl (672px)
- All use same easing curve (no janky transitions)
- All have vertical rhythm (py-24 md:py-32)

**Button Treatment:**
- Rounded-lg (not rounded-full, not square)
- White on color for primary (Request Deliverance)
- Border + white text for secondary (Watch Samuel)
- Hover: slight lift (-translate-y-0.5) + shadow
- Active: press-down (translate-y-0)

### 6. TONE & VOICE

**Prophetic, not corporate:**
- Short sentences. Full stop. Next thought.
- No marketing jargon (never "leverage," "synergy," "unlock")
- Declarative (never "We help you," always "[Thing] leaves you")
- Spiritual authority (Jesus, Spirit, deliverance — not commodified)

**Never:**
- Emoji icons
- Generic gradients
- Busy interfaces
- Flowery language
- Anything trendy or dated

**Always:**
- Intentional
- Human
- Prophetic
- Clear
- Minimal

---

## DESIGN DECISIONS TO CARRY FORWARD

These ARE the premium feel. Replicate everywhere:

✅ **Gradient hero sections** (from-rc-accent to-rc-text) for power moments  
✅ **Generous vertical spacing** (py-24 md:py-32)  
✅ **Serif for spiritual language** (headings, declarations)  
✅ **Scroll-triggered animations** (smooth, controlled)  
✅ **Dark text on light, white on dark** (never mid-gray on gray)  
✅ **Border accents left side** (border-l-4 border-rc-accent pl-8)  
✅ **2xl max-width** (not full bleed, not too narrow)  
✅ **Short, declarative copy** (rhythm matters)  

---

## NOT NEGOTIABLE

- No moving between serif/sans midstream
- No inconsistent spacing
- No half-second animations (smoothness signals authority)
- No jargon
- No generic components
- No "learn more" CTAs (action-specific)

---

## NEXT STEP

This design system is now canonical. Every page, component, and section must inherit these principles.


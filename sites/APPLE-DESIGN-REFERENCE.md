# Apple iPhone Duo — Design Reference (Complete)

**Source:** styles.refero.design  
**Theme:** Light  
**Product Page Philosophy:** "Foldable device in a white gallery. Center product renders as the visual event, with typography and blue controls kept deliberately quiet around it."

---

## CORE PRINCIPLE

Apple treats the product page as a **white gallery**: enormous product photography occupies the center while compact black typography gives each claim a controlled, almost editorial weight. The page alternates seamless white storytelling sections with #f5f5f7 feature bands containing oversized #ffffff cards, using **one saturated blue only** for links and compact conversion controls. Rounded 28px media frames soften the hardware-led composition without turning the page into a card dashboard; nearly every surface stays flat and shadowless.

---

## COLORS

| Name | Hex | Usage |
|------|-----|-------|
| Gallery White | `#ffffff` | Primary page canvas, hero background, product story sections |
| Studio Mist | `#f5f5f7` | Alternate full-width section background, feature-stage backdrop, footer |
| Paper Frost | `#fafafc` | Opened global-navigation surface and secondary pale fill |
| Hairline Silver | `#d6d6d6` | 1px dividers, restrained control outlines, subtle separators |
| Control Gray | `#e6e6e8` | Disabled control fills, subdued utility surfaces |
| Ink | `#1d1d1f` | Headlines, primary body copy, navigation labels |
| Slate | `#707070` | Secondary copy, legal text, subdued navigation content |
| Steel | `#86868b` | Input outlines, inactive indicators, fine outlined-control edges |
| Apple Blue | `#0066cc` | Inline links, section links, blue text controls |
| Pricing Blue | `#0071e3` | Filled pricing and learn-more controls — reserves visual urgency for conversion |
| Launch Orange | `#b64400` | Small launch-status labels only |

---

## TYPOGRAPHY

### Font Families

**SF Pro Display** — Product names, display headlines, large feature statements, section-level product claims. The 80px/600 hero treatment tightens to -1.2px, making the largest type feel compact rather than promotional.
- Weights: 400, 500, 600
- Sizes: 19px, 21px, 24px, 28px, 40px, 48px, 80px
- Letter spacing: -1.2px at 80px; 0px at 40px; +0.23px at 19-21px

**SF Pro Text** — Navigation, body copy, links, compact buttons, pricing details, labels, footnotes. The consistently negative tracking lets small interface text remain dense and Apple-specific instead of looking like generic system UI.
- Weights: 400, 500, 600
- Sizes: 10px, 12px, 14px, 17px, 20px, 26px, 44px
- Letter spacing: -0.37px at 10px, -0.12px at 12px, -0.22px at 14px, -0.37px at 17px

**Arial** — Fallback text inside search/input control only.

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing |
|------|--------|--------|------|-------------|----------------|
| Global Nav | SF Pro Text | 400 | 12px | 1 | -0.12px |
| Body Small | SF Pro Text | 400 | 14px | 1.29 | -0.224px |
| Body | SF Pro Text | 400 | 17px | 1.47 | -0.374px |
| Feature Copy | SF Pro Text | 400 | 17px | 1.24 | -0.374px |
| Product Nav Title | SF Pro Display | 600 | 19px | 1.21 | 0.228px |
| Product Kicker | SF Pro Display | 600 | 21px | 1 | 0.231px |
| Feature Heading | SF Pro Display | 600 | 40px | 1 | 0px |
| Hero Display | SF Pro Display | 600 | 80px | 1.05 | -1.2px |

---

## SPACING (Base Unit: 4px)

| Size | Value |
|------|-------|
| XS | 4px |
| SM | 8px |
| MD | 12px |
| LG | 16px |
| XL | 24px |
| 2XL | 32px |
| 3XL | 48px |
| 4XL | 64px |
| 5XL | 80px |
| 6XL | 120px |
| Full | 128px |
| Full 2 | 144px |

**Section Gap:** 90px  
**Card Padding:** 28px  
**Element Gap:** 20px

---

## BORDER RADIUS

| Element | Value |
|---------|-------|
| Cards | 28px |
| Links | 10px |
| Pills | 36px |
| Badges | 0px |
| Images | 28px |
| Inputs | 980px |
| Buttons | 9999px |
| Navigation | 20px |

---

## SHADOWS

**Intentionally Minimal** (flat design, no drop shadows)

- Subtle: `rgb(230, 230, 232) 0px 0px 0px 1px`
- Subtle 2: `rgb(134, 134, 139) 0px 0px 0px 1px`

Surfaces gain separation through **#ffffff against #f5f5f7**, 28px media corners, and sparse 1px #d6d6d6 edges rather than cast shadows.

---

## DO'S (Must Follow)

✓ Use #ffffff as default product-story canvas  
✓ Reserve #f5f5f7 for full-width feature bands and footer  
✓ Set display hero statements in SF Pro Display 80px/600, 84px line height, -1.2px tracking  
✓ Use SF Pro Text 17px/400 with -0.374px tracking for feature paragraphs  
✓ Use 28px radius for feature cards — keep shadowless  
✓ Use #0071e3 only for compact filled conversion pills with #ffffff text  
✓ Use #0066cc for inline links and textual section links  
✓ Space major storytelling sections by 90px  
✓ Use 20px gaps between related interface elements  

---

## DON'Ts (Never Do These)

✗ Do not add gradients  
✗ Do not use shadows on feature cards, editorial blocks, or floating pricing capsules  
✗ Do not replace 28px feature-card radius with 8px, 12px, or square corners  
✗ Do not use #0071e3 as large hero background or universal filled button color  
✗ Do not set hero headlines in bold 700 or wider tracking than -1.2px at 80px  
✗ Do not introduce colored status pills for launch labels; use bare #b64400 12px text  
✗ Do not place dense boxed UI panels over product renders  

---

## LAYOUT STRUCTURE

1. **Global Store Navigation** — Compact 44px white bar with Apple glyph, SF Pro Text 12px/400 links
2. **Product Local Navigation** — White bar with product name (SF Pro Display 19px/600) and right-aligned pill controls
3. **Hero Product Stage** — Full-bleed #ffffff with centered product name (21px/600) and 80px/600 display statement
4. **Product Render** — Oversized device centered beneath text, no card container
5. **Floating Pricing Callout** — #ffffff rounded 28px capsule with 14px/600 pricing text and blue conversion pill
6. **Highlights Section** — #f5f5f7 background with horizontally advancing #ffffff 28px-radius media cards
7. **Editorial Sections** — White canvas with left-aligned text blocks paired with oversized product imagery from right/below
8. **Closing Navigation** — Horizontal anchor links for long-form scrolling

**Spaciousness principle:** Image-led, not grid-led, no visible grid lines or conventional card stacks.

---

## IMAGERY

- High-resolution product photography and device renders only
- Hardware isolated against pure white or warm neutral backdrops
- Often cropped at oversized scale so form factor becomes composition
- Hands appear in hero to demonstrate physical scale
- Images either edge-free on white hero canvas OR contained in large 28px-radius white cards against #f5f5f7
- Product UI appears inside device screens as explanatory evidence
- Icons remain small, monochrome global-navigation glyphs

---

## CSS CUSTOM PROPERTIES

```css
:root {
  --color-gallery-white: #ffffff;
  --color-studio-mist: #f5f5f7;
  --color-paper-frost: #fafafc;
  --color-hairline-silver: #d6d6d6;
  --color-control-gray: #e6e6e8;
  --color-ink: #1d1d1f;
  --color-slate: #707070;
  --color-steel: #86868b;
  --color-apple-blue: #0066cc;
  --color-pricing-blue: #0071e3;
  --color-launch-orange: #b64400;

  --font-sf-pro-display: 'SF Pro Display', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-sf-pro-text: 'SF Pro Text', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-hero-display: 80px;
  --leading-hero-display: 1.05;
  --tracking-hero-display: -1.2px;
  --text-feature-heading: 40px;
  --leading-feature-heading: 1;
  --text-body: 17px;
  --leading-body: 1.47;
  --tracking-body: -0.374px;

  --section-gap: 90px;
  --card-padding: 28px;
  --element-gap: 20px;
  --radius-cards: 28px;
  --radius-buttons: 9999px;
}
```

---

## FOR BROTHERJIMI.COM ADAPTATION

**What we KEEP from Apple:**
- White gallery aesthetic (pure white backgrounds)
- Extreme spacing (90px section gaps)
- Minimal color palette (black + white + one accent)
- No shadows (flat design)
- 28px border radius for cards
- Pill-shaped buttons (9999px radius)
- Typography hierarchy (large headlines, small body)
- Product-focused composition (hands holding Bible = Apple's device render)

**What we ADAPT for salvation message:**
- Hero headline: "Receive Jesus" instead of product name
- Accent color: Gold/sage/burgundy instead of blue
- Fonts: Serif (Fraunces) + Sans (Inter) instead of SF Pro
- Card content: Quotable lines + Scripture instead of product specs
- Layout: Daily reflection cards instead of feature bands
- Overall tone: Spiritual revelation instead of product features

**Result:** Maintains Apple's premium aesthetic while centering salvation-centered content.

---

**Status:** Reference locked. Ready to build brotherjimi.com using this system adapted for our message.
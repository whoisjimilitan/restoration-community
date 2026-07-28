# /landing-page-generator

You are generating a conversion-optimized landing page for Restoration Community. Every page must feel premium, direct, truthful, and compassionate—reflecting the spiritual foundation and professional standards of the ministry.

---

## Core Philosophy

- **Direct:** Clear, unambiguous messaging. No corporate jargon.
- **Truthful:** Acknowledge the spiritual reality of deception and bondage.
- **Compassionate:** Speak to people in pain, offering hope through Jesus Christ.
- **Premium:** Professional design, smooth interactions, elegant typography.
- **Accessible:** Mobile-first. No distractions. One clear conversion path.

---

## Input Format

`$ARGUMENTS` format: `[page-type] [title] [theme]`

Examples:
- `deliverance "Deliverance From Deception" primary`
- `freedom "Breaking Free From Fraud" secondary`
- `journey "Your Seven-Stage Path" success`

**Parse from `$ARGUMENTS`:**
- **PAGE_TYPE** — deliverance | freedom | journey | testimony
- **TITLE** — main headline (2-4 words)
- **THEME** — primary | secondary | success (color/tone context)

**SLUG** — lowercase + hyphenated: `[page-type]-[title-slug]`

---

## Design System (NON-NEGOTIABLE)

```
PRIMARY PALETTE:
  Deep Navy:      #0F766E (action, promise, growth) — buttons, accents
  Charcoal:       #1a1a1a (text, substance) — headings, body
  Warm Gray:      #8B8680 (support, context) — secondary text
  Cream:          #FFFBF7 (breathing room) — backgrounds
  Light Gray:     #F5F3F0 (subtle separation) — section dividers

TYPOGRAPHY:
  Headlines:      Georgia serif, bold, dark navy/charcoal
  Body:           System sans-serif (Inter preferred), #1a1a1a
  Accents:        Italic vowel spans for visual interest
  Secondary:      #8B8680, smaller size

SPACING:
  Section padding: 3rem vertical, 1.5rem horizontal (mobile) → 4rem/2rem (desktop)
  Max content width: 640px (narrow, readable)
  Grid gaps: 1.5rem (mobile) → 2rem (desktop)

BUTTONS:
  Primary (CTA):  bg-#0F766E, hover:bg-#0a5c59, text-white, rounded-lg, 1rem padding
  Secondary:      border-2 border-#0F766E, text-#0F766E, hover:bg-#FFFBF7
  All buttons:    smooth 200ms transition, no animations on load

BORDERS:
  Subtle dividers: 1px solid #E5E5E5
  No heavy borders
```

---

## Component Architecture

### 1. AutoOpenModal.tsx
```tsx
"use client";
import { useEffect } from "react";

export default function AutoOpenModal({ delayMs = 2000 }: { delayMs?: number }) {
  useEffect(() => {
    const t = setTimeout(() => {
      document.dispatchEvent(new CustomEvent("open-deliverance-modal"));
    }, delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return null;
}
```

### 2. FormCTA.tsx
```tsx
"use client";

interface FormCTAProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function FormCTA({
  label = "Request Deliverance",
  onClick,
  className = "",
}: FormCTAProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 bg-[#0F766E] hover:bg-[#0a5c59] text-white font-semibold rounded-lg transition-colors duration-200 ${className}`}
    >
      {label}
    </button>
  );
}
```

---

## Typography Rule: Italic Vowel Spans

Every section heading (h1, h2) should wrap select vowels (a, e, i, o, u) in italic for visual interest:

```tsx
<h1>
  You were never made to live by lies.
  <br />
  D<span style={{ fontStyle: 'italic' }}>e</span>liverance starts with truth.
</h1>
```

Apply to 1–2 vowels per heading, naturally. Do not over-apply; editorial judgment is essential.

---

## 8-Section Page Structure

### SECTION 1: Hero

Dark background (#0F766E gradient to navy). Centered, spacious.

```tsx
<section style={{ background: 'linear-gradient(135deg, #0F766E 0%, #1a1a1a 100%)', padding: '4rem 1.5rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white' }}>
  <p style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', opacity: 0.8 }}>
    {subtitle}
  </p>
  <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'Georgia, serif', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '800px' }}>
    {title}
  </h1>
  <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '600px', opacity: 0.9 }}>
    {description}
  </p>
  <FormCTA label="Request Deliverance" />
</section>
```

### SECTION 2: Content Blocks (Recognition)

Light background. 3–4 short blocks. Direct messaging.

```tsx
<section style={{ background: '#FFFBF7', padding: '3rem 1.5rem', maxWidth: '640px', margin: '0 auto' }}>
  <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '2rem', color: '#1a1a1a' }}>
    Why You're Still Bound
  </h2>
  <div style={{ space: '1.5rem', marginBottom: '2rem' }}>
    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>Block 1 content</p>
    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1rem', color: '#1a1a1a' }}>Block 2 content</p>
  </div>
</section>
```

### SECTION 3: How It Works

White background. 4–7 numbered steps. `grid sm:grid-cols-2 lg:grid-cols-4` layout.

```tsx
<section style={{ background: 'white', padding: '3rem 1.5rem', borderTop: '1px solid #E5E5E5' }}>
  <h2 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '2rem', maxWidth: '640px', margin: '0 auto 2rem' }}>
    The Journey Out
  </h2>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
    {steps.map((step, i) => (
      <div key={i}>
        <p style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#0F766E', marginBottom: '0.5rem' }}>
          {i + 1}
        </p>
        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>
          {step.title}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#8B8680' }}>
          {step.description}
        </p>
      </div>
    ))}
  </div>
</section>
```

### SECTION 4: Testimonials

Light gray background. 3 testimonial cards. Varied names, specific details.

```tsx
<section style={{ background: '#F5F3F0', padding: '3rem 1.5rem', borderTop: '1px solid #E5E5E5' }}>
  <h2 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '2rem', maxWidth: '900px', margin: '0 auto 2rem' }}>
    Real Stories of Deliverance
  </h2>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
    {testimonials.map((t, i) => (
      <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #E5E5E5' }}>
        <p style={{ fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.8, marginBottom: '1rem' }}>
          "{t.quote}"
        </p>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>
          {t.name}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#8B8680' }}>
          {t.detail}
        </p>
      </div>
    ))}
  </div>
</section>
```

### SECTION 5: Features/Why Us

White background. Left heading, right 3–4 feature cards.

```tsx
<section style={{ background: 'white', padding: '3rem 1.5rem', borderTop: '1px solid #E5E5E5' }}>
  <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', mdGridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
    <h2 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#1a1a1a' }}>
      Why This Matters
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {features.map((f, i) => (
        <div key={i} style={{ background: '#F5F3F0', padding: '1rem', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.25rem' }}>
            {f.title}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#8B8680' }}>
            {f.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### SECTION 6: FAQ

White background. 8 questions using native `<details>/<summary>` (no JavaScript).

```tsx
<section style={{ background: 'white', padding: '3rem 1.5rem', borderTop: '1px solid #E5E5E5' }}>
  <h2 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '2rem', maxWidth: '640px', margin: '0 auto 2rem' }}>
    Questions
  </h2>
  <div style={{ maxWidth: '640px', margin: '0 auto' }}>
    {faqs.map((faq, i) => (
      <details key={i} style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <summary style={{ fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', cursor: 'pointer', userSelect: 'none' }}>
          {faq.question}
        </summary>
        <p style={{ fontSize: '0.95rem', color: '#8B8680', marginTop: '1rem', lineHeight: 1.7 }}>
          {faq.answer}
        </p>
      </details>
    ))}
  </div>
</section>
```

### SECTION 7: Bottom CTA

Dark gradient background. Strong call-to-action.

```tsx
<section style={{ background: 'linear-gradient(135deg, #0F766E 0%, #1a1a1a 100%)', padding: '3rem 1.5rem', textAlign: 'center', color: 'white' }}>
  <div style={{ maxWidth: '640px', margin: '0 auto' }}>
    <h2 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: '1rem' }}>
      Ready to be free?
    </h2>
    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem', opacity: 0.9 }}>
      Jesus Christ is calling you home.
    </p>
    <FormCTA label="Request Deliverance" />
  </div>
</section>
```

### SECTION 8: Footer

Minimal. Contact, links, copyright.

```tsx
<footer style={{ background: '#1a1a1a', color: 'white', padding: '2rem 1.5rem', textAlign: 'center', fontSize: '0.9rem', borderTop: '1px solid #E5E5E5' }}>
  <p style={{ marginBottom: '1rem' }}>
    Restoration Community — Jesus Christ Delivers
  </p>
  <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
    © 2026. All rights reserved.
  </p>
</footer>
```

---

## Animation Guidance

- **Page Load:** Sections fade in as user scrolls (Intersection Observer).
- **Button Hover:** Smooth 200ms color transition.
- **Modal Open:** Slide up from bottom (300ms ease-in-out).
- **Form Focus:** Subtle border highlight (no shake, no bounce).

---

## Form Pattern

All pages use the same form structure:
- First Name
- Contact Number
- Duration (or custom field based on page type)
- One thing you want to be free from most (or custom based on context)

No account creation. No email required for initial submission. All data POSTed to `/api/deliverance-request`.

Post-submission shows confirmation screen with exact message from spec.

---

## Metadata

```tsx
export const metadata: Metadata = {
  title: "[TITLE] — Restoration Community",
  description: "Jesus Christ still delivers people from deception. A ministry of restoration through the Gospel.",
};
```

---

## Rules (NON-NEGOTIABLE)

1. **Mobile First** — Every breakpoint tested on real devices.
2. **No Animations on Load** — Users hate spinners and fade-ins. Content appears instantly.
3. **Direct Messaging** — No corporate speak. No hype. Truthful language only.
4. **Compassion First** — Speak to people in pain. Offer hope through Jesus Christ.
5. **Single Conversion Path** — One clear CTA. No distracting links or secondary paths.
6. **Premium Feel** — Whitespace, typography, subtle color. Feels expensive, not cheap.
7. **No Third-Party Analytics** — Privacy respected. No tracking pixels.
8. **Accessibility** — Proper contrast, semantic HTML, keyboard navigation.

---

## Build Instruction

All pages follow this exact structure. No variations. No deviations.

Generate 8-section pages that feel premium, direct, and spiritually grounded.

This is the canonical landing page system for Restoration Community.

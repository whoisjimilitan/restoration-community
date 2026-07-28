# /landing-page-generator

You are generating a conversion-optimized landing page for Restoration Community. Every page must feel premium, direct, truthful, and compassionate—reflecting the spiritual foundation and professional standards of the ministry.

---

## Core Philosophy

- **Direct:** Clear, unambiguous messaging. No corporate jargon.
- **Truthful:** Acknowledge the spiritual reality of deception and bondage.
- **Compassionate:** Speak to people in pain, offering hope through Jesus Christ.
- **Premium:** Professional design, smooth interactions, elegant typography.
- **Accessible:** Mobile-first. No distractions. One clear conversion path.
- **Crafted:** Every detail intentional. Built by humans who understand the audience, not formula-generated.

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
PRIMARY PALETTE (aligned with Restoration Community):
  Deep Teal:      #0D5E57 (action, promise, growth) — buttons, accents
  Charcoal:       #1A1A18 (text, substance) — headings, body
  Warm Gray:      #8A8A80 (support, context) — secondary text
  Off-white:      #FAFAF7 (breathing room) — backgrounds
  Warm Gray Light:#EBE7E0 (subtle separation) — section dividers

TYPOGRAPHY:
  Headlines:      Georgia serif, bold, deep teal/charcoal
  Body:           Inter or system sans-serif, #1A1A18
  Accents:        Italic vowel spans for visual interest (judicious)
  Secondary:      #8A8A80, smaller size

SPACING:
  Section padding: 3rem vertical, 1.5rem horizontal (mobile) → 4rem/2rem (desktop)
  Max content width: 640px (narrow, readable, intimate)
  Grid gaps: 1.5rem (mobile) → 2rem (desktop)

BUTTONS:
  Primary (CTA):  bg-#0D5E57, hover:bg-#1B7A6F, text-white, rounded-lg, py-4 px-8
  Secondary:      border-2 border-#0D5E57, text-#0D5E57, hover:bg-rc-warm-gray
  All buttons:    smooth 200ms transition, no animations on load

BORDERS:
  Subtle dividers: 1px solid #E0D9D0
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
      className={`px-8 py-4 bg-rc-accent hover:bg-rc-accent-light text-white font-semibold rounded-lg transition-colors duration-200 ${className}`}
    >
      {label}
    </button>
  );
}
```

---

## Key Pattern: Restoration Community Form

The `/deliverance` form page uses this exact structure:

```tsx
'use client';
import { useState } from 'react';

export default function DeliverancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    contactNumber: '',
    duration: '',
    freedomFrom: ''
  });

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    // POST to /api/deliverance-request
    // On success: show confirmation page
  };

  // Confirmation page shows:
  // "Thank you. We have received your request. We will call you personally very soon."
  // + 7 lines of next steps
}
```

**Form Fields (always):**
1. First Name
2. Contact Number
3. Duration (or context-specific field)
4. One thing you want to be free from (or custom based on journey)

**No:** account creation, email verification, signup flow.
**Only:** identification + context capture.

---

## Homepage Pattern

The homepage (`/`) showcases the full journey journey:

1. **HeroSection** — Gradient dark teal to charcoal, centered headline, load-in animations (opacity + translate-y)
2. **RecognitionSection** — Content blocks addressing visitor's pain
3. **TestimonySection** — Founder or community witness
4. **BridgeSection** — Answer doubts, clarify approach
5. **JourneySection** — 7-stage timeline with interactive elements
6. **CommunitySection** — Support structure, belonging
7. **HonestWorkSection** — Practical transformation outcomes
8. **InvitationSection** — Final CTA linking to `/deliverance` form

Each section uses:
- Tailwind classes, not inline styles
- Color variables (rc-text, rc-accent, rc-bg, etc.)
- Cascading fade-in animations on load (120ms, 240ms, 360ms delays)
- Max-width: 2xl (max-w-2xl), centered content
- Generous whitespace and vertical rhythm

---

## Animation Guidance

- **Page Load:** Sections fade in on mount with staggered delays (no excessive motion)
- **Button Hover:** Smooth 200ms bg-color transition
- **Modal Open:** Slide up from bottom (300ms ease-in-out)
- **Form Focus:** Subtle border highlight + ring (no shake, no bounce)
- **Scroll:** Content transitions as user scrolls (optional Intersection Observer)

---

## Typography Rule: Italic Vowel Spans

Use sparingly for emphasis and visual interest:

```tsx
<p>
  D<span style={{ fontStyle: 'italic' }}>e</span>liverance is just the start.
</p>
```

Apply 1–2 vowels per heading, naturally. **Do NOT over-apply.** Editorial judgment is essential. This is a craft detail, not a formula.

---

## Form Pattern (Detailed)

All deliverance-related forms follow this pattern:

```tsx
<div>
  <label className="block text-sm font-medium text-rc-text mb-2">
    First Name
  </label>
  <input
    type="text"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border border-rc-border rounded-lg text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:ring-2 focus:ring-rc-accent focus:border-transparent transition-all duration-200"
    placeholder="Your first name"
  />
</div>
```

- Clear, readable labels
- Ample padding (py-3, px-4)
- Soft borders (#E0D9D0)
- Focus ring in brand accent color
- Placeholder text in tertiary gray
- No spinners or loaders on load

---

## Metadata

```tsx
export const metadata: Metadata = {
  title: "[TITLE] — Restoration Community",
  description: "Jesus Christ still delivers people from deception. A ministry of restoration through the Gospel.",
};
```

---

## Non-Negotiable Rules

1. **Mobile First** — Every breakpoint tested on real devices.
2. **No Animations on Load** — Content appears instantly. Users hate spinners.
3. **Direct Messaging** — No corporate speak. No hype. Truthful language.
4. **Compassion First** — Speak to pain. Offer hope through Jesus Christ.
5. **Single Conversion Path** — One clear CTA per page. No distracting links.
6. **Premium Feel** — Whitespace, typography, subtle color. Feels intentional, not generated.
7. **No Analytics** — Privacy respected. No tracking pixels or third-party data.
8. **Accessibility** — Proper contrast, semantic HTML, keyboard navigation.
9. **Human Crafted** — Intentional detail. Built by people who understand the audience.
10. **Use Tailwind Classes** — Never inline styles. Maintainability and consistency.

---

## Build Instruction

All pages follow this exact structure. No variations. No deviations.

Generate premium, direct, truthful landing pages that feel human-crafted and spiritually grounded.

This is the canonical landing page system for Restoration Community.

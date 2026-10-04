---
name: homepage-rhythm-pace-spacing
description: "Visual rhythm, typography spacing, and voice weight for restoration community homepage—canonical template for all future pages"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0d00840f-0829-441c-8608-48ef987b78ee
---

## The Rhythm, Pace, and Weight: Brother Jimi Ministry Homepage

This document preserves the final, refined rhythm and pacing established for the restoration community homepage. Use this as the canonical template and reference for all future pages on the restoration community website.

### Core Philosophy

**Less is more.**

Every element must justify its existence. Whitespace is a design element. Copy sounds human—never AI-generated. The page should be skimmable in under 20 seconds.

---

## Visual Rhythm & Spacing

### Section Spacing
- Vertical space between sections: `py-24 md:py-32` (consistent breathing room)
- Border between sections: `border-t border-rc-border` (subtle visual separation)
- Inner container max-width: `max-w-2xl mx-auto` (reading width, narrow enough for intimacy)
- Inner spacing: `space-y-8` between content blocks

### Typography Hierarchy
- **Headers:** `text-3xl md:text-4xl font-rc-serif font-bold` (serif, bold, large but not oversized)
- **Body text:** `text-base md:text-lg text-rc-text leading-relaxed font-light` (light weight, generous line-height)
- **Emphasis:** `font-medium` (not bold, not italic—medium weight for prophetic weight)

### Line Breaking (Pacing)
- Short statements on individual lines (psychological commitment reduction)
- Group related ideas with `pt-3` spacing (visual grouping, micro-paragraphing)
- Example pacing (from "You were made for something far better"):
  ```
  Scamming and fraud promise freedom.
  They only bind you tighter.
  
  This is a spiritual trap.
  Only One Man can set you free.
  ```
- This creates **rhythm**—vary between single-line ideas and two-line groups

### Font Weights by Content Type
- **Standard body:** `font-light` (most copy—accessible, not heavy)
- **Prophetic declarations:** `font-medium` (moves conviction forward without screaming)
- **Narrative/voice:** `font-light` with occasional `font-medium` for pivotal moments
- Never use `font-bold` in body copy outside headers

---

## Voice Weight & Psychological Pacing

### Recognition Before Persuasion
1. **Hero:** Immediate, prophetic statement → "You were made for something far better"
2. **Problem:** Personal acknowledgment → "I too was controlled by that spirit"
3. **Solution:** Theological positioning → "Jesus Christ is the only way"
4. **Transformation:** Future state → "Deliverance is just the start"
5. **Testimony:** Specific, lineage-honoring → "What Jesus did for me through him. He will do for you through me."
6. **Action:** Low-friction identification → Prepare email with their company name pre-filled

### Specific Language Weights (Do Not Regress)

**Preserve these exactly—they carry prophetic authority:**

| Phrase | Why | Usage |
|--------|-----|-------|
| "You were made for something far better" | Prophetic promise, not marketing | Hero opening |
| "Scamming and fraud promise freedom. / They only bind you tighter." | Spiritual diagnosis, personal | Problem statement |
| "The spirit controlling our young people. / Across nations." | Specificity + scale, not generic | Spiritual problem identification |
| "Until my encounter with One Man." | Prophetic anticipation | Testimonial setup |
| "What Jesus did for me through him. / He will do for you through me." | Transmission of authority + hope | Testimonial climax |
| "The trap is real. / But so is the Deliverer." | Theological weight, binary clarity | Return section |
| "Jesus Christ sets you free." | Simple, declarative, final | CTA-adjacent statement |

---

## Section-by-Section Pacing

### Hero Section
- Tagline: `text-xs font-medium text-white/70 uppercase tracking-wider` (small, aspirational)
- Main headline: `text-3xl sm:text-4xl md:text-5xl` (serif, bold, carries emotional weight)
- Body: Short lines, 2-3 words per line where possible; use line breaks for rhythm
- Psychology: Recognition first ("this was made for me"), then problem, then solution

### Body Sections (The Trap, The Only Way, The Encounter, The New Life)
- All use same spacing: `space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light`
- Use `className="pt-2"` or `pt-3"` for grouping related ideas (creates micro-paragraphs)
- Use `className="font-medium"` for pivotal statements (prophetic weight, not marketing)
- Read aloud test: if you stumble on the line breaks, adjust them

### Journey/Timeline Section
- Desktop: horizontal flow with 7-stage timeline (visual journey, not list)
- Mobile: vertical left-aligned with colored left border
- Closing text: `space-y-4` with `border-t border-rc-text/15` dividing visual sections
- Psychology: The journey gives structure; closing text gives ownership and community

### Prayer & Encounter Sections
- **Prayer:** Short, punchy (3 lines)—establishes precondition
- **Encounter:** Longer, testimonial (7 lines with spacing)—builds to "through him / through me" climax
- Both use `pt-3` to separate idea groups
- The testimonial must honor lineage: "What Jesus did for me through [previous vessel]. He will do for you through [current vessel]."

### Return Section
- Dark gradient background: `bg-gradient-to-br from-rc-accent to-rc-text` (prophetic weight, visual finality)
- White text: `text-white`, `text-white/90` (maximum contrast, maximum clarity)
- Shorter, declarative statements (the journey is complete, now choose)
- Ends with low-friction CTA (email, not phone)

---

## What NOT to Do (Anti-Patterns)

1. ❌ Don't use "Our Service" or "Learn How" language—speak to the reader's reality, not yours
2. ❌ Don't repeat hedging language ("maybe," "could," "might")—prophetic voice is certain
3. ❌ Don't use generic marketing copy ("We've helped thousands...")—use specific testimony
4. ❌ Don't break the line rhythm with long sentences—short statements create psychological commitment
5. ❌ Don't use emoji, icons, or visual noise—whitespace is the design
6. ❌ Don't soften the spiritual diagnosis ("some people struggle")—name it directly ("the spirit controlling our young people")
7. ❌ Don't end sections without clear transition to next idea—pacing must feel inevitable, not scattered
8. ❌ Don't regress to "preachy" language ("The Living Word is ready in me")—transmission language is better ("What Jesus did for me through him")

---

## Color Palette & Atmosphere

- **Hero & Return:** Dark (accent → text gradient for prophetic weight)
- **Warm sections:** `bg-rc-warm-gray` (The Witness, The Encounter, lighter breathing room)
- **Standard:** `bg-rc-bg` (neutral, readable, not distracting)
- **Accents:** `border-rc-accent`, `text-rc-accent` (teal, for highlights and CTAs)

All sections must feel cohesive—design language inherited from homepage, not templated or generic.

---

## Testimonial Language Template

Use this structure for future testimonials:

```
[When]
[What happened]
[Who was involved]

[Specific outcome]

[Theological statement]
[Authority transmission: "What [previous vessel] did / He will do for you through [current vessel]"]
```

Example from "The Encounter":
```
In 2013.
God used His servant Prophet TB Joshua.
To pray for me.

One prayer.
Freedom from fraud.

What Jesus did for me through him.
He will do for you through me.
```

---

## Implementation Checklist for New Pages

When building new pages using this rhythm:

- [ ] Read this guide end-to-end first
- [ ] Follow the section-by-section pacing exactly
- [ ] Use the preserved phrases where applicable
- [ ] Test line breaks by reading aloud
- [ ] Verify the page is skimmable in 20 seconds
- [ ] Check that no marketing language crept in
- [ ] Ensure prophetic voice remains consistent (certain, not hedging)
- [ ] Verify spacing matches: `py-24 md:py-32`, `space-y-4/8`, `pt-2/3` grouping
- [ ] Build and test in browser before merging
- [ ] Do not regress on any "Preserve" phrase or section structure

---

## Why This Works

This rhythm works because:

1. **Psychological:** Short lines reduce commitment friction; readers feel less overwhelmed
2. **Prophetic:** Medium weight and certain language create authority without aggression
3. **Accessible:** Light typography weight + generous spacing = easy to read, not exhausting
4. **Scannable:** High contrast between ideas; 20-second skim captures the message
5. **Spiritual:** Honors lineage and transmission of authority; feels like encounter, not marketing
6. **Designed:** Whitespace as element, not accident; every line break has purpose
7. **Memorable:** Specific phrases stick because they're phonetic, prophetic, not generic

---

**This is the rhythm Brother Jimi ministry pages should echo.**

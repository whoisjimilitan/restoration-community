---
name: glass-card-design-standard
description: "Finalized glass card design pattern for teaching videos—framed statements with proper hierarchy, no labels"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 8d24422f-6d6b-4792-9952-d6e71877bfae
---

## Glass Card Design Standard

**Approved design for all teaching video glass cards.** Simple, direct, powerful.

### Structure
- **No labels** — statements land harder without meta-commentary
- **Bold statement only** — 38px Fraunces, font-weight 600
- **Proper framing** — visible card border, padding, glass effect
- **Centered** — horizontal and vertical center alignment

### CSS

```css
.glass-card {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 75%;
  background: rgba(13, 94, 87, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding: 32px 48px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  opacity: 0;  /* animated via GSAP */
}

.glass-card-statement {
  font-family: 'Fraunces', serif;
  font-size: 38px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: #ffffff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
}
```

### HTML

```html
<div class="glass-card clip" data-start="[TIME]" data-duration="[HOLD_SECONDS]">
  <div class="glass-card-statement">[Direct teaching statement]</div>
</div>
```

### Guidelines

| Rule | Why |
|------|-----|
| No labels (e.g., "FOUNDATION", "CORE TRUTH") | Verbose. Viewers don't need meta-structure—statements land harder on their own |
| Direct, observational statements (not accusatory) | "You believe but nothing is changing" (experience) vs "Your life hasn't changed" (judgment) |
| 38px Fraunces bold | Large enough to read, serif conveys authority, bold ensures prominence |
| Centered bottom position | Eye-level, doesn't compete with captions (which are lower) |
| 4–7 second hold (longer for confrontation) | Time to land the statement; confrontation truths get 7s |
| Fade-in/fade-out 0.4s | Smooth entrance/exit; doesn't jolt |

### Example (REC049)

1. "You believe but nothing is changing" (2.5s, 5s hold)
2. "Real belief is action. When you believe, you act on it." (62.5s, 4s)
3. "You respond to reason instead of God's Word." (202.5s, 4s)
4. "The wise man is the doer of the Word, not the thinker." (284.5s, 4s)
5. "Your situation hasn't changed because you haven't acted on the Word." (392.5s, 7s — confrontation)
6. "You have the Holy Spirit as your wisdom and strength." (482.5s, 4s)
7. "Be a doer of the Word, not just a hearer." (542.5s, 5s)

### GSAP Animation

```js
const card = document.querySelector('.glass-card');
const start = parseFloat(card.getAttribute('data-start'));
const duration = parseFloat(card.getAttribute('data-duration'));

// Fade in
tl.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, start);

// Fade out
tl.to(card, { opacity: 0, duration: 0.4, ease: 'power2.in' }, start + duration - 0.4);
```

---

**Status:** Finalized and approved for production. This is the standard glass card design for all future teaching videos.

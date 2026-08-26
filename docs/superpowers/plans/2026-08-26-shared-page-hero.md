# Shared Photo-Backed Page Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable `PageHero` component and apply it to `/about`, `/get-help`, and `/scriptures`, giving each a real photo-backed hero (or, for `/scriptures`, the deliberate no-photo flat gradient) instead of the identical flat gradient all three currently share.

**Architecture:** One new component (`apps/web/src/components/PageHero.tsx`) that renders either a photo + translucent charcoal overlay (matching the homepage hero's exact gradient math) or, when no photo is passed, the existing flat opaque gradient unchanged — so the no-photo case is a byte-for-byte visual match to what `/scriptures` already renders today, zero regression risk there.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, Framer Motion (existing project dependencies, no new packages).

## Global Constraints

- Work happens in `restoration-community`, `main` branch (already promoted to production at brotherjimi.com — this is the active repo), dev server at `localhost:4021`.
- No `git add -A` or `git add .` anywhere — stage explicit file paths only. This repo has pre-existing untracked files (`node_modules` not correctly gitignored for undiagnosed reasons) that must never be swept into a commit.
- The photo-overlay gradient must be exactly `bg-gradient-to-br from-rc-accent/85 to-rc-text/90` — the same math used on the homepage hero, so every photo-backed hero on the site shares one tonal identity.
- `min-h-[60svh]` (not `vh`) — matches the homepage's mobile-Safari-safe viewport unit.
- No new colors, no new typeface. Stay inside existing `rc-*` tokens and Fraunces serif + sans body.
- `/scriptures` gets no photo — this is a deliberate spec decision, not a gap. Its hero must render identically to its current flat-gradient look.
- `/get-help`'s existing H1 is `text-3xl sm:text-4xl md:text-5xl` — one size smaller than `/about` and `/scriptures`'s `text-4xl sm:text-5xl md:text-6xl`. Decision, made explicit here rather than left ambiguous: **keep `/get-help`'s smaller size** via an optional size-override prop on `PageHero`. Reason: its headline ("If You Identify With This Spirit, There Is a Way Out") is meaningfully longer than `/about`'s ("About Brother Jimi") or `/scriptures`'s ("Scriptures That Shaped My Story") — at the larger scale it would wrap across 3 lines and read as disproportionately heavy. This is a stated, documented exception, not an unexplained inconsistency.

---

### Task 1: Create the `PageHero` component

**Files:**
- Create: `apps/web/src/components/PageHero.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `PageHero` component with props `{ headline: string; photo?: { src: string; alt: string }; headlineSizeClass?: string }`. Tasks 2-4 import and use this exact signature — `photo` is optional (its absence, not a separate boolean flag, is what triggers the no-photo flat-gradient path), `headlineSizeClass` is optional and defaults to `'text-4xl sm:text-5xl md:text-6xl'` when omitted.

- [ ] **Step 1: Write the component**

```tsx
'use client';

import { motion, type Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

type PageHeroProps = {
  headline: string;
  photo?: { src: string; alt: string };
  headlineSizeClass?: string;
};

/** Shared inner-page hero: a real photo + the homepage's exact charcoal
 *  overlay math when a photo is given, or the existing flat gradient
 *  unchanged when it isn't — so pages with no photo (e.g. /scriptures)
 *  render identically to what they always have. */
export default function PageHero({ headline, photo, headlineSizeClass }: PageHeroProps) {
  const sizeClass = headlineSizeClass ?? 'text-4xl sm:text-5xl md:text-6xl';

  return (
    <section
      className={`relative w-full min-h-[60svh] flex flex-col justify-center overflow-hidden px-6 sm:px-8 md:px-12 py-24 md:py-32 ${
        photo ? 'bg-rc-text' : 'bg-gradient-to-br from-rc-accent to-rc-text'
      }`}
    >
      {photo && (
        <>
          <img
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rc-accent/85 to-rc-text/90" />
        </>
      )}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative max-w-2xl mx-auto w-full text-center"
      >
        <motion.h1 variants={fadeInLine} className={`${sizeClass} font-rc-serif font-bold text-white leading-tight tracking-tight`}>
          {headline}
        </motion.h1>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /Users/jimilitan/Documents/GitHub/restoration-community/apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep PageHero`
Expected: no output (no type errors referencing this new file). It isn't imported anywhere yet, so there's nothing to render-test until Task 2.

- [ ] **Step 3: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community
git add apps/web/src/components/PageHero.tsx
git commit -m "feat: add shared PageHero component (photo + charcoal overlay, or flat gradient when no photo)"
```

---

### Task 2: Apply `PageHero` to `/about`

**Files:**
- Modify: `apps/web/app/about/page.tsx`

**Interfaces:**
- Consumes: `PageHero` from Task 1, exact props `{ headline, photo: { src, alt } }`.
- Produces: nothing for later tasks — Tasks 3 and 4 touch different files.

**Current hero section (for reference, lines 20-31):**
```tsx
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            About Brother Jimi
          </motion.h1>
        </motion.div>
      </section>
```

- [ ] **Step 1: Add the import**

Add near the top of `apps/web/app/about/page.tsx`, with the other imports:

```tsx
import PageHero from '@/components/PageHero';
```

- [ ] **Step 2: Replace the hero section**

Replace the entire `<section>...</section>` block quoted above with:

```tsx
      <PageHero
        headline="About Brother Jimi"
        photo={{ src: '/images/portrait-hero-website.jpg', alt: 'Brother Jimi' }}
      />
```

Note: `staggerContainer` and `fadeInLine` may still be used elsewhere later in this same file (check before removing their definitions) — the hero's own use of them now lives inside `PageHero`, but the rest of the page's `motion.p` elements still need the local copies if they're still there.

- [ ] **Step 3: Verify it renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4021/about`
Expected: `200`

Manually load `http://localhost:4021/about` and confirm:
- The hero now shows the real portrait photo (`portrait-hero-website.jpg`) with a charcoal gradient overlay, not the flat gradient
- Headline "About Brother Jimi" is still legible in white, same size/weight as before
- Rest of the page (body content, closing CTA, footer) is unchanged

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community
git add apps/web/app/about/page.tsx
git commit -m "feat(/about): use shared PageHero with real portrait photo"
```

---

### Task 3: Apply `PageHero` to `/get-help`

**Files:**
- Modify: `apps/web/app/get-help/page.tsx`

**Interfaces:**
- Consumes: `PageHero` from Task 1, props `{ headline, photo, headlineSizeClass: 'text-3xl sm:text-4xl md:text-5xl' }` — the smaller size override, per the Global Constraints decision.
- Produces: nothing for later tasks.

**Current hero section (for reference — this page's hero has more content than `/about`'s: body paragraphs and a link, both must be preserved exactly, only the outer section/H1 wrapper changes):**
```tsx
      <section ref={heroRef} className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <motion.h1 variants={fadeInLine} className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            If You Identify With This Spirit, There Is a Way Out
          </motion.h1>
          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light text-left border-l-4 border-white/30 pl-6 md:pl-8">
            <motion.p variants={fadeInLine}>Fraud is not just a habit. It is not just a choice. If you are caught in this lifestyle and you cannot stop, it may be because a spirit is operating inside you.</motion.p>
            <motion.p variants={fadeInLine} className="pt-2">I know because I carried one for twenty years. His name was Weje and he controlled my affairs until Jesus Christ cast him out in May 2015.</motion.p>
            <motion.p variants={fadeInLine}>That was the same year Jeremiah 17:11 stopped describing someone else's life. And started describing mine.</motion.p>
            <motion.p variants={fadeInLine} className="pt-2 font-medium">The same Jesus who set me free can set you free. You do not have to carry this alone. Make me your prayer partner and let us seek deliverance together.</motion.p>
          </motion.div>
          <motion.a
            variants={fadeInLine}
            href="/about"
            className="inline-block text-sm text-white/60 hover:text-white hover:underline"
          >
            Want the fuller story first? Read about who I am →
          </motion.a>
        </motion.div>
      </section>
```

This page's hero has a scroll-parallax effect (`heroRef`, `heroY`, `heroOpacity` via `useScroll`/`useTransform`) on its content — `PageHero` does not support this, and adding it would expand `PageHero`'s interface for a single caller. Keep the parallax wrapper as this page's own concern: `PageHero` supplies only the background (photo + overlay) and the H1; the body paragraphs, link, and parallax motion stay in this file exactly as they are, layered on top of `PageHero` via `position: relative` stacking, not passed through it.

- [ ] **Step 1: Add the import**

```tsx
import PageHero from '@/components/PageHero';
```

- [ ] **Step 2: Restructure the hero**

Replace the `<section>...</section>` block quoted above with:

```tsx
      <div className="relative">
        <PageHero
          headline="If You Identify With This Spirit, There Is a Way Out"
          photo={{ src: '/images/portrait-declaration-closeup.png', alt: 'Brother Jimi' }}
          headlineSizeClass="text-3xl sm:text-4xl md:text-5xl"
        />
        <section ref={heroRef} className="absolute inset-0 flex flex-col justify-end pointer-events-none">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ y: heroY, opacity: heroOpacity }}
            className="pointer-events-auto max-w-2xl mx-auto w-full px-6 sm:px-8 md:px-12 pb-24 md:pb-32 space-y-8 text-center"
          >
            <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light text-left border-l-4 border-white/30 pl-6 md:pl-8">
              <motion.p variants={fadeInLine}>Fraud is not just a habit. It is not just a choice. If you are caught in this lifestyle and you cannot stop, it may be because a spirit is operating inside you.</motion.p>
              <motion.p variants={fadeInLine} className="pt-2">I know because I carried one for twenty years. His name was Weje and he controlled my affairs until Jesus Christ cast him out in May 2015.</motion.p>
              <motion.p variants={fadeInLine}>That was the same year Jeremiah 17:11 stopped describing someone else's life. And started describing mine.</motion.p>
              <motion.p variants={fadeInLine} className="pt-2 font-medium">The same Jesus who set me free can set you free. You do not have to carry this alone. Make me your prayer partner and let us seek deliverance together.</motion.p>
            </motion.div>
            <motion.a
              variants={fadeInLine}
              href="/about"
              className="inline-block text-sm text-white/60 hover:text-white hover:underline"
            >
              Want the fuller story first? Read about who I am →
            </motion.a>
          </motion.div>
        </section>
      </div>
```

Note on this structure: `PageHero` renders the photo + H1 at its natural height (`min-h-[60svh]` plus its own padding). The body-content `<section>` is absolutely positioned over it (`absolute inset-0`), so it needs its own height — since `PageHero`'s wrapping `<div className="relative">` doesn't have an explicit height, the absolutely-positioned child would collapse to zero height and disappear. **This is a real layout risk, not a hidden detail — the implementer must verify visually that the body paragraphs actually appear** (Step 3 below), and if they don't, the fix is adding an explicit `min-h-[60svh]` (matching `PageHero`'s own) to the wrapping `<div className="relative">` so the absolutely-positioned overlay section has a real height to fill. Try without it first — Tailwind's flexbox content (`PageHero`'s own children) may establish enough height on the parent already since `position: relative` doesn't remove an element from normal flow — but confirm with the browser, don't assume.

- [ ] **Step 3: Verify it renders correctly — this is the step that catches the layout risk above**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4021/get-help`
Expected: `200`

Manually load `http://localhost:4021/get-help` and confirm, specifically:
- The hero shows the real portrait photo with the charcoal overlay
- The headline is visible, at the smaller size (not the same size as `/about`)
- **The body paragraphs and the "Want the fuller story first?" link are visible** — if they're missing or the section looks collapsed/empty below the headline, add `min-h-[60svh]` to the wrapping `<div className="relative">` from Step 2 and re-check
- Scrolling the page still triggers the parallax fade on the body text block (the `heroY`/`heroOpacity` effect) — the photo itself does not move (only `PageHero`'s content does; the parallax applies only to the overlaid body-content section, matching the original design where only the text container had the parallax style, never the background)

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community
git add apps/web/app/get-help/page.tsx
git commit -m "feat(/get-help): use shared PageHero with real portrait photo, preserve existing body content and parallax"
```

---

### Task 4: Apply `PageHero` to `/scriptures`

**Files:**
- Modify: `apps/web/app/scriptures/page.tsx`

**Interfaces:**
- Consumes: `PageHero` from Task 1, props `{ headline }` only — no `photo`, confirming the no-photo flat-gradient path.
- Produces: nothing for later tasks.

**Current hero section (for reference, lines 40-51):**
```tsx
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            Scriptures That Shaped My Story
          </motion.h1>
        </motion.div>
      </section>
```

- [ ] **Step 1: Add the import**

```tsx
import PageHero from '@/components/PageHero';
```

- [ ] **Step 2: Replace the hero section**

Replace the entire `<section>...</section>` block quoted above with:

```tsx
      <PageHero headline="Scriptures That Shaped My Story" />
```

- [ ] **Step 3: Verify it renders identically to before (this is the no-photo path — it must look unchanged)**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4021/scriptures`
Expected: `200`

Manually load `http://localhost:4021/scriptures` and confirm the hero looks exactly as it did before this change — flat teal-to-charcoal gradient, centered white headline, no photo. This page's hero should be visually indistinguishable from its pre-change state; the only thing that changed is which component renders it.

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community
git add apps/web/app/scriptures/page.tsx
git commit -m "feat(/scriptures): use shared PageHero (no-photo path, visually unchanged)"
```

---

### Task 5: Document the pattern in `DESIGN_LANGUAGE.md`

**Files:**
- Modify: `apps/web/DESIGN_LANGUAGE.md`

**Interfaces:**
- Consumes: nothing (documentation only, describing the now-proven pattern from Tasks 1-4).
- Produces: nothing (terminal task).

- [ ] **Step 1: Add a "Page Hero" section**

Find the "## Navigation (NEW)" heading in `apps/web/DESIGN_LANGUAGE.md` and insert a new section immediately before it:

```markdown
## Page Hero (NEW)

Every inner page's hero uses the shared `PageHero` component (`apps/web/src/components/PageHero.tsx`) — never hand-roll a hero section.

```tsx
import PageHero from '@/components/PageHero';

{/* With a real photo */}
<PageHero
  headline="Page Title"
  photo={{ src: '/images/some-real-photo.jpg', alt: 'Descriptive alt text' }}
/>

{/* No photo — flat gradient, e.g. /scriptures, where a photo would imply
    a personal connection the content doesn't call for */}
<PageHero headline="Page Title" />

{/* Longer headline that would wrap awkwardly at the default size */}
<PageHero
  headline="A meaningfully longer headline than the others"
  photo={{ src: '...', alt: '...' }}
  headlineSizeClass="text-3xl sm:text-4xl md:text-5xl"
/>
```

**Rules:**
- Photo overlay is always `bg-gradient-to-br from-rc-accent/85 to-rc-text/90` — the exact same math as the homepage hero. Never adjust the opacity per-page; the shared tonal identity is the point.
- Only use the no-photo path when the page's content genuinely doesn't call for a personal photo (e.g. `/scriptures` — about the Word, not about him). Don't default to no-photo out of convenience.
- `headlineSizeClass` only exists for headlines meaningfully longer than the ~3-5 word norm ("About Brother Jimi", "Scriptures That Shaped My Story"). Don't reach for it as a first choice — the default large size is correct for most pages.
- Real assets only. Never a generated/stock photo. See `~/.claude/skills/flux-image-generator` if genuinely abstract/decorative imagery is ever needed elsewhere — never for anything claiming to depict a real moment.

---

```

- [ ] **Step 2: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community
git add apps/web/DESIGN_LANGUAGE.md
git commit -m "docs: document the shared PageHero pattern"
```

---

## Self-Review Notes

- **Spec coverage:** `PageHero` component (Task 1), `/about` (Task 2), `/get-help` (Task 3), `/scriptures` (Task 4), documentation (Task 5). All three pages from the spec are covered, plus the shared component itself. `/my-story` and `/book` are explicitly out of scope per the spec (separate rebuilds) — no task touches them.
- **Placeholder scan:** No TBD/TODO. The pre-existing `// TODO: wire to a real waitlist endpoint` comment on `/book` is untouched and out of scope for this plan (different page entirely).
- **Type consistency:** `PageHero`'s props (`headline: string; photo?: { src: string; alt: string }; headlineSizeClass?: string`) are used identically across Tasks 2, 3, 4 — Task 2 and 4 omit `headlineSizeClass` (using the default), Task 3 supplies it. Task 3's `photo` prop uses the same `{ src, alt }` shape as Task 2's.
- **Real layout risk flagged explicitly, not hidden:** Task 3's absolute-positioning restructure (needed to preserve `/get-help`'s existing parallax effect while still using the shared `PageHero` for the background) has a genuine risk of the overlaid content collapsing to zero height. This is called out directly in the task with the exact fix if it happens, rather than assumed away.

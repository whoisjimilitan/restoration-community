# Homepage Cinematic Restraint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `apps/web/app/page.tsx` in the isolated `restoration-community-prototype` worktree so the homepage reads as one dominant cinematic hero followed by spare, quiet, text-only sections and a single closing action — per the approved spec at `docs/superpowers/specs/2026-08-25-homepage-cinematic-restraint-design.md`.

**Architecture:** Single-file edit. No new components, no new routes. Remove the two-video grid and the tilted-card navigation section; simplify the hero's CTA; re-embed `DeliveranceForm` directly in a new spare closing section; remove the now-dead `ReturnButton` helper.

**Tech Stack:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion. No test framework applies to this file (no existing component tests for `page.tsx`; verification is compile-check + manual visual review against the spec, matching how every other change to this file has been verified this session).

## Global Constraints

- Scope is `apps/web/app/page.tsx` only, in `restoration-community-prototype` (branch `prototype/hiartem-story`). The reference production homepage in the sibling `restoration-community` repo (port 4021) must never be touched.
- Dev server for this prototype already runs at `http://localhost:4022` — verify every task by confirming `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022` returns `200` and there are no compile errors in the dev server log.
- Never invent quotes or facts. All copy in this plan is copied verbatim from the approved spec — do not paraphrase or embellish it.
- Stay inside the existing teal/charcoal/off-white brand system defined in `apps/web/DESIGN_LANGUAGE.md`. No new colors, no black, no gold, no inline styles, no new fonts.
- Follow `DESIGN_LANGUAGE.md` mechanically: `py-24 md:py-32` spacing on every non-hero section, alternating `bg-rc-bg`/`bg-rc-warm-gray` backgrounds, `border-t border-rc-border` dividers on every section after the first, `max-w-2xl`/`max-w-5xl`/`max-w-xl` containers only (per spec), serif bold headers + light body text, the three approved button patterns, `min-h-[48px]` on all interactive controls.
- No portfolio-site gimmicks (no card grids, no tilted photo cards, no placeholder-gradient images) — this plan's whole point is removing those from the homepage.

---

### Task 1: Simplify the hero — remove the button pair, add one quiet text link

**Files:**
- Modify: `apps/web/app/page.tsx:117-125`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new for later tasks — this is a self-contained visual change.

**Current code at `page.tsx:117-125`:**
```tsx
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-500 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="/my-story"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              Watch My Story
            </a>
            <ReturnButton onClick={() => (window.location.href = '/book')}>Read The Book</ReturnButton>
          </div>
```

- [ ] **Step 1: Replace the button pair with a single quiet text link**

Replace the block above with:

```tsx
          <div className={`transform transition-all duration-500 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="/my-story"
              className="inline-block text-white/70 hover:text-white text-base font-medium transition-colors duration-200"
            >
              Watch My Story
            </a>
          </div>
```

This is a text link with no button chrome (no border, no fill, no box), matching the spec's "hero's job is to move the visitor, not sell a click." "Read The Book" is dropped from the hero entirely — it reappears as a quiet link in the new closing section built in Task 4.

- [ ] **Step 2: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022`
Expected: `200`, no compile errors in the dev server log (`tail -20 /tmp/prototype-dev.log` if that log path is still in use, otherwise check the terminal running `next dev`).

Manually load `http://localhost:4022` in a browser and confirm: the hero shows only one understated text link under the subhead, no boxed/filled buttons, no second "Read The Book" button anywhere in the hero.

- [ ] **Step 3: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/page.tsx
git commit -m "refactor(homepage): replace hero button pair with one quiet text link"
```

---

### Task 2: Tighten the Witness section's width

**Files:**
- Modify: `apps/web/app/page.tsx:130-148`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new for later tasks.

**Current code at `page.tsx:136`:**
```tsx
          className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light"
```

- [ ] **Step 1: Narrow the container from `max-w-2xl` to `max-w-xl`**

Change the `className` on the `motion.div` wrapping the three witness paragraphs (currently `page.tsx:136`) from:

```tsx
          className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light"
```

to:

```tsx
          className="max-w-xl mx-auto space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light"
```

This is the only change this section needs — the copy (Weje's meaning, 2015/T.B. Joshua, why he tells the story now) is already correct and must not be edited. Do not touch the three `<motion.p>` lines.

- [ ] **Step 2: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022`
Expected: `200`.

Manually confirm the Witness section's text column is visibly narrower and reads as a more deliberate, quiet block — not full standard-container width.

- [ ] **Step 3: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/page.tsx
git commit -m "refactor(homepage): narrow the Witness section column per spec"
```

---

### Task 3: Remove the two-video grid section entirely

**Files:**
- Modify: `apps/web/app/page.tsx` (remove lines 172-212 in current file — the full `{/* THE TWO VIDEOS */}` section)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing for later tasks — this is a pure deletion.

**Current code to delete (`page.tsx:172-212`):**
```tsx
      {/* THE TWO VIDEOS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.p variants={fadeInLine} className="text-base font-medium text-rc-accent text-center mb-4">
            Watch it happen
          </motion.p>
          <motion.h2 variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text text-center mb-14 max-w-xl mx-auto">
            Two moments from the testimony
          </motion.h2>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInLine} className="aspect-video w-full rounded-lg overflow-hidden bg-rc-text/5 border border-rc-border">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/fc9g750tqdQ"
                title="The Spirit of Waste | I Was Once Influenced Demonically"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
            <motion.div variants={fadeInLine} className="aspect-video w-full rounded-lg overflow-hidden bg-rc-text/5 border border-rc-border">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/A9X9TrMBda0"
                title="The Spirit of Waste | My Testimony"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>

          <motion.p variants={fadeInLine} className="max-w-2xl mx-auto text-base md:text-lg text-rc-text/80 leading-relaxed font-light text-center mt-16">
            Brother Jimi is a ministry calling young people out of the spirit of fraud and into the freedom of Jesus Christ. The message is simple: fraud is spiritual, deception enters through fear, and deliverance is available through Christ.
          </motion.p>
        </motion.div>
      </section>
```

- [ ] **Step 1: Delete the entire section**

Remove the block shown above in full, from the `{/* THE TWO VIDEOS */}` comment through its closing `</section>`. The Scripture section (immediately above it) and the "WHERE TO GO NEXT" section (immediately below it, replaced in Task 4) should now sit directly adjacent in the file.

- [ ] **Step 2: Fix background alternation**

After deletion, the Scripture section (`bg-rc-warm-gray`) will sit directly before the closing section built in Task 4. Task 4 will set the closing section's background explicitly, so no fix is needed here — just confirm in Task 4 that the adjacent backgrounds don't collide (two `bg-rc-warm-gray` sections back to back).

- [ ] **Step 3: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022` — expect `200`.

Confirm no YouTube embeds appear anywhere on the homepage, and the page flows directly from the Scripture section into whatever comes next (will look wrong until Task 4 is done — that's expected at this checkpoint).

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/page.tsx
git commit -m "refactor(homepage): remove two-video grid, deferred entirely to /my-story"
```

---

### Task 4: Rebuild the closing action section (remove tilted cards, add DeliveranceForm + quiet links)

**Files:**
- Modify: `apps/web/app/page.tsx` (imports section, and the `{/* WHERE TO GO NEXT */}` section — lines 214-282 in the pre-Task-3 file; after Task 3's deletion this section immediately follows Scripture)

**Interfaces:**
- Consumes: `DeliveranceForm` from `@/components/DeliveranceForm` — default export, props: `{ onSubmitSuccess?: () => void }`, no required props. Confirmed present at `apps/web/src/components/DeliveranceForm.tsx`.
- Produces: nothing for later tasks.

**Step 1: Re-add the `DeliveranceForm` import**

Current imports at `page.tsx:1-6`:
```tsx
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
```

- [ ] Add the `DeliveranceForm` import after the `SiteFooter` import:

```tsx
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';
import DeliveranceForm from '@/components/DeliveranceForm';
```

**Step 2: Replace the entire "WHERE TO GO NEXT" section**

- [ ] Delete the full section (originally `page.tsx:214-282`, the `{/* WHERE TO GO NEXT */}` comment through its closing `</section>` — includes the featured Request Prayer card and the Series/Book tilted card grid) and replace it with:

```tsx
      {/* CLOSING ACTION — the page's one goal. Embedded form, no extra click.
          Series/Book stay present but quiet: plain text links, not cards. */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text text-center mb-4">
            If you identify with the spirit described on this site, there is a way out.
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-sm text-rc-text/60 text-center mb-10">
            No registration. No pressure. I read every request personally.
          </motion.p>
          <motion.div variants={fadeInLine} className="bg-white border-t-4 border-rc-accent rounded-lg p-6 md:p-8 shadow-sm">
            <DeliveranceForm />
          </motion.div>
          <motion.div variants={fadeInLine} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <a href="/my-story" className="text-sm text-rc-text/60 hover:text-rc-accent transition-colors duration-200">
              Watch the full series →
            </a>
            <a href="/book" className="text-sm text-rc-text/60 hover:text-rc-accent transition-colors duration-200">
              Read the book →
            </a>
          </motion.div>
        </motion.div>
      </section>
```

Note the background is `bg-rc-bg` (white), which correctly alternates against the Scripture section's `bg-rc-warm-gray` immediately above it once Task 3's deletion is in place.

- [ ] **Step 3: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022` — expect `200`.

Manually confirm: no tilted cards, no photo images anywhere in this section, the `DeliveranceForm` fields render and are usable, and "Watch the full series →" / "Read the book →" appear as plain text links below the form, not buttons or cards.

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/page.tsx
git commit -m "refactor(homepage): replace tilted-card menu with embedded prayer form + quiet links"
```

---

### Task 5: Remove the now-dead `ReturnButton` helper and do a full-page verification pass

**Files:**
- Modify: `apps/web/app/page.tsx` (remove the `ReturnButton` function, lines 42-57 in the original file)

**Interfaces:**
- Consumes: confirms no remaining call sites of `ReturnButton` exist anywhere in the file (verified by Task 1's change — the only call site was the hero's "Read The Book" button, which Task 1 removed).
- Produces: nothing — this is the final cleanup task.

**Step 1: Confirm `ReturnButton` has no remaining call sites**

- [ ] Run: `grep -n "ReturnButton" apps/web/app/page.tsx`

Expected output: only the function definition itself (originally at `page.tsx:42`), no call sites. If any call site remains, stop and investigate before deleting — do not delete a component that's still in use.

**Step 2: Delete the `ReturnButton` function**

Current code (originally `page.tsx:42-57`):
```tsx
function ReturnButton({ onClick, children, variant = 'dark' }: { onClick: () => void; children: React.ReactNode; variant?: 'dark' | 'light' }) {
  const styles =
    variant === 'dark'
      ? 'text-white border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]'
      : 'text-rc-text border-rc-text hover:bg-rc-text/5';
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-8 py-3 min-h-[48px] font-medium border-2 rounded-lg
        transition-all duration-300 ease-out hover:scale-[1.02]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles}`}
    >
      {children}
    </button>
  );
}
```

- [ ] Delete this function entirely (it's dead code once Task 1 lands — its only use was the hero's "Read The Book" button).

**Step 3: Verify the whole page compiles and matches the spec end-to-end**

- [ ] Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022` — expect `200`, no TypeScript/build errors (an unused-component removal should not introduce any).

- [ ] Manually load `http://localhost:4022` and walk through the full page top to bottom, confirming against the spec:
  1. Hero: video plays, loops, muted; teal/charcoal gradient overlay visible; headline and subhead present; exactly one quiet text link ("Watch My Story"), no buttons.
  2. Witness: plain background, no image/card, narrower column, three paragraphs present unedited, last line bolder (`font-medium`).
  3. Scripture: `bg-rc-warm-gray`, Jeremiah 17:11 verse larger than Witness text, reference line, corrected caption ("This is the end for everyone who does not repent and receive God's mercy. It would have been mine.").
  4. No two-video section anywhere.
  5. Closing action: header + reassurance line + embedded `DeliveranceForm` + two quiet text links (series, book) — no tilted cards, no card images.
  6. Footer unchanged.
  7. Attendance modal code still present in the file (dormant, not surfaced) — confirm it wasn't accidentally deleted.

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/page.tsx
git commit -m "refactor(homepage): remove dead ReturnButton helper"
```

---

## Self-Review Notes

- **Spec coverage:** Hero (Task 1), Witness (Task 2), Scripture (no code change needed — copy already matches spec exactly, verified in Task 5's walkthrough), Two-Videos removal (Task 3), Closing action (Task 4), dead-code cleanup (Task 5). All spec sections covered.
- **Placeholder scan:** No TBD/TODO in any task; all code blocks are complete, copy-pasteable.
- **Type consistency:** `DeliveranceForm` import path and prop signature confirmed against the actual component file, not assumed. `staggerContainer`/`fadeInLine` variant names used in new code match the existing definitions at the top of `page.tsx` exactly — no new variant names introduced.

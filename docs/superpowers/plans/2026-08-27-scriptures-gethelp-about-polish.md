# /scriptures, /get-help, /about Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove a misapplied blockquote signifier from non-quoted narration on `/get-help` and `/about`, and simplify a one-off triple-repeated-warning fade on `/scriptures` to a single full-weight line.

**Architecture:** Two independent, narrow presentational fixes across three existing Next.js client page components — no new components, no content changes, no dependency changes.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, Framer Motion (existing `staggerContainer`/`fadeInLine` variants — reuse exactly, do not redefine).

## Global Constraints

- Full design spec: `docs/superpowers/specs/2026-08-27-scriptures-gethelp-about-polish-design.md`
- Only these files may be touched: `apps/web/app/get-help/page.tsx`, `apps/web/app/about/page.tsx`, `apps/web/app/scriptures/page.tsx`.
- Do not alter any scripture verse text, explanation text, bio facts, or other copy — presentation only.
- Stay inside existing `rc-*` color tokens and Fraunces serif + sans body typography — no new colors, no new typeface.
- No em dashes anywhere (this file family has had em dashes caught and fixed twice already this session — grep before finalizing).
- `apps/web/src/components/PageHero.tsx` is out of scope — do not modify it.
- No `git add -A` or `git add .` — stage explicit file paths only.
- The dev server runs at `http://localhost:4021` throughout — use it for structural verification (`curl` + grep), since this repo has no component-level test suite for page files.

---

### Task 1: Remove the blockquote treatment from narration on /get-help and /about

**Files:**
- Modify: `apps/web/app/get-help/page.tsx` (the narration `<motion.div>` className only)
- Modify: `apps/web/app/about/page.tsx` (the narration `<motion.div>` className only)

**Interfaces:**
- Consumes: `staggerContainer`, `fadeInLine` (already defined in both files — do not touch their definitions).
- Produces: nothing consumed by later tasks (Task 2 touches a different file, `/scriptures`, and is fully independent).

**Context:** Both pages currently wrap the founder's own first-person narration in the same `border-l-4 ... pl-6 md:pl-8` left-border treatment used correctly on `/scriptures` for actual Bible quotations. This task removes only the border/padding classes — the narration becomes plain paragraph text. `/get-help`'s wrapper also carries a `text-left` class; that stays, since left-aligned body text reads better than centered multi-line paragraphs regardless of whether a border is present — it is not tied to the blockquote treatment and must not be removed.

- [ ] **Step 1: Fix `/get-help`'s narration block**

Find this exact line:
```tsx
          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light text-left border-l-4 border-white/30 pl-6 md:pl-8">
```

Replace with:
```tsx
          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light text-left">
```

Do not change anything else in this file — the four `<motion.p>` paragraphs inside this div, the `<motion.a>` link below it, and every other section must remain exactly as they are.

- [ ] **Step 2: Fix `/about`'s narration block**

Find this exact line:
```tsx
          className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-6 md:pl-8"
```

Replace with:
```tsx
          className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light"
```

Do not change anything else in this file — the six `<motion.p>` paragraphs inside this div, the closing "Make me your prayer partner" section, and every other part of the page must remain exactly as they are.

- [ ] **Step 3: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -iE "get-help|app/about"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/get-help` — expect `200`.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/about` — expect `200`.
Run: `curl -s http://localhost:4021/get-help | grep -o "border-l-4"` — expect no output (no border classes remain on this page at all, since `/get-help` never used one anywhere else).
Run: `curl -s http://localhost:4021/about | grep -o "border-l-4"` — expect no output (same — `/about` never used a border elsewhere).
Run: `curl -s http://localhost:4021/get-help | grep -o "Fraud is not just a habit"` — expect a match (confirms the paragraph content itself is untouched).
Run: `curl -s http://localhost:4021/about | grep -o "Brother Jimi (J-I-M-I)"` — expect a match (confirms the paragraph content itself is untouched).

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/get-help/page.tsx apps/web/app/about/page.tsx
git commit -m "fix(/get-help,/about): remove blockquote signifier from non-quoted narration"
```

---

### Task 2: Simplify the triple-repeated-warning on /scriptures to a single line

**Files:**
- Modify: `apps/web/app/scriptures/page.tsx` (the `{s.repeatWarning && (...)}` block only)

**Interfaces:**
- Consumes: `fadeInLine` (already defined in this file — do not redefine).
- Produces: nothing consumed by later tasks. This is the last task in the plan.

**Context:** The 1 Thessalonians 4:6 verse block currently repeats "Take this as a warning." three times at decreasing opacity — a one-off fade-echo technique used nowhere else on the site. This task collapses it to a single line at full weight and full opacity, matching how the rest of the site delivers punchy single-line statements.

- [ ] **Step 1: Replace the repeatWarning block**

Find this exact block:
```tsx
            {s.repeatWarning && (
              <motion.div variants={staggerContainer} className="space-y-1 pt-2">
                <motion.p variants={fadeInLine} className="text-xl md:text-2xl font-rc-serif font-bold text-rc-accent">Take this as a warning.</motion.p>
                <motion.p variants={fadeInLine} className="text-xl md:text-2xl font-rc-serif font-bold text-rc-accent/70">Take this as a warning.</motion.p>
                <motion.p variants={fadeInLine} className="text-xl md:text-2xl font-rc-serif font-bold text-rc-accent/40">Take this as a warning.</motion.p>
              </motion.div>
            )}
```

Replace with:
```tsx
            {s.repeatWarning && (
              <motion.p variants={fadeInLine} className="text-xl md:text-2xl font-rc-serif font-bold text-rc-accent pt-2">Take this as a warning.</motion.p>
            )}
```

Note: `pt-2` (previously on the wrapping `motion.div`) moves onto the single remaining `motion.p`, preserving the same top spacing before this line as before. No other part of this file — the `SCRIPTURES` array, the verse blockquote treatment, the `showGetHelp` block, or any other section — should be touched.

- [ ] **Step 2: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i "app/scriptures"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/scriptures` — expect `200`.
Run: `curl -s http://localhost:4021/scriptures | grep -o "Take this as a warning" | wc -l` — expect `1` (exactly one occurrence now, not three).
Run: `curl -s http://localhost:4021/scriptures | grep -o "border-l-4"` — expect at least one match (confirms the verse blockquote treatment itself is untouched, still present around all three Bible verses).

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/scriptures/page.tsx
git commit -m "fix(/scriptures): simplify the triple-repeated warning to a single full-weight line"
```

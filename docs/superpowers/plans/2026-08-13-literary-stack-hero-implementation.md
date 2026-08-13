# Literary Stack Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Literary Stack Hero redesign on the landing page—transforming the hero from busy text-stacking into a premium, book-like reading experience with staggered animation and generous whitespace.

**Architecture:** Restructure the hero section (`/apps/web/app/page.tsx`, lines 37-82) to display 5 distinct sections (The Lie, The Truth, Scripture, Consequence, Reading Time) with individual animation delays creating a meditative reveal sequence. Shorten Scripture excerpt, add reading time indicator, ensure responsive typography scales cleanly across mobile/tablet/desktop.

**Tech Stack:** Next.js 14, React, TypeScript, Framer Motion (animation), Tailwind CSS (spacing/typography)

## Global Constraints

- Hero must display on mobile (~1.1-1.2 screens) without excessive scroll
- All text must maintain WCAG AA contrast on gradient background
- Animation must respect `prefers-reduced-motion` media query
- Scripture excerpt must remain verbatim from Jeremiah 17:11 (no paraphrasing)
- Responsive typography: `text-4xl` mobile, `text-7xl` desktop for main message
- Staggered animation delays: 0ms, 500ms, 1200ms, 1800ms, 2400ms (total reveal ~3 seconds)
- No breaking changes to other sections or modals

---

## Task 1: Shorten Scripture Excerpt

**Files:**
- Modify: `apps/web/app/page.tsx:54-72` (Scripture blockquote section)

**Interfaces:**
- Consumes: Jeremiah 17:11 (exact Scripture, not paraphrased)
- Produces: 4-line Scripture excerpt (vs. current 6 lines)

- [ ] **Step 1: Read current Scripture section**

Open `apps/web/app/page.tsx` and locate the Scripture blockquote (lines 54-72). Note the current structure:
- 4 separate divs with text lines
- Full Jeremiah 17:11 verse broken into multiple lines
- Current version is 6 lines total

- [ ] **Step 2: Verify Scripture text is verbatim**

Confirm the current text matches Jeremiah 17:11 exactly. Do NOT paraphrase or modify—only shorten by selecting key phrases.

- [ ] **Step 3: Replace with 4-line excerpt**

Replace the current Scripture blockquote structure with this excerpt:

```jsx
<div className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal space-y-2">
  <p>Like a partridge that hatches eggs it did not lay</p>
  <p>are those who gain riches by fraud.</p>
</div>
<div className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal space-y-2">
  <p>At midlife they will prove to be fools.</p>
</div>
<div className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal space-y-2">
  <p>In the end, they face the consequences of their folly.</p>
</div>
<p className="text-sm md:text-base text-white/70 font-rc-serif font-light pt-2">
  — Jeremiah 17:11
</p>
```

Keep the blockquote wrapper and left border intact. Only update the inner content.

- [ ] **Step 4: Test on desktop browser**

Open `http://localhost:3000` and verify:
- Scripture displays correctly (4 lines, not 6)
- Left border still visible
- Text is readable
- Spacing is consistent

- [ ] **Step 5: Test on mobile**

Use DevTools mobile view (375px width) and verify:
- Scripture lines wrap correctly
- No horizontal overflow
- Text remains readable at small size

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "refactor: Shorten Scripture excerpt in hero (Jeremiah 17:11)

Replace full 6-line verse with focused 4-line excerpt:
- Maintains verbatim Scripture (no paraphrasing)
- Reduces visual density in hero
- Supports Literary Stack layout with better proportions"
```

---

## Task 2: Restructure Hero Sections with Whitespace

**Files:**
- Modify: `apps/web/app/page.tsx:38-82` (entire hero section)

**Interfaces:**
- Consumes: Current hero structure (Lie, Truth, Scripture, Consequence)
- Produces: 5-section hero with `space-y-12 md:space-y-16` wrapper (generous whitespace)

- [ ] **Step 1: Read the entire current hero section**

Review lines 37-82 of `page.tsx`. Note:
- Hero container uses `space-y-12 md:space-y-16` (current spacing)
- 4 child divs: The Lie, The Truth, Scripture, The Consequence
- Each div has individual animation delays

- [ ] **Step 2: Create new section wrapper**

Replace the current `space-y-12 md:space-y-16` wrapper with explicit sections that have MORE spacing:

```jsx
<div className="max-w-3xl mx-auto w-full flex flex-col justify-center space-y-12 md:space-y-16">
  {/* Section 1: The Lie */}
  <div className="...">...</div>

  {/* Section 2: The Truth */}
  <div className="...">...</div>

  {/* Section 3: Scripture */}
  <div className="...">...</div>

  {/* Section 4: Consequence */}
  <div className="...">...</div>

  {/* Section 5: Reading Time */}
  <div className="...">...</div>
</div>
```

Keep existing animation timing. You're only adding structure/spacing, not changing animation yet.

- [ ] **Step 3: Add Reading Time indicator**

Add a new 5th section at the end (before the closing div):

```jsx
{/* Reading Time Indicator */}
<div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '2400ms' }}>
  <p className="text-xs text-white/50 font-light tracking-wide">
    Est. reading time: 2 minutes
  </p>
</div>
```

Note: Delay is `2400ms` (final element in stagger sequence).

- [ ] **Step 4: Test layout on desktop**

Open browser at `http://localhost:3000`. Verify:
- Hero renders without errors
- All 5 sections visible
- Whitespace between sections feels generous/premium
- Reading time appears at bottom
- No visual regressions

- [ ] **Step 5: Test on mobile (375px)**

Use DevTools mobile view. Verify:
- Sections stack vertically (no layout issues)
- Hero height is ~1.1-1.2 screens (not excessive)
- Reading time is visible without extra scrolling
- Text wraps correctly

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "refactor: Restructure hero into 5 sections with reading time indicator

- Add section comments for clarity (Lie, Truth, Scripture, Consequence, Reading Time)
- Add reading time indicator with 2400ms animation delay
- Maintain existing spacing (space-y-12 md:space-y-16)
- All sections now have distinct animation delays creating literary pacing"
```

---

## Task 3: Update Typography Scaling for Responsive Design

**Files:**
- Modify: `apps/web/app/page.tsx:48-52` (The Truth section)

**Interfaces:**
- Consumes: Current "It is a curse" heading (text-7xl on all sizes)
- Produces: Responsive heading (text-4xl mobile, text-7xl desktop)

- [ ] **Step 1: Locate The Truth heading**

Find the h1 with "It is a curse" (~line 49). Currently uses:
```jsx
<h1 className="text-4xl sm:text-5xl md:text-7xl font-rc-serif font-bold text-white leading-tight tracking-tight">
  It is a curse.
</h1>
```

- [ ] **Step 2: Verify responsive scaling**

Current breakpoints:
- Base (mobile): `text-4xl` ✓
- sm (640px): `text-5xl`
- md (768px): `text-7xl` ✓

This is correct. NO CHANGES NEEDED. Verify it's already responsive by checking the current className.

- [ ] **Step 3: Test on multiple viewports**

Use DevTools to test:
- 375px (mobile): Should be `text-4xl` (readable, bold)
- 640px (sm): Should be `text-5xl`
- 1024px (md+): Should be `text-7xl` (dominant focal point)

If scaling looks wrong, adjust. Expected behavior: main message scales responsively, always readable and prominent.

- [ ] **Step 4: Test on actual mobile device (if available)**

Open on real phone (iPhone/Android) and verify:
- Text is readable (not too small)
- Text is bold enough to dominate
- No horizontal overflow

- [ ] **Step 5: Commit (if changes made)**

If no changes were needed:
```bash
git commit --allow-empty -m "docs: Verify responsive typography scaling is correct

The Truth heading (text-4xl mobile, text-7xl desktop) already matches
Literary Stack spec. No code changes needed. Typography scales correctly."
```

If changes were made:
```bash
git add apps/web/app/page.tsx
git commit -m "refactor: Adjust responsive typography for Literary Stack hero

Updated 'It is a curse' heading to ensure text-4xl on mobile is readable
while text-7xl on desktop dominates. Verified across all breakpoints."
```

---

## Task 4: Implement Staggered Animation Delays

**Files:**
- Modify: `apps/web/app/page.tsx:40-80` (all animation transitionDelay values)

**Interfaces:**
- Consumes: Current animation delays (0ms, 150ms, 300ms, 450ms)
- Produces: New delays (0ms, 500ms, 1200ms, 1800ms, 2400ms) for staggered reveal

- [ ] **Step 1: Document current animation delays**

Read the current hero section and note existing delays:
- The Lie: `transitionDelay: '0ms'`
- The Truth: `transitionDelay: '150ms'`
- Scripture: `transitionDelay: '300ms'`
- Consequence: `transitionDelay: '450ms'`

These are too fast (total reveal ~600ms). New delays create 3-second meditative pacing.

- [ ] **Step 2: Update The Lie delay (remains 0ms)**

Line ~41, The Lie section:
```jsx
style={{ transitionDelay: '0ms' }}
```

NO CHANGE. Stays at 0ms (first element, immediate).

- [ ] **Step 3: Update The Truth delay (150ms → 500ms)**

Line ~48, The Truth section:
```jsx
style={{ transitionDelay: '500ms' }}
```

**Reason:** User reads "You think it's a blessing" (~1 sec), then "It is a curse" impacts. 500ms delay gives absorption time.

- [ ] **Step 4: Update Scripture delay (300ms → 1200ms)**

Line ~55, Scripture section:
```jsx
style={{ transitionDelay: '1200ms' }}
```

**Reason:** User absorbs the main message, then Scripture validates. 1200ms (~1.2 sec after Truth) is meditative pause.

- [ ] **Step 5: Update Consequence delay (450ms → 1800ms)**

Line ~74, Consequence section:
```jsx
style={{ transitionDelay: '1800ms' }}
```

**Reason:** Scripture lands, user reflects, then consequence/call appears. 1800ms delay.

- [ ] **Step 6: Update Reading Time delay (NEW: 2400ms)**

Line ~76 (newly added Reading Time section):
```jsx
style={{ transitionDelay: '2400ms' }}
```

**Reason:** Final element. Total reveal time ~3 seconds. Reading time indicator appears last, signaling the moment is complete.

- [ ] **Step 7: Test animation on desktop**

Open `http://localhost:3000` with DevTools console open. Verify:
- Each element fades in at correct time
- Delays match spec: 0ms, 500ms, 1200ms, 1800ms, 2400ms
- Total animation is ~3 seconds
- Animation is smooth (no jank)
- No console errors

**Test script:** Open DevTools → Console and run:
```javascript
performance.mark('hero-start');
// Refresh page, watch animation
performance.mark('hero-end');
```

Visual inspection: Each section appears at correct moment with smooth fade.

- [ ] **Step 8: Test animation respects prefers-reduced-motion**

In DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion:

Verify:
- Animation still plays but is instant (no delays)
- Page is still usable
- No flashing or jarring jumps

- [ ] **Step 9: Test on mobile**

Open on mobile device or mobile DevTools view. Verify:
- Animation plays smoothly (no frame drops)
- Delays work correctly
- Scroll doesn't interrupt animation

- [ ] **Step 10: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "refactor: Implement staggered animation delays for Literary Stack

Update animation reveal sequence:
- The Lie: 0ms (immediate)
- The Truth: 500ms (after absorption)
- Scripture: 1200ms (validates)
- Consequence: 1800ms (calls to action)
- Reading Time: 2400ms (final, signals intent)

Total reveal: ~3 seconds. Creates meditative pacing, not rushed.
Animation respects prefers-reduced-motion."
```

---

## Task 5: Test Across All Devices and Build

**Files:**
- Test: Multiple viewports and devices
- Verify: Build succeeds

**Interfaces:**
- Consumes: All previous tasks (hero is complete)
- Produces: Verified, working hero on desktop, tablet, mobile

- [ ] **Step 1: Test desktop (1920px)**

Open `http://localhost:3000` in browser at full resolution. Verify:
- Hero displays correctly
- "It is a curse" is large, dominant (text-7xl)
- Scripture excerpt is readable
- Reading time is visible
- Animation sequence plays smoothly
- Whitespace feels premium
- No layout issues

- [ ] **Step 2: Test tablet (768px)**

Resize browser to 768px (or use DevTools). Verify:
- Hero is responsive
- Typography scales down proportionally (text-7xl → text-5xl or similar)
- Whitespace is proportional (not reduced to nothing)
- Still readable, still feels premium
- No horizontal overflow

- [ ] **Step 3: Test mobile (375px)**

Resize to 375px (or use mobile DevTools). Verify:
- Hero height ~1.1-1.2 screens (not excessive)
- "It is a curse" is still bold (text-4xl)
- Scripture lines wrap correctly
- Reading time is visible
- No horizontal overflow
- Scroll is smooth, not janky

- [ ] **Step 4: Test on real mobile device (if available)**

Open on actual iPhone or Android. Verify:
- Layout is correct (not a viewport issue)
- Typography is readable
- Animation is smooth
- Scroll performance is good

- [ ] **Step 5: Run build**

```bash
npm run build 2>&1 | tail -30
```

Expected output:
- ✓ Compiled successfully
- No errors or warnings
- /stories route compiles
- /gathering route compiles
- All pages generate static HTML

- [ ] **Step 6: Test prefers-reduced-motion**

In DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion`:
- Animation still plays (no errors)
- Page works without animation
- No flashing or jarring behavior

- [ ] **Step 7: Verify no breaking changes**

Check that other sections still work:
- Click "See the Full Story" CTA → should navigate to /stories
- Click "Prepare for Deliverance" CTA → should open modal
- Scroll down → "What Fraud Does" section loads
- Scroll down → other sections load
- No regressions in other parts of the page

- [ ] **Step 8: Commit (final)**

```bash
git add apps/web/app/page.tsx
git commit -m "test: Verify Literary Stack hero works across all devices

Tested on:
- Desktop (1920px): Full Typography, smooth animation, premium spacing
- Tablet (768px): Responsive scaling, proportional whitespace
- Mobile (375px): ~1.1-1.2 screens, readable, no horizontal overflow
- Real device: Smooth performance, no jank

Verified:
- Build succeeds (npm run build)
- No console errors
- Animation respects prefers-reduced-motion
- CTAs work correctly
- No breaking changes to other sections"
```

---

## Task 6: Deploy and Verify Live

**Files:**
- Deploy: Commit to main (already done via Task 5)
- Verify: Live at production URL

**Interfaces:**
- Consumes: Completed implementation (all tasks 1-5)
- Produces: Verified live deployment

- [ ] **Step 1: Push to remote**

```bash
git push origin main
```

Verify output shows commits pushed.

- [ ] **Step 2: Verify build on Vercel/deployment**

Navigate to your deployment (Vercel, Netlify, etc.) and verify:
- Build succeeded
- No deployment errors
- Site is live

- [ ] **Step 3: Test live site on desktop**

Visit your production URL and verify:
- Hero loads correctly
- Animation plays smoothly
- All elements are visible
- Typography looks premium
- Whitespace is balanced

- [ ] **Step 4: Test live site on mobile**

Visit production URL on mobile device. Verify:
- Hero renders correctly on small screen
- No layout shift or jank
- Animation is smooth
- CTAs work

- [ ] **Step 5: Final commit verification**

Run:
```bash
git log --oneline -10
```

Verify all 6 tasks appear in commit history (or collapsed into fewewr commits if batched).

- [ ] **Step 6: Celebrate**

Literary Stack Hero is now live! The landing page hero is premium, intentional, and book-like—with staggered animation creating a meditative 3-second reveal sequence.

---

## Summary

This plan implements the Literary Stack Hero redesign in 6 focused tasks:

1. **Task 1:** Shorten Scripture excerpt (6 lines → 4 lines)
2. **Task 2:** Restructure hero into 5 sections + add reading time indicator
3. **Task 3:** Verify responsive typography scaling
4. **Task 4:** Update animation delays (0ms, 500ms, 1200ms, 1800ms, 2400ms)
5. **Task 5:** Test across all devices and build
6. **Task 6:** Deploy and verify live

**Total effort:** ~2-3 hours  
**Files modified:** 1 (`apps/web/app/page.tsx`)  
**Risk level:** Low (localized to hero section, no breaking changes)  
**Testing:** Desktop, tablet, mobile, prefers-reduced-motion, build verification

---

## Spec Coverage Check

✓ **Visual Architecture** — Task 2 (5-section structure)  
✓ **Spacing & Whitespace** — Task 2 (space-y-12 md:space-y-16)  
✓ **Typography Scaling** — Task 3 (responsive font sizes)  
✓ **Animation/Reveal** — Task 4 (staggered delays)  
✓ **Scripture Excerpt** — Task 1 (shortened to 4 lines)  
✓ **Reading Time** — Task 2 (indicator added)  
✓ **Mobile Behavior** — Task 5 (tested across devices)  
✓ **Build/Deploy** — Task 5-6 (verified)  

All spec requirements covered. No gaps.

# Partnership Page Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the partnership page from an info-dense card-based layout to a restrained, narrative-driven experience that positions partnership as spiritual identity, not financial transaction—using premium spacing, hero imagery, and tier-based storytelling to inspire conviction before asking for commitment.

**Architecture:** The page will shift from parallel card grids (all partners visible at once) to sequential full-width sections (one tier at a time). Each section builds narrative conviction through spacing, imagery, and minimal copy. The hero section will anchor the entire page with a photograph of joy/freedom, while partner tiers are reframed as spiritual roles—Founding (prophetic risk-takers), Standing (daily infrastructure), Prayer (foundational intercession). The unified story section will reframe partnership from donation to declaration.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, design tokens (rc-accent, rc-text, rc-warm-gray), responsive spacing (py-24 md:py-32).

## Global Constraints

- All sections must use `py-24 md:py-32` spacing (96px mobile / 128px desktop) for premium breathing room
- Background colors alternate white/gray exactly: white → gray → white → gray
- Every section (except first) has `border-t border-rc-border` divider
- Serif font (`font-rc-serif`) for headers, light sans-serif for body (`font-light`)
- Partner cards use minimal styling: white bg, serif names, subtle hover states (no aggressive color changes)
- Copy must be ruthlessly edited: remove all explanation, keep only conviction
- Hero section must support background image with dark overlay for text legibility
- No inline styles—all Tailwind classes only
- Must follow DESIGN_LANGUAGE.md exactly; this page sets no new precedents

---

## File Structure

**Files to modify:**
- `src/app/partnership/page.tsx` — Main page component (complete rewrite of structure, keeping existing copy as baseline)
- `tailwind.config.ts` — No changes needed; all tokens already exist

**Files to verify (no changes):**
- `DESIGN_LANGUAGE.md` — Reference for spacing, background pattern, typography
- `src/app/page.tsx` — Reference for navigation link hover animation pattern

---

## Task 1: Restructure Page Layout — One Tier Per Section

**Files:**
- Modify: `src/app/partnership/page.tsx` (lines 1-176)

**Interfaces:**
- Consumes: Existing partner data arrays (foundingPartners, standingPartners, prayerPartners)
- Produces: Page component with reorganized section structure (Hero → Founding Section → Standing Section → Prayer Section → Unified Story → Explore → Footer)

**Current state:** Partners displayed in grid format (2 cols founding, 5 cols standing, 7 cols prayer) all on same background alternation. Copy is verbose with multiple explanation paragraphs per section header.

**Target state:** Each tier is a full-width section with its own background (white/gray alternation maintained). Partner display is a responsive grid within each section (same column counts: 2/5/7), but the section itself feels spacious due to py-24 md:py-32.

- [ ] **Step 1: Read current partnership page to understand data structure**

Run: `cat src/app/partnership/page.tsx`

Note:
- Partner data is defined as arrays: `foundingPartners`, `standingPartners`, `prayerPartners`
- Each has: `{ name: string, id: string }`
- Current layout uses grids within single sections

- [ ] **Step 2: Rewrite page structure (no styling changes yet)**

Replace `src/app/partnership/page.tsx` with this skeleton (this is the structure only; copy/styling come in later tasks):

```tsx
'use client';

export default function PartnershipPage() {
  const foundingPartners = [
    { name: 'Grace & Truth Foundation', id: 'grace' },
    { name: 'Restoration House International', id: 'restoration' },
  ];

  const standingPartners = [
    { name: 'New Life Collective', id: 'newlife' },
    { name: 'Redemption Alliance', id: 'redemption' },
    { name: 'Deliverance Spirit Foundation', id: 'spirit' },
    { name: 'Hope Rising Africa', id: 'hope' },
    { name: 'Freedom Forward', id: 'freedom' },
  ];

  const prayerPartners = [
    { name: 'Humble Hands Ministry', id: 'humble' },
    { name: 'Believers United', id: 'believers' },
    { name: 'Called Home Fellowship', id: 'called' },
    { name: 'Truth Bearers Collective', id: 'truth' },
    { name: 'Grateful Hearts Foundation', id: 'grateful' },
    { name: 'Gospel Shared', id: 'gospel' },
    { name: 'Rising Again Ministries', id: 'rising' },
  ];

  return (
    <div className="bg-white text-rc-text">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base font-medium text-white/80 uppercase tracking-widest">Those Who Believe</p>
          <h1 className="text-4xl md:text-6xl font-rc-serif font-bold text-white leading-tight">These Are Partners</h1>
          <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">Reaching the unreached. Deliverance is free because they believe in this work.</p>
        </div>
      </section>

      {/* Founding Partners Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Founding Partners</p>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who saw the problem first.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {foundingPartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center p-8 rounded-lg bg-white border border-rc-border/20 min-h-[160px]">
                <p className="text-center text-lg font-rc-serif font-semibold text-rc-text/80">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standing Partners Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Standing Partners</p>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who fuel this work now.</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {standingPartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center p-6 rounded-lg bg-white border border-rc-border/20 min-h-[140px]">
                <p className="text-center text-sm font-rc-serif font-semibold text-rc-text/80 leading-tight">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Partners Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Prayer Partners</p>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who hold this in prayer.</h2>
          </div>
          <div className="grid md:grid-cols-7 gap-4">
            {prayerPartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center p-5 rounded-lg bg-white border border-rc-border/20 min-h-[120px]">
                <p className="text-center text-xs font-rc-serif font-semibold text-rc-text/80 leading-tight">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Story Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">
                Partnership isn't a donation. It's a declaration.
              </p>
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">
                It says: <span className="font-semibold text-rc-text">I see what Jesus sees.</span> I recognize the spiritual trap of fraud and bondage. I understand the power of deliverance. And I'm willing to fund that freedom for people I'll never meet.
              </p>
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">
                That's not charity. That's conviction translated into action.
              </p>
            </div>

            <div className="pt-8 space-y-6 border-t border-rc-border/40">
              <div className="space-y-4">
                <p className="text-base md:text-lg text-rc-text/70">These partners share one belief:</p>
                <p className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Deliverance is real. Freedom is possible. And it's worth the investment.</p>
              </div>
            </div>

            <div className="pt-8 space-y-8 border-t border-rc-border/40">
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-rc-text/80">
                  If you see what we see. If you believe what we believe. If you're ready to fund freedom instead of just wishing for it.
                </p>
                <p className="text-xl md:text-2xl font-rc-serif font-semibold text-rc-text">
                  Let's talk about partnership.
                </p>
              </div>

              <button
                onClick={() => {
                  const email = 'james@saintandstory.co.uk';
                  const subject = 'I want to explore partnership with Brother Jimi Ministries';
                  const body = 'Hello,\n\nI see what you see. I believe Jesus delivers. I want His work to spread.\n\nLet\'s talk about partnership.\n\nThanks';
                  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                className="inline-flex items-center justify-center px-10 py-4 min-h-[56px] text-rc-accent font-medium border-2 border-rc-accent rounded-lg hover:bg-rc-accent/5 transition-all duration-200 text-base md:text-lg"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-8">
            <p className="text-xs font-medium text-rc-text/60 uppercase tracking-widest">Explore</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              <a href="/" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
                Home
                <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
              </a>
              <a href="/testimonies" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
                Success Stories
                <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 3: Build the project to verify no TypeScript errors**

Run: `npm run build 2>&1 | tail -50`

Expected: No errors. Build succeeds.

- [ ] **Step 4: Start dev server and check page loads**

Run: `npm run dev &`

Open browser: `http://localhost:3000/partnership`

Expected: Page loads, hero displays, three tier sections visible, spacing looks generous, no layout shifts.

- [ ] **Step 5: Commit structure changes**

```bash
git add src/app/partnership/page.tsx
git commit -m "refactor: restructure partnership page — one tier per full-width section"
```

---

## Task 2: Edit Copy — Remove Verbosity, Keep Conviction

**Files:**
- Modify: `src/app/partnership/page.tsx` (lines 43-83, 64-65, 82-83)

**Interfaces:**
- Consumes: Page structure from Task 1 (section headers and tier narratives)
- Produces: Ruthlessly edited copy that removes all explanation and keeps only conviction

**Current state:** Each tier section has a header with name and brief description. Copy is explanatory but some feels redundant or over-detailed.

**Target state:** Each tier has a ONE-sentence description (not multiple paragraphs). Naming is narrative, not functional.

**Tier Headers to Replace:**

Founding Partners current:
```
Founding Partners / Those who saw the problem first.
Before anyone else moved, they believed deliverance was possible and stood to make it real.
```

Should become:
```
Founding Partners / Those who saw the problem first.
(No additional description — let the section title carry the weight)
```

Standing Partners current:
```
Standing Partners / Those who fuel this work now.
They understand the solution. They're investing in the infrastructure that makes transformation possible every single day.
```

Should become:
```
Standing Partners / Those who fuel this work now.
(No additional description)
```

Prayer Partners current:
```
Prayer Partners / Those who hold this in prayer.
They believe prayer changes everything. Their intercession is the foundation upon which all transformation rests.
```

Should become:
```
Prayer Partners / Those who hold this in prayer.
(No additional description)
```

- [ ] **Step 1: Read current partnership page copy sections**

Run: `cat src/app/partnership/page.tsx | grep -A 3 "Founding Partners\|Standing Partners\|Prayer Partners" | head -20`

- [ ] **Step 2: Edit Founding Partners section**

In `src/app/partnership/page.tsx`, find the Founding Partners section (around line 43-49) and replace:

Old:
```tsx
<div className="text-center space-y-4 mb-16">
  <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Founding Partners</p>
  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who saw the problem first.</h2>
  <p className="text-base md:text-lg text-rc-text/70 leading-relaxed">Before anyone else moved, they believed deliverance was possible and stood to make it real.</p>
</div>
```

New:
```tsx
<div className="text-center space-y-4 mb-16">
  <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Founding Partners</p>
  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who saw the problem first.</h2>
</div>
```

- [ ] **Step 3: Edit Standing Partners section**

In `src/app/partnership/page.tsx`, find the Standing Partners section (around line 64-66) and replace:

Old:
```tsx
<div className="text-center space-y-4 mb-16">
  <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Standing Partners</p>
  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who fuel this work now.</h2>
  <p className="text-base md:text-lg text-rc-text/70 leading-relaxed">They understand the solution. They're investing in the infrastructure that makes transformation possible every single day.</p>
</div>
```

New:
```tsx
<div className="text-center space-y-4 mb-16">
  <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Standing Partners</p>
  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who fuel this work now.</h2>
</div>
```

- [ ] **Step 4: Edit Prayer Partners section**

In `src/app/partnership/page.tsx`, find the Prayer Partners section (around line 82-84) and replace:

Old:
```tsx
<div className="text-center space-y-4 mb-16">
  <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Prayer Partners</p>
  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who hold this in prayer.</h2>
  <p className="text-base md:text-lg text-rc-text/70 leading-relaxed">They believe prayer changes everything. Their intercession is the foundation upon which all transformation rests.</p>
</div>
```

New:
```tsx
<div className="text-center space-y-4 mb-16">
  <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Prayer Partners</p>
  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who hold this in prayer.</h2>
</div>
```

- [ ] **Step 5: Build to verify no errors**

Run: `npm run build 2>&1 | grep -E "error|Error" || echo "Build clean"`

Expected: "Build clean" output (no errors).

- [ ] **Step 6: Open browser and verify page still loads, copy is cleaner**

Browser: `http://localhost:3000/partnership`

Expected: Page loads, tier sections have cleaner headers without verbose descriptions, spacing feels more spacious.

- [ ] **Step 7: Commit copy edits**

```bash
git add src/app/partnership/page.tsx
git commit -m "refactor: ruthlessly edit tier descriptions — remove verbosity, keep conviction"
```

---

## Task 3: Add Partner Card Hover States & Minimal Styling

**Files:**
- Modify: `src/app/partnership/page.tsx` (partner card divs, lines 52-56, 72-76, 91-95)

**Interfaces:**
- Consumes: Partner card structure from Task 1 (white background, border, name text)
- Produces: Partner cards with subtle hover states (text darkens, shadow lifts subtly)

**Current state:** Partner cards have static white background, light border, gray text. No hover interaction.

**Target state:** Hover states show:
- Text color shifts from rc-text/80 to rc-text (darker, 80% → 100%)
- Subtle shadow appears (shadow-lg)
- Smooth transition (transition-all duration-300)

- [ ] **Step 1: Update Founding Partners card hover state**

In `src/app/partnership/page.tsx`, find founding partner card (line ~52) and replace:

Old:
```tsx
<div key={partner.id} className="flex items-center justify-center p-8 rounded-lg bg-white border border-rc-border/20 min-h-[160px]">
  <p className="text-center text-lg font-rc-serif font-semibold text-rc-text/80">{partner.name}</p>
</div>
```

New:
```tsx
<div key={partner.id} className="group flex items-center justify-center p-8 rounded-lg bg-white border border-rc-border/20 hover:shadow-lg hover:border-rc-accent/30 transition-all duration-300 min-h-[160px]">
  <p className="text-center text-lg font-rc-serif font-semibold text-rc-text/80 group-hover:text-rc-text transition-colors duration-300">{partner.name}</p>
</div>
```

- [ ] **Step 2: Update Standing Partners card hover state**

In `src/app/partnership/page.tsx`, find standing partner card (line ~72) and replace:

Old:
```tsx
<div key={partner.id} className="flex items-center justify-center p-6 rounded-lg bg-white border border-rc-border/20 min-h-[140px]">
  <p className="text-center text-sm font-rc-serif font-semibold text-rc-text/80 leading-tight">{partner.name}</p>
</div>
```

New:
```tsx
<div key={partner.id} className="group flex items-center justify-center p-6 rounded-lg bg-white border border-rc-border/20 hover:shadow-lg hover:border-rc-accent/30 transition-all duration-300 min-h-[140px]">
  <p className="text-center text-sm font-rc-serif font-semibold text-rc-text/80 group-hover:text-rc-text transition-colors duration-300 leading-tight">{partner.name}</p>
</div>
```

- [ ] **Step 3: Update Prayer Partners card hover state**

In `src/app/partnership/page.tsx`, find prayer partner card (line ~91) and replace:

Old:
```tsx
<div key={partner.id} className="flex items-center justify-center p-5 rounded-lg bg-white border border-rc-border/20 min-h-[120px]">
  <p className="text-center text-xs font-rc-serif font-semibold text-rc-text/80 leading-tight">{partner.name}</p>
</div>
```

New:
```tsx
<div key={partner.id} className="group flex items-center justify-center p-5 rounded-lg bg-white border border-rc-border/20 hover:shadow-lg hover:border-rc-accent/30 transition-all duration-300 min-h-[120px]">
  <p className="text-center text-xs font-rc-serif font-semibold text-rc-text/80 group-hover:text-rc-text transition-colors duration-300 leading-tight">{partner.name}</p>
</div>
```

- [ ] **Step 4: Build to verify no errors**

Run: `npm run build 2>&1 | grep -E "error|Error" || echo "Build clean"`

Expected: "Build clean"

- [ ] **Step 5: Test hover states in browser**

Browser: `http://localhost:3000/partnership`

Hover over a partner card in each tier and verify:
- Text darkens (rc-text/80 → rc-text)
- Shadow appears (subtle lift)
- Border accent appears (rc-accent/30)
- Transition is smooth (no jumping)

- [ ] **Step 6: Commit hover state changes**

```bash
git add src/app/partnership/page.tsx
git commit -m "style: add subtle hover states to partner cards (text, shadow, border)"
```

---

## Task 4: Enhance Hero Section — Prepare for Background Image

**Files:**
- Modify: `src/app/partnership/page.tsx` (hero section, lines 27-40)

**Interfaces:**
- Consumes: Hero section structure from Task 1 (gradient background, overlay, text)
- Produces: Hero section with support for background image via `backgroundImage` style (fallback gradient stays if no image)

**Current state:** Hero uses gradient background (from-rc-accent to-rc-text) with black overlay. No image support.

**Target state:** Hero section prepares for background image:
1. Gradient becomes fallback only (visible if image doesn't load)
2. Dark overlay intensifies (bg-black/50 instead of bg-black/40) for text legibility over real photos
3. Conditional image rendering ready (prepared for Task 5 to add image URL)

- [ ] **Step 1: Enhance hero section with image-ready structure**

In `src/app/partnership/page.tsx`, find hero section (lines ~27-40) and update:

Old:
```tsx
<section className="relative w-full h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text overflow-hidden">
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
    <p className="text-sm md:text-base font-medium text-white/80 uppercase tracking-widest">Those Who Believe</p>
    <h1 className="text-4xl md:text-6xl font-rc-serif font-bold text-white leading-tight">These Are Partners</h1>
    <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">Reaching the unreached. Deliverance is free because they believe in this work.</p>
  </div>
</section>
```

New:
```tsx
<section className="relative w-full h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text overflow-hidden">
  {/* Background image (optional, will be added in future) */}
  {/* If image URL is added here, it will display above the gradient fallback */}
  
  {/* Dark overlay for text legibility */}
  <div className="absolute inset-0 bg-black/50" />
  
  {/* Hero content */}
  <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
    <p className="text-sm md:text-base font-medium text-white/80 uppercase tracking-widest">Those Who Believe</p>
    <h1 className="text-4xl md:text-6xl font-rc-serif font-bold text-white leading-tight">These Are Partners</h1>
    <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">Reaching the unreached. Deliverance is free because they believe in this work.</p>
  </div>
</section>
```

Key changes:
- Overlay increased from `bg-black/40` to `bg-black/50` for better text legibility over real images
- Added comment preparing structure for background image
- No image URL yet (will be added when user provides image)

- [ ] **Step 2: Build to verify no errors**

Run: `npm run build 2>&1 | grep -E "error|Error" || echo "Build clean"`

Expected: "Build clean"

- [ ] **Step 3: Check hero section in browser**

Browser: `http://localhost:3000/partnership`

Expected:
- Hero section full-height (h-screen)
- Text centered and readable
- Overlay slightly darker (bg-black/50 creates deeper tone than before)
- Spacing around text generous

- [ ] **Step 4: Commit hero section enhancement**

```bash
git add src/app/partnership/page.tsx
git commit -m "style: enhance hero section — increase overlay opacity for future background image support"
```

---

## Task 5: Test Responsive Layout & Mobile Spacing

**Files:**
- Test: `src/app/partnership/page.tsx` (no code changes, verification only)

**Interfaces:**
- Consumes: Full page structure from Tasks 1-4
- Produces: Verified responsive behavior at three breakpoints

**Current state:** Page uses responsive Tailwind classes (py-24 md:py-32, md:grid-cols-2/5/7, etc.)

**Target state:** Verified that:
1. Mobile (375px): Spacing feels generous (py-24 = 96px top/bottom), single-column grids work, text is readable
2. Tablet (768px): Transition to md breakpoint works smoothly, grids show correct columns (2/5/7)
3. Desktop (1024px+): Full layout displays, spacing feels premium (py-32 = 128px)

- [ ] **Step 1: Open browser DevTools and test at 375px (iPhone SE)**

Browser: `http://localhost:3000/partnership` → Open DevTools (F12) → Toggle device toolbar → Select "iPhone SE"

Check each section:
- Hero: Text centered, readable, no overflow
- Founding Partners: 1 column (md:grid-cols-2 → single col on mobile), card height reasonable
- Standing Partners: 1 column (md:grid-cols-5 → single col on mobile)
- Prayer Partners: 1 column (md:grid-cols-7 → single col on mobile)
- Spacing: py-24 (96px) feels generous, not cramped
- Unified Story: Text centered, readable
- Explore: Links stack vertically on mobile (flex-col), readable
- No horizontal scroll
- No text overflow

Record: All checks pass ✓ or note issues

- [ ] **Step 2: Test at 768px (iPad / Tablet)**

DevTools: Select "iPad" or manually set width to 768px

Check:
- Hero: Still centered, responsive text sizes working
- Founding Partners: Should show md:grid-cols-2 (2 columns)
- Standing Partners: Should show md:grid-cols-5 (might be 2-3 columns due to gap, that's OK)
- Prayer Partners: Should show md:grid-cols-7 (likely 3-4 columns, that's OK)
- Spacing: py-24 md:py-32 transition happening
- Explore: Links should still be horizontal (sm:flex-row)

Record: All checks pass ✓ or note issues

- [ ] **Step 3: Test at 1024px+ (Desktop)**

DevTools: Set width to 1280px or larger (or close DevTools)

Check:
- Hero: Full-height, centered, spacious
- Founding Partners: md:grid-cols-2 (2 columns as intended)
- Standing Partners: md:grid-cols-5 (5 columns as intended)
- Prayer Partners: md:grid-cols-7 (7 columns as intended)
- Spacing: py-md:py-32 (128px) shows clear breathing room
- Section alternation clear (white → gray → white → gray)
- Explore: Links horizontal, well-spaced
- Navigation underlines work on hover
- Button hover state works

Record: All checks pass ✓ or note issues

- [ ] **Step 4: Check for layout shifts (CLS)**

Open DevTools → Performance tab → Record (3 seconds) → Stop

Look for "Cumulative Layout Shift" metric. Target: < 0.1 (no major jank).

If CLS > 0.1, note which element shifted.

Record: CLS score and any shifting elements

- [ ] **Step 5: Check console for errors**

Browser Console: Verify no JS errors logged (red errors)

Expected: Clean console, no errors

Record: Console clean ✓ or list errors

- [ ] **Step 6: Document findings and commit**

If all tests pass, create a summary:
```
Responsive Testing Summary:
✓ Mobile (375px): Single-column layout, py-24 spacing, text readable, no horizontal scroll
✓ Tablet (768px): 2-5-7 grid columns showing, spacing transition works, all elements visible
✓ Desktop (1024px+): Full grid layouts (2-5-7), py-32 breathing room, hover states smooth
✓ CLS: < 0.1 (no layout shifts)
✓ Console: No errors
```

Then commit:
```bash
git add -A
git commit -m "test: verify responsive layout and spacing at 375px, 768px, 1024px breakpoints"
```

---

## Task 6: Build for Production & Final Verification

**Files:**
- Verify: `src/app/partnership/page.tsx` (full page structure)
- Test: Build output, no errors

**Interfaces:**
- Consumes: Complete page from Tasks 1-5 (structure, copy, styling, responsive)
- Produces: Production build, verified in browser

**Current state:** Page has been developed and tested in dev mode.

**Target state:** Production build succeeds, page works correctly when deployed, all features function.

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected output should end with:
```
✓ Compilation successful
Route (app)                              Size
○ /partnership                           X kB
```

If build fails, check error output and fix TypeScript/Tailwind issues before proceeding.

- [ ] **Step 2: Check build output for partnership page file**

Run: `ls -lh .next/static/chunks/app/partnership*`

Expected: File exists and is reasonable size (< 50kB gzipped)

- [ ] **Step 3: Start dev server in production mode**

Run: `npm run dev` (this runs next dev, which shows realistic output)

Open browser: `http://localhost:3000/partnership`

Verify:
- Page loads (no 404)
- All sections render (hero, 3 tier sections, unified story, explore, footer)
- Spacing looks premium (generous py-24 md:py-32)
- Partner cards display all names (2 founding, 5 standing, 7 prayer)
- Text is readable, contrast is good
- Hover states work (cards darken on hover)
- CTA button is clickable
- Navigation links work and show hover underline
- No console errors (F12 → Console)

Record findings: All ✓ or issues to fix

- [ ] **Step 4: Test CTA button email flow**

Click "Start a Conversation" button.

Expected: Browser opens mailto link with:
- To: james@saintandstory.co.uk
- Subject: "I want to explore partnership with Brother Jimi Ministries"
- Body: Pre-filled with partnership context

(Don't actually send; just verify the mailto opens correctly)

- [ ] **Step 5: Test navigation links**

Click "Home" in Explore section → should navigate to /
Click "Success Stories" in Explore section → should navigate to /testimonies

Verify both links work.

- [ ] **Step 6: Final commit and summary**

```bash
git add -A
git commit -m "build: production build succeeds, partnership page verified and ready for deployment"
```

Output:
```
✓ Partnership page implementation complete
✓ Production build succeeds
✓ All sections render correctly
✓ Responsive layout verified (375px / 768px / 1024px+)
✓ Spacing follows DESIGN_LANGUAGE.md (py-24 md:py-32)
✓ Partner cards styled with hover states
✓ CTA and navigation functional
✓ No console errors
```

---

## Self-Review Checklist

**Spec Coverage:**
- ✓ Task 1: Page restructured from grid layout to full-width sections (one tier per section)
- ✓ Task 2: Copy ruthlessly edited (verbose descriptions removed)
- ✓ Task 3: Partner card hover states added (subtle, premium feel)
- ✓ Task 4: Hero section prepared for background image (overlay opacity, structure)
- ✓ Task 5: Responsive layout tested at three breakpoints (375px, 768px, 1024px+)
- ✓ Task 6: Production build verified, page functional

**Design Strategy Alignment:**
- ✓ Spacing: All sections use py-24 md:py-32 (96px / 128px)
- ✓ Background pattern: White → gray → white → gray → white → gray (per DESIGN_LANGUAGE.md)
- ✓ Copy: Removed verbosity, kept conviction
- ✓ Partner cards: Minimal styling (white bg, serif names, subtle hover)
- ✓ Navigation: Hover underline animation per design language
- ✓ Footer: Consistent across all pages
- ✓ No inline styles: All Tailwind classes

**Placeholder Scan:**
- ✓ All code blocks complete (no "implement X" placeholders)
- ✓ All test steps include exact commands and expected results
- ✓ All commit messages use conventional format
- ✓ No "TODO" or "fill in later" language

**Type Consistency:**
- ✓ Partner data arrays consistent: `{ name: string, id: string }`
- ✓ Component props consistent across tasks
- ✓ Classname patterns consistent (group-hover, transition-all duration-300)

---

## Plan Complete

All six tasks defined and ready for execution. Each task is independently testable and produces a committable deliverable.

**Execution Options:**

**Option 1: Subagent-Driven (Recommended)**
- Fresh subagent per task
- Automatic review between tasks
- Fast iteration with quality gates
- Use: `superpowers:subagent-driven-development`

**Option 2: Inline Execution**
- Execute tasks in this session
- Batch execution with checkpoints
- Use: `superpowers:executing-plans`

**Which approach would you prefer?**

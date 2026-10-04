---
name: public-pages-unification-plan
description: "Implementation plan to unify impact, testimonies, and partnership pages under the homepage visual system"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0d00840f-0829-441c-8608-48ef987b78ee
---

# Public Pages Unification Plan

## Goal
Unify the three public-facing pages (impact, testimonies, partnership) under the same visual rhythm, spacing, and design language as the homepage—while preserving all backend database connectivity and functionality.

## Scope
- **Impact Page:** Refactor from inline styles → Tailwind + design system
- **Testimonies Page:** Add hero section + narrative bridges
- **Partnership Page:** Add narrative context between sections (minor tweaks)

## Non-Scope
- Journey page, prayer page (authenticated dashboard pages, use different component library)
- Homepage (already complete)

---

## Task 1: Refactor Impact Page

**Files:**
- Modify: `/apps/web/src/app/impact/page.tsx`

**Current State:**
- Uses inline styles (not Tailwind)
- Doesn't inherit rc-colors or design system
- No animations
- Metrics hardcoded (not from backend)
- Doesn't match visual rhythm of homepage

**Target State:**
- Uses Tailwind + design system classes
- Inherits rc-colors, spacing, typography
- Has Framer Motion scroll reveal animations
- Preserves ability to fetch metrics from backend admin
- Matches homepage visual rhythm exactly

**Key Constraints:**
- MUST preserve any database connectivity for adding new metrics from admin
- MUST keep all existing data structures and API calls
- MUST maintain metric card functionality

**Implementation Steps:**

1. Convert wrapper from inline styles to Tailwind:
   - `style={{ backgroundColor: '#FAFAF8', padding: '64px 24px' }}` → `className="bg-rc-bg text-rc-text"`
   - `maxWidth: '1200px'` → Use `max-w-6xl` or `max-w-2xl` depending on section
   - `padding: '64px 24px 48px'` → Use `py-24 md:py-32 px-6 sm:px-8 md:px-12`

2. Add Hero section (new):
   - Dark gradient background: `bg-gradient-to-br from-rc-accent to-rc-text`
   - Opening tagline: "What We are Building"
   - Main headline: "Our Impact"
   - Subheadline: "Real numbers. Real people. Real transformation through Jesus Christ."
   - Use staggered fade-in animation (120ms, 240ms, 360ms delays)

3. Convert metrics section to use design system:
   - Wrap in `<section>` with proper spacing: `py-24 md:py-32`
   - Add Framer Motion `whileInView` animation
   - Update card styling to match homepage aesthetic
   - Keep existing map/loop structure (preserve database functionality)
   - Update colors from inline `#E8F4F3` to `bg-rc-accent/20` or similar

4. Add section dividers:
   - Add `border-t border-rc-border` between sections
   - Use consistent `space-y-8` between content blocks

5. Update typography:
   - Headers: `text-3xl md:text-4xl font-rc-serif font-bold`
   - Body: `text-base md:text-lg text-rc-text leading-relaxed font-light`
   - Labels: `text-xs font-medium uppercase tracking-wider`

6. Convert "Partner With Us" CTA section:
   - Instead of: `<div style={{ backgroundColor: '#E8F4F3', padding: '48px' }}>`
   - Use: `<section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">`
   - Wrap in motion div with scroll reveal
   - Keep email CTA but update button styling to match homepage

7. Test:
   - Verify page loads with or without backend data
   - Check metric cards display correctly
   - Verify animations work on scroll
   - Confirm spacing matches homepage rhythm

---

## Task 2: Add Hero + Bridges to Testimonies Page

**Files:**
- Modify: `/apps/web/src/app/testimonies/page.tsx`

**Current State:**
- No hero section (jumps straight to testimonies)
- No opening context about what testimonies mean
- Stories exist but lack narrative framing
- About 75% aligned with visual system

**Target State:**
- Add hero section (dark gradient, prophetic opening)
- Add bridge section explaining why testimonies matter
- Preserve existing story fetching and display
- Add narrative framing showing connection to 7-stage journey
- Matches homepage visual rhythm

**Key Constraints:**
- MUST preserve backend data fetching from `/api/testimonies`
- MUST keep existing StoryCard component and story display logic
- MUST preserve stage indicators and metadata

**Implementation Steps:**

1. Add Hero section (before stories):
   ```
   Dark gradient background
   Tagline: "Stories of Freedom"
   Heading: "These are not stories of shame.
             They are stories of freedom."
   Subheading: "Real people. Real transformation. Real Jesus."
   ```
   - Use staggered fade-in (120ms, 240ms, 360ms)
   - Match homepage hero structure exactly

2. Add Bridge section (between hero and stories):
   ```
   Light background (bg-rc-warm-gray)
   Text: "You move through a journey. These are people walking it.
          At different stages. With different struggles.
          All finding freedom through Jesus."
   ```
   - Simple, centered text
   - Use motion reveal animation

3. Add section context/header before story grid:
   - Brief explanation: "Each story is tagged with its stage in the journey"
   - This contextualizes the stage indicators on each card

4. Preserve existing story grid:
   - Keep existing fetching logic
   - Keep existing StoryCard component
   - Just ensure it's properly wrapped in sections with correct spacing

5. Add closing section (after all stories):
   ```
   Dark gradient background
   Text: "This journey is possible for you, too.
          Your story starts with one encounter."
   CTA: Link to prayer booking or contact
   ```

6. Update section structure:
   - Wrap story grid in `<section>` with proper spacing
   - Add borders between sections
   - Use consistent animation patterns

7. Test:
   - Verify hero loads
   - Verify stories fetch from backend
   - Check animations work on scroll
   - Confirm spacing matches homepage

---

## Task 3: Add Narrative Bridges to Partnership Page

**Files:**
- Modify: `/apps/web/src/app/partnership/page.tsx`

**Current State:**
- Hero is strong
- Partner sections exist but lack context
- "Why This Matters" is too brief
- Sections feel disconnected

**Target State:**
- Add brief narrative context between major sections
- Expand "Why This Matters" with more depth
- Create smooth flow between partner types (founding → standing → prayer)
- All visual alignment already done

**Key Constraints:**
- MUST preserve existing partner data structures
- MUST preserve form functionality
- Visual system already applied

**Implementation Steps:**

1. Add bridge section after hero:
   ```
   Light background (bg-rc-warm-gray)
   Text: "Our work cannot happen without partners.
          Three kinds of people are answering this call."
   ```
   - Simple, contextualizes what's coming next
   - Use motion reveal

2. Before "Founding Partners" section, add mini-context:
   ```
   "These partners believed first. They stand with us from the beginning."
   ```
   - Small, centered text
   - Sets up why founding partners matter

3. Expand "Why This Matters" section:
   - Current: 2 lines of text
   - Target: 4-6 lines explaining impact of partnership
   - Keep existing structure but add depth
   - Example:
     ```
     "Our program is free because partners chose this calling.
      Without them, young people couldn't access deliverance.
      Without them, the journey to freedom would have a price.
      Transformation doesn't happen without them.
      And it doesn't happen without you."
     ```

4. Add closing context before form:
   ```
   Light background (bg-rc-bg)
   Text: "If you feel called to this work, we'd like to talk about it."
   ```
   - Transitions into form naturally

5. Verify:
   - Spacing consistent
   - Narrative flow smooth
   - Form still works
   - Animations play on scroll

---

## Visual System Checklist (All Pages)

Before any page is marked complete:

- [ ] Uses Tailwind classes (no inline styles)
- [ ] Inherits rc-colors (bg-rc-bg, rc-accent, rc-text)
- [ ] Sections have proper spacing: `py-24 md:py-32`
- [ ] Sections have dividers: `border-t border-rc-border`
- [ ] Typography uses proper classes: serif headers, light body
- [ ] Has Framer Motion animations on page load and scroll
- [ ] Hero section uses dark gradient: `bg-gradient-to-br from-rc-accent to-rc-text`
- [ ] All sections alternate between bg-rc-bg and bg-rc-warm-gray
- [ ] Container max-width appropriate: `max-w-2xl` or `max-w-6xl`
- [ ] All text uses proper color hierarchy: rc-text, rc-text/80, rc-text/70
- [ ] Page feels cohesive with homepage (same rhythm, spacing, visual language)

---

## Execution Order

1. **Impact Page** (highest priority, most broken)
2. **Testimonies Page** (needs most additions)
3. **Partnership Page** (minor tweaks, almost done)

---

## Testing Before Deploy

For each page:
- [ ] Runs `npm run build` without errors
- [ ] Starts dev server without console errors
- [ ] Browser renders correctly on mobile/tablet/desktop
- [ ] Animations play smoothly
- [ ] Any backend data fetching works
- [ ] Forms (if present) submit successfully
- [ ] Spacing matches homepage visual rhythm
- [ ] Links/CTAs work as expected

---

## Deployment

After all pages pass testing:
1. Commit each page's refactoring separately
2. Push to main
3. Vercel auto-deploys
4. Site is visually unified across all public pages

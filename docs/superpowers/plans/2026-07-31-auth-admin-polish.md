# Auth & Admin Pages Polish — Premium Design Upgrade

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to execute this plan task-by-task.

**Goal:** Apply premium design polish (typeface, animations, consistency, micro-interactions, copy tightening, tracking) to all auth and admin pages.

**Architecture:** Auth pages (/auth/signin, /auth/signup, /auth/forgot-password) and admin pages (/admin, /admin/testimonies, /admin/partners, /admin/settings) inherit the landing/partnership premium design language: Fraunces serif, scroll animations, micro-interactions, consistent spacing, tight copy, tracking-tight headings.

**Tech Stack:** Next.js, React, Tailwind CSS, Framer Motion (existing).

## Global Constraints

- Typeface already global (Fraunces via next/font) — no action needed
- All pages must pass `npm run build` with zero TypeScript errors
- Responsive testing: mobile (375px), tablet (768px), desktop (1024px+)
- Preserve auth logic and admin functionality
- No new dependencies

---

## Tasks (5 Quick Tasks)

### Task 1: Add Scroll Animations to Auth Pages

**Files:**
- Modify: All auth page files (/auth/signin/page.tsx, /auth/signup/page.tsx, /auth/forgot-password/page.tsx if exists)

- [ ] Add `import { motion } from 'framer-motion'` to each auth page
- [ ] Wrap main content sections in `motion.div` with `whileInView` animations
- [ ] Use same animation params: `duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94]`, `once: true`, `amount: 0.15`
- [ ] Test on localhost:3000/auth/signin
- [ ] Build passes, commit

**Commit:** `git commit -m "polish: add scroll animations to auth pages"`

---

### Task 2: Add Scroll Animations to Admin Pages

**Files:**
- Modify: All admin page files (/admin/page.tsx, /admin/testimonies/page.tsx, /admin/partners/page.tsx, /admin/settings/page.tsx, etc.)

- [ ] Add `import { motion } from 'framer-motion'` to each admin page
- [ ] Wrap content sections in `motion.div` with `whileInView` animations
- [ ] Use same animation params as Task 1
- [ ] Test on localhost:3000/admin/*
- [ ] Build passes, commit

**Commit:** `git commit -m "polish: add scroll animations to admin pages"`

---

### Task 3: Add Micro-Interactions to Auth & Admin Buttons

**Files:**
- Modify: All auth page files + all admin page files

- [ ] Find all `<button>` elements (CTA buttons, form buttons, action buttons)
- [ ] Update hover states: Add `hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300`
- [ ] Test button interactions on localhost
- [ ] Build passes, commit

**Commit:** `git commit -m "polish: add micro-interactions to auth and admin buttons"`

---

### Task 4: Tighten Copy & Add Heading Tracking on Auth & Admin

**Files:**
- Modify: All auth + admin page files

- [ ] Review all `<h1>`, `<h2>`, `<h3>` headings
- [ ] Add `tracking-tight` to large headings (3xl and above)
- [ ] Review form labels, button text, page copy — tighten redundancy
- [ ] Example: "Sign in to your account" → "Sign in"
- [ ] Test on localhost
- [ ] Build passes, commit

**Commit:** `git commit -m "polish: tighten copy and add heading tracking to auth and admin pages"`

---

### Task 5: Ensure Consistency Across All Auth/Admin Pages

**Files:**
- Modify: All auth + admin page files (review only, minor fixes)

- [ ] Verify all pages use warm paper background (rc-bg) or consistent theme
- [ ] Verify all buttons have same styling (hover lift + shadow)
- [ ] Verify all headings have tracking-tight where appropriate
- [ ] Verify all pages have scroll animations on major sections
- [ ] Test responsive on 375px, 768px, 1024px+
- [ ] Build passes, commit

**Commit:** `git commit -m "polish: ensure consistency across auth and admin pages"`

---

## Execution

Use subagent-driven approach. Execute Tasks 1-5 sequentially. Deploy when all are complete.


# Homepage + Navigation: Editorial Architecture Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the site real site-wide navigation and upgrade the homepage with a confident primary CTA, a photography-driven dark band, elevated cards, and a formalized type scale/radius system — all structural, none of it touching the existing color palette or typeface.

**Architecture:** A new `Navigation.tsx` client component wired into the shared `layout.tsx` so every page gets it automatically; on the homepage it renders transparently over the hero and adapts text color via `IntersectionObserver`, on every other page it renders as a solid opaque bar from the top (those pages aren't in this plan's scope, so the nav can't assume anything about what's under it). The homepage itself (`page.tsx`) gets three isolated edits: a filled `SiteButton` CTA in the hero, a two-column dark band (real portrait + the Jeremiah 17:11 declaration) replacing the current flat scripture section, and two elevated cards replacing the closing section's bare text links.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, Framer Motion (already project dependencies — no new packages).

## Global Constraints

- Work happens only in `restoration-community-prototype` (branch `prototype/hiartem-story`), dev server already running at `localhost:4022`. The reference/production site (sibling repo, port 4021) is never touched by this plan.
- Safety checkpoint commit `df6e8fc` captures the full current 4022 state. Destructive git operations (`reset --hard`, force-push, etc.) are never appropriate within this plan — normal `git add <specific files>` + `git commit` only. Never `git add -A` or `git add .`.
- Keep Fraunces serif + bold-weight header voice exactly as it is. Do not change colors, do not change the typeface. This plan changes structure (nav, surfaces, photography, spacing discipline) only.
- No inline styles (`style={{...}}`). Tailwind classes only, using existing `rc-*` design tokens — no new colors introduced.
- Every section keeps `py-24 md:py-32` spacing and `border-t border-rc-border` (except the first section on a page) per `DESIGN_LANGUAGE.md`.
- Scope is the homepage (`apps/web/app/page.tsx`) and the site-wide nav layer only. Do not modify `/my-story`, `/book`, `/scriptures`, `/get-help`, `/about`, or `/deliverances` page files in this plan.
- Never invent content. All copy in this plan is either unchanged from the current homepage or explicitly quoted from the approved spec — no new sentences are introduced.

**Note on the nav's light/dark text logic (correction from the design spec):** the spec described the nav's light/dark text switch as driven purely by `IntersectionObserver` on a hero element, on the assumption only the homepage opens with a dark section. Checking `/about/page.tsx` during planning showed other pages also open with a dark gradient hero-style section (`bg-gradient-to-br from-rc-accent to-rc-text`) — the same `IntersectionObserver` approach applied sitewide would produce illegible dark-on-dark nav text on those pages, none of which this plan is allowed to touch. The fix below (Task 1) keeps the transparent/adaptive nav on the homepage only, where this plan controls the hero markup, and renders a simple always-legible solid nav on every other page. This is a scope-safe correction, not a scope expansion — no other page's files are touched.

---

### Task 1: Navigation component + site-wide wiring

**Files:**
- Modify: `apps/web/src/components/Navigation.tsx` (currently 30 lines, dead code with stale links — full rewrite)
- Modify: `apps/web/app/layout.tsx` (add the import and render)
- Modify: `apps/web/app/page.tsx` (add `id="hero"` to the existing hero `<section>` — one attribute, nothing else touched in this task)

**Interfaces:**
- Consumes: none from other tasks.
- Produces: `Navigation` component rendered on every page via `layout.tsx`. Later tasks (2, 3) do not depend on anything this task exports — they only rely on the `id="hero"` attribute this task adds to the hero section still being present.

**Current `apps/web/src/components/Navigation.tsx` (for reference, to be fully replaced):**
```tsx
'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rc-bg/95 backdrop-blur-sm border-b border-rc-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors">
          Brother Jimi
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Home
          </Link>
          <Link href="/testimonies" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Testimonies
          </Link>
          <Link href="/partnership" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Partnership
          </Link>
          <Link href="/auth/signin" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

**Current `apps/web/app/layout.tsx` (for reference):**
```tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';
import { frauncesFontClass } from '../tailwind.config';
import LetsConnectPersistence from '@/components/LetsConnectPersistence';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brother Jimi',
  description: 'A Servant of Jesus Christ.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={frauncesFontClass}>
      <body>
        <Providers>{children}</Providers>
        {/* Let's Connect — live/AI prayer chat, site-wide. afterInteractive
            loads it right after the page is usable, without blocking the
            hero video's first paint — more reliable than lazyOnload, which
            waits for full browser idle and can be delayed or inconsistent. */}
        <Script
          id="9GBWhxT8KsCsuVDzXge3"
          src="https://app.letsconnect.at/embed.js"
          strategy="afterInteractive"
        />
        <LetsConnectPersistence />
      </body>
    </html>
  );
}
```

- [ ] **Step 1: Rewrite `Navigation.tsx`**

Replace the entire file with:

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/my-story', label: 'My Story' },
  { href: '/book', label: 'Book' },
  { href: '/scriptures', label: 'Scriptures' },
  { href: '/get-help', label: 'Get Help' },
  { href: '/about', label: 'About' },
  { href: '/deliverances', label: 'Deliverances' },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(isHomepage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);

    if (!isHomepage) {
      setIsOverHero(false);
      return;
    }

    const heroEl = document.getElementById('hero');
    if (!heroEl) {
      setIsOverHero(false);
      return;
    }

    setIsOverHero(true);
    const observer = new IntersectionObserver(
      ([entry]) => setIsOverHero(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [pathname, isHomepage]);

  // Homepage: transparent nav, text color adapts to the dark hero underneath
  // it. Every other page: solid nav from the top, always legible regardless
  // of what section sits beneath it — those pages are out of this plan's
  // scope, so the nav can't assume anything about their content color.
  const isTransparentMode = isHomepage;
  const isLight = isTransparentMode && isOverHero;
  const showBorder = isScrolled || !isTransparentMode;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        isTransparentMode ? '' : 'bg-rc-bg/95'
      } ${showBorder ? 'border-b border-rc-border' : 'border-b border-transparent'}`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`text-sm font-rc-serif font-bold tracking-tight transition-colors duration-300 ${
            isLight ? 'text-white' : 'text-rc-text'
          }`}
        >
          Brother Jimi
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                isLight ? 'text-white/80 hover:text-white' : 'text-rc-text/70 hover:text-rc-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 transition-colors duration-300 ${
            isLight ? 'text-white' : 'text-rc-text'
          }`}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <>
                <line x1="1" y1="1" x2="19" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-rc-bg border-b border-rc-border overflow-hidden"
          >
            <div className="px-6 sm:px-8 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base text-rc-text/80 hover:text-rc-text py-3 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Wire `Navigation` into `layout.tsx`**

Add the import and render it as the first child inside `<body>`, before `<Providers>`:

```tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';
import { frauncesFontClass } from '../tailwind.config';
import LetsConnectPersistence from '@/components/LetsConnectPersistence';
import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brother Jimi',
  description: 'A Servant of Jesus Christ.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={frauncesFontClass}>
      <body>
        <Navigation />
        <Providers>{children}</Providers>
        {/* Let's Connect — live/AI prayer chat, site-wide. afterInteractive
            loads it right after the page is usable, without blocking the
            hero video's first paint — more reliable than lazyOnload, which
            waits for full browser idle and can be delayed or inconsistent. */}
        <Script
          id="9GBWhxT8KsCsuVDzXge3"
          src="https://app.letsconnect.at/embed.js"
          strategy="afterInteractive"
        />
        <LetsConnectPersistence />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Add `id="hero"` to the homepage hero section**

In `apps/web/app/page.tsx`, find the hero `<section>` (currently `<section ref={heroRef} className="relative w-full min-h-[85svh] ...`) and add `id="hero"` to it:

```tsx
<section ref={heroRef} id="hero" className="relative w-full min-h-[85svh] flex flex-col justify-center overflow-hidden bg-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
```

Only this one attribute changes in `page.tsx` for this task — everything else in the file stays as it is (Tasks 2 and 3 handle the rest).

- [ ] **Step 4: Verify it compiles and renders on multiple pages**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/`
Expected: `200`

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/about`
Expected: `200`

Manually load `http://localhost:4022/` and confirm:
- Nav is transparent/light-text at the very top (over the video hero)
- Scrolling past the hero switches nav text to dark and the border fades in
- All 7 links navigate correctly, `/journey` and `/login` are not present

Manually load `http://localhost:4022/about` and confirm:
- Nav renders as a solid, always-legible bar from the very top (not transparent), dark text, visible immediately — no dark-on-dark illegibility over `/about`'s own dark gradient intro section

Resize to `<768px` (or use browser dev tools mobile view) on either page and confirm:
- Desktop link row is hidden, hamburger icon appears
- Tapping it opens a slide-down sheet with all 7 links, tapping a link closes the sheet and navigates

- [ ] **Step 5: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/src/components/Navigation.tsx apps/web/app/layout.tsx apps/web/app/page.tsx
git commit -m "feat(nav): real site-wide navigation, replacing the dead stale-link component"
```

---

### Task 2: Homepage hero CTA + dark band (photo + declaration)

**Files:**
- Modify: `apps/web/src/components/SiteButton.tsx:9` (radius bump, one class token)
- Modify: `apps/web/app/page.tsx` (hero CTA, scripture section → dark band, modal z-index)

**Interfaces:**
- Consumes: `id="hero"` on the hero section (added in Task 1, already present — do not remove it while editing this section).
- Produces: nothing new for Task 3 to consume — Task 3 edits a different section of the same file (the closing section) and does not depend on this task's markup.

**Current `apps/web/src/components/SiteButton.tsx` (for reference):**
```tsx
import { motion, type HTMLMotionProps } from 'framer-motion';

type SiteButtonProps = {
  variant?: 'solid' | 'outline-dark' | 'outline-light';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<'a'>, 'href' | 'onClick' | 'children'>;

const BASE =
  'inline-flex items-center justify-center px-8 py-3 min-h-[48px] rounded-lg font-medium tracking-wide ' +
  'transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.99] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const VARIANTS: Record<NonNullable<SiteButtonProps['variant']>, string> = {
  solid: 'bg-rc-accent text-white shadow-md hover:shadow-xl hover:bg-rc-accent-light focus-visible:outline-rc-accent',
  'outline-dark': 'text-rc-text border-2 border-rc-text hover:bg-rc-text/5 focus-visible:outline-rc-text',
  'outline-light': 'text-white border-2 border-white hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] focus-visible:outline-white',
};

/** Single source of truth for every CTA on the site — solid teal for primary actions,
 *  outline for secondary/on-dark actions. Never copy-paste button classes into a page again. */
export default function SiteButton({ variant = 'solid', href, onClick, children, className = '', ...rest }: SiteButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={classes} {...rest}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.a onClick={onClick} role="button" tabIndex={0} className={`${classes} cursor-pointer`} {...rest}>
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 1: Bump `SiteButton.tsx` radius**

In the `BASE` constant, change `rounded-lg` to `rounded-xl`:

```tsx
const BASE =
  'inline-flex items-center justify-center px-8 py-3 min-h-[48px] rounded-xl font-medium tracking-wide ' +
  'transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.99] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
```

- [ ] **Step 2: Replace the hero's "Watch My Story" text link with a filled `SiteButton`**

In `apps/web/app/page.tsx`, add the import near the top with the other imports:

```tsx
import SiteButton from '@/components/SiteButton';
```

Find this block inside the hero section:

```tsx
          <div className={`flex items-center justify-center gap-6 transform transition-all duration-500 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="/my-story"
              className="inline-block text-white/70 hover:text-white text-base font-medium transition-colors duration-200"
            >
              Watch My Story
            </a>
            <a
              href="/book"
              className="inline-block text-white/70 hover:text-white text-base font-medium transition-colors duration-200"
            >
              Read The Book
            </a>
          </div>
```

Replace it with:

```tsx
          <div className={`flex items-center justify-center gap-6 transform transition-all duration-500 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <SiteButton href="/my-story" variant="solid">
              Watch My Story
            </SiteButton>
            <a
              href="/book"
              className="inline-block text-white/70 hover:text-white text-base font-medium transition-colors duration-200"
            >
              Read The Book
            </a>
          </div>
```

- [ ] **Step 3: Replace the flat scripture section with the two-column dark band**

Find this entire section:

```tsx
      {/* THE SCRIPTURE MOMENT — one anchor verse, given room to breathe */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text leading-snug mb-6">
            This is the end for everyone who does not repent and receive God&apos;s mercy. It would have been mine.
          </motion.p>
          <motion.p variants={fadeInLine} className="text-base text-rc-text/70 font-light leading-relaxed mb-2">
            &ldquo;Like a partridge that hatches eggs it did not lay, are those who gain riches by unjust means.
            When their lives are half gone, their riches will desert them, and in the end they will prove to be fools.&rdquo;
          </motion.p>
          <motion.p variants={fadeInLine} className="text-base font-medium text-rc-accent">
            Jeremiah 17:11
          </motion.p>
        </motion.div>
      </section>
```

Replace it with:

```tsx
      {/* THE DARK BAND — the page's one deliberate dramatic peak: the real man
          alongside the highest-stakes line on the page, at the same weight. */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <motion.img
            variants={fadeInLine}
            src="/images/portrait-hero-website.jpg"
            alt="Brother Jimi"
            className="w-full h-auto rounded-xl object-cover"
          />
          <div className="text-left">
            <motion.p variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold tracking-tight text-white leading-snug mb-6">
              This is the end for everyone who does not repent and receive God&apos;s mercy. It would have been mine.
            </motion.p>
            <motion.p variants={fadeInLine} className="text-base text-white/70 font-light leading-relaxed mb-2">
              &ldquo;Like a partridge that hatches eggs it did not lay, are those who gain riches by unjust means.
              When their lives are half gone, their riches will desert them, and in the end they will prove to be fools.&rdquo;
            </motion.p>
            <motion.p variants={fadeInLine} className="text-base font-medium text-white/90">
              Jeremiah 17:11
            </motion.p>
          </div>
        </motion.div>
      </section>
```

Note: the section background changes from `bg-rc-warm-gray` to `bg-rc-text` (dark). This breaks the strict light/gray alternation `DESIGN_LANGUAGE.md` otherwise mandates — this is intentional and matches the doc's own existing exception clause ("Special sections (Hero, Return, Footer) can break pattern if they use gradient or dark backgrounds"), and Task 4 documents this specific case explicitly.

- [ ] **Step 4: Fix the attendance modal's z-index**

The homepage's fixed nav is `z-50` (Task 1). The attendance modal overlay is currently `z-40`, which would render underneath the nav when both are visible. Find:

```tsx
            onClick={() => setIsAttendanceModalOpen(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
```

Replace with:

```tsx
            onClick={() => setIsAttendanceModalOpen(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
```

- [ ] **Step 5: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/`
Expected: `200`

Manually load `http://localhost:4022/` and confirm:
- Hero shows a filled teal "Watch My Story" button next to the plain "Read The Book" text link
- Scrolling down, the former scripture section is now a full-bleed dark section with the real portrait photo on one side (left on desktop) and the declaration/verse/reference in white text on the other, both at equal visual weight
- On mobile width, the photo stacks above the text
- Opening the attendance modal (via `?attend=1` query param or however it's currently triggered) shows the modal above the nav bar, not underneath it

- [ ] **Step 6: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/src/components/SiteButton.tsx apps/web/app/page.tsx
git commit -m "feat(homepage): confident hero CTA and photography-driven dark band"
```

---

### Task 3: Homepage closing section cards + hero tracking bump

**Files:**
- Modify: `apps/web/app/page.tsx` (closing section, hero headline tracking)

**Interfaces:**
- Consumes: nothing from Task 2 directly — edits a different section of the same file (the closing section, untouched by Task 2).
- Produces: nothing for later tasks — Task 4 only edits `DESIGN_LANGUAGE.md`, not `page.tsx`.

- [ ] **Step 1: Tighten the hero headline tracking**

Find:

```tsx
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Fraud is not just a crime. It is a spirit.
            </h1>
```

Replace `tracking-tight` with `tracking-tighter` (the largest text on the page gets the tightest tracking, per the formalized type scale):

```tsx
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tighter">
              Fraud is not just a crime. It is a spirit.
            </h1>
```

- [ ] **Step 2: Replace the closing section's text links with elevated cards**

Find:

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
          <motion.div variants={fadeInLine} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/my-story" className="text-sm text-rc-text/60 hover:text-rc-accent transition-colors duration-200 group">
              Watch the full series →
              <span className="block h-px w-0 group-hover:w-full bg-rc-accent transition-all duration-300 mt-1"></span>
            </a>
            <a href="/book" className="text-sm text-rc-text/60 hover:text-rc-accent transition-colors duration-200 group">
              Read the book →
              <span className="block h-px w-0 group-hover:w-full bg-rc-accent transition-all duration-300 mt-1"></span>
            </a>
          </motion.div>
        </motion.div>
      </section>
```

Replace it with:

```tsx
      {/* CLOSING ACTION — the page's one goal. Series/Book stay present but
          quiet: two small elevated cards, not a promotional block. */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <motion.a
            variants={fadeInLine}
            href="/my-story"
            className="block bg-white border border-rc-border rounded-xl p-8 text-center hover:border-rc-accent transition-colors duration-200 group"
          >
            <span className="text-base font-medium text-rc-text group-hover:text-rc-accent transition-colors duration-200">
              Watch the full series →
            </span>
          </motion.a>
          <motion.a
            variants={fadeInLine}
            href="/book"
            className="block bg-white border border-rc-border rounded-xl p-8 text-center hover:border-rc-accent transition-colors duration-200 group"
          >
            <span className="text-base font-medium text-rc-text group-hover:text-rc-accent transition-colors duration-200">
              Read the book →
            </span>
          </motion.a>
        </motion.div>
      </section>
```

- [ ] **Step 3: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/`
Expected: `200`

Manually load `http://localhost:4022/` and confirm:
- The hero headline still reads correctly and doesn't wrap awkwardly with the tighter tracking
- The closing section now shows two white cards with a visible border, sitting on the slightly-off-white `rc-bg` canvas — the cards should visibly "lift" off the background
- Hovering a card changes its border to the teal accent color and the text color to match
- Both cards link to the correct pages (`/my-story`, `/book`)

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/page.tsx
git commit -m "feat(homepage): elevated closing cards, tighter hero tracking"
```

---

### Task 4: `DESIGN_LANGUAGE.md` updates

**Files:**
- Modify: `apps/web/DESIGN_LANGUAGE.md`

**Interfaces:**
- Consumes: nothing (documentation only).
- Produces: nothing (documentation only, terminal task).

- [ ] **Step 1: Add a "Surface & Elevation" section**

Find the "## Content Max-Width (RECOMMENDED)" heading and insert a new section immediately before it:

```markdown
## Surface & Elevation (NEW)

Most of the site is flat — text directly on `bg-rc-bg` or `bg-rc-warm-gray`, no elevation. Cards are the deliberate exception, used only where content genuinely needs to feel like a distinct, liftable unit (not as a default container for everything).

**Card pattern:**

```tsx
<a href="..." className="block bg-white border border-rc-border rounded-xl p-8 hover:border-rc-accent transition-colors duration-200">
  {/* content */}
</a>
```

**Rules:**
1. Card surface is always `bg-white` — even on sections whose canvas is `bg-rc-bg` (off-white, not pure white), so the card visibly lifts off the page.
2. Never add a `shadow-*` class to a card. Depth comes from the border/background contrast, not elevation.
3. Border is always `border border-rc-border`, `rounded-xl`. On hover, the border may switch to `border-rc-accent` to signal interactivity.
4. Use cards sparingly and deliberately — most content should stay flat. A page with cards everywhere loses the contrast that makes cards feel special.

---

```

- [ ] **Step 2: Add a "Navigation" section**

Find the "## Footer (MINIMAL & CONSISTENT)" heading and insert a new section immediately before it:

```markdown
## Navigation (NEW)

Every page gets the shared `Navigation` component (`apps/web/src/components/Navigation.tsx`), rendered once from `layout.tsx` — never re-implement or duplicate nav markup on a per-page basis.

**Behavior:**
- Fixed to the top, `backdrop-blur-md`, `z-50`. Any full-screen modal or overlay on a page must use a higher z-index (`z-[60]` or above) to render above the nav.
- On the homepage, the nav is transparent and its text switches between light (over the dark hero) and dark (once scrolled past it), tracked via `IntersectionObserver` on the hero section's `id="hero"`.
- On every other page, the nav renders as a solid `bg-rc-bg/95` bar with dark text from the very top — those pages may open with their own dark gradient section (per the Background Color Pattern's hero exception below), and the nav can't assume anything about a given page's content color without inspecting it, so it stays deliberately safe/opaque everywhere except the homepage.
- Links: Home, My Story, Book, Scriptures, Get Help, About, Deliverances — the 7 real, built routes. Do not add a link to `/journey` or `/login` until those pages are actually ready.
- Below `768px`, the link row collapses into a hamburger-triggered slide-down sheet with the same 7 links.

---

```

- [ ] **Step 3: Update the three CTA button radius examples**

Find the "## CTA Button Styling (UNIFIED)" section and replace all three `rounded-lg` occurrences with `rounded-xl`:

```markdown
## CTA Button Styling (UNIFIED)

All CTA buttons should use the shared `SiteButton` component (`apps/web/src/components/SiteButton.tsx`) rather than hand-copied classes:

```tsx
import SiteButton from '@/components/SiteButton';

{/* Primary CTA (accent background) */}
<SiteButton variant="solid" href="/some-path">Request Deliverance</SiteButton>

{/* Secondary CTA (outlined, dark text) */}
<SiteButton variant="outline-dark" href="/some-path">Start a Conversation</SiteButton>

{/* On dark background */}
<SiteButton variant="outline-light" href="/some-path">Return to Your Journey</SiteButton>
```

**Properties (baked into `SiteButton`, do not override):**
- `min-h-[48px]` — ensures touch-friendly size
- `rounded-xl` — generous but not pill-shaped
- `transition-all duration-300 ease-out` — smooth hover effects
- Consistent padding: `px-8 py-3`

If a one-off case genuinely can't use `SiteButton` (rare — flag it in review rather than assuming), match these properties by hand, using `rounded-xl` (not the old `rounded-lg`).
```

This entire section replaces the existing "## CTA Button Styling (UNIFIED)" section, including its old code block with the three hand-written `<button>` examples.

- [ ] **Step 4: Add the type-scale rule**

Find the "## Typography Hierarchy" section's "**Rules:**" list and add one line after the existing bullets:

```markdown
- Serif headers `text-3xl` and above always get `tracking-tight`. The single largest headline on a page (typically the hero `<h1>`) steps further to `tracking-tighter`. This is a fixed rule, not a per-page judgment call.
```

- [ ] **Step 5: Update the Quick Checklist**

Find the "## Quick Checklist for New Pages" section and add two lines:

```markdown
- [ ] Cards (if any) use `bg-white`, `border border-rc-border`, `rounded-xl`, zero shadow
- [ ] All CTAs use the `SiteButton` component, not hand-copied button classes
```

- [ ] **Step 6: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/DESIGN_LANGUAGE.md
git commit -m "docs: document surface/elevation, navigation, and updated button radius"
```

---

## Self-Review Notes

- **Spec coverage:** Navigation (Task 1), hero CTA + dark band + photography (Task 2), closing cards + type scale (Task 3), `DESIGN_LANGUAGE.md` documentation (Task 4). All six approved gaps from the spec are covered: nav (1), surface hierarchy via cards (2), photography via the dark band (3), the dark band itself (4), confident CTA via `SiteButton` (5), type scale + radius (6).
- **Spec correction, disclosed above in Global Constraints:** the nav's light/dark logic was changed from a universal `IntersectionObserver`-everywhere approach (as the spec described) to homepage-only adaptive / everywhere-else-solid, after discovering during planning that `/about` also opens with a dark section and this plan isn't permitted to touch that file. No other page's files are modified — this stays inside the approved scope, it just implements the nav more defensively than the spec's original wording assumed.
- **Placeholder scan:** no TBD/TODO introduced. The pre-existing `// TODO: wire to a real waitlist endpoint` comment on `/book` (out of scope, untouched by this plan) is not affected.
- **Type consistency:** `SiteButton`'s `variant` prop (`'solid' | 'outline-dark' | 'outline-light'`) is used correctly in Task 2 (`variant="solid"`) — matches the component's existing type signature, not invented. `Navigation`'s `LINKS` array shape (`{ href, label }`) is self-contained within Task 1, not consumed elsewhere.
- **Out-of-scope guard:** no task in this plan touches `/my-story`, `/book`, `/scriptures`, `/get-help`, `/about`, or `/deliverances` page files, matching the spec's scope boundary.

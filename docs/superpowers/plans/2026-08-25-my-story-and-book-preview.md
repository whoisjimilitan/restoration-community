# /my-story and /book Real-Content Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `apps/web/app/my-story/page.tsx` as a thumbnail-grid episode list using real, already-generated artwork, and `apps/web/app/book/page.tsx` to use the real book cover and link its two video-backed chapters — per the approved spec at `docs/superpowers/specs/2026-08-25-my-story-and-book-preview-design.md`.

**Architecture:** Two independent page-file edits plus one asset-copy task. No new components, no new routes, no shared code between the two pages beyond what already exists (both already import `SiteFooter`, `motion`/`framer-motion` variants).

**Tech Stack:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion. No test framework applies to these files (no existing component tests for either page); verification is compile-check + manual visual review, consistent with every other change made to this codebase this session.

## Global Constraints

- Scope is `apps/web/app/my-story/page.tsx`, `apps/web/app/book/page.tsx`, and new files under `apps/web/public/images/episodes/`, all in `restoration-community-prototype` (branch `prototype/hiartem-story`). The reference production site (sibling `restoration-community` repo, port 4021) must never be touched.
- Dev server for this prototype runs at `http://localhost:4022` — verify every task with `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/my-story` or `/book` as appropriate; expect `200` and no compile errors in the dev server log.
- **Never `git add -A` or `git add .`.** The working tree has pre-existing untracked files (including a `node_modules` directory that is not being correctly excluded by `.gitignore` for reasons not yet diagnosed). Every commit in this plan stages only the exact files that task modified, listed explicitly.
- Never invent chapter body text or episode content beyond what's already in the `CHAPTERS` and `EPISODES` arrays (see spec's "Content inventory" section — verified against the actual source files, not assumed).
- Stay inside `DESIGN_LANGUAGE.md`: `py-24 md:py-32` spacing, alternating `bg-rc-bg`/`bg-rc-warm-gray` backgrounds, `border-t border-rc-border` dividers, `max-w-2xl`/`max-w-5xl` containers, serif bold headers + light body, the three approved button patterns, `min-h-[48px]` on interactive controls, no inline styles, no new colors.
- No motivational-speaker language in any new copy (none is being added — all text in this plan is either already-existing content or structural/labels).

---

### Task 1: Copy the real episode thumbnails into the repo

**Files:**
- Create: `apps/web/public/images/episodes/episode-01.png` through `episode-09.png` (9 files)

**Interfaces:**
- Consumes: source files at `~/Downloads/BrotherJimi_Thumbnail_Episode01.png` through `BrotherJimi_Thumbnail_Episode09.png` (already confirmed to exist, 1280x720 PNG each, verified present via `ls`).
- Produces: `/images/episodes/episode-0N.png` (N = 1–9) as public URLs Task 2 will reference directly in `<img src>` tags.

- [ ] **Step 1: Create the target directory and copy all 9 files**

```bash
mkdir -p /Users/jimilitan/Documents/GitHub/restoration-community-prototype/apps/web/public/images/episodes
for n in 01 02 03 04 05 06 07 08 09; do
  cp "/Users/jimilitan/Downloads/BrotherJimi_Thumbnail_Episode${n}.png" \
     "/Users/jimilitan/Documents/GitHub/restoration-community-prototype/apps/web/public/images/episodes/episode-${n}.png"
done
```

- [ ] **Step 2: Verify all 9 files copied and are non-empty**

Run: `ls -la /Users/jimilitan/Documents/GitHub/restoration-community-prototype/apps/web/public/images/episodes/`
Expected: 9 files named `episode-01.png` through `episode-09.png`, each with a non-zero byte size (should be several hundred KB each, matching the ~1280x720 PNG source).

- [ ] **Step 3: Verify the dev server can serve one of them**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/images/episodes/episode-01.png`
Expected: `200`

- [ ] **Step 4: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/public/images/episodes/episode-01.png apps/web/public/images/episodes/episode-02.png apps/web/public/images/episodes/episode-03.png apps/web/public/images/episodes/episode-04.png apps/web/public/images/episodes/episode-05.png apps/web/public/images/episodes/episode-06.png apps/web/public/images/episodes/episode-07.png apps/web/public/images/episodes/episode-08.png apps/web/public/images/episodes/episode-09.png
git commit -m "chore: add real episode thumbnail assets for /my-story and /book"
```

---

### Task 2: Rebuild /my-story as a thumbnail grid

**Files:**
- Modify: `apps/web/app/my-story/page.tsx` (full file, 75 lines currently)

**Interfaces:**
- Consumes: `/images/episodes/episode-0N.png` from Task 1 (must be complete first — this task references those exact paths).
- Produces: nothing new for later tasks — Task 3 (`/book`) references the same asset paths independently, not anything exported from this file.

**Current file content (for reference — this is what exists before this task's edit):**
```tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const EPISODES = [
  { n: 1, title: 'There Is a Spirit Moving', desc: 'The declaration. Who is Brother Jimi and why does he know this spirit is real. Because it lived in him.' },
  { n: 2, title: 'Before the Spirit', desc: 'Born in Canada. Christian home. Smart kid. Something already pulling him off track. Dad passes. Mom holds the line.' },
  { n: 3, title: 'Rise Up and Walk', desc: 'The sickness. The healing. The miracle. And the voices that stole the covering.' },
  { n: 4, title: 'Weje', desc: 'Leaving the church. Rebellion enters. Occupation, not teenage angst. The spirit gets its name.' },
  { n: 5, title: "I'm Taking This Death Because of You", desc: 'March 1996. Her last words. The weight that shaped everything after.' },
  { n: 6, title: 'A Very Good Idea', desc: 'Trafficked. Drug runs. Multiple countries. Promises to God. Broken promises. Running.' },
  { n: 7, title: 'The Spirit of Waste', desc: 'The fraud years. The scam that preys on fear. Hundreds of thousands per week. No peace.' },
  { n: 8, title: 'Heart of Stone', desc: 'May 2015. The trance. Two figures from one body. The spirit cast out. A new heart placed in.' },
  { n: 9, title: 'Today It Has Turned to Victory', desc: 'After deliverance. Ghana. Restoration. New family. The call.' },
];

export default function MyStoryPage() {
  return (
    <div className="bg-rc-bg text-rc-text relative">
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            My Story
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
            My name is Brother Jimi. When I was a boy, God healed me through Prophet T.B. Joshua. But when the covering of God was removed from my life, a spirit entered and controlled me for over twenty years. His name was Weje. This is the story of how he entered, what he did, and how Jesus Christ cast him out.
          </motion.p>
        </motion.div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-6"
        >
          {EPISODES.map((ep) => (
            <motion.div
              key={ep.n}
              variants={fadeInLine}
              className="border-l-4 border-rc-accent pl-6 md:pl-8 py-2"
            >
              <p className="text-xs uppercase tracking-wider text-rc-accent font-medium mb-1">Episode {ep.n}</p>
              <h2 className="text-2xl font-rc-serif font-bold text-rc-text leading-tight mb-2">{ep.title}</h2>
              <p className="text-base text-rc-text/80 leading-relaxed font-light mb-3">{ep.desc}</p>
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-rc-text/50 border border-rc-border rounded-lg cursor-default">
                Coming Soon
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 1: Replace the entire file with the grid version**

The hero section (first `<section>`) is unchanged. The `EPISODES` array gains two fields (`youtubeId` and `thumbnail`) needed to drive the grid — same 9 entries, same `title`/`desc` text, nothing invented. The second `<section>` is replaced with a responsive grid.

```tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const EPISODES = [
  { n: 1, title: 'There Is a Spirit Moving', desc: 'The declaration. Who is Brother Jimi and why does he know this spirit is real. Because it lived in him.', thumbnail: '/images/episodes/episode-01.png', youtubeId: 'fc9g750tqdQ' },
  { n: 2, title: 'Before the Spirit', desc: 'Born in Canada. Christian home. Smart kid. Something already pulling him off track. Dad passes. Mom holds the line.', thumbnail: '/images/episodes/episode-02.png', youtubeId: null },
  { n: 3, title: 'Rise Up and Walk', desc: 'The sickness. The healing. The miracle. And the voices that stole the covering.', thumbnail: '/images/episodes/episode-03.png', youtubeId: null },
  { n: 4, title: 'Weje', desc: 'Leaving the church. Rebellion enters. Occupation, not teenage angst. The spirit gets its name.', thumbnail: '/images/episodes/episode-04.png', youtubeId: null },
  { n: 5, title: "I'm Taking This Death Because of You", desc: 'March 1996. Her last words. The weight that shaped everything after.', thumbnail: '/images/episodes/episode-05.png', youtubeId: null },
  { n: 6, title: 'A Very Good Idea', desc: 'Trafficked. Drug runs. Multiple countries. Promises to God. Broken promises. Running.', thumbnail: '/images/episodes/episode-06.png', youtubeId: null },
  { n: 7, title: 'The Spirit of Waste', desc: 'The fraud years. The scam that preys on fear. Hundreds of thousands per week. No peace.', thumbnail: '/images/episodes/episode-07.png', youtubeId: 'A9X9TrMBda0' },
  { n: 8, title: 'Heart of Stone', desc: 'May 2015. The trance. Two figures from one body. The spirit cast out. A new heart placed in.', thumbnail: '/images/episodes/episode-08.png', youtubeId: null },
  { n: 9, title: 'Today It Has Turned to Victory', desc: 'After deliverance. Ghana. Restoration. New family. The call.', thumbnail: '/images/episodes/episode-09.png', youtubeId: null },
];

export default function MyStoryPage() {
  return (
    <div className="bg-rc-bg text-rc-text relative">
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            My Story
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
            My name is Brother Jimi. When I was a boy, God healed me through Prophet T.B. Joshua. But when the covering of God was removed from my life, a spirit entered and controlled me for over twenty years. His name was Weje. This is the story of how he entered, what he did, and how Jesus Christ cast him out.
          </motion.p>
        </motion.div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {EPISODES.map((ep) => {
            const card = (
              <>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={ep.thumbnail} alt={`Episode ${ep.n}: ${ep.title}`} className="w-full h-full object-cover" />
                  {!ep.youtubeId && (
                    <span className="absolute bottom-3 left-3 text-white text-xs uppercase tracking-wide font-medium px-3 py-1 rounded-full bg-rc-text/80">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-xs uppercase tracking-wider text-rc-accent font-medium mt-4 mb-1">Episode {ep.n}</p>
                <h2 className="text-xl font-rc-serif font-bold text-rc-text leading-tight mb-2">{ep.title}</h2>
                <p className="text-sm text-rc-text/70 leading-relaxed font-light">{ep.desc}</p>
                {ep.youtubeId && (
                  <span className="inline-block text-sm text-rc-accent font-medium mt-3 group-hover:underline">
                    Watch Now →
                  </span>
                )}
              </>
            );

            return ep.youtubeId ? (
              <motion.a
                key={ep.n}
                variants={fadeInLine}
                href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                {card}
              </motion.a>
            ) : (
              <motion.div key={ep.n} variants={fadeInLine}>
                {card}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/my-story`
Expected: `200`, no compile errors in the dev server log.

Manually load `http://localhost:4022/my-story` and confirm:
- 9 cards in a responsive grid (1 column mobile, 2 tablet, 3 desktop)
- Each card shows its real thumbnail image, not a broken image icon
- Episodes 1 and 7 have no "Coming Soon" badge and show "Watch Now →"; clicking either opens the correct YouTube video in a new tab (`fc9g750tqdQ` for Episode 1, `A9X9TrMBda0` for Episode 7)
- Episodes 2–6, 8–9 show a "Coming Soon" badge overlaid on their thumbnail and are not clickable links

- [ ] **Step 3: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/my-story/page.tsx
git commit -m "feat(/my-story): thumbnail grid with real art, Watch Now for live episodes"
```

---

### Task 3: Rebuild /book cover with the real cover image

**Correction (2026-08-25):** the two live YouTube videos (`fc9g750tqdQ`, `A9X9TrMBda0`) are declaration videos, not Episode 1 and Episode 7 of the series — confirmed by the founder after Task 2 shipped. They do not correspond to any specific book chapter either, so this task no longer adds chapter-video links. `/my-story` already carries a separate "The Declaration" section for these two videos (commit `cb552c4`); the founder scoped that reference to `/my-story` only, not `/book`. This task is now cover-image-only.

**Files:**
- Modify: `apps/web/app/book/page.tsx` (full file, 157 lines currently)

**Interfaces:**
- Consumes: `apps/web/public/images/book-cover.png` (already exists, confirmed 800x500 PNG).
- Produces: nothing for later tasks — this is the final task in the plan.

**Current file content (for reference):**
```tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import SiteFooter from '@/components/SiteFooter';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const CHAPTERS = [
  'There Is a Spirit Moving',
  'Before the Spirit',
  'Rise Up and Walk',
  'Weje',
  'Sold',
  'One More Time',
  'The Spirit of Waste',
  'Partridge Hatching Eggs',
  'Heart of Stone',
  'Victory',
  'What I Learned',
  'Take This As a Warning',
];

export default function BookPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to a real waitlist endpoint before this ships live.
    setSubmitted(true);
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.15]);

  return (
    <div className="bg-rc-bg text-rc-text relative">
      <section ref={heroRef} className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <motion.div
            variants={fadeInLine}
            className="mx-auto w-40 h-56 md:w-48 md:h-64 bg-rc-text border border-white/20 rounded flex flex-col items-center justify-center space-y-2 shadow-2xl"
          >
            <p className="text-white text-3xl md:text-4xl font-rc-serif font-bold tracking-wide">WEJE</p>
            <p className="text-white/60 text-[10px] md:text-xs px-4 text-center leading-snug">The Spirit of Waste Lived Inside Me</p>
            <p className="text-white/40 text-[10px] uppercase tracking-wider mt-2">Brother Jimi</p>
          </motion.div>

          <motion.h1 variants={fadeInLine} className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            Weje: The Spirit of Waste Lived Inside Me
          </motion.h1>

          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
            The spirit of waste lived inside me for over twenty years. He drove me across nations. He built an empire of deception through my hands. And then Jesus Christ cast him out. This is the full story.
          </motion.p>
        </motion.div>
      </section>

      {/* WAITLIST */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-md mx-auto text-center space-y-6"
        >
          <motion.p variants={fadeInLine} className="text-base text-rc-text/80 leading-relaxed font-light">
            The book is coming. Join the waitlist to be the first to know when it releases.
          </motion.p>

          {submitted ? (
            <motion.p variants={fadeInLine} className="text-rc-accent font-medium">
              Thank you. You&rsquo;ll be the first to know.
            </motion.p>
          ) : (
            <motion.form variants={fadeInLine} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-rc-border rounded-lg bg-rc-bg"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-rc-border rounded-lg bg-rc-bg"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white rounded-lg font-medium tracking-wide shadow-md transition-all duration-300 ease-out hover:bg-rc-accent-light hover:shadow-xl hover:scale-[1.01]"
              >
                Join Waitlist
              </button>
            </motion.form>
          )}
        </motion.div>
      </section>

      {/* CHAPTERS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-8"
        >
          <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
            Chapters
          </motion.h2>
          <motion.div variants={fadeInLine} className="-mt-4 space-y-2">
            <p className="text-sm text-rc-text/60 leading-relaxed font-light">
              The book follows the same arc as the series. It goes three chapters deeper, with reflections and scripture the camera doesn&rsquo;t have room for.
            </p>
            <a href="/my-story" className="inline-block text-sm text-rc-accent font-medium hover:underline">
              Watch the nine-episode series →
            </a>
          </motion.div>
          <motion.div variants={staggerContainer} className="space-y-3">
            {CHAPTERS.map((title, i) => (
              <motion.div key={title} variants={fadeInLine} className="flex items-baseline gap-4 border-b border-rc-border pb-3">
                <span className="text-rc-accent font-rc-serif font-bold text-lg w-8 shrink-0">{i + 1}.</span>
                <span className="text-base md:text-lg text-rc-text/90 font-light">{title}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 1: Replace the cover mock with the real cover image**

One change to the file above: the styled-div cover mock becomes a real `<img>`, sized to the cover's actual 800x500 (8:5) aspect ratio instead of the old box's roughly 5:7 portrait shape. The `CHAPTERS` array and its rendering stay exactly as they currently are — a flat array of title strings, rendered as a numbered, non-clickable list. Do not add `youtubeId`/`thumbnail` fields to `CHAPTERS` and do not add any chapter-video links.

Replace the cover `motion.div` block:
```tsx
          <motion.div
            variants={fadeInLine}
            className="mx-auto w-48 md:w-56 rounded shadow-2xl overflow-hidden"
          >
            <img src="/images/book-cover.png" alt="Weje: The Spirit of Waste Lived Inside Me — book cover" className="w-full h-auto" />
          </motion.div>
```

Everything else in the file (imports, `staggerContainer`/`fadeInLine`, `CHAPTERS` array and its rendering, the waitlist section, `SiteFooter`) stays exactly as it is — do not modify those parts.

- [ ] **Step 2: Verify it compiles and renders**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4022/book`
Expected: `200`, no compile errors.

Manually load `http://localhost:4022/book` and confirm:
- The real book cover image renders (not the old teal box mock)
- All 12 chapters render exactly as before (numbered, no thumbnail, not clickable) — unchanged
- The waitlist form is unchanged and still works (submits, shows the thank-you message)

- [ ] **Step 3: Commit**

```bash
cd /Users/jimilitan/Documents/GitHub/restoration-community-prototype
git add apps/web/app/book/page.tsx
git commit -m "feat(/book): real cover image"
```

---

## Self-Review Notes

- **Spec coverage:** Thumbnail asset copy (Task 1), `/my-story` grid rebuild with real art + correct live/coming-soon status + separate Declaration section (Task 2, corrected 2026-08-25), `/book` real cover image (Task 3, simplified 2026-08-25). All spec sections covered; no out-of-scope items (chapter body-preview text, episodes 2–6/8–9 becoming clickable, chapter-video links) were added.
- **Placeholder scan:** No TBD/TODO introduced by this plan. The pre-existing `// TODO: wire to a real waitlist endpoint before this ships live.` comment in `/book` is left untouched since it's out of this plan's scope (waitlist backend wiring, not content/asset presentation) and removing or resolving it isn't part of the approved spec.
- **Type consistency:** `EPISODES` (Task 2) and `DECLARATIONS` (Task 2 correction) are independent arrays with independent shapes — correct, since they represent different content categories. `CHAPTERS` in Task 3 remains a flat string array, unchanged from the original file.
- **2026-08-25 correction:** the founder clarified mid-execution that the two live YouTube videos are declaration videos, not Episode 1/7 of the series and not tied to any book chapter. Task 2 was already shipped and approved with the wrong premise; fixed directly (commit `cb552c4`) rather than looping the original implementer, since the fix was small and well-understood. Task 3's chapter-video-linking scope was removed before dispatch.

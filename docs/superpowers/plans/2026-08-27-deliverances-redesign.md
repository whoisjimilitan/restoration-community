# /deliverances Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `apps/web/app/deliverances/page.tsx` from a single hardcoded testimony to an array-based multi-testimony system, fix hero copy that overclaims plurality, and standardize this page's colors to the site-wide `rc-*` token system.

**Architecture:** Presentational and structural rebuild of a single existing Next.js client page component — no new files, no new dependencies. The `StoryCard` interface already exists and is unchanged; only the data it holds moves from a single object to an array, and the render logic that consumes it moves from direct references to a `.map()`.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, Framer Motion (existing `staggerContainer`/`fadeInLine` variants and the page's own inline `motion.div` transition patterns — reuse exactly, do not redefine).

## Global Constraints

- Full design spec: `docs/superpowers/specs/2026-08-27-deliverances-redesign-design.md`
- Only `apps/web/app/deliverances/page.tsx` may be touched.
- Do not alter Samuel's testimony data (name, role, quote, year, duration, story text, image, video URL) — structure and presentation only.
- Do not alter the "Face of Fraud" / "Spirit of Fraud" / "Not Just Me" line content, or the closing CTA section — only the color tokens named in Task 3 change; everything else in those sections stays as-is.
- The video modal (`selectedVideo` state and its JSX at the bottom of the file) needs no changes in any task — it already takes a plain string URL and works regardless of how that URL is sourced.
- Stay inside existing `rc-*` color tokens and Fraunces serif + sans body typography — no new colors, no new typeface.
- No em dashes anywhere.
- No `git add -A` or `git add .` — stage explicit file paths only.
- The dev server runs at `http://localhost:4021` throughout — use it for structural verification (`curl` + grep), since this repo has no component-level test suite for page files.

---

### Task 1: Convert the single testimony to an array-based system

**Files:**
- Modify: `apps/web/app/deliverances/page.tsx` (the `const samuel` object and the Samuel cinematic story `<section>` block only)

**Interfaces:**
- Consumes: `StoryCard` interface (already defined in this file — do not modify its shape).
- Produces: `STORIES: StoryCard[]` — an array constant. Task 3 will edit color classes inside the same `STORIES.map()` block this task creates, so it must exist with this exact name before Task 3 runs.

**Context:** The page currently hardcodes one testimony as `const samuel: StoryCard = {...}` and renders it by referencing `samuel.X` directly throughout one large JSX section. This task converts that into `const STORIES: StoryCard[] = [{...}]` (the same data, now as the array's one element) and wraps the render section in `STORIES.map((story) => (...))`, with every `samuel.X` reference inside it changed to `story.X`. This task does not touch any color classes — they carry over unchanged; Task 3 handles those separately.

- [ ] **Step 1: Replace the `samuel` object with a `STORIES` array**

Find this exact block:
```tsx
const samuel: StoryCard = {
  id: '1',
  name: 'Samuel Johnson',
  role: 'Delivered from Internet Fraud',
  quote: 'When the man of God touched me, I immediately saw myself facing a judge.',
  year: '',
  duration: '41 minutes • Full confession at The SCOAN',
  storyBefore: [
    'Samuel Johnson was a professional internet fraudster.',
    'Demonically inspired to deceive, defraud, and destroy.',
    'Through the most advanced online tactics and methods.',
  ],
  storyEncounter: [
    'He was not just a local king of internet scamming.',
    'He taught hundreds of youngsters his satanic tricks.',
    'Then one encounter changed everything.',
    'There is much to learn from his journey.',
  ],
  heroImage: {
    url: '/images/testimony.png',
    alt: 'Samuel Johnson - The King of Internet Scamming',
  },
  videoUrl: 'https://www.youtube.com/embed/bKJCcWQVuq8',
};
```

Replace with:
```tsx
const STORIES: StoryCard[] = [
  {
    id: '1',
    name: 'Samuel Johnson',
    role: 'Delivered from Internet Fraud',
    quote: 'When the man of God touched me, I immediately saw myself facing a judge.',
    year: '',
    duration: '41 minutes • Full confession at The SCOAN',
    storyBefore: [
      'Samuel Johnson was a professional internet fraudster.',
      'Demonically inspired to deceive, defraud, and destroy.',
      'Through the most advanced online tactics and methods.',
    ],
    storyEncounter: [
      'He was not just a local king of internet scamming.',
      'He taught hundreds of youngsters his satanic tricks.',
      'Then one encounter changed everything.',
      'There is much to learn from his journey.',
    ],
    heroImage: {
      url: '/images/testimony.png',
      alt: 'Samuel Johnson - The King of Internet Scamming',
    },
    videoUrl: 'https://www.youtube.com/embed/bKJCcWQVuq8',
  },
];
```

- [ ] **Step 2: Wrap the Samuel render section in `STORIES.map()`**

Find this exact block:
```tsx
      {/* SAMUEL'S STORY — Full-Width Dark Cinematic, video presentation untouched */}
      <section className="w-screen -mx-[calc(50vw-50%)] bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="w-full"
        >
          {/* Video Hero */}
          <div className="relative w-full aspect-video md:aspect-auto md:min-h-screen flex items-center justify-center overflow-hidden">
            <img
              src={samuel.heroImage?.url}
              alt={samuel.heroImage?.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Movie Overlay - Left to Right Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

            {/* Bottom Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

            {/* Play Button */}
            {samuel.videoUrl && (
              <button
                onClick={() => setSelectedVideo(samuel.videoUrl!)}
                className="relative z-10 group flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:bg-white">
                  <svg className="w-10 h-10 text-[#0F0F0F] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Premium Content Section */}
          <div className="relative px-6 sm:px-8 md:px-12 py-24 md:py-32">
            <div className="max-w-2xl mx-auto space-y-16">
              {/* Name & Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, amount: 0.15 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  {samuel.year && <p className="text-sm text-white/60 font-light tracking-wide">{samuel.year}</p>}
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
                    {samuel.name}
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 font-light">
                    {samuel.role}
                  </p>
                </div>

                <blockquote className="border-l-4 border-testimony-gold pl-8 pt-2">
                  <p className="text-lg md:text-xl font-rc-serif font-normal text-white/95 leading-relaxed">
                    &ldquo;{samuel.quote}&rdquo;
                  </p>
                </blockquote>
              </motion.div>

              {/* The Story */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, amount: 0.15 }}
                className="space-y-10"
              >
                <div className="space-y-3">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wide">The King of Scamming</p>
                  <div className="space-y-2">
                    {samuel.storyBefore.map((line, i) => (
                      <p key={i} className="text-base md:text-lg text-white/85 leading-relaxed font-light">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wide">Facing the Judge</p>
                  <div className="space-y-2">
                    {samuel.storyEncounter.map((line, i) => (
                      <p key={i} className="text-base md:text-lg text-white/85 leading-relaxed font-light">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/50">{samuel.duration}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
```

Replace with:
```tsx
      {/* STORIES — Full-Width Dark Cinematic, video presentation untouched */}
      {STORIES.map((story) => (
        <section key={story.id} className="w-screen -mx-[calc(50vw-50%)] bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
            className="w-full"
          >
            {/* Video Hero */}
            <div className="relative w-full aspect-video md:aspect-auto md:min-h-screen flex items-center justify-center overflow-hidden">
              <img
                src={story.heroImage?.url}
                alt={story.heroImage?.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Movie Overlay - Left to Right Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

              {/* Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* Play Button */}
              {story.videoUrl && (
                <button
                  onClick={() => setSelectedVideo(story.videoUrl!)}
                  className="relative z-10 group flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:bg-white">
                    <svg className="w-10 h-10 text-[#0F0F0F] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>

            {/* Premium Content Section */}
            <div className="relative px-6 sm:px-8 md:px-12 py-24 md:py-32">
              <div className="max-w-2xl mx-auto space-y-16">
                {/* Name & Role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    {story.year && <p className="text-sm text-white/60 font-light tracking-wide">{story.year}</p>}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
                      {story.name}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 font-light">
                      {story.role}
                    </p>
                  </div>

                  <blockquote className="border-l-4 border-testimony-gold pl-8 pt-2">
                    <p className="text-lg md:text-xl font-rc-serif font-normal text-white/95 leading-relaxed">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </blockquote>
                </motion.div>

                {/* The Story */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="space-y-10"
                >
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-white/50 uppercase tracking-wide">The King of Scamming</p>
                    <div className="space-y-2">
                      {story.storyBefore.map((line, i) => (
                        <p key={i} className="text-base md:text-lg text-white/85 leading-relaxed font-light">{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-white/50 uppercase tracking-wide">Facing the Judge</p>
                    <div className="space-y-2">
                      {story.storyEncounter.map((line, i) => (
                        <p key={i} className="text-base md:text-lg text-white/85 leading-relaxed font-light">{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/50">{story.duration}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      ))}
```

Note: color classes (`from-[#0F0F0F] to-[#1a1a1a]`, `text-[#0F0F0F]`, `border-testimony-gold`) are carried over unchanged in this step — Task 3 edits them separately, after this structural conversion is in place.

- [ ] **Step 3: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i "app/deliverances"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/deliverances` — expect `200`.
Run: `curl -s http://localhost:4021/deliverances | grep -o "Samuel Johnson"` — expect a match (confirms Samuel's data still renders).
Run: `grep -c "samuel\." apps/web/app/deliverances/page.tsx` — expect `0` (confirms every reference was converted to `story.`).
Run: `grep -c "STORIES.map" apps/web/app/deliverances/page.tsx` — expect `1`.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/deliverances/page.tsx
git commit -m "feat(/deliverances): convert single hardcoded testimony to an array-based multi-testimony system"
```

---

### Task 2: Fix hero copy to be honest about a single testimony

**Files:**
- Modify: `apps/web/app/deliverances/page.tsx` (the hero `<h1>` only)

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: nothing consumed by later tasks.

**Context:** The hero currently reads "Now hear theirs." — plural, implying multiple testimonies exist. Only Samuel's does right now. This task corrects the copy to be accurate.

- [ ] **Step 1: Fix the hero headline**

Find this exact block:
```tsx
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-rc-serif font-bold text-white leading-tight tracking-tight mt-2">
              Now hear theirs.
            </h1>
```

Replace with:
```tsx
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-rc-serif font-bold text-white leading-tight tracking-tight mt-2">
              Now hear his.
            </h1>
```

- [ ] **Step 2: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i "app/deliverances"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/deliverances` — expect `200`.
Run: `curl -s http://localhost:4021/deliverances | grep -o "Now hear his"` — expect a match.
Run: `curl -s http://localhost:4021/deliverances | grep -o "Now hear theirs"` — expect no output.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/deliverances/page.tsx
git commit -m "fix(/deliverances): correct hero copy to not overclaim plural testimonies"
```

---

### Task 3: Standardize colors to the rc-* token system

**Files:**
- Modify: `apps/web/app/deliverances/page.tsx` (color classes only, in the "Not Just Me" section and the `STORIES.map()` section from Task 1)

**Interfaces:**
- Consumes: the `STORIES.map()` structure from Task 1 — this task's "Find" blocks below reflect the file's state AFTER Task 1's changes, not the original pre-Task-1 code.
- Produces: nothing consumed by later tasks. This is the last task in the plan.

**Context:** This page uses `border-testimony-gold` and hardcoded hex colors (`#0F0F0F`, `#1a1a1a`) instead of the site's `rc-*` token system every other rebuilt page now uses. `#0F0F0F`/`#1a1a1a` are both near-identical in value to the existing `rc-text` token (`#1A1A18`), so the two-stop gradients simplify to a flat `bg-rc-text` fill, matching the "dark passage" pattern already established on `/my-story`.

- [ ] **Step 1: Fix the "Not Just Me" bridge section's colors**

Find this exact line:
```tsx
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
```

Replace with:
```tsx
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text">
```

Find this exact line (in the same section, just below):
```tsx
          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed font-light border-l-4 border-testimony-gold pl-8">
```

Replace with:
```tsx
          <motion.div variants={staggerContainer} className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
```

- [ ] **Step 2: Fix the `STORIES.map()` section's colors**

Find this exact line:
```tsx
        <section key={story.id} className="w-screen -mx-[calc(50vw-50%)] bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
```

Replace with:
```tsx
        <section key={story.id} className="w-screen -mx-[calc(50vw-50%)] bg-rc-text">
```

Find this exact line:
```tsx
                    <svg className="w-10 h-10 text-[#0F0F0F] ml-1" fill="currentColor" viewBox="0 0 24 24">
```

Replace with:
```tsx
                    <svg className="w-10 h-10 text-rc-text ml-1" fill="currentColor" viewBox="0 0 24 24">
```

Find this exact line:
```tsx
                  <blockquote className="border-l-4 border-testimony-gold pl-8 pt-2">
```

Replace with:
```tsx
                  <blockquote className="border-l-4 border-rc-accent pl-8 pt-2">
```

- [ ] **Step 3: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i "app/deliverances"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/deliverances` — expect `200`.
Run: `grep -c "testimony-gold" apps/web/app/deliverances/page.tsx` — expect `0`.
Run: `grep -c "#0F0F0F\|#1a1a1a" apps/web/app/deliverances/page.tsx` — expect `0`.
Run: `curl -s http://localhost:4021/deliverances | grep -o "bg-rc-text" | wc -l` — expect a number ≥ 2 (both the bridge and story sections).

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/deliverances/page.tsx
git commit -m "fix(/deliverances): standardize testimony-gold and hardcoded hex colors to the rc-* token system"
```

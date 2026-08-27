# /my-story Netflix-Style Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `apps/web/app/my-story/page.tsx` into a dark, cinematic, Netflix-style browsing experience that honestly distinguishes the 2 real/live declaration videos from the 9 unproduced series episodes.

**Architecture:** Single-file presentational rebuild of an existing Next.js client page component. No new components, no new dependencies, no content changes — only markup/class changes to the existing `MyStoryPage` component in `apps/web/app/my-story/page.tsx`.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, Framer Motion (existing `staggerContainer`/`fadeInLine` variants already defined in the file — reuse exactly, do not redefine).

## Global Constraints

- Full design spec: `docs/superpowers/specs/2026-08-27-my-story-netflix-rebuild-design.md`
- Only `apps/web/app/my-story/page.tsx` and `apps/web/DESIGN_LANGUAGE.md` may be touched by this plan.
- Do not alter any episode title, description, thumbnail path, or the 2 declaration video titles/YouTube IDs — the `DECLARATIONS` and `EPISODES` arrays at the top of the file must stay byte-for-byte unchanged across all 4 tasks.
- Do not redefine `staggerContainer` or `fadeInLine` — reuse the existing definitions in the file exactly as they are.
- No new colors, no new typeface — every class used below is either an existing `rc-*` token, a Tailwind utility, or a `white/opacity` variant already used elsewhere on this site's dark sections (e.g. `/get-help`, homepage dark band).
- No image/illustration generation — the hero uses the real, already-committed `apps/web/public/images/portrait-hero.jpg`. The play-button glyph is CSS-drawn (a `div` triangle via border tricks), not an image.
- No `git add -A` or `git add .` — stage explicit file paths only.
- The dev server runs at `http://localhost:4021` throughout — use it for structural verification (`curl` + grep) after each task, since this repo has no component-level test suite for page files (confirmed by the equivalent Sub-project 1 plan, which used the same verification approach).

---

### Task 1: Bespoke cinematic hero

**Files:**
- Modify: `apps/web/app/my-story/page.tsx` (the hero `<section>` only — the first section in the returned JSX, currently starting at `<section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">` and ending at that section's closing `</section>`)

**Interfaces:**
- Consumes: `staggerContainer`, `fadeInLine` (already defined in this file, do not touch their definitions).
- Produces: an `id="declaration"` anchor target is required on Task 2's Declaration section — Task 1 only produces the link (`href="#declaration"`) pointing at it; Task 2 adds the matching `id`.

**Context:** The current hero uses a flat gradient background with no image. The rebuild replaces it with a full-bleed real photo (`apps/web/public/images/portrait-hero.jpg`, a real 1920×1080 teal-toned video still already committed to the repo — do not generate or substitute any other image), using the exact same overlay gradient math already used everywhere else on this site (`from-rc-accent/85 to-rc-text/90`) so every photo-backed hero across the site shares one tonal identity. This page's hero is deliberately taller (`min-h-[85svh]`) and more cinematic than the standard inner-page `PageHero` component (`min-h-[60svh]`) — do not import or use `PageHero` here; this hero is bespoke to this page.

**Important — carry over a lesson from the shared `PageHero` component's own bug history:** when an absolutely-positioned photo + overlay sit behind text in the same section, the text's wrapping element MUST have `relative z-10`, or the absolutely-positioned layers will paint on top of it and make it invisible (this exact bug happened in `PageHero.tsx` and had to be fixed twice). The code below already includes `relative z-10` on the text wrapper — do not remove it.

- [ ] **Step 1: Replace the hero section**

Find this exact block (the first `<section>` in the file, right after the opening `<div className="bg-rc-bg text-rc-text relative">`):

```tsx
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
            My name is Brother Jimi. When I was a boy, God healed me through Prophet T.B. Joshua. But when the covering of God was removed from my life, a spirit entered and controlled me for twenty years. His name was Weje. This is the story of how he entered, what he did, and how Jesus Christ cast him out.
          </motion.p>
        </motion.div>
      </section>
```

Replace it with:

```tsx
      <section
        id="hero"
        className="relative w-full min-h-[85svh] flex flex-col justify-center overflow-hidden bg-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32"
      >
        <img
          src="/images/portrait-hero.jpg"
          alt="Brother Jimi"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rc-accent/85 to-rc-text/90" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.h1 variants={fadeInLine} className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            My Story
          </motion.h1>
          <motion.p variants={fadeInLine} className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
            My name is Brother Jimi. When I was a boy, God healed me through Prophet T.B. Joshua. But when the covering of God was removed from my life, a spirit entered and controlled me for twenty years. His name was Weje. This is the story of how he entered, what he did, and how Jesus Christ cast him out.
          </motion.p>
          <motion.a
            variants={fadeInLine}
            href="#declaration"
            className="inline-block text-sm text-white/70 hover:text-white hover:underline pt-4"
          >
            Begin with the Declaration ↓
          </motion.a>
        </motion.div>
      </section>
```

- [ ] **Step 2: Verify the file still parses and type-checks**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i my-story`
Expected: no output (no errors referencing `my-story`).

- [ ] **Step 3: Verify the page renders**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/my-story`
Expected: `200`

- [ ] **Step 4: Verify the hero's key structural pieces are present**

Run: `curl -s http://localhost:4021/my-story | grep -o 'portrait-hero.jpg' | head -1` — expected: `portrait-hero.jpg`
Run: `curl -s http://localhost:4021/my-story | grep -o 'min-h-\[85svh\]' | head -1` — expected: `min-h-[85svh]`
Run: `curl -s http://localhost:4021/my-story | grep -o 'Begin with the Declaration' | head -1` — expected: `Begin with the Declaration`

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/my-story/page.tsx
git commit -m "feat(/my-story): bespoke cinematic hero using real portrait-hero.jpg still"
```

---

### Task 2: Whole-page dark-theme conversion

**Files:**
- Modify: `apps/web/app/my-story/page.tsx` (outer wrapper `<div>`, the Declaration `<section>`, the Episodes `<section>`, and the `<SiteFooter />` call)
- Modify: `apps/web/DESIGN_LANGUAGE.md` (append a short note documenting this page's rhythm exception)

**Interfaces:**
- Consumes: nothing new from Task 1 beyond the file already containing Task 1's hero (this task does not touch the hero section).
- Produces: `id="declaration"` on the Declaration section (the target for Task 1's hero CTA link), and the dark-themed section backgrounds/text colors that Task 3 and Task 4 will layer their own additions onto.

**Context:** Every other rebuilt page on this site (`/about`, `/get-help`, `/scriptures`) alternates light and dark section backgrounds per the site's established rhythm, documented in `DESIGN_LANGUAGE.md`. This page is a deliberate, single exception: it stays dark end-to-end, the same way a real streaming-service browsing page never interrupts itself with a light section. This task converts the Declaration and Episodes sections (currently light) to match the now-dark hero, and updates their text colors for legibility on a dark background — reusing the exact `white/opacity` text-color pattern already proven on this site's other dark sections (the homepage's dark band, and `/get-help`'s body section), not the `rc-accent` color, which has no precedent as a text color on a dark background on this site and should not be introduced as one here.

- [ ] **Step 1: Update the outer wrapper**

Find:
```tsx
    <div className="bg-rc-bg text-rc-text relative">
```

Replace with:
```tsx
    <div className="bg-rc-text text-white relative">
```

- [ ] **Step 2: Update the Declaration section's background, id, and text colors**

Find:
```tsx
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text text-center mb-4">
            The Declaration
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-base text-rc-text/70 leading-relaxed font-light text-center mb-12">
            Before the series, two videos already tell the beginning of it.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {DECLARATIONS.map((d) => (
              <motion.a
                key={d.youtubeId}
                variants={fadeInLine}
                href={`https://www.youtube.com/watch?v=${d.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={d.thumbnail} alt={d.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-rc-serif font-bold text-rc-text leading-tight mt-4 mb-1">{d.title}</h3>
                <span className="inline-block text-sm text-rc-accent font-medium group-hover:underline">
                  Watch Now →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
```

Replace with (this step only changes colors/background/id — the play-button glyph and pill badge are Task 3's job, so the plain "Watch Now →" text link stays for now):

```tsx
      <section id="declaration" className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-white/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeInLine} className="text-2xl md:text-3xl font-rc-serif font-bold text-white text-center mb-4">
            The Declaration
          </motion.h2>
          <motion.p variants={fadeInLine} className="text-base text-white/70 leading-relaxed font-light text-center mb-12">
            Before the series, two videos already tell the beginning of it.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {DECLARATIONS.map((d) => (
              <motion.a
                key={d.youtubeId}
                variants={fadeInLine}
                href={`https://www.youtube.com/watch?v=${d.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={d.thumbnail} alt={d.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-rc-serif font-bold text-white leading-tight mt-4 mb-1">{d.title}</h3>
                <span className="inline-block text-sm text-white/60 hover:text-white font-medium group-hover:underline">
                  Watch Now →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
```

- [ ] **Step 3: Update the Episodes section's background and text colors**

Find:
```tsx
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
```

Replace with (colors only — the `opacity-70` dimming is Task 4's job):

```tsx
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-white/10">
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
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium mt-4 mb-1">Episode {ep.n}</p>
                <h2 className="text-xl font-rc-serif font-bold text-white leading-tight mb-2">{ep.title}</h2>
                <p className="text-sm text-white/70 leading-relaxed font-light">{ep.desc}</p>
                {ep.youtubeId && (
                  <span className="inline-block text-sm text-white/60 hover:text-white font-medium mt-3 group-hover:underline">
                    Watch Now →
                  </span>
                )}
              </>
            );
```

Leave the rest of the `EPISODES.map()` block (the `return ep.youtubeId ? (...) : (...)` part, and the closing of the `.map()`, `</motion.div>`, `</section>`) exactly as it is in the current file — nothing in that remainder needs to change for this task.

- [ ] **Step 4: Update the footer call**

Find:
```tsx
      <SiteFooter />
    </div>
  );
}
```

Replace with:
```tsx
      <SiteFooter precededByDarkSection />
    </div>
  );
}
```

- [ ] **Step 5: Document the rhythm exception**

Open `apps/web/DESIGN_LANGUAGE.md` and find the `## Page Hero (NEW)` section (added by the shared-page-hero plan). Immediately after that section's closing content (before the next `##` heading), append:

```markdown
## Page Rhythm Exceptions (NEW)

The site's default pattern alternates light and dark section backgrounds down a page (see the homepage's structure). `/my-story` is a deliberate, single exception: it stays dark end-to-end, the same way a streaming-service browsing page never interrupts itself with a light section mid-scroll. This is the same category of intentional exception as the homepage's single dark band — a considered choice for a specific page's purpose, not a lapse in the alternating rhythm. Don't treat `/my-story`'s all-dark background as a precedent for other pages; the alternating rhythm remains the default everywhere else.
```

- [ ] **Step 6: Verify type-check and render**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i my-story` — expected: no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/my-story` — expected: `200`.
Run: `curl -s http://localhost:4021/my-story | grep -o 'bg-rc-text' | wc -l` — expected: a number ≥ 3 (outer wrapper, hero base already using it via the overlay, Declaration section, Episodes section).

- [ ] **Step 7: Commit**

```bash
git add apps/web/app/my-story/page.tsx apps/web/DESIGN_LANGUAGE.md
git commit -m "feat(/my-story): convert whole page to dark theme, document the rhythm exception"
```

---

### Task 3: Declaration cards — play-button glyph and Watch Now pill

**Files:**
- Modify: `apps/web/app/my-story/page.tsx` (the `DECLARATIONS.map()` block inside the Declaration section only)

**Interfaces:**
- Consumes: the dark-themed Declaration section from Task 2 (this task assumes that section's background/text colors are already dark — do not re-touch them here).
- Produces: nothing consumed by later tasks.

**Context:** The 2 real, live declaration videos should read as immediately watchable — a play-button glyph at rest (not just on hover, since this is real content) plus a small "Watch Now" pill on the thumbnail itself, replacing the current plain text link below the thumbnail. The play-button is drawn with CSS only (a `div` with border tricks forming a triangle) — no new image asset.

- [ ] **Step 1: Replace the Declaration card markup**

Find (as left by Task 2):
```tsx
            {DECLARATIONS.map((d) => (
              <motion.a
                key={d.youtubeId}
                variants={fadeInLine}
                href={`https://www.youtube.com/watch?v=${d.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={d.thumbnail} alt={d.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-rc-serif font-bold text-white leading-tight mt-4 mb-1">{d.title}</h3>
                <span className="inline-block text-sm text-white/60 hover:text-white font-medium group-hover:underline">
                  Watch Now →
                </span>
              </motion.a>
            ))}
```

Replace with:
```tsx
            {DECLARATIONS.map((d) => (
              <motion.a
                key={d.youtubeId}
                variants={fadeInLine}
                href={`https://www.youtube.com/watch?v=${d.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img src={d.thumbnail} alt={d.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 text-white text-xs uppercase tracking-wide font-medium px-3 py-1 rounded-full bg-rc-text/80">
                    Watch Now
                  </span>
                </div>
                <h3 className="text-xl font-rc-serif font-bold text-white leading-tight mt-4 mb-1">{d.title}</h3>
              </motion.a>
            ))}
```

- [ ] **Step 2: Verify type-check and render**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i my-story` — expected: no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/my-story` — expected: `200`.
Run: `curl -s http://localhost:4021/my-story | grep -o 'border-l-white' | head -1` — expected: `border-l-white` (confirms the play-button glyph markup is present).
Run: `curl -s http://localhost:4021/my-story | grep -o 'Watch Now' | wc -l` — expected: `2` (one pill per declaration card, and no more, since the old text link below was removed).

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/my-story/page.tsx
git commit -m "feat(/my-story): add play-button glyph and Watch Now pill to declaration cards"
```

---

### Task 4: Episode cards — dimming treatment

**Files:**
- Modify: `apps/web/app/my-story/page.tsx` (the `card` JSX variable inside the `EPISODES.map()` block only)

**Interfaces:**
- Consumes: the dark-themed Episodes section from Task 2 (this task assumes that section's background/text colors are already dark).
- Produces: nothing consumed by later tasks. This is the last task in the plan.

**Context:** The 9 unproduced episodes already carry a "Coming Soon" text pill. This task adds a real visual dimming — `opacity-70` on the whole card — so the Declaration row (full color) and the Episodes row (dimmed) read as two different *states* at a glance, not just different text labels.

- [ ] **Step 1: Add opacity-70 to the episode card wrapper**

Find (inside the `EPISODES.map()` callback, as left by Task 2):
```tsx
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
```

Replace with:
```tsx
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
              <motion.div key={ep.n} variants={fadeInLine} className="opacity-70">
                {card}
              </motion.div>
            );
```

Note: all 9 current episodes have `youtubeId: null`, so all 9 take the `opacity-70` branch. The `ep.youtubeId` branch (no opacity change) exists for when an episode goes live in the future — leave that branch undimmed intentionally, so a newly-published episode automatically reads as "available" the same way the Declaration cards do, with no further code change needed.

- [ ] **Step 2: Verify type-check and render**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i my-story` — expected: no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/my-story` — expected: `200`.
Run: `curl -s http://localhost:4021/my-story | grep -o 'opacity-70' | wc -l` — expected: `9` (one per unproduced episode card).

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/my-story/page.tsx
git commit -m "feat(/my-story): dim unproduced episode cards to visually distinguish from live declarations"
```

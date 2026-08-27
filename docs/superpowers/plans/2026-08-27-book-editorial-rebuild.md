# /book Editorial Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `apps/web/app/book/page.tsx` into an editorial, book-like reading/browsing experience, and wire its waitlist form to a real backend (Resend Audiences).

**Architecture:** Presentational rebuild of an existing Next.js client page component (3D cover CSS treatment, a new excerpt section, a real table-of-contents treatment), plus one new server-side API route (`apps/web/app/api/book-waitlist/route.ts`) that the existing form calls via `fetch`.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, Framer Motion (existing `staggerContainer`/`fadeInLine` variants — reuse exactly), Resend SDK (`resend`, already an installed dependency, confirmed v6.18.0 in `node_modules`).

## Global Constraints

- Full design spec: `docs/superpowers/specs/2026-08-27-book-editorial-rebuild-design.md`
- Only these files may be touched: `apps/web/app/book/page.tsx` (modify), `apps/web/app/api/book-waitlist/route.ts` (create).
- Do not alter the 12 chapter titles in the `CHAPTERS` array, or their order.
- No image/illustration generation — the cover mockup is CSS-only (inline `transform`/`boxShadow`), applied to the already-existing `apps/web/public/images/book-cover.png`. No new visual assets.
- Stay inside existing `rc-*` color tokens and Fraunces serif (`font-rc-serif`) + sans body typography — no new colors, no new typeface.
- No em dashes anywhere in copy.
- Honest-CTA rule: the waitlist form's success state must only render after a real, successful API response — never unconditionally. No page numbers are fabricated in the chapter list (the book is unpublished, so there's no real pagination to show).
- No `git add -A` or `git add .` — stage explicit file paths only.
- `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` are NOT currently set in `apps/web/.env.local` — the API route must fail with a real, honest error response (HTTP 503, a clear message) when they're missing, not silently pretend to succeed. The founder will supply these values after this plan lands; until then, the route is expected to return that 503 in testing, which is correct behavior, not a bug.
- Confirmed Resend SDK shape (from `node_modules/resend/dist/index.d.mts`): `resend.contacts.create({ email, firstName, audienceId })` returns `Promise<CreateContactResponse>` with a `{ data, error }` shape. `audienceId` is technically deprecated in Resend's newer API (superseded by `segments`) but remains fully supported — use it, since it matches "Resend Audiences" as already decided, and does not require introducing the newer "segments" concept.

---

### Task 1: 3D cover mockup treatment

**Files:**
- Modify: `apps/web/app/book/page.tsx` (the cover `<motion.div>` inside the hero section only)

**Interfaces:**
- Consumes: `fadeInLine` (already defined in this file — do not redefine).
- Produces: nothing consumed by later tasks.

**Context:** The existing cover image (`apps/web/public/images/book-cover.png`) renders as a flat, front-facing card. This task applies a pure-CSS 3D perspective tilt and a directional drop shadow so it reads as a physical object rather than a flat image — no new artwork.

- [ ] **Step 1: Replace the cover markup**

Find this exact block:
```tsx
          <motion.div
            variants={fadeInLine}
            className="mx-auto w-48 md:w-56 rounded shadow-2xl overflow-hidden"
          >
            <img src="/images/book-cover.png" alt="Weje: The Spirit of Waste Lived Inside Me — book cover" className="w-full h-auto" />
          </motion.div>
```

Replace with:
```tsx
          <motion.div
            variants={fadeInLine}
            className="mx-auto w-48 md:w-56"
            style={{ perspective: '1000px' }}
          >
            <div
              className="rounded overflow-hidden"
              style={{
                transform: 'rotateY(-18deg) rotateX(4deg)',
                boxShadow: '24px 24px 48px rgba(0, 0, 0, 0.45)',
              }}
            >
              <img src="/images/book-cover.png" alt="Weje: The Spirit of Waste Lived Inside Me — book cover" className="w-full h-auto" />
            </div>
          </motion.div>
```

Note: the outer `motion.div` carries the `perspective` (the 3D viewing distance for its child), and the inner plain `div` carries the actual `rotateY`/`rotateX` tilt and the shadow — CSS 3D transforms require the perspective to be set on an ancestor, not the same element being rotated, or the rotation renders flat with no visible depth.

- [ ] **Step 2: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i "app/book"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/book` — expect `200`.
Run: `curl -s http://localhost:4021/book | grep -o "rotateY(-18deg)"` — expect a match.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/book/page.tsx
git commit -m "feat(/book): apply a 3D perspective mockup to the existing cover art"
```

---

### Task 2: "Look Inside" excerpt section

**Files:**
- Modify: `apps/web/app/book/page.tsx` (insert a new `<section>` between the hero and the waitlist section)

**Interfaces:**
- Consumes: `staggerContainer`, `fadeInLine` (already defined — do not redefine).
- Produces: nothing consumed by later tasks.

**Context:** A new section presenting a real, founder-authored Chapter One excerpt (final text, already approved word-for-word by the founder) as an honest "preview," using the site's existing Surface & Elevation card pattern (`bg-white border border-rc-border rounded-xl`, documented in `apps/web/DESIGN_LANGUAGE.md`) so the excerpt reads as a distinct, liftable "page" against the section's flatter background.

- [ ] **Step 1: Insert the new section**

Find this exact line (the closing of the hero `</section>`, immediately followed by the waitlist comment):
```tsx
      </section>

      {/* WAITLIST */}
```

Replace with (inserting the new section between them, keeping both existing lines):
```tsx
      </section>

      {/* LOOK INSIDE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.p variants={fadeInLine} className="text-xs uppercase tracking-wider text-rc-accent font-medium mb-6 text-center">
            Chapter One — Preview
          </motion.p>
          <motion.div
            variants={fadeInLine}
            className="bg-white border border-rc-border rounded-xl p-8 md:p-12 space-y-5"
          >
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              There is a spirit moving among young people right now. I know because it lived inside me for twenty years. This spirit was named Weje when it lived in me.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              It entered when I was removed from the covering of God that protected me from the attacks of the devil. My mother died in 1996. Her last words to me were that she was taking her death because of me. I carried that for years.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              Then came trafficking. Drug runs across multiple countries. Then finally, fraud, a scam that preyed on people&rsquo;s fear and made tens of thousands of dollars a week. None of it brought peace.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              But in May 2015, Jesus Christ cast Weje out of me, through the ministry of Prophet T.B. Joshua.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-rc-serif">
              This book is the story of how Weje got in, what it did while it was in me, and how I got free.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* WAITLIST */}
```

Note the excerpt text uses `&rsquo;` for the apostrophe in "people's" — matching the existing file's own convention elsewhere (e.g. `Thank you. You&rsquo;ll be the first to know.` already in this file) rather than a raw `'` character, for consistency with how this codebase already escapes apostrophes in JSX text content.

- [ ] **Step 2: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i "app/book"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/book` — expect `200`.
Run: `curl -s http://localhost:4021/book | grep -o "Chapter One"` — expect a match.
Run: `curl -s http://localhost:4021/book | grep -o "This spirit was named Weje"` — expect a match.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/book/page.tsx
git commit -m "feat(/book): add a Chapter One excerpt preview section"
```

---

### Task 3: Table-of-contents treatment for the chapter list

**Files:**
- Modify: `apps/web/app/book/page.tsx` (the `CHAPTERS.map()` block only)

**Interfaces:**
- Consumes: `staggerContainer`, `fadeInLine`, `CHAPTERS` (already defined — do not redefine or reorder the array).
- Produces: nothing consumed by later tasks.

**Context:** Replace the flat numbered list with a real table-of-contents typographic treatment — a distinct numeral style, and a dotted rule filling the space after each title (matching a real TOC's leader-dots convention). Since the book is unpublished, there's no real page number to put at the end of each dotted line — the line simply terminates at the row's edge, rather than fabricating a page number.

- [ ] **Step 1: Replace the chapter list markup**

Find this exact block:
```tsx
          <motion.div variants={staggerContainer} className="space-y-3">
            {CHAPTERS.map((title, i) => (
              <motion.div key={title} variants={fadeInLine} className="flex items-baseline gap-4 border-b border-rc-border pb-3">
                <span className="text-rc-accent font-rc-serif font-bold text-lg w-8 shrink-0">{i + 1}.</span>
                <span className="text-base md:text-lg text-rc-text/90 font-light">{title}</span>
              </motion.div>
            ))}
          </motion.div>
```

Replace with:
```tsx
          <motion.div variants={staggerContainer} className="space-y-1">
            {CHAPTERS.map((title, i) => (
              <motion.div key={title} variants={fadeInLine} className="flex items-baseline gap-3 py-2">
                <span className="text-rc-accent font-rc-serif font-bold text-base shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base md:text-lg text-rc-text font-rc-serif shrink-0">{title}</span>
                <span aria-hidden="true" className="flex-1 border-b border-dotted border-rc-border mb-1" />
              </motion.div>
            ))}
          </motion.div>
```

- [ ] **Step 2: Verify**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -i "app/book"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/book` — expect `200`.
Run: `curl -s http://localhost:4021/book | grep -o "border-dotted"` — expect a match.
Run: `curl -s http://localhost:4021/book | grep -o "There Is a Spirit Moving"` — expect a match (confirms chapter titles still render).

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/book/page.tsx
git commit -m "feat(/book): replace the flat chapter list with a real table-of-contents treatment"
```

---

### Task 4: Wire the waitlist form to a real backend (Resend Audiences)

**Files:**
- Create: `apps/web/app/api/book-waitlist/route.ts`
- Modify: `apps/web/app/book/page.tsx` (the `handleSubmit` function and the form JSX only)

**Interfaces:**
- Consumes: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` environment variables (not yet set — see Global Constraints).
- Produces: `POST /api/book-waitlist` — accepts `{ name: string, email: string }` JSON body, returns `{ success: true }` on success (HTTP 200) or `{ error: string }` on failure (HTTP 400 for missing fields, HTTP 503 if env vars are missing, HTTP 502 if the Resend API call itself fails).

**Context:** The current form only sets local React state (`setSubmitted(true)`) unconditionally — it never actually sends the data anywhere. This task makes the submission real: a new API route calls Resend's Contacts API to add the name/email to a Resend Audience, and the form only shows its "thank you" state after a genuine successful response.

- [ ] **Step 1: Create the API route**

Create `apps/web/app/api/book-waitlist/route.ts`:
```typescript
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { error: 'The waitlist is not accepting signups yet. Please check back soon.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email,
    firstName: name,
    audienceId,
  });

  if (error) {
    return NextResponse.json({ error: 'Could not join the waitlist right now. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Wire the form to call this route**

Find this exact block near the top of the `BookPage` component:
```tsx
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to a real waitlist endpoint before this ships live.
    setSubmitted(true);
  };
```

Replace with:
```tsx
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/book-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
```

- [ ] **Step 3: Show the real error state and a submitting state in the form**

Find this exact block (the form itself, in the waitlist section):
```tsx
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
```

Replace with:
```tsx
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
              {submitError && (
                <p className="text-sm text-red-600">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white rounded-lg font-medium tracking-wide shadow-md transition-all duration-300 ease-out hover:bg-rc-accent-light hover:shadow-xl hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? 'Joining…' : 'Join Waitlist'}
              </button>
            </motion.form>
          )}
```

- [ ] **Step 4: Verify the route rejects correctly without credentials, and the page still renders**

Run: `cd apps/web && npx tsc --noEmit --project tsconfig.json 2>&1 | grep -iE "app/book|api/book-waitlist"` — expect no output.
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4021/book` — expect `200`.
Run: `curl -s -X POST http://localhost:4021/api/book-waitlist -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com"}' -w "\n%{http_code}\n"` — expect `503` and a JSON body containing `"not accepting signups yet"` (this is correct, expected behavior right now, since `RESEND_API_KEY`/`RESEND_AUDIENCE_ID` are not yet set in this environment — it is NOT a bug).
Run: `curl -s -X POST http://localhost:4021/api/book-waitlist -H "Content-Type: application/json" -d '{"email":"test@example.com"}' -w "\n%{http_code}\n"` — expect `400` (missing `name`), confirming the validation branch works independently of the credentials branch.

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/api/book-waitlist/route.ts apps/web/app/book/page.tsx
git commit -m "feat(/book): wire the waitlist form to a real Resend Audiences backend"
```

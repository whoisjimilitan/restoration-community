# RESTORATION COMMUNITY — CLAUDE INSTRUCTIONS

## 🚀 ACTIVE LAUNCH PLAN (Aug 8, 2026)

**READ FIRST:** `/Users/jimilitan/Projects/restoration-community/LAUNCH_PLAN_AUG_8_2026.md`

This is the canonical, permanent, only source of truth for all platform decisions until and after August 8, 2026 launch.

All previous planning documents are archived. Do not reference them.

**The launch plan supersedes everything.**

---

## CONTEXT

This is Brother Jimi Skool — a restoration community for young people seeking freedom from fraud and deception through Jesus Christ.

- **Mission:** Get people saved (deliverance prayer, free) → Walk 7-stage restoration journey → Become testimony/witness
- **Model:** Prayer entry (free) → Restoration journey (free) → Testimonies (public) → Sponsors fund the work
- **Location:** SCOAN Accra, Ghana | Friday 3pm weekly
- **First cohort:** August 8, 2026 (15 people, Stage 1: Truth)

---

## IMMEDIATE WORK (Next 10 days)

**Deliverable:** Production-ready platform live by August 7. Launch with 15 people on August 8.

See LAUNCH_PLAN_AUG_8_2026.md for:
- Complete architecture (what to build)
- Day-by-day timeline (when to build it)
- Each role's view (what they see)
- Success metrics (what must be true by Aug 8)

---

## CORE VALUES (Never break these)

**Simplicity:** Build only what's needed. No feature creep.

**Atmosphere:** Everything feels like an extension of the homepage voice, not a "product."

**Gospel-first:** Platform serves the ministry. Ministry never serves the platform.

**Authenticity:** No corporate language. Real people, real transformation, real faith.

**Accessibility:** Works on phone, tablet, desktop. Reaches people where they are.

---

## HOW TO RESPOND

Always explain like you're talking to someone with no coding background.

For every task:
- **What I just did** — plain English
- **What you need to do** — step by step
- **Why** — one sentence
- **Next step** — one clear action

---

## TECH STACK

- **Language:** TypeScript
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database:** Prisma + PostgreSQL (Supabase/NeonDB)
- **Deployment:** Netlify
- **Hosting:** brotherjimi.com (production domain)

---

## GIT & COMMITS

When committing work:
```
git add [specific files]
git commit -m "feature/fix: Clear description of what changed

Why: One sentence explaining why this matters

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

Example:
```
git commit -m "feat: Add gathering info to participant dashboard

Why: People need to know where/when to show up for SCOAN Friday gatherings

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## DIRECTORY STRUCTURE

```
/apps/web (Next.js app)
├── /src/app (pages)
├── /src/components (UI)
├── /src/lib (helpers)
└── /public (images, static)

/prisma
├── schema.prisma (database schema)
└── migrations

LAUNCH_PLAN_AUG_8_2026.md (CANONICAL REFERENCE)
CLAUDE.md (this file)
```

---

## TESTING BEFORE "DONE"

Never say "done" if:
- ❌ Build is failing
- ❌ There are console errors
- ❌ Feature hasn't been tested in browser
- ❌ Existing features are broken

Always:
- ✅ Run `npm run build`
- ✅ Test in browser (happy path + edge cases)
- ✅ Test mobile
- ✅ Check console for errors

---

## SECRETS & SAFETY

- Never put API keys in code
- Never commit `.env.local` to GitHub
- Database secrets stay in Vercel/deployment environment
- Ask before deleting or renaming important files

---

## PERMANENT STATUS

This CLAUDE.md is the project guide until launch and beyond.

Reference LAUNCH_PLAN_AUG_8_2026.md for all tactical decisions.

**This is the north star. Everything else is supporting material.**

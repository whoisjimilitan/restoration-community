---
name: project-brotherjimi-five-open-items
description: "Status of 5 open items for Brother Jimi's ministry brand (YouTube, Facebook API, /journey, /login, logo) — repo is restoration-community, not pdf-trend-lab"
metadata: 
  node_type: memory
  type: project
  originSessionId: c8ee612c-26ac-4e38-8718-dad919534a23
---

Repo: `/Users/jimilitan/Documents/GitHub/restoration-community` (Next.js app in `apps/web`). Homepage and `/deliverances` are frozen/finalized — do not touch those pages.

**Why this matters:** this is a different repo from where these notes were captured (pdf-trend-lab); always `cd` into restoration-community before acting on any of these.

## 1. YouTube channel overhaul
- Channel: @brotherjimi, 504 subscribers — this is the real channel (not an old 2-sub channel under a different email; don't confuse them).
- OAuth already working: `apps/remotion/youtube/auth.py` + `apps/remotion/youtube/token.json` (verified valid, correct account/scopes).
- Still needed: swap orange/sunset banner for dark cinematic one (`~/Downloads/brotherjimi_youtube_banner_final.jpg`) or one of 3 logo options (see #5); rewrite channel description in site's actual voice; change bio link from pagea.uk/brotherjimi to brotherjimi.com; unlist old public video ("Jesus Christ Is Still Making Disciples Today," 25 views).

## 2. Facebook Graph API — DONE, not broken
- Permanent (expires_at: 0), fully-scoped Page access token working (pages_manage_posts, pages_read_engagement, etc.).
- Saved in `apps/remotion/facebook/token.json` (page_id, page_access_token, app_id, app_secret — gitignored).
- Root cause of earlier blocker: the "Manage everything on your Page" use case auto-bundled `pages_read_user_content`; worked around via Access Token Debugger + manual token exchange.
- Next step if revisited: do one actual test post to confirm end-to-end — nothing else needed.

## 3. /journey page
- Explicit decision: leave content exactly as-is, no changes.
- Footer link across all pages now reads "Sign In" (not "Journey"), pointing to /journey.
- Real auth code exists (`apps/web/src/lib/auth.ts`, NextAuth + Prisma) but is NOT wired up — no API route handler, no /auth/signin page. Deferred intentionally, not urgent.

## 4. /login page
- Cosmetic pass never started.
- This is an unrelated internal password gate for the "Teaching Engine" admin dashboard — NOT public-facing auth. Don't conflate with #3.

## 5. Logo
- 3 mockups in `~/Downloads/`: `brotherjimi-logo-option-a.png` (two-tier wordmark, no symbol), `-b.png` (wordmark + partridge-breaking-from-egg mark, ties to Jeremiah 17:11 — recommended), `-c.png` (plain "Brother Jimi," no tag).
- No final decision made yet. Needs a choice before it can be applied to YouTube banner/favicon.

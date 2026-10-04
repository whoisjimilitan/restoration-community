---
name: project-brotherjimi-backend-state
description: "brotherjimi.com (restoration-community) has zero Vercel env vars configured - no email, no database - so any backend-dependent feature is currently non-functional; Get Help now bypasses this via a direct WhatsApp link"
metadata: 
  node_type: memory
  type: project
  originSessionId: 87807f87-b1d1-46d9-bd0c-1587b927bb37
---

As of 2026-08-27, the Vercel project [[brotherjimi_deployment_topology|brotherjiminew]] has **zero environment variables configured** in any environment (checked via `vercel env ls`). This means:

- No `RESEND_API_KEY` → the `/book` waitlist form (`apps/web/app/api/book-waitlist/route.ts`) fails gracefully in production right now, showing "not accepting signups yet" to every real visitor.
- No `DATABASE_URL` → any Prisma-backed feature (there are migrations for a "prayer ministry foundation" and a "prayer call and program schema" from early August) is non-functional if ever wired up.
- Two orphaned, unwired components exist in `apps/web/src/components/`: `DeliveranceForm.tsx` (older, inline styles, posts to a nonexistent `/api/auth/register-deliverance`, redirects to an unlinked `/dashboard/stages`) and `DeliveringRequestModal.tsx` (newer, matches current design system).

**What was done about it:** `DeliveringRequestModal` was rebuilt to skip the backend entirely — it collects need/duration/name across 3 steps, then opens a pre-filled `wa.me` link straight to Brother Jimi's WhatsApp (+447471605871), wired into `/get-help` via a "Request Deliverance Prayer" button. No Resend/database config needed for this specific flow.

**How to apply:** Before building any other feature that assumes email or a database works on this site (waitlists, contact forms, account creation), check `vercel env ls --project brotherjiminew --scope jimi2` first — don't assume it's configured just because the code exists. If Resend gets configured later, the `/book` waitlist should start working immediately with no code changes.

# Gospel Distribution Engine

Daily Gospel Distribution Pipeline for Brother Jimi Ministry.

**Purpose:** Process Christian teaching quotes through /preach and /teach pipeline, produce approved letters, and distribute to website, Substack, and social media.

**Workflow:**
1. Raw quotes sourced from Boba emails
2. Process through /preach (5 phases)
3. Process through /teach (8 phases) → VERSION A + B + C
4. Send for approval to whoisjimi.today@gmail.com
5. Upon approval, distribute to platforms

**Folder Structure:**
- `scripts/` — Processing, approval handling, distribution scripts
- `content/approved-quotes/` — Finalized quotes ready to publish
- `evidence/` — Full proof of work for each quote

**Key Files:**
- `scripts/send-complete-approved-final.js` — Send approval emails with full evidence
- `scripts/get-approval-changes.js` — Extract approval feedback from Gmail
- `scripts/listen-for-approval.js` — Monitor for approval responses

**Status:** Quotes #1-2 approved and locked. Ready for production pipeline build.

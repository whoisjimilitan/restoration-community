# Gospel Distribution Engine — Complete Setup & Deployment

**Last Updated:** October 4, 2026

## Complete System Overview

This folder contains the complete Daily Gospel Distribution Engine for Brother Jimi Ministries.

### What's Included

1. **Scripts/** — All processing and distribution scripts
   - `/preach` runner (5-phase quote refinement)
   - `/teach` runner (8-phase reel production)
   - Gmail API integration (approvals, feedback)
   - Distribution automation

2. **Docs/Memory/** — Complete decision history and standards
   - All non-negotiable rules
   - Quality gates and frameworks
   - Voice, tone, and delivery standards
   - Revenue model and business strategy

3. **Docs/Skills/** — Reusable skill definitions
   - /preach skill (5 phases)
   - /teach skill (8 phases)
   - Brother Jimi voice patterns

4. **Content/Approved-Quotes/** — Locked, approved quotes ready to publish
   - Quote #1: You're Not Trapped (approved)
   - Quote #2: You're Not Weak (approved)
   - Quotes #3-18: Pending processing

5. **Evidence/** — Complete proof-of-work documentation
   - All /preach phase evidence
   - All /teach phase evidence
   - Approval emails and feedback

### Non-Negotiable Rules (DO NOT BREAK)

1. **Master Evidence Rule:** All work requires documented proof of every phase before posting
2. **Approval Gate Rule:** NOTHING goes to the world without explicit email approval to whoisjimi.today@gmail.com
3. **No Invention Rule:** Zero freedom to invent/infer. Refine only what's in raw quote
4. **Locked Version C Framework:**
   - Title challenges assumption (not names problem)
   - Body uses /preach AS IS (no additions)
   - Close is punchy, plain, natural speech
   - Opener (when needed): Start with PERSON, not action; echoes body's opening

### Processing Pipeline (ONE QUOTE AT A TIME)

```
Raw Quote from Boba email
     ↓
/preach (5 phases, all evidence documented)
     ↓
/teach (8 phases: PURPOSE → VOICE STUDY → DRAFT → EMERGENT HIDE → TRIM → SELF-CRITIQUE → HUMAN SPEECH AUDIT → SUBSTANCE MATCH)
     ↓
VERSION C (Title + Body + Close, no template markers)
     ↓
Send approval email to whoisjimi.today@gmail.com
     ↓
WAIT for explicit approval
     ↓
Upon approval: Move to content/approved-quotes/ and trigger distribution
```

### Environment Setup

Copy `.env` to working directory:
```bash
cp tools/gospel-distribution/.env ./
```

Required env vars:
- GMAIL_CLIENT_ID
- GMAIL_CLIENT_SECRET
- GMAIL_REFRESH_TOKEN
- GMAIL_APP_PASSWORD
- SENDER_EMAIL (whoisjimi.today@gmail.com)
- APPROVAL_EMAIL (whoisjimi.today@gmail.com)

### Running Scripts

All scripts assume working directory is `tools/gospel-distribution/scripts/`:

```bash
# Send approval email (includes full evidence)
node send-complete-approved-final.js

# Monitor for approval response
node listen-for-approval.js

# Extract approval feedback
node get-approval-changes.js
```

### Distribution Targets (Post-Approval)

Once quote is approved:
1. **Website:** brotherjimi.com (via Vercel/restoration-community)
2. **Substack:** Daily email (free tier, paid tier launches day 100)
3. **Social:** Twitter/X, Instagram, TikTok (VERSION B reel)

### Complete Status

- **Quotes 1-2:** ✓ APPROVED
- **Quotes 3-18:** Pending processing (one at a time)
- **Website Integration:** Ready (apps/web folder)
- **Substack Setup:** Configured
- **Notion Sync:** TODO
- **Nooxy Setup:** TODO
- **Revenue Infrastructure:** Ready (launch at day 100)

### Do Not Miss

- Each quote must be processed individually (no batching)
- Every stage requires documented evidence
- No final email without explicit approval reply
- Title/Body/Close must follow locked framework
- All rules in `/memory/` are permanent non-negotiables

---

**Everything you need is here. Nothing is left behind.**

# Gospel Distribution Engine — Project Rules

## Working Directory
```
~/restoration-community/tools/gospel-distribution/
```

## Current Status
- Quotes #1-2: Fully approved and locked
- System: Ready for production processing
- Date: October 4, 2026

## Non-Negotiable Rules

1. **QUOTE SET REQUIREMENT** — Every quote comes as a numbered SET (One, Two, Three, etc.) with multiple statements. REJECT any processing without the complete set. Do not process individual lines. Retrieve full set from Gmail archive email first, verify structure, then process.
2. **Process one quote at a time** — Never batch multiple quotes
3. **Full evidence required** — All /preach and /teach phases documented
4. **Email approval mandatory** — Send to whoisjimi.today@gmail.com before any publication
5. **VERSION C locked format** — Title (challenges assumption) + Body (/preach AS IS) + Close (punchy, natural)
6. **No construction marks** — Zero em dashes, no scaffolding, human speech only
7. **Verify all changes** — After any edit, run through all quality gates before sending

## Memory & Skills
All decision history and skill definitions are in `docs/`:
- `docs/memory/` — All non-negotiable rules, standards, frameworks
- `docs/skills/` — /preach and /teach skill definitions

## Scripts
All in `scripts/`:
- `send-complete-approved-final.js` — Send approval emails with full evidence
- `listen-for-approval.js` — Monitor for approval responses  
- `get-approval-changes.js` — Extract feedback from approval emails

## Approved Quotes
All in `content/approved-quotes/`:
- `QUOTE-001.md` — You're Not Trapped (APPROVED)
- `QUOTE-002.md` — You're Not Weak (APPROVED)
- `QUOTE-00X.md` — Pending (as processed)

## Environment
Copy `.env` to working directory before running scripts.

## Next Steps
1. Process Quote #3-18 (one at a time)
2. Get approval for each
3. Build full automation pipeline
4. Deploy to brotherjimi.com

---

**Do not work from pdf-trend-lab. Work from restoration-community.**

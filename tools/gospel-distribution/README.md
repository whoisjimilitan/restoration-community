# Gospel Distribution System

**Built:** October 4, 2026 | **Status:** Production Ready (MVP Phase)

Automates daily quote processing: Gmail → Notion → Website/Email/Social

---

## What This Does

1. **Receives** daily quote sets from Boba via email
2. **Fetches** approved quotes (Gmail API, filtered for "Final Approval" OR "Approved")
3. **Parses** VERSION A, VERSION B, VERSION C from email body
4. **Cleans** all content (removes markers, headers, metadata)
5. **Stores** in Notion database (single source of truth)
6. **Publishes** to website, email, social (automatic in future phases)

---

## Quick Start

### Setup (One-Time)
```bash
node scripts/setup-notion-database.js
```

### Daily Workflow
```bash
node scripts/grab-from-gmail-and-push.js
```

### Verify Quality
- Open Notion database
- Check STANDARDS.md quality gates
- If clean: publish | If dirty: run clean-notion.js

---

## Key Files

**Executable Scripts:**
- `scripts/grab-from-gmail-and-push.js` — Fetch approved emails, parse, push to Notion
- `scripts/push-to-notion.js` — Write to Notion (used by grab script)
- `scripts/clean-notion.js` — Remove all markers/metadata
- `scripts/setup-notion-database.js` — Test connection & validate structure
- `scripts/rename-days.js` — Fix day numbering (one-time)

**Configuration:**
- `.env` — Gmail credentials, Notion API key, emails (NEVER commit)
- `STANDARDS.md` — LOCKED standards, quality gates, field requirements
- `README.md` — This file

---

## Database (Notion)

**Database:** Brother Jimi Teach  
**ID:** `3efb5217e90e8067b776f1d90ac77dd6`

**Fields (ALL must be clean—see STANDARDS.md):**
- Name → `Day 1`, `Day 2`, `Day 3` (sequential)
- Title → Clean title only (no metadata, no prefixes)
- Raw Quote → Original quote (no "RAW QUOTE:" prefix)
- Version A → 40-sec HIDE reel (no headers)
- Version B → 40-sec HIDE reel (no headers)
- Version C → Posted letter (no "— THE POSTED LETTER" header)
- Quotable → One memorable line (single sentence)
- Scripture → Verse reference + full text (one verse)
- Status → Ready/Draft/Approved
- Date Created → Auto-timestamp

---

## Quality Gates (MANDATORY)

Before publishing, run through STANDARDS.md:
- ✓ No AI markers in any field
- ✓ No headers: "RAW QUOTE:", "VERSION A:", "(40-SEC HIDE REEL)", etc.
- ✓ No email metadata
- ✓ Title = clean (no prefixes)
- ✓ Quotable = one line only
- ✓ Scripture = one verse only
- ✓ All fields readable, properly formatted

---

## Architecture

```
Boba's Email (Gmail)
       ↓
grab-from-gmail-and-push.js
       ↓
Parse + Extract Versions
       ↓
clean-notion.js (remove metadata)
       ↓
push-to-notion.js (write to database)
       ↓
Notion Database
       ↓
Website/Email/Social (renders from Notion)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Entries have markers/headers | `node scripts/clean-notion.js` |
| Connection failing | `node scripts/setup-notion-database.js` |
| Wrong day numbers | `node scripts/rename-days.js` |
| Parsing issues | Check email: subject must contain "Final Approval" or "Approved" |

---

## Standards

**See STANDARDS.md for:**
- Locked field requirements
- Quality gates (cleanliness, completeness, authenticity)
- Pre-publish checklist
- All rules are non-negotiable

**Philosophy:** Build once. Works forever. Every decision gets locked. Never solve the same problem twice.

---

## Future Phases

- Phase 1: Website + manual publish (Oct 2026)
- Phase 2: Auto-publish (Week 2)
- Phase 3: Stripe payments (Week 3)
- Phase 4: Substack paid tier (Day 100)

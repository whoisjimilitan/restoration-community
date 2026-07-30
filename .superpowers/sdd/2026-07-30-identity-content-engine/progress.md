# SDD ledger — plan: /docs/superpowers/plans/2026-07-30-identity-content-engine.md

**Global Constraints:**
- All 9 outputs must center on the identified identity choice
- Prophetic tone maintained: "Here's who you're choosing to be"
- Never alter Brother Jimi's voice for virality/trends
- **CRITICAL: Preserve spirit and verbatim quotable lines from source material** — revelations must remain intact, not reinterpreted
- **Quotable preservation priority:** Extract memorable/quotable lines verbatim; prioritize direct quotes over paraphrasing in all 9 formats
- **CRITICAL: Preserve all scriptural proofs** — never water down or remove biblical verses; Scripture is load-bearing to the message
- Alphabetical sequencing for consistency
- Admin dashboard clean, one-page view
- Integration with existing `/journey` page

**Git Repository:** `/Users/jimilitan/Projects/restoration-community/apps/web`

**Tasks:**
- [x] Task 1: Extend Prisma Schema
- [x] Task 2: Implement Identity Extraction Logic
- [x] Task 3: Create Enhanced Voice Extraction System
- [ ] Task 4: Build 9-Format Content Generation Pipeline
- [ ] Task 5: Create WordPress Connector
- [ ] Task 6: Build Content Engine API Routes
- [ ] Task 7: Create Admin Dashboard UI
- [ ] Task 8: Create Admin API Route (Today's Content)
- [ ] Task 9: Integration Testing & Flow Validation
- [ ] Task 10: Documentation

---

## Task Progress

**RESTART: Previous Tasks 1-6 failed (subagent git context issue). Starting fresh with proper repo path.**

### Task 1: Extend Prisma Schema ✅
- [x] Added ContentPlan, ContentOutput, ProcessedSource models
- [x] Updated User model with relationships
- Commit: 40989eb
- Status: DONE — Prisma sync successful, build clean
- Base commit: 40989eb

### Task 2: Implement Identity Extraction Logic ✅
- [x] Created identity-framework.ts with 7 identity choices + keywords
- [x] Implemented extractIdentityChoice function with confidence scoring
- [x] Created comprehensive test suite (24 tests, all passing)
- Commit: 1c5e78f
- Status: DONE — All 24 tests passing + 7 identity choices implemented + confidence scoring working

### Task 3: Create Enhanced Voice Extraction System ✅
- [x] Created voice-extraction.ts with VoiceTheme extraction logic
- [x] Implemented extractVoiceTheme function with revelation/contrast/examples
- [x] Created comprehensive test suite (42 tests, all passing)
- Commits: c41752f + 8e3b06d
- Status: DONE — All 42 tests passing + build successful
- Voice themes ready for content generation pipeline

---

Waiting for: Task 4 (Content Generation), Task 5 (WordPress), Task 6 (API Routes)

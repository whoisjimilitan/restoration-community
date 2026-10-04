---
name: opportunity_feed_system_built
description: Saint & Story Opportunity Feed system - complete architecture and implementation
metadata: 
  node_type: memory
  type: project
  originSessionId: db5b13fc-9039-4da6-a297-1adbb4813b9f
---

# Opportunity Feed System - Built & Deployed

**Status:** Complete. Production ready for testing.

**Date Deployed:** 2026-07-04

---

## What Was Built

A complete, minimal Opportunity Feed system that responds to publicly-expressed business needs for courier/logistics services.

### Architecture

**Database** (`OpportunityFeed` model, `opportunity_feed` table)
- CSV input fields: companyName, website, contactName, contactEmail, sourcePlatform, sourceUrl, postedDate, originalWording, confidence
- Extracted fields: extractedNeed, extractedUrgency, extractedContext, extractedQuote
- Generated fields: briefHtml, emailSubject, emailBody
- Status tracking: imported → extracted → queued → sent → (opened/replied)
- Timestamps: sentAt, openedAt, clickedAt, repliedAt

**Libraries**
1. `lib/opportunity-extraction.ts` - Claude-powered extraction (Need, Urgency, Context, Quote)
2. `lib/opportunity-brief-generator.ts` - Generates one-page Courier Readiness Brief (HTML)
3. `lib/opportunity-email-generator.ts` - Generates 5-sentence email (locked structure)
4. `lib/opportunity-csv-parser.ts` - Parses and validates CSV input

**API Routes**
1. `POST /api/operator/opportunity-feed/import` - CSV upload handler
2. `POST /api/operator/opportunity-feed/extract` - Extract need/urgency/context/quote
3. `POST /api/operator/opportunity-feed/generate` - Generate brief + email
4. `GET /api/operator/opportunity-feed/queue` - Fetch opportunities ready to send
5. `POST /api/operator/opportunity-feed/send` - Send via Resend
6. `GET /api/operator/opportunity-feed/brief/[id]` - Serve brief HTML

**UI Pages**
1. `/app/operator/opportunity-feed/page.tsx` - CSV import workflow (import → extract → generate → queue)
2. `/app/operator/settings/page.tsx` - Transformed to Approval Queue (review & send)

---

## Design Principles Applied

✓ **Minimal & Clean** - Single purpose per component
✓ **Brand-consistent** - Color #0D0D0D, premium spacing, no icons/emoji
✓ **Apple-like** - Clear hierarchy, proper whitespace, easy to understand
✓ **No watering down** - Full psychology in 5-sentence email structure preserved
✓ **No invention** - Extraction only uses what they said
✓ **Human approval** - 5-second review before send

---

## Workflow

```
1. GPT-5 discovers businesses (Discover page in /operator/discover)
   ↓ (exports CSV with: Company, Website, Contact, Source, Original Wording, Confidence)
   
2. Operator uploads CSV
   ↓ (/operator/opportunity-feed/page.tsx)
   
3. System imports opportunities
   ↓
   
4. System extracts (Claude analyzes wording)
   ↓ (Need, Urgency, Context, Quote)
   
5. System generates
   ↓ (Brief HTML + 5-sentence email)
   
6. Opportunities appear in Approval Queue
   ↓ (/operator/settings/page.tsx - renamed from settings)
   
7. Operator reviews each in ~5 seconds
   ↓ (Original post → Extracted data → Brief → Email)
   
8. Operator clicks [SEND]
   ↓ (Email sent via Resend)
   
9. Resend webhooks track (open, click, reply)
   ↓ (Updates status in database)
   
10. Relationship Engine activates on engagement
    ↓ (Only after open/click/reply - does not touch before)
```

---

## Key Features

### Extraction Engine
- Takes originalWording
- Returns: need, urgency (High/Medium/Low), context, exact quote
- No invention, no assumptions
- Uses Claude API

### Brief Generator
- One-page Courier Readiness Brief (HTML)
- Shows their exact quote
- Shows operational approach (5 specific elements for courier services)
- Shows business impact
- No marketing, no sales language
- Premium styling with clean typography

### Email Generator
- 5-sentence structure (LOCKED - no deviation)
- Sentence 1: "A little birdie told me you're looking for [their need]"
- Sentence 2: "I went ahead and prepared a one-page Courier Readiness Brief"
- Sentence 3: "It outlines how we'd handle that type of work..."
- Sentence 4: "Here's the link. [URL]"
- Sentence 5: "If it's useful, great. If not, keep it anyway"
- Psychology embedded in structure (soft intro, inverse incentive, permission to say no)

### Approval Queue
- Shows all queued opportunities (status = "queued")
- Expandable rows showing: Original Post → Extracted Data (4 fields) → Email Preview
- [SEND] button per row (sends via Resend)
- Clean, minimal UI matching brand

---

## Constitution Reference

See: SAINT_AND_STORY_OPPORTUNITY_FEED_CONSTITUTION_V1.md for:
- Immutable rules (7 rules)
- Success metric (YES responses, not open rates)
- Workflow stages (Discover → Import → Extract → Generate → Approve → Send → Track → Relationship)
- Each stage specification (inputs, outputs, tools, rules)

---

## Next Steps for Testing

1. ✓ Build passes (done)
2. Start dev server: `npm run dev`
3. Navigate to `/operator/opportunity-feed`
4. Create test CSV with sample businesses and their public confessions
5. Upload CSV and process through workflow
6. Check `/operator/settings` Approval Queue
7. Click [SEND] and verify email sent via Resend test
8. Monitor Resend webhook events (opens, clicks, replies)
9. Verify Relationship Engine activates only on engagement

---

## Files Created/Modified

**New Files:**
- lib/opportunity-extraction.ts
- lib/opportunity-brief-generator.ts
- lib/opportunity-email-generator.ts
- lib/opportunity-csv-parser.ts
- app/api/operator/opportunity-feed/import/route.ts
- app/api/operator/opportunity-feed/extract/route.ts
- app/api/operator/opportunity-feed/generate/route.ts
- app/api/operator/opportunity-feed/queue/route.ts
- app/api/operator/opportunity-feed/send/route.ts
- app/api/operator/opportunity-feed/brief/[id]/route.ts
- app/operator/opportunity-feed/page.tsx

**Modified Files:**
- prisma/schema.prisma (added OpportunityFeed model)
- app/operator/settings/page.tsx (transformed to Approval Queue)

**Database:**
- npx prisma db push (created opportunity_feed table)

---

## Philosophy Preserved

✓ Respond to confessions, not cold outreach
✓ Intelligence from GPT-5 discovery, not invention
✓ Briefs prove listening, not marketing
✓ Emails use psychology (inverse incentive, permission-based, soft intro)
✓ No phased rollout - everything built once
✓ Minimal, clean, Apple-like UI
✓ Simple = powerful

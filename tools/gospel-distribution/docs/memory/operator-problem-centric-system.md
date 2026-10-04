---
name: operator-problem-centric-system
description: Problem-centric operator system that converts confessions to conversations
metadata: 
  node_type: memory
  type: project
  originSessionId: db5b13fc-9039-4da6-a297-1adbb4813b9f
---

# Operator Problem-Centric System

## What This Is

A complete operational system that converts cold confessions (people publicly expressing business problems online) into active conversations where they say "YES, I need your service."

The North Star: Not email opens, not replies. Actual conversations that move to YES.

## Core Philosophy

- **Problem-centric, not category-centric**: Routes by specific operational problems (court_deadline_delivery, hospital_supply_delivery), not business types (solicitor, hospital)
- **Psychology invisible**: Embedded in brief framing, not stated directly
- **Gap revelation, not product tasting**: Brief proves understanding + shows gap + shows outcome. Valuable even without hire
- **Value-first**: Prospect benefits from the brief whether they say YES or not
- **Human language**: No jargon, no marketing speak, sounds like James would say it

## System Architecture

### 1. Discovery (Confessions In)
Sources (free/low-cost):
- Reddit (r/business, r/startups, r/smallbusiness)
- Google Alerts (keywords: "need courier", "delivery problem")
- LinkedIn (posts about delivery/logistics)
- Twitter/X (real-time search)
- Facebook Groups (business owner communities)
- YouTube comments (competitor videos)
- Trustpilot/Google Reviews (complaints)
- Quora (business questions)
- News RSS (logistics issues)

**Input**: Confession text + source metadata
**Output**: OpportunityFeed record with raw data

### 2. Extraction (Confession → Problem Type)
- Filter for legitimacy (reject advertisers, keep genuine needs)
- Extract specific problem type from PROBLEMS_MAP using keyword matching
- Extract contact info (email, phone, LinkedIn, company, location)
- Calculate confidence score (0.4-0.95) based on:
  - Psychology analysis confidence
  - Contact info completeness
  - Keyword match strength

**Libraries**: 
- `lib/confession-scraper.ts` — Filters legitimacy, extracts contact info
- `lib/problems-map.ts` — Maps confessions to specific problem types

### 3. Psychology Analysis (Confession + Problem → Structured Psychology)
Claude analyzes WITHOUT generating brief copy yet:

```
inverse_incentive: "What breaks if they don't solve this?"
loss_aversion_frame: "What do they lose daily?"
authority_proof: "Where can we prove understanding?"
social_proof: "Why is this solvable?"
urgency_level: "How time-sensitive?"
```

This analysis informs the brief but is NOT the brief itself.

**Library**: `lib/psychology-analyzer.ts`

### 4. Routing (Problem Tier + Confidence → Action)
```
Tier 1 (CRITICAL) + Confidence ≥0.80 → AUTO_SEND
Tier 1 + Confidence 0.60-0.79 → APPROVAL_QUEUE (Jimi reviews)
Tier 2 (HIGH) + Confidence ≥0.70 → APPROVAL_QUEUE
Tier 2 + Confidence <0.70 → DISCARD
Tier 3 (OPERATIONAL) + Confidence ≥0.60 → BATCH (Friday)
All else → DISCARD
```

**Tier Definition** (from PROBLEMS_MAP):
- **Tier 1**: Court deadlines, hospital supply, pharmacy delivery, legal docs (time-critical, life/career affecting)
- **Tier 2**: Construction, restaurant, estate agent, architecture, film, accounting, veterinary, dental, art gallery, catering, manufacturing (high-value, regular revenue impact)
- **Tier 3**: Retail, beauty, office supply, etc. (operational, lower urgency)

### 5. Brief Generation (Psychology Analysis → Human-Language Brief)
Brief structure (psychology embedded invisibly):

```
[OPENING - Authority + Recognition]
"You said: [exact confession]. This proves we listened."

[GAP REVELATION - Inverse Incentives + Loss Aversion]
"Here's what happens when this breaks: [consequence]
Every day this gap exists, you're losing: [specific cost]"

[POSSIBILITY - What's Possible]
"When this becomes reliable: [specific outcome]"

[PROOF - Authority Through Specificity]
"We've seen this pattern. Here's what changes: [before/after]"

[CTA - Soft Ask]
"Curious what you think. Reply and let's talk."
```

Psychology is embedded through:
- Specific framing (not generic)
- Natural language (not marketing)
- Consequence show-not-tell
- Authority through proof

**Library**: `lib/brief-generator.ts`

### 6. Send (Brief → Email with Pre-Populated Reply)
Email template (same for everyone, infinitely personalized):

```
Subject: Re: [problem_type title]

Hi [Name],

A little birdie told me about [SPECIFIC_PROBLEM].

[BRIEF with psychology embedded]

Curious what you think.

James

---

Ready to reply? Use this:
"Let's talk about this."
(Edit if you want, but one sentence is perfect)
```

**Why this works**:
- "A little birdie told me" = conversational + credible (implies others have this)
- [SPECIFIC_PROBLEM] = personalized to them
- [BRIEF] = psychology carries weight
- Pre-populated reply = zero friction (they don't write, they edit)
- Signed "James" = human, not company

**Routes**:
- Primary: Email (to contactEmail)
- Day 3: WhatsApp (if phone available)
- Day 5: LinkedIn (if available)

### 7. Conversation (Reply → YES)
When they reply:
- Status: CONVERSION
- James takes over
- Goal: Move from "let's talk" to "YES, I need your service"

This is where James's relationship skill matters. The brief made YES feel inevitable. James just confirms it.

## Files & Implementation

### Schema
- **Prisma**: `prisma/schema.prisma` → OpportunityFeed model with new fields:
  - problemType, psychologyAnalysis, prePopulatedReply
  - routingTier, confidenceScore, approvalStatus, jamesStatus
  - briefHtml, emailSubject, emailBody

### Core Libraries
- **`lib/problems-map.ts`**: 16 problem types (court_deadline_delivery, hospital_supply_delivery, etc.) with tier, narrative, psychology keywords, pre-populated reply
- **`lib/psychology-analyzer.ts`**: Analyzes inverse incentives, loss aversion, authority, urgency. Outputs structured psychology brief + routing decision
- **`lib/brief-generator.ts`**: Takes psychology analysis, generates human-language brief with psychology embedded invisibly
- **`lib/confession-scraper.ts`**: Framework for multi-source scraping (Reddit, Twitter, LinkedIn, etc.) + legitimacy filter

### API Routes
- **`/api/operator/opportunity-feed/process`**: POST — Takes confession text, routes through extraction → psychology → brief → routing. Creates OpportunityFeed record
- **`/api/operator/opportunity-feed/queue`**: GET — Returns approval queue organized by problem type and tier (for Jimi)
- **`/api/operator/opportunity-feed/[id]`**: GET/PATCH — View opportunity detail, approve/reject, edit email
- **`/api/operator/opportunity-feed/send`**: POST — Send approved opportunities via Resend with pre-populated reply

### Dashboard Views (To Build)
- **Jimi's Queue** (`/operator/settings`): Approval queue by problem type + tier, with brief preview, approve/reject buttons
- **James's Conversations** (`/operator/today`): Active conversations by hot/warm/cold, with engagement metrics by problem type
- **Metrics**: Conversion by problem type, approval rate, send rate

## How It Works End-to-End

```
1. Confession arrives via source (Reddit, Twitter, etc.)
   Input: "We're struggling to get legal documents to court on time"

2. System processes (POST /api/operator/opportunity-feed/process)
   - Extracts problem type: "court_deadline_delivery"
   - Analyzes psychology: inverse_incentive, loss_aversion, etc.
   - Generates brief with psychology embedded
   - Calculates confidence: 0.82
   - Routes: Tier 1 + 0.82 = AUTO_SEND

3. Opportunity sits in database ready to send
   - Status: approved
   - jamesStatus: pending

4. Jimi or James clicks "Send"
   (POST /api/operator/opportunity-feed/send)
   - Sends email via Resend with HTML brief + pre-populated reply
   - Stores resendId for webhook tracking
   - Status: sent

5. Prospect opens email (webhook)
   - Status: opened
   - jamesStatus: warm

6. Prospect clicks reply (webhook)
   - Status: replied
   - jamesStatus: hot
   - James responds with next action

7. Conversation moves to YES
   - James handles relationship
   - Standing order created
   - jamesStatus: active
```

## Key Psychological Elements

All invisible, embedded in framing:

1. **Inverse Incentives**: Show what breaks if not solved (court case dismissed, patients wait, revenue lost)
2. **Loss Aversion**: Frame daily cost (hours managing, stress, reputation risk)
3. **Authority**: Prove understanding through specificity (know how deadlines create cascades)
4. **Social Proof**: "Little birdie told me" = others have this
5. **Urgency**: Time-bound confessions = acute need
6. **Reciprocity**: Brief is valuable on its own (they benefit whether they hire or not)

## Success Metrics

- **Approval Rate**: % of opportunities approved by Jimi (should be 80%+ for Tier 1)
- **Send Rate**: % of approved opportunities actually sent (should be 95%+)
- **Open Rate**: % of sent emails opened (baseline: 35-40% for cold)
- **Reply Rate**: % of opens that get a reply (baseline: 5-10% for cold)
- **Conversation Rate**: % of replies that move to active conversation (target: 50%+)
- **YES Rate**: % of conversations that say YES (target: 30-50%)

## Next Steps (If Extended)

1. Build Jimi's approval dashboard (show queue by problem type)
2. Build James's conversation dashboard (show hot/warm/cold by problem)
3. Add WhatsApp/LinkedIn followup sequences
4. Add learning loop: track what problem types convert best
5. Add A/B testing: different psychology framings per problem type
6. Add manual confession input (for when someone calls/emails a lead)
7. Add CRM integration: log conversations, track outcomes

## Immutable Rules

1. **Always use PROBLEMS_MAP**: All problem types defined here, no ad-hoc categories
2. **Psychology always before brief**: Analyze before writing
3. **Psychology always invisible**: Embedded in framing, never stated
4. **Pre-populated reply always one sentence**: No friction, natural, editable
5. **Brief always valuable on own**: Stands alone even without hire
6. **Human language only**: No jargon, no marketing speak
7. **Routing always by tier + confidence**: Never by gut feel
8. **James always signs emails**: "James" not "Saint & Story" — human connection
9. **Track everything**: Every confession → routing decision → send → reply flows through database

---

**This system is live as of July 6, 2026.**
**All code is tested and ready for deployment.**
**See /CLAUDE.md for running instructions.**

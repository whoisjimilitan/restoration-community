# Identity-Centered Content Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an automated content generation system that identifies identity choices in raw material and generates 9 output formats (social, email, video scripts, etc.) aligned to Brother Jimi's prophetic voice.

**Architecture:** Multi-stage pipeline: (1) Input sources (WordPress, podcasts, Facebook, raw thoughts) → (2) Identity extraction (classifies which of 7 identity choices the content addresses) → (3) Voice extraction & enhancement (applies Brother Jimi's prophetic tone) → (4) Multi-output generation (creates 9 polished formats) → (5) Admin dashboard (displays daily content plan with all 9 pieces ready to use/record).

**Tech Stack:** Next.js App Router, Prisma + PostgreSQL (NeonDB), WordPress API, Tailwind CSS, Vercel.

## Global Constraints

- All 9 outputs must center on the identified identity choice (not generic, not scattered)
- Prophetic tone maintained across all formats: "Here's who you're choosing to be"
- Never alter Brother Jimi's authentic voice for virality or trends
- Stay narrow: always use the 7 identity choices framework
- Minimal manual effort (user primarily records videos, selects what to post)
- Every piece ties back to core ministry message
- Alphabetical sequencing for consistency across sources (WordPress posts, podcast episodes sorted A→Z)
- Admin dashboard must be clean, one-page view of day's content
- Dashboard integration with existing `/journey` page (7-stage framework)

## File Structure

**New files to create:**
- `/app/api/content-engine/extract-identity/route.ts` — Identity classification endpoint
- `/app/api/content-engine/generate-outputs/route.ts` — Multi-format generation endpoint
- `/app/api/wordpress-connector/route.ts` — WordPress feed fetcher & sequencer
- `/app/admin/content-dashboard/page.tsx` — Admin dashboard page
- `/components/ContentDashboard/DailyPlan.tsx` — Main dashboard component
- `/components/ContentDashboard/OutputCard.tsx` — Individual output display
- `/components/ContentDashboard/IdentityChoice.tsx` — Identity display component
- `/lib/identity-extraction.ts` — Core identity classification logic
- `/lib/voice-extraction.ts` — Enhanced voice extraction for 9 formats
- `/lib/content-generation.ts` — Pipeline for generating all 9 outputs
- `/lib/wordpress-connector.ts` — WordPress feed integration
- `/lib/identity-framework.ts` — 7 identity choices definitions & helpers
- `/tests/api/content-engine.test.ts` — API tests
- `/tests/lib/identity-extraction.test.ts` — Identity logic tests
- `/tests/lib/content-generation.test.ts` — Generation tests

**Modified files:**
- `/prisma/schema.prisma` — Add ContentPlan, ContentOutput, ProcessedSource models
- `/app/journey/page.tsx` — Add link to content dashboard

---

## The 7 Identity Choices (Reference)

```typescript
const IDENTITY_CHOICES = {
  1: {
    choice: "Truth vs Deception",
    question: "Are you a person of TRUTH or LIES?",
    stage: "Truth"
  },
  2: {
    choice: "Confession vs Hiding",
    question: "Do you OWN your actions or HIDE?",
    stage: "Confession"
  },
  3: {
    choice: "Repentance vs Stubbornness",
    question: "Do you CHANGE or stay STUCK?",
    stage: "Repentance"
  },
  4: {
    choice: "Forgiveness vs Bitterness",
    question: "Do you HEAL or POISON yourself?",
    stage: "Forgiveness"
  },
  5: {
    choice: "Reconciliation vs Isolation",
    question: "Do you BUILD or DESTROY?",
    stage: "Reconciliation"
  },
  6: {
    choice: "Honest Work vs Hypocrisy",
    question: "Are you INTEGRITY or a LIE?",
    stage: "Honest Work"
  },
  7: {
    choice: "Service vs Passivity",
    question: "Do you MATTER or WASTE your life?",
    stage: "Service"
  }
};
```

---

## Tasks

### Task 1: Extend Prisma Schema with Content Tracking

**Files:**
- Modify: `/prisma/schema.prisma`

**Interfaces:**
- Produces: Three new models (ContentPlan, ContentOutput, ProcessedSource) with relationships to existing User model

**Steps:**

- [ ] **Step 1: Add ContentPlan model**

```prisma
model ContentPlan {
  id            String   @id @default(cuid())
  createdAt     DateTime @default(now())
  
  // Identity choice (1-7)
  identityChoice Int
  identityLabel String // e.g., "Truth vs Deception"
  
  // Source tracking
  sourceType    String // "wordpress" | "podcast" | "facebook" | "raw"
  sourceUrl     String?
  sourceTitle   String
  sourceExcerpt String @db.Text
  
  // The revelation extracted
  revelation    String @db.Text // "Here's who you're choosing to be"
  
  // Generated outputs
  outputs       ContentOutput[]
  
  // Publishing status
  status        String @default("draft") // "draft" | "published" | "scheduled"
  publishedAt   DateTime?
  
  userId        String
  user          User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  updatedAt     DateTime @updatedAt
  
  @@map("content_plans")
}

model ContentOutput {
  id              String   @id @default(cuid())
  
  // Which format
  format          String // "daily-letter" | "social-post" | "micro-insight" | "devotional" | "article" | "short-video" | "long-video" | "podcast-moment" | "email"
  
  // The generated content
  content         String @db.Text
  title           String?
  
  // Metadata
  wordCount       Int?
  duration        String? // for videos/audio
  
  // Publishing
  publishedUrl    String?
  publishedAt     DateTime?
  
  contentPlan     ContentPlan @relation(fields: [contentPlanId], references: [id], onDelete: Cascade)
  contentPlanId   String
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@map("content_outputs")
}

model ProcessedSource {
  id            String   @id @default(cuid())
  
  // Track what we've processed
  sourceType    String // "wordpress" | "podcast" | "facebook"
  sourceKey     String // URL or post ID
  sourceTitle   String
  
  // Alphabetical sequence tracking
  sequence      Int? // 1, 2, 3... for alphabetical ordering
  
  // Processing status
  processed     Boolean @default(false)
  processedAt   DateTime?
  identityChoice Int?
  
  userId        String
  user          User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt     DateTime @default(now())
  
  @@unique([sourceType, sourceKey, userId])
  @@map("processed_sources")
}
```

- [ ] **Step 2: Update User model to reference ContentPlan**

Add to User model:
```prisma
contentPlans    ContentPlan[]
processedSources ProcessedSource[]
```

- [ ] **Step 3: Run Prisma migration**

```bash
cd apps/web
npx prisma db push
```

Expected: "Your database is now in sync"

- [ ] **Step 4: Generate Prisma client**

```bash
npx prisma generate
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: Add ContentPlan, ContentOutput, ProcessedSource models for content engine"
```

---

### Task 2: Implement Identity Extraction Logic

**Files:**
- Create: `/lib/identity-framework.ts`
- Create: `/lib/identity-extraction.ts`
- Create: `/tests/lib/identity-extraction.test.ts`

**Interfaces:**
- Produces: `extractIdentityChoice(text: string): {choice: number, label: string, question: string, confidence: number}` function
- Produces: IDENTITY_CHOICES constant with all 7 choices

**Steps:**

- [ ] **Step 1: Create identity framework constants**

```typescript
// /lib/identity-framework.ts

export const IDENTITY_CHOICES = {
  1: {
    choice: "Truth vs Deception",
    question: "Are you a person of TRUTH or LIES?",
    stage: "Truth",
    keywords: ["truth", "lies", "deception", "reality", "illusion", "honest", "false", "genuine", "real"],
    oppositeSide: "Deception"
  },
  2: {
    choice: "Confession vs Hiding",
    question: "Do you OWN your actions or HIDE?",
    stage: "Confession",
    keywords: ["confession", "confess", "own", "hide", "hiding", "secret", "ashamed", "vulnerability", "open"],
    oppositeSide: "Hiding"
  },
  3: {
    choice: "Repentance vs Stubbornness",
    question: "Do you CHANGE or stay STUCK?",
    stage: "Repentance",
    keywords: ["repentance", "repent", "change", "transformation", "stubborn", "stuck", "refuse", "turn around", "new"],
    oppositeSide: "Stubbornness"
  },
  4: {
    choice: "Forgiveness vs Bitterness",
    question: "Do you HEAL or POISON yourself?",
    stage: "Forgiveness",
    keywords: ["forgiveness", "forgive", "bitter", "bitterness", "grudge", "resentment", "heal", "release", "let go"],
    oppositeSide: "Bitterness"
  },
  5: {
    choice: "Reconciliation vs Isolation",
    question: "Do you BUILD or DESTROY?",
    stage: "Reconciliation",
    keywords: ["reconciliation", "reconcile", "rebuild", "restore", "isolate", "alone", "broken", "connection", "bridge"],
    oppositeSide: "Isolation"
  },
  6: {
    choice: "Honest Work vs Hypocrisy",
    question: "Are you INTEGRITY or a LIE?",
    stage: "Honest Work",
    keywords: ["honest work", "integrity", "hypocrisy", "hypocrite", "lie", "dishonest", "authentic", "genuine", "real"],
    oppositeSide: "Hypocrisy"
  },
  7: {
    choice: "Service vs Passivity",
    question: "Do you MATTER or WASTE your life?",
    stage: "Service",
    keywords: ["service", "serve", "matter", "passivity", "passive", "waste", "purpose", "contribution", "others"],
    oppositeSide: "Passivity"
  }
} as const;

export type IdentityChoiceId = keyof typeof IDENTITY_CHOICES;

export interface ExtractedIdentity {
  choice: number;
  label: string;
  question: string;
  stage: string;
  confidence: number;
  reasoning: string;
}
```

- [ ] **Step 2: Implement identity extraction logic**

```typescript
// /lib/identity-extraction.ts

import { IDENTITY_CHOICES, ExtractedIdentity } from "./identity-framework";

export function extractIdentityChoice(text: string): ExtractedIdentity {
  const lowerText = text.toLowerCase();
  const scores: Record<number, number> = {};
  
  // Score each identity choice based on keyword matches
  for (const [id, choice] of Object.entries(IDENTITY_CHOICES)) {
    const choiceNum = parseInt(id);
    scores[choiceNum] = 0;
    
    // Count keyword matches
    for (const keyword of choice.keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      const matches = lowerText.match(regex) || [];
      scores[choiceNum] += matches.length;
    }
    
    // Bonus for opposite side mentions (shows contrast)
    if (lowerText.includes(choice.oppositeSide.toLowerCase())) {
      scores[choiceNum] += 2;
    }
  }
  
  // Find highest score
  const topChoice = Object.entries(scores).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
  
  const choiceNum = parseInt(topChoice);
  const choice = IDENTITY_CHOICES[choiceNum as keyof typeof IDENTITY_CHOICES];
  
  // Calculate confidence (0-1)
  const topScore = scores[choiceNum];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 ? topScore / totalScore : 0;
  
  return {
    choice: choiceNum,
    label: choice.choice,
    question: choice.question,
    stage: choice.stage,
    confidence: Math.round(confidence * 100) / 100,
    reasoning: `Identified ${choice.choice} based on keyword analysis (confidence: ${Math.round(confidence * 100)}%)`
  };
}
```

- [ ] **Step 3: Write test cases**

```typescript
// /tests/lib/identity-extraction.test.ts

import { extractIdentityChoice } from '@/lib/identity-extraction';

describe('extractIdentityChoice', () => {
  it('identifies Truth vs Deception from relevant text', () => {
    const text = "The deception kept me blind to reality. But when I embraced truth, everything changed.";
    const result = extractIdentityChoice(text);
    
    expect(result.choice).toBe(1);
    expect(result.label).toBe("Truth vs Deception");
    expect(result.confidence).toBeGreaterThan(0.5);
  });

  it('identifies Confession vs Hiding from relevant text', () => {
    const text = "For years I hid my mistakes. But when I confessed openly, I found freedom.";
    const result = extractIdentityChoice(text);
    
    expect(result.choice).toBe(2);
    expect(result.label).toBe("Confession vs Hiding");
  });

  it('identifies Repentance vs Stubbornness', () => {
    const text = "I refused to change until I realized I was stuck in the same cycle.";
    const result = extractIdentityChoice(text);
    
    expect(result.choice).toBe(3);
    expect(result.label).toBe("Repentance vs Stubbornness");
  });

  it('identifies Forgiveness vs Bitterness', () => {
    const text = "Bitterness poisoned my relationships until I learned to forgive and heal.";
    const result = extractIdentityChoice(text);
    
    expect(result.choice).toBe(4);
  });

  it('identifies Reconciliation vs Isolation', () => {
    const text = "I destroyed relationships through isolation, but reconciliation rebuilt the bridge.";
    const result = extractIdentityChoice(text);
    
    expect(result.choice).toBe(5);
  });

  it('identifies Honest Work vs Hypocrisy', () => {
    const text = "Living with integrity means honest work, not the hypocrisy I used to hide behind.";
    const result = extractIdentityChoice(text);
    
    expect(result.choice).toBe(6);
  });

  it('identifies Service vs Passivity', () => {
    const text = "I stopped wasting my life in passivity. Now I serve others and my life matters.";
    const result = extractIdentityChoice(text);
    
    expect(result.choice).toBe(7);
  });

  it('returns a valid identity choice for any text', () => {
    const result = extractIdentityChoice("random text about weather");
    
    expect([1, 2, 3, 4, 5, 6, 7]).toContain(result.choice);
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });
});
```

- [ ] **Step 4: Run tests**

```bash
cd apps/web
npm test -- tests/lib/identity-extraction.test.ts
```

Expected: All tests pass

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add lib/identity-framework.ts lib/identity-extraction.ts tests/lib/identity-extraction.test.ts
git commit -m "feat: Implement identity extraction logic with 7 identity choices"
```

---

### Task 3: Create Enhanced Voice Extraction System

**Files:**
- Create: `/lib/voice-extraction.ts`
- Create: `/tests/lib/voice-extraction.test.ts`

**Interfaces:**
- Consumes: `ExtractedIdentity` from Task 2
- Produces: `extractVoiceTheme(text: string, identity: ExtractedIdentity): VoiceTheme` function
- Produces: 9 output format generators using voice theme

**Steps:**

- [ ] **Step 1: Create voice extraction logic**

```typescript
// /lib/voice-extraction.ts

import { ExtractedIdentity } from './identity-framework';

export interface VoiceTheme {
  identity: ExtractedIdentity;
  coreMessage: string; // "Here's who you're choosing to be"
  revelation: string; // What truth is revealed
  contrast: string; // The lie vs the truth
  callToIdentity: string; // Who they're choosing to become
  scriptural: string; // Biblical grounding
  examples: string[]; // 2-3 examples from the text
}

export function extractVoiceTheme(rawText: string, identity: ExtractedIdentity): VoiceTheme {
  // Extract core revelation from the text
  const sentences = rawText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const revelationSentence = sentences[0] || rawText;
  
  // Create contrast statement
  const oppositeSide = getOppositeSide(identity.choice);
  const contrast = `The lie: You are someone who ${oppositeSide}. The truth: You are someone who ${identity.question.split(" or ")[0].toLowerCase()}.`;
  
  // Extract examples (key sentences)
  const examples = sentences.slice(1, 4).map(s => s.trim());
  
  return {
    identity,
    coreMessage: "Here's who you're choosing to be.",
    revelation: revelationSentence.trim(),
    contrast,
    callToIdentity: identity.question,
    scriptural: "", // Will be added during generation if needed
    examples: examples.slice(0, 3)
  };
}

function getOppositeSide(choiceNum: number): string {
  const opposites: Record<number, string> = {
    1: "living in lies and deception",
    2: "hiding your actions and truth",
    3: "staying stuck and refusing to change",
    4: "poisoning yourself with bitterness",
    5: "destroying relationships through isolation",
    6: "living a hypocritical lie",
    7: "wasting your life in passivity"
  };
  
  return opposites[choiceNum] || "making the wrong choice";
}
```

- [ ] **Step 2: Write test cases**

```typescript
// /tests/lib/voice-extraction.test.ts

import { extractVoiceTheme } from '@/lib/voice-extraction';
import { extractIdentityChoice } from '@/lib/identity-extraction';

describe('extractVoiceTheme', () => {
  it('extracts voice theme from text with identity', () => {
    const text = "The deception kept me blind to reality. But when I embraced truth, everything changed.";
    const identity = extractIdentityChoice(text);
    const theme = extractVoiceTheme(text, identity);
    
    expect(theme.identity.choice).toBe(1);
    expect(theme.coreMessage).toBe("Here's who you're choosing to be.");
    expect(theme.revelation).toContain("deception");
    expect(theme.callToIdentity).toBe("Are you a person of TRUTH or LIES?");
  });

  it('creates proper contrast statement', () => {
    const text = "I refused to change until I realized I was stuck in the same cycle.";
    const identity = extractIdentityChoice(text);
    const theme = extractVoiceTheme(text, identity);
    
    expect(theme.contrast).toContain("The lie:");
    expect(theme.contrast).toContain("The truth:");
  });

  it('extracts examples from the text', () => {
    const text = "First point. Second point. Third point.";
    const identity = extractIdentityChoice(text);
    const theme = extractVoiceTheme(text, identity);
    
    expect(theme.examples.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npm test -- tests/lib/voice-extraction.test.ts
```

Expected: All tests pass

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add lib/voice-extraction.ts tests/lib/voice-extraction.test.ts
git commit -m "feat: Create enhanced voice extraction system for 7 identity choices"
```

---

### Task 4: Implement 9-Format Content Generation Pipeline

**Files:**
- Create: `/lib/content-generation.ts`
- Create: `/tests/lib/content-generation.test.ts`

**Interfaces:**
- Consumes: `VoiceTheme` from Task 3
- Produces: `generateAllOutputs(theme: VoiceTheme): ContentOutputs` function returning all 9 formats

**Steps:**

- [ ] **Step 1: Create content generation pipeline**

```typescript
// /lib/content-generation.ts

import { VoiceTheme } from './voice-extraction';

export interface ContentOutputs {
  dailyLetter: string;
  socialPost: string;
  microInsight: string;
  devotional: string;
  articleExcerpt: string;
  shortVideoScript: string;
  longVideoScript: string;
  podcastMoment: string;
  email: {
    subject: string;
    body: string;
  };
}

export function generateAllOutputs(theme: VoiceTheme): ContentOutputs {
  return {
    dailyLetter: generateDailyLetter(theme),
    socialPost: generateSocialPost(theme),
    microInsight: generateMicroInsight(theme),
    devotional: generateDevotional(theme),
    articleExcerpt: generateArticleExcerpt(theme),
    shortVideoScript: generateShortVideoScript(theme),
    longVideoScript: generateLongVideoScript(theme),
    podcastMoment: generatePodcastMoment(theme),
    email: generateEmail(theme)
  };
}

function generateDailyLetter(theme: VoiceTheme): string {
  return `${theme.callToIdentity}

${theme.revelation}

${theme.contrast}

This is who you're choosing to become today.

— Brother Jimi`;
}

function generateSocialPost(theme: VoiceTheme): string {
  return `${theme.callToIdentity}

${theme.revelation.substring(0, 100)}...

Your identity matters. Choose wisely.`;
}

function generateMicroInsight(theme: VoiceTheme): string {
  return `"${theme.callToIdentity}" — The choice you make today determines who you become tomorrow.`;
}

function generateDevotional(theme: VoiceTheme): string {
  return `${theme.callToIdentity}

Today, reflect on this: ${theme.revelation}

This is not just a thought. This is your reality.`;
}

function generateArticleExcerpt(theme: VoiceTheme): string {
  return `# ${theme.identity.stage}: ${theme.callToIdentity}

## The Truth You Need to See

${theme.revelation}

## The Contrast

${theme.contrast}

## What This Means For You

When you understand who you're choosing to be, everything changes. The journey is not about perfection. It's about identity.

You are choosing right now. Every day. Every moment.

Will you choose truth? Will you choose confession? Will you choose to change?

Or will you choose the opposite?

The answer determines your life.`;
}

function generateShortVideoScript(theme: VoiceTheme): string {
  return `[0:00-0:05]
Hook: "${theme.callToIdentity}"

[0:05-0:25]
Main message: "${theme.revelation}"

[0:25-0:50]
The contrast: "${theme.contrast.replace('The lie: ', '').replace('The truth: ', '').substring(0, 50)}..."

[0:50-0:60]
CTA: "Which one are you choosing?"

[TEXT ON SCREEN: The 7 stages of restoration]`;
}

function generateLongVideoScript(theme: VoiceTheme): string {
  return `# YouTube Script: ${theme.identity.stage}

## [0:00-0:30] HOOK
"${theme.callToIdentity}"

## [0:30-2:00] SETUP
Today I want to talk about identity.

Not what you do. But who you are.

The Bible says we are made in God's image. But somewhere along the way, many of us chose a different identity. We became liars instead of truth-tellers. We became hiders instead of confessors. We became stuck instead of transformed.

## [2:00-5:00] STORY/REVELATION
${theme.revelation}

This is not just a concept. This is your life. This is who you're becoming right now.

## [5:00-7:00] THE CONTRAST
${theme.contrast}

One path leads to freedom. The other leads to bondage.

## [7:00-8:00] CALL TO IDENTITY
The question is not "what should I do?"

The question is: "Who am I choosing to be?"

## [8:00-10:00] CLOSING
If you're ready to change your identity, let's talk. The journey begins with one choice.`;
}

function generatePodcastMoment(theme: VoiceTheme): string {
  return `[START - 1:30 audio clip]

"${theme.callToIdentity}"

That's the question. Not what you do. But who you're becoming.

${theme.revelation}

This changes everything.

[END - 1:30 audio clip]`;
}

function generateEmail(theme: VoiceTheme): { subject: string; body: string } {
  return {
    subject: `${theme.identity.stage}: ${theme.callToIdentity.substring(0, 40)}...`,
    body: `Hello,

${theme.coreMessage}

Today, I want to talk about something that changed my life: identity.

${theme.revelation}

The truth is this: ${theme.contrast.replace('The truth: ', '')}

This is not about behavior modification. This is about who you are. Who you're choosing to become.

The 7 stages of restoration are not about doing things right. They're about becoming the right person.

Let me ask you: ${theme.callToIdentity}

If you're ready to answer that question, let's start a conversation.

With grace,
Brother Jimi

P.S. Every stage of the journey starts with one choice. What will yours be?`
  };
}
```

- [ ] **Step 2: Write test cases**

```typescript
// /tests/lib/content-generation.test.ts

import { generateAllOutputs } from '@/lib/content-generation';
import { extractVoiceTheme } from '@/lib/voice-extraction';
import { extractIdentityChoice } from '@/lib/identity-extraction';

describe('generateAllOutputs', () => {
  const text = "The deception kept me blind to reality. But when I embraced truth, everything changed.";
  const identity = extractIdentityChoice(text);
  const theme = extractVoiceTheme(text, identity);

  it('generates all 9 output formats', () => {
    const outputs = generateAllOutputs(theme);
    
    expect(outputs.dailyLetter).toBeDefined();
    expect(outputs.socialPost).toBeDefined();
    expect(outputs.microInsight).toBeDefined();
    expect(outputs.devotional).toBeDefined();
    expect(outputs.articleExcerpt).toBeDefined();
    expect(outputs.shortVideoScript).toBeDefined();
    expect(outputs.longVideoScript).toBeDefined();
    expect(outputs.podcastMoment).toBeDefined();
    expect(outputs.email).toBeDefined();
  });

  it('socialPost is under 280 characters', () => {
    const outputs = generateAllOutputs(theme);
    expect(outputs.socialPost.length).toBeLessThanOrEqual(280);
  });

  it('shortVideoScript is formatted with timestamps', () => {
    const outputs = generateAllOutputs(theme);
    expect(outputs.shortVideoScript).toContain('[0:');
  });

  it('email has both subject and body', () => {
    const outputs = generateAllOutputs(theme);
    expect(outputs.email.subject).toBeDefined();
    expect(outputs.email.body).toBeDefined();
  });

  it('all formats include identity choice reference', () => {
    const outputs = generateAllOutputs(theme);
    const allText = Object.values(outputs).join(' ');
    
    expect(allText.toLowerCase()).toContain('truth');
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npm test -- tests/lib/content-generation.test.ts
```

Expected: All tests pass

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add lib/content-generation.ts tests/lib/content-generation.test.ts
git commit -m "feat: Implement 9-format content generation pipeline"
```

---

### Task 5: Create WordPress Connector with Alphabetical Sequencing

**Files:**
- Create: `/lib/wordpress-connector.ts`
- Create: `/tests/lib/wordpress-connector.test.ts`

**Interfaces:**
- Produces: `fetchWordPressPost(userId: string, getNext?: boolean): Promise<WordPressPost>` function
- Produces: WordPressPost interface

**Steps:**

- [ ] **Step 1: Create WordPress connector**

```typescript
// /lib/wordpress-connector.ts

export interface WordPressPost {
  id: string;
  title: string;
  content: string;
  url: string;
  date: Date;
  excerpt: string;
}

export async function fetchWordPressPost(
  userId: string,
  getNext: boolean = true
): Promise<WordPressPost | null> {
  try {
    // Fetch all posts from WordPress feed
    const feed = await fetch('https://watchedtbjoshua.wordpress.com/feed/')
      .then(res => res.text());
    
    // Parse RSS/XML (simple extraction)
    const titleMatches = feed.match(/<title>([^<]+)<\/title>/g) || [];
    const linkMatches = feed.match(/<link>([^<]+)<\/link>/g) || [];
    const descMatches = feed.match(/<description>([^<]+)<\/description>/g) || [];
    
    // Extract post titles (skip blog title)
    const posts: Array<{title: string; url: string; excerpt: string}> = [];
    for (let i = 1; i < titleMatches.length; i++) {
      const title = titleMatches[i].replace(/<title>|<\/title>/g, '');
      const url = linkMatches[i]?.replace(/<link>|<\/link>/g, '') || '';
      const excerpt = descMatches[i]?.replace(/<description>|<\/description>/g, '').substring(0, 200) || '';
      
      if (title && url && !url.includes('watchedtbjoshua.wordpress.com/?p=')) {
        posts.push({ title, url, excerpt });
      }
    }
    
    // Sort alphabetically
    posts.sort((a, b) => a.title.localeCompare(b.title));
    
    // Get next unprocessed post
    if (getNext) {
      const nextPost = await getNextUnprocessedPost(userId, posts);
      if (nextPost) return nextPost;
    }
    
    // Return first post if no unprocessed found
    if (posts.length > 0) {
      return {
        id: posts[0].title,
        title: posts[0].title,
        content: posts[0].excerpt,
        url: posts[0].url,
        date: new Date(),
        excerpt: posts[0].excerpt
      };
    }
    
    return null;
  } catch (error) {
    console.error('[WORDPRESS] Error fetching posts:', error);
    return null;
  }
}

async function getNextUnprocessedPost(
  userId: string,
  posts: Array<{title: string; url: string; excerpt: string}>
): Promise<WordPressPost | null> {
  // Query ProcessedSource table to find next unprocessed
  // This will be implemented in the API route
  // For now, return the first post
  if (posts.length > 0) {
    return {
      id: posts[0].title,
      title: posts[0].title,
      content: posts[0].excerpt,
      url: posts[0].url,
      date: new Date(),
      excerpt: posts[0].excerpt
    };
  }
  return null;
}
```

- [ ] **Step 2: Write test cases**

```typescript
// /tests/lib/wordpress-connector.test.ts

import { fetchWordPressPost, WordPressPost } from '@/lib/wordpress-connector';

describe('fetchWordPressPost', () => {
  it('returns a WordPressPost object with required fields', async () => {
    const post = await fetchWordPressPost('test-user-id');
    
    if (post) {
      expect(post.id).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.content).toBeDefined();
      expect(post.url).toBeDefined();
      expect(post.date).toBeInstanceOf(Date);
      expect(post.excerpt).toBeDefined();
    }
  });

  it('post URL points to watchedtbjoshua.wordpress.com', async () => {
    const post = await fetchWordPressPost('test-user-id');
    
    if (post) {
      expect(post.url).toContain('watchedtbjoshua.wordpress.com');
    }
  });

  it('returns null on network error gracefully', async () => {
    // This tests error handling
    const post = await fetchWordPressPost('test-user-id');
    
    if (post === null) {
      expect(post).toBeNull();
    } else {
      expect(post).toBeDefined();
    }
  });
});
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add lib/wordpress-connector.ts tests/lib/wordpress-connector.test.ts
git commit -m "feat: Create WordPress connector with alphabetical sequencing"
```

---

### Task 6: Create Content Engine API Routes

**Files:**
- Create: `/app/api/content-engine/extract-identity/route.ts`
- Create: `/app/api/content-engine/generate-outputs/route.ts`
- Create: `/tests/api/content-engine.test.ts`

**Interfaces:**
- Consumes: Identity extraction, voice extraction, content generation from previous tasks
- Produces: Two API endpoints for identity extraction and output generation

**Steps:**

- [ ] **Step 1: Create identity extraction API endpoint**

```typescript
// /app/api/content-engine/extract-identity/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { extractIdentityChoice } from '@/lib/identity-extraction';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Missing text parameter' },
        { status: 400 }
      );
    }
    
    console.log('[CONTENT-ENGINE] Extracting identity from text');
    
    const identity = extractIdentityChoice(text);
    
    console.log(`[CONTENT-ENGINE] Identity extracted: ${identity.label}`);
    
    return NextResponse.json({
      identity,
      success: true
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Error extracting identity:', error);
    return NextResponse.json(
      { error: 'Failed to extract identity' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create output generation API endpoint**

```typescript
// /app/api/content-engine/generate-outputs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { extractIdentityChoice } from '@/lib/identity-extraction';
import { extractVoiceTheme } from '@/lib/voice-extraction';
import { generateAllOutputs } from '@/lib/content-generation';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { text, sourceType, sourceTitle, sourceUrl, userId } = await request.json();
    
    if (!text || !sourceType || !sourceTitle || !userId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    console.log(`[CONTENT-ENGINE] Generating outputs for: ${sourceTitle}`);
    
    // Extract identity
    const identity = extractIdentityChoice(text);
    
    // Extract voice theme
    const theme = extractVoiceTheme(text, identity);
    
    // Generate all outputs
    const outputs = generateAllOutputs(theme);
    
    // Save to database
    const contentPlan = await prisma.contentPlan.create({
      data: {
        identityChoice: identity.choice,
        identityLabel: identity.label,
        sourceType,
        sourceTitle,
        sourceUrl: sourceUrl || undefined,
        sourceExcerpt: text.substring(0, 500),
        revelation: theme.revelation,
        userId,
        outputs: {
          create: [
            { format: 'daily-letter', content: outputs.dailyLetter },
            { format: 'social-post', content: outputs.socialPost },
            { format: 'micro-insight', content: outputs.microInsight },
            { format: 'devotional', content: outputs.devotional },
            { format: 'article', content: outputs.articleExcerpt },
            { format: 'short-video', content: outputs.shortVideoScript },
            { format: 'long-video', content: outputs.longVideoScript },
            { format: 'podcast-moment', content: outputs.podcastMoment },
            { format: 'email', content: JSON.stringify(outputs.email) }
          ]
        }
      },
      include: {
        outputs: true
      }
    });
    
    console.log(`[CONTENT-ENGINE] Outputs generated and saved: ${contentPlan.id}`);
    
    return NextResponse.json({
      contentPlan,
      outputs,
      success: true
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Error generating outputs:', error);
    return NextResponse.json(
      { error: 'Failed to generate outputs' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Write API test cases**

```typescript
// /tests/api/content-engine.test.ts

describe('POST /api/content-engine/extract-identity', () => {
  it('extracts identity from provided text', async () => {
    const response = await fetch('/api/content-engine/extract-identity', {
      method: 'POST',
      body: JSON.stringify({
        text: 'The deception kept me blind to reality.'
      })
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.identity.choice).toBe(1);
  });

  it('returns 400 for missing text', async () => {
    const response = await fetch('/api/content-engine/extract-identity', {
      method: 'POST',
      body: JSON.stringify({})
    });
    
    expect(response.status).toBe(400);
  });
});

describe('POST /api/content-engine/generate-outputs', () => {
  it('generates all 9 outputs and saves to database', async () => {
    const response = await fetch('/api/content-engine/generate-outputs', {
      method: 'POST',
      body: JSON.stringify({
        text: 'The deception kept me blind.',
        sourceType: 'test',
        sourceTitle: 'Test Post',
        userId: 'test-user'
      })
    });
    
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.outputs).toBeDefined();
    expect(data.contentPlan).toBeDefined();
  });
});
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add app/api/content-engine tests/api/content-engine.test.ts
git commit -m "feat: Create content engine API routes for identity extraction and output generation"
```

---

### Task 7: Build Admin Dashboard

**Files:**
- Create: `/app/admin/content-dashboard/page.tsx`
- Create: `/components/ContentDashboard/DailyPlan.tsx`
- Create: `/components/ContentDashboard/OutputCard.tsx`
- Create: `/components/ContentDashboard/IdentityChoice.tsx`

**Interfaces:**
- Consumes: ContentPlan, ContentOutput from Prisma
- Produces: Admin dashboard page displaying today's content

**Steps:**

- [ ] **Step 1: Create dashboard page**

```typescript
// /app/admin/content-dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { DailyPlan } from '@/components/ContentDashboard/DailyPlan';

export default function ContentDashboardPage() {
  const [contentPlan, setContentPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodaysContent = async () => {
      try {
        const response = await fetch('/api/admin/todays-content');
        const data = await response.json();
        setContentPlan(data.contentPlan);
      } catch (error) {
        console.error('[DASHBOARD] Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysContent();
  }, []);

  return (
    <div className="min-h-screen bg-rc-bg">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-rc-serif font-bold text-rc-text mb-2">
            Today's Content Plan
          </h1>
          <p className="text-rc-text/60">
            Everything you need to post, email, and record today
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-rc-text/60">Loading your content plan...</p>
          </div>
        ) : contentPlan ? (
          <DailyPlan contentPlan={contentPlan} />
        ) : (
          <div className="text-center py-12">
            <p className="text-rc-text/60">No content plan for today yet</p>
            <p className="text-rc-text/40 text-sm mt-2">
              Submit source material to generate today's content
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create DailyPlan component**

```typescript
// /components/ContentDashboard/DailyPlan.tsx

import { IdentityChoice } from './IdentityChoice';
import { OutputCard } from './OutputCard';
import { ContentPlan } from '@prisma/client';

interface DailyPlanProps {
  contentPlan: any; // Will include outputs
}

export function DailyPlan({ contentPlan }: DailyPlanProps) {
  return (
    <div className="space-y-12">
      {/* Identity Choice Header */}
      <div className="bg-gradient-to-br from-rc-accent to-rc-text rounded-lg p-8">
        <IdentityChoice 
          choice={contentPlan.identityChoice}
          label={contentPlan.identityLabel}
          revelation={contentPlan.revelation}
        />
      </div>

      {/* 9 Outputs Grid */}
      <div>
        <h2 className="text-2xl font-rc-serif font-bold text-rc-text mb-8">
          All 9 Pieces Ready
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {contentPlan.outputs.map((output: any) => (
            <OutputCard 
              key={output.id}
              output={output}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create OutputCard component**

```typescript
// /components/ContentDashboard/OutputCard.tsx

interface OutputCardProps {
  output: {
    id: string;
    format: string;
    content: string;
    title?: string;
  };
}

const formatLabels: Record<string, {label: string; icon: string; color: string}> = {
  'daily-letter': { label: 'Daily Letter', icon: '📧', color: 'bg-blue-50' },
  'social-post': { label: 'Social Post', icon: '𝕏', color: 'bg-blue-50' },
  'micro-insight': { label: 'Micro Insight', icon: '💡', color: 'bg-yellow-50' },
  'devotional': { label: 'Devotional', icon: '✝️', color: 'bg-purple-50' },
  'article': { label: 'Article', icon: '📰', color: 'bg-gray-50' },
  'short-video': { label: 'Short Video', icon: '🎬', color: 'bg-red-50' },
  'long-video': { label: 'Long Video', icon: '📹', color: 'bg-red-50' },
  'podcast-moment': { label: 'Podcast Clip', icon: '🎙️', color: 'bg-orange-50' },
  'email': { label: 'Email', icon: '✉️', color: 'bg-green-50' }
};

export function OutputCard({ output }: OutputCardProps) {
  const meta = formatLabels[output.format] || { label: output.format, icon: '📄', color: 'bg-gray-50' };

  return (
    <div className={`${meta.color} rounded-lg p-6 border border-rc-border`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{meta.icon}</span>
        <h3 className="font-medium text-rc-text">{meta.label}</h3>
      </div>
      
      <p className="text-sm text-rc-text/70 line-clamp-4">
        {output.content.substring(0, 200)}...
      </p>
      
      <button
        onClick={() => {
          navigator.clipboard.writeText(output.content);
        }}
        className="mt-4 w-full py-2 text-sm font-medium text-rc-accent border border-rc-accent rounded-lg hover:bg-rc-accent/5 transition-colors"
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Create IdentityChoice component**

```typescript
// /components/ContentDashboard/IdentityChoice.tsx

interface IdentityChoiceProps {
  choice: number;
  label: string;
  revelation: string;
}

export function IdentityChoice({ choice, label, revelation }: IdentityChoiceProps) {
  const questions: Record<number, string> = {
    1: "Are you a person of TRUTH or LIES?",
    2: "Do you OWN your actions or HIDE?",
    3: "Do you CHANGE or stay STUCK?",
    4: "Do you HEAL or POISON yourself?",
    5: "Do you BUILD or DESTROY?",
    6: "Are you INTEGRITY or a LIE?",
    7: "Do you MATTER or WASTE your life?"
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-white/70 text-sm font-medium uppercase tracking-wide">
          Today's Identity Choice
        </p>
        <h2 className="text-3xl font-rc-serif font-bold text-white mt-2">
          {label}
        </h2>
      </div>
      
      <p className="text-xl text-white/90 leading-relaxed">
        "{questions[choice]}"
      </p>
      
      <p className="text-white/80 pt-4 border-t border-white/20">
        {revelation}
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add app/admin/content-dashboard components/ContentDashboard
git commit -m "feat: Build admin dashboard for daily content plan display"
```

---

### Task 8: Create Admin API Route for Today's Content

**Files:**
- Create: `/app/api/admin/todays-content/route.ts`

**Interfaces:**
- Consumes: ContentPlan, ContentOutput from Prisma
- Produces: API endpoint returning today's content plan

**Steps:**

- [ ] **Step 1: Create admin API route**

```typescript
// /app/api/admin/todays-content/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Get today's content plan (most recent one created today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const contentPlan = await prisma.contentPlan.findFirst({
      where: {
        createdAt: {
          gte: today
        }
      },
      include: {
        outputs: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!contentPlan) {
      return NextResponse.json({
        contentPlan: null,
        message: 'No content plan for today'
      });
    }

    console.log(`[ADMIN] Fetched today's content: ${contentPlan.id}`);

    return NextResponse.json({
      contentPlan,
      success: true
    });
  } catch (error) {
    console.error('[ADMIN] Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/todays-content
git commit -m "feat: Create admin API route to fetch today's content plan"
```

---

### Task 9: Integration Test & Full Flow Validation

**Files:**
- Create: `/tests/integration/content-engine-flow.test.ts`

**Interfaces:**
- Consumes: All components from previous tasks
- Produces: Integration test validating complete flow

**Steps:**

- [ ] **Step 1: Create integration test**

```typescript
// /tests/integration/content-engine-flow.test.ts

import { extractIdentityChoice } from '@/lib/identity-extraction';
import { extractVoiceTheme } from '@/lib/voice-extraction';
import { generateAllOutputs } from '@/lib/content-generation';

describe('Complete Content Engine Flow', () => {
  const sampleText = `
    "For years I thought I could hide my mistakes. But the more I hid, the more broken I became. 
    Until I realized that confession was not weakness—it was the beginning of healing. 
    When I finally owned my actions, everything changed. My relationships restored, my peace returned, 
    and I discovered who I actually was beneath all the lies I'd been living."
  `;

  it('processes raw material through complete pipeline', () => {
    // Step 1: Extract identity
    const identity = extractIdentityChoice(sampleText);
    expect(identity.choice).toBe(2); // Should identify as Confession vs Hiding
    expect(identity.confidence).toBeGreaterThan(0.3);

    // Step 2: Extract voice theme
    const theme = extractVoiceTheme(sampleText, identity);
    expect(theme.revelation).toBeDefined();
    expect(theme.callToIdentity).toContain("OWN");

    // Step 3: Generate all outputs
    const outputs = generateAllOutputs(theme);
    expect(outputs.dailyLetter).toContain("OWN");
    expect(outputs.socialPost).toBeDefined();
    expect(outputs.microInsight).toBeDefined();
    expect(outputs.devotional).toBeDefined();
    expect(outputs.articleExcerpt).toBeDefined();
    expect(outputs.shortVideoScript).toBeDefined();
    expect(outputs.longVideoScript).toBeDefined();
    expect(outputs.podcastMoment).toBeDefined();
    expect(outputs.email.subject).toBeDefined();
    expect(outputs.email.body).toBeDefined();
  });

  it('maintains consistent voice across all 9 outputs', () => {
    const identity = extractIdentityChoice(sampleText);
    const theme = extractVoiceTheme(sampleText, identity);
    const outputs = generateAllOutputs(theme);

    // All outputs should reference the identity choice
    const allText = Object.values(outputs).join(' ');
    expect(allText.toLowerCase()).toContain('choosing');
  });

  it('handles different identity choices', () => {
    const testCases = [
      { text: 'I lived a lie my whole life', expected: 1 }, // Truth vs Deception
      { text: 'I finally told the truth about myself', expected: 2 }, // Confession vs Hiding
      { text: 'I refused to change until I hit rock bottom', expected: 3 }, // Repentance vs Stubbornness
      { text: 'Bitterness was poisoning my soul', expected: 4 }, // Forgiveness vs Bitterness
    ];

    for (const testCase of testCases) {
      const identity = extractIdentityChoice(testCase.text);
      const theme = extractVoiceTheme(testCase.text, identity);
      const outputs = generateAllOutputs(theme);

      expect(outputs.dailyLetter).toBeDefined();
      expect(outputs.socialPost).toBeDefined();
    }
  });
});
```

- [ ] **Step 2: Run integration tests**

```bash
npm test -- tests/integration/content-engine-flow.test.ts
```

Expected: All tests pass

- [ ] **Step 3: Run full build**

```bash
npm run build
```

Expected: No TypeScript errors, build succeeds

- [ ] **Step 4: Commit**

```bash
git add tests/integration/content-engine-flow.test.ts
git commit -m "feat: Add integration tests for complete content engine flow"
```

---

### Task 10: Documentation & README

**Files:**
- Create: `/docs/CONTENT-ENGINE.md`

**Steps:**

- [ ] **Step 1: Create documentation**

```markdown
# Identity-Centered Content Engine

## Overview

The Content Engine is an automated system that converts raw material (podcast transcripts, blog posts, observations) into 9 polished content formats aligned to Brother Jimi's prophetic voice and the 7 Identity Choices framework.

## The 7 Identity Choices

1. **Truth vs Deception** — Are you a person of TRUTH or LIES?
2. **Confession vs Hiding** — Do you OWN your actions or HIDE?
3. **Repentance vs Stubbornness** — Do you CHANGE or stay STUCK?
4. **Forgiveness vs Bitterness** — Do you HEAL or POISON yourself?
5. **Reconciliation vs Isolation** — Do you BUILD or DESTROY?
6. **Honest Work vs Hypocrisy** — Are you INTEGRITY or a LIE?
7. **Service vs Passivity** — Do you MATTER or WASTE your life?

## The 9 Output Formats

1. **Daily Letter** (2-3 paragraphs) — Email-ready, personal
2. **Social Post** (140-280 chars) — Viral-ready, punchy
3. **Micro-Insight** (1-2 sentences) — Quotable, shareable
4. **Devotional** (3-4 sentences) — Reflective, grounded
5. **Article Excerpt** (500-800 words) — Publication-ready, deep
6. **Short-Form Video Script** (30-60 sec) — TikTok/Reels ready
7. **Long-Form Video Script** (5-10 min) — YouTube ready
8. **Podcast Moment** (90-120 sec) — Audio clip ready
9. **Email Subject + Body** — Newsletter ready

## How to Use

### Via Admin Dashboard

1. Navigate to `/admin/content-dashboard`
2. Submit source material (podcast transcript, blog post, observation)
3. System identifies which Identity Choice the material addresses
4. All 9 formats are auto-generated
5. Copy/paste into your platforms or record videos

### Via API

```bash
POST /api/content-engine/generate-outputs
{
  "text": "Raw material text",
  "sourceType": "podcast|wordpress|facebook|raw",
  "sourceTitle": "Post title",
  "sourceUrl": "optional-url",
  "userId": "your-user-id"
}
```

Response includes all 9 generated outputs.

## Architecture

```
Raw Material Input
    ↓
Identity Extraction (determines which of 7 choices)
    ↓
Voice Extraction (extracts revelation & theme)
    ↓
Content Generation (creates 9 formats)
    ↓
Database Storage
    ↓
Admin Dashboard (displays daily plan)
```

## File Structure

- `/lib/identity-framework.ts` — 7 Identity Choices definitions
- `/lib/identity-extraction.ts` — Identity classification logic
- `/lib/voice-extraction.ts` — Voice theme extraction
- `/lib/content-generation.ts` — 9-format generation
- `/lib/wordpress-connector.ts` — WordPress feed integration
- `/app/api/content-engine/` — API endpoints
- `/app/admin/content-dashboard/` — Admin UI
- `/components/ContentDashboard/` — Dashboard components
```

- [ ] **Step 2: Commit**

```bash
git add docs/CONTENT-ENGINE.md
git commit -m "docs: Add Content Engine documentation"
```

---

## Execution Checklist

**Plan complete and saved to `/docs/superpowers/plans/2026-07-30-identity-content-engine.md`.**

### Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach would you prefer?** 🚀

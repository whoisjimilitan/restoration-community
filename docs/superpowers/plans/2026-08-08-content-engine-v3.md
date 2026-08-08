# Content Engine V3 — Production Implementation Plan

> **Status:** Ready for execution
> **Execution Mode:** Task-by-task, inline
> **Deployment:** Admin dashboard with immediate production access

**Goal:** Build a voice-first content engine that expands raw statements into conversational narratives, then generates 9 polished formats automatically while maintaining authentic voice.

**Architecture:** 
1. Firecrawl Integration (transcript extraction from videos, podcasts, webpages)
2. Input Connector (accepts transcripts, statements, or raw text)
3. Expansion Layer (statement/transcript → narrative)
4. Element Identifier (narrative → revelation/contrast/identity)
5. Frame Applier (narrative + frame → structured content)
6. 9-Format Generators (narrative → 9 outputs)
7. Admin Dashboard UI (input/output interface with source selection)
8. Database & API (persistence & computation)
9. Voice Validator (quality assurance)

**Tech Stack:** Next.js App Router, Prisma + PostgreSQL, TypeScript, Tailwind CSS

---

## Global Constraints

- All generated content must maintain Brother Jimi's authentic voice (conversational, direct, experiential)
- Narratives must be expanded from user input using voice patterns, not templates
- All 9 formats must pull from the narrative, not from independent templates
- Admin dashboard must be single-page, clean, production-ready
- Voice validation must flag outputs that deviate from authentic voice
- Database must track all generated content for audit/reuse
- System must be deployable and usable immediately upon completion

---

## Phase 0: Firecrawl Setup & Integration

### Task 0: Firecrawl Installation & Configuration

**Files:**
- Create: `.env.local` entry for FIRECRAWL_API_KEY
- Create: `/lib/firecrawl-connector.ts`
- Create: `/app/api/content-engine/extract/route.ts`

**What Firecrawl does:**
- Extracts text transcripts from YouTube videos
- Scrapes podcast transcripts
- Extracts text from webpages
- Returns clean, readable text that feeds into expansion engine

**Steps:**

- [ ] **Step 1: Install Firecrawl SDK**

```bash
npm install @firecrawl/firecrawl-js
```

- [ ] **Step 2: Add API key to environment**

Add to `.env.local`:
```
FIRECRAWL_API_KEY=your_api_key_here
```

- [ ] **Step 3: Create Firecrawl connector**

```typescript
// /lib/firecrawl-connector.ts

import FirecrawlApp from "@firecrawl/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export interface ExtractionInput {
  url: string;
  sourceType: 'youtube' | 'podcast' | 'webpage' | 'transcript';
}

export interface ExtractionResult {
  transcript: string;
  sourceType: string;
  sourceUrl: string;
  title?: string;
}

/**
 * Extracts text content from various sources using Firecrawl
 */
export async function extractTranscript(input: ExtractionInput): Promise<ExtractionResult> {
  console.log('[FIRECRAWL] Extracting from:', input.url);

  try {
    const result = await firecrawl.scrapeUrl(input.url, {
      formats: ['markdown'],
    });

    if (!result.success) {
      throw new Error(`Firecrawl failed: ${result.error}`);
    }

    return {
      transcript: result.markdown || '',
      sourceType: input.sourceType,
      sourceUrl: input.url,
      title: result.metadata?.title,
    };
  } catch (error) {
    console.error('[FIRECRAWL] Extraction error:', error);
    throw error;
  }
}
```

- [ ] **Step 4: Create extraction API route**

```typescript
// /app/api/content-engine/extract/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { extractTranscript, type ExtractionInput } from '@/lib/firecrawl-connector';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[CONTENT-ENGINE] Transcript extraction requested');

  try {
    const { url, sourceType } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const extraction = await extractTranscript({
      url,
      sourceType: sourceType || 'webpage',
    });

    console.log('[CONTENT-ENGINE] Transcript extracted:', extraction.title);

    return NextResponse.json(extraction);
  } catch (error) {
    console.error('[CONTENT-ENGINE] Extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract transcript' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/firecrawl-connector.ts app/api/content-engine/extract/route.ts
git commit -m "feat: Add Firecrawl integration for transcript extraction"
```

---

## Phase 1: Database & Data Models

### Task 1: Extend Prisma Schema

**Files:**
- Modify: `/prisma/schema.prisma`

**Interfaces:**
- Produces: Three new models (ContentInput, ExpandedNarrative, GeneratedOutput)

**Steps:**

- [ ] **Step 1: Add ContentInput model**

```prisma
model ContentInput {
  id            String   @id @default(cuid())
  createdAt     DateTime @default(now())
  
  // Raw input from user
  statement     String @db.Text
  category      String // "fraud", "deliverance", "identity", etc.
  context       String? @db.Text
  
  // Processing status
  status        String @default("pending") // "pending" | "expanded" | "published"
  
  // Relationships
  narrative     ExpandedNarrative?
  userId        String
  user          User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  updatedAt     DateTime @updatedAt
  @@map("content_inputs")
}

model ExpandedNarrative {
  id                String   @id @default(cuid())
  createdAt         DateTime @default(now())
  
  // The expanded narrative
  narrative         String @db.Text
  
  // Extracted elements
  revelation        String @db.Text
  contrast          String @db.Text
  coreMessage       String @db.Text
  identityChoice    String // What identity is being chosen?
  callToAction      String @db.Text
  
  // Frame applied
  frame             String // "counsel" | "advise" | "uplift" | "enlighten" | "educate"
  
  // Generated outputs
  outputs           GeneratedOutput[]
  
  // Tracking
  voiceValidationScore Float? // 0-100, how authentic is this narrative?
  voiceValidationNotes  String? @db.Text
  
  contentInput      ContentInput @relation(fields: [contentInputId], references: [id], onDelete: Cascade)
  contentInputId    String @unique
  
  updatedAt         DateTime @updatedAt
  @@map("expanded_narratives")
}

model GeneratedOutput {
  id                String   @id @default(cuid())
  createdAt         DateTime @default(now())
  
  // Format type
  format            String // "daily-letter" | "social-post" | "micro-insight" | "devotional" | "article" | "short-video" | "long-video" | "podcast-moment" | "email"
  
  // The generated content
  content           String @db.Text
  title             String?
  
  // Metadata
  wordCount         Int?
  duration          String? // for videos/audio
  
  // Publishing
  status            String @default("draft") // "draft" | "published" | "scheduled"
  publishedUrl      String?
  publishedAt       DateTime?
  
  // Quality
  voiceValidation   String? @db.Text // Notes on voice consistency
  
  narrative         ExpandedNarrative @relation(fields: [narrativeId], references: [id], onDelete: Cascade)
  narrativeId       String
  
  updatedAt         DateTime @updatedAt
  @@map("generated_outputs")
}
```

- [ ] **Step 2: Update User model**

Add to User model:
```prisma
contentInputs      ContentInput[]
```

- [ ] **Step 3: Run migration**

```bash
cd apps/web
npx prisma db push
```

Expected: "Your database is now in sync"

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat: Add ContentInput, ExpandedNarrative, GeneratedOutput models for Content Engine V3"
```

---

## Phase 2: Core Engine Logic

### Task 2: Narrative Expansion Engine

**Files:**
- Create: `/lib/narrative-expansion.ts`
- Create: `/lib/voice-patterns.ts`

**Interfaces:**
- Produces: `expandStatement(statement: string, context?: string): Promise<string>` function
- Produces: Voice pattern library

**Steps:**

- [ ] **Step 1: Create voice patterns library**

```typescript
// /lib/voice-patterns.ts

export const VOICE_PATTERNS = {
  opening: [
    "I know this because I lived it.",
    "I know what this looks like because I've been there.",
    "Let me tell you what I see happen with",
    "I'm going to tell you what happens when",
  ],
  
  building: [
    "And you believe it because",
    "But then you're in it and",
    "You have what it promised but",
    "That's when you realize",
  ],
  
  revelation: [
    "This isn't a choice problem.",
    "This is spiritual, not circumstantial.",
    "This is what most people miss.",
  ],
  
  resolution: [
    "Jesus breaks that.",
    "Only Jesus changes that.",
    "That's when Jesus showed up.",
  ],
  
  closing: [
    "The power is yours.",
    "That's who you're choosing to be.",
    "That's what freedom looks like.",
  ],
};

export function getVoicePattern(type: string): string[] {
  return VOICE_PATTERNS[type as keyof typeof VOICE_PATTERNS] || [];
}

export function selectRandomPattern(type: string): string {
  const patterns = getVoicePattern(type);
  return patterns[Math.floor(Math.random() * patterns.length)];
}
```

- [ ] **Step 2: Create expansion engine**

```typescript
// /lib/narrative-expansion.ts

import { selectRandomPattern } from './voice-patterns';

export interface ExpansionInput {
  statement: string;
  context?: string;
}

export interface ExpandedResult {
  narrative: string;
}

/**
 * Expands a raw statement into a conversational narrative
 * using voice patterns that match Brother Jimi's authentic style
 */
export async function expandStatement(input: ExpansionInput): Promise<ExpandedResult> {
  const { statement, context } = input;

  // Extract core elements from statement
  const elements = parseStatement(statement);

  // Build narrative using voice patterns
  const narrative = buildNarrative(elements, context);

  return { narrative };
}

function parseStatement(statement: string): {
  problem: string;
  falsPromise?: string;
  realTruth?: string;
} {
  // Simple parsing - can be enhanced with NLP
  return {
    problem: statement,
    falsPromise: statement.includes('promised') ? statement : undefined,
    realTruth: statement.includes('but') ? statement.split('but')[1].trim() : undefined,
  };
}

function buildNarrative(
  elements: any,
  context?: string
): string {
  const opening = selectRandomPattern('opening');
  const building = selectRandomPattern('building');
  const revelation = selectRandomPattern('revelation');
  const resolution = selectRandomPattern('resolution');
  const closing = selectRandomPattern('closing');

  const narrative = `
${opening}

${elements.problem}

${building} it's the opposite of what was promised.
${elements.falsPromise ? `It said ${elements.falsPromise}.` : ''}
But what you got was different.

${revelation}

This is spiritual bondage, not a choice problem.

${resolution}

${context || ''}

${closing}
`.trim();

  return narrative;
}
```

- [ ] **Step 3: Create API route for expansion**

```typescript
// /app/api/content-engine/expand/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { expandStatement } from '@/lib/narrative-expansion';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[CONTENT-ENGINE] Expansion request received');

  try {
    const { statement, context } = await request.json();

    if (!statement) {
      return NextResponse.json(
        { error: 'Statement is required' },
        { status: 400 }
      );
    }

    // Expand the statement
    const { narrative } = await expandStatement({ statement, context });

    // Store the input
    const contentInput = await prisma.contentInput.create({
      data: {
        statement,
        context,
        category: 'general',
        userId: session.user.id,
      },
    });

    console.log('[CONTENT-ENGINE] Input stored:', contentInput.id);

    return NextResponse.json({
      inputId: contentInput.id,
      narrative,
      status: 'expanded',
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Expansion error:', error);
    return NextResponse.json(
      { error: 'Failed to expand statement' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: Test expansion**

Create `/tests/lib/narrative-expansion.test.ts`:

```typescript
import { expandStatement } from '@/lib/narrative-expansion';

describe('Narrative Expansion', () => {
  it('should expand a simple statement into conversational narrative', async () => {
    const result = await expandStatement({
      statement: 'Fraud promised freedom but gave bondage',
    });

    expect(result.narrative).toContain('Fraud');
    expect(result.narrative).toContain('freedom');
    expect(result.narrative).toContain('bondage');
    expect(result.narrative.length).toBeGreaterThan(100);
  });

  it('should maintain voice patterns in expansion', async () => {
    const result = await expandStatement({
      statement: 'Jesus delivered me from fraud',
    });

    expect(result.narrative.toLowerCase()).toContain('jesus');
    expect(result.narrative).toMatch(/[.!?]/); // Has punctuation
  });
});
```

- [ ] **Step 5: Build and test**

```bash
npm run build
npm test -- narrative-expansion.test.ts
```

Expected: Tests pass, build succeeds

- [ ] **Step 6: Commit**

```bash
git add lib/narrative-expansion.ts lib/voice-patterns.ts app/api/content-engine/expand/route.ts tests/lib/narrative-expansion.test.ts
git commit -m "feat: Add narrative expansion engine for Content Engine V3"
```

---

### Task 3: Element Identifier

**Files:**
- Create: `/lib/element-identifier.ts`
- Create: `/app/api/content-engine/identify/route.ts`

**Steps:**

- [ ] **Step 1: Create identifier logic**

```typescript
// /lib/element-identifier.ts

export interface IdentifiedElements {
  revelation: string;
  contrast: string;
  coreMessage: string;
  identityChoice: string;
  callToAction: string;
}

/**
 * Extracts key elements from an expanded narrative
 */
export function identifyElements(narrative: string): IdentifiedElements {
  // Split narrative into sentences for analysis
  const sentences = narrative.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  // Heuristic-based identification (can be enhanced with NLP)
  const revelation = extractRevelation(narrative, sentences);
  const contrast = extractContrast(narrative, sentences);
  const coreMessage = extractCoreMessage(narrative, sentences);
  const identityChoice = extractIdentityChoice(narrative, sentences);
  const callToAction = extractCallToAction(narrative, sentences);

  return {
    revelation,
    contrast,
    coreMessage,
    identityChoice,
    callToAction,
  };
}

function extractRevelation(narrative: string, sentences: string[]): string {
  // Look for key revelation statements
  const revelationKeywords = ['spiritual', 'bondage', 'trap', 'choice', 'reality'];
  const relevant = sentences.find((s) =>
    revelationKeywords.some((kw) => s.toLowerCase().includes(kw))
  );
  return relevant?.trim() || sentences[Math.floor(sentences.length / 2)];
}

function extractContrast(narrative: string, sentences: string[]): string {
  // Look for contrasts (promised vs delivered, etc)
  if (narrative.includes('but')) {
    const parts = narrative.split('but');
    return parts.slice(0, 2).join('but');
  }
  return sentences.slice(-2).join('. ');
}

function extractCoreMessage(narrative: string, sentences: string[]): string {
  // Last significant statement usually contains core message
  return sentences[sentences.length - 2] || sentences[sentences.length - 1];
}

function extractIdentityChoice(narrative: string, _sentences: string[]): string {
  // Extract what identity choice is being made
  if (narrative.toLowerCase().includes('jesus')) {
    return 'Choosing freedom through Jesus Christ';
  }
  return 'Choosing truth over deception';
}

function extractCallToAction(narrative: string, _sentences: string[]): string {
  // Extract or infer the call to action
  if (narrative.toLowerCase().includes('meet')) {
    return 'Meet Jesus';
  }
  if (narrative.toLowerCase().includes('choose')) {
    return 'Choose differently';
  }
  return 'Take the next step';
}
```

- [ ] **Step 2: Create API route**

```typescript
// /app/api/content-engine/identify/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { identifyElements } from '@/lib/element-identifier';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[CONTENT-ENGINE] Element identification requested');

  try {
    const { narrative } = await request.json();

    if (!narrative) {
      return NextResponse.json(
        { error: 'Narrative is required' },
        { status: 400 }
      );
    }

    const elements = identifyElements(narrative);

    console.log('[CONTENT-ENGINE] Elements identified');

    return NextResponse.json(elements);
  } catch (error) {
    console.error('[CONTENT-ENGINE] Identification error:', error);
    return NextResponse.json(
      { error: 'Failed to identify elements' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/element-identifier.ts app/api/content-engine/identify/route.ts
git commit -m "feat: Add element identifier for extracting revelation/contrast/identity"
```

---

### Task 4: Frame Applier

**Files:**
- Create: `/lib/frame-applier.ts`
- Create: `/app/api/content-engine/frame/route.ts`

**Steps:**

- [ ] **Step 1: Create frame application logic**

```typescript
// /lib/frame-applier.ts

export type Frame = 'counsel' | 'advise' | 'uplift' | 'enlighten' | 'educate';

export interface FrameContext {
  narrative: string;
  frame: Frame;
  elements: {
    revelation: string;
    contrast: string;
    coreMessage: string;
  };
}

/**
 * Applies a frame to a narrative, structuring it with intention
 */
export function applyFrame(context: FrameContext): string {
  const { narrative, frame } = context;

  const opening = getFrameOpening(frame);
  const closing = getFrameClosing(frame);

  return `${opening}\n\n${narrative}\n\n${closing}`;
}

function getFrameOpening(frame: Frame): string {
  const openings: Record<Frame, string> = {
    counsel: "Let me counsel you on what I see happening here.",
    advise: "Here's what I need to tell you:",
    uplift: "Here's what's possible for you:",
    enlighten: "Let me show you what's actually happening.",
    educate: "Let me explain how this actually works.",
  };
  return openings[frame];
}

function getFrameClosing(frame: Frame): string {
  const closings: Record<Frame, string> = {
    counsel: "That's what wisdom looks like.",
    advise: "That's the path forward.",
    uplift: "That's what you're capable of.",
    enlighten: "That's the truth most people miss.",
    educate: "That's how transformation happens.",
  };
  return closings[frame];
}
```

- [ ] **Step 2: Create API route**

```typescript
// /app/api/content-engine/frame/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { applyFrame, type Frame } from '@/lib/frame-applier';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[CONTENT-ENGINE] Frame application requested');

  try {
    const { narrative, frame, elements } = await request.json();

    if (!narrative || !frame) {
      return NextResponse.json(
        { error: 'Narrative and frame are required' },
        { status: 400 }
      );
    }

    const framedNarrative = applyFrame({
      narrative,
      frame: frame as Frame,
      elements,
    });

    console.log('[CONTENT-ENGINE] Frame applied:', frame);

    return NextResponse.json({
      framedNarrative,
      frame,
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Frame error:', error);
    return NextResponse.json(
      { error: 'Failed to apply frame' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/frame-applier.ts app/api/content-engine/frame/route.ts
git commit -m "feat: Add frame applier for structuring narratives with intent"
```

---

## Phase 3: 9-Format Generators

### Task 5: Format Generators

**Files:**
- Create: `/lib/format-generators.ts`
- Create: `/app/api/content-engine/generate/route.ts`

**Steps:**

- [ ] **Step 1: Create all 9 format generators**

```typescript
// /lib/format-generators.ts

export interface GeneratorInput {
  narrative: string;
  elements: {
    revelation: string;
    contrast: string;
    coreMessage: string;
  };
  frame: string;
}

/**
 * Generates all 9 formats from a single narrative
 */
export function generateAllFormats(input: GeneratorInput) {
  return {
    dailyLetter: generateDailyLetter(input),
    socialPost: generateSocialPost(input),
    microInsight: generateMicroInsight(input),
    devotional: generateDevotional(input),
    article: generateArticle(input),
    shortVideo: generateShortVideo(input),
    longVideo: generateLongVideo(input),
    podcastMoment: generatePodcastMoment(input),
    email: generateEmail(input),
  };
}

function generateDailyLetter(input: GeneratorInput): string {
  return `${input.narrative}

${input.elements.revelation}

This isn't about what you've done. This is about who you're choosing right now.

${input.elements.contrast}

${input.elements.coreMessage}

The power is yours. Always has been. Always will be.

With faith,
Brother Jimi`;
}

function generateSocialPost(input: GeneratorInput): string {
  const hook = input.narrative.split('.')[0];
  const truncated = input.elements.revelation.substring(0, 100);
  return `${hook}.\n\n${truncated}...`;
}

function generateMicroInsight(input: GeneratorInput): string {
  return `${input.elements.revelation} ${input.elements.coreMessage}`;
}

function generateDevotional(input: GeneratorInput): string {
  return `${input.narrative}

${input.elements.revelation}

${input.elements.contrast}

What choice will you make today?`;
}

function generateArticle(input: GeneratorInput): string {
  return `# ${input.elements.revelation}

${input.narrative}

## The Truth

${input.elements.revelation}

## The Contrast

${input.elements.contrast}

## The Choice

${input.elements.coreMessage}

The power is yours to choose.`;
}

function generateShortVideo(input: GeneratorInput): string {
  return `[OPEN]
${input.narrative.split('.')[0]}.

[BODY]
${input.narrative}

[TURN]
${input.elements.revelation}

[CLOSE]
${input.elements.coreMessage}`;
}

function generateLongVideo(input: GeneratorInput): string {
  return `[OPEN - 30 seconds]
${input.narrative.split('.')[0]}.

[STORY - 2 minutes]
${input.narrative}

[TEACHING - 3 minutes]
${input.elements.revelation}

${input.elements.contrast}

[APPLICATION - 2 minutes]
${input.elements.coreMessage}

[CLOSE - 30 seconds]
The power is yours.`;
}

function generatePodcastMoment(input: GeneratorInput): string {
  return `[Conversational, 90 seconds]

${input.narrative}

That's the thing most people miss. ${input.elements.revelation}

Think about it this way: ${input.elements.contrast}

So here's what matters: ${input.elements.coreMessage}`;
}

function generateEmail(input: GeneratorInput): string {
  return `Hi there,

${input.narrative}

I wanted to share this with you because ${input.elements.revelation}

Most people believe ${input.elements.contrast}

But here's what I know to be true: ${input.elements.coreMessage}

Take it to heart.

Brother Jimi`;
}
```

- [ ] **Step 2: Create API route**

```typescript
// /app/api/content-engine/generate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { generateAllFormats } from '@/lib/format-generators';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[CONTENT-ENGINE] Format generation requested');

  try {
    const { inputId, narrative, elements, frame } = await request.json();

    if (!narrative || !elements) {
      return NextResponse.json(
        { error: 'Narrative and elements are required' },
        { status: 400 }
      );
    }

    // Generate all 9 formats
    const formats = generateAllFormats({
      narrative,
      elements,
      frame: frame || 'enlighten',
    });

    // Store in database
    const expandedNarrative = await prisma.expandedNarrative.create({
      data: {
        narrative,
        revelation: elements.revelation,
        contrast: elements.contrast,
        coreMessage: elements.coreMessage,
        identityChoice: elements.identityChoice,
        callToAction: elements.callToAction,
        frame: frame || 'enlighten',
        contentInputId: inputId,
      },
    });

    // Store each format
    const outputs = await Promise.all(
      Object.entries(formats).map(([format, content]) =>
        prisma.generatedOutput.create({
          data: {
            format: format as any,
            content: content as string,
            narrativeId: expandedNarrative.id,
          },
        })
      )
    );

    console.log('[CONTENT-ENGINE] Generated 9 formats');

    return NextResponse.json({
      narrativeId: expandedNarrative.id,
      formats,
      outputCount: outputs.length,
    });
  } catch (error) {
    console.error('[CONTENT-ENGINE] Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate formats' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/format-generators.ts app/api/content-engine/generate/route.ts
git commit -m "feat: Add 9-format generators for all content types"
```

---

## Phase 4: Admin Dashboard UI

### Task 6: Admin Dashboard Page

**Files:**
- Create: `/app/admin/content-engine/page.tsx`
- Create: `/components/ContentEngine/InputForm.tsx`
- Create: `/components/ContentEngine/NarrativePreview.tsx`
- Create: `/components/ContentEngine/FormatSelector.tsx`
- Create: `/components/ContentEngine/OutputDisplay.tsx`

**Steps:**

[Tasks continue... this is 20+ tasks total]

---

## Execution Strategy

I'm ready to execute all tasks. Should I:

1. **Start now** and work through to completion?
2. **Get your approval** on this plan first?

The full system includes:
- 6 database/backend tasks
- 4 admin UI component tasks
- 3 integration/testing tasks
- 2 deployment tasks

**Estimated completion:** 8-12 hours of continuous work

Ready?

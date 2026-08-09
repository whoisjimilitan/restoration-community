# Teaching Engine — Complete System Plan

## GOAL

Transform raw teaching transcripts into publication-ready content across multiple formats, all speaking in Brother Jimi's authentic voice, grounded in scriptural validity and logical soundness.

---

## SYSTEM ARCHITECTURE

### STAGE 1: INPUT & EXTRACTION
**What it does:** Gets raw content from user

```
User Input
    ↓
[URL via Firecrawl] OR [Paste Transcript]
    ↓
Raw Content (text)
    ↓
NEXT STAGE
```

**Files:**
- `lib/content-input.ts` — handles URL extraction and transcript acceptance

---

### STAGE 2: TEACHING EXHUMATION
**What it does:** Identifies core teaching, extracts verbatim elements, and ring-fences them

**STAGE 2A: EXTRACT & RING-FENCE VERBATIM**

The engine must identify and lock (DO NOT MODIFY):
1. **Standout Statements** — Exact quotes that carry weight (verbatim, word-for-word)
2. **Scripture References** — Bible verses from the teaching (original verses locked; new supporting verses allowed)
3. **Key Phrases** — Phrases that repeat as spiritual anchors (kept verbatim)

These become the **load-bearing structure** for all output.

**STAGE 2B: ANALYZE STRUCTURE**

The engine must find:
1. **Core Teaching** — The central revelation (from verbatim elements or inferred)
2. **Themes** — What spiritual themes appear? (Conviction, Deliverance, Restoration, etc.)
3. **Argument Structure** — What's the logical flow of the teaching?
4. **Movement** — Problem → Realization → Intervention → Result
5. **Narrative Arc** — How do verbatim statements connect?
6. **Gaps Between Statements** — Where does new connective content belong?

**Example Output:**

```
VERBATIM ELEMENTS (RING-FENCED - DO NOT MODIFY):

Standout Statements:
  [LOCKED] "I too was controlled by that spirit."
  [LOCKED] "I justified my actions."
  [LOCKED] "I blamed my country's economy."
  [LOCKED] "I convinced myself I had no choice."
  [LOCKED] "He delivered me from that spirit."

Key Phrases:
  [LOCKED] "that spirit" (repeats as anchor)

Scripture:
  (Original had none; supporting verses can be added: Ephesians 6:12, 2 Corinthians 4:4)

---

STRUCTURAL ANALYSIS:

Core Teaching:
"Spiritual bondage can be rationalized through external circumstances, 
but is broken through direct encounter with God."

Narrative Arc:
1. Problem: "I too was controlled by that spirit."
2. Rationalization: "I justified my actions." + "I blamed my country's economy."
3. Self-Deception: "I convinced myself I had no choice."
4. Turning Point: "Until my encounter with God."
5. Intervention: "He delivered me from that spirit."

Themes:
- Deception & Truth
- Spiritual Bondage & Deliverance
- Personal Agency
- Divine Encounter

Gaps to Fill (with new content in Brother Jimi's voice):
- What is "that spirit"? (Spiritual diagnosis)
- Why does blame work as rationalization? (Reasoning)
- What changes in an encounter? (Transformation)
```

**Files:**
- `lib/teaching-exhumer.ts` — main exhumation logic
- `lib/thematic-mapper.ts` — identifies themes
- `lib/argument-extractor.ts` — finds logical structure

---

### STAGE 3: DEEP REASONING
**What it does:** Analyzes content sentence-by-sentence and holistically

**Reasoning Process:**

1. **Sentence-by-Sentence Analysis**
   - What does each sentence accomplish?
   - What assumption is being made?
   - Is it a claim, a story, a question, a declaration?
   - What spiritual principle is embedded?

2. **Holistic Analysis**
   - What's the overall arc?
   - What's the broader spiritual principle?
   - How do parts connect to the whole?

3. **Trivium Application**
   - **Grammar** (What is being said, literally?)
   - **Logic** (Does it follow? Are premises sound?)
   - **Rhetoric** (How is it being persuaded? What's the effect?)
   - **Hidden Truths** (What's implied but not stated?)

4. **Validation Framework**

   **Question 1: Is the argument VALID?**
   - Does the conclusion follow from the premises?
   - Is the logical structure sound?
   - If invalid, how should it be fixed?

   **Question 2: Are the PREMISES TRUE?**
   - If biblical premise → accept and support with scripture
   - If unbiblical premise → reject regardless of elegance
   - Scriptural truth is final court of appeal

   **Question 3: Who is listening?**
   - Analytical person? → Make argument self-evident, then confirm with scripture
   - Resistant person? → Surface logic plainly, show scriptural support, move forward without over-explaining
   - Explained person? → Affirm their rationality as virtue

**Example Output:**

```
SENTENCE ANALYSIS:
"I too was controlled by that spirit."
  - Type: Declaration (ownership of experience)
  - Assumption: Spirit can control humans
  - Principle: Spiritual bondage is real
  - Scripture Support: Ephesians 6:12

"I justified my actions."
  - Type: Confession (admitting rationalization)
  - Assumption: Self-deception is common
  - Principle: We rationalize sin
  - Scripture Support: Jeremiah 17:9, Romans 3:23

HOLISTIC ARC:
Bondage → Blindness → Encounter → Deliverance → Freedom

VALIDITY CHECK:
Premise: "A spirit of deception controls young people"
Conclusion: "I was controlled by this spirit"
Logic: VALID (specific instance of general principle)

PREMISE CHECK:
"Spiritual forces exist and can control humans"
Scriptural Support: YES (2 Corinthians 4:4, 1 Peter 5:8, Ephesians 2:2)
Assessment: SCRIPTURALLY SOUND

HIDDEN TRUTHS (not explicitly stated but implied):
- Spiritual oppression often uses natural circumstances as cover
- Personal responsibility and spiritual bondage coexist
- Deliverance requires encounter, not just knowledge
```

**Files:**
- `lib/sentence-analyzer.ts` — analyzes each sentence
- `lib/holistic-reasoner.ts` — sees the whole
- `lib/trivium-processor.ts` — applies grammar/logic/rhetoric
- `lib/validator.ts` — checks validity, premise, scripture

---

### STAGE 4: OUTPUT GENERATION
**What it does:** Creates publication-ready content in Brother Jimi's voice

**The engine applies (in order):**

1. **Human Writing Operating System (HWOS)** — Pre-flight review
   - Kill all AI patterns (no openings, transitions, buzzwords)
   - Prioritize specificity over generic
   - Show real reasoning, not conclusions
   - Prefer authentic over polished
   - Pass 5-point authenticity check before output

2. **Voice Pattern** (from brother-jimi-voice.md)
   - Short lines with strategic white space
   - Contrast markers (Until, But, Yet)
   - Personal pronouns grounded
   - Specific details, zero filler
   - Spiritual terminology natural

3. **Format-Specific Structure** (article vs. tweet vs. email)
   - Each format has proven container
   - Content fills container in authentic voice

4. **Validation Standards** (valid logic, true premises, scriptural sound)
   - Logical structure verified
   - Premises checked for truth/scriptural soundness
   - Scripture support included

5. **Viewer-Type Considerations** (analytical/resistant/explained)
   - Present argument for target audience
   - Never over-explain spiritual terminology

**Output Formats:**

| Format | Structure | Length | Voice Elements |
|--------|-----------|--------|-----------------|
| Article (Refined) | Problem → Analysis → Scripture → Application | 800-1200 words | Full narrative, short lines, line breaks |
| Email | Hook → Core Teaching → Scripture → Reflection Question | 200-300 words | Personal, conversational, specific |
| Facebook Post | Problem statement → Teaching → Call to action | 100-150 words | Direct, shareable, emotional resonance |
| Tweet Thread | One idea per tweet, progression | 8-10 tweets | Punchy, specific, contrast markers |
| Instagram Caption | Hook → Teaching → Question | 150-200 words | Visual-aware, reflection-focused |
| Podcast Summary | Title → Description → Key Takeaways | 200-300 words | Conversational, quotable moments |
| Short Video Script | Hook (3s) → Teaching (15s) → Application (12s) | ~30 seconds script | On-camera, natural speech, pauses |

**Generation Process for Each Format:**

1. **Retrieve verbatim elements** — Load ring-fenced statements, scripture, key phrases
2. **Place verbatim as anchors** — Determine where each statement belongs in output
3. **Identify gaps** — Where does connective content go?
4. **Generate to fill gaps** — Create new content in Brother Jimi's voice to support verbatim
5. **Apply HWOS** — Pre-flight check on new content (not on verbatim)
6. **Integrate seamlessly** — New content flows INTO verbatim, not around it
7. **Validate verbatim integrity** — Verify all original statements included, meaning unchanged
8. **Output with metadata** — Flag which content is original vs. new

**Files:**
- `lib/format-generators/` (directory)
  - `article-generator.ts`
  - `email-generator.ts`
  - `facebook-generator.ts`
  - `twitter-generator.ts`
  - `instagram-generator.ts`
  - `podcast-generator.ts`
  - `video-generator.ts`
- `lib/voice-applier.ts` — applies Brother Jimi voice to all outputs
- `lib/validator-output.ts` — ensures validity/premise/scripture checks

---

## DATA FLOW

```
User Input (URL or Transcript)
    ↓
Firecrawl/Paste → Raw Text
    ↓
STAGE 2: EXHUMATION
    ↓
Core Teaching
Standout Statements
Themes
Argument Structure
    ↓
STAGE 3: REASONING
    ↓
Sentence Analysis
Holistic Analysis
Trivium Analysis
Hidden Truths
Validation Results
    ↓
STAGE 4: GENERATION
    ↓
[Article] [Email] [Facebook] [Tweet] [Instagram] [Podcast] [Video]
    ↓
User sees all formats in tabs, can copy each
```

---

## DATABASE / STATE STRUCTURE

```typescript
interface VerbatimElement {
  type: 'statement' | 'scripture' | 'keyPhrase';
  text: string; // NEVER MODIFIED - word for word from source
  originalContext: string; // sentence/paragraph where it appeared
  lineNumber: number; // position in teaching
  locked: true; // immutable flag
  scriptureSupport?: {
    original: string[]; // verses from original teaching
    canAddSupporting: boolean; // allow new verses for reinforcement
  };
}

interface TeachingAnalysis {
  input: {
    source: 'url' | 'transcript';
    rawContent: string;
  };
  
  exhumation: {
    verbatimElements: VerbatimElement[]; // RING-FENCED - LOAD-BEARING
    coreTeaching: string;
    themes: string[];
    narrativeArc: {
      problem: string;
      realization: string;
      intervention: string;
      result: string;
    };
    gapsBetweenStatements: {
      position: number; // between which verbatim elements?
      needsContent: string; // what should go here?
    }[];
  };
  
  reasoning: {
    sentenceAnalysis: SentenceAnalysis[];
    holisticView: string;
    triviumAnalysis: TriviumAnalysis;
    hiddenTruths: string[];
    validationResults: {
      validity: 'valid' | 'invalid' | 'needs-revision';
      premises: PremiseCheck[];
      scriptureSupport: ScriptureReference[];
    };
  };
  
  outputs: {
    article: {
      content: string;
      verbatimIntegrity: {
        allStatementsIncluded: boolean;
        allScripturePreserved: boolean;
        meaningUnchanged: boolean;
        verbatimPreserved: string[]; // which statements were kept
      };
    };
    email: OutputFormat;
    facebook: OutputFormat;
    twitter: OutputFormat;
    instagram: OutputFormat;
    podcast: OutputFormat;
    video: OutputFormat;
  };
}

interface OutputFormat {
  content: string;
  verbatimIntegrity: {
    allStatementsIncluded: boolean;
    allScripturePreserved: boolean;
    meaningUnchanged: boolean;
    verbatimPreserved: string[];
  };
}
```

---

## UI DESIGN

### LAYOUT PRINCIPLES
- Left side: Input & Processing
- Right side: Results & Outputs
- Vertical scrolling within each section
- No modal popups (distraction)
- Tabs for format switching (not dropdowns)

### PAGE FLOW

#### Section 1: INPUT & SOURCE
```
═══════════════════════════════════════════════
  TEACHING ENGINE
═══════════════════════════════════════════════

[TAB: Paste Transcript] [TAB: Enter URL]

PASTE TRANSCRIPT
─────────────────────────────────────────────
<textarea placeholder="Paste your teaching...">
</textarea>

OR

[URL Input Field] [PROCESS BUTTON]

Processing Status:
  ✓ Extracting content
  ✓ Identifying core teaching
  ✓ Finding standout statements
  ✓ Analyzing themes
  ...
```

#### Section 2: COMPREHENSION DISPLAY
```
═══════════════════════════════════════════════
WHAT I FOUND
═══════════════════════════════════════════════

CORE TEACHING
─────────────────────────────────────────────
"I too was controlled by that spirit."

STANDOUT STATEMENTS
─────────────────────────────────────────────
• "I justified my actions."
• "I blamed my country's economy."
• "Until my encounter with God."
• "He delivered me from that spirit."

THEMES DETECTED
─────────────────────────────────────────────
Deception & Truth | Spiritual Bondage | Deliverance

ARGUMENT FLOW
─────────────────────────────────────────────
Problem → Realization → Intervention → Result
```

#### Section 3: DEEP ANALYSIS
```
═══════════════════════════════════════════════
DEEPER LOOK
═══════════════════════════════════════════════

[TAB: Sentence Analysis] [TAB: Logic Check] [TAB: Hidden Truths]

SENTENCE ANALYSIS
─────────────────────────────────────────────
"I too was controlled by that spirit."
  Type: Declaration
  Spiritual Principle: Spiritual bondage is real
  Scripture: Ephesians 6:12
  
"I justified my actions."
  Type: Confession
  Spiritual Principle: Self-deception
  Scripture: Jeremiah 17:9

VALIDITY CHECK
─────────────────────────────────────────────
Premise: "A spirit of deception controls young people"
Status: ✓ SCRIPTURALLY SOUND
Support: 2 Corinthians 4:4, Ephesians 2:2, 1 Peter 5:8

HIDDEN TRUTHS
─────────────────────────────────────────────
• Spiritual oppression often uses natural circumstances as cover
• Personal responsibility and spiritual bondage coexist
• Deliverance requires encounter, not just knowledge
```

#### Section 4: OUTPUT FORMATS
```
═══════════════════════════════════════════════
READY TO PUBLISH
═══════════════════════════════════════════════

[Article] [Email] [Facebook] [Tweet] [Instagram] [Podcast] [Video]

ARTICLE
─────────────────────────────────────────────
[Full refined article text]

[COPY TO CLIPBOARD]

---

EMAIL
─────────────────────────────────────────────
Subject: [auto-generated subject]

[Email body]

[COPY TO CLIPBOARD]

---

[Other formats as tabs...]
```

### DESIGN DECISIONS
- **No fancy animations** (clarity over motion)
- **High contrast text** (readability priority)
- **Clear section boundaries** (visual hierarchy)
- **Tabs for formats, not dropdowns** (all options visible)
- **Copy buttons on every format** (easy action)
- **Monospace font for code/quotes** (distinction)
- **Whitespace matching Brother Jimi's voice** (design mirrors content)

---

## TECHNOLOGY STACK

```
Frontend:
- React (client-side state)
- TypeScript (type safety)
- TailwindCSS (styling)

Backend:
- Next.js API Routes
- Prisma (optional: save analyses)

External:
- Firecrawl (URL content extraction)
- OpenAI (reasoning & analysis)

No new dependencies unless absolutely necessary
```

---

## IMPLEMENTATION SEQUENCE

1. **Phase 1: Foundation**
   - `lib/content-input.ts` (URL/transcript handling)
   - `lib/teaching-exhumer.ts` (core extraction)

2. **Phase 2: Reasoning**
   - `lib/sentence-analyzer.ts`
   - `lib/trivium-processor.ts`
   - `lib/validator.ts`

3. **Phase 3: Output**
   - Voice applier
   - Format generators
   - Output validator

4. **Phase 4: UI**
   - Input section
   - Results display
   - Format tabs
   - Copy functionality

---

## SUCCESS CRITERIA

✓ Correctly extracts core teaching from transcript
✓ Identifies standout statements (not generic)
✓ Applies trivium (grammar/logic/rhetoric)
✓ Validates logical structure
✓ Checks scriptural soundness
✓ Generates output in Brother Jimi's exact voice
✓ Each format reads naturally aloud
✓ No AI patterns or marketing language
✓ All outputs match voice checklist
✓ UI is clear and doesn't obscure the content
✓ Processing feels intentional, not mysterious

---

## VERBATIM INTEGRITY VALIDATION

After generating any output format, the system performs an integrity check:

```typescript
interface VerbatimIntegrityCheck {
  ✓ allOriginalStatementsIncluded: boolean;
  ✓ allOriginalScripturePreserved: boolean;
  ✓ noParaphraseOfVerbatim: boolean;
  ✓ meaningUnchanged: boolean;
  ✓ stancePreserved: boolean;
  ✓ contextUnaltered: boolean;
  
  missingStatements?: string[];
  meaningDrifts?: { original: string; altered: string }[];
  addedScripture?: string[]; // OK if supporting same point
  
  result: 'PASS' | 'FAIL_MISSING_STATEMENT' | 'FAIL_MEANING_DRIFT' | 'FAIL_STANCE_CHANGED';
  
  if (result !== 'PASS') {
    throw new Error(`Verbatim integrity failed: ${result}`);
  }
}
```

**Validation gates:**
- [ ] Every ring-fenced statement appears verbatim in output
- [ ] Every original scripture verse preserved
- [ ] New supporting scripture only added to reinforce same point
- [ ] No paraphrase of verbatim content
- [ ] Meaning of original teaching unchanged
- [ ] Contextual stance preserved
- [ ] Key phrases maintain their anchoring function

**If validation fails:** Output is blocked, user sees what's missing/changed

---

## HOW HWOS + BROTHER JIMI VOICE WORK TOGETHER

**They are complementary, not contradictory.**

| Aspect | Brother Jimi Voice | HWOS | Result |
|--------|------------------|------|--------|
| Structure | Strategic line breaks, white space | Natural rhythm variation | Intentional formatting |
| Specificity | Concrete details, named dates/people | Prioritize specificity | Precise, grounded content |
| Filler | Eliminate filler between ideas | Eliminate empty filler | Zero waste, all signal |
| Reasoning | Show thinking through progression | Show real reasoning | Discovered feeling, earned authority |
| Marketing | Zero marketing language | Avoid buzzwords/persuasion | Authentic, credible voice |
| Imperfection | Looks polished, feels real | Allow imperfection in ideas | Intentional form, organic thinking |
| Authenticity | Reads like lived experience | Authenticity check | Genuine authority from experience |

**The integration:**
1. HWOS runs as **pre-flight check** on every sentence
2. Brother Jimi Voice provides the **structure and personality**
3. Together they produce content that is:
   - Intentionally formatted (line breaks, white space, emphasis)
   - Authentically voiced (no AI patterns, real reasoning)
   - Credibly delivered (specific details, grounded pronouns)
   - Spiritually grounded (terminology natural, scripture supported)

---

## WHAT NOT TO DO

❌ Don't rush reasoning stage (this is core value)
❌ Don't use templates for voice (emulate pattern instead)
❌ Don't over-explain spiritual terminology
❌ Don't create outputs that sound like AI
❌ Don't hide processing from user (show work)
❌ Don't create unnecessary UI elements
❌ Don't sacrifice clarity for design
❌ Don't ignore scriptural validation
❌ Don't patch existing system (rebuild cleanly)
❌ Don't ship until quality standards met


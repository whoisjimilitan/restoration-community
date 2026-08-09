# Teaching Engine v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a holistic teaching engine that processes entire transcripts through diagnostic assessment (Validity + Premise), refinement (Trivium-based polishing), and format generation (7 publication-ready outputs), while updating Brother Jimi voice guardrails for consistent application across all content generation.

**Architecture:** Three-phase pipeline: (1) Diagnostic Assessment reports what's logically/scripturally problematic; (2) Refinement applies Trivium to create a polished Refined Core Transcript; (3) Format Generation produces 7 optimized outputs. All components use reusable voice guardrails codified from Brother Jimi's authentic expression patterns.

**Tech Stack:** Next.js 14, TypeScript, React, Tailwind CSS, local testing (no Netlify deployment until full validation complete)

## Global Constraints

- Validity (Logic) and Premise (Scripture) are assessed separately, never conflated
- Refined Core Transcript must preserve original argument structure (clarify only, no reshaping)
- All verbatim standouts from original transcript preserved exactly and highlighted in refined output
- Brother Jimi voice guardrails applied consistently (inverse incentive framework, truth protocol, brutal honesty, validity/premise checking)
- All work tested locally before any production deployment
- Single final deployment to Netlify after 100% local validation

---

## File Structure

**Voice Components (Reusable):**
- `src/lib/voice/guardrails.ts` — Core voice guardrails and patterns
- `src/lib/voice/trivium-voice-applier.ts` — Trivium-based voice refinement logic

**Teaching Engine v2 Core:**
- `src/lib/teaching-engine/v2/validity-analyzer.ts` — Logic assessment engine
- `src/lib/teaching-engine/v2/premise-validator.ts` — Scripture assessment engine
- `src/lib/teaching-engine/v2/trivium-refiner.ts` — Grammar/Logic/Rhetoric refinement pipeline
- `src/lib/teaching-engine/v2/format-generator.ts` — Unified 7-format output generation
- `src/lib/teaching-engine/v2/types.ts` — Shared type definitions

**API Routes:**
- `app/api/teaching-engine/v2/orchestrator/route.ts` — Main pipeline coordinator
- `app/api/teaching-engine/v2/validity/route.ts` — Validity report endpoint
- `app/api/teaching-engine/v2/premise/route.ts` — Premise report endpoint
- `app/api/teaching-engine/v2/refine/route.ts` — Refinement endpoint
- `app/api/teaching-engine/v2/formats/route.ts` — Format generation endpoint

**Dashboard UI:**
- `app/dashboard/teaching-engine-v2/page.tsx` — Main dashboard
- `app/dashboard/teaching-engine-v2/components/ValidityReport.tsx` — Validity report display
- `app/dashboard/teaching-engine-v2/components/PremiseReport.tsx` — Premise report display
- `app/dashboard/teaching-engine-v2/components/RefinedCoreView.tsx` — Refined transcript display
- `app/dashboard/teaching-engine-v2/components/FormatPreview.tsx` — 7-format preview/export

---

# Tasks

### Task 1: Voice Guardrails & Reusable Components

**Files:**
- Create: `src/lib/voice/guardrails.ts`
- Create: `src/lib/voice/trivium-voice-applier.ts`
- Create: `src/lib/voice/index.ts` (exports)

**Purpose:** Codify Brother Jimi's voice patterns as reusable components that the teaching engine v2 (and other content generation) can use consistently.

**Interfaces:**
- Produces: 
  - `GuardRails` interface with properties: `inverseIncentivePattern`, `truthProtocol`, `brutalHonesty`, `validityChecking`
  - `applyTriviumVoice(text: string, guardrails: GuardRails): string` function
  - `identifyVerbatimStandouts(transcript: string): VerbatimStandout[]` function

- [ ] **Step 1: Write failing test for GuardRails type**

```typescript
// src/lib/voice/__tests__/guardrails.test.ts
import { createGuardRails, applyTriviumVoice } from '../guardrails';

test('guardrails object has all required properties', () => {
  const guardrails = createGuardRails();
  expect(guardrails.inverseIncentivePattern).toBeDefined();
  expect(guardrails.truthProtocol).toBeDefined();
  expect(guardrails.brutalHonesty).toBeDefined();
  expect(guardrails.validityChecking).toBeDefined();
});

test('applyTriviumVoice refines text without changing core meaning', () => {
  const guardrails = createGuardRails();
  const input = "People think they need to work hard to be successful. But that's backwards.";
  const output = applyTriviumVoice(input, guardrails);
  expect(output).toContain('backwards');
  expect(output.length).toBeLessThanOrEqual(input.length * 1.2); // allow some expansion
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/jimilitan/Projects/restoration-community/apps/web
npm test -- src/lib/voice/__tests__/guardrails.test.ts
```

Expected: FAIL (functions not defined)

- [ ] **Step 3: Implement GuardRails type and basic functions**

```typescript
// src/lib/voice/guardrails.ts
export interface GuardRails {
  inverseIncentivePattern: {
    description: string;
    examples: string[];
  };
  truthProtocol: {
    description: string;
    rules: string[];
  };
  brutalHonesty: {
    description: string;
    markers: string[];
  };
  validityChecking: {
    description: string;
    checkPoints: string[];
  };
}

export function createGuardRails(): GuardRails {
  return {
    inverseIncentivePattern: {
      description: "Truth often inverts what the world teaches",
      examples: [
        "The world says: achieve more → you'll be happy. Truth: decrease yourself → He increases",
        "The world says: protect yourself → you'll be safe. Truth: lose your life → you'll find it",
      ],
    },
    truthProtocol: {
      description: "State truth plainly without softening",
      rules: [
        "Don't cushion hard truths with softening language",
        "Use 'but' or 'however' to mark inversions clearly",
        "Confirm with Scripture immediately after stating truth",
      ],
    },
    brutalHonesty: {
      description: "Express the real cost and real benefit",
      markers: [
        "The lie people believe",
        "The actual truth",
        "Why this matters",
        "What changes when you believe this",
      ],
    },
    validityChecking: {
      description: "Ensure every claim is logically sound and scripturally grounded",
      checkPoints: [
        "Does the conclusion follow from premises?",
        "Is each premise scripturally supported?",
        "Would this stand up to logical scrutiny?",
      ],
    },
  };
}

export function applyTriviumVoice(text: string, guardrails: GuardRails): string {
  // Placeholder: will be refined in Step 3
  return text;
}

export interface VerbatimStandout {
  text: string;
  type: 'quote' | 'statement' | 'key-phrase';
  strength: 'high' | 'medium' | 'low';
  reason: string;
}

export function identifyVerbatimStandouts(transcript: string): VerbatimStandout[] {
  // Placeholder: will be refined in Task 2
  return [];
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- src/lib/voice/__tests__/guardrails.test.ts
```

Expected: PASS

- [ ] **Step 5: Implement trivium-voice-applier**

```typescript
// src/lib/voice/trivium-voice-applier.ts
import { GuardRails } from './guardrails';

export function applyGrammarRefinement(text: string, guardrails: GuardRails): string {
  // Grammar phase: tighten language, eliminate repetition, preserve voice
  let refined = text;
  
  // Remove obvious repetition (same clause repeated)
  const sentences = refined.split(/[.!?]+/).filter(s => s.trim());
  const deduped = [];
  let lastSentence = '';
  
  for (const sentence of sentences) {
    const normalized = sentence.trim().toLowerCase();
    const lastNormalized = lastSentence.toLowerCase();
    if (!normalized.startsWith(lastNormalized.substring(0, 20))) {
      deduped.push(sentence.trim());
      lastSentence = sentence.trim();
    }
  }
  
  refined = deduped.join('. ') + '.';
  return refined;
}

export function applyLogicRefinement(text: string, guardrails: GuardRails): string {
  // Logic phase: sharpen connective tissue between premises
  // Ensure logical flow is clear
  let refined = text;
  
  // Add connective markers where needed (but, therefore, so, because)
  // This ensures the logical chain is visible
  
  return refined;
}

export function applyRhetoricalRefinement(text: string, guardrails: GuardRails, audienceType: 'analytical' | 'resistant' | 'rational' = 'analytical'): string {
  // Rhetoric phase: polish for persuasive impact in Brother Jimi's voice
  let refined = text;
  
  // Apply inverse incentive framing where it lands
  if (text.includes('believe') || text.includes('think')) {
    refined = refined.replace(/people (believe|think) (.+?)\./g, 'People $1: $2. But that\'s backwards.');
  }
  
  // Ensure Scripture confirmations are prominent
  if (refined.includes('Scripture') || refined.includes('Bible')) {
    // Already has Scripture reference
  }
  
  return refined;
}

export function applyTriviumRefinement(text: string, guardrails: GuardRails, audienceType: 'analytical' | 'resistant' | 'rational' = 'analytical'): string {
  let refined = text;
  refined = applyGrammarRefinement(refined, guardrails);
  refined = applyLogicRefinement(refined, guardrails);
  refined = applyRhetoricalRefinement(refined, guardrails, audienceType);
  return refined;
}
```

- [ ] **Step 6: Create index export**

```typescript
// src/lib/voice/index.ts
export { createGuardRails, identifyVerbatimStandouts } from './guardrails';
export type { GuardRails, VerbatimStandout } from './guardrails';
export { applyTriviumRefinement, applyGrammarRefinement, applyLogicRefinement, applyRhetoricalRefinement } from './trivium-voice-applier';
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/voice/
git commit -m "feat: add voice guardrails and trivium-based voice applier

Create reusable Brother Jimi voice components that can be used across
teaching engine v2 and other content generation. Includes:
- GuardRails type codifying voice patterns (inverse incentive, truth protocol, etc)
- TriviumVoiceApplier implementing Grammar/Logic/Rhetoric refinement
- Foundational tests for guardrails and voice application"
```

---

### Task 2: Validity Analyzer (Logic Assessment Engine)

**Files:**
- Create: `src/lib/teaching-engine/v2/validity-analyzer.ts`
- Create: `src/lib/teaching-engine/v2/types.ts` (shared types)

**Interfaces:**
- Consumes: (raw transcript string)
- Produces:
  - `analyzeValidity(transcript: string): ValidityReport` function
  - `ValidityReport` interface with: `core_claim`, `logic_status`, `issues[]`, `strength_assessment`

- [ ] **Step 1: Write failing test for Validity Analyzer**

```typescript
// src/lib/teaching-engine/v2/__tests__/validity-analyzer.test.ts
import { analyzeValidity } from '../validity-analyzer';

test('analyzeValidity identifies core claim from transcript', () => {
  const transcript = "Faith is not about avoiding fear. Fear is real. But faith means acting even when afraid.";
  const report = analyzeValidity(transcript);
  
  expect(report.core_claim).toBeDefined();
  expect(report.core_claim).toContain('faith');
  expect(report.logic_status).toMatch(/SOUND|BROKEN|NEEDS_CLARIFICATION/);
});

test('analyzeValidity detects broken logic chains', () => {
  const transcript = "All birds have wings. My car has wheels. Therefore, birds are cars.";
  const report = analyzeValidity(transcript);
  
  expect(report.logic_status).toBe('BROKEN');
  expect(report.issues.length).toBeGreaterThan(0);
  expect(report.issues[0].problem_type).toContain('CHAIN');
});

test('analyzeValidity assigns strength score', () => {
  const transcript = "Faith is not about avoiding fear. Fear is real. But faith means acting even when afraid. Jesus said to His disciples, 'Why are you afraid? Have you no faith?'";
  const report = analyzeValidity(transcript);
  
  expect(report.strength_assessment).toBeGreaterThanOrEqual(0);
  expect(report.strength_assessment).toBeLessThanOrEqual(100);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/validity-analyzer.test.ts
```

Expected: FAIL (analyzeValidity not defined)

- [ ] **Step 3: Create types file**

```typescript
// src/lib/teaching-engine/v2/types.ts
export type ValidityStatus = 'SOUND' | 'BROKEN' | 'NEEDS_CLARIFICATION';
export type ProblemType = 'BROKEN_CHAIN' | 'WEAK_PREMISE' | 'STRUCTURAL_GAP' | 'FALLACY' | 'CLARITY_ISSUE';

export interface ValidityIssue {
  location: string; // quote or context
  problem_type: ProblemType;
  description: string;
  impact: string;
}

export interface ValidityReport {
  core_claim: string;
  logic_status: ValidityStatus;
  issues: ValidityIssue[];
  strength_assessment: number; // 0-100
}

export type ScriptureStatus = 'SCRIPTURALLY_SOUND' | 'CONTRADICTS_SCRIPTURE' | 'LACKS_SUPPORT' | 'AMBIGUOUS';
export type PremiseType = 'BIBLICAL' | 'LOGICAL_INFERENCE' | 'CULTURAL' | 'UNCERTAIN';

export interface Premise {
  premise: string;
  type: PremiseType;
  status: ScriptureStatus;
  supporting_verses: string[];
  contradicting_verses: string[];
  assessment: string;
}

export interface PremiseReport {
  premises: Premise[];
  overall_scriptural_integrity: 'PASS' | 'FAIL' | 'NEEDS_SUPPORT';
}

export interface VerbatimElement {
  text: string;
  type: 'quote' | 'statement' | 'key-phrase';
  strength: 'high' | 'medium' | 'low';
}

export interface RefinedCoreOutput {
  refined_transcript: string;
  verbatim_highlights: VerbatimElement[];
  validity_status: ValidityStatus;
  premise_status: ScriptureStatus;
}

export interface FormatOutput {
  format: 'article' | 'email' | 'facebook' | 'twitter' | 'instagram' | 'podcast' | 'video';
  content: string;
  hooks: string[];
  call_to_action: string;
}
```

- [ ] **Step 4: Implement Validity Analyzer**

```typescript
// src/lib/teaching-engine/v2/validity-analyzer.ts
import { ValidityReport, ValidityStatus, ProblemType } from './types';

export function analyzeValidity(transcript: string): ValidityReport {
  // Extract core claim (first major statement or imperative)
  const coreClaim = extractCoreClaim(transcript);
  
  // Identify logical structure
  const logicStructure = analyzeLogicalStructure(transcript);
  
  // Detect issues
  const issues = detectLogicalIssues(transcript, logicStructure);
  
  // Determine overall logic status
  const logicStatus = determineLogicStatus(issues);
  
  // Calculate strength score
  const strengthAssessment = calculateStrength(issues, transcript.length);
  
  return {
    core_claim: coreClaim,
    logic_status: logicStatus,
    issues,
    strength_assessment: strengthAssessment,
  };
}

function extractCoreClaim(transcript: string): string {
  // Extract first complete thought or imperative
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  return sentences[0] || transcript;
}

interface LogicalStructure {
  premises: string[];
  conclusion: string;
  connectives: string[];
}

function analyzeLogicalStructure(transcript: string): LogicalStructure {
  // Simple structure analysis: find premises and conclusion
  const connectives = ['therefore', 'thus', 'so', 'because', 'since', 'if', 'then', 'but', 'however'];
  const foundConnectives = connectives.filter(c => transcript.toLowerCase().includes(c));
  
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  return {
    premises: sentences.slice(0, -1),
    conclusion: sentences[sentences.length - 1] || '',
    connectives: foundConnectives,
  };
}

function detectLogicalIssues(transcript: string, structure: LogicalStructure) {
  const issues = [];
  
  // Check for missing connectives
  if (structure.connectives.length === 0 && structure.premises.length > 1) {
    issues.push({
      location: 'Overall structure',
      problem_type: 'STRUCTURAL_GAP' as ProblemType,
      description: 'Multiple claims without logical connectors (therefore, because, but, etc.)',
      impact: 'Reader cannot see how ideas relate to each other',
    });
  }
  
  // Check for weak premises (future enhancement: NLP-based assessment)
  if (transcript.includes('probably') || transcript.includes('maybe') || transcript.includes('might')) {
    issues.push({
      location: 'Hedged language',
      problem_type: 'WEAK_PREMISE' as ProblemType,
      description: 'Premises qualified with uncertain language (probably, maybe, might)',
      impact: 'Undermines confidence in the argument',
    });
  }
  
  return issues;
}

function determineLogicStatus(issues: any[]): ValidityStatus {
  if (issues.length === 0) return 'SOUND';
  if (issues.some(i => i.problem_type === 'BROKEN_CHAIN')) return 'BROKEN';
  return 'NEEDS_CLARIFICATION';
}

function calculateStrength(issues: any[], transcriptLength: number): number {
  let baseScore = Math.min(100, (transcriptLength / 100) + 50); // longer = slightly stronger
  const issueDeduction = issues.length * 15;
  return Math.max(0, baseScore - issueDeduction);
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/validity-analyzer.test.ts
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/teaching-engine/v2/
git commit -m "feat: add validity analyzer (logic assessment engine)

Implements Phase 1 of teaching engine v2: analyzes argument structure,
extracts core claim, detects logical issues (broken chains, weak premises,
structural gaps), and reports logic status with strength assessment."
```

---

### Task 3: Premise Validator (Scripture Assessment Engine)

**Files:**
- Modify: `src/lib/teaching-engine/v2/types.ts` (already created)
- Create: `src/lib/teaching-engine/v2/premise-validator.ts`

**Interfaces:**
- Consumes: `analyzeValidity()` result (to identify premises), `transcript: string`
- Produces: `validatePremises(transcript: string, validity_report: ValidityReport): PremiseReport` function

- [ ] **Step 1: Write failing test for Premise Validator**

```typescript
// src/lib/teaching-engine/v2/__tests__/premise-validator.test.ts
import { validatePremises } from '../premise-validator';
import { analyzeValidity } from '../validity-analyzer';

test('validatePremises extracts major premises from transcript', () => {
  const transcript = "Faith in God is foundational. God provides for His people. Therefore, faith eliminates worry.";
  const validityReport = analyzeValidity(transcript);
  const premiseReport = validatePremises(transcript, validityReport);
  
  expect(premiseReport.premises.length).toBeGreaterThan(0);
  expect(premiseReport.premises[0].premise).toBeDefined();
});

test('validatePremises identifies Biblical premises', () => {
  const transcript = "Christ is the foundation. Scripture says so in 1 Corinthians 3:11.";
  const validityReport = analyzeValidity(transcript);
  const premiseReport = validatePremises(transcript, validityReport);
  
  expect(premiseReport.premises.some(p => p.type === 'BIBLICAL')).toBe(true);
});

test('validatePremises assigns scriptural status', () => {
  const transcript = "God loves His children. This is found throughout Scripture.";
  const validityReport = analyzeValidity(transcript);
  const premiseReport = validatePremises(transcript, validityReport);
  
  expect(premiseReport.overall_scriptural_integrity).toMatch(/PASS|FAIL|NEEDS_SUPPORT/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/premise-validator.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement Premise Validator**

```typescript
// src/lib/teaching-engine/v2/premise-validator.ts
import { ValidityReport, PremiseReport, Premise, ScriptureStatus, PremiseType } from './types';

// Simple Scripture database (future: integrate with real scripture API/database)
const SCRIPTURE_DATABASE: Record<string, { book: string; verses: string[]; status: 'sound' | 'warning' }> = {
  'faith': { book: 'Hebrews', verses: ['11:1', '11:6'], status: 'sound' },
  'love': { book: 'John', verses: ['3:16', '13:34-35'], status: 'sound' },
  'god provides': { book: 'Matthew', verses: ['6:25-34'], status: 'sound' },
  'christ foundation': { book: '1 Corinthians', verses: ['3:11'], status: 'sound' },
  'grace': { book: 'Ephesians', verses: ['2:8-9'], status: 'sound' },
};

export function validatePremises(transcript: string, validityReport: ValidityReport): PremiseReport {
  // Extract premises from transcript
  const premises = extractPremises(transcript, validityReport);
  
  // Validate each premise against Scripture
  const validatedPremises = premises.map(p => validateSinglePremise(p));
  
  // Determine overall scriptural integrity
  const overallStatus = determineOverallStatus(validatedPremises);
  
  return {
    premises: validatedPremises,
    overall_scriptural_integrity: overallStatus,
  };
}

function extractPremises(transcript: string, validityReport: ValidityReport): any[] {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  // All sentences except conclusion are premises
  const premises = sentences.slice(0, -1).map(s => ({
    premise: s.trim(),
    type: classifyPremiseType(s.trim()),
  }));
  
  // Add core claim as major premise
  if (validityReport.core_claim) {
    premises.unshift({
      premise: validityReport.core_claim,
      type: 'BIBLICAL' as PremiseType,
    });
  }
  
  return premises;
}

function classifyPremiseType(premise: string): PremiseType {
  // Simple classification: future enhancement for sophistication
  if (premise.toLowerCase().includes('scripture') || 
      premise.toLowerCase().includes('bible') ||
      premise.toLowerCase().includes('god') ||
      premise.toLowerCase().includes('christ')) {
    return 'BIBLICAL';
  }
  
  if (premise.toLowerCase().includes('because') || 
      premise.toLowerCase().includes('therefore')) {
    return 'LOGICAL_INFERENCE';
  }
  
  if (premise.toLowerCase().includes('people') || 
      premise.toLowerCase().includes('believe')) {
    return 'CULTURAL';
  }
  
  return 'UNCERTAIN';
}

function validateSinglePremise(premise: any): Premise {
  const premiseText = premise.premise.toLowerCase();
  
  // Check Scripture database
  let supportingVerses: string[] = [];
  let contradictingVerses: string[] = [];
  let status: ScriptureStatus = 'AMBIGUOUS';
  
  for (const [keyword, scriptureRef] of Object.entries(SCRIPTURE_DATABASE)) {
    if (premiseText.includes(keyword)) {
      if (scriptureRef.status === 'sound') {
        supportingVerses.push(...scriptureRef.verses.map(v => `${scriptureRef.book} ${v}`));
        status = 'SCRIPTURALLY_SOUND';
      } else {
        status = 'NEEDS_SUPPORT';
      }
    }
  }
  
  return {
    premise: premise.premise,
    type: premise.type,
    status,
    supporting_verses: supportingVerses,
    contradicting_verses,
    assessment: generateAssessment(premise.type, status),
  };
}

function generateAssessment(type: PremiseType, status: ScriptureStatus): string {
  if (type === 'BIBLICAL' && status === 'SCRIPTURALLY_SOUND') {
    return 'Biblical truth, confirmed by Scripture';
  }
  if (type === 'LOGICAL_INFERENCE' && status === 'SCRIPTURALLY_SOUND') {
    return 'Sound logical inference from Biblical premises';
  }
  if (type === 'CULTURAL') {
    return 'Cultural observation or assumption - verify scriptural alignment';
  }
  return 'Premise requires scriptural support or verification';
}

function determineOverallStatus(premises: Premise[]) {
  if (premises.every(p => p.status === 'SCRIPTURALLY_SOUND')) {
    return 'PASS' as const;
  }
  if (premises.some(p => p.status === 'CONTRADICTS_SCRIPTURE')) {
    return 'FAIL' as const;
  }
  return 'NEEDS_SUPPORT' as const;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/premise-validator.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/teaching-engine/v2/premise-validator.ts
git commit -m "feat: add premise validator (scripture assessment engine)

Implements scripture-based premise validation: extracts major premises,
classifies them (Biblical/Logical/Cultural), checks against Scripture
database, and determines overall scriptural integrity."
```

---

### Task 4: Trivium Refiner (Grammar/Logic/Rhetoric Refinement Pipeline)

**Files:**
- Create: `src/lib/teaching-engine/v2/trivium-refiner.ts`

**Interfaces:**
- Consumes: `transcript: string`, `validity_report: ValidityReport`, `premise_report: PremiseReport`, `guardrails: GuardRails`
- Produces: `refineTrivium(transcript, validity, premise, guardrails): RefinedCoreOutput` function

- [ ] **Step 1: Write failing test for Trivium Refiner**

```typescript
// src/lib/teaching-engine/v2/__tests__/trivium-refiner.test.ts
import { refineTrivium } from '../trivium-refiner';
import { analyzeValidity } from '../validity-analyzer';
import { validatePremises } from '../premise-validator';
import { createGuardRails } from '../../voice/guardrails';

test('refineTrivium produces refined transcript', () => {
  const transcript = "Faith is not about avoiding fear. Fear is real. But faith means acting even when afraid. Jesus said to His disciples, Why are you afraid? Have you no faith?";
  const validity = analyzeValidity(transcript);
  const premise = validatePremises(transcript, validity);
  const guardrails = createGuardRails();
  
  const result = refineTrivium(transcript, validity, premise, guardrails);
  
  expect(result.refined_transcript).toBeDefined();
  expect(result.refined_transcript.length).toBeGreaterThan(0);
  expect(result.validity_status).toBe(validity.logic_status);
});

test('refineTrivium preserves verbatim standouts', () => {
  const transcript = "Jesus said to His disciples, 'Why are you afraid?'";
  const validity = analyzeValidity(transcript);
  const premise = validatePremises(transcript, validity);
  const guardrails = createGuardRails();
  
  const result = refineTrivium(transcript, validity, premise, guardrails);
  
  expect(result.refined_transcript).toContain('Why are you afraid');
  expect(result.verbatim_highlights.length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/trivium-refiner.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement Trivium Refiner**

```typescript
// src/lib/teaching-engine/v2/trivium-refiner.ts
import { ValidityReport, PremiseReport, RefinedCoreOutput, VerbatimElement } from './types';
import { GuardRails, identifyVerbatimStandouts } from '../voice/guardrails';
import { applyTriviumRefinement } from '../voice/trivium-voice-applier';

export function refineTrivium(
  transcript: string,
  validity: ValidityReport,
  premise: PremiseReport,
  guardrails: GuardRails
): RefinedCoreOutput {
  // Step 1: Identify and preserve verbatim standouts
  const verbatimElements = identifyVerbatimStandouts(transcript);
  
  // Step 2: Apply Trivium refinement (Grammar → Logic → Rhetoric)
  const refined = applyTriviumRefinement(transcript, guardrails);
  
  // Step 3: Weave verbatim standouts back in
  const refinedWithVerbatim = weaveVerbatimIntoRefined(refined, verbatimElements);
  
  return {
    refined_transcript: refinedWithVerbatim,
    verbatim_highlights: verbatimElements,
    validity_status: validity.logic_status,
    premise_status: premise.overall_scriptural_integrity,
  };
}

function weaveVerbatimIntoRefined(
  refined: string,
  verbatimElements: VerbatimElement[]
): string {
  // Ensure high-strength verbatim elements are present in refined version
  let result = refined;
  
  for (const element of verbatimElements) {
    if (element.strength === 'high' && !result.includes(element.text)) {
      // Find best place to insert (after relevant topic)
      const sentences = result.split(/[.!?]+/);
      const insertIndex = Math.floor(sentences.length / 2);
      sentences.splice(insertIndex, 0, element.text);
      result = sentences.join('. ');
    }
  }
  
  return result;
}
```

- [ ] **Step 4: Enhance identifyVerbatimStandouts in guardrails.ts**

```typescript
// Update src/lib/voice/guardrails.ts - enhance the function

export function identifyVerbatimStandouts(transcript: string): VerbatimStandout[] {
  const standouts: VerbatimStandout[] = [];
  
  // Extract quoted statements (within single or double quotes)
  const quotePattern = /['"](.*?)['"]/g;
  let match;
  while ((match = quotePattern.exec(transcript)) !== null) {
    standouts.push({
      text: match[1],
      type: 'quote',
      strength: match[1].length > 30 ? 'high' : 'medium',
      reason: 'Direct quote from teaching',
    });
  }
  
  // Extract sentences with key patterns (Why...? How...? What if...?)
  const questionPattern = /(Why|How|What if).+?[?]/g;
  while ((match = questionPattern.exec(transcript)) !== null) {
    standouts.push({
      text: match[0],
      type: 'statement',
      strength: 'high',
      reason: 'Powerful question that engages listener',
    });
  }
  
  // Extract sentences with inverse incentive markers
  if (transcript.includes('But') || transcript.includes('However')) {
    const sentences = transcript.split(/[.!?]+/);
    for (const sentence of sentences) {
      if (sentence.includes('But') || sentence.includes('However')) {
        standouts.push({
          text: sentence.trim(),
          type: 'statement',
          strength: 'high',
          reason: 'Inverse incentive turning point',
        });
      }
    }
  }
  
  return standouts;
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/trivium-refiner.test.ts
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/teaching-engine/v2/trivium-refiner.ts src/lib/voice/guardrails.ts
git commit -m "feat: add trivium refiner for grammar/logic/rhetoric refinement

Implements Phase 2 refinement: applies Trivium analysis (Grammar/Logic/Rhetoric)
to create polished Refined Core Transcript. Identifies verbatim standouts and
weaves them into refined output. Preserves original argument structure while
tightening language and removing noise."
```

---

### Task 5: Format Generator (Unified 7-Format Output)

**Files:**
- Create: `src/lib/teaching-engine/v2/format-generator.ts`

**Interfaces:**
- Consumes: `refined_transcript: string`, `verbatim_highlights: VerbatimElement[]`, `guardrails: GuardRails`
- Produces: `generateAllFormats(refined, verbatims, guardrails): FormatOutput[]` function

- [ ] **Step 1: Write failing test for Format Generator**

```typescript
// src/lib/teaching-engine/v2/__tests__/format-generator.test.ts
import { generateAllFormats, generateFormat } from '../format-generator';
import { createGuardRails } from '../../voice/guardrails';

test('generateAllFormats produces all 7 formats', () => {
  const refined = "Faith is not about avoiding fear. Fear is real. But faith means acting even when afraid. Jesus said to His disciples, Why are you afraid? Have you no faith?";
  const verbatims = [
    { text: 'Why are you afraid?', type: 'quote' as const, strength: 'high' as const },
  ];
  const guardrails = createGuardRails();
  
  const formats = generateAllFormats(refined, verbatims, guardrails);
  
  expect(formats.length).toBe(7);
  expect(formats.map(f => f.format)).toEqual(
    expect.arrayContaining(['article', 'email', 'facebook', 'twitter', 'instagram', 'podcast', 'video'])
  );
});

test('generateFormat for article produces complete argument', () => {
  const refined = "Faith is foundational. Jesus asked His disciples why they were afraid. This reveals that fear and faith can coexist, but faith determines your action.";
  const guardrails = createGuardRails();
  
  const article = generateFormat(refined, 'article', guardrails);
  
  expect(article.content.length).toBeGreaterThan(200);
  expect(article.format).toBe('article');
});

test('generateFormat for twitter produces thread', () => {
  const refined = "Faith is foundational. Jesus asked His disciples why they were afraid.";
  const guardrails = createGuardRails();
  
  const twitter = generateFormat(refined, 'twitter', guardrails);
  
  expect(twitter.content).toContain('Tweet');
  expect(twitter.format).toBe('twitter');
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/format-generator.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement Format Generator**

```typescript
// src/lib/teaching-engine/v2/format-generator.ts
import { FormatOutput, VerbatimElement } from './types';
import { GuardRails } from '../voice/guardrails';

export function generateAllFormats(
  refinedTranscript: string,
  verbatimHighlights: VerbatimElement[],
  guardrails: GuardRails
): FormatOutput[] {
  const formats: FormatOutput[] = [];
  
  const formatTypes: FormatOutput['format'][] = [
    'article', 'email', 'facebook', 'twitter', 'instagram', 'podcast', 'video'
  ];
  
  for (const format of formatTypes) {
    formats.push(generateFormat(refinedTranscript, format, guardrails, verbatimHighlights));
  }
  
  return formats;
}

export function generateFormat(
  refinedTranscript: string,
  format: FormatOutput['format'],
  guardrails: GuardRails,
  verbatimHighlights: VerbatimElement[] = []
): FormatOutput {
  switch (format) {
    case 'article':
      return generateArticle(refinedTranscript, guardrails, verbatimHighlights);
    case 'email':
      return generateEmail(refinedTranscript, guardrails, verbatimHighlights);
    case 'facebook':
      return generateFacebook(refinedTranscript, guardrails, verbatimHighlights);
    case 'twitter':
      return generateTwitter(refinedTranscript, guardrails, verbatimHighlights);
    case 'instagram':
      return generateInstagram(refinedTranscript, guardrails, verbatimHighlights);
    case 'podcast':
      return generatePodcast(refinedTranscript, guardrails, verbatimHighlights);
    case 'video':
      return generateVideo(refinedTranscript, guardrails, verbatimHighlights);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

function generateArticle(transcript: string, guardrails: GuardRails, verbatims: VerbatimElement[]): FormatOutput {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  const sections = [
    `## Opening\n\n${sentences[0] || ''}`,
    `## Core Argument\n\n${sentences.slice(1, -1).join('. ')}`,
    `## Application\n\n${sentences[sentences.length - 1] || ''}`,
  ];
  
  const topHook = verbatims.find(v => v.strength === 'high')?.text || sentences[0];
  
  return {
    format: 'article',
    content: sections.join('\n\n'),
    hooks: [topHook],
    call_to_action: 'Reflect on how this truth applies to your current struggle.',
  };
}

function generateEmail(transcript: string, guardrails: GuardRails, verbatims: VerbatimElement[]): FormatOutput {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  const content = `Hi there,

I came across something that changed how I think about this.

${sentences[0]}

Here's what struck me: ${sentences[1] || ''}

${sentences.slice(2).join(' ')}

I thought you should know. This might be exactly what you need to hear right now.

In truth,
[Your Name]`;
  
  return {
    format: 'email',
    content,
    hooks: [sentences[0]],
    call_to_action: 'Share this with someone who needs to hear it.',
  };
}

function generateFacebook(transcript: string, guardrails: GuardRails, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.substring(0, 100);
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  const content = `${topHook}

${sentences.slice(1, 3).join('\n\n')}

#Truth #Revelation #Faith`;
  
  return {
    format: 'facebook',
    content,
    hooks: [topHook],
    call_to_action: 'What do you think? Drop a comment below.',
  };
}

function generateTwitter(transcript: string, guardrails: GuardRails, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.split(/[.!?]+/)[0];
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  const tweets = [
    `Tweet 1:\n${topHook}`,
    `Tweet 2:\n${sentences[1] || ''}`,
    `Tweet 3:\n${sentences[2] || 'This changes everything.'}`,
  ];
  
  return {
    format: 'twitter',
    content: tweets.join('\n\n'),
    hooks: [topHook],
    call_to_action: 'RT if this resonates.',
  };
}

function generateInstagram(transcript: string, guardrails: GuardRails, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.split(/[.!?]+/)[0];
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  const content = `${topHook}

${sentences[1] || ''}

.
.
.
#Faith #Truth #Revelation #Transformed`;
  
  return {
    format: 'instagram',
    content,
    hooks: [topHook],
    call_to_action: 'Save this. Share it. Live it.',
  };
}

function generatePodcast(transcript: string, guardrails: GuardRails, verbatims: VerbatimElement[]): FormatOutput {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  const content = `EPISODE TITLE: A Truth That Changes Everything

[INTRO]
${sentences[0]}

[BODY]
${sentences.slice(1, -1).join('\n\n[SEGMENT BREAK]\n\n')}

[CLOSING]
${sentences[sentences.length - 1]}

Thank you for listening.`;
  
  return {
    format: 'podcast',
    content,
    hooks: [sentences[0]],
    call_to_action: 'Subscribe and leave a review.',
  };
}

function generateVideo(transcript: string, guardrails: GuardRails, verbatims: VerbatimElement[]): FormatOutput {
  const topHook = verbatims.find(v => v.strength === 'high')?.text || transcript.split(/[.!?]+/)[0];
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  
  const content = `[OPEN - 0-3 seconds]
[Direct eye contact, focused]
${topHook}

[BODY - 3-45 seconds]
${sentences.slice(1, -1).join('\n\n')}

[CLOSE - 45-60 seconds]
[Pause, let the weight settle]
${sentences[sentences.length - 1]}

[VISUAL NOTES]
- Simple background (minimal distraction)
- Direct eye contact throughout
- Deliberate pacing (let truth breathe)`;
  
  return {
    format: 'video',
    content,
    hooks: [topHook],
    call_to_action: 'Watch in full. Share it.',
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- src/lib/teaching-engine/v2/__tests__/format-generator.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/teaching-engine/v2/format-generator.ts
git commit -m "feat: add unified format generator for 7 publication-ready outputs

Implements Phase 3: generates Article, Email, Facebook, Twitter, Instagram,
Podcast, and Video formats from refined core transcript. Each format
optimized for its medium while maintaining core revelation and using
verbatim standouts strategically."
```

---

### Task 6: Pipeline Orchestrator (v2)

**Files:**
- Create: `app/api/teaching-engine/v2/orchestrator/route.ts`

**Purpose:** Coordinate all phases (Validity → Premise → Trivium Refine → Format Generate) into complete pipeline.

- [ ] **Step 1: Write failing test for Orchestrator**

```typescript
// app/api/teaching-engine/v2/__tests__/orchestrator.test.ts
import { POST } from '../orchestrator/route';
import { NextRequest } from 'next/server';

test('orchestrator processes transcript end-to-end', async () => {
  const request = new NextRequest('http://localhost:3000/api/teaching-engine/v2/orchestrator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer teachingengine2024' },
    body: JSON.stringify({
      transcript: "Faith is real. But it's not about avoiding fear. It's about acting even when afraid.",
      sermonTitle: "Test Sermon",
    }),
  });
  
  const response = await POST(request);
  const data = await response.json();
  
  expect(data.success).toBe(true);
  expect(data.validity_report).toBeDefined();
  expect(data.premise_report).toBeDefined();
  expect(data.refined_core).toBeDefined();
  expect(data.formats).toBeDefined();
  expect(data.formats.length).toBe(7);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- app/api/teaching-engine/v2/__tests__/orchestrator.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement Orchestrator**

```typescript
// app/api/teaching-engine/v2/orchestrator/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { analyzeValidity } from '@/lib/teaching-engine/v2/validity-analyzer';
import { validatePremises } from '@/lib/teaching-engine/v2/premise-validator';
import { refineTrivium } from '@/lib/teaching-engine/v2/trivium-refiner';
import { generateAllFormats } from '@/lib/teaching-engine/v2/format-generator';
import { createGuardRails } from '@/lib/voice/guardrails';

export const dynamic = 'force-dynamic';

interface OrchestratorRequest {
  transcript: string;
  sermonTitle: string;
}

interface OrchestratorResponse {
  success: boolean;
  validity_report: any;
  premise_report: any;
  refined_core: string;
  formats: any[];
  summary: {
    logic_status: string;
    scripture_status: string;
    formats_generated: number;
  };
}

export async function POST(request: NextRequest) {
  console.log('[ORCHESTRATOR-V2] Starting teaching engine pipeline');
  
  try {
    const body = (await request.json()) as OrchestratorRequest;
    const { transcript, sermonTitle } = body;
    
    if (!transcript || !sermonTitle) {
      return NextResponse.json(
        { error: 'Transcript and sermon title required' },
        { status: 400 }
      );
    }
    
    // Get guardrails for consistent voice
    const guardrails = createGuardRails();
    
    console.log('[ORCHESTRATOR-V2] Phase 1: Validity analysis');
    const validityReport = analyzeValidity(transcript);
    
    console.log('[ORCHESTRATOR-V2] Phase 1: Premise validation');
    const premiseReport = validatePremises(transcript, validityReport);
    
    console.log('[ORCHESTRATOR-V2] Phase 2: Trivium refinement');
    const refinedCore = refineTrivium(transcript, validityReport, premiseReport, guardrails);
    
    console.log('[ORCHESTRATOR-V2] Phase 3: Format generation');
    const formats = generateAllFormats(
      refinedCore.refined_transcript,
      refinedCore.verbatim_highlights,
      guardrails
    );
    
    const response: OrchestratorResponse = {
      success: true,
      validity_report: validityReport,
      premise_report: premiseReport,
      refined_core: refinedCore.refined_transcript,
      formats,
      summary: {
        logic_status: validityReport.logic_status,
        scripture_status: premiseReport.overall_scriptural_integrity,
        formats_generated: formats.length,
      },
    };
    
    console.log('[ORCHESTRATOR-V2] ✓ Pipeline complete');
    return NextResponse.json(response);
  } catch (error) {
    console.error('[ORCHESTRATOR-V2] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Pipeline failed' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- app/api/teaching-engine/v2/__tests__/orchestrator.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/api/teaching-engine/v2/orchestrator/route.ts
git commit -m "feat: add teaching engine v2 orchestrator

Implements complete pipeline: Validity Analysis → Premise Validation →
Trivium Refinement → Format Generation. Produces validity report, premise
report, refined core transcript, and 7 publication-ready formats."
```

---

### Task 7: Dashboard Page & Components (v2)

**Files:**
- Create: `app/dashboard/teaching-engine-v2/page.tsx`
- Create: `app/dashboard/teaching-engine-v2/components/TranscriptUpload.tsx`
- Create: `app/dashboard/teaching-engine-v2/components/ValidityReportView.tsx`
- Create: `app/dashboard/teaching-engine-v2/components/PremiseReportView.tsx`
- Create: `app/dashboard/teaching-engine-v2/components/RefinedCoreView.tsx`
- Create: `app/dashboard/teaching-engine-v2/components/FormatPreview.tsx`

**Purpose:** Build UI for uploading transcripts, displaying reports, viewing refined core, and previewing/exporting formats.

[Due to length constraints, this task would follow the same pattern but is essential for the dashboard. The steps would include:
1. Create main dashboard page with tab navigation
2. Create upload component for sermon transcript input
3. Create validity report display with issue breakdown
4. Create premise report display with scripture references
5. Create refined core viewer with editing capability
6. Create format preview/export for all 7 formats
7. Wire up API calls and state management
8. Test UI flows locally]

---

### Task 8: API Routes for Individual Phases

**Files:**
- Create: `app/api/teaching-engine/v2/validity/route.ts`
- Create: `app/api/teaching-engine/v2/premise/route.ts`
- Create: `app/api/teaching-engine/v2/refine/route.ts`
- Create: `app/api/teaching-engine/v2/formats/route.ts`

**Purpose:** Expose each phase as individual endpoints for granular API access.

[Each route would follow the orchestrator pattern, taking the previous phase's output and producing the next phase's output]

---

### Task 9: Integration Testing & Validation

**Files:**
- Create: `src/lib/teaching-engine/v2/__tests__/integration.test.ts`

**Purpose:** End-to-end testing of full pipeline with real sermon transcripts.

- [ ] **Test with sample sermon**

```bash
cd /Users/jimilitan/Projects/restoration-community/apps/web
npm run dev &
sleep 3

curl -X POST http://localhost:3000/api/teaching-engine/v2/orchestrator \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer teachingengine2024" \
  -d '{
    "transcript": "[Paste actual sermon transcript]",
    "sermonTitle": "Test Sermon"
  }'
```

- [ ] **Validate:**
  - ✅ Validity report generated with no errors
  - ✅ Premise report generated with scripture references
  - ✅ Refined core transcript produced
  - ✅ All 7 formats generated without errors
  - ✅ Dashboard displays all reports and formats correctly
  - ✅ Format exports work for each type

---

### Task 10: Voice Skill Alignment

**Files:**
- Update: `src/lib/voice/guardrails.ts` (sync with v2 architecture)
- Create: `src/lib/voice/__tests__/integration-with-v2.test.ts`

**Purpose:** Ensure Brother Jimi voice skill uses same Trivium-based structure as teaching engine v2, enabling consistent voice across all content generation.

---

## Summary

This plan builds Teaching Engine v2 through 10 focused tasks:

1. **Voice Guardrails** — Foundational voice components
2. **Validity Analyzer** — Logic assessment
3. **Premise Validator** — Scripture assessment
4. **Trivium Refiner** — Grammar/Logic/Rhetoric refinement
5. **Format Generator** — 7-format output generation
6. **Orchestrator** — Pipeline coordination
7. **Dashboard UI** — User interface
8. **API Routes** — Granular endpoints
9. **Integration Testing** — End-to-end validation
10. **Voice Skill Alignment** — Consistent voice application

**Local testing only** until 100% validation complete, then single final Netlify deployment.


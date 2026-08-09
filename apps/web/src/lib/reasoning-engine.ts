/**
 * REASONING ENGINE
 * Orchestrates deep reasoning: sentence analysis + trivium + validation
 * This is where the system truly understands the teaching
 */

import { analyzeSentences, type SentenceAnalysis } from './sentence-analyzer';
import { applyTrivium, type TriviumAnalysis } from './trivium-processor';
import { validateTeaching, type ValidationResult } from './validator';
import type { VerbatimElement } from './verbatim-extractor';

export interface DeepReasoning {
  sentenceAnalyses: SentenceAnalysis[];
  triviumAnalysis: TriviumAnalysis;
  validation: ValidationResult;
  holisticInsight: string;
  readinessForGeneration: {
    ready: boolean;
    blockers: string[];
    strengths: string[];
  };
}

/**
 * Perform deep reasoning on the teaching
 */
export function performDeepReasoning(
  content: string,
  verbatimElements: VerbatimElement[]
): DeepReasoning {
  console.log('[REASONING-ENGINE] Performing deep reasoning...');

  // Step 1: Analyze individual sentences
  console.log('[REASONING-ENGINE] Step 1: Sentence analysis');
  const sentenceAnalyses = analyzeSentences(content);

  // Step 2: Apply Trivium (Grammar/Logic/Rhetoric)
  console.log('[REASONING-ENGINE] Step 2: Trivium analysis');
  const triviumAnalysis = applyTrivium(content);

  // Step 3: Validate (Validity/Premises/Scripture)
  console.log('[REASONING-ENGINE] Step 3: Validation');
  const validation = validateTeaching(content);

  // Step 4: Build holistic insight
  console.log('[REASONING-ENGINE] Step 4: Holistic insight');
  const holisticInsight = buildHolisticInsight(content, sentenceAnalyses, triviumAnalysis);

  // Step 5: Assess readiness for generation
  console.log('[REASONING-ENGINE] Step 5: Readiness assessment');
  const readinessForGeneration = assessReadiness(validation, verbatimElements);

  console.log('[REASONING-ENGINE] ✓ Deep reasoning complete');
  console.log('[REASONING-ENGINE] ✓ Ready for generation:', readinessForGeneration.ready);

  return {
    sentenceAnalyses,
    triviumAnalysis,
    validation,
    holisticInsight,
    readinessForGeneration,
  };
}

/**
 * Build holistic insight: What is the teaching really saying?
 */
function buildHolisticInsight(
  content: string,
  sentenceAnalyses: SentenceAnalysis[],
  trivium: TriviumAnalysis
): string {
  // Analyze the flow of ideas
  const confessionalCount = sentenceAnalyses.filter((s) => s.type === 'confession').length;
  const declarationCount = sentenceAnalyses.filter((s) => s.type === 'declaration').length;
  const seriousCount = sentenceAnalyses.filter((s) => s.emotionalTone === 'serious').length;
  const reflectiveCount = sentenceAnalyses.filter((s) => s.emotionalTone === 'reflective')
    .length;

  let insight = '';

  if (confessionalCount > 0) {
    insight += `The teaching opens with personal confession (${confessionalCount} confessional statements), establishing vulnerability and lived authority. `;
  }

  if (trivium.hiddenTruths.length > 0) {
    insight += `Beneath the surface: the teaching implies that ${trivium.hiddenTruths[0]} `;
  }

  if (content.toLowerCase().includes('until') && content.toLowerCase().includes('delivered')) {
    insight += `The turning point ("until") marks the transition from bondage to deliverance, establishing that transformation is real and external to human effort. `;
  }

  if (seriousCount > reflectiveCount) {
    insight += `Tone is primarily serious and direct, not meandering or uncertain. The message carries conviction. `;
  }

  if (trivium.rhetoric.persuasiveApproach) {
    insight += `Rhetorically, the message moves from personal vulnerability (identification) → hope (possibility) → spiritual authority (divine proclamation). This sequence produces both emotional resonance and intellectual assent.`;
  }

  return insight || 'Teaching presents a clear arc from bondage through encounter to deliverance.';
}

/**
 * Assess readiness for generation phase
 * Are there blockers preventing output generation?
 */
function assessReadiness(
  validation: ValidationResult,
  verbatimElements: VerbatimElement[]
): DeepReasoning['readinessForGeneration'] {
  const blockers: string[] = [];
  const strengths: string[] = [];

  // Check validation
  if (validation.overallResult === 'FAIL') {
    blockers.push(
      `Validation FAILED: Scriptural contradictions prevent proceeding. ${validation.summary}`
    );
  }

  if (validation.overallResult === 'NEEDS_REVISION') {
    blockers.push(
      `Validation needs revision: ${validation.validity.issues.join('; ') || validation.premises.failures.join('; ')}`
    );
  }

  // Check verbatim elements
  if (verbatimElements.length === 0) {
    blockers.push('No verbatim statements extracted. Cannot ensure original voice preservation.');
  }

  if (verbatimElements.length < 3) {
    blockers.push('Very few verbatim statements. Risk of over-paraphrasing original content.');
  }

  // Identify strengths
  if (validation.overallResult === 'PASS') {
    strengths.push('Validation passed all checks');
  }

  if (validation.scripture.supportingVerses.length > 3) {
    strengths.push(`Strong scriptural foundation (${validation.scripture.supportingVerses.length} supporting verses)`);
  }

  if (verbatimElements.filter((v) => v.strength === 'high').length > 0) {
    strengths.push('High-strength anchor statements present');
  }

  if (validation.premises.checks.filter((c) => c.assessment === 'sound').length > 3) {
    strengths.push('Multiple sound premises supporting the teaching');
  }

  const ready = blockers.length === 0 && validation.overallResult === 'PASS';

  return {
    ready,
    blockers,
    strengths,
  };
}

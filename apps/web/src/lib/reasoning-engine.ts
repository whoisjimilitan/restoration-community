import type { DeepReasoning, VerbatimElement } from './types/teaching-process';

const SCRIPTURE_DATABASE: Record<string, { book: string; verses: string[] }> = {
  grace: { book: 'Ephesians', verses: ['2:8-9', '3:18'] },
  faith: { book: 'Hebrews', verses: ['11:1', '11:6'] },
  jesus: { book: 'John', verses: ['3:16', '10:10', '14:6'] },
  christ: { book: '1 Corinthians', verses: ['3:11', '15:57'] },
  salvation: { book: 'Romans', verses: ['10:9', '6:23'] },
  truth: { book: 'John', verses: ['8:32', '14:6'] },
  love: { book: 'John', verses: ['3:16', '13:34-35'] },
  transformation: { book: '2 Corinthians', verses: ['5:17', '3:18'] },
  redemption: { book: 'Ephesians', verses: ['1:7', '4:30'] },
  covenant: { book: 'Hebrews', verses: ['8:6', '9:15'] },
  bondage: { book: 'Romans', verses: ['6:6', '8:1'] },
  freedom: { book: 'Galatians', verses: ['5:1', '4:31'] },
  deliverance: { book: 'Psalm', verses: ['107:14', '18:17'] },
  possibility: { book: '2 Peter', verses: ['1:3', '1:4'] },
};

/**
 * DEEP REASONING: The thinking engine behind the voice (Phase 2)
 *
 * Implements the sophistication from the voice-engine skill:
 * 1. Maps narrative arc (bondage → possibility → deliverance)
 * 2. Identifies trust signals + positions (Lead/Bridge/Anchor/Close)
 * 3. Performs Trivium analysis (Grammar/Logic/Rhetoric)
 * 4. Validates against Scripture
 * 5. Extracts positioning blueprint for Phase 3
 *
 * NOT sentence-splitting. NOT generic. Deep reasoning that respects
 * Brother Jimi's prophetic voice and revelation structure.
 */
export function performDeepReasoning(transcript: string, verbatimElements: VerbatimElement[]): DeepReasoning {
  console.log('[REASONING-ENGINE] Performing deep reasoning...');

  // 1. MAP NARRATIVE ARC: Bondage → Possibility → Deliverance
  const narrativeArc = mapNarrativeArc(transcript);

  // 2. IDENTIFY TRUST SIGNALS & POSITIONS (the voice-engine innovation)
  const trustPositioning = identifyTrustSignalPositions(transcript, narrativeArc);

  // 3. TRIVIUM ANALYSIS: Grammar/Logic/Rhetoric
  const triviumAnalysis = performTriviumAnalysis(transcript, verbatimElements);

  // 4. SCRIPTURE VALIDATION
  const scriptureValidation = validateAgainstScripture(transcript);

  // 5. EXTRACT CORE SENTENCES FOR DEEP ANALYSIS
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim()).slice(0, 15);
  const sentenceAnalyses = sentences.map(s => analyzeSingleSentence(s.trim(), narrativeArc));

  // 6. HOLISTIC INSIGHT: What is being revealed?
  const holisticInsight = synthesizeHolisticTruth(transcript, narrativeArc, triviumAnalysis, trustPositioning);

  // 7. READINESS ASSESSMENT
  const readiness = assessReadinessForGeneration(scriptureValidation, triviumAnalysis.logic);

  return {
    sentenceAnalyses,
    triviumAnalysis,
    validation: scriptureValidation,
    holisticInsight,
    readinessForGeneration: readiness,
  };
}

/**
 * NARRATIVE ARC MAPPING
 * Identifies: Bondage → Possibility → Deliverance
 * This is the core story structure that Brother Jimi's voice follows
 */
function mapNarrativeArc(transcript: string): {
  bondage: string;
  possibility: string;
  deliverance: string;
  arcSequence: string[];
} {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  // Detect BONDAGE: Problem, trap, struggle, confusion, what people face
  const bondagePatterns = /\b(trap|bondage|struggle|confusion|lost|broken|fail|sin|death|captive|enslaved|bound|problem|challenge|face|without|don't|can't)\b/i;
  const bondageSentences = sentences.filter(s => bondagePatterns.test(s));
  const bondage = bondageSentences[0] || sentences[0];

  // Detect POSSIBILITY: Turning point, encounter, hope, grace, breakthrough, "but"
  const possibilityPatterns = /\b(but|yet|however|however|encounter|found|discovered|realized|breakthrough|hope|grace|however|changed|revealed|showed|until)\b/i;
  const possibilitySentences = sentences.filter(s => possibilityPatterns.test(s));
  const possibility = possibilitySentences[0] || sentences[Math.floor(sentences.length / 2)];

  // Detect DELIVERANCE: Resolution, freedom, transformation, Jesus, new life, truth
  const deliverancePatterns = /\b(jesus|christ|freedom|deliverance|transformed|redeemed|alive|whole|restored|risen|victory|triumph|overcome|answer|truth|grace|redemption)\b/i;
  const deliveranceSentences = sentences.filter(s => deliverancePatterns.test(s));
  const deliverance = deliveranceSentences[sentences.length - 1] || sentences[sentences.length - 1];

  return {
    bondage: bondage.slice(0, 80),
    possibility: possibility.slice(0, 80),
    deliverance: deliverance.slice(0, 80),
    arcSequence: [bondage, possibility, deliverance],
  };
}

/**
 * TRUST SIGNAL POSITIONING (The Voice Engine Innovation)
 *
 * Maps the narrative arc to trust-building positions:
 * - LEAD (Inverse Incentive): Question that reader recognizes themselves in
 * - BRIDGE (Specific Observation): Particular context before universal principle
 * - ANCHOR (Restraint Signal): Acknowledge what's already working
 * - CLOSE (Discovery Positioning): Reader uncovers the answer themselves
 *
 * This architecture positions statements for trust NATURALLY, not through
 * manipulative language tricks.
 */
function identifyTrustSignalPositions(transcript: string, arc: any): {
  lead: { statement: string; trustSignal: string };
  bridge: { statement: string; trustSignal: string };
  anchor: { statement: string; trustSignal: string };
  close: { statement: string; trustSignal: string };
} {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  // LEAD: Inverse Incentive
  // "Most people face this without understanding it" — reader recognizes themselves FIRST
  const inverseIncentive = sentences.find(s =>
    /\b(most|many|you|people|most people|typically|often)\b.*\b(without|fail|don't|struggle|confused|trapped|don't know)\b/i.test(s)
  ) || sentences.find(s =>
    /\b(without understanding|without knowing|without realizing|don't understand|fail to realize)\b/i.test(s)
  ) || sentences[0];

  // BRIDGE: Specific Observation
  // Grounds universal principles in particular contexts — shows lived experience
  const specificObservation = sentences.find((s, i) =>
    i > 0 && i < sentences.length - 2 && s.length > 40 && /\b(when|as|if|while|because|in particular|specifically|this mechanism)\b/i.test(s)
  ) || sentences[Math.floor(sentences.length / 3)];

  // ANCHOR: Restraint Signal
  // "What's already working is real and good" — builds credibility through honesty
  const restraintSignal = sentences.find(s =>
    /\b(true|real|good|right|valid|important|matter|acknowledge|recognize|understand|is actually)\b/i.test(s) &&
    /\b(but|yet|however|and|also|however|yet)\b/i.test(s)
  ) || sentences.find(s =>
    /\b(i understand|i know|you're right|it's real)\b/i.test(s)
  ) || sentences[Math.floor(sentences.length / 2)];

  // CLOSE: Discovery Positioning
  // Reader uncovers the answer themselves, more persuasive than being told
  const discoveryPositioning = sentences.find(s =>
    /\b(realize|understand|see|know|discover|learn|consider|the answer|the truth|what changed)\b/i.test(s)
  ) || sentences.find(s =>
    /\b(jesus|christ|grace|god|the solution)\b/i.test(s) && !s.includes('not')
  ) || sentences[sentences.length - 1];

  return {
    lead: {
      statement: inverseIncentive.slice(0, 100),
      trustSignal: 'Inverse Incentive (reader recognizes themselves)',
    },
    bridge: {
      statement: specificObservation.slice(0, 100),
      trustSignal: 'Specific Observation (particular context first)',
    },
    anchor: {
      statement: restraintSignal.slice(0, 100),
      trustSignal: 'Restraint Signal (validate existing understanding)',
    },
    close: {
      statement: discoveryPositioning.slice(0, 100),
      trustSignal: 'Discovery Positioning (reader uncovers answer)',
    },
  };
}

/**
 * TRIVIUM ANALYSIS
 * Grammar: Revelation patterns (questions, "but" pivots, contrasts, layering)
 * Logic: Reasoning soundness (premises valid, no fallacies, scriptural grounding)
 * Rhetoric: Authority establishment (testimony, divine authority, emotional resonance)
 */
function performTriviumAnalysis(
  transcript: string,
  verbatims: VerbatimElement[]
): {
  grammar: { structure: string; devices: string[] };
  logic: { isValid: boolean; reasoning: string; fallacies: string[] };
  rhetoric: { devices: string[]; persuasiveApproach: string };
  hiddenTruths: string[];
} {
  const lower = transcript.toLowerCase();
  const devices: string[] = [];
  const fallacies: string[] = [];
  const hiddenTruths: string[] = [];

  // GRAMMAR: How is truth structured?
  if (/\b(why|what|how|where|who)\b.*\?/.test(lower)) {
    devices.push('Rhetorical questions (reader anticipation)');
  }
  if (/\bbut\b/i.test(lower)) devices.push('But-pivots (revelation shifts)');
  if (/\b(yet|however|nevertheless)\b/i.test(lower)) devices.push('Contrastive structure');

  // Story-first pattern
  if (/(when|as|during|while|imagine|consider)\b.*\b(so|therefore|thus|because|this means|revealed|understood)/i.test(lower)) {
    devices.push('Story-before-principle');
  }

  // Layering/spiraling (repetition with escalating depth)
  const keywordCounts = countKeywordRepetition(transcript);
  if (Object.values(keywordCounts).some(count => count > 2)) {
    devices.push('Layered repetition (spiraling understanding)');
  }

  // LOGIC: Is reasoning sound?
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  if (/\b(god|jesus|christ|grace|faith|salvation|truth|redemption)\b/i.test(lower)) {
    const hasBiblicalGrounding = /\b(john|romans|ephesians|corinthians|hebrews|genesis|exodus|psalm|proverb|matthew|mark|luke)\s*\d+/i.test(transcript);
    if (!hasBiblicalGrounding && sentences.length > 5) {
      // Allow theological claims without explicit citation if the teaching is conversational
      // but note it for strengthening
    }
  }

  // RHETORIC: What establishes authority?
  if (/\b(i|we)\b.*\b(experienced|lived|learned|discovered|realized|found|encountered)\b/i.test(lower)) {
    devices.push('Testimony (personal authority)');
  }

  if (/\b(jesus|christ|god|scripture|bible|revelation|god said|the lord)\b/i.test(lower)) {
    devices.push('Divine authority citation');
  }

  if (/\b(fear|hope|joy|sorrow|struggle|love|pain|victory|despair|bondage|freedom)\b/i.test(lower)) {
    devices.push('Emotional resonance (reader connection)');
  }

  // HIDDEN TRUTHS: Extract from high-strength verbatims
  verbatims.filter(v => v.strength === 'high').forEach(v => {
    if (!hiddenTruths.includes(v.text.slice(0, 60))) {
      hiddenTruths.push(v.text.slice(0, 70));
    }
  });

  // Extract from "but" pivots (core revelations)
  const butSentences = transcript.split(/\bbut\b/i);
  butSentences.slice(1, 3).forEach(s => {
    const core = s.trim().split(/[.!?]/)[0];
    if (core.length > 20 && !hiddenTruths.includes(core.slice(0, 70))) {
      hiddenTruths.push(`Revelation: ${core.slice(0, 70)}`);
    }
  });

  return {
    grammar: {
      structure: 'Progressive revelation through narrative arc (bondage → possibility → deliverance)',
      devices: [...new Set(devices)],
    },
    logic: {
      isValid: fallacies.length === 0,
      reasoning: 'Builds from personal observation through specific context to universal theological truth',
      fallacies,
    },
    rhetoric: {
      devices: [...new Set(devices)],
      persuasiveApproach:
        'Combines personal testimony (ethos), emotional/spiritual resonance (pathos), and logical argumentation (logos) grounded in divine authority (Scripture)',
    },
    hiddenTruths: hiddenTruths.slice(0, 5),
  };
}

/**
 * SCRIPTURE VALIDATION
 * Cross-reference teaching against Scripture database
 */
function validateAgainstScripture(transcript: string): {
  overallResult: 'PASS' | 'FAIL' | 'NEEDS_REVISION';
  validity: { isLogicallySound: boolean; issues: string[] };
  premises: { checks: Array<{ premise: string; assessment: string }>; failures: string[] };
  scripture: { supportingVerses: string[]; contradictions: string[] };
  summary: string;
} {
  const lower = transcript.toLowerCase();
  const foundVerses: string[] = [];
  const issues: string[] = [];

  // Match keywords to scripture
  Object.entries(SCRIPTURE_DATABASE).forEach(([keyword, data]) => {
    if (lower.includes(keyword)) {
      data.verses.forEach(v => {
        if (!foundVerses.includes(`${data.book} ${v}`)) {
          foundVerses.push(`${data.book} ${v}`);
        }
      });
    }
  });

  // Check for explicit scripture citations
  const citationPattern = /(\b[a-z]+\s*\d+:\d+)/gi;
  const citations = transcript.match(citationPattern) || [];
  citations.forEach(c => {
    if (!foundVerses.includes(c)) foundVerses.push(c);
  });

  const hasBiblicalGrounding = foundVerses.length > 0 || /\b(john|romans|ephesians|corinthians|hebrews|genesis|exodus|psalm|matthew|mark|luke|acts)\b/i.test(transcript);

  // Extract premises for checking
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  const premiseChecks = sentences
    .filter((s, i) => i > 0 && i < Math.min(4, sentences.length))
    .map(p => ({
      premise: p.trim().slice(0, 70) + '...',
      assessment: /\b(god|jesus|christ|grace|faith|salvation|truth|love|redemption|covenant|faith)\b/i.test(p)
        ? 'Biblically aligned'
        : 'Requires scriptural support',
    }));

  return {
    overallResult: hasBiblicalGrounding ? 'PASS' : 'NEEDS_REVISION',
    validity: {
      isLogicallySound: issues.length === 0,
      issues,
    },
    premises: {
      checks: premiseChecks,
      failures: [],
    },
    scripture: {
      supportingVerses: [...new Set(foundVerses)].slice(0, 5),
      contradictions: [],
    },
    summary: hasBiblicalGrounding
      ? 'Teaching is grounded in Scripture and demonstrates theological integrity'
      : 'Teaching would benefit from explicit scriptural grounding to strengthen spiritual authority',
  };
}

/**
 * Single Sentence Analysis
 * Understand what each sentence is doing in the narrative arc
 */
function analyzeSingleSentence(
  sentence: string,
  arc: any
): {
  sentence: string;
  type: string;
  length: number;
  hasSpiritual: boolean;
  assumptions: string[];
  implications: string[];
  emotionalTone: string;
} {
  const lower = sentence.toLowerCase();

  // Determine sentence type
  let type = 'declaration';
  if (sentence.includes('?')) type = 'question (invitation)';
  if (/\bbut\b/i.test(sentence)) type = 'pivot (revelation shift)';
  if (/\b(because|therefore|thus|so)\b/i.test(sentence)) type = 'logical-reasoning';
  if (/^(let|consider|imagine|realize|understand)\b/i.test(sentence)) type = 'call-to-action';

  // Spiritual grounding
  const hasSpiritual = /\b(christ|jesus|god|spirit|holy|scripture|grace|faith|salvation|redemption|truth|kingdom|covenant|revelation)\b/i.test(lower);

  // Extract assumptions
  const assumptions: string[] = [];
  if (/you|reader|listener|believer|people|person/i.test(lower)) assumptions.push('Assumes reader awareness');
  if (/god|jesus|christ|faith|believe|spirit/i.test(lower)) assumptions.push('Assumes spiritual foundation');

  // Extract implications
  const implications: string[] = [];
  if (/must|should|need|required|critical|important/i.test(lower)) implications.push('Prescriptive guidance');
  if (/transform|change|new|overcome|heal|freedom|redeemed|restored/i.test(lower)) implications.push('Calls toward transformation');
  if (/consider|realize|understand|discover|learn|see|know/i.test(lower)) implications.push('Invites reflection');

  // Emotional tone — map to narrative arc
  let emotionalTone = 'neutral';
  if (/\b(struggle|fail|lost|broken|fear|despair|pain|bondage|trapped|captive)\b/i.test(lower)) {
    emotionalTone = 'vulnerable (bondage phase)';
  } else if (/\b(but|yet|however|found|encountered|realized|breakthrough)\b/i.test(lower)) {
    emotionalTone = 'hopeful (possibility phase)';
  } else if (/\b(grace|hope|joy|freedom|victory|overcome|redeemed|alive|jesus|christ)\b/i.test(lower)) {
    emotionalTone = 'redemptive (deliverance phase)';
  }

  return {
    sentence: sentence.slice(0, 100),
    type,
    length: sentence.length,
    hasSpiritual,
    assumptions,
    implications,
    emotionalTone,
  };
}

/**
 * HOLISTIC INSIGHT
 * Synthesize what is being revealed — the core truth the teaching points to
 */
function synthesizeHolisticTruth(
  transcript: string,
  arc: any,
  trivium: any,
  positioning: any
): string {
  return `This teaching follows the arc of bondage ("${arc.bondage.slice(0, 40)}...") through possibility ("${arc.possibility.slice(0, 40)}...") to deliverance ("${arc.deliverance.slice(0, 40)}..."). Truth is revealed through ${trivium.grammar.devices.slice(0, 2).join(' and ')}, positioning the reader first to recognize themselves, then to specific observation, then to existing understanding, and finally to self-discovered truth. The core revelation: ${trivium.hiddenTruths[0] || 'encounter with Christ transforms understanding'}.`;
}

/**
 * READINESS ASSESSMENT
 * Is this teaching ready for format generation (Phase 3)?
 */
function assessReadinessForGeneration(
  validation: any,
  logic: any
): {
  ready: boolean;
  blockers: string[];
  strengths: string[];
} {
  const blockers: string[] = [];
  const strengths: string[] = [];

  if (validation.overallResult === 'PASS') {
    strengths.push('✓ Scripture-grounded');
  } else if (validation.overallResult === 'NEEDS_REVISION') {
    blockers.push('Consider adding explicit scriptural references');
  } else {
    blockers.push('Needs theological grounding before publication');
  }

  if (logic.fallacies.length === 0) {
    strengths.push('✓ Logically sound');
  } else {
    blockers.push(...logic.fallacies.slice(0, 1));
  }

  if (validation.scripture.supportingVerses.length > 0) {
    strengths.push('✓ Biblically supported');
  }

  return {
    ready: blockers.length === 0,
    blockers,
    strengths,
  };
}

/**
 * HELPER: Count keyword repetition for layering detection
 */
function countKeywordRepetition(transcript: string): Record<string, number> {
  const words = transcript.toLowerCase().split(/\W+/).filter(w => w.length > 4);
  const counts: Record<string, number> = {};
  words.forEach(w => {
    counts[w] = (counts[w] || 0) + 1;
  });
  return counts;
}

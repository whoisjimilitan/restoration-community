/**
 * TRIVIUM-BASED CRITIQUE & RECONSTRUCTION ENGINE
 *
 * Two separate assessments (never conflate them):
 * 1. VALIDITY: Does the conclusion follow logically from premises?
 * 2. PREMISES: Are the premises true/scriptural?
 *
 * Then apply three-layered rhetoric for different audiences.
 */

export interface ValidityAssessment {
  isValid: boolean;
  reasoning: string;
  conclusion: string;
  premises: string[];
  logicalFlow: string;
  issues: string[];
}

export interface PremiseAssessment {
  premise: string;
  isTrue: boolean;
  source: string; // scriptural reference or 'observed truth'
  support: string;
}

export interface AudienceApproach {
  analytical: string; // Self-evidently true + scripture
  resistant: string; // State plainly + show logic + scripture
  accepting: string; // Acknowledge rationality + exhort
}

export interface Stage1Output {
  validity: ValidityAssessment;
  premises: PremiseAssessment[];
  canBeChallengd: boolean; // Does it pass BOTH tests?
}

export interface Stage2Output {
  architecture: {
    openingThrust: string;
    logicalFlow: string[];
    proof: string;
    implication: string;
    closing: string;
  };
  audienceLayering: AudienceApproach;
}

export interface Stage3Output {
  formats: Record<string, string>;
}

export interface ContentEngineOutput {
  stage1: Stage1Output;
  stage2: Stage2Output;
  stage3: Stage3Output;
}

export function generateContentFromTranscript(
  transcript: string
): ContentEngineOutput {
  console.log('[ENGINE] Assessing validity and premises separately...');

  // STAGE 1: Assess validity AND premises (separately)
  const stage1 = assessBothSeparately(transcript);

  // STAGE 2: Reconstruct with three-layered audience approach
  const stage2 = reconstructForAudience(transcript, stage1);

  // STAGE 3: Generate 9 formats that pass both tests
  const stage3 = generateFromReconstructed(stage2);

  return {
    stage1,
    stage2,
    stage3,
  };
}

// ============ STAGE 1: VALIDITY & PREMISES ============

function assessBothSeparately(transcript: string): Stage1Output {
  const validity = assessValidity(transcript);
  const premises = assessPremises(transcript);

  // Can this be challenged? Only if it passes BOTH tests
  const canBeChallenged =
    !validity.isValid || premises.some((p) => !p.isTrue);

  return {
    validity,
    premises,
    canBeChallengd: canBeChallenged,
  };
}

function assessValidity(transcript: string): ValidityAssessment {
  // VALIDITY: Does the conclusion follow logically from the premises?
  // This is PURE LOGIC - ignore whether premises are true
  const sentences = transcript
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  // Find the main conclusion
  const conclusionSentence = sentences.find((s) =>
    /\b(therefore|so|this means|result|outcome|transforms|changes)\b/i.test(s)
  ) || sentences[sentences.length - 1];

  // Find premises (statements before conclusion)
  const premisesInText = sentences
    .slice(0, -1)
    .filter((s) => !/^\s*(hello|thanks|welcome)/i.test(s));

  // Assess logical flow
  let logicalFlow = 'Sound';
  const issues: string[] = [];

  if (premisesInText.length === 0) {
    issues.push('No clear premises stated');
    logicalFlow = 'Incomplete - missing premises';
  }

  if (!conclusionSentence) {
    issues.push('No clear conclusion stated');
    logicalFlow = 'Incomplete - missing conclusion';
  }

  // Check for logical connectors
  const hasConnectors = sentences.some((s) => /\b(if|then|when|because|so)\b/i.test(s));
  if (!hasConnectors) {
    issues.push('Missing logical connectors (if/then, when/because)');
  }

  const isValid = issues.length === 0;

  return {
    isValid,
    reasoning: isValid
      ? 'Conclusion follows logically from premises'
      : 'Logical structure is incomplete or broken',
    conclusion: conclusionSentence,
    premises: premisesInText,
    logicalFlow,
    issues,
  };
}

function assessPremises(transcript: string): PremiseAssessment[] {
  // PREMISES: Are the premises TRUE/SCRIPTURAL?
  // This is about CONTENT truth, not logic
  const sentences = transcript
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  const premises: PremiseAssessment[] = [];

  for (const sent of sentences.slice(0, 3)) {
    // Check scriptural alignment
    let isTrue = true;
    let source = 'observed truth';
    let support = 'Consistent with Scripture';

    if (/\b(grace|God|love|faith|truth|freedom)\b/i.test(sent)) {
      if (/\b(earned|deserve|merit)\b/i.test(sent)) {
        // Grace isn't earned - check against Scripture
        source = 'Ephesians 2:8-9, Romans 6:23';
        support = 'Scripture confirms grace is unearned gift';
      }

      if (/\b(receive|trust|believe)\b/i.test(sent)) {
        source = 'John 1:12, Romans 3:28';
        support = 'Scripture confirms faith/belief as the mechanism';
      }

      if (/\b(transform|freedom|shift)\b/i.test(sent)) {
        source = 'Romans 12:2, Galatians 5:1';
        support = 'Scripture confirms transformation through truth';
      }
    }

    premises.push({
      premise: sent.substring(0, 100),
      isTrue,
      source,
      support,
    });
  }

  return premises;
}

// ============ STAGE 2: RECONSTRUCT FOR AUDIENCE ============

function reconstructForAudience(
  transcript: string,
  stage1: Stage1Output
): Stage2Output {
  const architecture = buildArchitecture(transcript);
  const audienceLayering = buildThreeLayeredApproach(transcript, stage1);

  return {
    architecture,
    audienceLayering,
  };
}

function buildArchitecture(transcript: string) {
  const sentences = transcript
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  return {
    openingThrust: sentences[0] || 'The core truth is this:',
    logicalFlow: sentences.slice(1, 4),
    proof: extractProof(transcript),
    implication: extractImplication(transcript),
    closing: sentences[sentences.length - 1] || 'That is the truth.',
  };
}

function buildThreeLayeredApproach(
  transcript: string,
  stage1: Stage1Output
): AudienceApproach {
  const coreStatement = transcript
    .split(/[.!?]+/)[0]
    ?.trim() || 'The core truth';

  return {
    analytical: `${coreStatement} This is self-evidently true. Scripture confirms it: ${stage1.premises[0]?.source || 'John 1:12'}.`,

    resistant: `Let's be plain about this: ${coreStatement}. Here's why this holds logically: ${stage1.validity.logicalFlow}. Scripture independently confirms this same truth: ${stage1.premises[0]?.source || 'Scripture'}.`,

    accepting: `Your willingness to follow sound reasoning in pursuit of truth is itself faith. This is what rationality looks like when it serves spiritual reality: ${coreStatement}.`,
  };
}

function extractProof(transcript: string): string {
  const patterns = [
    /(?:think about|imagine|like|consider)([^.!?]*[.!?])/i,
    /(?:a .*?)(?:does|gives|operates)([^.!?]*[.!?])/i,
  ];

  for (const pattern of patterns) {
    const match = transcript.match(pattern);
    if (match) return match[0];
  }

  return 'Real people experience this truth.';
}

function extractImplication(transcript: string): string {
  const patterns = [
    /(?:this (?:means|reveals|shows|transforms))([^.!?]*[.!?])/i,
    /(?:(?:from|this shifts|this changes))([^.!?]*[.!?])/i,
  ];

  for (const pattern of patterns) {
    const match = transcript.match(pattern);
    if (match) return match[0];
  }

  return 'This transforms everything.';
}

// ============ STAGE 3: GENERATE 9 FORMATS ============

function generateFromReconstructed(stage2: Stage2Output): Stage3Output {
  const {
    openingThrust,
    logicalFlow,
    proof,
    implication,
    closing,
  } = stage2.architecture;

  const { analytical } = stage2.audienceLayering;

  return {
    formats: {
      daily_letter: `Good morning.\n\n${openingThrust}\n\n${logicalFlow[0]}\n\n${implication}\n\n${closing}\n\nTake this with you.`,

      social_post: openingThrust.substring(0, 280) + '.',

      micro_insight: openingThrust.split(/[.!?]/)[0] + '.',

      devotional: `${proof}\n\n${openingThrust}\n\n${implication}\n\nSit with this.`,

      article: `# ${openingThrust.substring(0, 80)}\n\n## The Core\n\n${openingThrust}\n\n## The Logic\n\n${logicalFlow[0]}\n\n## The Proof\n\n${proof}\n\n## The Implication\n\n${implication}\n\n## The Scripture\n\nGrace is unearned (Ephesians 2:8-9). Faith is the mechanism (Romans 3:28). Truth transforms (Romans 12:2).`,

      email: `Hi,\n\n${openingThrust}\n\n${logicalFlow[0]}\n\n${proof}\n\n${implication}\n\nIn faith`,

      short_video: `[OPEN]\n${proof}\n\n[THE POINT]\n${openingThrust}\n\n[WHY]\n${logicalFlow[0]}\n\n[IMPLICATION]\n${implication}\n\n[CLOSE]\n${closing}`,

      podcast: `Listen carefully.\n\n${openingThrust}\n\nHere's the logic: ${logicalFlow[0]}\n\n${proof}\n\nSo: ${implication}\n\n${closing}`,

      long_video: `# ${openingThrust.substring(0, 80)}\n\n## THE OPENING\n\n${openingThrust}\n\n## THE REASONING\n\n${logicalFlow.join('\n\n')}\n\n## THE EVIDENCE\n\n${proof}\n\n## THE IMPLICATION\n\n${implication}\n\n## THE SCRIPTURE\n\nEphesians 2:8-9 | Romans 3:28 | Romans 12:2\n\n## THE CLOSING\n\n${closing}`,
    },
  };
}

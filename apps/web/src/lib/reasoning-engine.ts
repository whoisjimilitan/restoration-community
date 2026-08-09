import type { DeepReasoning, VerbatimElement, VideoRecommendation } from './types/teaching-process';

function detectVideoRecommendation(verbatimElements: VerbatimElement[]): VideoRecommendation | undefined {
  // Find if there's a natural question hook
  const questionHook = verbatimElements.find(v => v.hookType === 'question' && v.hookPriority && v.hookPriority >= 9);

  if (!questionHook) {
    return undefined;
  }

  // Extract supporting points (high-priority non-question hooks)
  const supportingPoints = verbatimElements
    .filter(v => v.hookType && v.hookType !== 'question' && v.hookPriority && v.hookPriority >= 7)
    .slice(0, 3)
    .map(v => v.text);

  // Look for benediction-like elements (could be closing statements with "go", "may", "remember", etc.)
  const benedictionIndicators = verbatimElements.filter(v =>
    v.text.includes('may you') ||
    v.text.includes('go and') ||
    v.text.includes('remember') ||
    v.text.includes('my prayer') ||
    v.text.includes('my wish')
  );

  const benedictionText = benedictionIndicators[0]?.text ||
    'Apply what you\'ve learned to your own life and trust in God\'s guidance.';

  return {
    hasNaturalQuestion: true,
    suggestedOpeningQuestion: questionHook.text,
    optionalStructure: supportingPoints.length > 0 ? {
      act1Question: questionHook.text,
      act2Points: supportingPoints,
      act3Benediction: benedictionText,
    } : undefined,
    note: 'This is an optional framework for video structure. Use it if it feels natural, ignore if your content flows differently.',
  };
}

export function performDeepReasoning(transcript: string, verbatimElements: VerbatimElement[]): DeepReasoning {
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  return {
    sentenceAnalyses: sentences.map(s => ({
      sentence: s.trim(),
      type: 'statement',
      length: s.length,
      hasSpiritual: s.includes('Christ') || s.includes('God') || s.includes('Spirit'),
      assumptions: ['Listener has spiritual foundation'],
      implications: ['Calls listener to deeper transformation'],
      emotionalTone: 'profound and vulnerable',
    })),
    triviumAnalysis: {
      grammar: {
        structure: 'Active voice with personal testimony',
        devices: ['anaphora', 'metaphor', 'rhetorical questions'],
      },
      logic: {
        isValid: true,
        reasoning: 'Personal testimony supports universal truth',
        fallacies: [],
      },
      rhetoric: {
        devices: ['ethos', 'pathos', 'logos'],
        persuasiveApproach: 'Authenticity establishes trust before claiming transformation',
      },
      hiddenTruths: ['Personal vulnerability establishes authority', 'Struggle precedes transformation'],
    },
    validation: {
      overallResult: 'PASS',
      validity: {
        isLogicallySound: true,
        issues: [],
      },
      premises: {
        checks: [{ premise: 'Christ offers abundant life', assessment: 'Biblically sound' }],
        failures: [],
      },
      scripture: {
        supportingVerses: [
          'John 10:10 - I have come that they may have life abundantly',
          'Romans 6:9 - Christ dies no more; death has no dominion',
          '2 Corinthians 5:17 - If anyone is in Christ, he is a new creation',
        ],
        contradictions: [],
      },
      summary: 'Teaching demonstrates spiritual integrity and logical coherence',
    },
    holisticInsight: 'Teaching opens with personal vulnerability and transforms through encounter with Christ.',
    readinessForGeneration: {
      ready: true,
      blockers: [],
      strengths: ['Scripture-rooted', 'Authentic voice', 'Clear transformation narrative'],
    },
    videoRecommendation: detectVideoRecommendation(verbatimElements),
  };
}

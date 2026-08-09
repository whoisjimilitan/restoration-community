/**
 * HUMAN WRITING OPERATING SYSTEM
 * Quality filter for authenticity and human voice
 * Every sentence must pass these checks
 */

const AI_OPENINGS = [
  'in today\'s fast-paced world',
  'as technology continues',
  'it\'s important to note',
  'in an increasingly',
  'whether you\'re',
  'imagine a world where',
  'in the ever-changing landscape',
  'as we move forward',
  'in this modern era',
  'the fact of the matter is',
  'when you think about it',
];

const AI_TRANSITIONS = [
  'furthermore',
  'moreover',
  'additionally',
  'consequently',
  'therefore',
  'thus',
  'ultimately',
  'in conclusion',
  'overall',
  'in summary',
  'to summarize',
  'lastly',
  'finally',
];

const AI_BUZZWORDS = [
  'leverage',
  'synergy',
  'transformative',
  'revolutionize',
  'cutting-edge',
  'robust',
  'innovative',
  'streamline',
  'optimize',
  'empower',
  'seamless',
  'dynamic',
  'scalable',
  'holistic',
  'game-changing',
  'best practice',
  'in today\'s world',
  'going forward',
  'at the end of the day',
  'think about it this way',
];

export interface AuthenticityCheck {
  passed: boolean;
  issues: string[];
  suggestion?: string;
}

/**
 * Check if a sentence passes the Human Writing OS filter
 */
export function checkAuthenticityOfSentence(sentence: string): AuthenticityCheck {
  const issues: string[] = [];

  // Check for AI openings
  for (const opening of AI_OPENINGS) {
    if (sentence.toLowerCase().startsWith(opening)) {
      issues.push(`Starts with AI pattern: "${opening}"`);
    }
  }

  // Check for AI transitions mid-sentence
  for (const transition of AI_TRANSITIONS) {
    if (
      sentence.toLowerCase().includes(` ${transition} `) ||
      sentence.toLowerCase().startsWith(`${transition} `)
    ) {
      issues.push(`Uses AI transition word: "${transition}"`);
    }
  }

  // Check for buzzwords
  const buzzwordMatches = AI_BUZZWORDS.filter(
    (buzz) => sentence.toLowerCase().includes(buzz)
  );
  if (buzzwordMatches.length > 0) {
    issues.push(`Contains buzzwords: ${buzzwordMatches.join(', ')}`);
  }

  // Check for empty filler phrases
  const fillerPatterns = [
    /it's important to understand/i,
    /you need to know/i,
    /the key is/i,
    /the bottom line is/i,
    /what this means/i,
  ];

  for (const pattern of fillerPatterns) {
    if (pattern.test(sentence)) {
      issues.push(`Contains filler phrase that doesn't add substance`);
    }
  }

  // Check for specificity
  const isGeneric = /^(this is|that is|you should|you need|it can|it might|there are|some people)/i.test(
    sentence.trim()
  );
  if (isGeneric && sentence.length < 80) {
    issues.push(`Too generic. Needs specific detail or observation.`);
  }

  // Check for showing work (reasoning) in claims
  if (/therefore|thus|so|because/.test(sentence) === false) {
    // If it's a standalone claim without reasoning shown
    if (
      /should|must|need|important|key|critical/i.test(sentence) &&
      sentence.length < 100
    ) {
      issues.push(`Presents conclusion without showing reasoning`);
    }
  }

  // Check for sounding like marketing
  const marketingPatterns = [
    /discover the secret/i,
    /game-changing/i,
    /unlock your/i,
    /transform your/i,
    /don't miss out/i,
    /limited time/i,
  ];

  for (const pattern of marketingPatterns) {
    if (pattern.test(sentence)) {
      issues.push(`Sounds like marketing copy`);
    }
  }

  return {
    passed: issues.length === 0,
    issues,
  };
}

/**
 * Check an entire text block for authenticity
 */
export function checkAuthenticityOfText(text: string): {
  passed: boolean;
  totalSentences: number;
  failedSentences: number;
  issues: Array<{ sentence: string; issues: string[] }>;
} {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const failedChecks: Array<{ sentence: string; issues: string[] }> = [];

  sentences.forEach((sent) => {
    const check = checkAuthenticityOfSentence(sent);
    if (!check.passed) {
      failedChecks.push({
        sentence: sent.trim(),
        issues: check.issues,
      });
    }
  });

  return {
    passed: failedChecks.length === 0,
    totalSentences: sentences.length,
    failedSentences: failedChecks.length,
    issues: failedChecks,
  };
}

/**
 * Rewrite a sentence to pass authenticity checks
 * This PRESERVES original meaning while removing AI patterns
 */
export function authorizeForHumanVoice(sentence: string): string {
  let rewritten = sentence.trim();

  // Remove AI openings
  for (const opening of AI_OPENINGS) {
    const regex = new RegExp(`^${opening}\\s*`, 'i');
    rewritten = rewritten.replace(regex, '');
  }

  // Replace AI transitions with natural ones
  const transitionMap: Record<string, string> = {
    'furthermore': '',
    'moreover': '',
    'additionally': 'also',
    'consequently': 'so',
    'therefore': 'so',
    'thus': 'so',
    'ultimately': '',
    'in conclusion': '',
    'overall': '',
    'in summary': '',
  };

  for (const [aiWord, replacement] of Object.entries(transitionMap)) {
    const regex = new RegExp(`\\b${aiWord}\\b`, 'gi');
    rewritten = rewritten.replace(regex, replacement);
  }

  // Replace buzzwords with plain language
  const buzzwordMap: Record<string, string> = {
    'leverage': 'use',
    'empower': 'enable',
    'streamline': 'simplify',
    'optimize': 'improve',
    'transformative': '',
    'innovative': 'new',
    'robust': 'solid',
    'seamless': 'smooth',
    'at the end of the day': '',
  };

  for (const [buzz, replacement] of Object.entries(buzzwordMap)) {
    const regex = new RegExp(`\\b${buzz}\\b`, 'gi');
    rewritten = rewritten.replace(regex, replacement);
  }

  // Clean up double spaces
  rewritten = rewritten.replace(/\s+/g, ' ').trim();

  // Remove trailing periods and add one
  rewritten = rewritten.replace(/[.!?]+$/, '') + '.';

  return rewritten;
}

/**
 * Filter a piece of content through the Human Writing OS
 * Returns the cleaned version (removes AI patterns, preserves structure and voice)
 */
export function filterThroughHumanOS(content: string): string {
  let cleaned = content.trim();

  // Remove AI openings (paragraph-level)
  for (const opening of AI_OPENINGS) {
    const regex = new RegExp(`^${opening}\\s*`, 'im');
    cleaned = cleaned.replace(regex, '');
  }

  // Replace AI transitions with natural ones or remove them
  const transitionMap: Record<string, string> = {
    'furthermore': '',
    'moreover': '',
    'additionally': 'also',
    'consequently': 'so',
    'therefore': 'so',
    'thus': 'so',
    'ultimately': '',
    'in conclusion': '',
    'overall': '',
    'in summary': '',
  };

  for (const [aiWord, replacement] of Object.entries(transitionMap)) {
    const regex = new RegExp(`\\b${aiWord}\\b`, 'gi');
    cleaned = cleaned.replace(regex, replacement);
  }

  // Replace buzzwords with plain language
  const buzzwordMap: Record<string, string> = {
    'leverage': 'use',
    'empower': 'enable',
    'streamline': 'simplify',
    'optimize': 'improve',
    'transformative': '',
    'innovative': 'new',
    'robust': 'solid',
    'seamless': 'smooth',
    'at the end of the day': '',
  };

  for (const [buzz, replacement] of Object.entries(buzzwordMap)) {
    const regex = new RegExp(`\\b${buzz}\\b`, 'gi');
    cleaned = cleaned.replace(regex, replacement);
  }

  // Clean up excessive spaces within lines but preserve paragraph breaks
  cleaned = cleaned.replace(/[ \t]+/g, ' '); // Collapse horizontal spaces
  cleaned = cleaned.replace(/\n\n\n+/g, '\n\n'); // Collapse excessive line breaks
  cleaned = cleaned.trim();

  return cleaned;
}

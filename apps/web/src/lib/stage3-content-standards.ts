/**
 * Stage 3 Content Standards
 * Non-negotiable guardrails for all extracted and generated content
 * These are absolute. Every piece is evaluated against them before release.
 */

export const IDENTITY_RULES = {
  jesusCentred: 'Jesus Christ is the centre, not the backdrop. Every piece must arrive at Him as the answer.',
  brotherJimiAsGuide: 'Brother Jimi is never the destination. He points. He does not become the thing being pointed to.',
  fullNameUsage: 'Always use the full name: Jesus Christ. Never "Jesus" alone in teaching moments.',
  connectionOverPerfection: 'Polished distance is the enemy. Write like a conversation between two people figuring it out.',
  clarityOverPerfection: 'Simplicity is the presence of clarity. If a line requires explanation, it has failed.',
  neverSelfHelpVeneer: 'Never make this sound like self-help with a faith veneer. Faith is not a productivity strategy.',
  messyPartsAreTruth: 'The messy parts are connective tissue. Disappointment is where the audience lives.',
  errorsAreRefiners: 'Frame struggle as character formation, not evidence of failure. Brokenness is workable material.',
  journeyIsTheDream: 'The walk itself, with all its uncertainty, is the point. Not the outcome or metrics.',
  startBeforeReady: 'Never write toward a version of faith that requires everything in order first.',
};

export const STORY_STRUCTURE = {
  situation: 'Establish the starting point. Be specific. One person, one moment, one texture of reality.',
  desire: 'What are they reaching for? Human desire, not spiritual abstraction.',
  conflict: 'Name the obstacle with precision. Concrete conflict produces recognition.',
  change: 'The turning point. A shift in perspective, understanding, or willingness to see.',
  result: 'The new reality. Honest difference, not triumph. Focus on internal movement.',
};

export const HOOK_STANDARDS = {
  inMediaRes: 'Drop into the middle of a moment without context. Start inside the moment.',
  contradictionHook: 'State what was achieved, then make it feel wrong. Hold the gap until listener must stay.',
  hardStatement: 'One declarative sentence. No warm-up. The sharpest version of the truth delivered first.',
};

export const TONE_STANDARDS = {
  honest: 'Say the true thing before the comfortable thing. Always choose honest.',
  raw: 'Unprocessed emotion is more trustworthy. Write the feeling as it existed, not as it was later understood.',
  personal: 'Write to one person. Use "you" with the weight of knowing who that person is.',
  conversational: 'Two people talking, not a preacher. Short sentences. Incomplete thoughts where natural.',
  neverOverPolished: 'If it sounds written, rewrite until it sounds said. Professional distance is failure.',
};

export const LANGUAGE_STANDARDS = {
  noClichés: 'If the phrase has appeared on a Christian poster or motivational account, cut it.',
  noVague: 'Every claim grounded in something visible, specific, or concrete.',
  noFiller: 'Every sentence earns its place or is removed.',
  noPassiveVoice: 'Active voice always.',
  noPreaching: 'Do not tell what to believe. Lead to truth and let them arrive.',
  noMenus: 'Never list what the content will cover. Show it instead.',
  shortDefault: 'Short sentences are default. Long sentences must earn their length.',
  oneIdea: 'One clear idea per sentence. One clear idea per piece.',
  concreteDetail: 'Observable detail over abstraction at every decision point.',
};

export const EVALUATION_FILTER = [
  'Is the scene or moment clear and visible?',
  'Is the conflict specific enough to be recognizable?',
  'Is the internal transformation present — not just the external event?',
  'Is Jesus Christ the centre — not a supporting character?',
  'Is Brother Jimi the guide — not the destination?',
  'Is the language concrete and free of cliché?',
  'Is every sentence earning its place?',
  'Does the hook create genuine tension or curiosity?',
  'Does the ending leave one question open — not a tidy resolution?',
  'Could this content exist without Jesus Christ at its core? (Should be NO)',
];

export const FINAL_STANDARDS = {
  clear: 'Understood on first hearing, no explanation required',
  concrete: 'Grounded in specific moments, not abstract principles',
  original: 'No borrowed phrases, no clichés, no recycled spiritual language',
  emotionallyTrue: 'The feeling must be real before the insight is offered',
  spirituallyWeighty: 'Jesus Christ must be present as the actual answer, not a reference',
  christCentred: 'Not as a theme but as the gravitational centre of the entire piece',
  ready: 'Not a draft toward something better, but the thing itself',
};

/**
 * Evaluate whether content passes all standards
 * Returns true only if ALL standards are met
 */
export function evaluateContentAgainstStandards(content: string): {
  passes: boolean;
  failedCriteria: string[];
  warnings: string[];
} {
  const failedCriteria: string[] = [];
  const warnings: string[] = [];

  // Check for Jesus Christ presence
  const jesusCount = (content.match(/Jesus Christ|Jesus|Christ/gi) || []).length;
  if (jesusCount === 0) {
    failedCriteria.push('Jesus Christ is not present in the content');
  }
  if (jesusCount < 2) {
    warnings.push('Jesus Christ appears less than twice; consider strengthening presence');
  }

  // Check for clichés
  const clichés = [
    'blessed',
    'favored',
    'on this journey',
    'walk with God',
    'trust the process',
    'everything happens for a reason',
    'God has a plan',
    'thoughts and prayers',
  ];
  const foundClichés = clichés.filter(c => content.toLowerCase().includes(c));
  if (foundClichés.length > 0) {
    failedCriteria.push(`Clichés found: ${foundClichés.join(', ')}`);
  }

  // Check for self-help language
  const selfHelpPhrases = ['best version of yourself', 'unlock', 'potential', 'breakthrough', 'manifest'];
  const foundSelfHelp = selfHelpPhrases.filter(p => content.toLowerCase().includes(p));
  if (foundSelfHelp.length > 0) {
    warnings.push(
      `Self-help language detected: ${foundSelfHelp.join(', ')}. Verify this is not self-help with faith veneer.`
    );
  }

  // Check for passive voice
  const passiveIndicators = [' is ', ' was ', ' been ', ' are ', ' were '];
  const passiveCount = passiveIndicators.filter(p => content.includes(p)).length;
  if (passiveCount > 3) {
    warnings.push('High passive voice usage. Consider rewriting for active voice.');
  }

  // Check for concrete detail
  if (content.split('\n').length < 3) {
    warnings.push('Content is quite brief. Ensure concrete details are included.');
  }

  return {
    passes: failedCriteria.length === 0,
    failedCriteria,
    warnings,
  };
}

/**
 * Check if Brother Jimi is positioned correctly (as guide, not destination)
 */
export function validateBrotherJimiPositioning(content: string): boolean {
  const invalidPhrases = ['Brother Jimi is the way', 'follow Brother Jimi', 'Brother Jimi teaches you', 'Brother Jimi shows'];

  const invalid = invalidPhrases.some(phrase => content.toLowerCase().includes(phrase.toLowerCase()));

  return !invalid;
}

/**
 * Score content quality against standards (0-100)
 */
export function scoreContentQuality(content: string): number {
  let score = 100;

  const evaluation = evaluateContentAgainstStandards(content);

  // Deduct for failed criteria
  score -= evaluation.failedCriteria.length * 20;

  // Deduct for warnings
  score -= evaluation.warnings.length * 5;

  // Check Jesus Christ centrality more strictly
  if (!content.toLowerCase().includes('jesus christ')) {
    score -= 15;
  }

  // Check for genuine transformation narrative
  const transformationIndicators = ['realized', 'shifted', 'understood', 'saw', 'discovered', 'changed'];
  const hasTransformation = transformationIndicators.some(i => content.toLowerCase().includes(i));
  if (!hasTransformation) {
    score -= 10;
  }

  // Check for concrete details
  const wordCount = content.split(' ').length;
  if (wordCount < 50) {
    score -= 5;
  }

  return Math.max(0, Math.min(100, score));
}

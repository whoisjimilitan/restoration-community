export interface GeneratorInput {
  narrative: string;
  elements: {
    revelation: string;
    contrast: string;
    coreMessage: string;
    identityChoice?: string;
    callToAction?: string;
  };
  frame?: string;
}

export interface AllFormats {
  dailyLetter: string;
  socialPost: string;
  microInsight: string;
  devotional: string;
  article: string;
  shortVideo: string;
  longVideo: string;
  podcastMoment: string;
  email: string;
}

/**
 * Generates all 9 formats from a single narrative
 */
export function generateAllFormats(input: GeneratorInput): AllFormats {
  console.log('[GENERATOR] Generating all 9 formats');

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

This is not about what you have done. This is about who you are choosing right now.

${input.elements.contrast}

${input.elements.coreMessage}

The power is yours. Always has been. Always will be.

With faith,
Brother Jimi`;
}

function generateSocialPost(input: GeneratorInput): string {
  const hook = input.narrative.split('.')[0];
  const truncated = input.elements.revelation.substring(0, 80);
  const post = `${hook}.\n\n${truncated}...`;

  if (post.length > 280) {
    return `${hook}.\n\n${input.elements.callToAction || 'The power is yours.'}`;
  }
  return post;
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
  const title = input.elements.revelation.split('.')[0];

  return `# ${title}

${input.narrative}

## The Truth

${input.elements.revelation}

## The Contrast

${input.elements.contrast}

## The Choice

${input.elements.coreMessage}

The power is yours to choose. What will you do?`;
}

function generateShortVideo(input: GeneratorInput): string {
  const narrative = input.narrative;
  const firstSentence = narrative.split('.')[0];

  return `[OPEN - 10 seconds]
${firstSentence}.

[BODY - 40 seconds]
${narrative}

[TURN - 5 seconds]
${input.elements.revelation}

[CLOSE - 5 seconds]
${input.elements.coreMessage}`;
}

function generateLongVideo(input: GeneratorInput): string {
  return `[OPEN - 30 seconds]
${input.narrative.split('.')[0]}.

[STORY - 3 minutes]
${input.narrative}

[TEACHING - 5 minutes]
${input.elements.revelation}

${input.elements.contrast}

[APPLICATION - 3 minutes]
${input.elements.coreMessage}

[CLOSE - 1 minute]
The power is yours. That is the truth.`;
}

function generatePodcastMoment(input: GeneratorInput): string {
  return `[Conversational, 90 seconds]

${input.narrative}

That is the thing most people miss. ${input.elements.revelation}

Think about it this way: ${input.elements.contrast}

So here is what matters: ${input.elements.coreMessage}`;
}

function generateEmail(input: GeneratorInput): string {
  return `Hi there,

${input.narrative}

I wanted to share this with you because ${input.elements.revelation}

Most people believe ${input.elements.contrast}

But here is what I know to be true: ${input.elements.coreMessage}

Take it to heart.

Brother Jimi`;
}

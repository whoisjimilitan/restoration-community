/**
 * TEACHING FORMATTER
 * Generates 7 publication-ready formats from DigestedTeaching
 * Using Brother Jimi's authentic voice throughout
 */

import type { DigestedTeaching } from './teaching-digester';

export interface FormattedOutput {
  format: 'article' | 'email' | 'facebook' | 'twitter' | 'instagram' | 'podcast' | 'video';
  content: string;
  hooks: string[];
  cta: string;
}

/**
 * Generate all 7 formats from digested teaching
 * Each format applies Brother Jimi voice: specific, direct, authentic
 */
export function generateAllFormats(digested: DigestedTeaching): FormattedOutput[] {
  return [
    generateArticle(digested),
    generateEmail(digested),
    generateFacebook(digested),
    generateTwitter(digested),
    generateInstagram(digested),
    generatePodcast(digested),
    generateVideo(digested),
  ];
}

function generateArticle(digested: DigestedTeaching): FormattedOutput {
  const { revelation, mechanism, cost, transformation, keyPhrases, primaryMovement } = digested;

  // Article structure: Problem → Realization → Mechanism → Application
  let content = '';

  // Opening hook (specific to avoid AI pattern)
  if (primaryMovement === 'conviction') {
    content += `**Most people believe this.**\n\n${keyPhrases[0] || revelation}\n\n`;
  } else if (primaryMovement === 'realization') {
    content += `**Here's what I realized.**\n\n${revelation}\n\n`;
  } else if (primaryMovement === 'confession') {
    content += `**I spent years getting this wrong.**\n\n${keyPhrases[0] || revelation}\n\n`;
  }

  // The mechanism (how it works)
  content += `**Here's what actually happens:**\n\n${mechanism}\n\n`;

  // The cost
  content += `**If you miss this:**\n\n${cost}\n\n`;

  // The transformation
  content += `**When you understand it:**\n\n${transformation}\n\n`;

  // Closing with application
  content += `**What this means for you right now:**\n\n${keyPhrases[keyPhrases.length - 1] || 'This is not theory. This is lived reality.'}`;

  return {
    format: 'article',
    content,
    hooks: [keyPhrases[0] || revelation, mechanism],
    cta: 'Consider how this shifts your understanding today.',
  };
}

function generateEmail(digested: DigestedTeaching): FormattedOutput {
  const { revelation, mechanism, transformation, keyPhrases } = digested;

  const content = `Hi,

I came across something that shifted how I see this.

${keyPhrases[0] || revelation}

Here's the mechanism: ${mechanism}

The transformation that becomes possible: ${transformation}

I thought you should see this.

${keyPhrases[keyPhrases.length - 1] || 'This changes everything.'}`;

  return {
    format: 'email',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Reply and let me know what you think.',
  };
}

function generateFacebook(digested: DigestedTeaching): FormattedOutput {
  const { revelation, mechanism, keyPhrases, themes } = digested;

  const content = `${keyPhrases[0] || revelation}

${mechanism}

Here's what most people miss: it's not about believing. It's about understanding the mechanism.

${keyPhrases[keyPhrases.length - 1] || 'The truth is simpler than you think.'}

${themes.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`;

  return {
    format: 'facebook',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'What does this reveal for you? Share below.',
  };
}

function generateTwitter(digested: DigestedTeaching): FormattedOutput {
  const { keyPhrases, cost, transformation } = digested;

  const tweets = [
    `Tweet 1:\n${keyPhrases[0] || 'Most people get this wrong.'}`,
    `Tweet 2:\nThe cost of missing this: ${cost.substring(0, 100)}...`,
    `Tweet 3:\nWhat becomes possible: ${transformation.substring(0, 100)}...`,
    `Tweet 4:\n${keyPhrases[1] || 'This is not about belief. This is about understanding.'}`,
  ].join('\n\n');

  return {
    format: 'twitter',
    content: tweets,
    hooks: keyPhrases.slice(0, 2),
    cta: 'RT if this lands.',
  };
}

function generateInstagram(digested: DigestedTeaching): FormattedOutput {
  const { revelation, mechanism, transformation, keyPhrases, themes } = digested;

  const content = `${keyPhrases[0] || revelation}

${mechanism}

When you see this clearly:
${transformation}

.\n.\n.\n

${themes.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`;

  return {
    format: 'instagram',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Save this. Share it. Live it.',
  };
}

function generatePodcast(digested: DigestedTeaching): FormattedOutput {
  const { fullTeaching, revelation, mechanism, transformation, keyPhrases } = digested;

  const content = `[INTRO - 0:00]
${keyPhrases[0] || revelation}

[TEACHING - 0:30]
Here's what most people miss:
${mechanism}

The cost of ignoring this:
${digested.cost}

[DEEPENING - 3:00]
${fullTeaching.substring(0, 500)}...

[TRANSFORMATION - 8:00]
${transformation}

[CLOSING - 9:00]
${keyPhrases[keyPhrases.length - 1] || 'This is lived reality.'}

Runtime: 10-12 minutes`;

  return {
    format: 'podcast',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Subscribe and share this with someone who needs to hear it.',
  };
}

function generateVideo(digested: DigestedTeaching): FormattedOutput {
  const { keyPhrases, revelation, mechanism, transformation } = digested;

  const content = `[OPEN - 0:00-0:05]
[Direct eye contact, pause]
${keyPhrases[0] || revelation}

[BODY - 0:05-0:45]
Here's how this works:
${mechanism}

What becomes possible:
${transformation}

[CLOSE - 0:45-1:00]
[Pause, lean in]
This is not theory.

${keyPhrases[keyPhrases.length - 1] || 'This is lived reality.'}

[NOTES: Simple background, deliberate pacing, direct address]`;

  return {
    format: 'video',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Watch the full teaching. Share it.',
  };
}

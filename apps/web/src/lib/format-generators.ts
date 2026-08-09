/**
 * FORMAT GENERATORS
 * Each format gets its own intelligent generator
 */

import type { ExtractedMessage } from './message-extractor';

export interface FormatOutputs {
  dailyLetter: string;
  socialPost: string;
  microInsight: string;
  devotional: string;
  articleExcerpt: string;
  shortVideoScript: string;
  longVideoScript: string;
  podcastMoment: string;
  email: { subject: string; body: string };
}

export function generateAllFormats(message: ExtractedMessage): FormatOutputs {
  return {
    dailyLetter: generateDailyLetter(message),
    socialPost: generateSocialPost(message),
    microInsight: generateMicroInsight(message),
    devotional: generateDevotional(message),
    articleExcerpt: generateArticle(message),
    shortVideoScript: generateShortVideo(message),
    longVideoScript: generateLongVideo(message),
    podcastMoment: generatePodcast(message),
    email: generateEmail(message),
  };
}

function generateDailyLetter(msg: ExtractedMessage): string {
  return `Good morning.

${msg.coreRevelation}.

${msg.mechanism}

This is what I want you to sit with today. Not the idea. The reality in your actual life.

In faith,
Brother Jimi`;
}

function generateSocialPost(msg: ExtractedMessage): string {
  const post = msg.hookFormula.includes('Conviction')
    ? `Most people don't realize: ${msg.coreRevelation.toLowerCase()}.`
    : msg.coreRevelation;

  return post.length > 280 ? post.substring(0, 277) + '…' : post;
}

function generateMicroInsight(msg: ExtractedMessage): string {
  return msg.coreRevelation.endsWith('.') ? msg.coreRevelation : msg.coreRevelation + '.';
}

function generateDevotional(msg: ExtractedMessage): string {
  return `${msg.coreRevelation}.

${msg.mechanism}

What changes when you actually live this?`;
}

function generateArticle(msg: ExtractedMessage): string {
  return `# The Core Truth

${msg.coreRevelation}.

## How It Works

${msg.mechanism}

## Why This Matters

${msg.cost}

## What Changes

${msg.transformation}`;
}

function generateShortVideo(msg: ExtractedMessage): string {
  return `${msg.hookFormula === 'Conviction Hook' ? 'Most people get this wrong.' : 'Something I realized.'}

[PAUSE]

${msg.coreRevelation}.

${msg.mechanism}

That's where transformation happens.`;
}

function generateLongVideo(msg: ExtractedMessage): string {
  return `[OPEN]
${msg.hookFormula === 'Conviction Hook' ? 'Most believers misunderstand this.' : 'I spent years getting this wrong.'}

[THE PROBLEM]
${msg.cost}

[THE REVELATION]
${msg.coreRevelation}.

[HOW IT WORKS]
${msg.mechanism}

[THE TRANSFORMATION]
${msg.transformation}

[CLOSE]
That's your actual life changing.`;
}

function generatePodcast(msg: ExtractedMessage): string {
  return `[PODCAST MOMENT]

"${msg.coreRevelation}."

${msg.mechanism}

That's not theology. That's your life changing.`;
}

function generateEmail(msg: ExtractedMessage): { subject: string; body: string } {
  return {
    subject: 'A truth worth sitting with',
    body: `Hi there,

${msg.coreRevelation}.

${msg.mechanism}

${msg.transformation}

What would change if you actually applied this today?

Best,
Jimi`,
  };
}

/**
 * SIMPLE CONTENT ENGINE
 * Takes raw transcript → Produces 9 publication-ready formats
 * Clean, direct, no complexity
 */

export interface ContentOutput {
  transcript: string;
  title: string;
  core_message: string;
  formats: {
    daily_letter: string;
    social_post: string;
    micro_insight: string;
    devotional: string;
    article: string;
    email: string;
    short_video: string;
    podcast: string;
    long_video: string;
  };
}

export function generateContentFromTranscript(transcript: string): ContentOutput {
  console.log('[CONTENT-ENGINE] Processing transcript...');

  // Extract title and core message
  const title = extractTitle(transcript);
  const coreMessage = extractCoreMessage(transcript);
  const keyQuote = extractKeyQuote(transcript);

  const formats = {
    daily_letter: generateDailyLetter(title, coreMessage, keyQuote),
    social_post: generateSocialPost(coreMessage),
    micro_insight: generateMicroInsight(coreMessage),
    devotional: generateDevotional(title, coreMessage, keyQuote),
    article: generateArticle(title, coreMessage, keyQuote),
    email: generateEmail(title, coreMessage),
    short_video: generateShortVideo(coreMessage, keyQuote),
    podcast: generatePodcast(title, coreMessage, keyQuote),
    long_video: generateLongVideo(title, coreMessage, keyQuote),
  };

  console.log('[CONTENT-ENGINE] Generated 9 formats');

  return {
    transcript,
    title,
    core_message: coreMessage,
    formats,
  };
}

function extractTitle(transcript: string): string {
  const titleMatch = transcript.match(/(?:title|message|teach).*?["']([^"']+)["']/i);
  if (titleMatch) return titleMatch[1].trim();

  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 20);
  return sentences[0]?.substring(0, 60) || 'Teaching';
}

function extractCoreMessage(transcript: string): string {
  const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 30);
  return sentences.slice(1, Math.min(4, sentences.length)).join(' ').trim();
}

function extractKeyQuote(transcript: string): string {
  const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 40);
  return sentences[0] || transcript.substring(0, 200);
}

function generateDailyLetter(title: string, message: string, quote: string): string {
  return `Good morning.

${quote}

What stands out here is this: ${message}

This is the shift. When you truly understand this, everything changes.

Take this with you today.

In faith`;
}

function generateSocialPost(message: string): string {
  const lines = message.split('. ').slice(0, 2);
  const post = lines.join('. ').substring(0, 280);
  return post.endsWith('.') ? post : post + '.';
}

function generateMicroInsight(message: string): string {
  return message.split('.')[0] + '.';
}

function generateDevotional(title: string, message: string, quote: string): string {
  return `${quote}

${message}

What happens when you truly receive this? Sit with it.`;
}

function generateArticle(title: string, message: string, quote: string): string {
  return `# ${title}

## The Truth

${quote}

## What This Means

${message}

## How to Live This

This is not theory. This is transformation. The person who understands this becomes free—not from difficulty, but free within it.`;
}

function generateEmail(title: string, message: string): string {
  return `Hi there,

I came across something today that I think matters.

${message}

Here's what stands out to me: This changes everything.

If this is landing with you, I'd love to know what you're thinking.

In faith`;
}

function generateShortVideo(message: string, quote: string): string {
  return `[OPEN]
${quote}

[KEY INSIGHT]
${message}

[CLOSE]
That's not comfort. That's freedom.`;
}

function generatePodcast(title: string, message: string, quote: string): string {
  return `So here's what I want you to understand about this.

${quote}

Listen to what this reveals: ${message}

That's the shift. That's where everything changes.

That's your reality.`;
}

function generateLongVideo(title: string, message: string, quote: string): string {
  return `# ${title}

[OPEN]
${quote}

[THE MESSAGE]
${message}

[APPLICATION]
What does this look like in your world right now?

[CLOSE]
This is kingdom reality. This is freedom.`;
}

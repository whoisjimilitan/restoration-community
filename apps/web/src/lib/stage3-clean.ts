/**
 * Stage 3: Quotable-Centered Format Generation
 * Each format strategically features the quotable statement differently
 * Remix around the quotable, don't wrap content in format boxes
 */

export interface Stage3Input {
  quotable: string;      // The standout memorable line (anchor for all formats)
  revelation: string;    // The core truth
  context: string;       // Supporting context
  title: string;        // Mini-message title
}

export interface Stage3Output {
  quotable: string;
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

export function generateStage3Formats(input: Stage3Input): Stage3Output {
  const { quotable, revelation, context, title } = input;

  return {
    quotable,
    dailyLetter: generateDailyLetter(quotable, revelation, context),
    socialPost: generateSocialPost(quotable),
    microInsight: generateMicroInsight(quotable),
    devotional: generateDevotional(quotable, revelation, context),
    article: generateArticle(title, quotable, revelation, context),
    shortVideo: generateShortVideo(quotable, context),
    longVideo: generateLongVideo(title, quotable, revelation, context),
    podcastMoment: generatePodcastMoment(quotable, revelation, context),
    email: generateEmail(quotable, revelation, context),
  };
}

// Daily Letter: Lead with quotable, expand around it with meditation
function generateDailyLetter(quotable: string, revelation: string, context: string): string {
  return `Good morning.

${quotable}

This is the invitation today. Not to change your circumstances. To change how you see them.

${extractFirstSentence(context) || revelation}

When you truly believe this—not just understand it intellectually, but let it settle in your spirit—everything shifts. Not your situation. Your freedom.

Take it to heart.

With faith,
Brother Jimi`;
}

// Social Post: IS the quotable statement (tweet-length)
function generateSocialPost(quotable: string): string {
  const trimmed = quotable.length > 280
    ? quotable.substring(0, 277) + '…'
    : quotable;

  return trimmed;
}

// Micro Insight: IS the quotable statement (standalone quotable)
function generateMicroInsight(quotable: string): string {
  return quotable.endsWith('.') || quotable.endsWith('!') || quotable.endsWith('?')
    ? quotable
    : quotable + '.';
}

// Devotional: Feature quotable prominently, add reflective question
function generateDevotional(quotable: string, revelation: string, context: string): string {
  const contextLine = extractFirstSentence(context) || revelation;

  return `${quotable}

That's the promise. That's the invitation.

${contextLine}

The question for you today: What would change if you truly believed this? Not just in your mind, but in your heart?

Sit with that.`;
}

// Article: Use quotable as core anchor, build thesis around it
function generateArticle(title: string, quotable: string, revelation: string, context: string): string {
  const contextLines = context.split(/[.!?]+/).filter(s => s.trim()).slice(0, 3);

  return `# ${title}

## The Truth

${quotable}

## What This Means

${revelation}

## How It Works

${contextLines.slice(0, 2).map(s => s.trim()).join('\n\n')}

## The Real Question

This isn't about whether this is true. It is. The question is what you will do with it.

The person who understands this—truly understands it in their bones—finds a freedom that no circumstance can touch. That is the transformation available to you today.`;
}

// Short Video: Lead with quotable, quick close (60-90 seconds script)
function generateShortVideo(quotable: string, context: string): string {
  const hook = extractFirstSentence(context) || "Here's what needs to shift in how you see this.";

  return `[OPEN]
${hook}

[QUOTE]
"${quotable}"

[CLOSE]
That's not comfort. That's freedom.`;
}

// Long Video: Quotable as core anchor, expand around it with teaching (15-20 min script)
function generateLongVideo(title: string, quotable: string, revelation: string, context: string): string {
  const contextSections = context.split(/[.!?]+/).filter(s => s.trim());

  return `# ${title}

[OPEN]
${contextSections[0] || "Here's what I want you to understand."}

[THE TRUTH]
${quotable}

[UNPACK IT]
${revelation}

[EXPAND]
${contextSections.slice(1, 3).map(s => s.trim()).join('\n\n') || 'This is how it works in your life.'}

[APPLICATION]
What does this look like in your world right now?

[CLOSE]
This is the kingdom reality. This is freedom.`;
}

// Podcast: Quote it verbatim, speak around it conversationally
function generatePodcastMoment(quotable: string, revelation: string, context: string): string {
  return `So here's what I want you to understand about this.

${extractFirstSentence(context) || revelation}

But listen to this: "${quotable}"

That's the shift. That's where most people miss it. They know the words, but they don't feel the freedom.

${revelation}

That changes everything.`;
}

// Email: Feature quotable prominently in opening or closing
function generateEmail(quotable: string, revelation: string, context: string): string {
  return `Hi there,

I came across something today that I think matters for you.

${extractFirstSentence(context) || revelation}

Here's what stands out to me:

"${quotable}"

This isn't about your circumstances changing. It's about your freedom changing. And that's available to you right now.

If this is landing with you, I'd love to hear what you're thinking.

In faith,
Brother Jimi`;
}

function extractFirstSentence(text: string): string {
  if (!text) return '';
  const match = text.match(/^([^.!?]+[.!?])/);
  return match ? match[1].trim() : text.split(/[.!?]+/)[0].trim();
}

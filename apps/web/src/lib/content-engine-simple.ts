/**
 * INTELLIGENT CONTENT ENGINE
 * Takes raw transcript → Extracts quotables → Identifies story moments → Produces 9 formats
 * Each format: ONE REAL MOMENT + ONE BIBLE VERSE + Narrative-first storytelling
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
  console.log('[CONTENT-ENGINE] Processing transcript intelligently...');

  // Stage 1: Extract quotable statements
  const quotables = extractQuotables(transcript);
  console.log(`[CONTENT-ENGINE] Extracted ${quotables.length} quotable statements`);

  // Stage 2: Identify the core revelation + story moment
  const revelation = identifyRevelation(quotables, transcript);
  const storyMoment = extractStoryMoment(transcript);
  const bibleVerse = suggestBibleVerse(revelation, storyMoment);

  console.log(`[CONTENT-ENGINE] Revelation: "${revelation}"`);
  console.log(`[CONTENT-ENGINE] Story moment found: ${storyMoment ? 'yes' : 'no'}`);
  console.log(`[CONTENT-ENGINE] Bible anchor: ${bibleVerse}`);

  // Stage 3: Generate 9 story-driven formats
  const formats = {
    daily_letter: generateDailyLetter(revelation, storyMoment, bibleVerse),
    social_post: generateSocialPost(revelation),
    micro_insight: generateMicroInsight(revelation),
    devotional: generateDevotional(revelation, storyMoment, bibleVerse),
    article: generateArticle(revelation, storyMoment, bibleVerse),
    email: generateEmail(revelation, storyMoment),
    short_video: generateShortVideo(revelation, storyMoment, bibleVerse),
    podcast: generatePodcast(revelation, storyMoment, bibleVerse),
    long_video: generateLongVideo(revelation, storyMoment, bibleVerse),
  };

  console.log('[CONTENT-ENGINE] Generated 9 story-driven formats');

  return {
    transcript,
    title: revelation.substring(0, 80),
    core_message: revelation,
    formats,
  };
}

function extractQuotables(transcript: string): string[] {
  // Find sentences that are self-contained, powerful statements
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 200);

  // Filter for statements that:
  // 1. Don't ask questions
  // 2. Make declarations or teach
  // 3. Are quotable (have weight to them)
  const quotables = sentences.filter(s => {
    const isQuestion = s.includes('?');
    const isGreeting = /^(hello|welcome|hi|good morning|hallelujah|amen)/i.test(s);
    const hasTeachingMarker =
      /\b(is|are|when|if|become|transform|truth|grace|love|faith|understand)\b/i.test(s);

    return !isQuestion && !isGreeting && hasTeachingMarker;
  });

  return quotables.slice(0, 5); // Return top 5 quotables
}

function identifyRevelation(quotables: string[], transcript: string): string {
  // The revelation is typically the shortest, most powerful statement
  // Look for statements with "is" or transformation language

  const transformationStatements = quotables.filter(q =>
    /\b(is|becomes|transform|shift|means|truth)\b/i.test(q)
  );

  if (transformationStatements.length > 0) {
    // Return the one with the most impact
    return transformationStatements[0];
  }

  // Fallback: return the most quotable-sounding statement
  return quotables[0] || 'Grace is received, not earned';
}

function extractStoryMoment(transcript: string): string {
  // Find narrative elements: stories, parables, real moments
  // Look for: "think about", "imagine", "like a", "one day", "I remember", "consider"

  const narrativePatterns = [
    /(?:think about|imagine|like a|as if|consider|picture)([^.!?]*[.!?])/i,
    /(?:there was|one day|once|I remember|I saw)([^.!?]*[.!?])/i,
    /(?:a father|a child|a man|a woman|a person)([^.!?]*[.!?])/i,
  ];

  for (const pattern of narrativePatterns) {
    const match = transcript.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return '';
}

function suggestBibleVerse(revelation: string, storyMoment: string): string {
  // Map revelation themes to Bible verses
  const themeMap: Record<string, string> = {
    grace: 'Ephesians 2:8-9',
    faith: '1 Peter 1:7',
    love: '1 John 4:7-8',
    truth: 'John 8:32',
    freedom: 'Galatians 5:1',
    strength: 'Philippians 4:13',
    peace: 'Philippians 4:6-7',
    joy: 'Nehemiah 8:10',
    hope: 'Romans 15:13',
    forgiveness: 'Matthew 6:14-15',
    receive: 'John 1:12',
    earned: 'Romans 6:23',
    transform: 'Romans 12:2',
    shift: 'Proverbs 23:7',
    understand: 'Proverbs 3:5-6',
  };

  const lower = revelation.toLowerCase();
  for (const [theme, verse] of Object.entries(themeMap)) {
    if (lower.includes(theme)) {
      return verse;
    }
  }

  return '1 Timothy 6:6'; // Default verse on contentment
}

function generateDailyLetter(
  revelation: string,
  storyMoment: string,
  bibleVerse: string
): string {
  return `Good morning.

${storyMoment || revelation}

What happens in that moment? You realize: ${revelation}

This is the truth that changes everything.

${bibleVerse}

Take this with you today.

In faith`;
}

function generateSocialPost(revelation: string): string {
  // Make it punchy, under 280 chars
  const post = revelation.substring(0, 270);
  return post.endsWith('.') ? post : post + '.';
}

function generateMicroInsight(revelation: string): string {
  return revelation.split('.')[0] + '.';
}

function generateDevotional(
  revelation: string,
  storyMoment: string,
  bibleVerse: string
): string {
  return `${storyMoment || revelation}

Here's what that moment teaches us: ${revelation}

Sit with this. What is it inviting you toward?

${bibleVerse}`;
}

function generateArticle(
  revelation: string,
  storyMoment: string,
  bibleVerse: string
): string {
  return `# ${revelation.substring(0, 60)}

## The Moment

${storyMoment || revelation}

## The Truth

${revelation}

## Why It Matters

When you understand this, you stop performing and start receiving. You stop striving and start trusting. This is not just knowledge—this is transformation.

## Scripture

${bibleVerse}`;
}

function generateEmail(revelation: string, storyMoment: string): string {
  return `Hi there,

I wanted to share something with you today.

${storyMoment || revelation}

And it hit me: ${revelation}

If you're sensing this too, I'd love to hear what you're thinking.

In faith`;
}

function generateShortVideo(
  revelation: string,
  storyMoment: string,
  bibleVerse: string
): string {
  return `[OPEN]
${storyMoment || revelation}

[THE SHIFT]
${revelation}

[SCRIPTURE]
${bibleVerse}

[CLOSE]
This is freedom.`;
}

function generatePodcast(
  revelation: string,
  storyMoment: string,
  bibleVerse: string
): string {
  return `Listen to what happens in this moment.

${storyMoment || revelation}

That's when you understand: ${revelation}

This is not comfortable. This is truthful.

Scripture says: ${bibleVerse}

That's your reality.`;
}

function generateLongVideo(
  revelation: string,
  storyMoment: string,
  bibleVerse: string
): string {
  return `# ${revelation.substring(0, 60)}

## THE STORY

${storyMoment || revelation}

## THE REVELATION

${revelation}

## THE SCRIPTURE

${bibleVerse}

## WHAT NOW

This is not something you have to figure out. This is something you receive.

Let it land.`;
}

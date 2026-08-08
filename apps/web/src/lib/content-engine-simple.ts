/**
 * INTELLIGENT CONTENT ENGINE - THREE STAGES
 * Stage 1: Extract quotables from transcript
 * Stage 2: Identify lightbulb moments (key revelations)
 * Stage 3: Validate & produce 9 story-driven formats
 */

export interface Stage1Output {
  quotables: Array<{
    id: number;
    text: string;
    weight: number; // relevance score
  }>;
}

export interface Stage2Output {
  lightbulbs: Array<{
    id: number;
    revelation: string;
    significance: string;
    storyMoment?: string;
  }>;
}

export interface Stage3Format {
  daily_letter: string;
  social_post: string;
  micro_insight: string;
  devotional: string;
  article: string;
  email: string;
  short_video: string;
  podcast: string;
  long_video: string;
}

export interface Stage3Output {
  formats: Array<{
    lightbulbId: number;
    revelation: string;
    formats: Stage3Format;
  }>;
}

export interface ContentEngineOutput {
  stage1: Stage1Output;
  stage2: Stage2Output;
  stage3: Stage3Output;
}

export function generateContentFromTranscript(transcript: string): ContentEngineOutput {
  console.log('[CONTENT-ENGINE] Starting three-stage pipeline...');

  // STAGE 1: Extract quotable statements
  console.log('[STAGE-1] Extracting quotable statements...');
  const stage1 = extractStage1Quotables(transcript);
  console.log(`[STAGE-1] Found ${stage1.quotables.length} quotable statements`);

  // STAGE 2: Identify lightbulb moments from quotables
  console.log('[STAGE-2] Identifying lightbulb moments...');
  const stage2 = extractStage2Lightbulbs(stage1.quotables, transcript);
  console.log(`[STAGE-2] Found ${stage2.lightbulbs.length} lightbulbs`);

  // STAGE 3: Generate 9 formats for each lightbulb
  console.log('[STAGE-3] Generating 9 formats per lightbulb...');
  const stage3 = generateStage3Formats(stage2.lightbulbs, transcript);
  console.log(`[STAGE-3] Generated ${stage3.formats.length} format sets`);

  return {
    stage1,
    stage2,
    stage3,
  };
}

// ============ STAGE 1: EXTRACT QUOTABLES ============

function extractStage1Quotables(transcript: string): Stage1Output {
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 250);

  const quotables = sentences
    .filter(s => {
      const isQuestion = s.includes('?');
      const isGreeting = /^(hello|welcome|hi|good morning|hallelujah|amen|introduction)/i.test(s);
      const hasTeachingMarker =
        /\b(is|are|when|if|become|transform|truth|grace|love|faith|understand|means|shift|realize|means)\b/i.test(s);
      return !isQuestion && !isGreeting && hasTeachingMarker;
    })
    .slice(0, 8)
    .map((text, idx) => ({
      id: idx + 1,
      text,
      weight: calculateWeight(text),
    }))
    .sort((a, b) => b.weight - a.weight);

  return { quotables };
}

function calculateWeight(text: string): number {
  let weight = 0;

  // Transformation language
  if (/transform|shift|change|become|realize|understand/i.test(text)) weight += 3;

  // Revelation markers
  if (/truth|meaning|essence|core/i.test(text)) weight += 2;

  // Action/decision markers
  if (/when|if|moment|decide/i.test(text)) weight += 2;

  // Length (sweet spot is 30-100 words)
  const wordCount = text.split(/\s+/).length;
  if (wordCount >= 15 && wordCount <= 40) weight += 1;

  return weight;
}

// ============ STAGE 2: IDENTIFY LIGHTBULBS ============

interface QuotableInput {
  id: number;
  text: string;
  weight: number;
}

function extractStage2Lightbulbs(
  quotables: QuotableInput[],
  transcript: string
): Stage2Output {
  const lightbulbs: Stage2Output['lightbulbs'] = [];

  // Each quotable becomes a lightbulb moment
  quotables.slice(0, 4).forEach((quotable, idx) => {
    const revelation = extractRevelation(quotable.text);
    const significance = extractSignificance(quotable.text, idx);
    const storyMoment = findRelatedStoryMoment(quotable.text, transcript);

    lightbulbs.push({
      id: idx + 1,
      revelation,
      significance,
      storyMoment,
    });
  });

  return { lightbulbs };
}

function extractRevelation(text: string): string {
  // The revelation is the core insight - typically the most declarative part
  const parts = text.split(/\b(when|if|because|so|but)\b/i);
  const mainClause = parts[0].trim();
  return mainClause.length > 0 ? mainClause : text;
}

function extractSignificance(text: string, index: number): string {
  const weights = [
    'This is the fundamental shift',
    'This changes everything about how you see it',
    'This is where most people miss it',
    'This reveals the hidden truth',
  ];
  return weights[index] || 'This is the key insight';
}

function findRelatedStoryMoment(quotable: string, transcript: string): string | undefined {
  // Look for a story or example near this quotable in the transcript
  const narrativePatterns = [
    /(?:think about|imagine|like a|consider|picture|example)([^.!?]*[.!?])/i,
    /(?:a father|a child|a person|someone)([^.!?]*[.!?])/i,
  ];

  for (const pattern of narrativePatterns) {
    const match = transcript.match(pattern);
    if (match && match[1] && match[1].includes(quotable.split(/\s+/)[0])) {
      return match[1].trim();
    }
  }

  // Fallback: find any story near the quotable
  const idx = transcript.indexOf(quotable);
  if (idx > 0) {
    const before = transcript.substring(Math.max(0, idx - 300), idx);
    for (const pattern of narrativePatterns) {
      const match = before.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  }

  return undefined;
}

// ============ STAGE 3: GENERATE FORMATS ============

interface LightbulbInput {
  id: number;
  revelation: string;
  significance: string;
  storyMoment?: string;
}

function generateStage3Formats(
  lightbulbs: LightbulbInput[],
  transcript: string
): Stage3Output {
  const formats: Stage3Output['formats'] = [];

  lightbulbs.forEach((lb) => {
    const bibleVerse = suggestBibleVerse(lb.revelation);
    const storyMoment = lb.storyMoment || extractDefaultStory(transcript);

    formats.push({
      lightbulbId: lb.id,
      revelation: lb.revelation,
      formats: {
        daily_letter: generateDailyLetter(lb.revelation, storyMoment, bibleVerse),
        social_post: generateSocialPost(lb.revelation),
        micro_insight: generateMicroInsight(lb.revelation),
        devotional: generateDevotional(lb.revelation, storyMoment, bibleVerse),
        article: generateArticle(lb.revelation, storyMoment, bibleVerse),
        email: generateEmail(lb.revelation, storyMoment),
        short_video: generateShortVideo(lb.revelation, storyMoment, bibleVerse),
        podcast: generatePodcast(lb.revelation, storyMoment, bibleVerse),
        long_video: generateLongVideo(lb.revelation, storyMoment, bibleVerse),
      },
    });
  });

  return { formats };
}

function extractDefaultStory(transcript: string): string {
  const patterns = [
    /(?:think about|imagine|like a|consider)([^.!?]*[.!?])/i,
    /(?:a father|a child|a person)([^.!?]*[.!?])/i,
  ];

  for (const pattern of patterns) {
    const match = transcript.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return 'Consider this moment in your own life';
}

function suggestBibleVerse(revelation: string): string {
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

  return '1 Timothy 6:6';
}

// ============ FORMAT GENERATORS ============

function generateDailyLetter(
  revelation: string,
  storyMoment: string,
  bibleVerse: string
): string {
  return `Good morning.

${storyMoment}

What happens in that moment? You realize: ${revelation}

This is the truth that changes everything.

${bibleVerse}

Take this with you today.

In faith`;
}

function generateSocialPost(revelation: string): string {
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
  return `${storyMoment}

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

${storyMoment}

## The Truth

${revelation}

## Why It Matters

When you understand this, everything shifts. This is not just knowledge—this is transformation.

## Scripture

${bibleVerse}`;
}

function generateEmail(revelation: string, storyMoment: string): string {
  return `Hi there,

I wanted to share something with you today.

${storyMoment}

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
${storyMoment}

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

${storyMoment}

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

${storyMoment}

## THE REVELATION

${revelation}

## THE SCRIPTURE

${bibleVerse}

## WHAT NOW

This is not something you have to figure out. This is something you receive.

Let it land.`;
}

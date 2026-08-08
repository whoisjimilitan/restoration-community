/**
 * PRESERVATION & AMPLIFICATION ENGINE
 *
 * Extract YOUR exact words, YOUR reasoning, YOUR voice.
 * Amplify what you're already saying into 9 formats.
 * Truth Protocol: Every statement sourced from your transcript.
 * Never invent. Never add interpretation. Preserve & amplify.
 */

export interface Stage1Output {
  coreTeaching: {
    mainStatement: string; // Your core idea, verbatim
    reasoning: string[]; // Your logic flow, direct quotes
    examples: string[]; // Your stories/examples
    conclusion: string; // Your closing thought
  };
}

export interface Stage2Output {
  identified: {
    yourMainPoint: string; // What you're really saying
    howYouReason: string; // Your actual reasoning pattern
    proofYouGive: string; // Your evidence/example
    whereYouLead: string; // What you're pointing toward
  };
}

export interface Stage3Output {
  formats: Record<string, string>;
}

export interface ContentEngineOutput {
  stage1: Stage1Output;
  stage2: Stage2Output;
  stage3: Stage3Output;
}

export function generateContentFromTranscript(
  transcript: string
): ContentEngineOutput {
  console.log('[ENGINE] Extracting YOUR core teaching, reasoning, voice...');

  // STAGE 1: Extract YOUR exact words and reasoning
  const stage1 = extractYourTeaching(transcript);

  // STAGE 2: Understand how YOU reason
  const stage2 = understandYourReasoning(transcript, stage1);

  // STAGE 3: Generate 9 formats in YOUR voice
  const stage3 = generateInYourVoice(stage1, stage2);

  return {
    stage1,
    stage2,
    stage3,
  };
}

// ============ STAGE 1: EXTRACT YOUR WORDS ============

function extractYourTeaching(transcript: string): Stage1Output {
  // Find the strongest statement in your own words
  const mainStatement = findMainStatement(transcript);

  // Extract your reasoning (how you explain it)
  const reasoning = extractYourReasoning(transcript);

  // Find your examples/stories
  const examples = extractYourExamples(transcript);

  // Find your conclusion/point
  const conclusion = extractYourConclusion(transcript);

  return {
    coreTeaching: {
      mainStatement,
      reasoning,
      examples,
      conclusion,
    },
  };
}

function findMainStatement(transcript: string): string {
  // Find THE strongest declarative statement you make
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 25 && s.length < 250);

  // Score based on: power, clarity, directness
  const scored = sentences
    .map(s => ({
      text: s,
      score: scoreStatement(s),
    }))
    .sort((a, b) => b.score - a.score);

  // Return your strongest, most direct statement
  return scored[0]?.text || sentences[0] || 'Teaching';
}

function scoreStatement(sentence: string): number {
  let score = 0;

  // Declarative language
  if (/^(it|this|that|you|we|god)/i.test(sentence.trim())) score += 2;

  // Power words
  if (/\b(is|are|becomes|means|reveals|truth|always)\b/i.test(sentence)) score += 2;

  // Simple, direct language (not complicated)
  const wordCount = sentence.split(/\s+/).length;
  if (wordCount >= 10 && wordCount <= 30) score += 1;

  // Negation (what something is NOT)
  if (/\b(not|never|no|without)\b/i.test(sentence)) score += 1;

  return score;
}

function extractYourReasoning(transcript: string): string[] {
  // How do YOU explain/reason through this?
  // Look for: "because", "when", "if", "then", causal language
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 200);

  const reasoningMarkers = [
    /\b(because|if|when|then|so|that means|which means|what this means)\b/i,
    /\b(instead of|rather than|versus|but)\b/i,
    /\b(the moment|the truth|the reality|here's why)\b/i,
  ];

  const reasoning: string[] = [];
  for (const sent of sentences) {
    for (const marker of reasoningMarkers) {
      if (marker.test(sent) && reasoning.length < 3) {
        reasoning.push(sent);
        break;
      }
    }
  }

  return reasoning.length > 0 ? reasoning : sentences.slice(1, 4);
}

function extractYourExamples(transcript: string): string[] {
  // What stories/examples do YOU use?
  // Look for: "think about", "like a", "imagine", "a father"
  const examplePatterns = [
    /(?:think about|imagine|like|consider|example|picture)([^.!?]*[.!?])/i,
    /(?:a .*?)(does|doesn't|can|will)([^.!?]*[.!?])/i,
    /(?:if you|when you|one day)([^.!?]*[.!?])/i,
  ];

  const examples: string[] = [];
  for (const pattern of examplePatterns) {
    const matches = transcript.match(new RegExp(pattern.source, 'gi'));
    if (matches) {
      for (const match of matches) {
        if (examples.length < 3) {
          examples.push(match.trim());
        }
      }
    }
  }

  return examples;
}

function extractYourConclusion(transcript: string): string {
  // What do you conclude/point toward?
  // Usually near the end or after "so"
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20);

  // Last meaningful statement
  for (let i = sentences.length - 1; i >= Math.max(0, sentences.length - 5); i--) {
    const sent = sentences[i];
    if (sent && !sent.match(/^(hello|thanks|welcome|question)/i)) {
      return sent;
    }
  }

  return sentences[sentences.length - 1] || 'Teaching';
}

// ============ STAGE 2: UNDERSTAND YOUR REASONING ============

function understandYourReasoning(
  transcript: string,
  stage1: Stage1Output
): Stage2Output {
  return {
    identified: {
      yourMainPoint: stage1.coreTeaching.mainStatement,
      howYouReason: stage1.coreTeaching.reasoning[0] || stage1.coreTeaching.mainStatement,
      proofYouGive: stage1.coreTeaching.examples[0] || 'Direct teaching',
      whereYouLead: stage1.coreTeaching.conclusion,
    },
  };
}

// ============ STAGE 3: GENERATE IN YOUR VOICE ============

function generateInYourVoice(
  stage1: Stage1Output,
  stage2: Stage2Output
): Stage3Output {
  const {
    mainStatement,
    reasoning,
    examples,
    conclusion,
  } = stage1.coreTeaching;

  const { yourMainPoint, howYouReason, proofYouGive, whereYouLead } =
    stage2.identified;

  return {
    formats: {
      daily_letter: generateDailyLetter(mainStatement, howYouReason, whereYouLead),
      social_post: generateSocialPost(mainStatement),
      micro_insight: generateMicroInsight(mainStatement),
      devotional: generateDevotional(mainStatement, examples[0], whereYouLead),
      article: generateArticle(mainStatement, reasoning, proofYouGive, conclusion),
      email: generateEmail(mainStatement, howYouReason),
      short_video: generateShortVideo(mainStatement, proofYouGive, whereYouLead),
      podcast: generatePodcast(mainStatement, reasoning, conclusion),
      long_video: generateLongVideo(mainStatement, reasoning, examples, conclusion),
    },
  };
}

function generateDailyLetter(
  mainStatement: string,
  reasoning: string,
  conclusion: string
): string {
  return `Good morning.

${mainStatement}

${reasoning}

That's where we arrive: ${conclusion}

Take this with you today.`;
}

function generateSocialPost(mainStatement: string): string {
  // Keep it short and punchy - your core idea
  const trimmed = mainStatement.substring(0, 280);
  return trimmed.endsWith('.') ? trimmed : trimmed + '.';
}

function generateMicroInsight(mainStatement: string): string {
  // Your main point, condensed
  const firstSentence = mainStatement.split(/[.!?]/)[0];
  return firstSentence + '.';
}

function generateDevotional(
  mainStatement: string,
  example: string,
  conclusion: string
): string {
  return `${example}

When you understand this: ${mainStatement}

What becomes possible? ${conclusion}

Sit with this.`;
}

function generateArticle(
  mainStatement: string,
  reasoning: string[],
  example: string,
  conclusion: string
): string {
  return `# ${mainStatement.substring(0, 80)}

## The Core

${mainStatement}

## Why This Matters

${reasoning[0] || mainStatement}

${reasoning[1] ? '\n' + reasoning[1] + '\n' : ''}

## The Evidence

${example}

## Where This Leads

${conclusion}`;
}

function generateEmail(mainStatement: string, reasoning: string): string {
  return `Hi,

I want to share something with you.

${mainStatement}

Here's why: ${reasoning}

What does this mean for you?

In faith`;
}

function generateShortVideo(
  mainStatement: string,
  example: string,
  conclusion: string
): string {
  return `[OPEN]
${example}

[THE POINT]
${mainStatement}

[THE IMPLICATION]
${conclusion}

[CLOSE]
That's the reality.`;
}

function generatePodcast(
  mainStatement: string,
  reasoning: string[],
  conclusion: string
): string {
  return `Listen to what this reveals.

${mainStatement}

Think about it this way: ${reasoning[0] || mainStatement}

${reasoning[1] ? 'More specifically: ' + reasoning[1] : ''}

And here's where that leads: ${conclusion}

That's your reality.`;
}

function generateLongVideo(
  mainStatement: string,
  reasoning: string[],
  examples: string[],
  conclusion: string
): string {
  return `# ${mainStatement.substring(0, 80)}

## THE TEACHING

${mainStatement}

## THE REASONING

${reasoning[0] || mainStatement}

${reasoning[1] ? '\n' + reasoning[1] : ''}

## THE EXAMPLE

${examples[0] || 'Real people live this'}

## THE IMPLICATION

${conclusion}

## WHAT NOW

This is what I'm saying. This is what I'm pointing you toward.`;
}

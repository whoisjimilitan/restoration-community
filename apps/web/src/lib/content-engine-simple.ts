/**
 * TRANSFORMATION ENGINE
 * Applies the core system: Emotion → Identity → Consequence → Mechanism → Proof → Shift
 * Preserves verbatim power lines. Intensifies stakes. Frames measurable transformation.
 */

export interface TransformedContent {
  painPoint: string;
  preservedLines: string[];
  consequence: string;
  identityShift: string;
  mechanism: string;
  proof: string;
  measurableTransformation: string;
  backendBridge: string;
}

export interface Stage1Output {
  analysis: {
    painPoint: string;
    identity: string;
    consequence: string;
    mechanism: string;
  };
}

export interface Stage2Output {
  transformed: TransformedContent;
}

export interface Stage3Output {
  formats: Record<
    string,
    string
  >;
}

export interface ContentEngineOutput {
  stage1: Stage1Output;
  stage2: Stage2Output;
  stage3: Stage3Output;
}

export function generateContentFromTranscript(
  transcript: string
): ContentEngineOutput {
  console.log('[ENGINE] Analyzing transcript for pain, identity, consequence, mechanism...');

  // STAGE 1: Analyze for core system elements
  const stage1 = analyzeForCoreSystem(transcript);

  // STAGE 2: Transform using the framework
  const stage2 = transformContent(transcript, stage1);

  // STAGE 3: Generate 9 formats from transformed content
  const stage3 = generateFormats(stage2.transformed);

  return {
    stage1,
    stage2,
    stage3,
  };
}

// ============ STAGE 1: ANALYZE ============

function analyzeForCoreSystem(transcript: string): Stage1Output {
  const painPoint = extractPainPoint(transcript);
  const identity = extractIdentityTension(transcript);
  const consequence = extractConsequence(transcript);
  const mechanism = extractMechanism(transcript);

  return {
    analysis: {
      painPoint,
      identity,
      consequence,
      mechanism,
    },
  };
}

function extractPainPoint(transcript: string): string {
  // Look for words indicating struggle, difficulty, problem
  const painIndicators = [
    /(?:struggle|difficult|hard|frustrat|challenge|problem|stuck|can't|unable|fail)/i,
    /(?:spend|waste|lost|time|effort|energy).*?(?:on|trying)/i,
    /(?:many of us|we all|people|tend to).*?(?:struggle|try|attempt)/i,
  ];

  const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 30);

  for (const pattern of painIndicators) {
    for (const sent of sentences) {
      if (pattern.test(sent)) {
        return sent;
      }
    }
  }

  return sentences[0] || 'People struggle with this';
}

function extractIdentityTension(transcript: string): string {
  // Look for contrast between current identity and potential identity
  const identityPatterns = [
    /(?:from|instead of|no longer).*?(?:to|into|become)/i,
    /(?:shift|transform|become|realize|see yourself as)/i,
    /(?:you are|you're not|not just a)/i,
  ];

  const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 30);

  for (const pattern of identityPatterns) {
    for (const sent of sentences) {
      if (pattern.test(sent)) {
        return sent;
      }
    }
  }

  return 'Who you are vs who you can become';
}

function extractConsequence(transcript: string): string {
  // Project the cost of inaction - intensify it
  const costIndicators = [
    /(?:cost|expense|price|cost you)/i,
    /(?:miss|lose|never|fade|diminish)/i,
    /(?:stay|remain|continue|stuck)/i,
  ];

  const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 40);

  let bestMatch = '';
  for (const pattern of costIndicators) {
    for (const sent of sentences) {
      if (pattern.test(sent) && sent.length > bestMatch.length) {
        bestMatch = sent;
      }
    }
  }

  if (bestMatch) return bestMatch;
  return 'The cost of staying stuck compounds daily.';
}

function extractMechanism(transcript: string): string {
  // Find the HOW - the specific steps or process
  const mechanismPatterns = [
    /(?:step|first|second|then|next|here's how|process|method).*?(?:is|involves|means)/i,
    /(?:what happen|the moment|when you).*?(?:then|is|become)/i,
  ];

  const sentences = transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 30);

  for (const pattern of mechanismPatterns) {
    for (const sent of sentences) {
      if (pattern.test(sent)) {
        return sent;
      }
    }
  }

  // Fallback: find actionable sentence
  for (const sent of sentences) {
    if (/\b(do|stop|start|receive|let|allow|embrace)\b/i.test(sent)) {
      return sent;
    }
  }

  return 'The mechanism is a shift in perspective and action.';
}

// ============ STAGE 2: TRANSFORM ============

function transformContent(
  transcript: string,
  stage1: Stage1Output
): Stage2Output {
  const preserved = preserveVerbatimPower(transcript);
  const intensified = intensifyConsequence(stage1.analysis.consequence);
  const shift = frameIdentityShift(stage1.analysis.identity);
  const measured = frameMeasurable(transcript);
  const proof = extractProof(transcript);
  const bridge = createBackendBridge(stage1.analysis.mechanism);

  return {
    transformed: {
      painPoint: stage1.analysis.painPoint,
      preservedLines: preserved,
      consequence: intensified,
      identityShift: shift,
      mechanism: stage1.analysis.mechanism,
      proof,
      measurableTransformation: measured,
      backendBridge: bridge,
    },
  };
}

function preserveVerbatimPower(transcript: string): string[] {
  // Find 2-3 of the strongest lines - keep them exactly as is
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 25 && s.length < 200);

  const scored = sentences
    .map(s => ({
      text: s,
      score: calculatePowerScore(s),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.text);

  return scored;
}

function calculatePowerScore(sentence: string): number {
  let score = 0;

  // Power words
  if (/\b(transform|shift|realize|true|essential|fundamental|power|freedom|grace)\b/i.test(sentence))
    score += 3;
  if (/\b(not|never|stop|quit|only|must)\b/i.test(sentence)) score += 2;
  if (/\b(you|your|we|our)\b/i.test(sentence)) score += 1;

  // Length (sweet spot)
  const wordCount = sentence.split(/\s+/).length;
  if (wordCount >= 15 && wordCount <= 35) score += 2;

  return score;
}

function intensifyConsequence(originalConsequence: string): string {
  // Take the consequence and project forward - what happens in 1 year, 5 years?
  const projections = [
    'A year from now, if you stay stuck: ',
    'The real cost compounds: ',
    'Every day you delay: ',
    'When you finally realize the cost of waiting: ',
  ];

  const projection = projections[Math.floor(Math.random() * projections.length)];

  // Extract key elements and intensify
  if (
    originalConsequence.toLowerCase().includes('time') ||
    originalConsequence.toLowerCase().includes('spend')
  ) {
    return (
      projection +
      'more months lost, more relationships strained, more potential unrealized.'
    );
  }

  if (
    originalConsequence.toLowerCase().includes('struggle') ||
    originalConsequence.toLowerCase().includes('hard')
  ) {
    return (
      projection +
      "you're still exhausted, still doubting, still performing instead of being."
    );
  }

  return projection + originalConsequence;
}

function frameIdentityShift(identity: string): string {
  // Frame as: "You can become X instead of Y"
  if (identity.toLowerCase().includes('from')) {
    const parts = identity.split('from')[1]?.trim().substring(0, 60);
    return 'You can shift from ' + (parts || 'old patterns') + ' to freedom.';
  }

  return 'Your identity can shift from striving to receiving, from performing to resting.';
}

function frameMeasurable(transcript: string): string {
  // Find or create measurable transformation
  // Look for: faster, clearer, more/less, freedom, peace
  const measurements = [
    'More time for what matters',
    'Clarity instead of confusion',
    'Peace instead of anxiety',
    'Freedom from constant performance',
    'Trust instead of doubt',
  ];

  const relevant = measurements.find(m =>
    new RegExp(m.split(/\s+/)[0], 'i').test(transcript)
  );

  return relevant || measurements[0];
}

function extractProof(transcript: string): string {
  // Look for: examples, stories, metaphors, metrics
  // "Think about", "like a", "remember", "this happened"

  const storyPatterns = [
    /(?:think about|imagine|like|consider|example)([^.!?]*[.!?])/i,
    /(?:a .*?)(does|doesn't|can't|will)([^.!?]*[.!?])/i,
  ];

  for (const pattern of storyPatterns) {
    const match = transcript.match(pattern);
    if (match && match[0]) {
      return match[0].substring(0, 150);
    }
  }

  return 'Real people experience this daily.';
}

function createBackendBridge(mechanism: string): string {
  // Bridge the mechanism to an offer/next step
  return (
    'The mechanism is clear. Now, the work is putting it into practice ' +
    'with structure, accountability, and community that keeps you moving forward.'
  );
}

// ============ STAGE 3: GENERATE FORMATS ============

function generateFormats(transformed: TransformedContent): Stage3Output {
  return {
    formats: {
      daily_letter: generateDailyLetter(transformed),
      social_post: generateSocialPost(transformed),
      micro_insight: generateMicroInsight(transformed),
      devotional: generateDevotional(transformed),
      article: generateArticle(transformed),
      email: generateEmail(transformed),
      short_video: generateShortVideo(transformed),
      podcast: generatePodcast(transformed),
      long_video: generateLongVideo(transformed),
    },
  };
}

function generateDailyLetter(t: TransformedContent): string {
  return `Good morning.

${t.painPoint}

That's the pain point most of us live in.

What if that changed? ${t.consequence}

Here's what's possible: ${t.identityShift}

The shift happens through: ${t.mechanism}

${t.measurableTransformation}.

Take this with you today.`;
}

function generateSocialPost(t: TransformedContent): string {
  const line = t.preservedLines[0] || t.painPoint;
  return `${line}

${t.consequence}

${t.identityShift}

${t.measurableTransformation}.`;
}

function generateMicroInsight(t: TransformedContent): string {
  return t.preservedLines[0] || t.painPoint;
}

function generateDevotional(t: TransformedContent): string {
  return `${t.painPoint}

Most people don't realize: ${t.consequence}

But here's the truth:

${t.identityShift}

How? ${t.mechanism}

What becomes possible? ${t.measurableTransformation}.`;
}

function generateArticle(t: TransformedContent): string {
  return `# The Cost of Staying Stuck

## The Pain

${t.painPoint}

## The Real Cost

${t.consequence}

## What's Possible

${t.identityShift}

## The Mechanism

${t.mechanism}

## The Proof

${t.proof}

## What Changes

${t.measurableTransformation}

## Next Step

${t.backendBridge}`;
}

function generateEmail(t: TransformedContent): string {
  return `Hi,

I noticed something today.

${t.painPoint}

That's where most of us are stuck.

But here's what happens if we stay there: ${t.consequence}

What if instead: ${t.identityShift}

The path is simple: ${t.mechanism}

I've seen it happen: ${t.proof}

Result: ${t.measurableTransformation}

Ready?`;
}

function generateShortVideo(t: TransformedContent): string {
  return `[OPEN]
${t.painPoint}

[THE COST]
${t.consequence}

[THE SHIFT]
${t.identityShift}

[THE MECHANISM]
${t.mechanism}

[THE RESULT]
${t.measurableTransformation}

[CLOSE]
This is available to you.`;
}

function generatePodcast(t: TransformedContent): string {
  return `So let's talk about this.

${t.painPoint}

Most people live here and never question it.

But what if you projected forward? ${t.consequence}

That's the cost.

Now, what's available? ${t.identityShift}

Here's how: ${t.mechanism}

The proof? ${t.proof}

The transformation: ${t.measurableTransformation}

That's what we're building toward.`;
}

function generateLongVideo(t: TransformedContent): string {
  return `# ${t.identityShift}

## THE OPENING

${t.painPoint}

You feel this. Everyone does.

## THE REALITY

${t.consequence}

That's what happens if nothing changes.

## THE SHIFT

${t.identityShift}

This is real. This is available.

## THE MECHANISM

Here's exactly how:

${t.mechanism}

## THE PROOF

${t.proof}

## THE TRANSFORMATION

${t.measurableTransformation}

## THE NEXT STEP

${t.backendBridge}`;
}

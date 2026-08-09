/**
 * TRANSCRIPT EXTRACTION ENGINE
 * Finds irreplaceable sentences and core truths without paraphrasing
 */

export interface ExtractedSentence {
  text: string;
  index: number;
  strength: 'irreplaceable' | 'strong' | 'supporting' | 'filler';
  category: 'hook' | 'revelation' | 'proof' | 'action' | 'loop' | 'story' | 'filler';
  isVerbatim: boolean;
  reason: string;
}

export interface CoreTruth {
  id: string;
  truth: string;
  sentences: ExtractedSentence[];
  themes: string[];
  irreplaceableLineIndex: number;
}

export interface ValidationResult {
  isCorrect: boolean;
  isPrecise: boolean;
  isNovel: boolean;
  isUseful: boolean;
  isDeliverable: boolean;
  logicValid: boolean;
  scripturallySound: boolean;
  invisibleQuestions: {
    whatDoesItMean: boolean;
    whyDoesItMatter: boolean;
    howDoYouDoIt: boolean;
  };
  irreplaceableTestPass: boolean;
  issues: string[];
}

// Split transcript into sentences, preserving structure
function splitSentences(transcript: string): ExtractedSentence[] {
  const sentences = transcript
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  return sentences.map((text, index) => ({
    text,
    index,
    strength: 'supporting',
    category: 'filler',
    isVerbatim: true,
    reason: '',
  }));
}

// Identify filler words and phrases
function isFillerContent(sentence: string): boolean {
  const fillerPatterns = [
    /^(um|uh|like|you know|kind of|sort of|i think|basically|honestly)\b/i,
    /^(so|anyway|right|okay|yeah|well)\b/i,
    /^(let me just|just to|you know what)\b/i,
  ];

  return fillerPatterns.some((pattern) => pattern.test(sentence));
}

// Find sentences that state core truth most directly
function identifyStrength(sentence: string, context: ExtractedSentence[]): string {
  const textLower = sentence.toLowerCase();
  const wordCount = sentence.split(/\s+/).length;

  // Too short to be core revelation
  if (wordCount < 5) return 'filler';

  // Contains specific, non-hedged statements
  if (
    /\b(the truth is|what i (learned|realized|discovered)|nobody (knows|tells you|realizes))\b/i.test(
      sentence
    )
  ) {
    return 'irreplaceable';
  }

  // Direct assertion without hedging
  if (
    /^(most|many|few|some|all).*(don't|don't realize|don't understand|can't|never)/i.test(
      sentence
    ) &&
    !sentence.includes('kind of') &&
    !sentence.includes('sort of')
  ) {
    return 'irreplaceable';
  }

  // Personal revelation with specificity
  if (/\b(this took me|for years|i eventually realized|the life i give|here's what i realized)\b/i.test(sentence)) {
    return 'irreplaceable';
  }

  // Here's what I noticed/understood
  if (/\b(here's what|here is what|what i)\b/i.test(sentence) && wordCount > 5) {
    return 'irreplaceable';
  }

  // Spiritual mechanism or cost
  if (/\b(because|what happens when|the moment|the cost of|this is where|that's where)\b/i.test(sentence)) {
    return 'strong';
  }

  // Story or example
  if (/\b(so when|then|one day|for example|like when|i remember|when i)\b/i.test(sentence)) {
    return 'strong';
  }

  // Direct powerful statements
  if (wordCount > 8 && /\b(is|are|was|were)\b/.test(sentence) && !isFillerContent(sentence)) {
    return 'strong';
  }

  return isFillerContent(sentence) ? 'filler' : 'supporting';
}

// Categorize by function in narrative
function categorizeFunction(sentence: string): string {
  const textLower = sentence.toLowerCase();

  if (
    /^(did you know|have you ever|let me ask|something about|most people)/i.test(
      sentence
    )
  ) {
    return 'hook';
  }

  if (/\b(the truth is|realized|understood|learned)\b/i.test(textLower)) {
    return 'revelation';
  }

  if (/\b(scripture|bible|john|romans|timothy|philippians|matthew|luke)\b/i.test(textLower)) {
    return 'proof';
  }

  if (/\b(so what|which means|therefore|this is why)\b/i.test(textLower)) {
    return 'action';
  }

  if (/\b(question|ask yourself|what about|think about)\b/i.test(textLower)) {
    return 'loop';
  }

  if (/\b(when|then|one day|for example|like when|i remember)\b/i.test(textLower)) {
    return 'story';
  }

  return 'filler';
}

// Extract all sentences with strength and category
export function extractSentences(transcript: string): ExtractedSentence[] {
  const sentences = splitSentences(transcript);

  return sentences.map((sent) => {
    const strength = identifyStrength(sent.text, sentences);
    const category = categorizeFunction(sent.text);

    const reasons: Record<string, string> = {
      irreplaceable: 'Direct statement of core truth',
      strong: 'Supports revelation with specificity',
      supporting: 'Provides context or example',
      filler: 'Verbal tic or unnecessary repetition',
    };

    return {
      ...sent,
      strength: strength as 'irreplaceable' | 'strong' | 'supporting' | 'filler',
      category: category as
        | 'hook'
        | 'revelation'
        | 'proof'
        | 'action'
        | 'loop'
        | 'story'
        | 'filler',
      reason: reasons[strength] || '',
    };
  });
}

// Identify core truths from irreplaceable sentences
export function identifyCoreTruths(sentences: ExtractedSentence[]): CoreTruth[] {
  const irreplaceableSentences = sentences.filter((s) => s.strength === 'irreplaceable');

  return irreplaceableSentences.map((sent, idx) => {
    // Find supporting sentences near this revelation
    const supportingSentences = sentences.filter(
      (s) =>
        s.index > sent.index - 3 &&
        s.index < sent.index + 5 &&
        s.strength !== 'filler' &&
        s.index !== sent.index
    );

    // Extract themes from the revelation
    const themes: string[] = [];
    if (/attention|focus|notice/i.test(sent.text)) themes.push('Attention');
    if (/surrender|give|daily/i.test(sent.text)) themes.push('Daily Surrender');
    if (/distraction|competing|lose/i.test(sent.text)) themes.push('Spiritual Distraction');
    if (/still|quiet|silence|inner/i.test(sent.text)) themes.push('Inner Stillness');
    if (/prayer|faith|discipline|worship/i.test(sent.text)) themes.push('Spiritual Practice');

    return {
      id: `truth-${idx}`,
      truth: sent.text,
      sentences: [sent, ...supportingSentences],
      themes,
      irreplaceableLineIndex: sent.index,
    };
  });
}

// Validate extracted content against standards
export function validateExtraction(truth: CoreTruth): ValidationResult {
  const text = truth.truth;
  const allText = truth.sentences.map((s) => s.text).join(' ');

  const issues: string[] = [];

  // Check correctness
  const isCorrect = truth.sentences.some(
    (s) => s.strength === 'irreplaceable' || s.strength === 'strong'
  );
  if (!isCorrect) issues.push('No strong core statement identified');

  // Check precision
  const isPrecise =
    text.split(/\s+/).length > 8 && text.split(/\s+/).length < 100 && !text.includes('kind of');
  if (!isPrecise) issues.push('Statement is vague or too hedged');

  // Check novelty
  const isNovel = !/everyone knows|obviously|clearly|common sense/i.test(text);
  if (!isNovel) issues.push('Appears to state obvious truth');

  // Check utility
  const isUseful = /\b(because|when|if you|this means|therefore)\b/i.test(allText);
  if (!isUseful) issues.push('No clear application or mechanism');

  // Check deliverability
  const isDeliverable = text.split(/\s+/).length < 80; // Speakable length
  if (!isDeliverable) issues.push('Too complex to deliver in single take');

  // Check logic validity
  const logicValid = !/contradicts|except when|unless|but actually/i.test(allText);
  if (!logicValid) issues.push('Logic structure appears broken');

  // Check scriptural soundness
  const scripturallySound = !/contradicts (scripture|bible|god|jesus)/i.test(allText);
  if (!scripturallySound) issues.push('May contradict scriptural truth');

  // Check three invisible questions
  const invisibleQuestions = {
    whatDoesItMean: /\b(means|means that|is|reveals|shows)\b/i.test(allText),
    whyDoesItMatter: /\b(because|why|matters|important|cost|consequence)\b/i.test(allText),
    howDoYouDoIt: /\b(do|practice|apply|choose|decide|action)\b/i.test(allText),
  };

  if (!invisibleQuestions.whatDoesItMean) issues.push('Missing: What does this mean?');
  if (!invisibleQuestions.whyDoesItMatter) issues.push('Missing: Why does it matter?');
  if (!invisibleQuestions.howDoYouDoIt) issues.push('Missing: How do you do it?');

  // Check irreplaceability
  const irreplaceableTestPass =
    /\b(i|me|my|when i|what i|the life i|for years)\b/i.test(text) &&
    !/generic|universal|everyone|anybody/i.test(text);
  if (!irreplaceableTestPass) issues.push('Could be said by anyone; missing personal authority');

  return {
    isCorrect,
    isPrecise,
    isNovel,
    isUseful,
    isDeliverable,
    logicValid,
    scripturallySound,
    invisibleQuestions,
    irreplaceableTestPass,
    issues,
  };
}

// Generate hook variations from core truth
export function generateHookVariations(truth: string): string[] {
  const hooks = [];

  // 1. Realization Hook
  if (/took me|realized|understood|learned/i.test(truth)) {
    hooks.push(`Something about this took me years to understand.`);
  }

  // 2. Conviction Hook
  if (/most|many|don't/i.test(truth)) {
    hooks.push(
      `Most believers don't realize this is where the real battle happens.`
    );
  }

  // 3. Honest Question
  hooks.push(
    `Have you ever noticed how easy it is to say you believe something and still live like you don't?`
  );

  // 4. Spiritual Mirror
  hooks.push(`Let me ask you something honestly.`);

  // 5. Confession Hook
  hooks.push(`For years I thought I understood this.`);

  // 6. Contrast Hook
  hooks.push(`This is not what most people think it is.`);

  // 7. Quiet Truth
  hooks.push(`There's something about this nobody tells you.`);

  return hooks;
}

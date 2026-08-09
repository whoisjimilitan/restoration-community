/**
 * SENTENCE ANALYZER
 * Analyzes each sentence individually for meaning, structure, and spiritual content
 */

export interface SentenceAnalysis {
  sentence: string;
  index: number;
  type: 'declaration' | 'confession' | 'question' | 'command' | 'observation';
  length: 'short' | 'medium' | 'long';
  keyWords: string[];
  spiritualContent: {
    hasSpiritualTerm: boolean;
    terms: string[];
    principle: string; // What spiritual principle is embedded?
  };
  assumption: string; // What is this sentence assuming?
  implication: string; // What follows logically?
  emotionalTone: 'neutral' | 'serious' | 'urgent' | 'reflective' | 'confessional';
}

/**
 * Analyze all sentences in the teaching
 */
export function analyzeSentences(content: string): SentenceAnalysis[] {
  console.log('[SENTENCE-ANALYZER] Analyzing individual sentences');

  // Split into sentences
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  const analyses: SentenceAnalysis[] = [];

  sentences.forEach((sent, index) => {
    const trimmed = sent.trim();
    if (trimmed.length > 0) {
      analyses.push(analyzeSentence(trimmed, index));
    }
  });

  console.log('[SENTENCE-ANALYZER] ✓ Analyzed', analyses.length, 'sentences');

  return analyses;
}

/**
 * Analyze a single sentence
 */
function analyzeSentence(sentence: string, index: number): SentenceAnalysis {
  const lower = sentence.toLowerCase();

  // Determine sentence type
  const type = determineSentenceType(sentence);

  // Determine length
  const words = sentence.split(/\s+/).length;
  const length = words < 8 ? 'short' : words < 20 ? 'medium' : 'long';

  // Extract key words
  const keyWords = extractKeyWords(sentence);

  // Identify spiritual content
  const spiritualContent = identifySpiritualContent(sentence);

  // Determine assumption
  const assumption = determineAssumption(sentence);

  // Determine implication
  const implication = determineImplication(sentence);

  // Determine emotional tone
  const emotionalTone = determineEmotionalTone(sentence);

  return {
    sentence,
    index,
    type,
    length,
    keyWords,
    spiritualContent,
    assumption,
    implication,
    emotionalTone,
  };
}

/**
 * Determine the type of sentence
 */
function determineSentenceType(
  sentence: string
): 'declaration' | 'confession' | 'question' | 'command' | 'observation' {
  const lower = sentence.toLowerCase();

  if (sentence.endsWith('?')) {
    return 'question';
  }

  if (lower.startsWith('i') || lower.includes('i was') || lower.includes('i had')) {
    return 'confession';
  }

  if (lower.startsWith('do ') || lower.startsWith('let ') || lower.startsWith('consider ')) {
    return 'command';
  }

  if (
    lower.includes('notice') ||
    lower.includes('observe') ||
    lower.includes('you see') ||
    lower.includes('there is')
  ) {
    return 'observation';
  }

  return 'declaration';
}

/**
 * Extract key words from sentence
 */
function extractKeyWords(sentence: string): string[] {
  // Remove common words
  const stopWords = new Set([
    'the',
    'a',
    'an',
    'and',
    'or',
    'but',
    'is',
    'are',
    'was',
    'were',
    'be',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'that',
    'this',
    'my',
    'his',
    'her',
    'their',
    'from',
    'to',
    'in',
    'on',
    'at',
    'by',
  ]);

  const words = sentence
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => !stopWords.has(word.replace(/[^a-z]/g, '')) && word.length > 3);

  return [...new Set(words)]; // Remove duplicates
}

/**
 * Identify spiritual terminology and principles
 */
function identifySpiritualContent(sentence: string): SentenceAnalysis['spiritualContent'] {
  const lower = sentence.toLowerCase();

  const spiritualTerms = [
    'spirit',
    'god',
    'jesus',
    'christ',
    'faith',
    'prayer',
    'delivered',
    'deliverance',
    'freedom',
    'encounter',
    'truth',
    'deception',
    'bondage',
    'control',
    'evil',
    'demon',
    'salvation',
    'curse',
    'blessing',
  ];

  const terms: string[] = [];
  let principle = '';

  spiritualTerms.forEach((term) => {
    if (lower.includes(term)) {
      terms.push(term);
    }
  });

  // Infer spiritual principle
  if (lower.includes('controlled') || lower.includes('bondage')) {
    principle = 'Spiritual bondage is real and can control humans';
  } else if (lower.includes('delivered') || lower.includes('freedom')) {
    principle = 'God can deliver from spiritual bondage';
  } else if (lower.includes('encountered') || lower.includes('encounter')) {
    principle = 'Direct encounter with God brings change';
  } else if (lower.includes('deceived') || lower.includes('deception')) {
    principle = 'Deception is a spiritual weapon';
  } else if (lower.includes('justified')) {
    principle = 'Self-deception and rationalization accompany bondage';
  }

  return {
    hasSpiritualTerm: terms.length > 0,
    terms,
    principle,
  };
}

/**
 * Determine what assumption this sentence makes
 */
function determineAssumption(sentence: string): string {
  const lower = sentence.toLowerCase();

  if (lower.includes('i was controlled')) {
    return 'Spiritual forces can control human behavior';
  }
  if (lower.includes('i justified')) {
    return 'Humans rationalize and self-deceive';
  }
  if (lower.includes('i blamed')) {
    return 'External circumstances are used as justification';
  }
  if (lower.includes('encountered')) {
    return 'Direct meeting with God produces change';
  }
  if (lower.includes('delivered')) {
    return 'God has power to liberate from bondage';
  }

  return 'Implicit assumption not explicitly identified';
}

/**
 * Determine what logically follows from this sentence
 */
function determineImplication(sentence: string): string {
  const lower = sentence.toLowerCase();

  if (lower.includes('controlled')) {
    return 'If controlled, then not fully responsible (but can be freed)';
  }
  if (lower.includes('encounter')) {
    return 'Transformation is possible through direct encounter';
  }
  if (lower.includes('delivered')) {
    return 'Present freedom is the result of past intervention';
  }
  if (lower.includes('justified')) {
    return 'Self-deception prevents recognition of bondage';
  }

  return 'Implication requires broader context';
}

/**
 * Determine the emotional tone
 */
function determineEmotionalTone(sentence: string): SentenceAnalysis['emotionalTone'] {
  const lower = sentence.toLowerCase();
  const words = sentence.split(/\s+/).length;

  // Short, punchy sentences are often serious
  if (words < 6) {
    return 'serious';
  }

  if (
    lower.includes('until') ||
    lower.includes('encountered') ||
    lower.includes('encountered') ||
    lower.includes('delivered')
  ) {
    return 'reflective';
  }

  if (
    lower.includes('i too') ||
    lower.includes('i was') ||
    lower.includes('i convinced') ||
    lower.includes('i justified')
  ) {
    return 'confessional';
  }

  if (
    lower.includes('must') ||
    lower.includes('should') ||
    lower.includes('will') ||
    lower.includes('today')
  ) {
    return 'urgent';
  }

  return 'neutral';
}

/**
 * TRIVIUM ANALYZER
 * Grammar (what is being said) → Logic (does it hold) → Rhetoric (how is it being said)
 */

export interface TriviumAnalysis {
  grammar: GrammarTest;
  logic: LogicTest;
  rhetoric: RhetoricTest;
}

export interface GrammarTest {
  isComplete: boolean;
  issues: string[];
  confidence: number;
}

export interface LogicTest {
  isValid: boolean;
  issues: string[];
  confidence: number;
}

export interface RhetoricTest {
  isStrong: boolean;
  issues: string[];
  confidence: number;
}

export interface MasterpromptTest {
  isCorrect: boolean;
  isPrecise: boolean;
  isNovel: boolean;
  isUseful: boolean;
  isDeliverable: boolean;
  issues: string[];
  pass: boolean;
}

export interface SentenceAnalysis {
  text: string;
  trivium: TriviumAnalysis;
  masterprompt: MasterpromptTest;
  overallPass: boolean;
  refinedVersion?: string;
}

// GRAMMAR: Is the sentence grammatically complete and clear?
export function analyzeGrammar(sentence: string): GrammarTest {
  const issues: string[] = [];
  let confidence = 100;

  // Check for sentence fragment
  if (!sentence.match(/^[A-Z]/)) {
    issues.push('Does not start with capital letter');
    confidence -= 5;
  }

  // Check for ending punctuation
  if (!sentence.match(/[.!?]$/)) {
    issues.push('Missing end punctuation');
    confidence -= 10;
  }

  // Check for subject
  if (!sentence.match(/\b(i|he|she|we|they|you|jesus|god|it|this|that|what)\b/i)) {
    issues.push('Unclear subject');
    confidence -= 15;
  }

  // Check for verb
  if (!sentence.match(/\b(is|are|was|were|have|has|do|does|going|come|give|take|know|understand|realize|believe|say|tell)\b/i)) {
    issues.push('No clear verb');
    confidence -= 15;
  }

  // Check for run-on or comma splice
  if ((sentence.match(/,/g) || []).length > 3) {
    issues.push('Too many commas (potential run-on)');
    confidence -= 10;
  }

  return {
    isComplete: confidence > 60,
    issues,
    confidence: Math.max(0, confidence),
  };
}

// LOGIC: Does the sentence hold up logically?
export function analyzeLogic(sentence: string): LogicTest {
  const issues: string[] = [];
  let confidence = 100;

  // Check for logical coherence
  if (sentence.includes('but') && sentence.includes('and')) {
    // Might have conflicting ideas
    const parts = sentence.split(/but|and/i);
    if (parts.length > 2) {
      issues.push('Multiple contradictory ideas in one sentence');
      confidence -= 20;
    }
  }

  // Check for vague claims
  if (sentence.match(/\b(some|many|most|few|kind of|sort of|a lot|basically)\b/i)) {
    issues.push('Vague quantifiers reduce precision');
    confidence -= 15;
  }

  // Check for unsupported assertions
  if (sentence.match(/\b(everyone|nobody|always|never)\b/i) && !sentence.match(/\b(god|jesus|scripture|bible)\b/i)) {
    issues.push('Absolute claim without evidence');
    confidence -= 20;
  }

  // Check for hedging language
  if (sentence.match(/\b(i think|i believe|i guess|maybe|perhaps|possibly)\b/i)) {
    issues.push('Hedging language weakens assertion');
    confidence -= 10;
  }

  // Check for self-evident conclusion
  if (sentence.match(/\b(therefore|thus|so|because)\b/i)) {
    // Check if it actually follows from something
    if (!sentence.includes('.') && sentence.length < 20) {
      issues.push('Conclusion without sufficient premise');
      confidence -= 15;
    }
  }

  return {
    isValid: confidence > 60,
    issues,
    confidence: Math.max(0, confidence),
  };
}

// RHETORIC: How powerful is the delivery?
export function analyzeRhetoric(sentence: string): RhetoricTest {
  const issues: string[] = [];
  let confidence = 100;

  // Check for filler words
  if (sentence.match(/\b(um|uh|like|you know|basically|literally|actually|obviously)\b/i)) {
    issues.push('Filler words weaken delivery');
    confidence -= 15;
  }

  // Check for passive voice
  if (sentence.match(/\b(is|are|was|were)\b.*\b(by|of)\b/) && !sentence.includes('God')) {
    issues.push('Passive voice reduces impact');
    confidence -= 10;
  }

  // Check for specificity
  if (!sentence.match(/\b(when|monday|jesus|god|scripture|real|actually|notice|realize)\b/i)) {
    if (sentence.length < 30) {
      issues.push('Lacks specific detail or anchor');
      confidence -= 10;
    }
  }

  // Check for emotional resonance
  if (!sentence.match(/\b(attention|choose|surrender|faith|realize|moment|life|give|receive)\b/i)) {
    if (!sentence.match(/god|jesus|spirit|prayer/i)) {
      issues.push('May lack emotional/spiritual weight');
      confidence -= 10;
    }
  }

  // Check for sentence length (ideal: 8-20 words for impact)
  const wordCount = sentence.split(/\s+/).length;
  if (wordCount < 5) {
    issues.push('Too short to land properly');
    confidence -= 10;
  }
  if (wordCount > 40) {
    issues.push('Too long for verbal delivery');
    confidence -= 15;
  }

  return {
    isStrong: confidence > 60,
    issues,
    confidence: Math.max(0, confidence),
  };
}

// MASTERPROMPT: Does it meet content standards?
export function analyzeMasterprompt(sentence: string): MasterpromptTest {
  const issues: string[] = [];
  let passCount = 0;

  // 1. CORRECT: True and defensible
  const isCorrect: boolean = !sentence.match(/\b(always|never|everyone|nobody)\b/i) || !!sentence.match(/\b(god|jesus|scripture)\b/i);
  if (isCorrect) passCount++;
  else issues.push('Not defensible (absolute claim without evidence)');

  // 2. PRECISE: Specific, not vague
  const isPrecise: boolean = !sentence.match(/\b(kind of|sort of|like|basically|pretty much)\b/i) && sentence.length > 15;
  if (isPrecise) passCount++;
  else issues.push('Too vague or hedged');

  // 3. NOVEL: Says something new
  const commonPhrases = ['good news', 'god loves you', 'have faith', 'believe in jesus'];
  const isNovel: boolean = !commonPhrases.some((p) => sentence.toLowerCase().includes(p));
  if (isNovel) passCount++;
  else issues.push('Sounds clichéd or obvious');

  // 4. USEFUL: Actionable or applicable
  const isUseful: boolean = !!(sentence.match(/\b(when|because|this means|so|therefore|choose|give|attend|notice)\b/i) || sentence.match(/\b(god|jesus|faith|attention)\b/i));
  if (isUseful) passCount++;
  else issues.push('No clear application or mechanism');

  // 5. DELIVERABLE: Works when spoken
  const wordCount = sentence.split(/\s+/).length;
  const isDeliverable: boolean = wordCount < 50 && !sentence.match(/[,;]{2,}/);
  if (isDeliverable) passCount++;
  else issues.push('Too complex to deliver as spoken');

  return {
    isCorrect,
    isPrecise,
    isNovel,
    isUseful,
    isDeliverable,
    issues,
    pass: passCount >= 4,
  };
}

// COMBINED ANALYSIS
export function analyzeSentence(text: string): SentenceAnalysis {
  const trivium: TriviumAnalysis = {
    grammar: analyzeGrammar(text),
    logic: analyzeLogic(text),
    rhetoric: analyzeRhetoric(text),
  };

  const masterprompt = analyzeMasterprompt(text);

  const allPass =
    trivium.grammar.isComplete &&
    trivium.logic.isValid &&
    trivium.rhetoric.isStrong &&
    masterprompt.pass;

  return {
    text,
    trivium,
    masterprompt,
    overallPass: allPass,
  };
}

// REFINE WEAK SENTENCES
export function refineSentence(analysis: SentenceAnalysis): string {
  const { text, masterprompt, trivium } = analysis;
  let refined = text;

  // Remove filler words
  refined = refined.replace(/\b(um|uh|like|basically|literally|actually|obviously)\b/gi, '').replace(/\s+/g, ' ');

  // Replace vague quantifiers with specific language
  refined = refined.replace(/\b(some|many|most)\s+/i, 'Many ');
  refined = refined.replace(/\b(kind of|sort of)\b/gi, '');

  // Remove hedging
  refined = refined.replace(/\b(i think|i believe|i guess|maybe|perhaps)\b/gi, '').replace(/\s+/g, ' ');

  // Add specificity if missing
  if (!refined.match(/\b(when|monday|jesus|god|scripture|attention|choose|surrender)\b/i)) {
    if (refined.includes('life')) {
      refined = refined.replace(/life/, 'the life you give Him');
    }
  }

  // Ensure it starts strong
  if (!refined.match(/^(most|many|here's|what|the|this)\b/i)) {
    if (refined.match(/^(but|so|and)\b/i)) {
      refined = refined.replace(/^(but|so|and)\s+/, '');
    }
  }

  // Trim and capitalize
  refined = refined.trim();
  refined = refined.charAt(0).toUpperCase() + refined.slice(1);

  // Ensure punctuation
  if (!refined.match(/[.!?]$/)) {
    refined += '.';
  }

  return refined;
}

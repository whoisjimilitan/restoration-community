/**
 * TEACHING DIGESTER
 * Deeply understands the teaching before anything else
 * Preserves verbatim phrases and original voice
 */

export interface DigestedTeaching {
  // The full teaching, unchanged
  fullTeaching: string;

  // Complete thoughts (not fragments) - the core ideas
  coreThoughts: string[];

  // Exact phrases from the teaching (verbatim preservation)
  keyPhrases: string[];

  // The central revelation in their own words
  revelation: string;

  // How it actually works (mechanism)
  mechanism: string;

  // What's at stake if ignored
  cost: string;

  // What becomes possible
  transformation: string;

  // Themes present in the teaching
  themes: string[];

  // The teaching's primary movement (what it's trying to do)
  primaryMovement: 'conviction' | 'realization' | 'confession' | 'question' | 'challenge';
}

export function digestTeaching(transcript: string): DigestedTeaching {
  const cleaned = transcript.trim();

  // Identify key verbatim phrases (exact quotes from teaching)
  const keyPhrases = extractKeyPhrases(cleaned);

  // Extract complete thoughts (not just sentences)
  const coreThoughts = extractCoreThoughts(cleaned);

  // Understand the revelation (the core insight)
  const revelation = extractRevelation(cleaned, keyPhrases);

  // Understand the mechanism (how it works)
  const mechanism = extractMechanism(cleaned, keyPhrases);

  // Understand the cost (what's at stake)
  const cost = extractCost(cleaned, keyPhrases);

  // Understand the transformation (what becomes possible)
  const transformation = extractTransformation(cleaned, keyPhrases);

  // Identify themes
  const themes = identifyThemes(cleaned);

  // Identify primary movement
  const primaryMovement = identifyPrimaryMovement(cleaned);

  return {
    fullTeaching: cleaned,
    coreThoughts,
    keyPhrases,
    revelation,
    mechanism,
    cost,
    transformation,
    themes,
    primaryMovement,
  };
}

/**
 * Extract key phrases - exact quotes that carry the weight of the teaching
 * These are the parts that must stay verbatim
 */
function extractKeyPhrases(text: string): string[] {
  const phrases: string[] = [];

  // Look for complete sentences with strong conviction language
  const strengthWords = [
    'realized', 'understand', 'truth', 'here', 'means', 'happens',
    'choosing', 'choice', 'decide', 'decision', 'moment', 'every', 'daily', 'morning', 'alarm'
  ];

  // Split into sentences and find those with substance
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  sentences.forEach(sent => {
    const cleaned = sent.trim();
    if (cleaned.length < 15) return; // Too short

    // Check if sentence has conviction language
    const hasStrength = strengthWords.some(word =>
      cleaned.toLowerCase().includes(word.toLowerCase())
    );

    if (hasStrength && cleaned.length < 400) {
      // Ensure proper punctuation
      const final = cleaned.endsWith('.') || cleaned.endsWith('!') || cleaned.endsWith('?')
        ? cleaned
        : cleaned + '.';
      phrases.push(final);
    }
  });

  // If extraction found nothing, fall back to longest sentences
  if (phrases.length === 0) {
    sentences
      .filter(s => s.trim().length > 30)
      .sort((a, b) => b.length - a.length)
      .slice(0, 5)
      .forEach(s => {
        const trimmed = s.trim();
        const final = trimmed.endsWith('.') || trimmed.endsWith('!') || trimmed.endsWith('?')
          ? trimmed
          : trimmed + '.';
        phrases.push(final);
      });
  }

  return phrases.slice(0, 8); // Return top phrases
}

/**
 * Extract core thoughts - complete ideas the teaching is conveying
 */
function extractCoreThoughts(text: string): string[] {
  const thoughts: string[] = [];
  const paragraphs = text.split(/\n\n+/);

  paragraphs.forEach(para => {
    const trimmed = para.trim();
    if (trimmed.length > 30) {
      thoughts.push(trimmed);
    }
  });

  // If no paragraph breaks, use full text as single thought
  if (thoughts.length === 0) {
    thoughts.push(text);
  }

  return thoughts;
}

/**
 * Extract revelation - what is the core insight being taught?
 * Preserve original language if possible
 */
function extractRevelation(text: string, keyPhrases: string[]): string {
  // Look for phrases with "realized", "understand", "here's what"
  const revelationPatterns = [
    /here'?s? (?:what )?(.{20,200}?)(?:\.|!|\?|$)/i,
    /realized? (?:that )?(.{20,200}?)(?:\.|!|\?|$)/i,
    /understand (?:that )?(.{20,200}?)(?:\.|!|\?|$)/i,
    /truth (?:is )?(.{20,200}?)(?:\.|!|\?|$)/i,
  ];

  for (const pattern of revelationPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Fall back to first key phrase if it exists
  if (keyPhrases.length > 0) {
    return keyPhrases[0];
  }

  // Last resort: first substantial sentence
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences[0]?.trim() || text;
}

/**
 * Extract mechanism - how does this actually work?
 */
function extractMechanism(text: string, keyPhrases: string[]): string {
  const mechanismPatterns = [
    /(?:when|because|by|through) (.{20,250}?)(?:\.|!|\?|$)/i,
    /that'?s? (?:where|how|what) (.{20,250}?)(?:\.|!|\?|$)/i,
    /happens when (.{20,250}?)(?:\.|!|\?|$)/i,
    /choosing (.{20,250}?)(?:\.|!|\?|$)/i,
  ];

  for (const pattern of mechanismPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Look for phrases about daily choice, morning, moment, etc
  if (text.match(/morning|alarm|day|moment|choice/i)) {
    const match = text.match(/(?:.*?)(?:every|each|the)? (?:morning|day|moment|choice)(.{10,200}?)(?:\.|!|\?|$)/i);
    if (match) return 'The daily choice.' + (match[1] ? ' ' + match[1].trim() : '');
  }

  // Use a key phrase if available
  if (keyPhrases.length > 1) {
    return keyPhrases[1];
  }

  return 'The daily practice of choosing.';
}

/**
 * Extract cost - what happens if this is ignored?
 */
function extractCost(text: string, keyPhrases: string[]): string {
  const costPatterns = [
    /(?:if|without|miss|lose|don't) (.{20,200}?)(?:,|;|\.)/i,
    /(?:stay|remain|stuck) (.{20,200}?)(?:\.|!|\?|$)/i,
  ];

  for (const pattern of costPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Default based on context
  if (text.match(/decision|moment|choice/i)) {
    return 'You stay stuck believing one moment carries you, missing where real power actually lives.';
  }

  return 'You remain disconnected from the truth, stuck in the same patterns.';
}

/**
 * Extract transformation - what becomes possible?
 */
function extractTransformation(text: string, keyPhrases: string[]): string {
  const transformPatterns = [
    /(?:when|if).*?(?:understand|get|see) (?:this|that)(.{20,250}?)(?:\.|!|\?|$)/i,
    /you (?:can|will|become) (.{20,200}?)(?:\.|!|\?|$)/i,
    /(?:then|that means) (.{20,250}?)(?:\.|!|\?|$)/i,
  ];

  for (const pattern of transformPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Contextual default
  if (text.match(/choosing|daily|morning/i)) {
    return 'Power moves from the past moment to the present choice. Transformation becomes possible, not in memory, but right now.';
  }

  return 'You move from belief to lived reality.';
}

/**
 * Identify themes present in the teaching
 */
function identifyThemes(text: string): string[] {
  const themes: string[] = [];

  if (/daily|morning|every day|every moment/i.test(text)) themes.push('Daily Choice');
  if (/realize|understand|truth|insight/i.test(text)) themes.push('Revelation');
  if (/choose|choosing|decision/i.test(text)) themes.push('Volition');
  if (/moment|time|now/i.test(text)) themes.push('Present Reality');
  if (/sunday|prayer|commitment|faith/i.test(text)) themes.push('Spiritual Commitment');
  if (/power|strength|freedom/i.test(text)) themes.push('Liberation');
  if (/stuck|pattern|confusion/i.test(text)) themes.push('The Cost');

  return themes.length > 0 ? themes : ['Teaching'];
}

/**
 * Identify the primary movement - what is the teaching trying to do?
 */
function identifyPrimaryMovement(text: string): 'conviction' | 'realization' | 'confession' | 'question' | 'challenge' {
  const lower = text.toLowerCase();

  if (lower.includes('most people') || lower.includes('many')) return 'conviction';
  if (lower.includes('realized') || lower.includes('understand')) return 'realization';
  if (lower.includes('spent') || lower.includes('years') || lower.includes('thought')) return 'confession';
  if (lower.includes('?') || lower.includes('why')) return 'question';
  if (lower.includes('here\'s what') || lower.includes('that\'s')) return 'challenge';

  return 'realization';
}

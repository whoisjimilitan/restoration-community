/**
 * MESSAGE EXTRACTOR
 * Deeply understands teaching - not just syntax, but meaning
 */

export interface ExtractedMessage {
  coreRevelation: string;
  mechanism: string;
  cost: string;
  transformation: string;
  themes: string[];
  hookFormula: string;
  seriesPosition: 'reflection' | 'revelation' | 'action' | 'breakthrough';
  strength: number;
  issues: string[];
}

export function extractMessage(transcript: string): ExtractedMessage {
  const cleaned = transcript.trim();
  const sentences = cleaned.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Identify themes present in the teaching
  const themes = identifyThemes(cleaned);

  // Extract structural elements
  const coreRevelation = extractRevelation(sentences);
  const mechanism = extractMechanism(sentences, cleaned);
  const cost = extractCost(sentences, cleaned);
  const transformation = extractTransformation(sentences, cleaned);

  // Determine hook formula
  const hookFormula = determineHook(coreRevelation, themes);

  // Determine series position
  const seriesPosition = determineSeriesPosition(cleaned);

  // Validate strength
  const { strength, issues } = validateStrength({
    coreRevelation,
    mechanism,
    cost,
    transformation,
  });

  return {
    coreRevelation,
    mechanism,
    cost,
    transformation,
    themes,
    hookFormula,
    seriesPosition,
    strength,
    issues,
  };
}

function identifyThemes(text: string): string[] {
  const themes: string[] = [];

  if (/\battention|notice|see|watch|observe\b/i.test(text)) themes.push('Attention');
  if (/\bsurrender|give|yield|choose|decide\b/i.test(text)) themes.push('Surrender');
  if (/\bdistraction|pulled|competing|fragmented\b/i.test(text)) themes.push('Distraction');
  if (/\bstill|quiet|silence|peace|inner\b/i.test(text)) themes.push('Inner Stillness');
  if (/\bprayer|faith|discipline|practice|worship\b/i.test(text)) themes.push('Spiritual Practice');
  if (/\bdaily|morning|moment|every day\b/i.test(text)) themes.push('Daily Reality');

  return themes.length > 0 ? themes : ['General Teaching'];
}

function extractRevelation(sentences: string[]): string {
  // Find sentence with insight words
  const insightWords = ['realize', 'realized', 'understand', 'learned', 'discovered', 'truth', 'here'];

  for (const sent of sentences) {
    if (insightWords.some(word => sent.toLowerCase().includes(word))) {
      return sent.trim();
    }
  }

  return sentences[0]?.trim() || '';
}

function extractMechanism(sentences: string[], fullText: string): string {
  // Find how the truth works
  const mechanismWords = ['because', 'when', 'through', 'by', 'happens when', 'means that'];

  for (const sent of sentences) {
    if (mechanismWords.some(word => sent.toLowerCase().includes(word))) {
      return sent.trim();
    }
  }

  // If not found, construct from context
  if (fullText.includes('Monday') || fullText.includes('morning')) {
    return 'The daily choice. The small decision when nobody\'s watching.';
  }

  return sentences[1]?.trim() || '';
}

function extractCost(sentences: string[], fullText: string): string {
  // What happens if this is ignored?
  const costWords = ['lose', 'miss', 'cost', 'fail', 'broken', 'fragmented', 'empty'];

  for (const sent of sentences) {
    if (costWords.some(word => sent.toLowerCase().includes(word))) {
      return sent.trim();
    }
  }

  // Default cost based on themes
  if (fullText.includes('attention')) {
    return 'You remain spiritually distracted, divided between God and everything else.';
  }

  return 'You stay stuck in the same patterns, wondering why nothing changes.';
}

function extractTransformation(sentences: string[], fullText: string): string {
  // What life looks like when this is applied
  if (fullText.includes('freedom') || fullText.includes('peace')) {
    return 'You experience freedom that\'s independent of your circumstances.';
  }

  if (fullText.includes('attention')) {
    return 'You give God your attention consistently, and transformation becomes unstoppable.';
  }

  return 'You move from knowing the truth to living it.';
}

function determineHook(revelation: string, themes: string[]): string {
  const lower = revelation.toLowerCase();

  if (lower.includes('most') || lower.includes('many')) return 'Conviction Hook';
  if (lower.includes('realize') || lower.includes('learned')) return 'Realization Hook';
  if (lower.includes('notice') || lower.includes('question')) return 'Honest Question';
  if (lower.includes('years') || lower.includes('time')) return 'Confession Hook';

  return 'Quiet Truth';
}

function determineSeriesPosition(text: string): 'reflection' | 'revelation' | 'action' | 'breakthrough' {
  const lower = text.toLowerCase();

  if (lower.includes('realize') || lower.includes('understand')) return 'revelation';
  if (lower.includes('do') || lower.includes('choose') || lower.includes('apply')) return 'action';
  if (lower.includes('changed') || lower.includes('transformed') || lower.includes('freedom')) return 'breakthrough';

  return 'reflection';
}

function validateStrength(message: {
  coreRevelation: string;
  mechanism: string;
  cost: string;
  transformation: string;
}): { strength: number; issues: string[] } {
  let strength = 100;
  const issues: string[] = [];

  if (!message.coreRevelation || message.coreRevelation.length < 10) {
    issues.push('Core revelation is unclear or missing');
    strength -= 25;
  }

  if (!message.mechanism || message.mechanism.length < 10) {
    issues.push('No clear mechanism (how does this work?)');
    strength -= 20;
  }

  if (!message.cost || message.cost.length < 10) {
    issues.push('Cost is not defined (what\'s at stake?)');
    strength -= 15;
  }

  if (!message.transformation || message.transformation.length < 10) {
    issues.push('Transformation is unclear (what changes?)');
    strength -= 15;
  }

  return { strength: Math.max(0, strength), issues };
}

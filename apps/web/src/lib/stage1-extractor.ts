/**
 * Stage 1: Extract exact core teaching from transcript
 * Identifies the main message and formats it cleanly with exact quotes
 */

export interface Stage1Output {
  title: string;
  coreRevelation: string;
  quotableStatements: string[];
  supportingContext: string;
}

export function extractStage1ExactDelivery(transcript: string): Stage1Output {
  console.log('[STAGE1] Extracting core teaching and quotable statements...');

  // Find title (usually appears after "# " or look for content markers)
  const titleMatch = transcript.match(/# (.+?)\n|(?:Title|title):\s*(.+?)(?:\n|$)/);
  const title = titleMatch
    ? (titleMatch[1] || titleMatch[2]).trim()
    : extractTitleFromContent(transcript);

  // Split into sentences
  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);

  // Extract quotable statements (memorable, standalone lines)
  const quotables = extractQuotableStatements(sentences);

  // Find core revelation (the central truth)
  const coreRevelation = extractCoreRevelation(sentences, quotables);

  // Get supporting context (2-3 key supporting sentences)
  const supportingContext = extractSupportingContext(sentences, quotables);

  console.log(`[STAGE1] Extracted: "${title}" | ${quotables.length} quotables | Core: "${coreRevelation}"`);

  return {
    title,
    coreRevelation,
    quotableStatements: quotables,
    supportingContext,
  };
}

function extractTitleFromContent(transcript: string): string {
  // Look for teaching markers
  const markers = [
    /title.*?of.*?our.*?message.*?today.*?[,:]?\s*"?([^".\n]+)/i,
    /message.*?today.*?[,:]?\s*"?([^".\n]+)/i,
    /this leads me to the title.*?[,:]?\s*"?([^".\n]+)/i,
  ];

  for (const marker of markers) {
    const match = transcript.match(marker);
    if (match) return match[1].trim();
  }

  return 'Teaching';
}

function extractQuotableStatements(sentences: string[]): string[] {
  const quotables: Array<{ sentence: string; score: number }> = [];

  for (const sentence of sentences) {
    let score = 0;

    // Score based on quotability markers
    if (/^[A-Z].*?[.!?]$/.test(sentence)) score += 1; // Complete sentence, starts with capital
    if (sentence.length > 30 && sentence.length < 200) score += 2; // Optimal quotable length
    if (/\byou\b|\bI\b|\bwe\b/.test(sentence)) score += 1; // Personal pronouns
    if (/comes\s+by|is\s+(?:the|a)|will\s+(?:bring|change|reveal)/.test(sentence)) score += 2; // Revelation patterns
    if (/^(?:A|No one|There|When|If)\b/.test(sentence)) score += 1; // Strong opening
    if (/grace|faith|god|jesus|spirit|truth|freedom|transform|restore/i.test(sentence)) score += 2; // Theological weight
    if (/(,.*?){2,}/.test(sentence)) score -= 1; // Complex punctuation (less quotable)

    if (score > 0) {
      quotables.push({ sentence, score });
    }
  }

  // Return top 3 quotables, sorted by position then score
  return quotables
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(q => q.sentence.trim());
}

function extractCoreRevelation(sentences: string[], quotables: string[]): string {
  // First, check if any quotable IS the core revelation
  for (const quotable of quotables) {
    if (/comes\s+by|is\s+the|cannot\s+be|must\s+have/i.test(quotable)) {
      return quotable;
    }
  }

  // Otherwise, find the sentence that best expresses the core truth
  const revelationPatterns = [
    /^([A-Z].+?(?:comes\s+by|is|cannot|must).+?[.!?])$/,
    /^([A-Z].+?grace.+?[.!?])$/i,
    /^([A-Z].+?truth.+?[.!?])$/i,
  ];

  for (const pattern of revelationPatterns) {
    for (const sentence of sentences) {
      const match = sentence.match(pattern);
      if (match) return sentence.trim();
    }
  }

  // Fallback: use longest quotable
  return quotables.reduce((a, b) => a.length > b.length ? a : b, quotables[0] || 'The truth transforms us');
}

function extractSupportingContext(sentences: string[], quotables: string[]): string {
  // Find sentences that support but aren't quotables themselves
  const supporting: string[] = [];

  for (const sentence of sentences) {
    if (!quotables.includes(sentence) && sentence.length > 50 && supporting.length < 3) {
      // Prefer sentences with examples or supporting evidence
      if (/(?:example|like|such as|when|because|therefore|but|however)/i.test(sentence)) {
        supporting.push(sentence.trim());
      }
    }
  }

  // If we don't have enough, just take the next non-quotable sentences
  if (supporting.length < 2) {
    for (const sentence of sentences) {
      if (!quotables.includes(sentence) && supporting.length < 3) {
        supporting.push(sentence.trim());
      }
    }
  }

  return supporting.slice(0, 3).join(' ');
}

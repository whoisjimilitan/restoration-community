/**
 * VERBATIM EXTRACTOR
 * Ring-fences standout statements, scripture, and key phrases
 * These elements are LOCKED and cannot be modified
 */

export interface VerbatimElement {
  type: 'statement' | 'scripture' | 'keyPhrase';
  text: string; // NEVER MODIFIED - word for word from source
  originalContext: string; // sentence/paragraph where it appeared
  lineNumber: number; // position in teaching
  locked: true; // immutable flag
  strength: 'high' | 'medium' | 'low'; // how essential is this?
  scriptureSupport?: {
    original: string[]; // verses from original teaching
    canAddSupporting: boolean; // allow new verses for reinforcement
  };
}

/**
 * Extract verbatim elements from raw content
 */
export function extractVerbatimElements(content: string): VerbatimElement[] {
  console.log('[VERBATIM-EXTRACTOR] Identifying ring-fenced elements');

  const lines = content.split('\n');
  const elements: VerbatimElement[] = [];

  // Find scripture references
  const scriptureElements = extractScripture(content, lines);
  elements.push(...scriptureElements);

  // Find standout statements
  const statementElements = extractStandoutStatements(content, lines);
  elements.push(...statementElements);

  // Find key phrases
  const phraseElements = extractKeyPhrases(content, lines);
  elements.push(...phraseElements);

  console.log('[VERBATIM-EXTRACTOR] Found', elements.length, 'ring-fenced elements');
  elements.forEach((el) => {
    console.log(`  [${el.type.toUpperCase()}] "${el.text.substring(0, 60)}..."`);
  });

  return elements;
}

/**
 * Extract scripture references (e.g., "John 3:16", "Ephesians 6:12")
 */
function extractScripture(content: string, lines: string[]): VerbatimElement[] {
  const elements: VerbatimElement[] = [];

  // Bible book pattern: Book Chapter:Verse(s)
  const scripturePattern =
    /\b((?:1|2|3)?(?:John|Peter|Corinthians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|Romans|Galatians|Ephesians|Philippians|Colossians|Genesis|Exodus|Leviticus|Numbers|Deuteronomy))\s+(\d+):(\d+(?:-\d+)?)\b/gi;

  let match;
  while ((match = scripturePattern.exec(content)) !== null) {
    const fullReference = match[0];
    const lineNumber = content.substring(0, match.index).split('\n').length - 1;

    elements.push({
      type: 'scripture',
      text: fullReference,
      originalContext: lines[lineNumber] || fullReference,
      lineNumber,
      locked: true,
      strength: 'high',
      scriptureSupport: {
        original: [fullReference],
        canAddSupporting: true,
      },
    });
  }

  return elements;
}

/**
 * Extract standout statements
 * These are complete sentences that carry spiritual weight
 */
function extractStandoutStatements(content: string, lines: string[]): VerbatimElement[] {
  const elements: VerbatimElement[] = [];

  // Patterns that indicate standout statements
  const standoutPatterns = [
    /^[^.!?]*\b(I realized?|I understand|I learned|The truth is|Here'?s what|This is|That is)[^.!?]*[.!?]/im,
    /^[^.!?]*\b(Until|But|Yet|Then|So)[^.!?]*[.!?]/im,
    /^[^.!?]*\b(He delivered|She delivered|God|Jesus|The Lord|Christ)[^.!?]*[.!?]/im,
    /^[^.!?]*\b(I too|I justified|I convinced|I blamed)[^.!?]*[.!?]/im,
  ];

  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];

  sentences.forEach((sentence, index) => {
    const trimmed = sentence.trim();
    if (trimmed.length < 20) return; // Too short

    // Check if matches standout pattern
    const matches = standoutPatterns.some((pattern) => pattern.test(trimmed));

    if (matches) {
      const lineNumber = content.substring(0, content.indexOf(sentence)).split('\n').length - 1;

      elements.push({
        type: 'statement',
        text: trimmed,
        originalContext: trimmed,
        lineNumber,
        locked: true,
        strength: determineStatementStrength(trimmed),
      });
    }
  });

  return elements;
}

/**
 * Extract key phrases that repeat throughout teaching
 * These become spiritual anchors
 */
function extractKeyPhrases(content: string, lines: string[]): VerbatimElement[] {
  const elements: VerbatimElement[] = [];

  // Extract potential key phrases (4-10 words typically)
  const phrasePattern = /\b[\w\s]{10,40}(?:spirit|truth|freedom|deliver|faith|God|Jesus|Christ|encounter|choice|control)\b/gi;

  const phrases = new Map<string, number>(); // phrase -> count

  let match;
  while ((match = phrasePattern.exec(content)) !== null) {
    const phrase = match[0].trim();
    if (phrase.length > 10 && phrase.length < 50) {
      phrases.set(phrase.toLowerCase(), (phrases.get(phrase.toLowerCase()) || 0) + 1);
    }
  }

  // Keep phrases that appear 2+ times (they're anchors)
  phrases.forEach((count, phrase) => {
    if (count >= 2) {
      const lineNumber = content.substring(0, content.indexOf(phrase)).split('\n').length - 1;

      elements.push({
        type: 'keyPhrase',
        text: phrase,
        originalContext: phrase,
        lineNumber,
        locked: true,
        strength: count >= 3 ? 'high' : 'medium',
      });
    }
  });

  return elements;
}

/**
 * Determine how essential a statement is
 */
function determineStatementStrength(statement: string): 'high' | 'medium' | 'low' {
  const lower = statement.toLowerCase();

  // High strength indicators
  if (
    lower.includes('i realized') ||
    lower.includes('the truth') ||
    lower.includes('until') ||
    lower.includes('delivered') ||
    lower.includes('here\'s what')
  ) {
    return 'high';
  }

  // Medium strength indicators
  if (
    lower.includes('i') ||
    lower.includes('he') ||
    lower.includes('god') ||
    lower.includes('jesus')
  ) {
    return 'medium';
  }

  return 'low';
}

/**
 * Validate that verbatim elements are preserved in output
 */
export function validateVerbatimPreservation(
  output: string,
  verbatimElements: VerbatimElement[]
): {
  passed: boolean;
  missing: VerbatimElement[];
  preserved: VerbatimElement[];
} {
  const missing: VerbatimElement[] = [];
  const preserved: VerbatimElement[] = [];

  verbatimElements.forEach((element) => {
    // For statements and phrases, check if verbatim text is preserved
    if (output.includes(element.text)) {
      preserved.push(element);
    } else {
      missing.push(element);
    }
  });

  return {
    passed: missing.length === 0,
    missing,
    preserved,
  };
}

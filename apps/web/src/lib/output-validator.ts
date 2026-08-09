/**
 * OUTPUT VALIDATOR
 * Validates that verbatim elements are preserved and meaning is unchanged
 * Acts as final gate before output is delivered
 */

import type { VerbatimElement } from './verbatim-extractor';

export interface VerbatimValidation {
  passed: boolean;
  allStatementsIncluded: boolean;
  allScripturePreserved: boolean;
  meaningUnchanged: boolean;
  missingStatements: VerbatimElement[];
  alteredStatements: { original: string; found: string }[];
  preservedCount: number;
  issues: string[];
}

/**
 * Validate that all verbatim elements are preserved in output
 */
export function validateVerbatimInOutput(
  output: string,
  verbatimElements: VerbatimElement[]
): VerbatimValidation {
  console.log('[OUTPUT-VALIDATOR] Checking verbatim preservation...');

  const statements = verbatimElements.filter((v) => v.type === 'statement');
  const scripture = verbatimElements.filter((v) => v.type === 'scripture');
  const keyPhrases = verbatimElements.filter((v) => v.type === 'keyPhrase');

  const missingStatements: VerbatimElement[] = [];
  const alteredStatements: { original: string; found: string }[] = [];
  let preservedCount = 0;
  const issues: string[] = [];

  // Check statements
  statements.forEach((stmt) => {
    if (output.includes(stmt.text)) {
      preservedCount++;
    } else {
      // Check if statement is paraphrased
      const paraphrased = findSimilarText(output, stmt.text);
      if (paraphrased) {
        alteredStatements.push({
          original: stmt.text,
          found: paraphrased,
        });
        issues.push(`Statement altered: "${stmt.text}" → "${paraphrased}"`);
      } else {
        missingStatements.push(stmt);
        issues.push(`MISSING statement: "${stmt.text}"`);
      }
    }
  });

  // Check scripture
  scripture.forEach((verse) => {
    if (!output.includes(verse.text)) {
      missingStatements.push(verse);
      issues.push(`MISSING scripture: "${verse.text}"`);
    } else {
      preservedCount++;
    }
  });

  // Check key phrases (at least 50% should be present)
  const keyPhrasesFound = keyPhrases.filter((kp) => output.includes(kp.text)).length;
  if (keyPhrasesFound < keyPhrases.length * 0.5) {
    issues.push(
      `Key phrases not adequately preserved: ${keyPhrasesFound}/${keyPhrases.length} found`
    );
  } else {
    preservedCount += keyPhrasesFound;
  }

  const allStatementsIncluded = missingStatements.length === 0 && alteredStatements.length === 0;
  const allScripturePreserved = scripture.every((s) => output.includes(s.text));
  const meaningUnchanged = alteredStatements.length === 0;
  const passed = allStatementsIncluded && allScripturePreserved && meaningUnchanged;

  if (passed) {
    console.log('[OUTPUT-VALIDATOR] ✓ All verbatim elements preserved');
  } else {
    console.log('[OUTPUT-VALIDATOR] ✗ Verbatim validation FAILED');
    issues.forEach((issue) => console.log(`  - ${issue}`));
  }

  return {
    passed,
    allStatementsIncluded,
    allScripturePreserved,
    meaningUnchanged,
    missingStatements,
    alteredStatements,
    preservedCount,
    issues,
  };
}

/**
 * Find similar text if exact match not found (detects paraphrasing)
 */
function findSimilarText(output: string, originalText: string): string | null {
  // If close to 80% of words match, consider it found
  const originalWords = originalText.toLowerCase().split(/\s+/);
  const outputSentences = output.match(/[^.!?]+[.!?]+/g) || [];

  for (const sentence of outputSentences) {
    const sentenceWords = sentence.toLowerCase().split(/\s+/);
    const matchCount = originalWords.filter((word) =>
      sentenceWords.some((sWord) => sWord.includes(word))
    ).length;

    const matchRatio = matchCount / originalWords.length;
    if (matchRatio >= 0.8) {
      return sentence.trim();
    }
  }

  return null;
}

/**
 * Check if meaning has shifted
 */
export function checkMeaningShift(
  original: string,
  output: string
): {
  shiftDetected: boolean;
  details: string[];
} {
  const details: string[] = [];

  // Check for negation flips (e.g., "is not" becomes "is")
  const negationPatterns = [
    { pattern: /not\s+(\w+)/gi, name: 'negation' },
    { pattern: /cannot\s+(\w+)/gi, name: 'inability' },
  ];

  negationPatterns.forEach(({ pattern, name }) => {
    const originalNegations = original.match(pattern) || [];
    const outputNegations = output.match(pattern) || [];

    if (originalNegations.length > outputNegations.length) {
      details.push(`Lost ${name} markers`);
    }
  });

  // Check for tone shift (e.g., hopeful vs. negative)
  const hopefulWords = ['can', 'will', 'possible', 'freedom', 'delivered'];
  const negativeWords = ['cannot', 'impossible', 'stuck', 'trapped'];

  const originalHopeful = hopefulWords.filter((w) => original.toLowerCase().includes(w))
    .length;
  const outputHopeful = hopefulWords.filter((w) => output.toLowerCase().includes(w)).length;

  if (originalHopeful > outputHopeful) {
    details.push('Lost hopeful tone');
  }

  return {
    shiftDetected: details.length > 0,
    details,
  };
}

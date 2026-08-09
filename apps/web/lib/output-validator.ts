import type { VerbatimElement } from './verbatim-extractor';

export interface ValidationResult {
  passed: boolean;
  preservedCount: number;
  issues: string[];
}

export function validateVerbatimInOutput(output: string, verbatimElements: VerbatimElement[]): ValidationResult {
  const statements = verbatimElements.filter(v => v.type === 'statement');
  let preservedCount = 0;
  const issues: string[] = [];

  statements.forEach(stmt => {
    const firstWords = stmt.text.substring(0, 20);
    if (output.includes(firstWords)) {
      preservedCount++;
    } else {
      issues.push(`Missing: "${stmt.text.substring(0, 30)}..."`);
    }
  });

  return {
    passed: preservedCount === statements.length,
    preservedCount,
    issues,
  };
}

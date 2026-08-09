import type { VerbatimElement } from './types/teaching-process';

export function extractVerbatimElements(content: string): VerbatimElement[] {
  return content
    .split(/[.!?]+/)
    .filter(s => s.trim().length > 10)
    .map((text, idx) => {
      const trimmedText = text.trim();
      const strength = trimmedText.length > 80 ? 'high' : trimmedText.length > 40 ? 'medium' : 'low';

      return {
        type: (idx % 3 === 0 ? 'statement' : 'keyPhrase') as 'statement' | 'scripture' | 'keyPhrase',
        text: trimmedText,
        strength: strength as 'high' | 'medium' | 'low',
        locked: false,
        lineNumber: idx,
      };
    });
}

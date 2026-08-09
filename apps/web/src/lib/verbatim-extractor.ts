import type { VerbatimElement } from './types/teaching-process';

function detectHookType(text: string): { hookType: 'question' | 'scenario' | 'quote' | 'story' | 'contradiction' | null; priority: number } {
  const lower = text.toLowerCase();

  // Question hook - opens with question
  if (text.trim().startsWith('Have you') || text.trim().startsWith('Do you') || text.trim().startsWith('What if') || text.includes('?')) {
    return { hookType: 'question', priority: 9 };
  }

  // Vivid scenario - contains action verbs + visual language
  const actionVerbs = /running|walking|standing|falling|breaking|opening|closing|seeing|watching|looking/i;
  const vividWords = /running|central park|crime|body|scene|moment|picture/i;
  if (actionVerbs.test(text) && text.length > 50) {
    return { hookType: 'scenario', priority: 9 };
  }

  // Powerful quote - short, punchy, standalone
  if (text.length < 80 && (text.includes('"') || text.endsWith('.'))) {
    const emotionalWords = /power|love|faith|fear|hope|truth|freedom|grace|mercy|salvation|Jesus|God|eternal|forever/i;
    if (emotionalWords.test(text)) {
      return { hookType: 'quote', priority: 8 };
    }
  }

  // Story/narrative hook - personal pronouns + past tense or lived experience
  const narrative = /I walked|I saw|I faced|I learned|my journey|my story|happened to me|experienced/i;
  if (narrative.test(text)) {
    return { hookType: 'story', priority: 8 };
  }

  // Contradiction/turning point - contrast words
  const contrast = /but|however|yet|instead|rather|although|while|whereas/i;
  if (contrast.test(text) && text.length > 40) {
    return { hookType: 'contradiction', priority: 7 };
  }

  return { hookType: null, priority: 0 };
}

export function extractVerbatimElements(content: string): VerbatimElement[] {
  return content
    .split(/[.!?]+/)
    .filter(s => s.trim().length > 10)
    .map((text, idx) => {
      const trimmedText = text.trim();
      const strength = trimmedText.length > 80 ? 'high' : trimmedText.length > 40 ? 'medium' : 'low';
      const { hookType, priority } = detectHookType(trimmedText);

      return {
        type: (idx % 3 === 0 ? 'statement' : 'keyPhrase') as 'statement' | 'scripture' | 'keyPhrase',
        text: trimmedText,
        strength: strength as 'high' | 'medium' | 'low',
        locked: false,
        lineNumber: idx,
        hookType,
        hookPriority: priority,
      };
    });
}

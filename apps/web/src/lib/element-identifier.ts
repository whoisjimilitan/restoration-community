export interface IdentifiedElements {
  revelation: string;
  contrast: string;
  coreMessage: string;
  identityChoice: string;
  callToAction: string;
}

/**
 * Extracts key elements from an expanded narrative
 */
export function identifyElements(narrative: string): IdentifiedElements {
  console.log('[IDENTIFIER] Identifying elements in narrative');

  // Split narrative into sentences for analysis
  const sentences = narrative.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  const revelation = extractRevelation(narrative, sentences);
  const contrast = extractContrast(narrative, sentences);
  const coreMessage = extractCoreMessage(narrative, sentences);
  const identityChoice = extractIdentityChoice(narrative, sentences);
  const callToAction = extractCallToAction(narrative, sentences);

  console.log('[IDENTIFIER] Elements identified');

  return {
    revelation,
    contrast,
    coreMessage,
    identityChoice,
    callToAction,
  };
}

function extractRevelation(narrative: string, sentences: string[]): string {
  // Look for key revelation statements
  const revelationKeywords = ['spiritual', 'bondage', 'trap', 'choice', 'freedom', 'reality'];
  const relevant = sentences.find((s) =>
    revelationKeywords.some((kw) => s.toLowerCase().includes(kw))
  );

  if (relevant) {
    return relevant.trim();
  }

  // Fallback: use middle sentence
  return sentences[Math.floor(sentences.length / 2)];
}

function extractContrast(narrative: string, sentences: string[]): string {
  // Look for contrasts (promised vs delivered, etc)
  if (narrative.toLowerCase().includes('but')) {
    const parts = narrative.split(/but/i);
    if (parts.length >= 2) {
      return `${parts[0].trim().substring(0, 100)}... But ${parts[1].trim().substring(0, 100)}...`;
    }
  }

  // Fallback: last two sentences
  return sentences.slice(-2).join('. ');
}

function extractCoreMessage(narrative: string, sentences: string[]): string {
  // Last significant statement usually contains core message
  if (sentences.length >= 2) {
    return sentences[sentences.length - 2];
  }
  return sentences[sentences.length - 1] || 'The power is yours.';
}

function extractIdentityChoice(narrative: string, _sentences: string[]): string {
  // Extract what identity choice is being made
  if (narrative.toLowerCase().includes('jesus')) {
    return 'Choosing freedom through Jesus Christ';
  }
  if (narrative.toLowerCase().includes('bondage')) {
    return 'Breaking free from spiritual bondage';
  }
  return 'Choosing truth over deception';
}

function extractCallToAction(narrative: string, _sentences: string[]): string {
  // Extract or infer the call to action
  if (narrative.toLowerCase().includes('meet')) {
    return 'Meet Jesus';
  }
  if (narrative.toLowerCase().includes('choose')) {
    return 'Choose differently';
  }
  if (narrative.toLowerCase().includes('encounter')) {
    return 'Encounter Him';
  }
  return 'Take the next step';
}

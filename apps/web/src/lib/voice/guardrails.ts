export interface GuardRails {
  inverseIncentivePattern: {
    description: string;
    examples: string[];
  };
  truthProtocol: {
    description: string;
    rules: string[];
  };
  brutalHonesty: {
    description: string;
    markers: string[];
  };
  validityChecking: {
    description: string;
    checkPoints: string[];
  };
}

export function createGuardRails(): GuardRails {
  return {
    inverseIncentivePattern: {
      description: "Truth often inverts what the world teaches",
      examples: [
        "The world says: achieve more → you'll be happy. Truth: decrease yourself → He increases",
        "The world says: protect yourself → you'll be safe. Truth: lose your life → you'll find it",
      ],
    },
    truthProtocol: {
      description: "State truth plainly without softening",
      rules: [
        "Don't cushion hard truths with softening language",
        "Use 'but' or 'however' to mark inversions clearly",
        "Confirm with Scripture immediately after stating truth",
      ],
    },
    brutalHonesty: {
      description: "Express the real cost and real benefit",
      markers: [
        "The lie people believe",
        "The actual truth",
        "Why this matters",
        "What changes when you believe this",
      ],
    },
    validityChecking: {
      description: "Ensure every claim is logically sound and scripturally grounded",
      checkPoints: [
        "Does the conclusion follow from premises?",
        "Is each premise scripturally supported?",
        "Would this stand up to logical scrutiny?",
      ],
    },
  };
}

export function applyTriviumVoice(text: string, guardrails: GuardRails): string {
  // Placeholder: will be refined in Step 3
  return text;
}

export interface VerbatimStandout {
  text: string;
  type: 'quote' | 'statement' | 'key-phrase';
  strength: 'high' | 'medium' | 'low';
  reason: string;
}

export function identifyVerbatimStandouts(transcript: string): VerbatimStandout[] {
  const standouts: VerbatimStandout[] = [];

  // Extract quoted statements (within single or double quotes)
  const quotePattern = /['"](.*?)['"]/g;
  let match;
  while ((match = quotePattern.exec(transcript)) !== null) {
    standouts.push({
      text: match[1],
      type: 'quote',
      strength: match[1].length > 30 ? 'high' : 'medium',
      reason: 'Direct quote from teaching',
    });
  }

  // Extract sentences with key patterns (Why...? How...? What if...?)
  const questionPattern = /(Why|How|What if).+?[?]/g;
  while ((match = questionPattern.exec(transcript)) !== null) {
    standouts.push({
      text: match[0],
      type: 'statement',
      strength: 'high',
      reason: 'Powerful question that engages listener',
    });
  }

  // Extract sentences with inverse incentive markers
  if (transcript.includes('But') || transcript.includes('However')) {
    const sentences = transcript.split(/[.!?]+/);
    for (const sentence of sentences) {
      if (sentence.includes('But') || sentence.includes('However')) {
        standouts.push({
          text: sentence.trim(),
          type: 'statement',
          strength: 'high',
          reason: 'Inverse incentive turning point',
        });
      }
    }
  }

  return standouts;
}

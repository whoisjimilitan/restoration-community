/**
 * VOICE APPLIER
 * Applies Brother Jimi's voice to new content
 * Uses the canonical voice pattern and Human Writing OS
 */

export interface VoiceApplierConfig {
  useShortLines: boolean;
  useContrast: boolean;
  useSpecificity: boolean;
  preserveSpacing: boolean;
  avoidAIPatterns: boolean;
}

const DEFAULT_CONFIG: VoiceApplierConfig = {
  useShortLines: true,
  useContrast: true,
  useSpecificity: true,
  preserveSpacing: true,
  avoidAIPatterns: true,
};

/**
 * Apply Brother Jimi's voice to a piece of content
 */
export function applyBrotherJimiVoice(content: string, config: Partial<VoiceApplierConfig> = {}): string {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  let result = content;

  // Step 1: Kill AI patterns
  if (finalConfig.avoidAIPatterns) {
    result = removeAIPatterns(result);
  }

  // Step 2: Break into short lines where appropriate
  if (finalConfig.useShortLines) {
    result = reformatToShortLines(result);
  }

  // Step 3: Add contrast markers where they strengthen meaning
  if (finalConfig.useContrast) {
    result = enhanceContrast(result);
  }

  // Step 4: Ensure specificity
  if (finalConfig.useSpecificity) {
    result = enforceSpecificity(result);
  }

  // Step 5: Format with strategic white space
  if (finalConfig.preserveSpacing) {
    result = formatWithSpacing(result);
  }

  return result.trim();
}

/**
 * Remove AI patterns that creep into text
 */
function removeAIPatterns(content: string): string {
  const aiOpenings = [
    /^In today's fast-paced world[,.]?/im,
    /^As technology continues/im,
    /^It's important to note/im,
    /^In an increasingly/im,
    /^Whether you're/im,
    /^Imagine a world where/im,
    /^As we move forward/im,
  ];

  let result = content;

  aiOpenings.forEach((pattern) => {
    result = result.replace(pattern, '');
  });

  // Remove AI transitions
  const aiTransitions = ['Furthermore', 'Moreover', 'Additionally', 'Consequently', 'Therefore', 'Thus', 'Ultimately', 'In conclusion', 'Overall', 'In summary'];

  aiTransitions.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, '');
  });

  // Replace AI buzzwords
  const buzzwordMap: Record<string, string> = {
    leverage: 'use',
    empower: 'enable',
    streamline: 'simplify',
    optimize: 'improve',
    transformative: '',
    innovative: 'new',
    robust: 'solid',
    seamless: 'smooth',
    'at the end of the day': '',
  };

  Object.entries(buzzwordMap).forEach(([buzz, replacement]) => {
    const regex = new RegExp(`\\b${buzz}\\b`, 'gi');
    result = result.replace(regex, replacement);
  });

  return result;
}

/**
 * Reformat to short, punchy lines
 * These are easier to read and sound more authentic
 */
function reformatToShortLines(content: string): string {
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];

  const formatted = sentences
    .map((sent) => {
      const trimmed = sent.trim();
      const words = trimmed.split(/\s+/).length;

      // Very long sentences should stay on one line but can be broken if they have natural breaks
      if (words > 25 && (trimmed.includes(',') || trimmed.includes(';'))) {
        // Break at natural punctuation points
        return trimmed
          .split(/[,;]\s*/)
          .map((part) => part.trim())
          .filter((p) => p.length > 0)
          .join('.\n');
      }

      return trimmed;
    })
    .filter((s) => s.length > 0)
    .join('\n');

  return formatted;
}

/**
 * Enhance contrast: add markers that show movement
 */
function enhanceContrast(content: string): string {
  let result = content;

  // Look for turning points and mark them
  const contrastMarkers = [
    { pattern: /([.!?])\s+(But|Yet|However|Until|Then|So)([^.]*[.!?])/g, replacement: '$1\n\n$2$3' },
  ];

  contrastMarkers.forEach(({ pattern, replacement }) => {
    result = result.replace(pattern, replacement);
  });

  return result;
}

/**
 * Enforce specificity: replace vague language
 */
function enforceSpecificity(content: string): string {
  const vaguePairs: Record<string, string> = {
    'has concerns': 'rejects',
    'significant changes': 'transformation',
    'many people': 'most people',
    'some things': 'specific actions',
  };

  let result = content;

  Object.entries(vaguePairs).forEach(([vague, specific]) => {
    const regex = new RegExp(`\\b${vague}\\b`, 'gi');
    result = result.replace(regex, specific);
  });

  return result;
}

/**
 * Format with strategic white space
 * Breaks create pauses for reflection
 */
function formatWithSpacing(content: string): string {
  // Double-space around contrast markers
  let result = content;

  result = result.replace(/\n(But|Yet|Until|Then|So|However)\s/g, '\n\n$1 ');

  // Clean up excessive spacing
  result = result.replace(/\n\n\n+/g, '\n\n');

  return result;
}

/**
 * Check if content sounds authentic (Brother Jimi voice)
 */
export function checkAuthenticity(content: string): {
  authentic: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for AI patterns
  const aiPatterns = [
    /in today's fast-paced world/i,
    /as technology continues/i,
    /furthermore|moreover|additionally/i,
    /ultimately|in conclusion/i,
  ];

  aiPatterns.forEach((pattern) => {
    if (pattern.test(content)) {
      issues.push(`Contains AI pattern: ${pattern.source}`);
    }
  });

  // Check for short lines (good for authenticity)
  const lines = content.split('\n').filter((l) => l.length > 0);
  const shortLineCount = lines.filter((l) => l.split(/\s+/).length < 15).length;
  const shortLineRatio = shortLineCount / lines.length;

  if (shortLineRatio < 0.5) {
    issues.push('Not enough short lines; reads too formal');
  }

  // Check for specificity
  const vaguePatterns = [/many|some|various|several/gi];
  let vagueCount = 0;

  vaguePatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      vagueCount += matches.length;
    }
  });

  if (vagueCount > 3) {
    issues.push('Too much vague language; needs more specificity');
  }

  // Check for personal voice (I, you, we)
  const personalWords = content.match(/\b(I|you|we|my|your|our)\b/gi) || [];
  if (personalWords.length === 0) {
    issues.push('No personal pronouns; sounds too abstract');
  }

  return {
    authentic: issues.length === 0,
    issues,
  };
}

/**
 * Voice Guardrails System
 *
 * Validates that generated content maintains Brother Jimi's authentic voice:
 * - Bold, raw, prophetic tone
 * - Conversational (not flowery, corporate, or polished)
 * - Direct address and contractions
 *
 * Returns validation result with warnings and confidence score.
 * Not a hard gate—allows human final decision but flags anti-patterns.
 */

export interface VoiceValidationResult {
  isValid: boolean; // true if no critical issues found
  warnings: string[]; // array of warning messages
  confidence: number; // 0-1, how confident is the validation
}

const FLOWERY_WORDS = [
  'abundantly',
  'magnificently',
  'profoundly',
  'elegantly',
  'gracious',
  'ethereal',
  'sublime',
  'exquisite',
  'wondrous',
  'marvelous',
  'glorious',
  'transcendent'
];

const JARGON_WORDS = [
  'leverage',
  'synergy',
  'paradigm',
  'utilize',
  'facilitate',
  'optimize',
  'operationalize',
  'stakeholder',
  'bandwidth',
  'circling back',
  'low-hanging fruit',
  'touch base',
  'ecosystem',
  'scalable',
  'innovative',
  'impactful',
  'transformation journey'
];

const SOFT_WORDS = [
  'perhaps',
  'maybe',
  'possibly',
  'arguably',
  'seemingly',
  'allegedly',
  'might',
  'could',
  'somewhat'
];

const FORMAL_PHRASES = [
  'as per your request',
  'please find below',
  'to whom it may concern',
  'in conclusion',
  'furthermore',
  'to summarize',
  'aforementioned',
  'in light of the foregoing',
  'as previously mentioned',
  'with all due respect'
];

const ADJECTIVE_PATTERNS = [
  'beautiful',
  'wonderful',
  'magnificent',
  'amazing',
  'incredible',
  'awesome',
  'tremendous',
  'fabulous',
  'spectacular',
  'extraordinary'
];

const AUTHENTIC_MARKERS = [
  /\bi[\'']m\b/i, // contractions with "I"
  /\byou[\'']ve\b/i,
  /\bdon[\'']t\b/i,
  /\bcan[\'']t\b/i,
  /\bwon[\'']t\b/i,
  /\bhat[\'']s\b/i,
  /\blet[\'']s\b/i,
  /\byou\b/i, // direct address
  /\bi\b/i,
  /\blisten/i,
  /\bwatch/i,
  /\bhere[\'']s/i,
  /\bwhat[\'']s/i
];

/**
 * Validates that content maintains Brother Jimi's authentic voice
 *
 * Checks for:
 * 1. Authentic voice markers (contractions, direct address, imperatives)
 * 2. Anti-patterns (flowery language, jargon, soft language, formal phrases)
 * 3. Excessive adjectives in single sentences
 *
 * Returns:
 * - isValid: true if confidence > 0.5 (no critical issues)
 * - warnings: array of specific anti-patterns found
 * - confidence: 0-1 score based on authentic markers vs anti-patterns
 */
export function validateBrotherJimiVoice(
  content: string
): VoiceValidationResult {
  const warnings: string[] = [];
  let confidence = 0.8; // Start high, deduct for issues

  const lowerContent = content.toLowerCase();

  // Check for flowery words
  for (const word of FLOWERY_WORDS) {
    if (lowerContent.includes(word)) {
      warnings.push(
        `Flowery language detected: "${word}". Brother Jimi's voice is bold, not flowery.`
      );
      confidence -= 0.1;
    }
  }

  // Check for corporate jargon
  for (const word of JARGON_WORDS) {
    if (lowerContent.includes(word)) {
      warnings.push(
        `Corporate jargon detected: "${word}". Keep it raw and direct.`
      );
      confidence -= 0.15;
    }
  }

  // Check for soft/passive language
  for (const word of SOFT_WORDS) {
    if (lowerContent.includes(word)) {
      warnings.push(
        `Soft/passive language detected: "${word}". Be bold and direct.`
      );
      confidence -= 0.05;
    }
  }

  // Check for formal phrases
  for (const phrase of FORMAL_PHRASES) {
    if (lowerContent.includes(phrase)) {
      warnings.push(
        `Formal email phrase detected: "${phrase}". Speak like a friend, not a memo.`
      );
      confidence -= 0.1;
    }
  }

  // Check for excessive adjectives (3+ in one sentence)
  const sentences = content.split(/[.!?]+/);
  for (const sentence of sentences) {
    const adjectivesInSentence = ADJECTIVE_PATTERNS.filter(adj =>
      new RegExp(`\\b${adj}\\b`, 'i').test(sentence)
    );
    if (adjectivesInSentence.length >= 3) {
      warnings.push(
        `Excessive adjectives in one sentence. Let the message speak for itself.`
      );
      confidence -= 0.1;
      break;
    }
  }

  // Check for authentic markers
  let authenticMarkersFound = 0;
  for (const marker of AUTHENTIC_MARKERS) {
    if (marker.test(content)) {
      authenticMarkersFound++;
    }
  }

  // Reward authentic markers
  if (authenticMarkersFound > 0) {
    confidence += 0.1 * (authenticMarkersFound / AUTHENTIC_MARKERS.length);
  } else if (content.length > 100) {
    // Long content without contractions/personal language is suspicious
    warnings.push(
      `Content lacks conversational markers (contractions, direct address). Sounds more formal than conversational.`
    );
    confidence -= 0.15;
  }

  // Clamp confidence to 0-1
  confidence = Math.max(0, Math.min(1, confidence));

  // isValid = no critical issues (confidence above 0.5)
  const isValid = confidence > 0.5;

  return {
    isValid,
    warnings,
    confidence: parseFloat(confidence.toFixed(2))
  };
}

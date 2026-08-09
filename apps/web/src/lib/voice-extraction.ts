/**
 * Voice Extraction Engine
 *
 * Takes raw text + identified identity choice and extracts a "voice theme"
 * containing revelation, contrast, examples, and call-to-identity.
 *
 * This becomes the foundation for all 9 content formats.
 */

import { ExtractedIdentity, IdentityChoiceId } from "./identity-framework";

export interface VoiceTheme {
  identity: ExtractedIdentity; // From Task 2
  coreMessage: string; // "Here's who you're choosing to be."
  revelation: string; // What truth is revealed
  contrast: string; // "The lie: ... The truth: ..."
  callToIdentity: string; // The identity question (who are you choosing to be)
  scriptural?: string; // Biblical grounding (optional)
  examples: string[]; // 2-3 key examples/supporting sentences
}

/**
 * Map of opposite sides for each identity choice
 * Shows what the person is choosing AGAINST
 */
const OPPOSITE_SIDES: Record<IdentityChoiceId, string> = {
  1: "living in lies and deception",
  2: "hiding your actions and truth",
  3: "staying stuck and refusing to change",
  4: "poisoning yourself with bitterness",
  5: "destroying relationships through isolation",
  6: "living a hypocritical lie",
  7: "wasting your life in passivity"
};

/**
 * Extract sentences from text
 * Splits by sentence-ending punctuation and trims whitespace
 */
function extractSentences(text: string): string[] {
  // Split on sentence-ending punctuation: . ! ?
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return sentences;
}

/**
 * Get the opposite side description for a given identity choice
 */
function getOppositeSide(choiceId: IdentityChoiceId): string {
  return OPPOSITE_SIDES[choiceId];
}

/**
 * Extract voice theme from raw text and identified identity
 *
 * Process:
 * 1. Get first sentence as core revelation
 * 2. Use identity.question as call-to-identity
 * 3. Create contrast statement with opposite side
 * 4. Extract 2-3 supporting sentences as examples
 * 5. Return complete VoiceTheme
 */
export function extractVoiceTheme(rawText: string, identity: ExtractedIdentity): VoiceTheme {
  if (!rawText || rawText.trim().length === 0) {
    return {
      identity,
      coreMessage: "Here's who you're choosing to be.",
      revelation: "No text provided for analysis",
      contrast: `The lie: ${getOppositeSide(identity.choice)}. The truth: You are choosing a different path.`,
      callToIdentity: identity.question,
      examples: []
    };
  }

  // Extract sentences from the text
  const sentences = extractSentences(rawText);

  // First sentence is the revelation
  const revelation = sentences.length > 0 ? sentences[0] : "A new truth awaits you.";

  // Build contrast statement
  const oppositeSide = getOppositeSide(identity.choice);
  const contrast = `The lie: You are ${oppositeSide}. The truth: You are someone who chooses ${identity.label.toLowerCase()}.`;

  // Extract 2-3 supporting sentences (sentences 2-4, or whatever is available)
  const examples = sentences.slice(1, 4);

  // Return complete VoiceTheme
  return {
    identity,
    coreMessage: "Here's who you're choosing to be.",
    revelation,
    contrast,
    callToIdentity: identity.question,
    examples
  };
}

/**
 * Extract voice theme with optional scriptural grounding
 *
 * Extends extractVoiceTheme to include biblical references
 */
export function extractVoiceThemeWithScripture(
  rawText: string,
  identity: ExtractedIdentity,
  scriptural?: string
): VoiceTheme {
  const theme = extractVoiceTheme(rawText, identity);

  if (scriptural) {
    theme.scriptural = scriptural;
  }

  return theme;
}

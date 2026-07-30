/**
 * Voice Extraction Logic
 *
 * Takes raw text and an identified identity choice, then extracts a "voice theme"
 * containing revelation, contrast, examples, and call-to-identity. This becomes
 * the foundation for all 9 content formats.
 */

import type { ExtractedIdentity } from "./identity-framework";

/**
 * Core message that is always used in voice themes
 */
const CORE_MESSAGE = "Here's who you're choosing to be.";

/**
 * Opposite sides for each identity choice
 * Used to create contrast statements
 */
const OPPOSITE_SIDES: Record<number, string> = {
  1: "living in lies and deception",
  2: "hiding your actions and truth",
  3: "staying stuck and refusing to change",
  4: "poisoning yourself with bitterness",
  5: "destroying relationships through isolation",
  6: "living a hypocritical lie",
  7: "wasting your life in passivity"
};

/**
 * Voice Theme contains the extracted voice elements
 * used to generate content across all 9 formats
 */
export interface VoiceTheme {
  identity: ExtractedIdentity;           // The identified choice + confidence
  coreMessage: string;                   // Always: "Here's who you're choosing to be."
  revelation: string;                    // The first sentence (key truth)
  contrast: string;                      // "The lie: ... The truth: ..."
  callToIdentity: string;                // The identity question from choice
  scriptural: string;                    // Biblical grounding (optional)
  examples: string[];                    // 2-3 supporting sentences
}

/**
 * Split text into sentences carefully
 * Handles common abbreviations and cases
 */
function splitIntoSentences(text: string): string[] {
  // Basic sentence splitting - split on period, exclamation, question mark
  // while being careful about abbreviations
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return sentences;
}

/**
 * Get the opposite side description for a given identity choice
 */
function getOppositeSide(choiceNum: number): string {
  return OPPOSITE_SIDES[choiceNum] || "living the wrong way";
}

/**
 * Extract supporting examples from text
 * Returns 2-3 key sentences from the text
 */
function extractExamples(text: string): string[] {
  const sentences = splitIntoSentences(text);

  // Skip the first sentence (revelation) and extract 2-3 following sentences
  const examples: string[] = [];

  for (let i = 1; i < sentences.length && examples.length < 3; i++) {
    const sentence = sentences[i];

    // Skip very short sentences (less than 10 words)
    if (sentence.split(/\s+/).length > 10) {
      examples.push(sentence);
    }
  }

  // If we don't have enough examples, take any non-trivial sentence
  if (examples.length < 2) {
    for (let i = 1; i < sentences.length && examples.length < 3; i++) {
      const sentence = sentences[i];
      if (
        !examples.includes(sentence) &&
        sentence.split(/\s+/).length >= 5
      ) {
        examples.push(sentence);
      }
    }
  }

  return examples.slice(0, 3);
}

/**
 * Build contrast statement from identity
 * Format: "The lie: [opposite]. The truth: [identity stage]."
 */
function buildContrast(identity: ExtractedIdentity): string {
  const oppositeSide = getOppositeSide(identity.choice);
  const truth = identity.stage;

  return `The lie: You are someone who ${oppositeSide}. The truth: You are someone who chooses ${truth}.`;
}

/**
 * Extract the first sentence as the core revelation
 */
function extractRevelation(text: string): string {
  const sentences = splitIntoSentences(text);
  return sentences[0] || text;
}

/**
 * Extract a scriptural reference if present
 * Looks for patterns like "John 3:16" or "Romans 12:2"
 */
function extractScriptural(text: string): string {
  // Look for Bible verse references (Book Chapter:Verse)
  const biblicalPattern =
    /\b([1-3]?\s?[A-Z][a-z]+)\s+(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?\b/;
  const match = text.match(biblicalPattern);

  if (match) {
    return match[0];
  }

  return "";
}

/**
 * Main function: Extract voice theme from raw text and identity choice
 *
 * Takes the raw text and the identified ExtractedIdentity from Task 2,
 * then builds the VoiceTheme that will be used for content generation.
 */
export function extractVoiceTheme(
  rawText: string,
  identity: ExtractedIdentity
): VoiceTheme {
  if (!rawText || rawText.trim().length === 0) {
    throw new Error("Raw text is required for voice extraction");
  }

  const revelation = extractRevelation(rawText);
  const contrast = buildContrast(identity);
  const callToIdentity = identity.question;
  const scriptural = extractScriptural(rawText);
  const examples = extractExamples(rawText);

  return {
    identity,
    coreMessage: CORE_MESSAGE,
    revelation,
    contrast,
    callToIdentity,
    scriptural,
    examples
  };
}

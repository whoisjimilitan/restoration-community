/**
 * Identity Extraction Logic
 *
 * Classifies content into one of the 7 identity choices using keyword-based matching.
 * Scores each identity by counting keyword occurrences and adds bonus points for
 * opposite-side term mentions (which show contrast/tension).
 */

import {
  IDENTITY_CHOICES,
  type IdentityChoiceId,
  type ExtractedIdentity,
  type IdentityChoice
} from "./identity-framework";

/**
 * Count occurrences of a keyword in text (case-insensitive, word boundaries)
 */
function countKeywordMatches(text: string, keyword: string): number {
  const normalizedText = text.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase();

  // Match whole words only using word boundaries
  const regex = new RegExp(`\\b${normalizedKeyword}\\b`, "g");
  const matches = normalizedText.match(regex);

  return matches ? matches.length : 0;
}

/**
 * Extract matched keywords from text for a given identity
 */
function extractMatchedKeywords(
  text: string,
  choice: IdentityChoice
): string[] {
  const matched = new Set<string>();

  // Check keywords
  for (const keyword of choice.keywords) {
    if (countKeywordMatches(text, keyword) > 0) {
      matched.add(keyword);
    }
  }

  // Check opposite side keywords
  for (const keyword of choice.oppositeSide) {
    if (countKeywordMatches(text, keyword) > 0) {
      matched.add(keyword);
    }
  }

  return Array.from(matched);
}

/**
 * Score a single identity choice against the given text
 *
 * Scoring logic:
 * - Each keyword match = 1 point
 * - Each opposite-side mention = 2 points (shows contrast/tension, strengthens the identity)
 */
function scoreIdentityChoice(text: string, choice: IdentityChoice): number {
  let score = 0;

  // Score positive keywords
  for (const keyword of choice.keywords) {
    score += countKeywordMatches(text, keyword);
  }

  // Score opposite-side keywords with bonus
  // (mentioning the opposite strengthens the choice)
  for (const keyword of choice.oppositeSide) {
    const count = countKeywordMatches(text, keyword);
    score += count * 2; // 2x bonus for opposite-side mentions
  }

  return score;
}

/**
 * Extract the primary identity choice from given text
 *
 * Returns the identity choice with the highest score, along with confidence,
 * reasoning, and matched keywords.
 */
export function extractIdentityChoice(text: string): ExtractedIdentity {
  if (!text || text.trim().length === 0) {
    // Default to choice 1 if text is empty
    const defaultChoice = IDENTITY_CHOICES[1];
    return {
      choice: 1,
      label: defaultChoice.label,
      question: defaultChoice.question,
      stage: defaultChoice.stage,
      confidence: 0,
      reasoning: "No text provided for analysis",
      keywordMatches: []
    };
  }

  // Score all identity choices
  const scores: Record<IdentityChoiceId, number> = {
    1: scoreIdentityChoice(text, IDENTITY_CHOICES[1]),
    2: scoreIdentityChoice(text, IDENTITY_CHOICES[2]),
    3: scoreIdentityChoice(text, IDENTITY_CHOICES[3]),
    4: scoreIdentityChoice(text, IDENTITY_CHOICES[4]),
    5: scoreIdentityChoice(text, IDENTITY_CHOICES[5]),
    6: scoreIdentityChoice(text, IDENTITY_CHOICES[6]),
    7: scoreIdentityChoice(text, IDENTITY_CHOICES[7])
  };

  // Calculate total score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Find the choice with the highest score
  let topChoiceId: IdentityChoiceId = 1;
  let topScore = scores[1];

  for (let i = 2; i <= 7; i++) {
    const id = i as IdentityChoiceId;
    if (scores[id] > topScore) {
      topScore = scores[id];
      topChoiceId = id;
    }
  }

  const topChoice = IDENTITY_CHOICES[topChoiceId];

  // Calculate confidence as a ratio
  // If totalScore is 0, confidence is 0
  // Otherwise, confidence is topScore divided by totalScore
  const confidence = totalScore === 0 ? 0 : topScore / totalScore;

  // Extract matched keywords for reasoning
  const keywordMatches = extractMatchedKeywords(text, topChoice);

  // Build reasoning message
  let reasoning: string;
  if (totalScore === 0) {
    reasoning = "No identity-specific keywords found; defaulting to first choice";
  } else if (keywordMatches.length === 0) {
    reasoning = "Selected based on higher score relative to other choices";
  } else {
    reasoning = `Found keywords: ${keywordMatches.slice(0, 3).join(", ")}${
      keywordMatches.length > 3 ? ` and ${keywordMatches.length - 3} more` : ""
    }`;
  }

  return {
    choice: topChoiceId,
    label: topChoice.label,
    question: topChoice.question,
    stage: topChoice.stage,
    confidence,
    reasoning,
    keywordMatches
  };
}

/**
 * Extract all identity scores for debugging/analysis
 *
 * Returns scores for all 7 identities, useful for understanding why a particular
 * choice was selected or for debugging edge cases.
 */
export function extractAllIdentityScores(
  text: string
): Record<IdentityChoiceId, { score: number; confidence: number }> {
  const scores: Record<IdentityChoiceId, number> = {
    1: scoreIdentityChoice(text, IDENTITY_CHOICES[1]),
    2: scoreIdentityChoice(text, IDENTITY_CHOICES[2]),
    3: scoreIdentityChoice(text, IDENTITY_CHOICES[3]),
    4: scoreIdentityChoice(text, IDENTITY_CHOICES[4]),
    5: scoreIdentityChoice(text, IDENTITY_CHOICES[5]),
    6: scoreIdentityChoice(text, IDENTITY_CHOICES[6]),
    7: scoreIdentityChoice(text, IDENTITY_CHOICES[7])
  };

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  const result: Record<IdentityChoiceId, { score: number; confidence: number }> =
    {} as any;

  for (let i = 1; i <= 7; i++) {
    const id = i as IdentityChoiceId;
    result[id] = {
      score: scores[id],
      confidence: totalScore === 0 ? 0 : scores[id] / totalScore
    };
  }

  return result;
}

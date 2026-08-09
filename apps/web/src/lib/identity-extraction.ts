/**
 * Identity Extraction Engine
 *
 * Classifies source material into one of 7 identity choices using
 * keyword matching and confidence scoring.
 */

import {
  IDENTITY_CHOICES,
  IdentityChoiceId,
  ExtractedIdentity,
  getIdentityChoice,
  getAllIdentityChoices
} from "./identity-framework";

/**
 * Score text against a single identity choice by counting keyword matches
 */
function scoreIdentityChoice(text: string, choiceId: IdentityChoiceId): number {
  const choice = getIdentityChoice(choiceId);
  const normalizedText = text.toLowerCase();

  let score = 0;

  // Score positive keywords (normal weight)
  for (const keyword of choice.keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    const matches = normalizedText.match(regex) || [];
    score += matches.length;
  }

  // Score opposite-side keywords with bonus (indicates contrast/opposition)
  for (const keyword of choice.oppositeSide) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    const matches = normalizedText.match(regex) || [];
    // 2x bonus when opposite-side term appears (shows contrast)
    score += matches.length * 2;
  }

  return score;
}

/**
 * Extract matched keywords from text for a given identity choice
 */
function extractMatchedKeywords(text: string, choiceId: IdentityChoiceId): string[] {
  const choice = getIdentityChoice(choiceId);
  const normalizedText = text.toLowerCase();
  const matched: Set<string> = new Set();

  // Collect matched keywords
  for (const keyword of choice.keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    if (regex.test(normalizedText)) {
      matched.add(keyword);
    }
  }

  // Collect matched opposite-side keywords
  for (const keyword of choice.oppositeSide) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    if (regex.test(normalizedText)) {
      matched.add(keyword);
    }
  }

  return Array.from(matched);
}

/**
 * Calculate confidence score based on top score vs total score
 * Confidence = topScore / totalScore (handles zero division)
 */
function calculateConfidence(topScore: number, totalScore: number): number {
  if (totalScore === 0) {
    return 0;
  }
  const confidence = topScore / totalScore;
  // Clamp to 0-1 range
  return Math.min(1, Math.max(0, confidence));
}

/**
 * Extract identity choice from source text
 *
 * Process:
 * 1. Score text against all 7 identity choices
 * 2. Find highest scoring choice
 * 3. Calculate confidence (topScore / totalScore)
 * 4. Return choice with reasoning
 *
 * Edge case: If totalScore is 0 (no keywords matched), defaults to choice 1 with low confidence
 */
export function extractIdentityChoice(text: string): ExtractedIdentity {
  if (!text || text.trim().length === 0) {
    // Return default choice with reasoning
    return {
      choice: 1,
      label: "Truth vs Deception",
      question: "Are you a person of TRUTH or LIES?",
      stage: "Truth",
      confidence: 0,
      reasoning: "No text provided for analysis",
      keywordMatches: []
    };
  }

  // Score against all identity choices
  const scores: Record<IdentityChoiceId, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  };

  for (const choiceId of [1, 2, 3, 4, 5, 6, 7] as IdentityChoiceId[]) {
    scores[choiceId] = scoreIdentityChoice(text, choiceId);
  }

  // Calculate total score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Find top scoring choice
  let topChoiceId: IdentityChoiceId = 1;
  let topScore = scores[1];

  for (const choiceId of [2, 3, 4, 5, 6, 7] as IdentityChoiceId[]) {
    if (scores[choiceId] > topScore) {
      topScore = scores[choiceId];
      topChoiceId = choiceId;
    }
  }

  // Handle edge case: no keywords found
  if (totalScore === 0) {
    return {
      choice: 1,
      label: "Truth vs Deception",
      question: "Are you a person of TRUTH or LIES?",
      stage: "Truth",
      confidence: 0,
      reasoning: "No identity keywords detected in text. Default to Truth vs Deception.",
      keywordMatches: []
    };
  }

  // Calculate confidence
  const confidence = calculateConfidence(topScore, totalScore);

  // Get matched keywords for reasoning
  const matchedKeywords = extractMatchedKeywords(text, topChoiceId);

  // Build reasoning
  const topChoice = getIdentityChoice(topChoiceId);
  const topChoiceLabel = topChoice.label;
  const confidencePercent = Math.round(confidence * 100);
  const keywordList = matchedKeywords.slice(0, 3).join(", ");

  const reasoning = `Detected "${topChoiceLabel}" identity (${confidencePercent}% confidence) based on keywords: ${keywordList}`;

  return {
    choice: topChoiceId,
    label: topChoice.label,
    question: topChoice.question,
    stage: topChoice.stage,
    confidence,
    reasoning,
    keywordMatches: matchedKeywords
  };
}

/**
 * Extract identity choices with confidence for all 7 choices
 * Returns all choices ranked by confidence score
 */
export function extractAllIdentityChoices(text: string): ExtractedIdentity[] {
  if (!text || text.trim().length === 0) {
    return getAllIdentityChoices().map((choice) => ({
      choice: choice.id,
      label: choice.label,
      question: choice.question,
      stage: choice.stage,
      confidence: 0,
      reasoning: "No text provided for analysis",
      keywordMatches: []
    }));
  }

  const scores: Record<IdentityChoiceId, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  };

  for (const choiceId of [1, 2, 3, 4, 5, 6, 7] as IdentityChoiceId[]) {
    scores[choiceId] = scoreIdentityChoice(text, choiceId);
  }

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Build results for all choices
  const results: ExtractedIdentity[] = [];

  for (const choiceId of [1, 2, 3, 4, 5, 6, 7] as IdentityChoiceId[]) {
    const choice = getIdentityChoice(choiceId);
    const score = scores[choiceId];
    const confidence = calculateConfidence(score, totalScore);

    const matchedKeywords = extractMatchedKeywords(text, choiceId);
    const confidencePercent = Math.round(confidence * 100);
    const keywordList = matchedKeywords.slice(0, 2).join(", ") || "none";

    results.push({
      choice: choiceId,
      label: choice.label,
      question: choice.question,
      stage: choice.stage,
      confidence,
      reasoning: `${confidencePercent}% confidence based on keywords: ${keywordList}`,
      keywordMatches: matchedKeywords
    });
  }

  // Sort by confidence descending
  return results.sort((a, b) => b.confidence - a.confidence);
}

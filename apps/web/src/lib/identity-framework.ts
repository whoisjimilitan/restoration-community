/**
 * Identity Framework
 *
 * Defines the 7 identity choices from Brother Jimi's restoration ministry.
 * Each identity represents a binary choice in spiritual and personal transformation.
 */

export type IdentityChoiceId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface IdentityChoice {
  id: IdentityChoiceId;
  label: string;              // e.g., "Truth vs Deception"
  question: string;           // e.g., "Are you a person of TRUTH or LIES?"
  stage: string;              // e.g., "Truth" (the positive choice)
  keywords: string[];         // Words that indicate this identity
  oppositeSide: string[];     // Words that indicate the negative opposite
}

export interface ExtractedIdentity {
  choice: IdentityChoiceId;
  label: string;
  question: string;
  stage: string;
  confidence: number;         // 0-1 score
  reasoning: string;          // Explanation of why this choice was selected
  keywordMatches: string[];   // Which keywords matched in the text
}

/**
 * The 7 Identity Choices
 *
 * These represent fundamental choices in the restoration community's journey.
 * They map to the "truth or lie" framework that separates people into categories
 * based on their relationship with truth, accountability, and transformation.
 */
export const IDENTITY_CHOICES: Record<IdentityChoiceId, IdentityChoice> = {
  1: {
    id: 1,
    label: "Truth vs Deception",
    question: "Are you a person of TRUTH or LIES?",
    stage: "Truth",
    keywords: [
      "truth",
      "honest",
      "truthful",
      "authentic",
      "real",
      "genuine",
      "integrity",
      "transparent",
      "sincere"
    ],
    oppositeSide: [
      "lie",
      "lies",
      "lying",
      "deception",
      "deceive",
      "dishonest",
      "false",
      "fake",
      "fraud",
      "fake truth"
    ]
  },

  2: {
    id: 2,
    label: "Confession vs Hiding",
    question: "Do you OWN your actions or HIDE?",
    stage: "Confession",
    keywords: [
      "confession",
      "confess",
      "admit",
      "acknowledge",
      "own",
      "responsibility",
      "accountability",
      "vulnerable",
      "expose"
    ],
    oppositeSide: [
      "hide",
      "hiding",
      "cover",
      "secret",
      "denial",
      "deny",
      "excuse",
      "blame",
      "avoid",
      "swept under"
    ]
  },

  3: {
    id: 3,
    label: "Repentance vs Stubbornness",
    question: "Do you CHANGE or stay STUCK?",
    stage: "Repentance",
    keywords: [
      "repent",
      "repentance",
      "change",
      "transform",
      "convert",
      "turn around",
      "redirect",
      "different path",
      "renewed"
    ],
    oppositeSide: [
      "stubborn",
      "stubbornness",
      "resistant",
      "stuck",
      "unchanged",
      "refuse",
      "hardened",
      "defiant",
      "same old"
    ]
  },

  4: {
    id: 4,
    label: "Forgiveness vs Bitterness",
    question: "Do you HEAL or POISON yourself?",
    stage: "Forgiveness",
    keywords: [
      "forgive",
      "forgiveness",
      "release",
      "let go",
      "heal",
      "healing",
      "reconcile",
      "grace",
      "pardon"
    ],
    oppositeSide: [
      "bitter",
      "bitterness",
      "resentment",
      "grudge",
      "angry",
      "anger",
      "unforgiven",
      "unforgiveness",
      "poison"
    ]
  },

  5: {
    id: 5,
    label: "Reconciliation vs Isolation",
    question: "Do you BUILD or DESTROY?",
    stage: "Reconciliation",
    keywords: [
      "reconcile",
      "reconciled",
      "reconciliation",
      "rebuild",
      "rebuilding",
      "restore",
      "bridge",
      "bridges",
      "connect",
      "connecting",
      "community",
      "relationship",
      "together",
      "build",
      "building"
    ],
    oppositeSide: [
      "isolate",
      "isolation",
      "alone",
      "destroy",
      "destroying",
      "separation",
      "separate",
      "divide",
      "broken"
    ]
  },

  6: {
    id: 6,
    label: "Honest Work vs Hypocrisy",
    question: "Are you INTEGRITY or a LIE?",
    stage: "Honest Work",
    keywords: [
      "integrity",
      "honest",
      "work",
      "labor",
      "effort",
      "earning",
      "produce",
      "create",
      "genuine",
      "authentic",
      "earned",
      "labor"
    ],
    oppositeSide: [
      "hypocrite",
      "hypocrisy",
      "phony",
      "fake",
      "fraud",
      "con",
      "steal",
      "lazy",
      "slothful"
    ]
  },

  7: {
    id: 7,
    label: "Service vs Passivity",
    question: "Do you MATTER or WASTE your life?",
    stage: "Service",
    keywords: [
      "service",
      "serve",
      "purpose",
      "meaningful",
      "impact",
      "matter",
      "contribution",
      "help",
      "volunteer"
    ],
    oppositeSide: [
      "passive",
      "passivity",
      "waste",
      "useless",
      "pointless",
      "idle",
      "inactive",
      "do nothing",
      "meaningless"
    ]
  }
};

/**
 * Get identity choice by ID
 */
export function getIdentityChoice(id: IdentityChoiceId): IdentityChoice {
  return IDENTITY_CHOICES[id];
}

/**
 * Get all identity choices as an array
 */
export function getAllIdentityChoices(): IdentityChoice[] {
  return Object.values(IDENTITY_CHOICES);
}

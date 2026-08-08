/**
 * THE IRREPLACEABLE FRAMEWORK
 *
 * Operating standard for all content generation, website copy, and communication.
 * No templates. No decorative words. No hedging.
 *
 * Every piece must pass five tests:
 * 1. CORRECT — Every statement is true, verifiable, and defensible
 * 2. PRECISE — As specific as possible without becoming false
 * 3. NOVEL — Says something the reader did not already know
 * 4. USEFUL — Actionable, not merely persuasive or inspiring
 * 5. IRREPLACEABLE — Could not have been written without this person's specific life
 */

export interface IrreplacableFrameworkConfig {
  // Who are we writing for?
  audience: {
    descriptors: string[]; // e.g., "fraudsters", "deceived people", "Christians in fraud"
    context: string; // What should they know before reading?
    primaryNeed: string; // What do they actually need from this?
  };

  // What truth are we delivering?
  truth: {
    coreRevelation: string; // The central truth
    scriptureReferences: string[]; // Specific chapter:verse
    verbatimWisdom: string; // Exact quote from source (never paraphrase)
    perspective: string; // What shifts in how they see this?
  };

  // How should it land?
  delivery: {
    tone: 'educated-conversational' | 'direct' | 'counseling' | 'teaching';
    register: 'smart-person-explaining-to-person-they-respect';
    voiceSample?: string; // How they actually speak about this
  };

  // What must the reader do after?
  outcome: {
    whatMeansNow: string; // Reader must understand THIS
    whyMatters: string; // Reader must know WHY it matters
    howToDo: string; // Reader must know HOW to act on it
  };
}

export const BRENDAN_KANE_STRUCTURE = {
  hook: {
    description: 'One sentence that stops the scroll',
    mustDo: [
      'Challenge an assumption they hold right now',
      'Create curiosity about something they thought they understood',
      'Place them inside a relatable scenario they recognize immediately',
      'Deliver a contrast or shock that stops them cold',
    ],
    rule: 'Must feel like it grew from the truth, not applied as formula',
  },

  verbatimWisdom: {
    description: 'The core insight from source preserved exactly',
    rule: 'Do not paraphrase it into oblivion. Let it land with original weight.',
  },

  scriptureOrValidation: {
    description: 'Biblical text, observable truth, or real-world evidence',
    rule: 'Be specific. Name the chapter and verse. Name the person. Name the situation. Specificity IS credibility.',
  },

  emotionalHighAndAction: {
    description: '1-3 sentences that move from understanding to decision',
    rule: 'This is not summary. This is truth becoming instruction. Land in the chest, not just the head.',
  },

  loop: {
    description: '"How do you know?" question that turns it back on the reader',
    rule: 'Makes them replay it, find their answer, pulls toward next piece.',
  },
};

export const FIVE_TESTS = {
  correct: 'Every statement is true and defensible',
  precise: 'As specific as possible without becoming false',
  novel: 'Says something the reader did not already know',
  useful: 'Actionable, not merely persuasive or inspiring',
  irreplaceable: 'Could not have been written without this person\'s specific life',
};

export const IRREPLACEABLE_TEST = `
Before finalizing: Could someone else have written this without living this person's specific life?

If YES → Not finished. Find:
- The detail that makes it irreplaceable
- The uncomfortable conclusion
- The observation that makes someone pause rather than nod
- That is what makes it worth publishing
`;

export const DELIVERY_STANDARD = `
Every piece must work on a page AND in a room.

Test: Would a smart person say this out loud to someone they respect?
- If YES → it stays
- If NO → rewrite it

Write for both reader and viewer simultaneously.
`;

export const CLARA_INVISIBLE_TEST = `
Three questions must be answered somewhere inside, even if never explicitly asked:

1. What does this mean? (Reader understands the truth, not just feels it)
2. Why does it matter? (Significance established before application)
3. How do you do it? (Decision, direction, or specific next step)

Understanding + Application = Transformation
`;

export const TRUTH_PROTOCOL = `
Every statement must be:
- TRUE (fact-based, not invented)
- SOURCED (verifiable where applicable)
- TRANSPARENT about uncertainty (say "uncertain" clearly)

Before every response, ask:
"Is every statement I am about to make true, sourced, and transparent?"

If NO → Revise until YES.
Accuracy is non-negotiable. Expression is flexible. Truth is not.
`;

export const VALIDITY_AND_PREMISE = `
Assess TWO things separately, never conflate them:

1. VALIDITY: Does the conclusion follow logically from premises?
   - If broken argument structure → Fix before anything else
   - Scripturally true premise in broken argument = conclusion no one should accept

2. PREMISE: Is there good reason to believe each premise is true?
   - Biblical truth premise → Support with scripture
   - Scripturally false premise → Reject it, regardless of elegance

Scriptural truth is the final court of appeal.
`;

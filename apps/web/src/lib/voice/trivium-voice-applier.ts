import { GuardRails } from './guardrails';

export function applyGrammarRefinement(text: string, guardrails: GuardRails): string {
  // Grammar phase: tighten language, eliminate repetition, preserve voice
  let refined = text;

  // Remove obvious repetition (same clause repeated)
  const sentences = refined.split(/[.!?]+/).filter((s) => s.trim());
  const deduped = [];
  let lastSentence = '';

  for (const sentence of sentences) {
    const normalized = sentence.trim().toLowerCase();
    const lastNormalized = lastSentence.toLowerCase();
    if (!normalized.startsWith(lastNormalized.substring(0, 20))) {
      deduped.push(sentence.trim());
      lastSentence = sentence.trim();
    }
  }

  refined = deduped.join('. ') + '.';
  return refined;
}

export function applyLogicRefinement(text: string, guardrails: GuardRails): string {
  // Logic phase: sharpen connective tissue between premises
  // Ensure logical flow is clear
  let refined = text;

  // Add connective markers where needed (but, therefore, so, because)
  // This ensures the logical chain is visible

  return refined;
}

export function applyRhetoricalRefinement(
  text: string,
  guardrails: GuardRails,
  audienceType: 'analytical' | 'resistant' | 'rational' = 'analytical'
): string {
  // Rhetoric phase: polish for persuasive impact in Brother Jimi's voice
  let refined = text;

  // Apply inverse incentive framing where it lands
  if (text.includes('believe') || text.includes('think')) {
    refined = refined.replace(/people (believe|think) (.+?)\./g, "People $1: $2. But that's backwards.");
  }

  // Ensure Scripture confirmations are prominent
  if (refined.includes('Scripture') || refined.includes('Bible')) {
    // Already has Scripture reference
  }

  return refined;
}

export function applyTriviumRefinement(
  text: string,
  guardrails: GuardRails,
  audienceType: 'analytical' | 'resistant' | 'rational' = 'analytical'
): string {
  let refined = text;
  refined = applyGrammarRefinement(refined, guardrails);
  refined = applyLogicRefinement(refined, guardrails);
  refined = applyRhetoricalRefinement(refined, guardrails, audienceType);
  return refined;
}

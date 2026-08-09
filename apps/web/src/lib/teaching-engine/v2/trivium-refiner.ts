import { ValidityReport, PremiseReport, RefinedCoreOutput, VerbatimElement } from './types';
import { GuardRails, identifyVerbatimStandouts } from '@/lib/voice/guardrails';
import { applyTriviumRefinement } from '@/lib/voice/trivium-voice-applier';

export function refineTrivium(
  transcript: string,
  validity: ValidityReport,
  premise: PremiseReport,
  guardrails: GuardRails
): RefinedCoreOutput {
  // Step 1: Identify verbatim standouts to preserve
  const verbatimElements = identifyVerbatimStandouts(transcript);

  // Step 2: Apply Trivium refinement (Grammar → Logic → Rhetoric)
  const refined = applyTriviumRefinement(transcript, guardrails);

  // Step 3: Weave high-strength verbatim back into refined version
  const refinedWithVerbatim = weaveVerbatimIntoRefined(refined, verbatimElements);

  return {
    refined_transcript: refinedWithVerbatim,
    verbatim_highlights: verbatimElements.filter(v => v.strength === 'high'),
    validity_status: validity.logic_status,
    premise_status: premise.overall_scriptural_integrity,
  };
}

function weaveVerbatimIntoRefined(
  refined: string,
  verbatimElements: VerbatimElement[]
): string {
  let result = refined;

  // Ensure high-strength verbatim elements are present
  for (const element of verbatimElements) {
    if (element.strength === 'high' && !result.includes(element.text)) {
      // Find best place to insert (after relevant topic)
      const sentences = result.split(/[.!?]+/);
      const insertIndex = Math.max(1, Math.floor(sentences.length / 2));
      sentences.splice(insertIndex, 0, element.text);
      result = sentences.join('. ').replace(/\.\s+\./g, '.');
    }
  }

  return result;
}

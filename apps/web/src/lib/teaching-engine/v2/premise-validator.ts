import {
  ValidityReport,
  PremiseReport,
  Premise,
  ScriptureStatus,
  PremiseType,
} from './types';

// Simple Scripture database (future: integrate with real scripture API/database)
const SCRIPTURE_DATABASE: Record<
  string,
  { book: string; verses: string[]; status: 'sound' | 'warning' }
> = {
  faith: { book: 'Hebrews', verses: ['11:1', '11:6'], status: 'sound' },
  love: { book: 'John', verses: ['3:16', '13:34-35'], status: 'sound' },
  'god provides': { book: 'Matthew', verses: ['6:25-34'], status: 'sound' },
  'christ foundation': { book: '1 Corinthians', verses: ['3:11'], status: 'sound' },
  grace: { book: 'Ephesians', verses: ['2:8-9'], status: 'sound' },
  forgiveness: { book: 'Colossians', verses: ['3:13'], status: 'sound' },
  'god loves': { book: 'John', verses: ['3:16', '11:36'], status: 'sound' },
  salvation: { book: 'Romans', verses: ['10:9', '6:9'], status: 'sound' },
  'good works': { book: 'Ephesians', verses: ['2:10'], status: 'sound' },
  'fear god': { book: 'Proverbs', verses: ['9:10', '1:7'], status: 'sound' },
};

export function validatePremises(
  transcript: string,
  validityReport: ValidityReport
): PremiseReport {
  // Extract premises from transcript
  const premises = extractPremises(transcript, validityReport);

  // Validate each premise against Scripture
  const validatedPremises = premises.map((p) => validateSinglePremise(p));

  // Determine overall scriptural integrity
  const overallStatus = determineOverallStatus(validatedPremises);

  return {
    premises: validatedPremises,
    overall_scriptural_integrity: overallStatus,
  };
}

interface ExtractedPremise {
  premise: string;
  type: PremiseType;
}

function extractPremises(
  transcript: string,
  validityReport: ValidityReport
): ExtractedPremise[] {
  const sentences = transcript.split(/[.!?]+/).filter((s) => s.trim());

  // All sentences except conclusion are premises
  const premises: ExtractedPremise[] = sentences.slice(0, -1).map((s) => ({
    premise: s.trim(),
    type: classifyPremiseType(s.trim()),
  }));

  // Add core claim as major premise
  if (validityReport.core_claim) {
    premises.unshift({
      premise: validityReport.core_claim,
      type: classifyPremiseType(validityReport.core_claim),
    });
  }

  return premises;
}

function classifyPremiseType(premise: string): PremiseType {
  // Simple classification: future enhancement for sophistication
  const lowerPremise = premise.toLowerCase();

  if (
    lowerPremise.includes('scripture') ||
    lowerPremise.includes('bible') ||
    lowerPremise.includes('god') ||
    lowerPremise.includes('christ') ||
    lowerPremise.includes('jesus')
  ) {
    return 'BIBLICAL';
  }

  if (lowerPremise.includes('because') || lowerPremise.includes('therefore')) {
    return 'LOGICAL_INFERENCE';
  }

  if (
    lowerPremise.includes('people') ||
    lowerPremise.includes('believe') ||
    lowerPremise.includes('think')
  ) {
    return 'CULTURAL';
  }

  return 'UNCERTAIN';
}

interface PremiseInput {
  premise: string;
  type: PremiseType;
}

function validateSinglePremise(premise: PremiseInput): Premise {
  const premiseText = premise.premise.toLowerCase();

  // Check Scripture database
  let supportingVerses: string[] = [];
  let contradictingVerses: string[] = [];
  let status: ScriptureStatus = 'AMBIGUOUS';

  for (const [keyword, scriptureRef] of Object.entries(SCRIPTURE_DATABASE)) {
    if (premiseText.includes(keyword)) {
      if (scriptureRef.status === 'sound') {
        supportingVerses.push(
          ...scriptureRef.verses.map((v) => `${scriptureRef.book} ${v}`)
        );
        status = 'SCRIPTURALLY_SOUND';
      } else {
        status = 'NEEDS_SUPPORT';
      }
    }
  }

  return {
    premise: premise.premise,
    type: premise.type,
    status,
    supporting_verses: supportingVerses,
    contradicting_verses: contradictingVerses,
    assessment: generateAssessment(premise.type, status),
  };
}

function generateAssessment(type: PremiseType, status: ScriptureStatus): string {
  if (type === 'BIBLICAL' && status === 'SCRIPTURALLY_SOUND') {
    return 'Biblical truth, confirmed by Scripture';
  }
  if (type === 'LOGICAL_INFERENCE' && status === 'SCRIPTURALLY_SOUND') {
    return 'Sound logical inference from Biblical premises';
  }
  if (type === 'CULTURAL') {
    return 'Cultural observation or assumption - verify scriptural alignment';
  }
  return 'Premise requires scriptural support or verification';
}

function determineOverallStatus(premises: Premise[]): 'PASS' | 'FAIL' | 'NEEDS_SUPPORT' {
  if (premises.every((p) => p.status === 'SCRIPTURALLY_SOUND')) {
    return 'PASS';
  }
  if (premises.some((p) => p.status === 'CONTRADICTS_SCRIPTURE')) {
    return 'FAIL';
  }
  return 'NEEDS_SUPPORT';
}

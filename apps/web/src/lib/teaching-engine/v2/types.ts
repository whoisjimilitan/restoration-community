export type ValidityStatus = 'SOUND' | 'BROKEN' | 'NEEDS_CLARIFICATION';
export type ProblemType = 'BROKEN_CHAIN' | 'WEAK_PREMISE' | 'STRUCTURAL_GAP' | 'FALLACY' | 'CLARITY_ISSUE';

export interface ValidityIssue {
  location: string; // quote or context
  problem_type: ProblemType;
  description: string;
  impact: string;
}

export interface ValidityReport {
  core_claim: string;
  logic_status: ValidityStatus;
  issues: ValidityIssue[];
  strength_assessment: number; // 0-100
}

export type ScriptureStatus = 'SCRIPTURALLY_SOUND' | 'CONTRADICTS_SCRIPTURE' | 'LACKS_SUPPORT' | 'AMBIGUOUS';
export type PremiseType = 'BIBLICAL' | 'LOGICAL_INFERENCE' | 'CULTURAL' | 'UNCERTAIN';

export interface Premise {
  premise: string;
  type: PremiseType;
  status: ScriptureStatus;
  supporting_verses: string[];
  contradicting_verses: string[];
  assessment: string;
}

export interface PremiseReport {
  premises: Premise[];
  overall_scriptural_integrity: 'PASS' | 'FAIL' | 'NEEDS_SUPPORT';
}

export interface VerbatimElement {
  text: string;
  type: 'quote' | 'statement' | 'key-phrase';
  strength: 'high' | 'medium' | 'low';
}

export interface RefinedCoreOutput {
  refined_transcript: string;
  verbatim_highlights: VerbatimElement[];
  validity_status: ValidityStatus;
  premise_status: 'PASS' | 'FAIL' | 'NEEDS_SUPPORT';
}

export interface FormatOutput {
  format: 'article' | 'email' | 'facebook' | 'twitter' | 'instagram' | 'podcast' | 'video';
  content: string;
  hooks: string[];
  call_to_action: string;
}

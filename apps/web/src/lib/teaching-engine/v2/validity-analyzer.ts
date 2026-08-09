import { ValidityReport, ValidityStatus, ProblemType } from './types';

export function analyzeValidity(transcript: string): ValidityReport {
  // Extract core claim (first major statement or imperative)
  const coreClaim = extractCoreClaim(transcript);

  // Identify logical structure
  const logicStructure = analyzeLogicalStructure(transcript);

  // Detect issues
  const issues = detectLogicalIssues(transcript, logicStructure);

  // Determine overall logic status
  const logicStatus = determineLogicStatus(issues);

  // Calculate strength score
  const strengthAssessment = calculateStrength(issues, transcript.length);

  return {
    core_claim: coreClaim,
    logic_status: logicStatus,
    issues,
    strength_assessment: strengthAssessment,
  };
}

function extractCoreClaim(transcript: string): string {
  // Extract first complete thought or imperative
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());
  return sentences[0] || transcript;
}

interface LogicalStructure {
  premises: string[];
  conclusion: string;
  connectives: string[];
}

function analyzeLogicalStructure(transcript: string): LogicalStructure {
  // Simple structure analysis: find premises and conclusion
  const connectives = ['therefore', 'thus', 'so', 'because', 'since', 'if', 'then', 'but', 'however'];
  const foundConnectives = connectives.filter(c => transcript.toLowerCase().includes(c));

  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  return {
    premises: sentences.slice(0, -1),
    conclusion: sentences[sentences.length - 1] || '',
    connectives: foundConnectives,
  };
}

function detectLogicalIssues(transcript: string, structure: LogicalStructure) {
  const issues = [];

  // Check for broken logic chains (e.g., category errors)
  if (transcript.toLowerCase().includes('therefore')) {
    if (!hasValidLogicalConnector(transcript)) {
      issues.push({
        location: 'Logic chain',
        problem_type: 'BROKEN_CHAIN' as ProblemType,
        description: 'Conclusion does not logically follow from premises',
        impact: 'Undermines credibility of the entire argument',
      });
    }
  }

  // Also detect category errors (unrelated concepts forced together)
  if (hasDistinctCategories(transcript)) {
    issues.push({
      location: 'Category mismatch',
      problem_type: 'BROKEN_CHAIN' as ProblemType,
      description: 'Premises from different logical categories being combined incorrectly',
      impact: 'Logic chain is fundamentally invalid',
    });
  }

  // Check for missing connectives
  if (structure.connectives.length === 0 && structure.premises.length > 1) {
    issues.push({
      location: 'Overall structure',
      problem_type: 'STRUCTURAL_GAP' as ProblemType,
      description: 'Multiple claims without logical connectors (therefore, because, but, etc.)',
      impact: 'Reader cannot see how ideas relate to each other',
    });
  }

  // Check for weak premises (future enhancement: NLP-based assessment)
  if (transcript.includes('probably') || transcript.includes('maybe') || transcript.includes('might')) {
    issues.push({
      location: 'Hedged language',
      problem_type: 'WEAK_PREMISE' as ProblemType,
      description: 'Premises qualified with uncertain language (probably, maybe, might)',
      impact: 'Undermines confidence in the argument',
    });
  }

  return issues;
}

function hasValidLogicalConnector(transcript: string): boolean {
  // Check if "therefore" or "thus" is followed by a valid conclusion
  const thereforePattern = /therefore|thus/i;
  if (!thereforePattern.test(transcript)) {
    return true; // No therefore/thus claims, so no broken chain
  }

  // Simple heuristic: if both parts of the logic chain share concepts, it's likely valid
  const parts = transcript.split(/therefore|thus/i);
  if (parts.length < 2) return true;

  const premise = parts[0].toLowerCase();
  const conclusion = parts[1].toLowerCase();

  // Extract key nouns from both parts
  const premiseWords = new Set(premise.split(/\s+/));
  const conclusionWords = new Set(conclusion.split(/\s+/));

  // Check if they share meaningful words (not just common words)
  const commonWords = Array.from(premiseWords).filter(w => conclusionWords.has(w) && w.length > 3);

  // A valid logical chain should share at least some key concepts
  return commonWords.length > 0;
}

function hasDistinctCategories(transcript: string): boolean {
  // Detect unrelated categories being forced together
  // Example: "All birds have wings. My car has wheels. Therefore, birds are cars."

  // Look for pattern where multiple unrelated premises lead to incorrect conclusion
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

  if (sentences.length < 3) return false;

  // Extract subjects from sentences: "All X have Y" or "X have Y"
  // Pattern: optional "All" or "My/A/An", then capture word(s) until "have/has"
  const subjectPattern = /^(?:all\s+|my\s+|a\s+|an\s+)?(\w+(?:\s+\w+)?)\s+(?:have|has)\s+/i;
  let subjects = [];

  for (let i = 0; i < sentences.length - 1; i++) {
    const match = subjectPattern.exec(sentences[i].trim());
    if (match) {
      subjects.push(match[1].toLowerCase());
    }
  }

  // Check the conclusion
  const lastSentence = sentences[sentences.length - 1].toLowerCase();

  // If we have multiple distinct subjects being equated in the conclusion
  if (subjects.length >= 2) {
    const uniqueSubjects = new Set(subjects);

    // If subjects are distinct AND conclusion tries to equate them
    if (uniqueSubjects.size > 1) {
      // Check for patterns like "X are Y" where X and Y are from different premises
      if (lastSentence.includes('are')) {
        return true;
      }
    }
  }

  return false;
}

function determineLogicStatus(issues: any[]): ValidityStatus {
  if (issues.length === 0) return 'SOUND';
  if (issues.some(i => i.problem_type === 'BROKEN_CHAIN')) return 'BROKEN';
  return 'NEEDS_CLARIFICATION';
}

function calculateStrength(issues: any[], transcriptLength: number): number {
  let baseScore = Math.min(100, (transcriptLength / 100) + 50); // longer = slightly stronger
  const issueDeduction = issues.length * 15;
  return Math.max(0, baseScore - issueDeduction);
}

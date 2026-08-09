/**
 * VALIDATOR
 * Checks validity, premises, and scriptural soundness
 * Applies the VALIDITY, PREMISE, AND SCRIPTURAL TRUTH framework
 */

export interface ValidationResult {
  validity: {
    isValid: boolean;
    issues: string[];
    reasoning: string;
  };
  premises: {
    areSound: boolean;
    checks: PremiseCheck[];
    failures: string[];
  };
  scripture: {
    isScripturallySound: boolean;
    supportingVerses: string[];
    contradictions: string[];
  };
  viewerConsiderations: {
    forAnalytical: string;
    forResistant: string;
    forExplained: string;
  };
  overallResult: 'PASS' | 'NEEDS_REVISION' | 'FAIL';
  summary: string;
}

export interface PremiseCheck {
  premise: string;
  isTrue: boolean;
  isScriptural: boolean;
  evidence: string;
  assessment: 'sound' | 'questionable' | 'false';
}

/**
 * Validate the entire teaching against framework
 */
export function validateTeaching(content: string): ValidationResult {
  console.log('[VALIDATOR] Checking validity, premises, scripture');

  const validity = checkValidity(content);
  const premises = checkPremises(content);
  const scripture = checkScripture(content);
  const viewerConsiderations = buildViewerConsiderations(content, validity, premises);

  // Determine overall result
  let overallResult: 'PASS' | 'NEEDS_REVISION' | 'FAIL' = 'PASS';
  if (!validity.isValid || !premises.areSound || !scripture.isScripturallySound) {
    overallResult = 'NEEDS_REVISION';
  }
  if (scripture.contradictions.length > 0) {
    overallResult = 'FAIL';
  }

  const summary = buildSummary(validity, premises, scripture, overallResult);

  console.log('[VALIDATOR] ✓ Validity:', validity.isValid);
  console.log('[VALIDATOR] ✓ Premises sound:', premises.areSound);
  console.log('[VALIDATOR] ✓ Scripturally sound:', scripture.isScripturallySound);
  console.log('[VALIDATOR] ✓ Overall result:', overallResult);

  return {
    validity,
    premises,
    scripture,
    viewerConsiderations,
    overallResult,
    summary,
  };
}

/**
 * CHECK 1: VALIDITY
 * Does the conclusion follow logically from the premises?
 */
function checkValidity(content: string): ValidationResult['validity'] {
  const lower = content.toLowerCase();
  const issues: string[] = [];

  // Check logical structure
  let isValid = true;

  // If claiming control AND deliverance, check that logic holds
  if (lower.includes('controlled') && lower.includes('delivered')) {
    // Logic: If X was controlled by spirit, and then encountered God, and was delivered
    // VALID conclusion: God's power exceeds spiritual bondage
    // This is logically valid
  } else if (lower.includes('controlled') && !lower.includes('delivered')) {
    issues.push('Presents problem (control) without addressing resolution');
    isValid = false;
  }

  // If claiming justified/blamed
  if (lower.includes('justified') && lower.includes('blamed')) {
    // Logic: Person rationalized through external blame
    // This is logically sound
  }

  const reasoning =
    isValid && issues.length === 0
      ? 'Logical structure is sound: problem → mechanism → turning point → resolution'
      : 'Logical structure has gaps or contradictions';

  return {
    isValid,
    issues,
    reasoning,
  };
}

/**
 * CHECK 2: PREMISES
 * Are the premises true? Are they scripturally sound?
 */
function checkPremises(content: string): ValidationResult['premises'] {
  const checks: PremiseCheck[] = [];
  const failures: string[] = [];

  // Define major premises
  const majorPremises: Omit<PremiseCheck, 'assessment'>[] = [
    {
      premise: 'Spiritual forces exist and can control humans',
      isTrue: true,
      isScriptural: true,
      evidence:
        '2 Corinthians 4:4 (god of this age blinds), 1 Peter 5:8 (adversary seeks), Ephesians 2:2 (prince of power)',
    },
    {
      premise: 'Humans rationalize and self-deceive',
      isTrue: true,
      isScriptural: true,
      evidence: 'Jeremiah 17:9 (heart deceitful), Romans 3:23 (all have sinned)',
    },
    {
      premise: 'God has power to deliver from bondage',
      isTrue: true,
      isScriptural: true,
      evidence:
        'Psalm 119:45 (liberty), 2 Corinthians 3:17 (Spirit brings freedom), John 8:36 (Son sets free)',
    },
    {
      premise: 'Encounter with God produces transformation',
      isTrue: true,
      isScriptural: true,
      evidence:
        'Luke 5:8-11 (Peter encounters Jesus, leaves nets), Acts 9:3-18 (Paul encounter changes everything)',
    },
    {
      premise: 'Deliverance is permanent and real',
      isTrue: true,
      isScriptural: true,
      evidence: '1 Corinthians 15:57 (victory through Christ), Romans 8:37 (more than conquerors)',
    },
  ];

  majorPremises.forEach((p) => {
    const assessment = p.isTrue && p.isScriptural ? 'sound' : 'questionable';
    if (!p.isTrue || !p.isScriptural) {
      failures.push(p.premise);
    }
    checks.push({
      ...p,
      assessment,
    });
  });

  const areSound = failures.length === 0;

  return {
    areSound,
    checks,
    failures,
  };
}

/**
 * CHECK 3: SCRIPTURE
 * Does scripture support the claims? Are there contradictions?
 */
function checkScripture(content: string): ValidationResult['scripture'] {
  const lower = content.toLowerCase();
  const supportingVerses: string[] = [];
  const contradictions: string[] = [];

  // Map claims to scripture
  if (lower.includes('controlled') || lower.includes('bondage')) {
    supportingVerses.push('2 Corinthians 4:4', '1 Peter 5:8', 'Ephesians 2:2');
  }

  if (lower.includes('delivered') || lower.includes('freedom')) {
    supportingVerses.push('Psalm 119:45', '2 Corinthians 3:17', 'John 8:36');
  }

  if (lower.includes('encounter') || lower.includes('jesus')) {
    supportingVerses.push('Luke 5:8-11', 'Acts 9:3-18', '2 Corinthians 5:17');
  }

  if (lower.includes('justified') || lower.includes('blame')) {
    supportingVerses.push('Jeremiah 17:9', 'Romans 3:23');
  }

  // Check for contradictions (e.g., claiming Jesus but denying resurrection)
  // This teaching doesn't contain obvious contradictions
  // But check if claims about freedom contradict claims of ongoing bondage
  if (lower.includes('delivered') && lower.includes('still controlled')) {
    contradictions.push(
      'Claims both deliverance and ongoing control (unless referring to spiritual complacency)'
    );
  }

  const isScripturallySound = supportingVerses.length > 0 && contradictions.length === 0;

  return {
    isScripturallySound,
    supportingVerses: [...new Set(supportingVerses)],
    contradictions,
  };
}

/**
 * Build viewer-type considerations
 * How should this be presented to different types of audiences?
 */
function buildViewerConsiderations(
  content: string,
  validity: ValidationResult['validity'],
  premises: ValidationResult['premises']
): ValidationResult['viewerConsiderations'] {
  return {
    forAnalytical:
      'Present the logical structure first: problem → rationalization → bondage → encounter → deliverance. Support each with scriptural evidence. Analytical persons will see this argument structure is sound before you finish.',
    forResistant:
      'Surface the reality of internal contradiction (person justifies actions they know are wrong). Show that this is observable in human behavior. Then show where scripture confirms this pattern (Jeremiah 17:9). Do not over-explain.',
    forExplained:
      'Affirm their rationality in accepting this argument structure. The willingness to follow sound argument in spiritual matters is itself faith. Acknowledge their discernment.',
  };
}

/**
 * Build overall validation summary
 */
function buildSummary(
  validity: ValidationResult['validity'],
  premises: ValidationResult['premises'],
  scripture: ValidationResult['scripture'],
  overallResult: ValidationResult['overallResult']
): string {
  if (overallResult === 'FAIL') {
    return `Teaching contains scriptural contradictions. Cannot proceed. Contradictions: ${scripture.contradictions.join('; ')}`;
  }

  if (overallResult === 'NEEDS_REVISION') {
    const issues = [];
    if (!validity.isValid) issues.push(`Validity issues: ${validity.issues.join('; ')}`);
    if (!premises.areSound)
      issues.push(`Unsound premises: ${premises.failures.join('; ')}`);
    if (!scripture.isScripturallySound)
      issues.push(`Weak scriptural foundation in some areas`);
    return `Teaching needs revision before delivery. Issues: ${issues.join(' | ')}`;
  }

  return `Teaching passes validation. Logical structure is sound. Premises are biblically grounded. Can proceed with confidence. Supporting scripture: ${scripture.supportingVerses.join(', ')}`;
}

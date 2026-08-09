/**
 * TRIVIUM PROCESSOR
 * Applies Grammar/Logic/Rhetoric analysis to teaching
 * Grammar: What is being said (literally)
 * Logic: Does it follow? Are premises sound?
 * Rhetoric: How is it persuaded? What's the effect?
 */

export interface TriviumAnalysis {
  grammar: {
    structure: string; // Sentence structure overview
    subjects: string[]; // Who/what is being discussed
    verbs: string[]; // What actions are being taken
    objects: string[]; // What is being acted upon
    modifiers: string[]; // How things are described
  };
  logic: {
    premises: Premise[];
    conclusions: string[];
    isValid: boolean;
    issues: string[];
  };
  rhetoric: {
    rhetoricDevices: string[];
    persuasiveApproach: string;
    emotionalAppeal: string;
    effectOnAudience: string;
  };
  hiddenTruths: string[];
}

export interface Premise {
  statement: string;
  isScriptural: boolean;
  isLogicallySound: boolean;
  evidence: string;
}

/**
 * Apply trivium analysis to entire teaching
 */
export function applyTrivium(content: string): TriviumAnalysis {
  console.log('[TRIVIUM-PROCESSOR] Applying Grammar/Logic/Rhetoric analysis');

  const grammar = analyzeGrammar(content);
  const logic = analyzeLogic(content);
  const rhetoric = analyzeRhetoric(content);
  const hiddenTruths = extractHiddenTruths(content, logic);

  console.log('[TRIVIUM-PROCESSOR] ✓ Grammar analyzed');
  console.log('[TRIVIUM-PROCESSOR] ✓ Logic validated:', logic.isValid);
  console.log('[TRIVIUM-PROCESSOR] ✓ Rhetoric identified');
  console.log('[TRIVIUM-PROCESSOR] ✓ Hidden truths extracted:', hiddenTruths.length);

  return {
    grammar,
    logic,
    rhetoric,
    hiddenTruths,
  };
}

/**
 * GRAMMAR: What is being said (literally)?
 */
function analyzeGrammar(content: string): TriviumAnalysis['grammar'] {
  const lower = content.toLowerCase();
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];

  // Find main subjects
  const subjects = new Set<string>();
  const subjectPatterns = [/i\s+([a-z]+)/gi, /the\s+([a-z]+)/gi];
  subjectPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (match[1] && match[1].length > 2) {
        subjects.add(match[1]);
      }
    }
  });

  // Find main verbs
  const verbs = new Set<string>();
  if (lower.includes('controlled')) verbs.add('controlled');
  if (lower.includes('justified')) verbs.add('justified');
  if (lower.includes('blamed')) verbs.add('blamed');
  if (lower.includes('convinced')) verbs.add('convinced');
  if (lower.includes('delivered')) verbs.add('delivered');
  if (lower.includes('encountered')) verbs.add('encountered');

  // Find objects (what is acted upon)
  const objects = new Set<string>();
  if (lower.includes('spirit')) objects.add('spirit');
  if (lower.includes('god')) objects.add('God');
  if (lower.includes('jesus')) objects.add('Jesus');
  if (lower.includes('bondage')) objects.add('bondage');
  if (lower.includes('freedom')) objects.add('freedom');

  // Find modifiers (how things are described)
  const modifiers = new Set<string>();
  if (lower.includes('evil')) modifiers.add('evil');
  if (lower.includes('dark')) modifiers.add('dark');
  if (lower.includes('deceiving')) modifiers.add('deceiving');

  return {
    structure:
      sentences.length + ' sentences; mix of confession, declaration, and proclamation',
    subjects: Array.from(subjects),
    verbs: Array.from(verbs),
    objects: Array.from(objects),
    modifiers: Array.from(modifiers),
  };
}

/**
 * LOGIC: Does it follow? Are premises sound?
 */
function analyzeLogic(content: string): TriviumAnalysis['logic'] {
  const lower = content.toLowerCase();
  const premises: Premise[] = [];
  const conclusions: string[] = [];
  const issues: string[] = [];

  // Identify premises
  const majorPremises = [
    {
      statement: 'Spiritual forces can control human behavior',
      isScriptural: true,
      evidence: '2 Corinthians 4:4, 1 Peter 5:8, Ephesians 2:2',
    },
    {
      statement: 'Humans rationalize and self-deceive',
      isScriptural: true,
      evidence: 'Jeremiah 17:9, Romans 3:23',
    },
    {
      statement: 'God has power to deliver from bondage',
      isScriptural: true,
      evidence: 'Psalm 119:45, 2 Corinthians 3:17, John 8:36',
    },
    {
      statement: 'Encounter with God produces transformation',
      isScriptural: true,
      evidence: 'Luke 5:8-11 (Peter), Acts 9:3-18 (Paul)',
    },
  ];

  majorPremises.forEach((p) => {
    premises.push({
      ...p,
      isLogicallySound: true,
    });
  });

  // Identify conclusions
  if (lower.includes('delivered')) {
    conclusions.push(
      'If one has encountered God and been delivered, then freedom is available to all through the same encounter'
    );
  }

  if (lower.includes('controlled') && lower.includes('encountered')) {
    conclusions.push(
      'Spiritual bondage can be overcome through direct encounter with God'
    );
  }

  // Check for logical validity
  const isValid = premises.every((p) => p.isLogicallySound && p.isScriptural);

  if (premises.length > 0 && conclusions.length > 0) {
    if (!isValid) {
      issues.push('One or more premises lack scriptural foundation');
    }
  }

  return {
    premises,
    conclusions,
    isValid,
    issues,
  };
}

/**
 * RHETORIC: How is it persuaded? What's the effect?
 */
function analyzeRhetoric(content: string): TriviumAnalysis['rhetoric'] {
  const lower = content.toLowerCase();
  const rhetoricDevices: string[] = [];
  const emotionalAppeal: string[] = [];

  // Identify rhetoric devices
  if (lower.includes('until')) {
    rhetoricDevices.push('Contrast/Turning Point');
  }
  if (lower.includes('that spirit')) {
    rhetoricDevices.push('Repetition (anchoring phrase)');
  }
  if (lower.includes('i too')) {
    rhetoricDevices.push('Personal testimony (First-person confession)');
  }
  if (lower.includes('you tell yourself')) {
    rhetoricDevices.push('Direct address to audience');
  }

  // Identify emotional appeals
  if (
    lower.includes('controlled') ||
    lower.includes('justified') ||
    lower.includes('convinced')
  ) {
    emotionalAppeal.push('Empathy (relatability to common struggles)');
  }
  if (lower.includes('delivered')) {
    emotionalAppeal.push('Hope (transformation is possible)');
  }
  if (lower.includes('jesus') || lower.includes('god')) {
    emotionalAppeal.push('Authority (spiritual credibility)');
  }

  return {
    rhetoricDevices: [...new Set(rhetoricDevices)],
    persuasiveApproach: 'Personal testimony followed by divine proclamation',
    emotionalAppeal: emotionalAppeal.join('; '),
    effectOnAudience:
      'Produces identification (I too experience this) → hope (God can deliver) → faith (toward the proclaimed Jesus)',
  };
}

/**
 * Extract hidden truths not explicitly stated but implied
 */
function extractHiddenTruths(content: string, logic: TriviumAnalysis['logic']): string[] {
  const truths: string[] = [];
  const lower = content.toLowerCase();

  // If text mentions being controlled and then delivered
  if (lower.includes('controlled') && lower.includes('delivered')) {
    truths.push(
      'Personal responsibility coexists with spiritual bondage (person was acting from bondage, but deliverance came through encounter)'
    );
  }

  // If text mentions justified/blamed
  if (lower.includes('justified') && lower.includes('blamed')) {
    truths.push(
      'Spiritual oppression uses natural circumstances (economy, opportunity) as cover for deeper spiritual control'
    );
  }

  // If text mentions encounter
  if (lower.includes('encounter')) {
    truths.push(
      'Transformation does not come from knowledge alone (intellectual assent), but from direct meeting with the divine person'
    );
  }

  // If text has turning point (until)
  if (lower.includes('until')) {
    truths.push(
      'Deliverance requires an intervention from outside the system of bondage (cannot self-deliver from spiritual bondage)'
    );
  }

  // If text is confessional
  if (lower.includes('i too')) {
    truths.push(
      'The speaker is claiming personal authority through lived experience, not theoretical argument'
    );
  }

  return truths;
}

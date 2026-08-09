/**
 * TEACHING EXHUMER
 * Analyzes structure: themes, narrative arc, gaps between statements
 * Uses verbatim elements as anchors
 */

import type { VerbatimElement } from './verbatim-extractor';

export interface TeachingStructure {
  themes: string[];
  narrativeArc: {
    problem: string;
    realization: string;
    intervention: string;
    result: string;
  };
  gapsBetweenStatements: Gap[];
  primaryMovement: 'conviction' | 'realization' | 'confession' | 'question' | 'challenge' | 'testimony';
}

export interface Gap {
  position: number; // which verbatim statement precedes this gap?
  before: VerbatimElement;
  after?: VerbatimElement;
  description: string; // what should go here?
  needsReasoning: boolean; // does this gap need explanatory content?
}

/**
 * Analyze teaching structure using verbatim elements as anchors
 */
export function exhumeTeachingStructure(
  content: string,
  verbatimElements: VerbatimElement[]
): TeachingStructure {
  console.log('[TEACHING-EXHUMER] Analyzing structure');

  const themes = identifyThemes(content);
  const narrativeArc = identifyNarrativeArc(content, verbatimElements);
  const gapsBetweenStatements = identifyGaps(verbatimElements);
  const primaryMovement = identifyPrimaryMovement(content);

  console.log('[TEACHING-EXHUMER] ✓ Themes:', themes);
  console.log('[TEACHING-EXHUMER] ✓ Narrative:', narrativeArc.problem, '→', narrativeArc.result);
  console.log('[TEACHING-EXHUMER] ✓ Gaps identified:', gapsBetweenStatements.length);
  console.log('[TEACHING-EXHUMER] ✓ Primary movement:', primaryMovement);

  return {
    themes,
    narrativeArc,
    gapsBetweenStatements,
    primaryMovement,
  };
}

/**
 * Identify spiritual themes present in the teaching
 */
function identifyThemes(content: string): string[] {
  const themes: string[] = [];
  const lower = content.toLowerCase();

  // Theme patterns (not exhaustive, extensible)
  const themeMap: Record<string, RegExp> = {
    'Spiritual Bondage': /\b(controlled|bound|enslaved|trapped|captive|spirit)\b/i,
    'Deception': /\b(deceived|deceit|deception|lie|lied|false|pretend)\b/i,
    'Rationalization': /\b(justify|justified|excuse|rationalize|blame|blamed)\b/i,
    'Divine Encounter': /\b(encounter|met|Jesus|God|Christ|prayer|delivered)\b/i,
    'Deliverance': /\b(delivered|freedom|free|liberated|set free|breakthrough)\b/i,
    'Personal Responsibility': /\b(chose|choose|choice|decided|decision|convince)\b/i,
    'Transformation': /\b(changed|transform|new|beginning|restored|recovery)\b/i,
    'Spiritual Warfare': /\b(war|battle|spirit|evil|demon|enemy)\b/i,
    'Faith & Trust': /\b(faith|trust|believe|believing|trust God)\b/i,
    'Daily Choice': /\b(daily|every day|morning|choose|choosing)\b/i,
  };

  Object.entries(themeMap).forEach(([theme, pattern]) => {
    if (pattern.test(content)) {
      themes.push(theme);
    }
  });

  return themes.length > 0 ? themes : ['General Teaching'];
}

/**
 * Identify narrative arc using verbatim statements as guides
 */
function identifyNarrativeArc(
  content: string,
  verbatimElements: VerbatimElement[]
): TeachingStructure['narrativeArc'] {
  const statements = verbatimElements.filter((el) => el.type === 'statement');
  const lower = content.toLowerCase();

  // Look for narrative components
  let problem = 'Spiritual issue or bondage';
  let realization = 'Understanding of truth';
  let intervention = 'Divine action or encounter';
  let result = 'Freedom or transformation';

  // Refine based on verbatim statements
  statements.forEach((stmt) => {
    const text = stmt.text.toLowerCase();

    if (
      text.includes('controlled') ||
      text.includes('trapped') ||
      text.includes('justified') ||
      text.includes('blamed')
    ) {
      problem = stmt.text;
    }

    if (
      text.includes('realized') ||
      text.includes('understand') ||
      text.includes('encounter') ||
      text.includes('until')
    ) {
      realization = stmt.text;
    }

    if (text.includes('delivered') || text.includes('he') || text.includes('god')) {
      intervention = stmt.text;
    }

    if (
      text.includes('freedom') ||
      text.includes('new') ||
      text.includes('beginning') ||
      text.includes('delivered')
    ) {
      result = stmt.text;
    }
  });

  return {
    problem,
    realization,
    intervention,
    result,
  };
}

/**
 * Identify gaps between verbatim statements
 * These are places where connective content should go
 */
function identifyGaps(verbatimElements: VerbatimElement[]): Gap[] {
  const gaps: Gap[] = [];

  // Sort statements by line number
  const statements = verbatimElements
    .filter((el) => el.type === 'statement')
    .sort((a, b) => a.lineNumber - b.lineNumber);

  statements.forEach((stmt, index) => {
    // Determine what kind of gap follows this statement
    const nextStatement = statements[index + 1];

    if (nextStatement) {
      const lineGap = nextStatement.lineNumber - stmt.lineNumber;

      if (lineGap > 1) {
        // There's a gap
        let description = '';
        let needsReasoning = false;

        // Determine what kind of content should fill this gap
        const currentText = stmt.text.toLowerCase();
        const nextText = nextStatement.text.toLowerCase();

        if (
          currentText.includes('problem') &&
          (nextText.includes('realized') || nextText.includes('encounter'))
        ) {
          description = 'Explain the problem, deepen understanding before the turning point';
          needsReasoning = true;
        } else if (currentText.includes('realized') && nextText.includes('delivered')) {
          description = 'Show how realization connects to intervention';
          needsReasoning = true;
        } else if (currentText.includes('delivered') && nextText.includes('freedom')) {
          description = 'Explain the result and its significance';
          needsReasoning = false;
        } else {
          description = 'Connective content or explanation';
          needsReasoning = true;
        }

        gaps.push({
          position: index,
          before: stmt,
          after: nextStatement,
          description,
          needsReasoning,
        });
      }
    }
  });

  return gaps;
}

/**
 * Identify the primary movement of the teaching
 * What is it trying to accomplish?
 */
function identifyPrimaryMovement(
  content: string
): 'conviction' | 'realization' | 'confession' | 'question' | 'challenge' | 'testimony' {
  const lower = content.toLowerCase();

  if (
    lower.includes('most people') ||
    lower.includes('many') ||
    lower.includes('you tell yourself')
  ) {
    return 'conviction';
  }

  if (
    lower.includes('i realized') ||
    lower.includes('i understand') ||
    lower.includes('here\'s what')
  ) {
    return 'realization';
  }

  if (
    lower.includes('i too') ||
    lower.includes('i was') ||
    lower.includes('i had') ||
    lower.includes('i spent')
  ) {
    return 'confession';
  }

  if (lower.includes('?')) {
    return 'question';
  }

  if (lower.includes('but') || lower.includes('yet') || lower.includes('however')) {
    return 'challenge';
  }

  return 'testimony';
}

/**
 * Determine what kind of connective content a gap needs
 */
export function describeGapContent(gap: Gap): string {
  const beforeType = gap.before.text.toLowerCase();
  const afterType = gap.after?.text.toLowerCase() || '';

  // Build description based on gap position and context
  if (beforeType.includes('problem') && afterType.includes('encounter')) {
    return 'Why did this problem persist? What was the cost? Set up the turning point.';
  }

  if (
    beforeType.includes('justified') ||
    beforeType.includes('blamed')
  ) {
    return 'Explain the rationalization. Show how this thinking traps people.';
  }

  if (beforeType.includes('encounter') && afterType.includes('delivered')) {
    return 'Describe the encounter. What changed? How did God move?';
  }

  if (beforeType.includes('delivered') || beforeType.includes('freedom')) {
    return 'What does transformation look like now? How does this apply?';
  }

  return 'Provide reasoning or connection between these points.';
}

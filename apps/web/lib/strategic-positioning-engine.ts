import type { VerbatimElement } from './types/teaching-process';
import type { DeepReasoning } from './types/teaching-process';

export interface PositionedStatement {
  id: string;
  text: string;
  position: 'lead' | 'bridge' | 'anchor' | 'close';
  index: number;
  trustSignals: {
    useInverseIncentive: boolean;
    inverseIncentiveHint?: string;
    specificObservation?: string;
    restraintSignal?: string;
    positionAsDiscovery: boolean;
  };
  connectorStrategy: string;
  narrativeContext: string;
}

export interface PositioningBlueprint {
  statements: PositionedStatement[];
  narrativeArc: string;
  globalTrustStrategy: string;
  keyTurningPoints: {
    statement: string;
    why: string;
  }[];
}

export function generatePositioningBlueprint(
  verbatimElements: VerbatimElement[],
  reasoning: DeepReasoning
): PositioningBlueprint {
  console.log('[POSITIONING] Analyzing narrative arc and trust opportunities...');

  const statements = verbatimElements
    .filter((v) => v.type === 'statement')
    .map((v) => v.text);

  if (statements.length === 0) {
    return createEmptyBlueprint();
  }

  // Step 1: Identify narrative positions
  const positionedStatements = identifyPositions(statements, reasoning);

  // Step 2: Map trust signal opportunities
  const withTrustSignals = mapTrustSignals(
    positionedStatements,
    statements,
    reasoning
  );

  // Step 3: Define connector strategies
  const withConnectors = defineConnectorStrategies(
    withTrustSignals,
    reasoning
  );

  // Step 4: Identify key turning points
  const keyTurningPoints = identifyTurningPoints(withConnectors, reasoning);

  // Step 5: Synthesize global trust strategy
  const globalStrategy = synthesizeGlobalStrategy(
    withConnectors,
    reasoning,
    keyTurningPoints
  );

  console.log('[POSITIONING] ✓ Blueprint generated');

  return {
    statements: withConnectors,
    narrativeArc: buildNarrativeDescription(withConnectors),
    globalTrustStrategy: globalStrategy,
    keyTurningPoints,
  };
}

function identifyPositions(
  statements: string[],
  reasoning: DeepReasoning
): PositionedStatement[] {
  const count = statements.length;

  return statements.map((text, index) => {
    let position: 'lead' | 'bridge' | 'anchor' | 'close';

    if (index === 0) {
      position = 'lead'; // First statement sets frame
    } else if (index === count - 1) {
      position = 'close'; // Last statement closes arc
    } else if (index === Math.floor(count / 2)) {
      position = 'anchor'; // Middle statement is the turning point
    } else {
      position = 'bridge'; // Connective statements
    }

    return {
      id: `stmt-${index}`,
      text,
      position,
      index,
      trustSignals: {
        useInverseIncentive: false,
        positionAsDiscovery: false,
      },
      connectorStrategy: '',
      narrativeContext: '',
    };
  });
}

function mapTrustSignals(
  positioned: PositionedStatement[],
  statements: string[],
  reasoning: DeepReasoning
): PositionedStatement[] {
  return positioned.map((stmt) => {
    const signals = {
      useInverseIncentive: false,
      inverseIncentiveHint: undefined as string | undefined,
      specificObservation: undefined as string | undefined,
      restraintSignal: undefined as string | undefined,
      positionAsDiscovery: false,
    };

    // LEAD position: use inverse incentive
    // Show what this costs reader, not what it gains us
    if (stmt.position === 'lead') {
      signals.useInverseIncentive = true;
      signals.inverseIncentiveHint =
        'Lead with what the reader stands to lose or learn, not with what the teaching offers them';
    }

    // ANCHOR position: use restraint signal
    // Acknowledge where current approach works
    if (stmt.position === 'anchor') {
      signals.restraintSignal =
        'This may not need changing if your current approach is working. Only consider this if...';
    }

    // BRIDGE positions: use specific observations
    // Show you understand their world, not universal truths
    if (stmt.position === 'bridge') {
      signals.specificObservation =
        'Ground this in specific context, not generic wisdom';
    }

    // CLOSE position: position as discovery
    // Let the reader conclude, not convince them
    if (stmt.position === 'close') {
      signals.positionAsDiscovery = true;
    }

    return {
      ...stmt,
      trustSignals: signals,
      narrativeContext: generateNarrativeContext(stmt, statements),
    };
  });
}

function defineConnectorStrategies(
  positioned: PositionedStatement[],
  reasoning: DeepReasoning
): PositionedStatement[] {
  return positioned.map((stmt, index) => {
    let strategy = '';

    if (stmt.position === 'lead') {
      strategy =
        'Before this statement, show you understand the reader\'s situation. Make them feel seen. Then let the statement land as a realization, not a pitch.';
    } else if (stmt.position === 'anchor') {
      strategy =
        'This is the turning point. Bridge from the problem to the possibility. Use restraint—acknowledge what works now, then show what becomes possible.';
    } else if (stmt.position === 'bridge') {
      strategy =
        'Connect the previous statement to the next. Use specific detail. Show you\'ve walked this path or studied it deeply. Sound like a peer, not a teacher.';
    } else if (stmt.position === 'close') {
      strategy =
        'Don\'t push toward conclusion. Let the reader land here naturally. The statement should feel like they discovered it, not you delivered it.';
    }

    return {
      ...stmt,
      connectorStrategy: strategy,
    };
  });
}

function identifyTurningPoints(
  positioned: PositionedStatement[],
  reasoning: DeepReasoning
): { statement: string; why: string }[] {
  return positioned
    .filter((s) => s.position === 'anchor' || s.position === 'close')
    .map((s) => ({
      statement: s.text,
      why:
        s.position === 'anchor'
          ? 'This is where bondage becomes possibility'
          : 'This is the ultimate resolution',
    }));
}

function synthesizeGlobalStrategy(
  positioned: PositionedStatement[],
  reasoning: DeepReasoning,
  turningPoints: { statement: string; why: string }[]
): string {
  const strategy = [
    'LEAD WITH INVERSE INCENTIVE: Show what the reader needs to understand about themselves, not what you\'re offering.',
    'USE RESTRAINT: Acknowledge what\'s working now. Only emphasize change where current approach has limits.',
    'POSITION AS DISCOVERY: Every statement should feel like the reader is uncovering truth, not receiving instruction.',
    'SPECIFIC BEFORE UNIVERSAL: Ground examples in particular contexts before extracting universal principles.',
    'AUTHENTICITY OVER PERSUASION: If forced to choose between convincing and being honest, be honest.',
  ];

  return strategy.join(' | ');
}

function generateNarrativeContext(
  stmt: PositionedStatement,
  allStatements: string[]
): string {
  const before = allStatements[stmt.index - 1] || '';
  const after = allStatements[stmt.index + 1] || '';

  return `Before: ${before || '[start]'} | This: ${stmt.text} | After: ${after || '[end]'}`;
}

function buildNarrativeDescription(positioned: PositionedStatement[]): string {
  const lead = positioned.find((s) => s.position === 'lead')?.text || '';
  const anchor = positioned.find((s) => s.position === 'anchor')?.text || '';
  const close = positioned.find((s) => s.position === 'close')?.text || '';

  return `Opens with: "${lead}" | Turns at: "${anchor}" | Closes with: "${close}"`;
}

function createEmptyBlueprint(): PositioningBlueprint {
  return {
    statements: [],
    narrativeArc: 'No statements to analyze',
    globalTrustStrategy: 'Unable to generate strategy without statements',
    keyTurningPoints: [],
  };
}

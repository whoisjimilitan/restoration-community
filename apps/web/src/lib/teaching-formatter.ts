/**
 * TEACHING FORMATTER
 * Generates 7 publication-ready formats from DigestedTeaching + PositioningBlueprint
 * Using Brother Jimi's authentic voice + Phase 2.5 trust signal positioning
 */

import type { DigestedTeaching } from './teaching-digester';
import type { PositioningBlueprint } from './strategic-positioning-engine';

export interface FormattedOutput {
  format: 'article' | 'email' | 'facebook' | 'twitter' | 'instagram' | 'podcast' | 'video';
  content: string;
  hooks: string[];
  cta: string;
  positioningStrategy?: string;
}

/**
 * Generate all 7 formats from digested teaching + positioning blueprint
 * Each format applies Brother Jimi voice + Phase 2.5 trust signal strategy
 */
export function generateAllFormats(
  digested: DigestedTeaching,
  positioning?: PositioningBlueprint
): FormattedOutput[] {
  return [
    generateArticle(digested, positioning),
    generateEmail(digested, positioning),
    generateFacebook(digested, positioning),
    generateTwitter(digested, positioning),
    generateInstagram(digested, positioning),
    generatePodcast(digested, positioning),
    generateVideo(digested, positioning),
  ];
}

function generateArticle(digested: DigestedTeaching, positioning?: PositioningBlueprint): FormattedOutput {
  const { revelation, mechanism, cost, transformation, keyPhrases, primaryMovement } = digested;

  // Article structure: Lead (inverse incentive) → Bridge (specific obs) → Anchor (restraint) → Close (discovery)
  let content = '';

  // LEAD: Inverse incentive (reader recognizes themselves first)
  const leadStatement = positioning?.statements.find(s => s.position === 'lead');
  if (leadStatement?.trustSignals.useInverseIncentive) {
    content += `**Most people believe this.**\n\n`;
    content += `${keyPhrases[0] || revelation}\n\n`;
    if (leadStatement.trustSignals.inverseIncentiveHint) {
      content += `${leadStatement.trustSignals.inverseIncentiveHint}\n\n`;
    }
  } else if (primaryMovement === 'conviction') {
    content += `**Most people believe this.**\n\n${keyPhrases[0] || revelation}\n\n`;
  }

  // BRIDGE: Specific observation (particular before universal)
  const bridgeStatement = positioning?.statements.find(s => s.position === 'bridge');
  if (bridgeStatement?.trustSignals.specificObservation) {
    content += `**Here's the specific mechanism:**\n\n`;
    content += `${bridgeStatement.trustSignals.specificObservation}\n\n`;
  }
  content += `${mechanism}\n\n`;

  // ANCHOR: Restraint signal (acknowledge what's already working)
  const anchorStatement = positioning?.statements.find(s => s.position === 'anchor');
  if (anchorStatement?.trustSignals.restraintSignal) {
    content += `**This is important - what's already true:**\n\n`;
    content += `${anchorStatement.trustSignals.restraintSignal}\n\n`;
  }
  content += `**If you miss this:**\n\n${cost}\n\n`;

  // Transformation
  content += `**When you understand it:**\n\n${transformation}\n\n`;

  // CLOSE: Discovery positioning (reader uncovers answer)
  const closeStatement = positioning?.statements.find(s => s.position === 'close');
  if (closeStatement?.trustSignals.positionAsDiscovery) {
    content += `**What this reveals for you:**\n\n`;
  }
  content += `**What this means for you right now:**\n\n${keyPhrases[keyPhrases.length - 1] || 'This is not theory. This is lived reality.'}`;

  return {
    format: 'article',
    content,
    hooks: [keyPhrases[0] || revelation, mechanism],
    cta: 'Consider how this shifts your understanding today.',
    positioningStrategy: positioning?.globalTrustStrategy,
  };
}

function generateEmail(digested: DigestedTeaching, positioning?: PositioningBlueprint): FormattedOutput {
  const { revelation, mechanism, transformation, keyPhrases } = digested;
  const leadStatement = positioning?.statements.find(s => s.position === 'lead');

  const content = `Hi,

I came across something that shifted how I see this.

${leadStatement?.trustSignals.inverseIncentiveHint || keyPhrases[0] || revelation}

Here's the mechanism: ${mechanism}

The transformation that becomes possible: ${transformation}

I thought you should see this.

${keyPhrases[keyPhrases.length - 1] || 'This changes everything.'}`;

  return {
    format: 'email',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Reply and let me know what you think.',
    positioningStrategy: positioning?.globalTrustStrategy,
  };
}

function generateFacebook(digested: DigestedTeaching, positioning?: PositioningBlueprint): FormattedOutput {
  const { revelation, mechanism, keyPhrases, themes } = digested;
  const leadStatement = positioning?.statements.find(s => s.position === 'lead');

  const content = `${leadStatement?.trustSignals.inverseIncentiveHint || keyPhrases[0] || revelation}

${mechanism}

Here's what most people miss: it's not about believing. It's about understanding the mechanism.

${keyPhrases[keyPhrases.length - 1] || 'The truth is simpler than you think.'}

${themes.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`;

  return {
    format: 'facebook',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'What does this reveal for you? Share below.',
    positioningStrategy: positioning?.globalTrustStrategy,
  };
}

function generateTwitter(digested: DigestedTeaching, positioning?: PositioningBlueprint): FormattedOutput {
  const { keyPhrases, cost, transformation } = digested;
  const leadStatement = positioning?.statements.find(s => s.position === 'lead');
  const closeStatement = positioning?.statements.find(s => s.position === 'close');

  const tweets = [
    `Tweet 1:\n${leadStatement?.trustSignals.inverseIncentiveHint || keyPhrases[0] || 'Most people get this wrong.'}`,
    `Tweet 2:\nThe cost of missing this: ${cost.substring(0, 100)}...`,
    `Tweet 3:\nWhat becomes possible: ${transformation.substring(0, 100)}...`,
    `Tweet 4:\n${closeStatement?.text || keyPhrases[1] || 'This is not about belief. This is about understanding.'}`,
  ].join('\n\n');

  return {
    format: 'twitter',
    content: tweets,
    hooks: keyPhrases.slice(0, 2),
    cta: 'RT if this lands.',
    positioningStrategy: positioning?.globalTrustStrategy,
  };
}

function generateInstagram(digested: DigestedTeaching, positioning?: PositioningBlueprint): FormattedOutput {
  const { revelation, mechanism, transformation, keyPhrases, themes } = digested;
  const leadStatement = positioning?.statements.find(s => s.position === 'lead');

  const content = `${leadStatement?.trustSignals.inverseIncentiveHint || keyPhrases[0] || revelation}

${mechanism}

When you see this clearly:
${transformation}

.\n.\n.\n

${themes.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`;

  return {
    format: 'instagram',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Save this. Share it. Live it.',
    positioningStrategy: positioning?.globalTrustStrategy,
  };
}

function generatePodcast(digested: DigestedTeaching, positioning?: PositioningBlueprint): FormattedOutput {
  const { fullTeaching, revelation, mechanism, transformation, keyPhrases } = digested;
  const leadStatement = positioning?.statements.find(s => s.position === 'lead');

  const content = `[INTRO - 0:00]
${leadStatement?.trustSignals.inverseIncentiveHint || keyPhrases[0] || revelation}

[TEACHING - 0:30]
Here's what most people miss:
${mechanism}

The cost of ignoring this:
${digested.cost}

[DEEPENING - 3:00]
${fullTeaching.substring(0, 500)}...

[TRANSFORMATION - 8:00]
${transformation}

[CLOSING - 9:00]
${keyPhrases[keyPhrases.length - 1] || 'This is lived reality.'}

Runtime: 10-12 minutes`;

  return {
    format: 'podcast',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Subscribe and share this with someone who needs to hear it.',
    positioningStrategy: positioning?.globalTrustStrategy,
  };
}

function generateVideo(digested: DigestedTeaching, positioning?: PositioningBlueprint): FormattedOutput {
  const { keyPhrases, revelation, mechanism, transformation } = digested;
  const leadStatement = positioning?.statements.find(s => s.position === 'lead');

  const content = `[OPEN - 0:00-0:05]
[Direct eye contact, pause]
${leadStatement?.trustSignals.inverseIncentiveHint || keyPhrases[0] || revelation}

[BODY - 0:05-0:45]
Here's how this works:
${mechanism}

What becomes possible:
${transformation}

[CLOSE - 0:45-1:00]
[Pause, lean in]
This is not theory.

${keyPhrases[keyPhrases.length - 1] || 'This is lived reality.'}

[NOTES: Simple background, deliberate pacing, direct address]`;

  return {
    format: 'video',
    content,
    hooks: [keyPhrases[0] || revelation],
    cta: 'Watch the full teaching. Share it.',
    positioningStrategy: positioning?.globalTrustStrategy,
  };
}

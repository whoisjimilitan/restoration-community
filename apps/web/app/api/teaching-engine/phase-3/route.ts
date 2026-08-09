/**
 * TEACHING ENGINE - PHASE 3
 * Output Generation: Create publication-ready content in 7 formats
 *
 * POST /api/teaching-engine/phase-3
 * Body: {
 *   verbatimElements: VerbatimElement[]
 *   reasoning: DeepReasoning
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateVerbatimInOutput } from '@/lib/output-validator';
import { applyBrotherJimiVoice } from '@/lib/voice-applier';
import type { VerbatimElement, DeepReasoning } from '@/lib/types/teaching-process';

export const dynamic = 'force-dynamic';

interface Phase3Request {
  verbatimElements: VerbatimElement[];
  reasoning: DeepReasoning;
  positioning?: any; // PositioningBlueprint from Phase 2.5
}

interface Phase3Response {
  success: boolean;
  outputs: {
    article: string;
    email: string;
    facebook: string;
    twitter: string;
    instagram: string;
    podcast: string;
    video: string;
  };
  validation: {
    allFormats: {
      format: string;
      verbatimPreserved: boolean;
      preservedCount: number;
      issues: string[];
    }[];
    ready: boolean;
  };
  stats: {
    totalFormatsGenerated: number;
    formatsPassingValidation: number;
    verbatimElementsUsed: number;
  };
}

export async function POST(request: NextRequest) {
  console.log('[TEACHING-ENGINE] Phase 3: Output Generation');

  try {
    const body = (await request.json()) as Phase3Request;
    const { verbatimElements, reasoning, positioning } = body;

    if (!verbatimElements || verbatimElements.length === 0) {
      return NextResponse.json({ error: 'Verbatim elements required' }, { status: 400 });
    }

    if (!reasoning) {
      return NextResponse.json({ error: 'Reasoning required' }, { status: 400 });
    }

    console.log('[PHASE-3] Generating 7 formats with positioning blueprint...');
    if (positioning) {
      console.log('[PHASE-3] Using strategic positioning for connective content');
    }

    const statements = verbatimElements.filter((v) => v.type === 'statement');
    const outputs = generateAllFormats(statements, reasoning, positioning);

    console.log('[PHASE-3] ✓ All formats generated');
    console.log('[PHASE-3] Validating verbatim preservation...');

    // Validate each format
    const formatValidation = [];
    const formats = Object.entries(outputs) as [string, string][];

    let passCount = 0;
    for (const [formatName, content] of formats) {
      const validation = validateVerbatimInOutput(content, verbatimElements);

      formatValidation.push({
        format: formatName,
        verbatimPreserved: validation.passed,
        preservedCount: validation.preservedCount,
        issues: validation.issues,
      });

      if (validation.passed) {
        passCount++;
      }
    }

    console.log('[PHASE-3] ✓ Validation complete:', passCount, 'of', formats.length, 'formats passing');

    const response: Phase3Response = {
      success: true,
      outputs,
      validation: {
        allFormats: formatValidation,
        ready: passCount === formats.length,
      },
      stats: {
        totalFormatsGenerated: formats.length,
        formatsPassingValidation: passCount,
        verbatimElementsUsed: verbatimElements.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[PHASE-3] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Processing failed',
      },
      { status: 500 }
    );
  }
}

/**
 * Generate all 7 formats with optional strategic positioning
 */
function generateAllFormats(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): any {
  // For social media, prioritize hook-tier content (questions, scenarios, quotes)
  const hookFirst = [...statements].sort((a, b) => {
    const aPriority = a.hookPriority || 0;
    const bPriority = b.hookPriority || 0;
    return bPriority - aPriority; // Descending: high priority first
  });

  return {
    article: generateArticle(statements, reasoning, positioning),
    email: generateEmail(statements, reasoning, positioning),
    facebook: generateFacebook(hookFirst, reasoning, positioning),
    twitter: generateTwitter(hookFirst, reasoning, positioning),
    instagram: generateInstagram(hookFirst, reasoning, positioning),
    podcast: generatePodcast(statements, reasoning, positioning),
    video: generateVideo(hookFirst, reasoning, positioning),
  };
}

function getPositioningStrategy(index: number, positioning?: any): any {
  if (!positioning || !positioning.statements) return null;
  return positioning.statements[index] || null;
}

function generateArticle(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): string {
  const sections = [
    statements[0]?.text || 'The Core Truth',
    '',
    'Why This Matters',
    '',
    applyBrotherJimiVoice(
      `Most people face this without understanding it. ${statements[1]?.text || ''} ${statements[2]?.text || ''}`
    ),
    '',
    'The Reality',
    '',
    applyBrotherJimiVoice(
      `${statements[3]?.text || ''} This is where many stay trapped.`
    ),
    '',
    'How It Works',
    '',
    applyBrotherJimiVoice(
      reasoning.holisticInsight || 'The teaching opens with personal vulnerability, establishing lived authority.'
    ),
    '',
    'The Turning Point',
    '',
    statements[4]?.text || 'Until something changed.',
    '',
    'What Became Possible',
    '',
    applyBrotherJimiVoice(
      `${statements[5]?.text || ''} This is not theory. This is transformation.`
    ),
    '',
    'Divine Authority',
    '',
    statements[6]?.text || 'Jesus Christ is the answer.',
    '',
    'Scripture Support',
    '',
    reasoning.validation.scripture.supportingVerses.slice(0, 3).join('\n'),
  ];

  return sections.filter((s) => s.trim().length > 0).join('\n');
}

function generateEmail(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): string {
  return [
    'Hi there,',
    '',
    `I came across something that felt personal.`,
    '',
    statements[0]?.text || '',
    '',
    applyBrotherJimiVoice(
      `This speaks to reality: ${statements[1]?.text || ''} ${statements[2]?.text || ''}`
    ),
    '',
    applyBrotherJimiVoice(
      `${statements[3]?.text || ''} But something changed for me.`
    ),
    '',
    statements[4]?.text || '',
    '',
    applyBrotherJimiVoice(
      `${statements[5]?.text || ''} Now I know: ${statements[6]?.text || ''}`
    ),
    '',
    `Scripture: ${reasoning.validation.scripture.supportingVerses[0]}`,
    '',
    applyBrotherJimiVoice(
      'This resonated with me. I thought it might resonate with you too.'
    ),
    '',
    'Best,',
    '[Your Name]',
  ]
    .filter((s) => s.trim().length > 0)
    .join('\n');
}

function generateFacebook(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): string {
  return [
    statements[0]?.text || '',
    '',
    applyBrotherJimiVoice(`${statements[1]?.text || ''} ${statements[2]?.text || ''}`),
    '',
    statements[3]?.text || '',
    '',
    applyBrotherJimiVoice(`But then: ${statements[4]?.text || ''}`),
    '',
    applyBrotherJimiVoice(`${statements[5]?.text || ''}`),
    '',
    `✝ ${statements[6]?.text || ''} ✝`,
    '',
    reasoning.validation.scripture.supportingVerses[0],
  ]
    .filter((s) => s.trim().length > 0)
    .join('\n');
}

function generateTwitter(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): string {
  const tweets = [
    `Tweet 1:\n${statements[0]?.text || ''}`,
    `Tweet 2:\n${statements[1]?.text || ''}`,
    `Tweet 3:\n${statements[2]?.text || ''}`,
    `Tweet 4:\n${statements[3]?.text || ''}`,
    `Tweet 5:\n${statements[4]?.text || ''}`,
    `Tweet 6:\n${statements[5]?.text || ''}`,
    `Tweet 7:\n${statements[6]?.text || ''}`,
    `Tweet 8:\n${reasoning.validation.scripture.supportingVerses[0]}`,
  ];

  return tweets.filter((t) => t.length > 0).join('\n\n');
}

function generateInstagram(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): string {
  return [
    statements[0]?.text || '',
    '',
    statements[1]?.text || '',
    statements[2]?.text || '',
    statements[3]?.text || '',
    '',
    applyBrotherJimiVoice(`But then: ${statements[4]?.text || ''}`),
    '',
    statements[5]?.text || '',
    '',
    statements[6]?.text || '',
    '',
    'Not theory. Lived reality.',
    '',
    '#Faith #Freedom #Transformation #Truth',
    '',
    reasoning.validation.scripture.supportingVerses[0],
  ]
    .filter((s) => s.trim().length > 0)
    .join('\n');
}

function generatePodcast(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): string {
  return [
    'EPISODE TITLE: From Bondage to Breakthrough',
    '',
    applyBrotherJimiVoice(
      `${statements[0]?.text || ''} In this episode we explore how people rationalize their bondage and how true transformation comes through direct encounter with God.`
    ),
    '',
    'KEY TAKEAWAYS',
    ...statements.map((stmt, i) => `${i + 1}. ${stmt.text}`),
    '',
    'SCRIPTURE',
    ...reasoning.validation.scripture.supportingVerses.slice(0, 3).map((v) => `• ${v}`),
  ]
    .filter((s) => s.trim().length > 0)
    .join('\n');
}

function generateVideo(statements: VerbatimElement[], reasoning: DeepReasoning, positioning?: any): string {
  return [
    '[OPEN - 0-3 seconds]',
    '[Direct eye contact]',
    applyBrotherJimiVoice(statements[0]?.text || ''),
    '',
    '[BODY - 3-20 seconds]',
    applyBrotherJimiVoice(
      statements.slice(1, -1).map((s) => s.text).join(' ')
    ),
    '',
    '[CLOSE - 20-30 seconds]',
    applyBrotherJimiVoice(statements[statements.length - 1]?.text || ''),
    '',
    '[VISUAL NOTES]',
    '- Simple background',
    '- Natural eye contact',
    '- No distracting graphics',
  ]
    .filter((s) => s.trim().length > 0)
    .join('\n');
}

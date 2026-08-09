/**
 * TEACHING ENGINE - PHASE 3 (REDESIGNED)
 * Reasoning-Based Output Generation
 *
 * Uses Trivium analysis + validation from Phase 2 to generate 7 logically coherent,
 * revelatory outputs. Each format gets unique synthesis while preserving verbatim
 * elements and maintaining premise validity.
 *
 * POST /api/teaching-engine/phase-3
 * Body: {
 *   verbatimElements: VerbatimElement[]
 *   reasoning: DeepReasoning (includes Trivium + validation)
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
  positioning?: any;
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
  console.log('[TEACHING-ENGINE] Phase 3: Reasoning-Based Output Generation');

  try {
    const body = (await request.json()) as Phase3Request;
    const { verbatimElements, reasoning, positioning } = body;

    if (!verbatimElements || verbatimElements.length === 0) {
      return NextResponse.json({ error: 'Verbatim elements required' }, { status: 400 });
    }

    if (!reasoning) {
      return NextResponse.json({ error: 'Reasoning required' }, { status: 400 });
    }

    console.log('[PHASE-3] Extracting revelation structure and validity framework...');
    const revelation = extractRevelation(verbatimElements, reasoning);
    const validityFramework = reasoning.validation;
    const triviumGuards = reasoning.triviumAnalysis;

    console.log('[PHASE-3] Generating 7 reasoning-based outputs...');
    const outputs = generateReasoningBasedOutputs(
      verbatimElements,
      revelation,
      validityFramework,
      triviumGuards,
      reasoning.holisticInsight
    );

    console.log('[PHASE-3] ✓ All formats generated');
    console.log('[PHASE-3] Validating verbatim preservation...');

    // Validate each format
    const formatValidation = [];
    const formats = Object.entries(outputs) as [string, string][];
    let passCount = 0;

    // Ensure verbatimElements is an array
    const validVerbatim = Array.isArray(verbatimElements) ? verbatimElements : [];

    for (const [format, content] of formats) {
      const validation = validateVerbatimInOutput(validVerbatim, content, format);
      formatValidation.push({
        format,
        verbatimPreserved: validation.preservedCount > 0,
        preservedCount: validation.preservedCount,
        issues: validation.issues,
      });
      if (validation.preservedCount > 0) passCount++;
    }

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
        verbatimElementsUsed: validVerbatim.length,
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
 * Extract the core revelation:
 * - What truth is being revealed
 * - What lie is being exposed
 * - The core message
 */
function extractRevelation(
  verbatimElements: VerbatimElement[],
  reasoning: DeepReasoning
): { truth: string; inverseIncentive: string; coreMessage: string } {
  // Find the strongest truth statement (high priority hooks + strong strength)
  const strongStatements = verbatimElements
    .filter(v => v.type === 'statement' && v.strength === 'high')
    .sort((a, b) => (b.hookPriority || 0) - (a.hookPriority || 0));

  const coreTruth = strongStatements[0]?.text || reasoning.holisticInsight;

  // Extract inverse incentive from hidden truths
  const inverseIncentive =
    reasoning.triviumAnalysis.hiddenTruths[0] ||
    `The world teaches one thing; God's truth is the opposite.`;

  // Core message from holistic insight
  const coreMessage = reasoning.holisticInsight;

  return {
    truth: coreTruth,
    inverseIncentive,
    coreMessage,
  };
}

/**
 * Generate reasoning-based outputs for each format
 * Each format gets unique synthesis based on:
 * - Format purpose and audience
 * - Trivium guardrails (grammar, logic, rhetoric)
 * - Validity framework (premises, logical soundness)
 * - Verbatim elements woven intelligently
 */
function generateReasoningBasedOutputs(
  verbatimElements: VerbatimElement[],
  revelation: { truth: string; inverseIncentive: string; coreMessage: string },
  validity: any,
  trivium: any,
  holisticInsight: string
): any {
  // Get hook-prioritized statements for social media
  const allStatements = verbatimElements.filter(v => v.type === 'statement');
  const hookFirst = [...allStatements].sort((a, b) => (b.hookPriority || 0) - (a.hookPriority || 0));
  const scriptureVerses = validity.scripture.supportingVerses || [];

  return {
    article: generateArticle(allStatements, revelation, validity, trivium, scriptureVerses),
    email: generateEmail(allStatements, revelation, validity, scriptureVerses),
    facebook: generateFacebook(hookFirst, revelation, validity, scriptureVerses),
    twitter: generateTwitter(hookFirst, revelation, validity, scriptureVerses),
    instagram: generateInstagram(hookFirst, revelation, validity, scriptureVerses),
    podcast: generatePodcast(allStatements, revelation, validity, holisticInsight, scriptureVerses),
    video: generateVideo(hookFirst, revelation, validity, scriptureVerses),
  };
}

/**
 * ARTICLE: Deep reasoning, logical structure, premise validation
 * Format purpose: Reader can spend time, wants depth and development
 */
function generateArticle(
  statements: VerbatimElement[],
  revelation: any,
  validity: any,
  trivium: any,
  verses: string[]
): string {
  const sections = [
    // Opening: Establish the question/revelation
    applyBrotherJimiVoice(revelation.truth),
    '',
    `## The Inversion You've Been Taught`,
    '',
    applyBrotherJimiVoice(
      `Most people believe: ${revelation.inverseIncentive.split(';')[0]} But that's the lie.`
    ),
    '',
    `## What's Actually True`,
    '',
    applyBrotherJimiVoice(revelation.coreMessage),
    '',
    // Development: Layer in supporting statements
    ...statements.slice(1, 4).map((stmt) => applyBrotherJimiVoice(stmt.text)),
    '',
    '## Why This Matters',
    '',
    applyBrotherJimiVoice(
      `The logical chain is simple: ${validity.validity.isLogicallySound ? 'This reasoning is sound.' : 'This demands careful examination.'}`
    ),
    '',
    '## Scripture Foundation',
    '',
    ...verses.slice(0, 3).map((v) => `• ${v}`),
    '',
    '## The Application',
    '',
    applyBrotherJimiVoice(
      `This isn't theory. This is lived reality. The question now is not whether this is true—it's whether you will act on it.`
    ),
  ];

  return sections.filter((s) => s.trim().length > 0).join('\n');
}

/**
 * EMAIL: Intimate, personal, relationship-focused
 * Format purpose: Reader feels personally addressed, wants connection
 */
function generateEmail(
  statements: VerbatimElement[],
  revelation: any,
  validity: any,
  verses: string[]
): string {
  const sections = [
    'Hi there,',
    '',
    applyBrotherJimiVoice('I came across something that changed how I think about this.'),
    '',
    applyBrotherJimiVoice(revelation.truth),
    '',
    applyBrotherJimiVoice(
      `Here's what struck me: Most people are taught ${revelation.inverseIncentive.split(';')[0]} But I realized that's backwards.`
    ),
    '',
    applyBrotherJimiVoice(revelation.coreMessage),
    '',
    applyBrotherJimiVoice(
      `When I stopped believing the lie and stepped into this truth, everything shifted. ${statements[1]?.text || ''}`
    ),
    '',
    `Scripture confirms this: ${verses[0] || ''}`,
    '',
    applyBrotherJimiVoice(
      'I thought you should know. This might be exactly what you need to hear right now.'
    ),
    '',
    'In truth,',
    '[Your Name]',
  ];

  return sections.filter((s) => s.trim().length > 0).join('\n');
}

/**
 * FACEBOOK: Community-oriented, hook-first for engagement
 * Format purpose: Stop the scroll, create conversation
 */
function generateFacebook(
  statements: VerbatimElement[],
  revelation: any,
  validity: any,
  verses: string[]
): string {
  const sections = [
    // Hook first (highest priority)
    statements[0]?.text || revelation.truth,
    '',
    applyBrotherJimiVoice(`The lie: ${revelation.inverseIncentive.split(';')[0]}`),
    '',
    applyBrotherJimiVoice(`The truth: ${revelation.coreMessage}`),
    '',
    ...statements.slice(1, 3).map((s) => applyBrotherJimiVoice(s.text)),
    '',
    `✝ ${verses[0] || 'Scripture supports this'}`,
    '',
    '#Truth #Revelation #Freedom #Faith',
  ];

  return sections.filter((s) => s.trim().length > 0).join('\n');
}

/**
 * TWITTER: Brevity + hooks, rapid-fire revelation
 * Format purpose: Grab attention, make memorable, drive engagement
 */
function generateTwitter(
  statements: VerbatimElement[],
  revelation: any,
  validity: any,
  verses: string[]
): string {
  const tweets = [
    // Tweet 1: Hook (question or striking statement)
    `Tweet 1:\n${statements[0]?.text || revelation.truth}`,
    // Tweet 2-4: The inversion and truth
    `Tweet 2:\nThe lie: ${revelation.inverseIncentive.split(';')[0]}`,
    `Tweet 3:\nThe truth: ${revelation.coreMessage}`,
    // Tweet 4: Supporting claim
    statements[1] ? `Tweet 4:\n${applyBrotherJimiVoice(statements[1].text)}` : null,
    // Tweet 5: Call to reflection
    `Tweet 5:\nThis changes everything when you actually believe it.`,
    // Tweet 6: Scripture
    `Tweet 6:\n${verses[0] || 'Scripture confirms the truth'}`,
  ].filter((t) => t);

  return tweets.join('\n\n');
}

/**
 * INSTAGRAM: Visual language + hooks, hashtagged
 * Format purpose: Shareable, memorable, visual + textual
 */
function generateInstagram(
  statements: VerbatimElement[],
  revelation: any,
  validity: any,
  verses: string[]
): string {
  const sections = [
    // Open with hook
    statements[0]?.text || revelation.truth,
    '',
    // The inversion
    applyBrotherJimiVoice(`Everyone's taught: ${revelation.inverseIncentive.split(';')[0]}`),
    '',
    // The truth
    applyBrotherJimiVoice(`But the real truth is: ${revelation.coreMessage}`),
    '',
    // Supporting detail
    statements[1]?.text || 'This is not theory.',
    '',
    'This is lived reality.',
    '',
    '#Faith #Truth #Revelation #Freedom #Transformed',
    '',
    verses[0] || '',
  ];

  return sections.filter((s) => s.trim().length > 0).join('\n');
}

/**
 * PODCAST: Episodic, structured, educational
 * Format purpose: Deep listening, time to think, complete arc
 */
function generatePodcast(
  statements: VerbatimElement[],
  revelation: any,
  validity: any,
  holisticInsight: string,
  verses: string[]
): string {
  const sections = [
    'EPISODE TITLE: From The Lie To The Truth',
    '',
    applyBrotherJimiVoice(
      `In this episode we examine a fundamental lie most people believe, and we ask: What does the truth actually look like?`
    ),
    '',
    `WHAT WE'LL COVER`,
    '1. The inversion everyone accepts as true',
    '2. Why this lie persists',
    '3. What the actual truth reveals',
    '4. How this changes everything',
    '',
    'CORE TEACHING',
    applyBrotherJimiVoice(revelation.coreMessage),
    '',
    'KEY INSIGHTS',
    ...statements.slice(0, 3).map((stmt) => `• ${applyBrotherJimiVoice(stmt.text)}`),
    '',
    'SCRIPTURE FOUNDATION',
    ...verses.slice(0, 3).map((v) => `• ${v}`),
    '',
    'CLOSING REFLECTION',
    applyBrotherJimiVoice(holisticInsight),
  ];

  return sections.filter((s) => s.trim().length > 0).join('\n');
}

/**
 * VIDEO: Scene direction + eye contact, revelation-focused
 * Format purpose: Personal presence, visual medium, memorable opens
 */
function generateVideo(
  statements: VerbatimElement[],
  revelation: any,
  validity: any,
  verses: string[]
): string {
  const sections = [
    '[OPEN - 0-3 seconds]',
    '[Direct eye contact, focused]',
    applyBrotherJimiVoice(statements[0]?.text || revelation.truth),
    '',
    '[BODY - 3-45 seconds]',
    applyBrotherJimiVoice(
      `Here's what most people believe: ${revelation.inverseIncentive.split(';')[0]} But that's the inversion of truth.`
    ),
    '',
    applyBrotherJimiVoice(revelation.coreMessage),
    '',
    ...statements.slice(1, 3).map((s) => applyBrotherJimiVoice(s.text)),
    '',
    '[CLOSE - 45-60 seconds]',
    '[Pause, let the weight settle]',
    applyBrotherJimiVoice(
      `The question isn't whether this is true. The question is: will you live like you believe it?`
    ),
    '',
    '[VISUAL NOTES]',
    '- Simple background (minimal distraction)',
    '- Direct eye contact throughout',
    '- Deliberate pacing (let truth breathe)',
    '- No overlays or effects',
    `- Scripture on screen: ${verses[0] || ''}`,
  ];

  return sections.filter((s) => s.trim().length > 0).join('\n');
}

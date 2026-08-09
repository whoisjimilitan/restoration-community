import { NextRequest, NextResponse } from 'next/server';
import {
  extractSentences,
  identifyCoreTruths,
  validateExtraction,
  generateHookVariations,
} from '@/lib/transcript-extraction';
import { curateForPlatform } from '@/lib/transcript-curation';

export async function POST(request: NextRequest) {
  console.log('[TRANSCRIPT-ENGINE] Extraction request received');

  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    console.log('[TRANSCRIPT-ENGINE] Extracting sentences...');
    const sentences = extractSentences(transcript);
    console.log(`[TRANSCRIPT-ENGINE] Found ${sentences.length} sentences`);

    console.log('[TRANSCRIPT-ENGINE] Identifying core truths...');
    const coreTruths = identifyCoreTruths(sentences);
    console.log(`[TRANSCRIPT-ENGINE] Found ${coreTruths.length} core truths`);

    if (coreTruths.length === 0) {
      console.log('[TRANSCRIPT-ENGINE] No irreplaceable sentences found, using strongest sentences');
      
      // Fallback: use strongest sentences as truths
      const strong = sentences.filter((s) => s.strength === 'strong' || s.strength === 'irreplaceable');
      if (strong.length === 0) {
        return NextResponse.json(
          { error: 'Could not identify core truths in transcript. Try pasting a longer teaching or check that sentences are complete.' },
          { status: 400 }
        );
      }

      // Convert strongest sentences to core truths
      const fallbackTruths = strong.slice(0, 3).map((sent, idx) => ({
        id: `truth-${idx}`,
        truth: sent.text,
        sentences: [sent, ...sentences.filter((s) => s.index > sent.index && s.index < sent.index + 5)],
        themes: ['Teaching'],
        irreplaceableLineIndex: sent.index,
      }));

      const validations = fallbackTruths.map((truth) => ({
        truthId: truth.id,
        truth: truth.truth,
        validation: validateExtraction(truth),
      }));

      const primaryTruth = fallbackTruths[0];
      const curations = {
        tiktok: curateForPlatform(primaryTruth, 'tiktok'),
        youtubeShort: curateForPlatform(primaryTruth, 'youtube-short'),
        youtubeLong: curateForPlatform(primaryTruth, 'youtube-long'),
        interview: curateForPlatform(primaryTruth, 'interview'),
        email: curateForPlatform(primaryTruth, 'email'),
      };

      const hookVariations = generateHookVariations(primaryTruth.truth);

      return NextResponse.json({
        success: true,
        summary: {
          totalSentences: sentences.length,
          totalTruths: fallbackTruths.length,
          filler: sentences.filter((s) => s.strength === 'filler').length,
        },
        coreTruths: fallbackTruths,
        validations,
        primaryTruth,
        curations,
        hookVariations,
      });
    }

    const validations = coreTruths.map((truth) => ({
      truthId: truth.id,
      truth: truth.truth,
      validation: validateExtraction(truth),
    }));

    const primaryTruth = coreTruths[0];
    const curations = {
      tiktok: curateForPlatform(primaryTruth, 'tiktok'),
      youtubeShort: curateForPlatform(primaryTruth, 'youtube-short'),
      youtubeLong: curateForPlatform(primaryTruth, 'youtube-long'),
      interview: curateForPlatform(primaryTruth, 'interview'),
      email: curateForPlatform(primaryTruth, 'email'),
    };

    const hookVariations = generateHookVariations(primaryTruth.truth);

    console.log('[TRANSCRIPT-ENGINE] Extraction complete');

    return NextResponse.json({
      success: true,
      summary: {
        totalSentences: sentences.length,
        totalTruths: coreTruths.length,
        filler: sentences.filter((s) => s.strength === 'filler').length,
      },
      coreTruths,
      validations,
      primaryTruth,
      curations,
      hookVariations,
    });
  } catch (error) {
    console.error('[TRANSCRIPT-ENGINE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}

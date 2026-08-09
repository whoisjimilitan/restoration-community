/**
 * TEACHING ENGINE - PHASE 1
 * Input + Verbatim Extraction + Structure Analysis
 *
 * POST /api/teaching-engine/phase-1
 * Body: { transcript?: string; url?: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import type { VerbatimElement } from '@/lib/types/teaching-process';
import { acceptTranscript, extractFromUrl, preprocessContent } from '@/lib/content-input';
import { extractVerbatimElements } from '@/lib/verbatim-extractor';
import { exhumeTeachingStructure } from '@/lib/teaching-exhumer';

export const dynamic = 'force-dynamic';

interface Phase1Request {
  transcript?: string;
  url?: string;
}

interface Phase1Response {
  success: boolean;
  input: {
    type: 'url' | 'transcript';
    source?: string;
  };
  verbatimElements: VerbatimElement[];
  structure: {
    themes: any[];
    gapsBetweenStatements: any[];
    [key: string]: any;
  };
  stats: {
    contentLength: number;
    verbatimCount: number;
    themesFound: number;
    gapsIdentified: number;
  };
}

export async function POST(request: NextRequest) {
  console.log('[TEACHING-ENGINE] Phase 1: Input + Extraction + Structure');

  try {
    const body = (await request.json()) as Phase1Request;
    const { transcript, url } = body;

    // Step 1: Get content
    console.log('[PHASE-1] Step 1: Accepting input...');
    let contentSource;

    if (url && url.trim().length > 0) {
      contentSource = await extractFromUrl(url);
    } else if (transcript && transcript.trim().length > 0) {
      contentSource = acceptTranscript(transcript);
    } else {
      return NextResponse.json(
        { error: 'Provide either transcript or url' },
        { status: 400 }
      );
    }

    // Step 2: Preprocess content
    console.log('[PHASE-1] Step 2: Preprocessing...');
    const cleanedContent = preprocessContent(contentSource.raw);

    // Step 3: Extract verbatim elements
    console.log('[PHASE-1] Step 3: Extracting ring-fenced elements...');
    const verbatimElements = extractVerbatimElements(cleanedContent);

    // Step 4: Analyze structure
    console.log('[PHASE-1] Step 4: Analyzing structure...');
    const structure = exhumeTeachingStructure(cleanedContent, verbatimElements);

    console.log('[PHASE-1] ✓ Phase 1 complete');

    const response: Phase1Response = {
      success: true,
      input: {
        type: contentSource.type,
        source: contentSource.source,
      },
      verbatimElements,
      structure,
      stats: {
        contentLength: cleanedContent.length,
        verbatimCount: verbatimElements.length,
        themesFound: structure.themes.length,
        gapsIdentified: structure.gapsBetweenStatements.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[PHASE-1] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Processing failed',
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  console.log('[VOICE-ENGINE] Saving wisdom piece...');

  try {
    const { transcriptId, wisdomPiece } = await request.json();

    if (!transcriptId || !wisdomPiece) {
      return NextResponse.json(
        { error: 'Missing transcriptId or wisdomPiece' },
        { status: 400 }
      );
    }

    // Save wisdom piece
    const saved = await prisma.wisdomPiece.create({
      data: {
        transcriptId,
        exact_quote: wisdomPiece.exact_quote,
        claim: wisdomPiece.claim,
        premises: wisdomPiece.premises || [],
        conclusion: wisdomPiece.conclusion,
        validity_structure: wisdomPiece.validity_assessment?.structure,
        validity_logical_flow: wisdomPiece.validity_assessment?.logical_flow,
        validity_structure_valid: wisdomPiece.validity_assessment?.structure_valid ?? true,
        premise_assessments_json: JSON.stringify(wisdomPiece.premise_assessments || []),
        presentation_analytical: wisdomPiece.presentation?.analytical_viewer || '',
        presentation_resistant: wisdomPiece.presentation?.resistant_viewer || '',
        presentation_accepting: wisdomPiece.presentation?.accepting_viewer || '',
        strongest_case: wisdomPiece.strongest_case,
        reflective_question: wisdomPiece.reflective_question,
        reflective_statement: wisdomPiece.reflective_statement,
        status: 'draft',
      },
    });

    console.log('[VOICE-ENGINE] Wisdom piece saved:', saved.id);

    return NextResponse.json({
      success: true,
      wisdomPieceId: saved.id,
      message: 'Wisdom piece saved',
    });
  } catch (error) {
    console.error('[VOICE-ENGINE] Error saving wisdom piece:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save wisdom piece' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

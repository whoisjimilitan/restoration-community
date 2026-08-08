import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  console.log('[VOICE-ENGINE] Loading wisdom pieces...');

  try {
    const { searchParams } = new URL(request.url);
    const transcriptId = searchParams.get('transcriptId');

    if (!transcriptId) {
      return NextResponse.json(
        { error: 'Missing transcriptId' },
        { status: 400 }
      );
    }

    // Load wisdom pieces for this transcript
    const pieces = await prisma.wisdomPiece.findMany({
      where: {
        transcriptId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`[VOICE-ENGINE] Loaded ${pieces.length} wisdom pieces for transcript ${transcriptId}`);

    // Parse the JSON fields
    const formattedPieces = pieces.map(piece => ({
      ...piece,
      premise_assessments: JSON.parse(piece.premise_assessments_json),
    }));

    return NextResponse.json({
      success: true,
      pieces: formattedPieces,
      count: pieces.length,
    });
  } catch (error) {
    console.error('[VOICE-ENGINE] Error loading wisdom pieces:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load wisdom pieces' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

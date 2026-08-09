import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  console.log('[VOICE-ENGINE] Saving transcript...');

  try {
    const { transcript, title, mainRevelation } = await request.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript content is required' },
        { status: 400 }
      );
    }

    // Save transcript
    const saved = await prisma.voiceTranscript.create({
      data: {
        transcript,
        title: title || 'Untitled Teaching',
        mainRevelation: mainRevelation || '',
      },
    });

    console.log('[VOICE-ENGINE] Transcript saved:', saved.id);

    return NextResponse.json({
      success: true,
      transcriptId: saved.id,
      message: 'Transcript saved',
    });
  } catch (error) {
    console.error('[VOICE-ENGINE] Error saving transcript:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save transcript' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { runTeachingPipeline } from '@/lib/teaching-process-orchestrator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

interface ProcessRequest {
  transcript: string;
  sermonTitle: string;
}

export async function POST(request: NextRequest) {
  console.log('[PROCESS-API] Received sermon upload');

  try {
    const body = (await request.json()) as ProcessRequest;
    const { transcript, sermonTitle } = body;

    if (!transcript || transcript.trim().length < 100) {
      return NextResponse.json(
        { error: 'Transcript too short (minimum 100 characters)' },
        { status: 400 }
      );
    }

    if (!sermonTitle || sermonTitle.trim().length === 0) {
      return NextResponse.json(
        { error: 'Sermon title required' },
        { status: 400 }
      );
    }

    console.log('[PROCESS-API] Running pipeline for:', sermonTitle);
    const process = await runTeachingPipeline(transcript, sermonTitle);

    return NextResponse.json({
      success: true,
      process,
    });
  } catch (error) {
    console.error('[PROCESS-API] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Processing failed',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log('[PROCESS-API] Fetching saved processes');

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const process = await prisma.teachingProcess.findUnique({
        where: { id },
        include: {
          scheduledPosts: true,
          publishedPosts: true,
        },
      });

      if (!process) {
        return NextResponse.json(
          { error: 'Process not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, process });
    } else {
      const limit = 20;
      const offset = parseInt(searchParams.get('offset') || '0');

      const processes = await prisma.teachingProcess.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          scheduledPosts: true,
          publishedPosts: true,
        },
      });

      return NextResponse.json({ success: true, processes, limit, offset });
    }
  } catch (error) {
    console.error('[PROCESS-API] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch',
      },
      { status: 500 }
    );
  }
}

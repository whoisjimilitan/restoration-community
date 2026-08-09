import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

interface ScheduleRequest {
  processId: string;
  platform: string;
  format: string;
  content: string;
  hashtags?: string[];
  scheduledFor: string;
}

export async function POST(request: NextRequest) {
  console.log('[SCHEDULE-API] Received schedule request');

  try {
    const body = (await request.json()) as ScheduleRequest;
    const {
      processId,
      platform,
      format,
      content,
      hashtags,
      scheduledFor,
    } = body;

    const scheduledDate = new Date(scheduledFor);
    if (scheduledDate < new Date()) {
      return NextResponse.json(
        { error: 'Cannot schedule for past date' },
        { status: 400 }
      );
    }

    const post = await prisma.scheduledPost.create({
      data: {
        processId,
        platform,
        format,
        content,
        hashtags: hashtags?.join(' '),
        scheduledTime: scheduledDate,
        status: 'pending',
      },
    });

    console.log('[SCHEDULE-API] ✓ Post scheduled:', post.id);

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('[SCHEDULE-API] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Scheduling failed',
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('[PRAYER] POST /api/prayer/request');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[PRAYER] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { content } = await request.json();

    if (!content?.trim()) {
      console.log('[PRAYER] Missing prayer request content');
      return NextResponse.json(
        { error: 'Prayer request content is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('[PRAYER] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const prayerRequest = await prisma.prayerRequest.create({
      data: {
        participantId: user.id,
        content: content.trim(),
        status: 'SUBMITTED',
      },
    });

    console.log(
      `[PRAYER] Prayer request created: ${prayerRequest.id} (participant: ${user.id})`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Your prayer request has been received. Brother Jimi and the prayer ministry will pray with you.',
        requestId: prayerRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[PRAYER] Error creating prayer request:', error);
    return NextResponse.json(
      { error: 'Failed to submit prayer request' },
      { status: 500 }
    );
  }
}

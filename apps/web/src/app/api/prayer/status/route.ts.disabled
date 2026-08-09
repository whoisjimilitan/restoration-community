import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('[PRAYER] GET /api/prayer/status');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[PRAYER] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    // CRITICAL: Privacy enforcement at API layer
    // Participants can ONLY see their own prayer requests
    const prayerRequests = await prisma.prayerRequest.findMany({
      where: {
        participantId: user.id,
      },
      select: {
        id: true,
        content: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(
      `[PRAYER] Prayer status loaded for user ${user.id}: ${prayerRequests.length} requests`
    );

    return NextResponse.json(
      {
        requests: prayerRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[PRAYER] Error fetching prayer status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prayer status' },
      { status: 500 }
    );
  }
}

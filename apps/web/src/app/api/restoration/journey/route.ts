import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('[RESTORATION] GET /api/restoration/journey');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[RESTORATION] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('[RESTORATION] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userRestoration = await prisma.userRestoration.findUnique({
      where: { userId: user.id },
      include: {
        currentStage: { include: { content: true } },
        transitions: {
          include: { fromStage: true, toStage: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        reflections: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!userRestoration) {
      console.log('[RESTORATION] Journey not found');
      return NextResponse.json(
        { error: 'Journey not found' },
        { status: 404 }
      );
    }

    const progressPercent =
      ((userRestoration.currentStage.sequence - 1) / 6) * 100;

    console.log(
      `[RESTORATION] Journey loaded for user ${user.id} at stage ${userRestoration.currentStage.sequence}`
    );

    return NextResponse.json({
      userId: user.id,
      currentStage: userRestoration.currentStage,
      currentStageNumber: userRestoration.currentStage.sequence,
      progressPercent: Math.round(progressPercent),
      totalStages: 7,
      createdAt: userRestoration.createdAt,
      updatedAt: userRestoration.updatedAt,
      recentTransitions: userRestoration.transitions,
      recentReflections: userRestoration.reflections,
    });
  } catch (error) {
    console.error('[RESTORATION] Error fetching journey:', error);
    return NextResponse.json(
      { error: 'Failed to fetch journey' },
      { status: 500 }
    );
  }
}

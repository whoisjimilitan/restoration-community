import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('[RESTORATION] POST /api/restoration/reflect');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[RESTORATION] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { reflection } = await request.json();

    if (!reflection?.trim()) {
      console.log('[RESTORATION] Missing reflection text');
      return NextResponse.json(
        { error: 'Reflection text is required' },
        { status: 400 }
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
    });

    if (!userRestoration) {
      console.log('[RESTORATION] Journey not found');
      return NextResponse.json(
        { error: 'Journey not found' },
        { status: 404 }
      );
    }

    const stageReflection = await prisma.stageReflection.create({
      data: {
        userRestorationId: userRestoration.id,
        stageId: userRestoration.currentStageId,
        reflection,
      },
      include: { stage: true },
    });

    console.log(
      `[RESTORATION] Reflection created for stage ${userRestoration.currentStageId}`
    );

    return NextResponse.json(
      {
        id: stageReflection.id,
        stageId: stageReflection.stageId,
        stageName: stageReflection.stage.name,
        reflection: stageReflection.reflection,
        createdAt: stageReflection.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[RESTORATION] Error creating reflection:', error);
    return NextResponse.json(
      { error: 'Failed to create reflection' },
      { status: 500 }
    );
  }
}

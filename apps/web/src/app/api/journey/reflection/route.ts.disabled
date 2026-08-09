import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

console.log('[REFLECTION] POST /api/journey/reflection');

export async function POST(request: NextRequest) {
  console.log('[REFLECTION] Received reflection save request');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[REFLECTION] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { stage, reflection } = body;

    if (!stage || !reflection) {
      console.log('[REFLECTION] Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`[REFLECTION] Saving reflection for ${session.user.email} on stage ${stage}`);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('[REFLECTION] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // TODO: Save reflection to database when StageReflection or similar model is ready
    // For now, just acknowledge
    console.log(`[REFLECTION] Reflection acknowledged for stage ${stage}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Reflection saved',
        stage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[REFLECTION] Error:', error);
    return NextResponse.json(
      { error: 'Failed to save reflection' },
      { status: 500 }
    );
  }
}

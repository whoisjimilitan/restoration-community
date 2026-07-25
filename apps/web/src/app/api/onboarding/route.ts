import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('[ONBOARDING] POST /api/onboarding');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[ONBOARDING] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { displayName, covenantVersion } = await request.json();

    if (!displayName?.trim()) {
      console.log('[ONBOARDING] Missing displayName');
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      );
    }

    if (!covenantVersion) {
      console.log('[ONBOARDING] Missing covenantVersion');
      return NextResponse.json(
        { error: 'Covenant version required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true, userRestoration: true },
    });

    if (!user) {
      console.log('[ONBOARDING] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get starting stage (stage 1 = Truth)
    const startingStage = await prisma.restorationStage.findUnique({
      where: { sequence: 1 },
    });

    if (!startingStage) {
      console.log('[ONBOARDING] Starting stage not found');
      return NextResponse.json(
        { error: 'Restoration journey setup error' },
        { status: 500 }
      );
    }

    // Create profile
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        displayName,
        covenantAccepted: true,
        covenantAcceptedAt: new Date(),
      },
      update: {
        displayName,
        covenantAccepted: true,
        covenantAcceptedAt: new Date(),
      },
    });

    // Initialize restoration journey if not already created
    let userRestoration = user.userRestoration;
    if (!userRestoration) {
      userRestoration = await prisma.userRestoration.create({
        data: {
          userId: user.id,
          currentStageId: startingStage.id,
        },
      });
      console.log('[ONBOARDING] Restoration journey created, starting at stage:', startingStage.name);
    }

    // Update user: change role to PARTICIPANT and mark onboarding complete
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        role: 'PARTICIPANT',
        onboardingCompleted: true,
      },
    });

    console.log('[ONBOARDING] Success for user:', user.id);
    console.log('[ONBOARDING] Covenant accepted - Version:', covenantVersion);
    console.log('[ONBOARDING] Timestamp:', new Date().toISOString());
    console.log('[ONBOARDING] User role changed to PARTICIPANT');

    return NextResponse.json(
      {
        userId: updatedUser.id,
        profileId: profile.id,
        displayName: profile.displayName,
        journey: {
          stage: startingStage.name,
          stageSequence: startingStage.sequence,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ONBOARDING] Error:', error);
    return NextResponse.json(
      { error: 'Onboarding failed' },
      { status: 500 }
    );
  }
}

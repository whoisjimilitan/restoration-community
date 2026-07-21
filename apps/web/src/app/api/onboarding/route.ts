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

    const { displayName, preferredName, countryRegion, timeZone, bio, covenantAccepted } =
      await request.json();

    if (!displayName?.trim()) {
      console.log('[ONBOARDING] Missing displayName');
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      );
    }

    if (!covenantAccepted) {
      console.log('[ONBOARDING] Covenant not accepted');
      return NextResponse.json(
        { error: 'You must accept the Community Covenant' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('[ONBOARDING] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create or update profile
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        displayName,
        preferredName: preferredName || null,
        countryRegion: countryRegion || null,
        timeZone: timeZone || null,
        bio: bio || null,
        covenantAccepted: true,
        covenantAcceptedAt: new Date(),
      },
      update: {
        displayName,
        preferredName: preferredName || null,
        countryRegion: countryRegion || null,
        timeZone: timeZone || null,
        bio: bio || null,
        covenantAccepted: true,
        covenantAcceptedAt: new Date(),
      },
    });

    // Mark onboarding as completed
    await prisma.user.update({
      where: { id: user.id },
      data: { onboardingCompleted: true },
    });

    console.log('[ONBOARDING] Success for user:', user.id);

    return NextResponse.json(
      {
        id: profile.id,
        userId: profile.userId,
        displayName: profile.displayName,
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

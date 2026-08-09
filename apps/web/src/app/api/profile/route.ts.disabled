import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('[PROFILE] GET /api/profile');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[PROFILE] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      console.log('[PROFILE] Profile not found');
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    console.log('[PROFILE] Returning profile');

    return NextResponse.json({
      id: user.profile.id,
      displayName: user.profile.displayName,
      preferredName: user.profile.preferredName,
      countryRegion: user.profile.countryRegion,
      timeZone: user.profile.timeZone,
      bio: user.profile.bio,
    });
  } catch (error) {
    console.error('[PROFILE] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  console.log('[PROFILE] PUT /api/profile');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[PROFILE] Unauthorized - no session');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { displayName, preferredName, countryRegion, timeZone, bio } =
      await request.json();

    if (!displayName?.trim()) {
      console.log('[PROFILE] Missing displayName');
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('[PROFILE] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const profile = await prisma.profile.update({
      where: { userId: user.id },
      data: {
        displayName,
        preferredName: preferredName || null,
        countryRegion: countryRegion || null,
        timeZone: timeZone || null,
        bio: bio || null,
      },
    });

    console.log('[PROFILE] Updated');

    return NextResponse.json({
      id: profile.id,
      displayName: profile.displayName,
      preferredName: profile.preferredName,
      countryRegion: profile.countryRegion,
      timeZone: profile.timeZone,
      bio: profile.bio,
    });
  } catch (error) {
    console.error('[PROFILE] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

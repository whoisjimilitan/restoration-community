import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('[ATTENDANCE] Register endpoint hit');

  try {
    const body = await request.json();
    const { name, email, phone } = body;

    console.log(`[ATTENDANCE] Registering: ${name} (${email})`);

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: '', // placeholder, actual password would be set during proper auth
        },
      });
      console.log(`[ATTENDANCE] Created new user: ${user.id}`);
    } else {
      console.log(`[ATTENDANCE] Found existing user: ${user.id}`);
    }

    // Store phone in profile or as metadata if needed
    // For now, just track that we received it
    console.log(`[ATTENDANCE] Phone received: ${phone}`);

    // Find Cohort 1 (August 8 - September 19, 2026)
    let cohort = await prisma.cohort.findFirst({
      where: {
        name: 'Cohort 1',
      },
    });

    if (!cohort) {
      cohort = await prisma.cohort.create({
        data: {
          name: 'Cohort 1',
          description: 'First cohort - August 8 to September 19, 2026',
          startDate: new Date('2026-08-08'),
          endDate: new Date('2026-09-19'),
          targetSize: 15,
          status: 'active',
        },
      });
      console.log(`[ATTENDANCE] Created Cohort 1: ${cohort.id}`);
    }

    // Get Truth stage (stage 1)
    const truthStage = await prisma.restorationStage.findFirst({
      where: { sequence: 1 },
    });

    if (!truthStage) {
      console.error('[ATTENDANCE] Truth stage not found');
      return NextResponse.json(
        { error: 'Truth stage not found in database' },
        { status: 500 }
      );
    }

    // Check if user already has a UserRestoration record
    let userRestoration = await prisma.userRestoration.findUnique({
      where: { userId: user.id },
    });

    if (!userRestoration) {
      userRestoration = await prisma.userRestoration.create({
        data: {
          userId: user.id,
          currentStageId: truthStage.id,
          cohortId: cohort.id,
        },
      });
      console.log(`[ATTENDANCE] UserRestoration created: ${userRestoration.id}`);
    } else if (!userRestoration.cohortId) {
      // Update existing restoration record with cohort
      userRestoration = await prisma.userRestoration.update({
        where: { userId: user.id },
        data: { cohortId: cohort.id },
      });
      console.log(`[ATTENDANCE] UserRestoration updated with cohort`);
    } else {
      console.log(`[ATTENDANCE] User already registered for cohort`);
      return NextResponse.json(
        { message: 'Already registered for this cohort' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Registration successful', restorationId: userRestoration.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[ATTENDANCE] Error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

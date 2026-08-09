import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * POST /api/onboarding/complete-signup
 * Complete signup: create account, initialize journey, link to entry
 */
export async function POST(request: NextRequest) {
  console.log('[ONBOARD-COMPLETE] Signup completion request');

  try {
    const data = await request.json();

    // Validate required fields
    if (!data.token || !data.email || !data.password || !data.firstName || !data.lastName) {
      console.log('[ONBOARD-COMPLETE] Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate token
    const signupToken = await prisma.oneTimeSignupToken.findUnique({
      where: { token: data.token },
      include: { entryRequest: true }
    });

    if (!signupToken) {
      console.log('[ONBOARD-COMPLETE] Token not found');
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    if (signupToken.usedAt) {
      console.log('[ONBOARD-COMPLETE] Token already used');
      return NextResponse.json({ error: 'Token already used' }, { status: 400 });
    }

    if (signupToken.expiresAt < new Date()) {
      console.log('[ONBOARD-COMPLETE] Token expired');
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });
    }

    // Check email doesn't already exist
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      console.log('[ONBOARD-COMPLETE] Email already exists');
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role: 'PARTICIPANT',
        emailVerified: new Date(),
        profile: {
          create: {
            displayName: `${data.firstName} ${data.lastName}`,
            covenantAccepted: data.covenantAccepted || false,
            covenantAcceptedAt: data.covenantAccepted ? new Date() : null
          }
        }
      }
    });

    console.log(`[ONBOARD-COMPLETE] User created: ${newUser.id}`);

    // Initialize restoration journey at Stage 1 (Truth)
    const truthStage = await prisma.restorationStage.findUnique({
      where: { sequence: 1 }
    });

    if (!truthStage) {
      throw new Error('Stage 1 (Truth) not found in database');
    }

    const userRestoration = await prisma.userRestoration.create({
      data: {
        userId: newUser.id,
        currentStageId: truthStage.id
      }
    });

    console.log(`[ONBOARD-COMPLETE] User restoration initialized: ${userRestoration.id}, Stage: ${truthStage.name}`);

    // Create first reflection entry
    await prisma.stageReflection.create({
      data: {
        userRestorationId: userRestoration.id,
        stageId: truthStage.id,
        reflection: 'Welcome to the Truth stage. This is the beginning of your restoration journey.'
      }
    });

    // Mark token as used and link to user
    await prisma.oneTimeSignupToken.update({
      where: { id: signupToken.id },
      data: {
        usedAt: new Date(),
        createdUserId: newUser.id
      }
    });

    // Update entry to show conversion
    await prisma.entryPrayerRequest.update({
      where: { id: signupToken.entryRequestId },
      data: {
        convertedToUserId: newUser.id,
        convertedAt: new Date(),
        status: 'COMPLETED'
      }
    });

    console.log(`[ONBOARD-COMPLETE] Entry converted: ${signupToken.entryRequestId} → User: ${newUser.id}`);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      },
      journey: {
        stage: truthStage.name,
        sequence: truthStage.sequence
      },
      message: `Welcome ${newUser.firstName}! You are now in Stage 1: ${truthStage.name}`
    });
  } catch (error) {
    console.error('[ONBOARD-COMPLETE] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/intake/[id]/generate-token
 * Generate one-time signup token for seeker after "YES" decision
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`[ONBOARD] Generating signup token for entry ${params.id}`);

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[ONBOARD] Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'ADMIN') {
      console.log('[ONBOARD] Forbidden');
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Verify entry exists and decision is YES
    const entry = await prisma.entryPrayerRequest.findUnique({
      where: { id: params.id }
    });

    if (!entry) {
      console.log('[ONBOARD] Entry not found');
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    if (!entry.decisionMade || entry.decision !== 'yes') {
      console.log('[ONBOARD] Entry decision must be YES');
      return NextResponse.json(
        { error: 'Entry must have decision=yes before generating token' },
        { status: 400 }
      );
    }

    // Check if token already exists
    const existingToken = await prisma.oneTimeSignupToken.findUnique({
      where: { entryRequestId: params.id }
    });

    if (existingToken && !existingToken.usedAt && existingToken.expiresAt > new Date()) {
      console.log('[ONBOARD] Token already exists and is valid');
      return NextResponse.json({
        success: true,
        token: existingToken.token,
        expiresAt: existingToken.expiresAt,
        signupUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/onboarding/signup?token=${existingToken.token}`
      });
    }

    // Create new token (expires in 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const signupToken = await prisma.oneTimeSignupToken.create({
      data: {
        entryRequestId: params.id,
        expiresAt
      }
    });

    const signupUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/onboarding/signup?token=${signupToken.token}`;

    console.log(`[ONBOARD] Token generated: ${signupToken.id} (expires: ${expiresAt})`);

    return NextResponse.json({
      success: true,
      token: signupToken.token,
      expiresAt: signupToken.expiresAt,
      signupUrl
    });
  } catch (error: any) {
    console.error('[ONBOARD] Error generating token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

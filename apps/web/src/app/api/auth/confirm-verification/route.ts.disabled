import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('[AUTH] POST /api/auth/confirm-verification');

  try {
    const { token } = await request.json();

    if (!token) {
      console.log('[AUTH] Verification token not provided');
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find the token
    const verificationRecord = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!verificationRecord) {
      console.log('[AUTH] Verification token not found:', token);
      return NextResponse.json(
        { error: 'Verification link is invalid or has expired' },
        { status: 404 }
      );
    }

    // Check if token has expired
    if (new Date() > verificationRecord.expiresAt) {
      console.log('[AUTH] Verification token expired:', token);
      await prisma.emailVerificationToken.delete({
        where: { token },
      });
      return NextResponse.json(
        { error: 'Verification link has expired. Please request a new one.' },
        { status: 410 }
      );
    }

    // Update user to mark email as verified
    const user = await prisma.user.update({
      where: { email: verificationRecord.email },
      data: { emailVerified: new Date() },
    });

    console.log(`[AUTH] Email verified for user: ${user.id}, email: ${user.email}`);

    // Delete the token
    await prisma.emailVerificationToken.delete({
      where: { token },
    });

    return NextResponse.json(
      {
        message: 'Email verified successfully',
        email: user.email,
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[AUTH] Email verification error:', error);
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    );
  }
}

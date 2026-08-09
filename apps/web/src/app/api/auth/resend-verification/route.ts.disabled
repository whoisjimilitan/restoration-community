import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email';

const VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: NextRequest) {
  console.log('[AUTH] POST /api/auth/resend-verification');

  try {
    const { email } = await request.json();

    if (!email) {
      console.log('[AUTH] Email not provided');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`[AUTH] User not found: ${email}`);
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      console.log(`[AUTH] Email already verified: ${email}`);
      return NextResponse.json(
        { error: 'This email address has already been verified' },
        { status: 400 }
      );
    }

    // Delete old tokens for this email
    await prisma.emailVerificationToken.deleteMany({
      where: { email },
    });

    // Generate new token
    const verificationToken = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY);

    await prisma.emailVerificationToken.create({
      data: {
        email,
        token: verificationToken,
        expiresAt,
      },
    });

    console.log(`[AUTH] Verification token regenerated for: ${email}`);

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken);
    if (!emailResult.success) {
      console.error(`[AUTH] Failed to send verification email to ${email}:`, emailResult.error);
      // Don't fail the API response - token was created successfully
    }

    console.log(`[AUTH] Verification email sent to: ${email}`);

    return NextResponse.json(
      {
        message: 'Verification email sent',
        email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[AUTH] Resend verification error:', error);
    return NextResponse.json(
      { error: 'Failed to resend verification email' },
      { status: 500 }
    );
  }
}

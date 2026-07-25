import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Handle email verification token from email link
 * GET /auth/verify-email-token?token=xxx
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Verification token is required' },
      { status: 400 }
    );
  }

  console.log('[AUTH] Verifying email token from email link');

  try {
    // Find the token
    const verificationRecord = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!verificationRecord) {
      console.log('[AUTH] Verification token not found:', token);
      return NextResponse.redirect(
        new URL('/auth/verify-email-error?reason=invalid', request.url)
      );
    }

    // Check if token has expired
    if (new Date() > verificationRecord.expiresAt) {
      console.log('[AUTH] Verification token expired:', token);
      await prisma.emailVerificationToken.delete({
        where: { token },
      });
      return NextResponse.redirect(
        new URL('/auth/verify-email-error?reason=expired', request.url)
      );
    }

    // Update user to mark email as verified
    await prisma.user.update({
      where: { email: verificationRecord.email },
      data: { emailVerified: new Date() },
    });

    console.log(
      `[AUTH] Email verified for: ${verificationRecord.email}`
    );

    // Delete the token
    await prisma.emailVerificationToken.delete({
      where: { token },
    });

    // Redirect to success page
    return NextResponse.redirect(
      new URL('/auth/verify-email-success', request.url)
    );
  } catch (error) {
    console.error('[AUTH] Email verification error:', error);
    return NextResponse.redirect(
      new URL('/auth/verify-email-error?reason=error', request.url)
    );
  }
}

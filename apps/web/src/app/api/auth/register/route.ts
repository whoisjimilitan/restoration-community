import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: NextRequest) {
  console.log('[AUTH] POST /api/auth/register');

  try {
    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      console.log('[AUTH] Missing required fields');
      return NextResponse.json(
        { error: 'First name, last name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 12) {
      console.log('[AUTH] Password too short');
      return NextResponse.json(
        { error: 'Password must be at least 12 characters' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`[AUTH] Account already exists: ${email}`);
      return NextResponse.json(
        { error: 'An account already exists with this email address' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'VISITOR',
      },
    });

    console.log(`[AUTH] Account created: ${user.id}, email: ${email}`);

    const verificationToken = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY);

    await prisma.emailVerificationToken.create({
      data: {
        email,
        token: verificationToken,
        expiresAt,
      },
    });

    console.log(`[AUTH] Verification token generated for: ${email}`);

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        message: 'Account created. Check your email to verify.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[AUTH] Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

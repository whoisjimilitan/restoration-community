import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  console.log('[AUTH] POST /api/auth/register');

  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      console.log('[AUTH] Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`[AUTH] User already exists: ${email}`);
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerified: new Date(), // For development: auto-verify
        profile: {
          create: {
            displayName: name || email.split('@')[0],
          },
        },
      },
      include: {
        profile: true,
      },
    });

    console.log(`[AUTH] User registered: ${user.id}`);

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        profile: user.profile,
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

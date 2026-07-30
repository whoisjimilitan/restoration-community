import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, stage, quote, story } = body;

    if (!name || !role || !stage || !quote || !story) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`[ADMIN] Creating testimony: ${name}`);

    const testimony = await prisma.testimony.create({
      data: {
        name,
        role,
        stage: parseInt(stage),
        quote,
        story,
      },
      include: {
        heroImage: true,
        proofImages: true,
      },
    });

    console.log(`[ADMIN] Testimony created: ${testimony.id}`);
    return NextResponse.json(testimony, { status: 201 });
  } catch (error) {
    console.error('[ADMIN] Error creating testimony:', error);
    return NextResponse.json(
      { error: 'Failed to create testimony' },
      { status: 500 }
    );
  }
}

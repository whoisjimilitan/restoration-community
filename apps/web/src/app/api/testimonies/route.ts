import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const testimonies = await prisma.testimony.findMany({
      include: {
        heroImage: true,
        proofImages: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      testimonies,
      count: testimonies.length,
    });
  } catch (error) {
    console.error('[TESTIMONIES] Error fetching:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonies' },
      { status: 500 }
    );
  }
}

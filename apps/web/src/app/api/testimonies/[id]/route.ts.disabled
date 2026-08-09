import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log(`[TESTIMONIES] Fetching testimony: ${id}`);

    const testimony = await prisma.testimony.findUnique({
      where: { id },
      include: {
        heroImage: true,
        proofImages: true,
      },
    });

    if (!testimony) {
      console.log(`[TESTIMONIES] Not found: ${id}`);
      return NextResponse.json(
        { error: 'Testimony not found' },
        { status: 404 }
      );
    }

    console.log(`[TESTIMONIES] Found testimony: ${testimony.name}`);
    return NextResponse.json(testimony);
  } catch (error) {
    console.error('[TESTIMONIES] Error fetching single:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimony' },
      { status: 500 }
    );
  }
}

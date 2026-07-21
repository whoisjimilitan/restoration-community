import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('[RESTORATION] GET /api/restoration/stages');

  try {
    const stages = await prisma.restorationStage.findMany({
      include: { content: true },
      orderBy: { sequence: 'asc' },
    });

    console.log(`[RESTORATION] Returning ${stages.length} stages`);

    return NextResponse.json(stages);
  } catch (error) {
    console.error('[RESTORATION] Error fetching stages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stages' },
      { status: 500 }
    );
  }
}

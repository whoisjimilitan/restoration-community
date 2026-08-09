import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  console.log('[RESOURCES] GET /api/resources');

  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const categoryId = searchParams.get('categoryId');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {
      isPublished: true,
      isRetired: false,
    };

    if (type) {
      where.type = type;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const resources = await prisma.resource.findMany({
      where,
      include: {
        category: true,
        stageResources: {
          include: { stage: true },
        },
      },
      take: limit,
      orderBy: [{ createdAt: 'desc' }],
    });

    console.log(`[RESOURCES] Found ${resources.length} resources`);

    return NextResponse.json(resources);
  } catch (error) {
    console.error('[RESOURCES] Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

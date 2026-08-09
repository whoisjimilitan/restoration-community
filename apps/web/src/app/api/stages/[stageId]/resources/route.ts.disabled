import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: { stageId: string } }
) {
  console.log(`[RESOURCES] GET /api/stages/${params.stageId}/resources`);

  try {
    const stageId = parseInt(params.stageId);

    if (isNaN(stageId)) {
      return NextResponse.json(
        { error: 'Invalid stage ID' },
        { status: 400 }
      );
    }

    const stage = await prisma.restorationStage.findUnique({
      where: { id: stageId },
      include: {
        stageResources: {
          where: {
            resource: {
              isPublished: true,
              isRetired: false,
            },
          },
          include: {
            resource: {
              include: { category: true },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!stage) {
      console.log(`[RESOURCES] Stage ${stageId} not found`);
      return NextResponse.json(
        { error: 'Stage not found' },
        { status: 404 }
      );
    }

    // Transform the response to flatten the resource data
    const resources = stage.stageResources.map((sr: any) => ({

      id: sr.resource.id,
      title: sr.resource.title,
      slug: sr.resource.slug,
      description: sr.resource.description,
      type: sr.resource.type,
      content: sr.resource.content,
      scriptureReference: sr.resource.scriptureReference,
      url: sr.resource.url,
      videoUrl: sr.resource.videoUrl,
      videoDuration: sr.resource.videoDuration,
      author: sr.resource.author,
      category: sr.resource.category,
      isRequired: sr.isRequired,
      order: sr.order,
      createdAt: sr.resource.createdAt,
    }));

    console.log(
      `[RESOURCES] Returning ${resources.length} resources for stage ${stageId}`
    );

    return NextResponse.json(resources);
  } catch (error) {
    console.error('[RESOURCES] Error fetching stage resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stage resources' },
      { status: 500 }
    );
  }
}

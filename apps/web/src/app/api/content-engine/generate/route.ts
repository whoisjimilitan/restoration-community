import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { expandStatement } from '@/lib/narrative-expansion';
import { identifyElements } from '@/lib/element-identifier';
import { applyFrame, type Frame } from '@/lib/frame-applier';
import { generateAllFormats } from '@/lib/format-generators';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    console.log('[GENERATE] Unauthorized request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id || session.user?.email;

  console.log('[GENERATE] Content generation request started');

  try {
    const { statement, context, frame = 'enlighten' } = await request.json();

    if (!statement) {
      return NextResponse.json(
        { error: 'Statement is required' },
        { status: 400 }
      );
    }

    // Step 1: Expand statement into narrative
    console.log('[GENERATE] Step 1: Expanding statement');
    const { narrative } = await expandStatement({ statement, context });

    // Step 2: Identify elements
    console.log('[GENERATE] Step 2: Identifying elements');
    const elements = identifyElements(narrative);

    // Step 3: Apply frame
    console.log('[GENERATE] Step 3: Applying frame');
    const { framedNarrative } = applyFrame({
      narrative,
      frame: frame as Frame,
      elements,
    });

    // Step 4: Generate all 9 formats
    console.log('[GENERATE] Step 4: Generating all 9 formats');
    const formats = generateAllFormats({
      narrative: framedNarrative,
      elements,
      frame,
    });

    // Step 5: Store in database
    console.log('[GENERATE] Step 5: Storing in database');
    const contentInput = await prisma.contentInput.create({
      data: {
        statement,
        context,
        sourceType: 'direct',
        category: 'general',
        userId,
        status: 'expanded',
      },
    });

    const expandedNarrative = await prisma.expandedNarrative.create({
      data: {
        narrative: framedNarrative,
        revelation: elements.revelation,
        contrast: elements.contrast,
        coreMessage: elements.coreMessage,
        identityChoice: elements.identityChoice,
        callToAction: elements.callToAction,
        frame: frame as string,
        contentInputId: contentInput.id,
      },
    });

    // Store each format
    await Promise.all(
      Object.entries(formats).map(([formatType, content]) =>
        prisma.generatedOutput.create({
          data: {
            format: formatType as string,
            content: content as string,
            narrativeId: expandedNarrative.id,
          },
        })
      )
    );

    console.log('[GENERATE] Generation complete. Stored in database.');

    return NextResponse.json({
      success: true,
      narrative: framedNarrative,
      elements,
      formats,
      narrativeId: expandedNarrative.id,
    });
  } catch (error) {
    console.error('[GENERATE] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content' },
      { status: 500 }
    );
  }
}

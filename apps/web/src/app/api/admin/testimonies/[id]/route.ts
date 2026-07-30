import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, role, stage, quote, story } = body;

    if (!name || !role || !stage || !quote || !story) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`[ADMIN] Updating testimony: ${id}`);

    const testimony = await prisma.testimony.update({
      where: { id },
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

    console.log(`[ADMIN] Testimony updated: ${id}`);
    return NextResponse.json(testimony);
  } catch (error) {
    console.error('[ADMIN] Error updating testimony:', error);
    return NextResponse.json(
      { error: 'Failed to update testimony' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log(`[ADMIN] Deleting testimony: ${id}`);

    await prisma.testimony.delete({
      where: { id },
    });

    console.log(`[ADMIN] Testimony deleted: ${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ADMIN] Error deleting testimony:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimony' },
      { status: 500 }
    );
  }
}

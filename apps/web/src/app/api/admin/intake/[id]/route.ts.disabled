import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * PUT /api/admin/intake/[id]
 * Update entry with encounter details and decision
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`[ADMIN-INTAKE-UPDATE] PUT request for entry ${params.id}`);

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[ADMIN-INTAKE-UPDATE] Unauthorized - no session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'ADMIN') {
      console.log('[ADMIN-INTAKE-UPDATE] Forbidden - not admin');
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.status) {
      console.log('[ADMIN-INTAKE-UPDATE] Missing status');
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Update entry
    const updated = await prisma.entryPrayerRequest.update({
      where: { id: params.id },
      data: {
        status: data.status,
        ...(data.decisionMade !== undefined && { decisionMade: data.decisionMade }),
        ...(data.decision && { decision: data.decision }),
        ...(data.status === 'SCHEDULED' && { encounteredAt: new Date(), encounteredById: user.id })
      },
      include: {
        encounteredBy: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      }
    });

    console.log(`[ADMIN-INTAKE-UPDATE] Entry ${params.id} updated: status=${data.status}, decision=${data.decision}`);

    return NextResponse.json({
      success: true,
      entry: updated
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.log(`[ADMIN-INTAKE-UPDATE] Entry not found: ${params.id}`);
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }
    console.error('[ADMIN-INTAKE-UPDATE] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/admin/intake/[id]
 * Fetch single entry with full details
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`[ADMIN-INTAKE-GET] GET request for entry ${params.id}`);

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[ADMIN-INTAKE-GET] Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'ADMIN') {
      console.log('[ADMIN-INTAKE-GET] Forbidden');
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const entry = await prisma.entryPrayerRequest.findUnique({
      where: { id: params.id },
      include: {
        encounteredBy: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      }
    });

    if (!entry) {
      console.log(`[ADMIN-INTAKE-GET] Entry not found: ${params.id}`);
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    console.log(`[ADMIN-INTAKE-GET] Entry fetched: ${params.id}`);
    return NextResponse.json({ entry });
  } catch (error) {
    console.error('[ADMIN-INTAKE-GET] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

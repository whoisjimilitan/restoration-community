import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/intake
 * Fetch all entry prayer requests (paginated)
 * Query params: status, search, limit, offset
 */
export async function GET(request: NextRequest) {
  console.log('[ADMIN-INTAKE] GET request');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[ADMIN-INTAKE] Unauthorized - no session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'ADMIN') {
      console.log('[ADMIN-INTAKE] Forbidden - not admin');
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build filter
    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { contact: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Fetch entries
    const [entries, total] = await Promise.all([
      prisma.entryPrayerRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          encounteredBy: {
            select: { id: true, firstName: true, lastName: true, email: true }
          }
        }
      }),
      prisma.entryPrayerRequest.count({ where })
    ]);

    console.log(`[ADMIN-INTAKE] Fetched ${entries.length} entries (total: ${total})`);

    return NextResponse.json({
      entries,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('[ADMIN-INTAKE] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const maxDuration = 30;

export async function GET() {
  console.log('[PRAYER-BOOKINGS-AVAILABLE] Fetching available slots');

  try {
    // Get all booked/completed prayer calls
    const bookedCalls = await prisma.prayerCall.findMany({
      where: {
        status: { in: ['scheduled', 'completed'] },
      },
      select: {
        scheduledTime: true,
      },
    });

    // Convert to ISO strings
    const bookedSlots = bookedCalls.map((call: { scheduledTime: Date }) => call.scheduledTime.toISOString());

    console.log('[PRAYER-BOOKINGS-AVAILABLE] Returning', bookedSlots.length, 'booked slots');

    return NextResponse.json(
      {
        bookedSlots,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[PRAYER-BOOKINGS-AVAILABLE] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}

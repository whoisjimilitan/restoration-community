import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('[ENTRY] Prayer request received');

  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name?.trim() || !data.contact?.trim() || !data.situation || !data.readiness) {
      console.log('[ENTRY] Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Missing required information.' },
        { status: 400 }
      );
    }

    console.log('[ENTRY] Validated request data:', {
      name: data.name,
      contact: data.contact,
      country: data.country,
      situation: data.situation,
      readiness: data.readiness
    });

    // Save to database
    const entryPrayerRequest = await prisma.entryPrayerRequest.create({
      data: {
        name: data.name.trim(),
        contact: data.contact.trim(),
        country: data.country?.trim() || null,
        situation: data.situation,
        seeking: data.seeking || [],
        story: data.story?.trim() || '',
        readiness: data.readiness,
        status: 'SUBMITTED'
      }
    });

    console.log(`[ENTRY] Prayer request created: ${entryPrayerRequest.id} (name: ${data.name})`);

    return NextResponse.json(
      {
        success: true,
        message: 'Your request has been received.',
        requestId: entryPrayerRequest.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[ENTRY] Error processing request:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred. Please try again.'
      },
      { status: 500 }
    );
  }
}

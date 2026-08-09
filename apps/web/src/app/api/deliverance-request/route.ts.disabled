import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { need, duration, name, email, phone } = body;

    console.log('[DELIVERANCE] Request received', {
      name,
      email,
      phone,
      need: need.substring(0, 50) + '...',
      duration,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save to database or send to WhatsApp queue
    // For now, just log and return success

    return NextResponse.json(
      {
        success: true,
        message: 'Deliverance request received. We will reach out via WhatsApp.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[DELIVERANCE] Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

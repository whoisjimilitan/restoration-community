import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('[DELIVERANCE] Prayer request received');

  try {
    const data = await request.json();

    console.log('[DELIVERANCE] Request data:', {
      name: data.name,
      contact: data.contact,
      country: data.country
    });

    // In a real implementation, this would save to the database
    // For now, we're just logging and confirming receipt
    console.log('[DELIVERANCE] Prayer request processing complete');

    return NextResponse.json(
      {
        success: true,
        message: 'Your request has been received.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[DELIVERANCE] Error processing request:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred. Please try again.'
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stageNumber, stageName } = body;

    console.log(`[REFLECTION] Stage ${stageNumber} (${stageName}) submitted`);

    return NextResponse.json(
      { success: true, message: 'Reflection submitted', stage: stageNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error('[REFLECTION] Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit reflection' },
      { status: 500 }
    );
  }
}

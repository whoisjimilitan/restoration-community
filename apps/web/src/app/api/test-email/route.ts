import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const result = await sendVerificationEmail(email, 'test-token-12345');

    return NextResponse.json({
      success: result.success,
      error: result.error,
      message: result.success ? 'Email sent' : 'Email failed'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

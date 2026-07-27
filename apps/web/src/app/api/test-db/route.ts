import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({
      success: true,
      userCount,
      message: 'Database connected'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message,
      code: error?.code,
      databaseError: true
    }, { status: 500 });
  }
}

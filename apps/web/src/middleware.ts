import { NextRequest, NextResponse } from 'next/server';

const TEACHING_ENGINE_PASSWORD = process.env.TEACHING_ENGINE_PASSWORD || 'teachingengine2024';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Teaching engine routes require password
  if (pathname.startsWith('/dashboard/teaching-engine')) {
    // Check for valid session cookie
    const sessionCookie = request.cookies.get('teaching-engine-auth');

    if (!sessionCookie || sessionCookie.value !== TEACHING_ENGINE_PASSWORD) {
      // Redirect to login with return URL
      return NextResponse.redirect(
        new URL(`/teaching-engine-login?from=${pathname}`, request.url)
      );
    }
  }

  // API routes can use Authorization header
  if (pathname.startsWith('/api/teaching-engine')) {
    const authHeader = request.headers.get('authorization');
    const hasValidAuth =
      authHeader === `Bearer ${TEACHING_ENGINE_PASSWORD}` ||
      request.cookies.get('teaching-engine-auth')?.value === TEACHING_ENGINE_PASSWORD;

    if (!hasValidAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/teaching-engine/:path*',
    '/api/teaching-engine/:path*',
  ],
};

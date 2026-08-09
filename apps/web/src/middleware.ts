import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public access to teaching engine dashboard and APIs
  if (
    pathname.startsWith('/dashboard/teaching-engine') ||
    pathname.startsWith('/api/teaching-engine')
  ) {
    return NextResponse.next();
  }

  // For all other routes, let NextAuth handle authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg).*)',
  ],
};

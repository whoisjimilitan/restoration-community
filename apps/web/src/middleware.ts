import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  console.log('[MIDDLEWARE] Checking:', pathname, 'Token:', token ? 'yes' : 'no');

  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth/signin',
    '/auth/register',
    '/',
    '/api/auth',
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to sign in
  if (!token) {
    console.log('[MIDDLEWARE] No token, redirecting to signin');
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If onboarding not completed, redirect to onboarding
  // (except for onboarding and API routes)
  if (
    !pathname.startsWith('/onboarding') &&
    !pathname.startsWith('/api/onboarding') &&
    !pathname.startsWith('/api/auth')
  ) {
    // Note: We can't check onboarding status in middleware without a DB call.
    // Instead, the onboarding check happens in the dashboard component.
    // This middleware just ensures authentication.
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

/**
 * Verify user is authenticated and has admin role
 * Redirects to login if not authenticated
 * Throws 403 if not admin
 */
export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    console.log('[ADMIN-AUTH] No session found, redirecting to signin');
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    console.log('[ADMIN-AUTH] User not found in database');
    redirect('/auth/signin');
  }

  // Check if user is admin
  if (user.role !== 'ADMIN') {
    console.log(`[ADMIN-AUTH] Access denied for user ${user.id} with role ${user.role}`);
    throw new Error('403: Forbidden - Admin access required');
  }

  console.log(`[ADMIN-AUTH] Admin session verified for ${user.email}`);
  return user;
}

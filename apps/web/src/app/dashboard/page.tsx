import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  // Get user with onboarding status
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  // Enforce onboarding
  if (!user.onboardingCompleted) {
    console.log('[DASHBOARD] User not onboarded, redirecting to onboarding');
    redirect('/onboarding');
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {user.profile?.displayName}
            </h1>
            <p className="text-gray-600 mt-2">
              {user.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your Profile
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Display Name</p>
                <p className="font-medium text-gray-900">
                  {user.profile?.displayName || 'Not set'}
                </p>
              </div>
              {user.profile?.countryRegion && (
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">
                    {user.profile.countryRegion}
                  </p>
                </div>
              )}
              {user.profile?.timeZone && (
                <div>
                  <p className="text-gray-600">Time Zone</p>
                  <p className="font-medium text-gray-900">
                    {user.profile.timeZone}
                  </p>
                </div>
              )}
            </div>
            <a
              href="/profile"
              className="mt-4 inline-block text-teal-600 hover:text-teal-700 font-medium text-sm"
            >
              Edit Profile →
            </a>
          </div>

          {/* Getting Started */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Getting Started
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  Profile created
                </p>
              </div>
              <div className="flex items-center opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  Begin restoration journey
                </p>
              </div>
              <div className="flex items-center opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  Join a community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

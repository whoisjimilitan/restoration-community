import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  // Get user with onboarding status and restoration journey
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: true,
      userRestoration: {
        include: { currentStage: true },
      },
    },
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

          {/* Restoration Journey */}
          {user.userRestoration && (
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-6 border border-teal-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Restoration Journey
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-2">Current Stage</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                      {user.userRestoration.currentStage.sequence}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.userRestoration.currentStage.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        of 7 stages
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600 text-sm">Progress</p>
                    <p className="text-sm font-medium text-gray-900">
                      {Math.round(
                        ((user.userRestoration.currentStage.sequence - 1) / 6) *
                          100
                      )}%
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          ((user.userRestoration.currentStage.sequence - 1) /
                            6) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <a
                  href="/journey"
                  className="inline-block mt-4 text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  View Your Journey →
                </a>
              </div>
            </div>
          )}

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
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  Restoration journey started
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

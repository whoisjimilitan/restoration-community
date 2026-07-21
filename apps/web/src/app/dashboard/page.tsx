import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PageLayout, PageHeader, Section, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { Progress } from '@/components/ui';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

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

  if (!user.onboardingCompleted) {
    console.log('[DASHBOARD] User not onboarded, redirecting to onboarding');
    redirect('/onboarding');
  }

  const displayName = user.profile?.displayName || 'Friend';
  const timeZone = user.profile?.timeZone || '';
  const locationString =
    user.profile?.countryRegion || '';

  return (
    <PageLayout>
      <PageHeader
        title={`Welcome back, ${displayName}`}
        description={`You&apos;re on a journey of restoration. Here&apos;s what&apos;s next.`}
      />

      {/* Current Journey Status */}
      {user.userRestoration && (
        <Section>
          <Card>
            <CardHeader>
              <CardTitle>Your Restoration Journey</CardTitle>
              <CardDescription>
                Stage {user.userRestoration.currentStage.sequence} of 7
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Stage Display */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                      <span className="text-lg font-semibold text-teal-900">
                        {user.userRestoration.currentStage.sequence}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.userRestoration.currentStage.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        You&apos;re here right now
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <Progress
                    value={
                      ((user.userRestoration.currentStage.sequence - 1) / 6) *
                      100
                    }
                    showPercent
                    label="Progress"
                  />
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Link
                    href="/journey"
                    className="inline-flex items-center px-4 py-2.5 text-base font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    View full journey →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      )}

      {/* Profile Summary */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity */}
          <Card>
            <CardHeader>
              <CardTitle>Your Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Display Name</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {user.profile?.displayName}
                  </p>
                </div>
                {locationString && (
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {locationString}
                    </p>
                  </div>
                )}
                {timeZone && (
                  <div>
                    <p className="text-sm text-gray-600">Time Zone</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {timeZone}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What&apos;s Next</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-sm font-semibold text-teal-900 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm text-gray-700">
                    Profile completed
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-sm font-semibold text-teal-900 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm text-gray-700">
                    Restoration journey began
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 mt-0.5">
                    3
                  </span>
                  <span className="text-sm text-gray-700">
                    Join or create a community
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Account Settings Link */}
      <Section>
        <div className="space-y-2">
          <Link
            href="/profile"
            className="inline-flex text-base font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
          >
            Edit your profile →
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
}

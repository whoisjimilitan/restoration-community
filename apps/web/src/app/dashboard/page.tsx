import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome, {session.user?.email}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            You're authenticated!
          </h2>
          <p className="text-gray-600 mb-4">
            Authentication is working correctly.
          </p>
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {session.user?.email}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Session Strategy:</strong> JWT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

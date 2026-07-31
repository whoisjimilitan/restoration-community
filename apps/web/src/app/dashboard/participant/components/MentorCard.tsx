'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import type { User } from '@prisma/client';

interface MentorCardProps {
  mentor: User | null;
}

export function MentorCard({ mentor }: MentorCardProps) {
  if (!mentor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Mentor</CardTitle>
            <CardDescription>
              Spiritual guidance and accountability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 text-base">
                A mentor will be assigned soon. Pray while you wait.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Mentor</CardTitle>
          <CardDescription>
            Spiritual guidance and accountability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="mt-1 font-medium text-gray-900">
                {mentor.name || 'Mentor'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact Email</p>
              <p className="mt-1 font-medium text-gray-900">
                {mentor.email}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            Your mentor has walked this journey before you. They are here to help, challenge, and encourage you toward freedom.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

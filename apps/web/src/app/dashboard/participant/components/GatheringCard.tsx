'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import type { Meeting } from '@prisma/client';

interface GatheringCardProps {
  nextMeeting: (Meeting & { stage?: { name: string } }) | null;
  cohortName?: string;
}

export function GatheringCard({ nextMeeting }: GatheringCardProps) {
  const formatDateAndTime = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (!nextMeeting) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Next Gathering</CardTitle>
            <CardDescription>
              Weekly Friday meetings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 text-base">
                No upcoming gatherings scheduled.
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
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Next Gathering</CardTitle>
          <CardDescription>
            Weekly Friday meetings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="mt-1 font-medium text-gray-900">
                {formatDateAndTime(nextMeeting.scheduledDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="mt-1 font-medium text-gray-900">
                {nextMeeting.location}
              </p>
            </div>
            {nextMeeting.stage && (
              <div>
                <p className="text-sm text-gray-600">Stage</p>
                <p className="mt-1 font-medium text-gray-900">
                  {nextMeeting.stage.name}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Week</p>
              <p className="mt-1 font-medium text-gray-900">
                Week {nextMeeting.weekNumber} of 7
              </p>
            </div>
          </div>
        </CardContent>
        <div className="mt-6 pt-6 border-t border-gray-200 px-6 pb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                // Placeholder for attendance action
                console.log('User marked as attending');
              }}
            >
              I'm Attending
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

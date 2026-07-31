'use client';

import { motion } from 'framer-motion';
import { PrayerRequest, User } from '@prisma/client';

interface PrayerRequestWithParticipant extends PrayerRequest {
  participant: User;
}

interface PrayerQueuePanelProps {
  prayerRequests: PrayerRequestWithParticipant[];
}

export function PrayerQueuePanel({ prayerRequests }: PrayerQueuePanelProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      }
    }
  };

  const unaddressedCount = prayerRequests.length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-semibold text-gray-900">Prayer Queue</h3>
          {unaddressedCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              {unaddressedCount}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Unaddressed prayer requests requiring attention
        </p>
      </div>

      {/* Empty State */}
      {unaddressedCount === 0 && (
        <motion.div
          variants={itemVariants}
          className="text-center py-8 text-gray-600 bg-gray-50 rounded-lg"
        >
          <p className="text-sm font-medium mb-1">All prayers have been addressed</p>
          <p className="text-xs text-gray-500">Good work, intercessor.</p>
        </motion.div>
      )}

      {/* Prayer Requests List */}
      {unaddressedCount > 0 && (
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {prayerRequests.map((prayer) => {
            const daysSinceSubmitted = Math.floor(
              (Date.now() - new Date(prayer.createdAt).getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <motion.div
                key={prayer.id}
                variants={itemVariants}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Prayer Header */}
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                        {prayer.status || 'SUBMITTED'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {daysSinceSubmitted} day{daysSinceSubmitted !== 1 ? 's' : ''} ago
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {prayer.participant?.name || 'Anonymous'}
                    </p>
                  </div>
                </div>

                {/* Prayer Content */}
                <div className="mb-3">
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {prayer.content}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    {new Date(prayer.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <button
                    className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    View Details →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}

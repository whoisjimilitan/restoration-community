'use client';

import { motion } from 'framer-motion';
import { Meeting, RestorationStage, Attendance, UserRestoration, User } from '@prisma/client';

interface AttendanceTrackerPanelProps {
  meetings: (Meeting & {
    stage: RestorationStage;
    attendances: (Attendance & {
      userRestoration: UserRestoration & {
        user: User;
      };
    })[];
  })[];
}

export function AttendanceTrackerPanel({ meetings }: AttendanceTrackerPanelProps) {
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
        <h3 className="text-lg font-semibold text-gray-900">Attendance Tracker</h3>
        <p className="text-sm text-gray-600 mt-1">
          Track attendance across meetings and stages
        </p>
      </div>

      {/* Empty State */}
      {meetings.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="text-center py-8 text-gray-500"
        >
          <p className="text-sm">No upcoming meetings scheduled.</p>
        </motion.div>
      )}

      {/* Meetings List */}
      {meetings.length > 0 && (
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {meetings.map((meeting) => {
            const totalParticipants = meeting.attendances.length;
            const attendedCount = meeting.attendances.filter(
              (a) => a.status === 'attended'
            ).length;
            const attendancePercentage =
              totalParticipants > 0
                ? Math.round((attendedCount / totalParticipants) * 100)
                : 0;

            return (
              <motion.div
                key={meeting.id}
                variants={itemVariants}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Meeting Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        Week {meeting.weekNumber}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {meeting.stage.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {new Date(meeting.scheduledDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {attendedCount}/{totalParticipants}
                    </p>
                    <p className="text-xs text-gray-600">{attendancePercentage}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${attendancePercentage}%` }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="bg-teal-500 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Participants Details */}
                {meeting.attendances.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700 mb-2">Participants:</p>
                    <div className="space-y-1">
                      {meeting.attendances.map((attendance) => (
                        <div
                          key={attendance.id}
                          className="flex items-center gap-2 text-xs text-gray-600"
                        >
                          <span
                            className={`inline-flex w-4 h-4 items-center justify-center rounded-full text-xs font-bold ${
                              attendance.status === 'attended'
                                ? 'bg-green-100 text-green-700'
                                : attendance.status === 'absent'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {attendance.status === 'attended' ? '✓' : '○'}
                          </span>
                          <span className="text-gray-700">
                            {attendance.userRestoration.user.name || 'Unknown User'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}

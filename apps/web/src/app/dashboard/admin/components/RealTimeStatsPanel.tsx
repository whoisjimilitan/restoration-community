'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface RealTimeStatsPanelProps {
  totalParticipants: number;
  byStage: Record<string, number>;
}

const SEVEN_STAGES = [
  'Truth',
  'Confession',
  'Repentance',
  'Belief',
  'Acceptance',
  'Transformation',
  'Authority'
];

export function RealTimeStatsPanel({
  totalParticipants,
  byStage
}: RealTimeStatsPanelProps) {
  const averageStage =
    totalParticipants > 0
      ? (
          Object.values(byStage).reduce((sum, count, idx) => sum + count * (idx + 1), 0) /
          totalParticipants
        ).toFixed(1)
      : '0';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Title */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900">Cohort Metrics</h2>
        <p className="mt-1 text-sm text-gray-600">Real-time participant progress across stages</p>
      </motion.div>

      {/* Top Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {/* Total Participants Card */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Total Participants</CardTitle>
              <CardDescription>Active in this cohort</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-teal-600">
                {totalParticipants}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Average Stage Card */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Average Stage</CardTitle>
              <CardDescription>Group progression level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600">
                {averageStage}
              </div>
              <p className="mt-2 text-xs text-gray-600">
                Out of 7 stages
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Stage Breakdown Grid */}
      <motion.div variants={itemVariants}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Breakdown by Stage</h3>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {SEVEN_STAGES.map((stageName, idx) => {
            const count = byStage[stageName] || 0;
            const percentage =
              totalParticipants > 0
                ? Math.round((count / totalParticipants) * 100)
                : 0;

            return (
              <motion.div key={stageName} variants={itemVariants}>
                <Card>
                  <CardContent className="pt-6">
                    {/* Stage Name */}
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-900">
                        {stageName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stage {idx + 1}
                      </p>
                    </div>

                    {/* Count and Percentage */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-teal-600">
                          {count}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + idx * 0.05 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

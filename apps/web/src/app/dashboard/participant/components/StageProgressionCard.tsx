'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import type { UserRestoration, RestorationStage } from '@prisma/client';

interface StageProgressionCardProps {
  userRestoration: UserRestoration & {
    currentStage: RestorationStage;
  };
}

export function StageProgressionCard({ userRestoration }: StageProgressionCardProps) {
  const currentStageNum = userRestoration.currentStage.sequence;
  const totalStages = 7;
  const progressPercent = (currentStageNum / totalStages) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Journey</CardTitle>
          <CardDescription>
            Stage {currentStageNum} of {totalStages}: {userRestoration.currentStage.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-rc-text">Progress</span>
              <span className="text-sm font-medium text-rc-text">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-3 bg-rc-warm-gray rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-rc-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, type: 'spring', damping: 30, stiffness: 120 }}
              />
            </div>
          </div>

          {/* Stage Grid */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: totalStages }).map((_, index) => {
              const stageNum = index + 1;
              const isCompleted = stageNum < currentStageNum;
              const isCurrent = stageNum === currentStageNum;

              return (
                <motion.div
                  key={stageNum}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      text-sm font-semibold transition-all duration-200
                      ${
                        isCompleted
                          ? 'bg-rc-accent text-white'
                          : isCurrent
                            ? 'bg-rc-accent text-white ring-2 ring-rc-accent ring-offset-2'
                            : 'bg-rc-warm-gray text-rc-text'
                      }
                    `}
                  >
                    {stageNum}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Text */}
          <div className="pt-2 border-t border-rc-border">
            <p className="text-sm text-rc-text-secondary">
              You&apos;re currently in <span className="font-semibold text-rc-accent">{userRestoration.currentStage.name}</span>.
              Continue walking toward freedom and restoration.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

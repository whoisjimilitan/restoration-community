'use client';

import { motion } from 'framer-motion';

const stages = [
  { name: 'Truth', color: '#E8F4F3' },
  { name: 'Confession', color: '#D1EEEA' },
  { name: 'Repentance', color: '#B3E5E0' },
  { name: 'Forgiveness', color: '#95DDD7' },
  { name: 'Reconciliation', color: '#4DB5A6' },
  { name: 'Honest Work', color: '#1B7A6F' },
  { name: 'Serving', color: '#0D5E57' },
];

const getCircleTextColor = (index: number) => {
  return index >= 5 ? 'text-white' : 'text-rc-text';
};

export default function StagesVisualization() {
  return (
    <div className="w-full py-8">
      {/* Desktop - Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-rc-border/30" />

          {/* Stages */}
          <div className="relative flex justify-between w-full gap-2">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col items-center group"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 ${getCircleTextColor(index)}`}
                  style={{
                    backgroundColor: stage.color,
                  }}
                >
                  {index + 1}
                </div>
                <p className="mt-3 text-xs font-medium text-rc-text">
                  {stage.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile - Vertical */}
      <div className="md:hidden">
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 ${getCircleTextColor(index)}`}
                style={{
                  backgroundColor: stage.color,
                }}
              >
                {index + 1}
              </div>
              <p className="text-sm font-medium text-rc-text">
                {stage.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

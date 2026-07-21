import React from 'react';

interface ProgressProps {
  value: number; // 0-100
  label?: string;
  showPercent?: boolean;
}

/**
 * Simple progress bar
 * value: 0-100
 * showPercent: Display percentage on the right
 */
export function Progress({ value, label, showPercent = false }: ProgressProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {showPercent && (
            <span className="text-sm font-medium text-gray-900">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 bg-teal-600 rounded-full transition-all duration-300"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

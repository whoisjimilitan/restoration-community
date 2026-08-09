'use client';

export interface ProcessingIndicatorProps {
  process: {
    id: string;
    status: string;
    createdAt: string;
    sermonTitle: string;
  };
}

export default function ProcessingIndicator({
  process,
}: ProcessingIndicatorProps) {
  const phases = [
    { name: 'Verbatim Extraction', key: 'phase1' },
    { name: 'Deep Reasoning', key: 'phase2' },
    { name: 'Output Generation', key: 'phase3' },
  ];

  const isComplete = process.status === 'complete';

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {process.sermonTitle}
      </h2>

      {/* Phase Timeline */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.key} className="flex items-center gap-4">
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                isComplete ? 'bg-black' : 'bg-gray-400'
              }`}
            >
              {isComplete ? '✓' : index + 1}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{phase.name}</p>
              {isComplete && (
                <p className="text-xs text-gray-500">
                  Completed{' '}
                  {new Date(process.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
            {isComplete && (
              <div className="text-green-600 font-medium">Complete</div>
            )}
          </div>
        ))}
      </div>

      {!isComplete && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900">
          Processing your sermon... This may take a moment.
        </div>
      )}
    </div>
  );
}

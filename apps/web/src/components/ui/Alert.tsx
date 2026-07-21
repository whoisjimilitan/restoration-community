import React from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
}

const styles: Record<
  AlertType,
  { bg: string; border: string; text: string; close: string }
> = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    close: 'text-green-600 hover:text-green-700',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    close: 'text-red-600 hover:text-red-700',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    close: 'text-amber-600 hover:text-amber-700',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    close: 'text-blue-600 hover:text-blue-700',
  },
};

export function Alert({
  type,
  title,
  message,
  onClose,
}: AlertProps) {
  const style = styles[type];

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-lg p-4`}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="flex-1">
          {title && (
            <h3 className={`font-medium ${style.text} mb-1`}>
              {title}
            </h3>
          )}
          <p className={`text-sm ${style.text}`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${style.close} flex-shrink-0 transition-colors duration-200`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

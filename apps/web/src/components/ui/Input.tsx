import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {props.required && <span className="text-gray-400 ml-1">*</span>}
        </label>
      )}
      {hint && <p className="text-sm text-gray-600 mb-2">{hint}</p>}
      <input
        className={`
          w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg
          text-base text-gray-900 placeholder-gray-500
          transition-colors duration-200
          focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({
  label,
  hint,
  error,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {props.required && <span className="text-gray-400 ml-1">*</span>}
        </label>
      )}
      {hint && <p className="text-sm text-gray-600 mb-2">{hint}</p>}
      <textarea
        className={`
          w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg
          text-base text-gray-900 placeholder-gray-500
          transition-colors duration-200
          focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
}

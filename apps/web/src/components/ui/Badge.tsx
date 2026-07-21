import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-teal-100 text-teal-900',
  secondary: 'bg-gray-100 text-gray-900',
  success: 'bg-green-100 text-green-900',
  warning: 'bg-amber-100 text-amber-900',
  error: 'bg-red-100 text-red-900',
};

export function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center whitespace-nowrap
        px-3 py-1.5 text-sm font-medium rounded-lg
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

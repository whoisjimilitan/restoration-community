import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Page wrapper with consistent max-width, padding, and spacing
 */
export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {children}
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * Page header with title, optional description, and optional action
 */
export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-12 flex items-start justify-between gap-6">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base text-gray-600">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Section with consistent spacing
 */
export function Section({ children, className = '' }: SectionProps) {
  return <div className={`mb-8 ${className}`}>{children}</div>;
}

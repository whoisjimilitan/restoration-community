'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rc-bg/95 backdrop-blur-sm border-b border-rc-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors">
          Brother Jimi
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Home
          </Link>
          <Link href="/testimonies" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Testimonies
          </Link>
          <Link href="/partnership" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Partnership
          </Link>
          <Link href="/auth/signin" className="text-sm text-rc-text/70 hover:text-rc-text transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rc-bg/95 backdrop-blur-sm border-b border-rc-text/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-serif font-bold text-rc-text">
          Restoration
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm text-rc-text hover:text-rc-accent transition-colors duration-200">
            About the Ministry
          </Link>
          <Link href="#journey" className="text-sm text-rc-text hover:text-rc-accent transition-colors duration-200">
            My Journey
          </Link>
          <Link href="#testimony" className="text-sm text-rc-text hover:text-rc-accent transition-colors duration-200">
            Testimony
          </Link>
          <Link href="#partnership" className="text-sm text-rc-text hover:text-rc-accent transition-colors duration-200">
            Partnership
          </Link>
          <Link href="/deliverance" className="text-sm font-medium text-rc-accent hover:text-rc-text transition-colors duration-200">
            I Need Deliverance
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-rc-text hover:bg-rc-text/5 rounded transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-rc-bg border-t border-rc-text/5">
          <div className="px-6 py-4 space-y-3">
            <Link href="#about" className="block text-sm text-rc-text hover:text-rc-accent transition-colors">
              About the Ministry
            </Link>
            <Link href="#journey" className="block text-sm text-rc-text hover:text-rc-accent transition-colors">
              My Journey
            </Link>
            <Link href="#testimony" className="block text-sm text-rc-text hover:text-rc-accent transition-colors">
              Testimony
            </Link>
            <Link href="#partnership" className="block text-sm text-rc-text hover:text-rc-accent transition-colors">
              Partnership
            </Link>
            <Link href="/deliverance" className="block text-sm font-medium text-rc-accent hover:text-rc-text transition-colors">
              I Need Deliverance
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

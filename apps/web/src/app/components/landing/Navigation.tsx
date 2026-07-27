'use client';

import Link from 'next/link';
import { useState } from 'react';
import BrotherJimiLogo from '@/components/BrotherJimiLogo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rc-bg/95 backdrop-blur-md border-b border-rc-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <BrotherJimiLogo size="sm" className="text-rc-accent group-hover:opacity-70 transition-opacity duration-200" />
          <span className="text-sm font-serif font-bold text-rc-text hidden sm:inline group-hover:text-rc-accent transition-colors duration-200">
            Brother Jimi
          </span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="#story"
            className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200 relative group"
          >
            My Story
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rc-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#journey"
            className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200 relative group"
          >
            Journey
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rc-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#community"
            className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200 relative group"
          >
            Community
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rc-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/deliverance"
            className="text-sm font-medium px-6 py-2.5 text-white bg-rc-accent rounded-lg hover:bg-rc-accent-light active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Get Delivered
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-rc-text hover:bg-rc-warm-gray rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-rc-bg border-t border-rc-border animate-in fade-in slide-in-from-top-2">
          <div className="px-6 py-4 space-y-2">
            <Link href="#story" className="block text-sm font-medium text-rc-text hover:text-rc-accent hover:bg-rc-warm-gray/50 px-3 py-2 rounded-lg transition-all duration-200">
              My Story
            </Link>
            <Link href="#journey" className="block text-sm font-medium text-rc-text hover:text-rc-accent hover:bg-rc-warm-gray/50 px-3 py-2 rounded-lg transition-all duration-200">
              Journey
            </Link>
            <Link href="#community" className="block text-sm font-medium text-rc-text hover:text-rc-accent hover:bg-rc-warm-gray/50 px-3 py-2 rounded-lg transition-all duration-200">
              Community
            </Link>
            <Link href="/deliverance" className="block text-sm font-medium text-white bg-rc-accent hover:bg-rc-accent-light px-3 py-2 rounded-lg transition-all duration-200 mt-4">
              Get Delivered
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

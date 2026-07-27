'use client';

import Link from 'next/link';
import { useState } from 'react';
import BrotherJimiLogo from '@/components/BrotherJimiLogo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar background
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50);
    }, { passive: true });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-rc-navy/95 backdrop-blur-md border-b border-rc-border shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 z-10">
          <BrotherJimiLogo size="sm" className="text-rc-accent" />
          <span className="text-base font-serif font-bold text-rc-text hidden sm:inline">Brother Jimi</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-16">
          <Link
            href="#story"
            className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200"
          >
            My Story
          </Link>
          <Link
            href="#journey"
            className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200"
          >
            Journey
          </Link>
          <Link
            href="#community"
            className="text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200"
          >
            Community
          </Link>

          {/* CTA Button - Burak style */}
          <Link
            href="/deliverance"
            className="btn-primary ml-4"
          >
            Get Delivered
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-rc-text hover:text-rc-accent rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-rc-navy border-t border-rc-border animate-fade-rise">
          <div className="px-6 py-6 space-y-4">
            <Link
              href="#story"
              className="block text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200"
            >
              My Story
            </Link>
            <Link
              href="#journey"
              className="block text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200"
            >
              Journey
            </Link>
            <Link
              href="#community"
              className="block text-sm font-medium text-rc-text hover:text-rc-accent transition-colors duration-200"
            >
              Community
            </Link>
            <Link
              href="/deliverance"
              className="block btn-primary w-full mt-6"
            >
              Get Delivered
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

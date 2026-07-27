'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-rc-bg border-t border-rc-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-20">
        <div className="space-y-12">
          {/* Links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            <Link href="#story" className="text-sm font-medium text-rc-navy hover:text-rc-accent transition-colors duration-200">
              My Story
            </Link>
            <Link href="#journey" className="text-sm font-medium text-rc-navy hover:text-rc-accent transition-colors duration-200">
              The Journey
            </Link>
            <Link href="#community" className="text-sm font-medium text-rc-navy hover:text-rc-accent transition-colors duration-200">
              Community
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-rc-navy hover:text-rc-accent transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm font-medium text-rc-navy hover:text-rc-accent transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Scripture Reference */}
          <div className="pt-8 border-t border-rc-border max-w-2xl">
            <p className="text-sm text-rc-text-secondary italic leading-relaxed">
              &quot;Therefore if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.&quot; &mdash; <span className="font-semibold">2 Corinthians 5:17</span>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs text-rc-text-tertiary font-medium">
            © {new Date().getFullYear()} Brother Jimi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

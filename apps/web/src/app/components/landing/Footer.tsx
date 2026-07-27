'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-rc-navy border-t border-rc-border">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="space-y-16">
          {/* Links */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            <Link href="#story" className="text-base font-medium text-rc-text hover:text-rc-accent transition-colors duration-200">
              My Story
            </Link>
            <Link href="#journey" className="text-base font-medium text-rc-text hover:text-rc-accent transition-colors duration-200">
              The Journey
            </Link>
            <Link href="#community" className="text-base font-medium text-rc-text hover:text-rc-accent transition-colors duration-200">
              Community
            </Link>
            <Link href="/privacy" className="text-base font-medium text-rc-text hover:text-rc-accent transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/contact" className="text-base font-medium text-rc-text hover:text-rc-accent transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Scripture Reference */}
          <div className="pt-12 border-t border-rc-border max-w-3xl">
            <p className="text-base text-rc-text-secondary italic leading-relaxed">
              &quot;Therefore if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.&quot; &mdash; <span className="font-semibold">2 Corinthians 5:17</span>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-rc-text-tertiary font-medium">
            © {new Date().getFullYear()} Brother Jimi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

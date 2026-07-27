'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-12 md:py-16">
        <div className="space-y-8">
          {/* Links */}
          <div className="flex flex-wrap gap-8">
            <Link href="#story" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              My Story
            </Link>
            <Link href="#trap" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              The Spiritual Trap
            </Link>
            <Link href="#journey" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              The Journey of Truth
            </Link>
            <Link href="#resources" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              Resources
            </Link>
            <Link href="#privacy" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              Privacy
            </Link>
            <Link href="#contact" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              Contact
            </Link>
          </div>

          {/* Scripture Reference */}
          <div className="text-xs text-rc-text-secondary">
            &quot;Therefore if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.&quot; &mdash; 2 Corinthians 5:17
          </div>

          {/* Copyright */}
          <div className="text-xs text-rc-text-secondary pt-4 border-t border-rc-text/5">
            © {new Date().getFullYear()} Brother Jimi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

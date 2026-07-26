'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-12 md:py-16">
        <div className="space-y-8">
          {/* Links */}
          <div className="flex flex-wrap gap-8">
            <Link href="#about" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              About
            </Link>
            <Link href="#journey" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              Journey
            </Link>
            <Link href="#story" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              My Story
            </Link>
            <Link href="#partners" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              Partners
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
            &quot;Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.&quot; &mdash; 2 Corinthians 5:17
          </div>

          {/* Copyright */}
          <div className="text-xs text-rc-text-secondary pt-4 border-t border-rc-text/5">
            © {new Date().getFullYear()} Restoration Community. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

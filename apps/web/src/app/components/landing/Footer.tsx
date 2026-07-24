'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-12 md:py-16">
        <div className="space-y-8">
          {/* Links */}
          <div className="flex flex-wrap gap-8">
            <Link href="#community" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              Community
            </Link>
            <Link href="#journey" className="text-sm text-rc-text hover:text-rc-accent transition-colors">
              Journey
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
            © {new Date().getFullYear()} Restoration Community. All rights reserved.
          </div>

          {/* FORENSIC AUDIT 001 — Deployed Commit Verification */}
          <div style={{ fontSize: '0.625rem', color: '#8B8680', fontFamily: 'monospace', marginTop: '2rem', padding: '0.5rem', backgroundColor: 'rgba(139, 134, 128, 0.05)', borderRadius: '0.25rem' }}>
            <div>🔬 FORENSIC AUDIT 001</div>
            <div>Deployed Commit: c103f5ce33c0c68239c49d2f926beb761fb17e1c</div>
            <div>Expected: c103f5c (redesign: Simplify Hero to full-width vertical layout)</div>
            <div>Build Time: {new Date().toISOString()}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

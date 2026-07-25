'use client';

import Link from 'next/link';

export default function RecognitionSection() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Every meaningful journey begins with truth.
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-rc-text leading-relaxed">
              Before restoration comes honesty.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Before change comes confession.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Every lasting work of God begins when we stop hiding and begin walking in truth.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="#journey"
              className="inline-flex items-center text-base font-medium text-rc-accent hover:text-rc-text transition-colors duration-200"
            >
              Explore the Restoration Journey
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

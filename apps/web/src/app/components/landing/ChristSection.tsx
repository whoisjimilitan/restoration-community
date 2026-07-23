'use client';

import Link from 'next/link';

export default function ChristSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Restoration is possible because of Jesus Christ.
            </h2>
          </div>

          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>
              No failure has the final word.
            </p>
            <p>
              No past places anyone beyond God&apos;s grace.
            </p>
            <p>
              Jesus Christ remains the centre of our identity, our message, our community and our hope.
            </p>
            <p>
              Because He restores people...
            </p>
            <p>
              we walk with one another as restoration continues.
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

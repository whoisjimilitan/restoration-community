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
              Jesus Christ remains the centre of our message, our hope, and every restored life.
            </p>
            <p>
              Because He restores people...
            </p>
            <p>
              we walk together as restoration continues.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="#journey"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
            >
              Explore The Restoration Journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

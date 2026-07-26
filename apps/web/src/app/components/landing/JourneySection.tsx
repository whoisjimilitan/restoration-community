'use client';

import Link from 'next/link';

const stages = [
  { name: 'Truth' },
  { name: 'Confession' },
  { name: 'Repentance' },
  { name: 'Forgiveness' },
  { name: 'Reconciliation' },
  { name: 'Honest Work' },
  { name: 'Serving' },
];

export default function JourneySection() {
  return (
    <section id="journey" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-16">
          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              The Restoration Journey
            </h2>
          </div>

          {/* Stages */}
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border-2 border-rc-text/20 flex items-center justify-center font-medium text-sm text-rc-text flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg font-medium text-rc-text">
                  {stage.name}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Link
              href="/journey"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
            >
              Explore the Journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

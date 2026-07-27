'use client';

import Link from 'next/link';

export default function BridgeSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 lg:px-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
              The Same Jesus Christ
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10 bg-rc-warm-gray/40 rounded-lg p-8 md:p-12">
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              Jesus Christ has not changed.
            </p>
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              The One who delivered me still delivers today.
            </p>
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              No one is beyond His mercy.
            </p>
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              No one is beyond His power.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="#journey"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium text-base rounded-lg hover:bg-rc-accent-light active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-3 focus:ring-offset-rc-bg shadow-sm hover:shadow-md"
            >
              Begin the Journey of Truth
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

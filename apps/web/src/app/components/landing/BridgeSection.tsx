'use client';

import Link from 'next/link';

export default function BridgeSection() {
  return (
    <section className="section">
      <div className="section-content">
        <div className="space-y-20">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight max-w-4xl">
              The Same Jesus Christ
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16 max-w-4xl">
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              Jesus Christ has not changed.
            </p>
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              The One who delivered me still delivers today.
            </p>
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              No one is beyond His mercy.
            </p>
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              No one is beyond His power.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="#journey"
              className="btn-primary"
            >
              Begin the Journey of Truth
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

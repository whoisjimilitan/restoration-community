'use client';

import Link from 'next/link';

export default function BridgeSection() {
  return (
    <section className="section">
      <div className="section-content">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-navy leading-tight">
              The Same Jesus Christ
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10 bg-rc-warm-white/50 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-rc-border">
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              Jesus Christ has not changed.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              The One who delivered me still delivers today.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              No one is beyond His mercy.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              No one is beyond His power.
            </p>
          </div>

          <div className="pt-4">
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

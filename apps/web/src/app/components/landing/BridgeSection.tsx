'use client';

import Link from 'next/link';

export default function BridgeSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>
              Jesus Christ has not changed.
            </p>
            <p>
              The One who delivered me still delivers today.
            </p>
            <p>
              No one is beyond His mercy.
            </p>
            <p>
              No one is beyond His power.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="#journey"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
            >
              Begin In Truth
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

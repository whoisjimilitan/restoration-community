'use client';

import Link from 'next/link';

export default function InvitationSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 lg:px-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
              Come Home
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10">
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              If you are trapped in fraud and deception, and you want to break free, Jesus Christ is calling you home.
            </p>

            <div className="space-y-6">
              <p className="text-lg md:text-xl text-rc-text font-serif font-semibold leading-relaxed">
                He alone delivers.
              </p>
              <p className="text-lg md:text-xl text-rc-text font-serif font-semibold leading-relaxed">
                He alone restores.
              </p>
            </div>

            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              This ministry exists to point people to Him.
            </p>

            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              If you are ready to leave deception behind and walk in God&apos;s truth, we are ready to walk with you.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="/deliverance"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium text-base rounded-lg hover:bg-rc-accent-light active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-3 focus:ring-offset-rc-bg shadow-sm hover:shadow-md"
            >
              Get Delivered
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';

export default function InvitationSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Come Home
            </h2>
          </div>

          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>
              If you are trapped in fraud, scams, or a life built on deception,
            </p>
            <p>
              Jesus Christ is calling you home.
            </p>
            <p>
              He alone delivers.
            </p>
            <p>
              He alone restores.
            </p>
            <p>
              This ministry exists to point people to Him.
            </p>
            <p>
              If you are ready to leave deception behind and walk in God&apos;s truth,
            </p>
            <p>
              we are ready to walk with you.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/deliverance"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
            >
              Request Deliverance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

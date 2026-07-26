'use client';

import Link from 'next/link';

export default function InvitationSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Take the first faithful step.
            </h2>
          </div>

          <div className="space-y-4 text-lg text-rc-text leading-relaxed">
            <p>
              This ministry exists for people trapped in fraud, scams, and dishonest living who desire freedom through Jesus Christ.
            </p>
            <p>
              But anyone sincerely seeking Jesus Christ is welcome here.
            </p>
            <p>
              Whether today is the beginning of your journey,
            </p>
            <p>
              or another step toward Jesus Christ,
            </p>
            <p>
              you are welcome here.
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

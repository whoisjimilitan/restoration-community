'use client';

import Link from 'next/link';

export default function PartnersSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Walk With Us
            </h2>
          </div>

          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>
              This ministry exists because people who believe in what Jesus Christ is doing choose to stand with us.
            </p>
            <p>
              If you would like to partner with this work, we would love to hear from you.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="#partners"
              className="inline-flex items-center justify-center px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

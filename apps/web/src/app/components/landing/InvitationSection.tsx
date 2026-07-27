'use client';

import Link from 'next/link';

export default function InvitationSection() {
  return (
    <section className="section">
      <div className="section-content">
        <div className="space-y-20">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight max-w-4xl">
              Come Home
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16 max-w-4xl">
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              If you are trapped in fraud and deception, and you want to break free, Jesus Christ is calling you home.
            </p>

            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-rc-text font-serif font-bold leading-relaxed">
                He alone delivers.
              </p>
              <p className="text-xl md:text-2xl text-rc-text font-serif font-bold leading-relaxed">
                He alone restores.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              This ministry exists to point people to Him.
            </p>

            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              If you are ready to leave deception behind and walk in God&apos;s truth, we are ready to walk with you.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/deliverance"
              className="btn-primary"
            >
              Get Delivered
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

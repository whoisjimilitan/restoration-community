'use client';

import Link from 'next/link';

export default function InvitationSection() {
  return (
    <section className="section">
      <div className="section-content">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-navy leading-tight">
              Come Home
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10">
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              If you are trapped in fraud and deception, and you want to break free, Jesus Christ is calling you home.
            </p>

            <div className="space-y-6">
              <p className="text-lg md:text-xl text-rc-navy font-serif font-semibold leading-relaxed">
                He alone delivers.
              </p>
              <p className="text-lg md:text-xl text-rc-navy font-serif font-semibold leading-relaxed">
                He alone restores.
              </p>
            </div>

            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              This ministry exists to point people to Him.
            </p>

            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              If you are ready to leave deception behind and walk in God&apos;s truth, we are ready to walk with you.
            </p>
          </div>

          <div className="pt-6">
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

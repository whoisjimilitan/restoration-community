'use client';

import Link from 'next/link';

export default function RecognitionSection() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Every meaningful journey begins with truth.
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-rc-text leading-relaxed">
              You know the truth already. The question is whether you&apos;re ready to stop hiding from it.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Honesty feels dangerous. But silence is what keeps you trapped.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Every restoration that lasts begins when someone finally tells the truth.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="#story"
              className="inline-flex items-center justify-center px-8 py-4 text-rc-accent font-medium hover:text-rc-text transition-colors duration-200"
            >
              How Jesus Changed My Life
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

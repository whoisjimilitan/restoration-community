'use client';

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
              The hardest part is rarely admitting something has gone wrong.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              The hardest part is believing that Jesus Christ can restore what deception has broken.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Every lasting work of God begins there.
            </p>
          </div>

          <div className="pt-8">
            <a
              href="#story"
              className="text-sm font-medium text-rc-accent hover:text-rc-text transition-colors inline-flex items-center gap-2"
            >
              How Jesus Changed My Life
              <span>→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

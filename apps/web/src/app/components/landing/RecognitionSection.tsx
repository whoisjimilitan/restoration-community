'use client';

export default function RecognitionSection() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Here&apos;s what&apos;s really holding you.
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-rc-text leading-relaxed">
              Fraud is more than an action.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              It is the spirit of deception.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              The spirit of deception separates people from the truth of who God created them to be.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Restoration begins when truth returns.
            </p>
          </div>

          <div className="pt-4">
            <a className="text-sm font-medium text-rc-accent hover:text-rc-text transition-colors duration-200" href="/story">
              How Jesus Changed My Life →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

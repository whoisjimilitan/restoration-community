'use client';

export default function RecognitionSection() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              I know this life is not who I was created to be.
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-rc-text leading-relaxed">
              The hardest part of restoration is rarely admitting that something has gone wrong.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              The hardest part is allowing truth to restore reality.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              This community exists because every lasting restoration begins there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

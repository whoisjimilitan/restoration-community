'use client';

export default function RecognitionSection() {
  return (
    <section id="about" className="w-full bg-rc-bg border-t border-rc-text/5">
      {/* SCENE TWO: Recognition — Slow transition. Emotional contrast. "I have been understood." */}
      <div className="min-h-screen md:min-h-[90vh] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-32 md:py-0">
        <div className="max-w-xl mx-auto">
          {/* Generous whitespace creates breathing before the statement */}
          <div className="mb-20 md:mb-32">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
              Every meaningful journey begins with truth.
            </h2>
          </div>

          {/* Statements separated by space — contemplative rhythm */}
          <div className="space-y-10 md:space-y-12">
            <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
              The hardest part of restoration is rarely admitting that something has gone wrong.
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
              The hardest part is allowing truth to restore reality.
            </p>
            <div className="pt-8 md:pt-12 border-t border-rc-text/10">
              <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
                This community exists because every lasting restoration begins there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

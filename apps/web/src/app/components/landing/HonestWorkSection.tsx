'use client';

export default function HonestWorkSection() {
  return (
    <section className="w-full bg-rc-bg border-t border-rc-text/5">
      {/* SCENE FOUR: Hope — Opens. Breathes. Everything becomes more generous. */}
      <div className="min-h-screen md:min-h-[100vh] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-40 md:py-0">
        <div className="max-w-2xl mx-auto w-full">
          {/* Large heading opens up space */}
          <div className="mb-24 md:mb-40">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-rc-text leading-tight">
              Restoration changes how we live.
            </h2>
          </div>

          {/* Each statement becomes its own line. Breathing room. */}
          <div className="space-y-12 md:space-y-16">
            <p className="text-base md:text-xl text-rc-text leading-relaxed max-w-xl">
              Leaving deception is only the beginning.
            </p>
            <p className="text-base md:text-xl text-rc-text-secondary leading-relaxed max-w-xl">
              Restoration also shapes how we work...
            </p>
            <p className="text-base md:text-xl text-rc-text-secondary leading-relaxed max-w-xl">
              how we serve...
            </p>
            <p className="text-base md:text-xl text-rc-text-secondary leading-relaxed max-w-xl">
              how we love...
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-xl font-medium">
              and how we live with integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

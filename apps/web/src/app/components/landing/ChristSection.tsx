'use client';

export default function ChristSection() {
  return (
    <section className="w-full bg-rc-bg border-t border-rc-text/5">
      {/* SCENE SEVEN: Christ — Emotional centre. Scripture-like. Pause here. */}
      <div className="min-h-screen md:min-h-[130vh] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-40 md:py-0">
        <div className="max-w-lg mx-auto w-full">
          {/* Enormous whitespace around the statement */}
          <div className="mb-32 md:mb-48" />

          {/* The central truth — like Scripture being read aloud */}
          <div className="space-y-16 md:space-y-24 text-center">
            <h2 className="text-6xl md:text-7xl font-serif font-bold text-rc-text leading-tight">
              Restoration is possible because of Jesus Christ.
            </h2>

            {/* Long pause after headline — visitor should feel the weight */}
            <div className="py-8 md:py-12" />

            {/* Statements emerge slowly — contemplative */}
            <div className="space-y-12 md:space-y-16">
              <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
                No failure has the final word.
              </p>

              <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
                No past places anyone beyond God&apos;s grace.
              </p>

              <div className="py-4 md:py-8" />

              <p className="text-lg md:text-xl text-rc-text leading-relaxed">
                Jesus Christ remains the centre of our identity, our message, our community and our hope.
              </p>

              <div className="py-4 md:py-8" />

              <p className="text-lg md:text-xl text-rc-text-secondary leading-relaxed font-light">
                Because He restores people...
              </p>

              <p className="text-lg md:text-xl text-rc-text leading-relaxed">
                we walk with one another as restoration continues.
              </p>
            </div>
          </div>

          {/* Whitespace after — let it breathe */}
          <div className="mb-32 md:mb-48" />
        </div>
      </div>
    </section>
  );
}

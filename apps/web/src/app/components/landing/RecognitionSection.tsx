'use client';

export default function RecognitionSection() {
  return (
    <section id="about" className="section">
      <div className="section-content">
        <div className="space-y-20">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight">
              Why You&apos;re Still Bound
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16 max-w-4xl">
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              You&apos;re bound because you&apos;re in prison.
            </p>
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              The real prison is not within walls.
            </p>
            <p className="text-xl md:text-2xl text-rc-text leading-relaxed font-light">
              It&apos;s within what you&apos;ve come to believe:
            </p>

            <div className="pl-8 md:pl-12 border-l-2 border-rc-accent/40 space-y-12">
              <p className="text-lg md:text-2xl text-rc-text leading-relaxed font-light">
                You believe deception is a way of life.
              </p>
              <p className="text-lg md:text-2xl text-rc-text leading-relaxed font-light">
                You believe you have no choice.
              </p>
              <p className="text-lg md:text-2xl text-rc-text leading-relaxed font-light">
                That God cannot forgive someone like you.
              </p>
            </div>

            <p className="text-lg md:text-2xl text-rc-text-secondary leading-relaxed font-light italic">
              That is the voice of the spirit of deception.
            </p>
            <p className="text-lg md:text-2xl text-rc-text leading-relaxed font-light">
              Corrupting your beliefs about God, yourself, and what you deserve.
            </p>

            <div className="h-px bg-rc-border my-8"></div>

            <p className="text-2xl md:text-3xl text-rc-accent font-serif font-bold leading-relaxed">
              But Jesus Christ came to deliver you.
            </p>
          </div>

          <div className="pt-8">
            <a href="/story" className="inline-flex items-center gap-3 text-base font-bold text-rc-accent hover:text-rc-accent-dark group transition-colors duration-200">
              How Jesus Changed My Life
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

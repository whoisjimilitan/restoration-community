'use client';

export default function RecognitionSection() {
  return (
    <section id="about" className="section">
      <div className="section-content">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-navy leading-tight">
              Why You&apos;re Still Bound
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10">
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              You&apos;re bound because you&apos;re in prison.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              The real prison is not within walls.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              It&apos;s within what you&apos;ve come to believe:
            </p>

            <div className="pl-6 md:pl-8 border-l-2 border-rc-accent/30 space-y-6">
              <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
                You believe deception is a way of life.
              </p>
              <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
                You believe you have no choice.
              </p>
              <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
                That God cannot forgive someone like you.
              </p>
            </div>

            <p className="text-lg md:text-xl text-rc-text-secondary leading-relaxed font-light italic">
              That is the voice of the spirit of deception.
            </p>
            <p className="text-lg md:text-xl text-rc-navy leading-relaxed font-light">
              Corrupting your beliefs about God, yourself, and what you deserve.
            </p>

            <div className="h-px bg-rc-border my-6"></div>

            <p className="text-xl md:text-2xl text-rc-accent font-serif font-bold leading-relaxed">
              But Jesus Christ came to deliver you.
            </p>
          </div>

          <div className="pt-6">
            <a href="/story" className="inline-flex items-center gap-2 text-base font-medium text-rc-accent hover:text-rc-accent-dark group transition-colors duration-200">
              How Jesus Changed My Life
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

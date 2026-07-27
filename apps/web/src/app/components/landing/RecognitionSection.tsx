'use client';

export default function RecognitionSection() {
  return (
    <section id="about" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Why You&apos;re Still Bound
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-rc-text leading-relaxed">
              You&apos;re bound because you&apos;re in prison. The real prison is not within walls.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              It&apos;s within what you&apos;ve come to believe:
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              You believe deception is a way of life.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              You believe you have no choice.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              That God cannot forgive someone like you.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              That is the voice of the spirit of deception.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Corrupting your beliefs about yourself, God, and what you deserve.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              But Jesus Christ came to deliver you.
            </p>
          </div>

          <div className="pt-4">
            <a className="text-sm font-medium text-rc-accent hover:text-rc-text transition-colors duration-200" href="/story">
              How Jesus Changed My Life →
            </a>
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

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
              Deception rarely begins with what we do.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              It begins with what we believe.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              That we have no choice.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              That everyone is doing it.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              That we&apos;ll stop later.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              That God will understand.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              Lies like these become prisons.
            </p>
            <p className="text-lg text-rc-text leading-relaxed">
              But Jesus Christ came to set people free.
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

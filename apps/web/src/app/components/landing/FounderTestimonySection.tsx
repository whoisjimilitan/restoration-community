'use client';

import Link from 'next/link';

export default function FounderTestimonySection() {
  return (
    <section id="story" className="w-full py-24 md:py-32 bg-rc-warm-gray/40 border-t border-rc-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 lg:px-12">
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-rc-accent uppercase tracking-widest">
              Brother Jimi&apos;s Story of Deliverance
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
              A Message From Someone Who Has Walked This Road
            </h2>
          </div>

          <div className="border-l-2 border-rc-accent/40 pl-8 md:pl-12 space-y-8 md:space-y-10">
            <p className="text-lg md:text-xl text-rc-text font-serif italic leading-relaxed">
              I know this life because I lived it.
            </p>

            <p className="text-lg md:text-xl text-rc-text font-serif italic leading-relaxed">
              I knew what I was doing was wrong. I wanted to leave. I just didn&apos;t know how.
            </p>

            <p className="text-lg md:text-xl text-rc-text font-serif italic leading-relaxed">
              Then Jesus Christ found me. He delivered me. He gave me a new heart. A new direction. A new life.
            </p>

            <p className="text-lg md:text-xl text-rc-text font-serif italic leading-relaxed">
              I&apos;m not the deliverer. I am not the Deliverer.
            </p>

            <p className="text-lg md:text-xl text-rc-accent font-serif italic leading-relaxed font-bold">
              I am a witness to the One who delivered me. Today I point people to Him.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/story"
              className="inline-flex items-center gap-2 text-base font-medium text-rc-accent hover:text-rc-accent-light group transition-colors duration-200"
            >
              Read My Full Story
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

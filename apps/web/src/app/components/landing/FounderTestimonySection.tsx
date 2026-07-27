'use client';

import Link from 'next/link';

export default function FounderTestimonySection() {
  return (
    <section id="story" className="section bg-rc-navy-light">
      <div className="section-content">
        <div className="space-y-20">
          <div className="space-y-6">
            <p className="text-xs md:text-sm font-bold text-rc-accent uppercase tracking-widest">
              Brother Jimi&apos;s Story of Deliverance
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight max-w-4xl">
              A Message From Someone Who Has Walked This Road
            </h2>
          </div>

          <div className="border-l-2 border-rc-accent/50 pl-8 md:pl-12 space-y-12 md:space-y-16 max-w-4xl">
            <p className="text-xl md:text-2xl text-rc-text font-serif italic leading-relaxed font-light">
              I know this life because I lived it.
            </p>

            <p className="text-xl md:text-2xl text-rc-text font-serif italic leading-relaxed font-light">
              I knew what I was doing was wrong. I wanted to leave. I just didn&apos;t know how.
            </p>

            <p className="text-xl md:text-2xl text-rc-text font-serif italic leading-relaxed font-light">
              Then Jesus Christ found me. He delivered me. He gave me a new heart. A new direction. A new life.
            </p>

            <p className="text-xl md:text-2xl text-rc-text font-serif italic leading-relaxed font-light">
              I&apos;m not the deliverer. I am not the Deliverer.
            </p>

            <p className="text-xl md:text-2xl text-rc-accent font-serif italic leading-relaxed font-bold">
              I am a witness to the One who delivered me. Today I point people to Him.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/story"
              className="inline-flex items-center gap-3 text-base font-bold text-rc-accent hover:text-rc-accent-dark group transition-colors duration-200"
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

'use client';

import Link from 'next/link';

export default function FounderTestimonySection() {
  return (
    <section id="story" className="w-full py-24 md:py-32 bg-white border-t border-rc-text/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-8 mb-10">
          <p className="text-sm font-medium text-rc-accent uppercase tracking-wide">
            Brother Jimi&apos;s Story of Deliverance
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            A M<span className="italic">e</span>ssage From Som<span className="italic">e</span>on<span className="italic">e</span> Who Has Walk<span className="italic">e</span>d This Road
          </h2>
        </div>

        <div className="border-l-4 border-rc-gold pl-8 mb-8 space-y-4">
          <p className="text-lg text-rc-text italic leading-relaxed">I know this life because I lived it.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">I knew what I was doing was wrong.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">I wanted to leave.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">I just didn&apos;t know how.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">Then J<span className="not-italic">e</span>sus Christ found me.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">He d<span className="not-italic">e</span>liv<span className="not-italic">e</span>r<span className="not-italic">e</span>d m<span className="not-italic">e</span>.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">He gave me a new h<span className="not-italic">e</span>art.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">A n<span className="not-italic">e</span>w dir<span className="not-italic">e</span>ction.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">A n<span className="not-italic">e</span>w lif<span className="not-italic">e</span>.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">I&apos;m not th<span className="not-italic">e</span> d<span className="not-italic">e</span>liv<span className="not-italic">e</span>r<span className="not-italic">e</span>r.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">I am not th<span className="not-italic">e</span> D<span className="not-italic">e</span>liv<span className="not-italic">e</span>r<span className="not-italic">e</span>r.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">I am a witn<span className="not-italic">e</span>ss to th<span className="not-italic">e</span> On<span className="not-italic">e</span> who d<span className="not-italic">e</span>liv<span className="not-italic">e</span>r<span className="not-italic">e</span>d m<span className="not-italic">e</span>.</p>
          <p className="text-lg text-rc-text italic leading-relaxed">Today I point p<span className="not-italic">e</span>opl<span className="not-italic">e</span> to Him.</p>
        </div>

        <div className="pt-8">
          <Link
            href="/story"
            className="text-sm font-medium text-rc-accent hover:text-rc-text transition-colors duration-200"
          >
            R<span className="italic">e</span>ad My Full Story →
          </Link>
        </div>
      </div>
    </section>
  );
}

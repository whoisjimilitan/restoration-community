'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const stages = [
  { number: 1, name: 'Truth', color: '#E8F4F3', textColor: 'text-rc-text' },
  { number: 2, name: 'Confession', color: '#D1EEEA', textColor: 'text-rc-text' },
  { number: 3, name: 'Repentance', color: '#B3E5E0', textColor: 'text-rc-text' },
  { number: 4, name: 'Forgiveness', color: '#95DDD7', textColor: 'text-rc-text' },
  { number: 5, name: 'Reconciliation', color: '#4DB5A6', textColor: 'text-rc-text' },
  { number: 6, name: 'Honest Work', color: '#1B7A6F', textColor: 'text-white' },
  { number: 7, name: 'Service', color: '#0D5E57', textColor: 'text-white' },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">For Young People In A Hurry</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight">
              You were made for something far better.
            </h1>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }}>
            <div className="space-y-3 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>Scamming and fraud promise freedom.</p>
              <p>They only bind you tighter.</p>
              <p className="pt-2">This is a spiritual trap.</p>
              <p>Only One Man can set you free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE TRAP */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">The Trap</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>You tell yourself:</p>
            <p className="text-rc-text/80">The country is hard.</p>
            <p className="text-rc-text/80">I have no opportunities.</p>
            <p className="text-rc-text/80">I am just recovering what was stolen.</p>
            <p className="pt-3 font-medium">That is the voice of deception.</p>
            <p className="font-medium">The spirit recruiting our youths across nations.</p>
          </div>
        </div>
      </section>

      {/* THE WITNESS */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 border-t border-rc-border" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">The Witness</h2>

          <div className="border-l-4 border-rc-accent pl-8 space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>I too was controlled by <em className="not-italic font-medium">that spirit</em>.</p>
            <p>I justified my actions.</p>
            <p>I convinced myself I had no choice.</p>
            <p className="pt-3">Until my encounter with God.</p>
            <p className="font-medium">He delivered me from <em className="not-italic">that spirit</em>.</p>
            <p className="font-medium">He gave me a new beginning.</p>
            <p className="pt-3"><em className="not-italic font-medium">My God.</em> <em className="not-italic font-medium">My Deliverer.</em></p>
            <p className="font-medium">His name is Jesus Christ.</p>
          </div>
        </div>
      </section>

      {/* THE ONLY WAY */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">The Only Way</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Deliverance means total freedom.</p>
            <p>From sin and its consequences.</p>
            <p>It is the only way out of fraud.</p>
            <p className="pt-3">Our money cannot offer it.</p>
            <p>Our laws cannot offer it.</p>
            <p className="pt-2 font-medium">Fraud is a spiritual issue.</p>
            <p className="font-medium">Jesus Christ is the only way.</p>
          </div>
        </div>
      </section>

      {/* THE JOURNEY OUT */}
      <section id="journey" className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">The Journey Out</h2>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-6 left-0 right-0 h-px bg-rc-text/10" />
              <div className="relative flex justify-between w-full gap-4">
                {stages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center group flex-1">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 relative z-10"
                      style={{
                        backgroundColor: stage.color,
                        color: stage.textColor === 'text-white' ? 'white' : '#1A1A18'
                      }}
                    >
                      {stage.number}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-rc-text">{stage.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-0">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center gap-4 py-3 pl-4 border-l-4" style={{ borderColor: stage.color }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: stage.color,
                    color: stage.textColor === 'text-white' ? 'white' : '#1A1A18'
                  }}
                >
                  {stage.number}
                </div>
                <p className="font-medium text-rc-text">{stage.name}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-10 md:pt-12 border-t border-rc-text/15 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>You move through this divine journey with support.</p>
            <p>Prayer. Encouragement. People who understand.</p>
          </div>
        </div>
      </section>

      {/* THE NEW LIFE */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">The New Life</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Deliverance is just the start.</p>
            <p>His grace will teach you to work honestly.</p>
            <p>To live without fear.</p>
            <p>To build something that lasts.</p>
          </div>
        </div>
      </section>

      {/* RETURN */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight">Return</h2>

          <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
            <p>You feel this trap.</p>
            <p>You know time is running out.</p>
            <p>No one can go it alone.</p>
            <p className="pt-3">I have been there.</p>
            <p>I have come back by grace.</p>
            <p>Now enter into that grace.</p>
            <p className="pt-3">Take the first step of faith.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              onClick={() => {
                const event = new CustomEvent('open-deliverance-modal');
                document.dispatchEvent(event);
              }}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Request Deliverance
            </button>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border-2 border-white rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Return to Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="w-full py-12 md:py-16 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-rc-text/50 uppercase tracking-wider mb-6">Or explore</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/testimonies" className="px-6 py-2 text-sm text-rc-text/70 hover:text-rc-text border border-rc-border rounded hover:border-rc-accent transition-all duration-200">
              See What Changed
            </Link>
            <Link href="/partnership" className="px-6 py-2 text-sm text-rc-text/70 hover:text-rc-text border border-rc-border rounded hover:border-rc-accent transition-all duration-200">
              Join As Partner
            </Link>
            <Link href="/auth/signin" className="px-6 py-2 text-sm text-rc-text/70 hover:text-rc-text border border-rc-border rounded hover:border-rc-accent transition-all duration-200">
              Return to Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

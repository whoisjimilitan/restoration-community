'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const stages = [
  { number: 1, name: 'Truth', color: '#E8F4F3', textColor: 'text-rc-text' },
  { number: 2, name: 'Confession', color: '#D1EEEA', textColor: 'text-rc-text' },
  { number: 3, name: 'Repentance', color: '#B3E5E0', textColor: 'text-rc-text' },
  { number: 4, name: 'Forgiveness', color: '#95DDD7', textColor: 'text-rc-text' },
  { number: 5, name: 'Reconciliation', color: '#4DB5A6', textColor: 'text-rc-text' },
  { number: 6, name: 'Right Living', color: '#1B7A6F', textColor: 'text-white' },
  { number: 7, name: 'Service', color: '#0D5E57', textColor: 'text-white' },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 25 && !sessionStorage.getItem('scroll-25')) {
        sessionStorage.setItem('scroll-25', 'true');
      }
      if (scrollPercent > 50 && !sessionStorage.getItem('scroll-50')) {
        sessionStorage.setItem('scroll-50', 'true');
      }
      if (scrollPercent > 75 && !sessionStorage.getItem('scroll-75')) {
        sessionStorage.setItem('scroll-75', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* SECTION 1: HERO - DELIVERANCE FROM DECEPTION */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-32 md:py-40">
        <div className="max-w-3xl mx-auto w-full space-y-12">
          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="text-xs font-medium text-white/70 uppercase tracking-widest">
              D<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span> From D<span className="italic">e</span>c<span className="italic">e</span>ption
            </p>
          </div>

          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-white leading-tight tracking-tight">
              You w<span className="italic">e</span>r<span className="italic">e</span> mad<span className="italic">e</span> for som<span className="italic">e</span>thing far b<span className="italic">e</span>tt<span className="italic">e</span>r.
            </h1>
          </div>

          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '360ms' }}
          >
            <div className="space-y-7 text-lg md:text-xl text-white/90 leading-relaxed font-light">
              <p>Scamming and fraud prom<span className="italic">i</span>s<span className="italic">e</span>d fr<span className="italic">e</span>edom. Th<span className="italic">e</span>y only bound you tight<span className="italic">e</span>r.</p>
              <p>This is a spiritual trap. Only J<span className="italic">e</span>sus Christ br<span className="italic">e</span>aks those chains.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE TRAP */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
            Th<span className="italic">e</span> Trap
          </h2>
          <div className="space-y-7 text-lg md:text-xl text-rc-text leading-relaxed font-light">
            <p>You t<span className="italic">e</span>ll yours<span className="italic">e</span>lf:</p>
            <p className="text-rc-text/85">Th<span className="italic">e</span> country is hard. Th<span className="italic">e</span>r<span className="italic">e</span> ar<span className="italic">e</span> no opportuniti<span className="italic">e</span>s. This is just how I surviv<span className="italic">e</span>.</p>
            <p className="text-rc-text/85">You justify <span className="italic">e</span>v<span className="italic">e</span>ry <span className="italic">e</span>xcus<span className="italic">e</span>. You t<span className="italic">e</span>ll yours<span className="italic">e</span>lf you hav<span className="italic">e</span> no choic<span className="italic">e</span>.</p>
            <p className="pt-4 font-medium">All th<span className="italic">e</span> whil<span className="italic">e</span> th<span className="italic">e</span> d<span className="italic">e</span>vil r<span className="italic">e</span>joic<span className="italic">e</span>s — b<span className="italic">e</span>caus<span className="italic">e</span> you ar<span className="italic">e</span> trapp<span className="italic">e</span>d.</p>
            <p className="pt-2">That is d<span className="italic">e</span>c<span className="italic">e</span>ption sp<span className="italic">e</span>aking.</p>
            <p>You cannot br<span className="italic">e</span>ak this chain by yours<span className="italic">e</span>lf.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE WITNESS - WITH WARM GLOW */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 border-t border-rc-border/50" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
            Th<span className="italic">e</span> Witn<span className="italic">e</span>ss
          </h2>
          <div className="border-l-4 border-rc-accent pl-10 space-y-7 text-lg md:text-xl text-rc-text leading-relaxed font-light">
            <p>I too liv<span className="italic">e</span>d this lif<span className="italic">e</span>.</p>
            <p>I too ju<span className="italic">s</span>tifi<span className="italic">e</span>d it. I too convinc<span className="italic">e</span>d mys<span className="italic">e</span>lf I had no choic<span className="italic">e</span>.</p>
            <p>I too want<span className="italic">e</span>d to stop. I want<span className="italic">e</span>d to chang<span className="italic">e</span>. I could not.</p>
            <p>Until J<span className="italic">e</span>sus Christ st<span className="italic">e</span>pp<span className="italic">e</span>d into th<span className="italic">e</span> matt<span className="italic">e</span>r.</p>
            <p className="font-medium">H<span className="italic">e</span> brok<span className="italic">e</span> th<span className="italic">e</span> pow<span className="italic">e</span>r of sin ov<span className="italic">e</span>r m<span className="italic">e</span>. H<span className="italic">e</span> gav<span className="italic">e</span> m<span className="italic">e</span> a n<span className="italic">e</span>w chanc<span className="italic">e</span>. A n<span className="italic">e</span>w lif<span className="italic">e</span> in Him.</p>
            <p className="pt-3">I am not th<span className="italic">e</span> answ<span className="italic">e</span>r. H<span className="italic">e</span> is.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ONLY WAY */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
            Th<span className="italic">e</span> Only Way
          </h2>
          <div className="space-y-7 text-lg md:text-xl text-rc-text leading-relaxed font-light">
            <p>No amount of mon<span className="italic">e</span>y fix<span className="italic">e</span>s this.</p>
            <p>No law fix<span className="italic">e</span>s this.</p>
            <p>No punishm<span className="italic">e</span>nt fix<span className="italic">e</span>s this.</p>
            <p className="pt-2">Scamming and fraud ar<span className="italic">e</span> spiritual bondage.</p>
            <p className="font-medium">Th<span className="italic">e</span>r<span className="italic">e</span> is no cur<span className="italic">e</span> outsid<span className="italic">e</span> J<span className="italic">e</span>sus Christ.</p>
            <p>H<span className="italic">e</span> d<span className="italic">e</span>liv<span className="italic">e</span>rs p<span className="italic">e</span>opl<span className="italic">e</span> from sin.</p>
            <p>H<span className="italic">e</span> d<span className="italic">e</span>liv<span className="italic">e</span>rs nations from th<span className="italic">e</span> cons<span className="italic">e</span>qu<span className="italic">e</span>nc<span className="italic">e</span>s of sin.</p>
            <p>No on<span className="italic">e</span> is too far gon<span className="italic">e</span>.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE JOURNEY OUT */}
      <section id="journey" className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/50">
        <div className="max-w-3xl mx-auto space-y-14">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
            Th<span className="italic">e</span> J<span className="italic">o</span>urn<span className="italic">e</span>y Out
          </h2>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-6 left-0 right-0 h-px bg-rc-text/10" />
              <div className="relative flex justify-between w-full gap-4">
                {stages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center group flex-1">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 relative z-10"
                      style={{
                        backgroundColor: stage.color,
                        color: stage.textColor === 'text-white' ? 'white' : '#1A1A18'
                      }}
                    >
                      {stage.number}
                    </div>
                    <div className="mt-6 text-center">
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
              <div key={index} className="flex items-center gap-4 py-4 pl-4 border-l-4" style={{ borderColor: stage.color }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 transition-all duration-200"
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

          <div className="space-y-6 pt-10 md:pt-12 border-t border-rc-text/15">
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              <span className="font-medium">Th<span className="italic">e</span> R<span className="italic">e</span>form Coll<span className="italic">e</span>ge</span> is a d<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span> and r<span className="italic">e</span>storation ministry.
            </p>
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              W<span className="italic">e</span> <span className="font-medium">exist to r<span className="italic">e</span>scu<span className="italic">e</span> this g<span className="italic">e</span>n<span className="italic">e</span>ration</span> from this scourg<span className="italic">e</span>.
            </p>
            <p className="text-lg md:text-xl text-rc-text leading-relaxed font-light">
              You do not walk this path alon<span className="italic">e</span>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE NEW LIFE */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
            Th<span className="italic">e</span> N<span className="italic">e</span>w Lif<span className="italic">e</span>
          </h2>
          <div className="space-y-7 text-lg md:text-xl text-rc-text leading-relaxed font-light">
            <p>D<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span> is th<span className="italic">e</span> b<span className="italic">e</span>ginning. Not th<span className="italic">e</span> <span className="italic">e</span>nd.</p>
            <p>Now com<span className="italic">e</span>s th<span className="italic">e</span> <span className="italic">e</span>t<span className="italic">u</span>rn to what you w<span className="italic">e</span>r<span className="italic">e</span> mad<span className="italic">e</span> for.</p>
            <p className="font-medium">H<span className="italic">o</span>n<span className="italic">e</span>st work. Int<span className="italic">e</span>grity. Right living.</p>
            <p>Building som<span className="italic">e</span>thing that lasts.</p>
            <p>A lif<span className="italic">e</span> that actually m<span className="italic">e</span>ans som<span className="italic">e</span>thing.</p>
          </div>
        </div>
      </section>

      {/* SECTION 7: RETURN */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border/50">
        <div className="max-w-3xl mx-auto space-y-14">
          <h2 className="text-6xl md:text-7xl font-serif font-bold text-white leading-tight tracking-tight">
            R<span className="italic">e</span>turn
          </h2>

          <div className="space-y-7 text-lg md:text-xl text-white/95 leading-relaxed font-light">
            <p>Tir<span className="italic">e</span>d of living a li<span className="italic">e</span>?</p>
            <p>Tir<span className="italic">e</span>d of m<span className="italic">e</span>aningless activiti<span className="italic">e</span>s, rising and falling, confusion, wast<span className="italic">e</span> and f<span className="italic">e</span>ar?</p>
            <p>I hav<span className="italic">e</span> b<span className="italic">e</span><span className="italic">e</span>n th<span className="italic">e</span>r<span className="italic">e</span>.</p>
            <p className="pt-2 font-medium text-white">J<span className="italic">e</span>sus is calling you back to what you w<span className="italic">e</span>r<span className="italic">e</span> mad<span className="italic">e</span> for. Back hom<span className="italic">e</span>.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-8">
            <Link
              href="/deliverance"
              className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rc-accent"
            >
              R<span className="italic">e</span>qu<span className="italic">e</span>st D<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span>
            </Link>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] text-white font-medium border-2 border-white rounded-lg hover:bg-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rc-accent"
            >
              R<span className="italic">e</span>turn to Your Journ<span className="italic">e</span>y
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="w-full py-12 md:py-16 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-white/60 text-sm font-light">
            Broth<span className="italic">e</span>r Jimi Ministri<span className="italic">e</span>s — D<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span> & R<span className="italic">e</span>storation Platform
          </p>
          <p className="text-white/40 text-xs font-light tracking-wider">
            © 2026. All rights r<span className="italic">e</span>s<span className="italic">e</span>rv<span className="italic">e</span>d.
          </p>
        </div>
      </footer>
    </div>
  );
}

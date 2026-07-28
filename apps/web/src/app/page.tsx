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
  { number: 7, name: 'Serving', color: '#0D5E57', textColor: 'text-white' },
];

const testimonials = [
  {
    quote: 'I ran scams for 12 years. Jesus broke those chains.',
    name: 'David M.',
    detail: 'Fraud operations'
  },
  {
    quote: 'The shame was crushing. But forgiveness reached me there. I\'m actually free.',
    name: 'Sarah K.',
    detail: 'Cryptocurrency scams'
  },
  {
    quote: 'I didn\'t believe God would have me. He did. I\'m standing now.',
    name: 'Marcus J.',
    detail: 'Fraud consultant'
  }
];

const faqs = [
  {
    question: 'Is this just psychology or therapy?',
    answer: 'No. This is spiritual deliverance grounded in Jesus Christ. Psychology can help with coping, but only the Holy Spirit can break spiritual bondage. We address the root, not just the symptom.'
  },
  {
    question: 'What if I\'ve done really terrible things?',
    answer: 'No one is beyond Jesus Christ\'s reach. The Gospel doesn\'t say "good people" or "people who haven\'t done much damage." It says "while we were still sinners." Forgiveness is available to everyone.'
  },
  {
    question: 'Will this be kept confidential?',
    answer: 'Yes. We operate under strict confidentiality. What you share on the form goes only to our team. We respect your privacy and trust completely.'
  },
  {
    question: 'How long does the process take?',
    answer: 'Deliverance happens in a day. The journey of restoration takes 7 days of guided truth-work. But real transformation—learning to live honestly—is a lifelong journey of following Jesus.'
  },
  {
    question: 'What if I\'m not religious?',
    answer: 'You don\'t need to be religious. You just need to be honest about where you are. Jesus meets you there. Many who come to us say they never believed until they experienced His deliverance firsthand.'
  },
  {
    question: 'Can I do this if I still have legal issues?',
    answer: 'Yes. Deliverance and restoration don\'t require a clean legal record. In fact, many people find that walking in truth helps them address legal consequences with integrity, which courts often recognize.'
  },
  {
    question: 'What happens after the 7 days?',
    answer: 'You enter our community of restored people. You continue learning to live honestly, build real relationships, do honest work, and serve others. You\'re never alone in this.'
  },
  {
    question: 'Is there a cost?',
    answer: 'No. Deliverance is free. We don\'t charge for prayer, counsel, or spiritual freedom. Our mission is restoration through Jesus Christ, not profit.'
  }
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Privacy-friendly scroll depth tracking (no external services)
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
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
              Deliverance Through Jesus Christ
            </p>
          </div>

          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
              You were never made to live by li<span className="italic">e</span>s.
            </h1>
          </div>

          <div
            className={`transform transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '360ms' }}
          >
            <div className="space-y-6 text-lg text-white/90 leading-relaxed">
              <p>Scamming and fraud promise freedom. They only bind you tighter.</p>
              <p>This is a spiritual trap. Only Jesus Christ sets you free.</p>
            </div>
          </div>

          <div
            className={`transform transition-all duration-700 pt-8 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '480ms' }}
          >
            <Link
              href="/deliverance"
              className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-gold focus:ring-offset-2 focus:ring-offset-rc-accent"
            >
              Request Deliverance
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE TRAP */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            The Tr<span className="italic">a</span>p
          </h2>
          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>You believe:</p>
            <p>This is just how I survive.</p>
            <p>I have no other way.</p>
            <p>God could never forgive me.</p>
            <p className="pt-4">That is deception speaking.</p>
            <p>You cannot break this chain by yourself.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE WITNESS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            The Witn<span className="italic">e</span>ss
          </h2>
          <div className="border-l-4 border-rc-gold pl-8 space-y-6 text-lg text-rc-text leading-relaxed">
            <p>I lived this life.</p>
            <p>I wanted to stop. I could not.</p>
            <p>Until Jesus found me.</p>
            <p>He broke my chains. He gave me a new life.</p>
            <p>I am not the answer. He is.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ONLY WAY */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            The Only W<span className="italic">a</span>y
          </h2>
          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>No amount of money, laws, or advice fixes this.</p>
            <p>Scamming is spiritual bondage.</p>
            <p>There is no cure outside Jesus Christ.</p>
            <p>He is still delivering people today.</p>
            <p>No one is too far gone.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE JOURNEY OUT */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            The Journey <span className="italic">O</span>ut
          </h2>

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
          <div className="md:hidden space-y-4">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
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

          <p className="text-lg text-rc-text leading-relaxed pt-8 border-t border-rc-text/10">
            You walk this path with support. Prayer, scripture, people who understand.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE NEW LIFE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            The New Lif<span className="italic">e</span>
          </h2>
          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>Deliverance is just the start.</p>
            <p>You will learn to work honestly.</p>
            <p>To live without fear.</p>
            <p>To build something that lasts.</p>
          </div>
        </div>
      </section>

      {/* BONUS: TESTIMONIALS (Before Final Call) */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-12">
          <div>
            <p className="text-sm font-medium text-rc-accent uppercase tracking-wide mb-2">Real Stories</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              P<span className="italic">e</span>ople Like You
            </h2>
          </div>

          <div className="grid gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-l-4 border-rc-gold pl-6 py-4 bg-white rounded-r"
              >
                <p className="text-lg text-rc-text italic mb-4 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-rc-text">
                  {testimonial.name}
                </p>
                <p className="text-xs text-rc-text-secondary">
                  {testimonial.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS: FAQ SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="border-b border-rc-border pb-4 last:border-b-0 group"
              >
                <summary className="text-lg font-medium text-rc-text cursor-pointer py-2 flex items-center justify-between hover:text-rc-accent transition-colors">
                  {faq.question}
                  <span className="text-rc-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-rc-text-secondary leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CALL */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-6 text-lg text-white/90 leading-relaxed">
            <p>Tired of living a lie?</p>
            <p>Ready to be free at last?</p>
            <p>Jesus is calling you home.</p>
          </div>

          <Link
            href="/deliverance"
            className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-gold focus:ring-offset-2 focus:ring-offset-rc-accent"
          >
            Request Deliverance
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-white/60 text-sm">
            Restoration Community — Jesus Christ Delivers
          </p>
          <p className="text-white/40 text-xs">
            © 2026. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

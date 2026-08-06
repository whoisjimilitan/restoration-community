'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

const stages = [
  { number: 1, name: 'Truth', description: 'See what is real' },
  { number: 2, name: 'Confession', description: 'Speak it aloud' },
  { number: 3, name: 'Repentance', description: 'Turn away' },
  { number: 4, name: 'Forgiveness', description: 'Receive grace' },
  { number: 5, name: 'Reconciliation', description: 'Restore connections' },
  { number: 6, name: 'Honest Work', description: 'Build something real' },
  { number: 7, name: 'Serving', description: 'Give back' },
];

export default function JourneyPage() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentStage = 1;
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="bg-rc-bg text-rc-text min-h-screen">
        <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <div className="h-4 bg-white/20 rounded w-32 animate-pulse"></div>
            <div className="h-12 bg-white/20 rounded w-64 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded w-48 animate-pulse"></div>
          </div>
        </section>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }


  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/journey/reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: currentStage, reflection }),
      });
      setReflection('');
    } catch (error) {
      console.error('Error saving reflection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO - Journey Timeline Visual */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-rc-bg px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto w-full">
          <div className={`transform transition-all duration-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
            <h1 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text mb-16">The Journey Out</h1>
          </div>

          {/* Horizontal Timeline */}
          <div className={`transform transition-all duration-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '80ms' }}>
            <div className="relative w-full pb-12">
              {/* Horizontal line */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-rc-accent to-rc-text"></div>

              {/* Stage circles */}
              <div className="relative flex justify-between items-start">
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.number}
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center flex-1"
                  >
                    {/* Circle */}
                    <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm mb-4" style={{
                      backgroundColor: `hsl(${168 + (index * 3)}, ${70 - (index * 3)}%, ${50 + (index * 2)}%)`,
                    }}>
                      {stage.number}
                    </div>

                    {/* Label */}
                    <p className="text-sm md:text-base font-medium text-rc-text text-center">{stage.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Support text */}
          <div className={`transform transition-all duration-600 mt-20 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '160ms' }}>
            <div className="space-y-4 border-t border-rc-border/30 pt-8 max-w-2xl">
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                You move through this divine journey with support.
              </p>
              <p className="text-base text-rc-text/70 font-light">
                Prayer. Encouragement. People who understand.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CURRENT STAGE REFLECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              This Week: {stages[currentStage - 1].name}
            </h2>
            <p className="text-base text-rc-text/70 font-light">
              {stages[currentStage - 1].description}
            </p>
          </div>

          <form onSubmit={handleReflectionSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-rc-text/70">
                Your Reflection
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What's coming up for you this week?"
                className="w-full px-4 py-4 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !reflection.trim()}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Reflection'}
            </button>
          </form>
        </motion.div>
      </section>

      {/* MENTOR CONNECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              Your Mentor
            </h2>
            <p className="text-base text-rc-text/70 font-light">
              Someone who's walked this path before you. Here to support, not judge.
            </p>
          </div>

          <div className="p-8 rounded-lg border border-rc-border/30 bg-rc-warm-gray">
            <p className="text-rc-text/60 font-light">
              Your mentor assignment is coming. You're not alone in this journey.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <a href="/" className="text-white/80 hover:text-white transition-colors group text-sm">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/stories" className="text-white/80 hover:text-white transition-colors group text-sm">
              Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <div className="text-white/40 group text-sm cursor-not-allowed">
              Gathering
              <span className="block h-px w-0 bg-white transition-all duration-300 mt-1"></span>
            </div>
            <div className="text-white/40 group text-sm cursor-not-allowed">
              Journey
              <span className="block h-px w-0 bg-white transition-all duration-300 mt-1"></span>
            </div>
          </div>
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

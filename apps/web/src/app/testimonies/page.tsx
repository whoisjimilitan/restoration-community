'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

interface StoryCard {
  id: string;
  name: string;
  role: string;
  stage: number;
  stageName: string;
  quote: string;
  story: string;
  heroImage?: { url: string; alt: string };
}

const mockStories: StoryCard[] = [
  {
    id: '1',
    name: 'Samuel Okafor',
    role: 'Entrepreneur',
    stage: 6,
    stageName: 'Honest Work',
    quote: 'From schemes to solid ground. Now I build businesses that last.',
    story: 'Seven years. Schemes upon schemes. Each one promised more. The money came. The status came. The chains came too.\n\nUntil one encounter with Jesus.\n\nNot reformation. Deliverance. The spirit that controlled him was cast out. His mind was freed to think differently. His hands were freed to build differently.\n\nNow he mentors others. The cycle reverses.\n\nThis is Stage 6: Honest Work.',
    heroImage: {
      url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%234DB5A6" width="400" height="400"/%3E%3Ccircle cx="200" cy="120" r="60" fill="%23ffffff" opacity="0.3"/%3E%3Crect x="80" y="200" width="240" height="160" fill="%23ffffff" opacity="0.2"/%3E%3Ctext x="200" y="310" font-size="24" fill="%23ffffff" text-anchor="middle" opacity="0.5"%3ESamuel Okafor%3C/text%3E%3C/svg%3E',
      alt: 'Samuel Okafor'
    }
  },
  {
    id: '2',
    name: 'Chioma Adeyemi',
    role: 'Social Worker',
    stage: 7,
    stageName: 'Service',
    quote: 'My past became my platform. Now I help others find their way out.',
    story: 'Trafficked at nineteen. Shame buried her voice. Years of silence. Years of believing lies. She thought she was the only one. She thought she deserved it.\n\nUntil Jesus spoke louder than shame.\n\nNot counseling healed her. Deliverance freed her. He didn\'t fix her trauma. He set her free from what caused it.\n\nNow she stands where she once hid. Now she calls others to freedom. Her story became her calling.\n\nThis is Stage 7: Service.',
    heroImage: {
      url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%231B7A6F" width="400" height="400"/%3E%3Ccircle cx="200" cy="120" r="60" fill="%23ffffff" opacity="0.3"/%3E%3Crect x="80" y="200" width="240" height="160" fill="%23ffffff" opacity="0.2"/%3E%3Ctext x="200" y="310" font-size="24" fill="%23ffffff" text-anchor="middle" opacity="0.5"%3EChioma Adeyemi%3C/text%3E%3C/svg%3E',
      alt: 'Chioma Adeyemi'
    }
  },
  {
    id: '3',
    name: 'Tunde Bankole',
    role: 'Student',
    stage: 4,
    stageName: 'Forgiveness',
    quote: 'I forgave the people who pulled me in. That freed me more than leaving ever could.',
    story: 'University student. Desperate for money. Trapped in scams. He thought leaving the network would be freedom. It wasn\'t. The shame remained. The voices remained.\n\nUntil he encountered forgiveness—not of himself, but of others.\n\nThe people who pulled him in. The friends who betrayed him. The network that promised family but delivered chains.\n\nHe forgave them. And in that moment, the final chain broke.\n\nHe learned: Holding bitterness keeps you enslaved. Forgiveness breaks the last chain.\n\nThis is Stage 4: Forgiveness. Most people get stuck here. This is where Jesus moves the deepest.',
    heroImage: {
      url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%2395DDD7" width="400" height="400"/%3E%3Ccircle cx="200" cy="120" r="60" fill="%23ffffff" opacity="0.3"/%3E%3Crect x="80" y="200" width="240" height="160" fill="%23ffffff" opacity="0.2"/%3E%3Ctext x="200" y="310" font-size="24" fill="%23ffffff" text-anchor="middle" opacity="0.5"%3ETunde Bankole%3C/text%3E%3C/svg%3E',
      alt: 'Tunde Bankole'
    }
  }
];

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<StoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await fetch('/api/testimonies');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const fetched = data.testimonies || [];
        // If we have real testimonies, use them; otherwise use mocks
        setTestimonies(fetched.length > 0 ? fetched : mockStories);
      } catch (error) {
        console.error('[TESTIMONIES] Error fetching page data:', error);
        // Fall back to mocks on error
        setTestimonies(mockStories);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  }, []);

  const StoryCard = ({ story }: { story: StoryCard }) => (
    <div className="w-full space-y-8 py-12 md:py-16">
      <div className="group grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image */}
        {story.heroImage && (
          <div className="md:order-2 aspect-square rounded-lg overflow-hidden bg-rc-text/5 border border-rc-border/20 group-hover:shadow-lg transition-all duration-300">
            <img
              src={story.heroImage.url}
              alt={story.heroImage.alt}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-6 md:order-1">
          <div className="space-y-3">
            <p className="text-sm font-medium text-rc-accent uppercase tracking-wide">
              Stage {story.stage} — {story.stageName}
            </p>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              {story.name}
            </h2>
            <p className="text-base text-rc-text/70">{story.role}</p>
          </div>

          <blockquote className="border-l-4 border-rc-accent pl-6">
            <p className="text-lg md:text-xl font-rc-serif italic text-rc-text leading-relaxed">
              &ldquo;{story.quote}&rdquo;
            </p>
          </blockquote>

          <div className="text-base text-rc-text/80 leading-relaxed font-light space-y-4">
            <p>{story.story}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const StoryItem = ({ story, idx }: { story: StoryCard; idx: number }) => {
    const { ref, controls, initial } = useScrollReveal(0.2);

    return (
      <motion.div
        key={story.id}
        ref={ref}
        initial={initial}
        animate={controls}
        className="pt-12 md:pt-16"
      >
        <StoryCard story={story} />
        {idx < testimonies.length - 1 && (
          <div className="mt-12 md:mt-16 border-t border-rc-border/20" />
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Stories of Freedom</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              These are not stories of shame.<br />They are stories of freedom.
            </h1>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }}>
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
              Deliverance is real. Watch what it looks like.
            </p>
          </div>
        </div>
      </section>

      {/* Bridge Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>You think transformation takes years.</p>
            <p>Some of these people walked the entire journey in months.</p>
            <p>Why? Because Jesus doesn't work on our timeline.</p>
            <p className="pt-2">You move through seven stages.</p>
            <p>These are real people, walking it right now.</p>
            <p>At different stages. With different struggles.</p>
            <p className="font-medium">All finding freedom through Jesus.</p>
          </div>
        </motion.div>
      </section>

      {/* Made Possible By Partners */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>These stories exist because partners answered the call.</p>
            <p>Individuals who believed. Organizations fueling the work.</p>
            <p className="text-rc-accent font-semibold">All making deliverance possible.</p>
          </div>
        </motion.div>
      </section>

      {/* Stories Grid */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-20">

          {/* Stories */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-rc-text/60">Loading stories...</p>
            </div>
          ) : testimonies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-rc-text/60 text-lg">Stories coming soon. Check back later.</p>
            </div>
          ) : (
            <div className="space-y-24 md:space-y-32 border-t border-rc-border/20">
              {testimonies.map((story, idx) => (
                <StoryItem key={story.id} story={story} idx={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bridge to Action Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>You see their journey. You recognize yourself in it.</p>
            <p className="pt-3">The journey starts with one encounter. One prayer. One honest decision before God.</p>
            <p className="pt-3">That's what happened to them. That's what can happen to you.</p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Your Deliverance Awaits
            </h2>
            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>Not salvation.</p>
              <p className="text-white/80 text-sm">(That's free.)</p>

              <p className="pt-2">Not counseling.</p>
              <p className="text-white/80 text-sm">(That helps behavior.)</p>

              <p className="pt-3 font-medium">Deliverance.</p>
              <p>Where the spirit controlling you is cast out.</p>
              <p className="font-medium">And freedom becomes real.</p>

              <p className="pt-3">This is what happened to Samuel.</p>
              <p>To Chioma.</p>
              <p>To Tunde.</p>

              <p className="pt-2">This is what can happen to you.</p>

              <p className="pt-4">Schedule your prayer encounter.</p>
              <p className="font-medium">One prayer.</p>
              <p>That's how it starts.</p>
            </div>
          </div>

          <button
            onClick={() => {
              const event = new CustomEvent('open-deliverance-modal');
              document.dispatchEvent(event);
            }}
            className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
          >
            Request Deliverance
          </button>

          <div className="pt-8 border-t border-white/20">
            <p className="text-xs font-medium text-white/60 uppercase tracking-widest mb-6">Or explore</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
              <a href="/" className="text-base text-white/80 hover:text-white transition-colors duration-200 group">
                Home
                <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-2"></span>
              </a>
              <a href="/partnership" className="text-base text-white/80 hover:text-white transition-colors duration-200 group">
                Our Partners
                <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-2"></span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="/"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/partnership"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Mission Partners
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/impact"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Our Impact
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>

          {/* Copyright Only */}
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

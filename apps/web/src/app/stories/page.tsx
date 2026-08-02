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
    quote: 'Seven years of my life in reverse. I thought money was everything. But it does not solve everything.',
    story: 'I was into all types of schemes. Dating, employment, trading. The money came fast. I had status. But I was always afraid.\n\nOne day, I prayed to Jesus. That night, I had a dream. A man came and broke a chain from my hands. When I woke up, I felt light. My mind cleared for the first time.\n\nNow I build real businesses. And I tell other young men: Don\'t do what I did. Jesus is better than the money.',
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
    quote: 'I stopped believing I deserved to live. Jesus convinced me otherwise.',
    story: 'I was nineteen when they trafficked me. Broken in ways I didn\'t know possible.\n\nFor years, I couldn\'t look at myself or others. The shame was so heavy. I believed I was ruined.\n\nOne day, alone, I cried and prayed. Jesus, if you\'re real, help me. That night, something shifted. This is not who you are.\n\nI started going to a church with other survivors. Jesus didn\'t erase what happened. But He healed what it broke inside me.\n\nNow I work with girls where I was. He healed me. He can heal you too.',
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
    quote: 'I thought leaving would free me. But forgiveness was what actually broke the chains.',
    story: 'I was at university with no money. My friends were making cash in easy ways. I got in deep. Dating scams, advance fraud. The money was real.\n\nI eventually left. But leaving didn\'t free me. The shame followed. The voices followed.\n\nSomeone told me: Forgive them. I didn\'t want to. But one day, I said their names and said: I forgive you.\n\nSomething broke open in me. The weight lifted. For the first time, I could breathe.\n\nYou can leave a place. But you\'re not free until you forgive the people who had you there.',
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
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Not stories of shame.
              <br />
              Stories of freedom.
            </h1>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }}>
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
              Real people. Real deliverance.
            </p>
          </div>
        </div>
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

      {/* Closing Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight tracking-tight">
            You are not stuck.
          </h2>

          <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
            <p>These three are free today.</p>
            <p>Because Jesus set them free.</p>

            <p className="pt-4">The same Jesus can set you free.</p>
          </div>

          <button
            onClick={() => {
              const event = new CustomEvent('open-deliverance-modal');
              document.dispatchEvent(event);
            }}
            className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text/70 font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300 tracking-wide"
          >
            REQUEST DELIVERANCE
          </button>
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
              href="/stories"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Stories of Deliverance
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/partnership"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Mission Partners
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

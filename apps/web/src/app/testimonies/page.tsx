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
    story: 'Samuel spent seven years caught in fraud networks across West Africa. The money came fast, but the spiritual weight was crushing. When he encountered the gospel, everything shifted. He abandoned the schemes overnight. Today, he runs a legitimate logistics business that employs fifteen people. He mentors younger entrepreneurs on sustainable growth.',
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
    story: 'Chioma was trafficked into fraud operations at nineteen. The shame kept her silent for five years. When she found freedom through deliverance prayer, she didn\'t just heal—she mobilized. She now runs a nonprofit supporting women exiting trafficking. She speaks at churches and universities. Her story has changed how twenty communities think about restoration.',
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
    story: 'Tunde started small—a university student looking for quick money. Within months, he was coordinating elaborate scams targeting elderly people abroad. The guilt became unbearable. He tried to quit but felt trapped by his crew. In a moment of desperation, he reached out to a pastor. The forgiveness message broke something open in him. He turned state\'s evidence, completed Stage 4 work on releasing bitterness, and is now studying accounting to build legitimate skills.',
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
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Real Stories</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              How Lives Have Changed
            </h1>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-5xl mx-auto">
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

      {/* Stats Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Impact</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">
              Transformation in Progress
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-3">
              <p className="text-3xl md:text-4xl font-bold text-rc-accent">{testimonies.length}</p>
              <p className="text-sm text-rc-text/70">Stories Shared</p>
            </div>
            <div className="text-center space-y-3">
              <p className="text-3xl md:text-4xl font-bold text-rc-accent">
                {testimonies.length > 0 ? Math.max(...testimonies.map((t) => t.stage)) : 7}
              </p>
              <p className="text-sm text-rc-text/70">Stages Represented</p>
            </div>
            <div className="text-center space-y-3">
              <p className="text-3xl md:text-4xl font-bold text-rc-accent">∞</p>
              <p className="text-sm text-rc-text/70">Potential Ahead</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              Your Story Could Be Next
            </h2>
            <p className="text-lg text-rc-text/70 leading-relaxed">
              Freedom is not a dream. It is a real outcome for real people.
            </p>
          </div>
          <button
            onClick={() => {
              const event = new CustomEvent('open-deliverance-modal');
              document.dispatchEvent(event);
            }}
            className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
          >
            Request Deliverance
          </button>

          <div className="pt-8 border-t border-rc-border/40">
            <p className="text-xs font-medium text-rc-text/60 uppercase tracking-widest mb-6">Explore</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
              <a href="/" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
                Home
                <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
              </a>
              <a href="/partnership" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
                Our Partners
                <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

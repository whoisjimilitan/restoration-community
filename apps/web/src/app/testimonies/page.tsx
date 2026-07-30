'use client';

import { useEffect, useState } from 'react';
import { TestimonyCard } from '@/components/TestimonyCard';
import { FormattedTestimony } from '@/lib/testimony-helpers';

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<FormattedTestimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await fetch('/api/testimonies');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTestimonies(data.testimonies || []);
      } catch (error) {
        console.error('[TESTIMONIES] Error fetching page data:', error);
        setTestimonies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  }, []);

  return (
    <div className="bg-white text-rc-text">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="animate-fade-in-up">
            <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Transformation Stories</p>
            <h1 className="text-4xl md:text-6xl font-rc-serif font-bold text-white leading-tight mt-3">
              Their Lives Are Changing Now
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed pt-4">
              Real people who met Jesus and left fraud. Real transformation happening.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-bg">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-rc-text/60">Loading stories...</p>
            </div>
          ) : testimonies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-rc-text/60 text-lg">Stories coming soon. Check back later.</p>
            </div>
          ) : (
            <div className="space-y-32 md:space-y-40">
              {testimonies.map((testimony, idx) => (
                <div
                  key={testimony.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {idx % 2 === 0 ? (
                    <TestimonyCard testimony={testimony} variant="featured" />
                  ) : (
                    <TestimonyCard testimony={testimony} variant="featured" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      {testimonies.length > 0 && (
        <section className="w-full py-16 md:py-20 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-rc-serif font-bold text-white">
                  {testimonies.length}
                </p>
                <p className="text-white/60 text-sm mt-2">Lives Transformed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-rc-serif font-bold text-white">
                  {Math.max(...testimonies.map((t) => t.stage))}
                </p>
                <p className="text-white/60 text-sm mt-2">Stages Represented</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-rc-serif font-bold text-white">
                  {testimonies.length > 3 ? 'Many' : 'Growing'}
                </p>
                <p className="text-white/60 text-sm mt-2">Community Supported</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-white border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">
            Be Part of This Movement
          </h2>
          <p className="text-lg text-rc-text/70 leading-relaxed">
            These transformations happen through partnership and prayer. Stand with those finding freedom in Christ.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const event = new CustomEvent('open-partnership-modal');
                document.dispatchEvent(event);
              }}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Partnership Inquiry
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-rc-accent font-medium border-2 border-rc-accent rounded-lg hover:bg-rc-accent/5 transition-all duration-200"
            >
              Back to Home
            </a>
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

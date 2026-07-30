'use client';

import { FormattedTestimony } from '@/lib/testimony-helpers';

interface TestimonyCardProps {
  testimony: FormattedTestimony;
  variant?: 'default' | 'featured' | 'compact';
}

export function TestimonyCard({
  testimony,
  variant = 'default',
}: TestimonyCardProps) {
  if (variant === 'featured') {
    return (
      <div className="w-full space-y-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          {testimony.heroImage && (
            <div className="md:order-2 aspect-square rounded-lg overflow-hidden bg-rc-text/5">
              <img
                src={testimony.heroImage.url}
                alt={testimony.heroImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-6 md:order-1">
            <div className="space-y-2">
              <p className="text-sm font-medium text-rc-accent uppercase tracking-wide">
                Stage {testimony.stage} — {testimony.stageName}
              </p>
              <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">
                {testimony.name}
              </h2>
              <p className="text-base text-rc-text/70">{testimony.role}</p>
            </div>

            <blockquote className="space-y-4 border-l-4 border-rc-accent pl-6">
              <p className="text-lg md:text-xl font-rc-serif italic text-rc-text leading-relaxed">
                &ldquo;{testimony.quote}&rdquo;
              </p>
            </blockquote>

            <div className="text-base text-rc-text/80 leading-relaxed font-light space-y-4">
              <p>{testimony.story}</p>
            </div>

            {testimony.proofImages.length > 0 && (
              <div className="pt-6 border-t border-rc-border">
                <p className="text-sm font-medium text-rc-text/60 mb-4">Transformation Gallery</p>
                <div className="grid grid-cols-3 gap-3">
                  {testimony.proofImages.slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={img.alt}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-rc-bg rounded-lg border border-rc-border p-6 hover:border-rc-accent transition-colors">
        <div className="flex gap-4">
          {testimony.heroImage && (
            <img
              src={testimony.heroImage.url}
              alt={testimony.heroImage.alt}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="space-y-1">
              <p className="font-medium text-rc-text truncate">{testimony.name}</p>
              <p className="text-sm text-rc-text/60">{testimony.role}</p>
              <p className="text-xs font-medium text-rc-accent">Stage {testimony.stage}</p>
            </div>
            <p className="text-sm text-rc-text/70 mt-3 line-clamp-2">&ldquo;{testimony.quote}&rdquo;</p>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - full testimonial card
  return (
    <div className="w-full bg-white rounded-lg border border-rc-border overflow-hidden hover:shadow-md transition-shadow">
      {/* Hero Image */}
      {testimony.heroImage && (
        <div className="w-full aspect-video relative overflow-hidden bg-rc-text/5">
          <img
            src={testimony.heroImage.url}
            alt={testimony.heroImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        <div className="space-y-2 mb-6">
          <p className="text-xs font-medium text-rc-accent uppercase tracking-widest">
            Stage {testimony.stage} — {testimony.stageName}
          </p>
          <h3 className="text-2xl font-rc-serif font-bold text-rc-text">{testimony.name}</h3>
          <p className="text-sm text-rc-text/70">{testimony.role}</p>
        </div>

        <blockquote className="mb-6">
          <p className="text-lg font-rc-serif italic text-rc-text leading-relaxed">
            &ldquo;{testimony.quote}&rdquo;
          </p>
        </blockquote>

        <p className="text-base text-rc-text/80 leading-relaxed font-light line-clamp-3 mb-6">
          {testimony.story}
        </p>

        {testimony.proofImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {testimony.proofImages.slice(0, 2).map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.alt}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

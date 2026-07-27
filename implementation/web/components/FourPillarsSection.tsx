'use client';

/**
 * Four Pillars Section - Core Platform Identity
 *
 * Governance Foundation:
 * - Book Four: Platform organized around four experiences
 * - First interaction requirement: communicate all four pillars
 */

interface Pillar {
  id: string;
  title: string;
  feeling: string;
  description: string;
  details?: string[];
}

const pillars: Pillar[] = [
  {
    id: 'community',
    title: 'Community',
    feeling: 'I belong',
    description: 'You are not alone. The Restoration Community is a place of genuine Christian fellowship, prayer, and encouragement.',
    details: [
      'Connect with people who understand your journey',
      'Experience genuine Christian community',
      'Receive prayer and encouragement',
    ],
  },
  {
    id: 'journey',
    title: 'Journey',
    feeling: 'I am growing',
    description: 'Restoration follows a clear path of seven stages. Each step strengthens your faith and draws you closer to honest work and living.',
    details: [
      'Truth: Face what is real',
      'Confession: Acknowledge what has happened',
      'Repentance: Choose a new direction',
      'Forgiveness: Receive grace',
      'Reconciliation: Restore relationships',
      'Honest Work: Build dignified life',
      'Service: Help others grow',
    ],
  },
  {
    id: 'mentoring',
    title: 'Mentoring',
    feeling: 'I am not walking alone',
    description: 'You are paired with someone who has walked this path before. They listen, pray, encourage, and hold you accountable with grace.',
    details: [
      'Personal mentoring relationship',
      'Accountability with compassion',
      'Prayer and spiritual guidance',
      'Someone to walk alongside you',
    ],
  },
  {
    id: 'service',
    title: 'Service',
    feeling: 'My restored life can bless others',
    description: 'As you experience restoration, you become someone who helps others. Your journey is not just about you—it is about offering hope to others.',
    details: [
      'Discover how your restoration can serve',
      'Help others in their journey',
      'Find purpose through serving',
      'Build a culture of care',
    ],
  },
];

export default function FourPillarsSection() {
  return (
    <section id="pillars" className="w-full section-padding bg-rc-cream-light">
      <div className="container-max">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-headline-md mb-6">How Restoration Happens</h2>
          <p className="text-body-lg text-rc-medium-gray">
            The platform supports you through four interconnected experiences. Together, they create the environment where true restoration takes place.
          </p>
        </div>

        {/* Four Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="card">
              {/* Pillar Heading */}
              <div className="mb-4">
                <h3 className="text-card-title font-serif font-bold text-rc-charcoal mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm font-semibold text-rc-teal uppercase tracking-wide">
                  {pillar.feeling}
                </p>
              </div>

              {/* Description */}
              <p className="text-body-md mb-6 text-rc-charcoal">
                {pillar.description}
              </p>

              {/* Details List */}
              {pillar.details && (
                <ul className="space-y-3">
                  {pillar.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-rc-teal font-bold text-lg flex-shrink-0 leading-none">•</span>
                      <span className="text-body-sm text-rc-medium-gray">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Connection Statement */}
        <div className="p-8 rounded-lg bg-rc-cream border-l-4 border-rc-teal">
          <p className="text-body-lg text-rc-charcoal">
            These four pillars are not separate. They work together. Community supports your journey. Your mentor walks alongside you. Service flows from restoration. All of it points back to Jesus Christ, who is the source and sustainer of all restoration.
          </p>
        </div>
      </div>
    </section>
  );
}

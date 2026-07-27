'use client';

const communityElements = [
  { title: 'Mentors', description: 'Guided by people who understand the restoration journey.' },
  { title: 'Prayer', description: 'Supported through faithful prayer as you seek Jesus Christ.' },
  { title: 'Scripture', description: 'Grounded in the unchanging truth of God\'s Word.' },
];

export default function CommunitySection() {
  return (
    <section id="community" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-12">
        <div className="space-y-16">
          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
              You won&apos;t walk alone.
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-3xl space-y-8 md:space-y-10 text-lg md:text-xl text-rc-text leading-relaxed font-light">
            <p>
              Truth was never meant to be walked alone. Mentors. Prayer. Scripture. Honest conversations. Faithful encouragement. Real relationships.
            </p>
            <p>
              Not because community replaces Christ. Because Christ often restores people through His people.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {communityElements.map((element, index) => (
              <div
                key={index}
                className="group p-8 md:p-10 border border-rc-border bg-rc-warm-gray/40 rounded-lg hover:border-rc-accent hover:bg-rc-gold-light/20 transition-all duration-300"
              >
                <h3 className="text-xl font-serif font-bold text-rc-text mb-4 group-hover:text-rc-accent transition-colors">
                  {element.title}
                </h3>
                <p className="text-rc-text-secondary text-base leading-relaxed">
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

const communityElements = [
  { title: 'Mentors', description: 'Guided by people who understand the restoration journey.' },
  { title: 'Prayer', description: 'Supported through faithful prayer as you seek Jesus Christ.' },
  { title: 'Scripture', description: 'Grounded in the unchanging truth of God\'s Word.' },
];

export default function CommunitySection() {
  return (
    <section id="community" className="section">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-32 md:py-48">
        <div className="space-y-24">
          {/* Heading */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight">
              You won&apos;t walk alone.
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-4xl space-y-12 md:space-y-16 text-lg md:text-2xl text-rc-text leading-relaxed font-light">
            <p>
              Truth was never meant to be walked alone. Mentors. Prayer. Scripture. Honest conversations. Faithful encouragement. Real relationships.
            </p>
            <p>
              Not because community replaces Christ. Because Christ often restores people through His people.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {communityElements.map((element, index) => (
              <div
                key={index}
                className="group p-10 md:p-12 border border-rc-border bg-transparent rounded-lg hover:border-rc-accent transition-all duration-300"
              >
                <h3 className="text-2xl font-serif font-bold text-rc-text mb-6 group-hover:text-rc-accent transition-colors">
                  {element.title}
                </h3>
                <p className="text-rc-text-secondary text-lg leading-relaxed">
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

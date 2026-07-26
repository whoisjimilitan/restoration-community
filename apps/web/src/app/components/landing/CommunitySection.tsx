'use client';

const communityElements = [
  { title: 'Mentors', description: 'Guided by those who have walked the restoration journey' },
  { title: 'Prayer', description: 'Held in the prayers of a community that believes in transformation' },
  { title: 'Scripture', description: 'Grounded in the unchanging truth of God\'s Word' },
];

export default function CommunitySection() {
  return (
    <section id="community" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-12">
          {/* Heading */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              Walking the Journey Together
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-2xl space-y-4 text-lg text-rc-text">
            <p>
              Mentors. Prayer. Scripture. Honest conversations. Faithful encouragement. Real relationships.
            </p>
            <p>
              Not because community replaces Christ.
            </p>
            <p>
              Because Christ often restores people through His people.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {communityElements.map((element, index) => (
              <div
                key={index}
                className="p-6 md:p-8 border border-rc-text/10 rounded-lg hover:border-rc-accent/30 transition-colors duration-200 bg-white/30"
              >
                <h3 className="text-lg font-medium text-rc-text mb-3">{element.title}</h3>
                <p className="text-rc-text-secondary">{element.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

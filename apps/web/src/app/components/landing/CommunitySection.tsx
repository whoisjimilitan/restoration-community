'use client';

const communityElements = [
  { title: 'Mentors', description: 'Guided by those who have walked the restoration journey' },
  { title: 'Prayer', description: 'Held in the prayers of a community that believes in transformation' },
  { title: 'Scripture', description: 'Grounded in the unchanging truth of God\'s Word' },
];

export default function CommunitySection() {
  return (
    <section id="community" className="w-full py-24 md:py-32 bg-gradient-to-b from-rc-bg to-rc-cream-light border-t border-rc-accent/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-14">
          {/* Heading */}
          <div className="max-w-2xl space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-[1.15] tracking-[-0.01em]">
              Restoration was never meant to happen alone.
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-2xl space-y-5 text-base md:text-lg text-rc-text leading-[1.75] tracking-[-0.005em]">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-14">
            {communityElements.map((element, index) => (
              <div
                key={index}
                className="p-8 border border-rc-accent/15 rounded-lg transition-all duration-300 bg-white hover:bg-rc-accent/5 hover:border-rc-accent/40 hover:shadow-[0_8px_24px_rgba(15,118,110,0.08)] group"
              >
                <h3 className="text-base font-semibold text-rc-text mb-4 tracking-[0.01em] group-hover:text-rc-accent transition-colors duration-200">
                  {element.title}
                </h3>
                <p className="text-sm text-rc-text/80 leading-[1.65] tracking-[-0.003em]">
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

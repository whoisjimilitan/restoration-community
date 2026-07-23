'use client';

export default function CommunitySection() {
  return (
    <section id="community" className="w-full bg-rc-bg border-t border-rc-text/5">
      {/* SCENE SIX: Community — Humanity, not features. People, listening, prayer. */}
      <div className="min-h-screen md:min-h-[95vh] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-32 md:py-0">
        <div className="max-w-2xl mx-auto">
          {/* Heading — question form */}
          <div className="mb-20 md:mb-28">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
              Restoration was never meant to happen alone.
            </h2>
          </div>

          {/* Elements not as cards, but as quiet statements about people */}
          <div className="space-y-16 md:space-y-20">
            {/* What the community is — described through action, not features */}
            <div className="border-l-2 border-rc-accent pl-6 md:pl-8">
              <h3 className="text-base md:text-lg font-medium text-rc-accent uppercase tracking-wide mb-3">Mentors</h3>
              <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
                Guided by those who have walked this path before. Not experts. Companions.
              </p>
            </div>

            <div className="border-l-2 border-rc-accent pl-6 md:pl-8">
              <h3 className="text-base md:text-lg font-medium text-rc-accent uppercase tracking-wide mb-3">Prayer</h3>
              <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
                Held in the prayers of a community that believes transformation is possible.
              </p>
            </div>

            <div className="border-l-2 border-rc-accent pl-6 md:pl-8">
              <h3 className="text-base md:text-lg font-medium text-rc-accent uppercase tracking-wide mb-3">Scripture</h3>
              <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
                Grounded in the unchanging truth of God&apos;s Word. The foundation never shifts.
              </p>
            </div>

            <div className="pt-12 md:pt-16 border-t border-rc-text/10">
              <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg">
                Not because community replaces Christ.
              </p>
              <p className="text-base md:text-lg text-rc-text leading-relaxed max-w-lg mt-4">
                Because Christ often restores people through His people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

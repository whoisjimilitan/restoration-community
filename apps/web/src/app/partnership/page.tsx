'use client';

export default function PartnershipPage() {
  const foundingRestorers = [
    { name: 'Grace Foundation', id: 'grace' },
    { name: 'Restoration House', id: 'restoration' },
  ];

  const standingPartners = [
    { name: 'New Life Foundation', id: 'newlife' },
    { name: 'Redemption Network', id: 'redemption' },
    { name: 'Spirit of Deliverance', id: 'spirit' },
    { name: 'Hope Africa Initiative', id: 'hope' },
    { name: 'Freedom Coalition', id: 'freedom' },
  ];

  const prayerPartners = [
    { name: 'Humble Hands', id: 'humble' },
    { name: 'Believers Together', id: 'believers' },
    { name: 'Called Home', id: 'called' },
    { name: 'Truth Carriers', id: 'truth' },
    { name: 'Grateful Hearts', id: 'grateful' },
    { name: 'Gospel Share', id: 'gospel' },
    { name: 'Rising Again', id: 'rising' },
  ];

  const LogoSvg = ({ id }: { id: string }) => {
    const logos: Record<string, React.ReactNode> = {
      grace: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <text x="50" y="35" fontSize="24" fontWeight="bold" textAnchor="middle" className="fill-rc-text/80">G</text>
          <line x1="30" y1="50" x2="70" y2="50" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      restoration: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="35" y="30" width="30" height="30" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <path d="M 50 60 Q 40 70, 50 80 Q 60 70, 50 60" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      newlife: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="45" r="8" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <path d="M 50 53 L 45 65 L 55 65 Z" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <path d="M 42 58 L 35 70 M 58 58 L 65 70" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      redemption: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="35" cy="50" r="8" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <circle cx="50" cy="40" r="8" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <circle cx="65" cy="50" r="8" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <line x1="42" y1="48" x2="43" y2="41" strokeWidth="2" className="stroke-rc-text/80" />
          <line x1="57" y1="42" x2="58" y2="48" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      spirit: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M 50 25 Q 40 35, 40 45 Q 40 60, 50 70 Q 60 60, 60 45 Q 60 35, 50 25" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      hope: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M 30 55 L 50 35 L 70 55 L 65 55 L 65 70 L 35 70 L 35 55 Z" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <circle cx="50" cy="50" r="5" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      freedom: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <path d="M 50 30 L 55 45 L 70 45 L 57 55 L 62 70 L 50 60 L 38 70 L 43 55 L 30 45 L 45 45 Z" fill="none" strokeWidth="1.5" className="stroke-rc-text/80" />
        </svg>
      ),
      humble: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M 40 50 L 50 60 L 60 50 M 40 50 L 35 60 L 50 70 L 65 60 L 60 50" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      believers: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="35" cy="45" r="10" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <circle cx="65" cy="45" r="10" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <circle cx="50" cy="65" r="10" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <line x1="42" y1="50" x2="50" y2="58" strokeWidth="1.5" className="stroke-rc-text/80" />
          <line x1="58" y1="50" x2="50" y2="58" strokeWidth="1.5" className="stroke-rc-text/80" />
        </svg>
      ),
      called: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="35" y="40" width="30" height="25" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <circle cx="85" cy="25" r="8" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <path d="M 78 32 L 85 25 L 92 32" fill="none" strokeWidth="1.5" className="stroke-rc-text/80" />
        </svg>
      ),
      truth: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M 50 20 L 70 40 L 50 50 L 30 40 Z" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <line x1="50" y1="50" x2="50" y2="75" strokeWidth="2" className="stroke-rc-text/80" />
        </svg>
      ),
      grateful: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M 50 35 L 58 48 L 72 50 L 60 60 L 63 74 L 50 68 L 37 74 L 40 60 L 28 50 L 42 48 Z" fill="none" strokeWidth="1.5" className="stroke-rc-text/80" />
        </svg>
      ),
      gospel: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <rect x="30" y="35" width="40" height="40" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <line x1="50" y1="35" x2="50" y2="75" strokeWidth="1.5" className="stroke-rc-text/80" />
          <line x1="30" y1="55" x2="70" y2="55" strokeWidth="1.5" className="stroke-rc-text/80" />
        </svg>
      ),
      rising: (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <path d="M 70 65 L 50 35 L 30 65" fill="none" strokeWidth="2" className="stroke-rc-text/80" />
          <path d="M 50 35 L 50 20 M 45 28 L 50 20 L 55 28" fill="none" strokeWidth="1.5" className="stroke-rc-text/80" />
        </svg>
      ),
    };
    return logos[id] || null;
  };

  const LogoCard = ({ name, id }: { name: string; id: string }) => (
    <a href={`#${id}`} className="group flex flex-col items-center justify-center p-6 rounded-lg bg-white border border-rc-border/20 hover:border-rc-accent/40 hover:shadow-md transition-all duration-300 min-h-[200px]">
      <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
        <LogoSvg id={id} />
      </div>
      <p className="text-center text-sm font-medium text-rc-text/70 group-hover:text-rc-text transition-colors duration-300">{name}</p>
    </a>
  );

  return (
    <div className="bg-white text-rc-text">
      {/* Hero */}
      <section className="w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Those Who Believe</p>
          <h1 className="text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight">These Are Partners</h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">Reaching the unreached. Deliverance is free because they believe in this work.</p>
        </div>
      </section>

      {/* Founding Restorers */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Founding Restorers</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Standing with us from the beginning</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {foundingRestorers.map((partner) => (
              <LogoCard key={partner.id} name={partner.name} id={partner.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Standing Partners */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Standing Partners</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Walking with us in freedom</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {standingPartners.map((partner) => (
              <LogoCard key={partner.id} name={partner.name} id={partner.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Partners */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Prayer Partners</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Interceding for transformation</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {prayerPartners.map((partner) => (
              <LogoCard key={partner.id} name={partner.name} id={partner.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed">You see the problem Jesus is looking at.</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed">You see the solution He is offering.</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed">You want His work to spread.</p>
            </div>
            <p className="text-base text-rc-text/70 pt-2">That's partnership.</p>
            <button
              onClick={() => {
                const email = 'james@saintandstory.co.uk';
                const subject = 'I want to explore partnership with Brother Jimi Ministries';
                const body = 'Hello,\n\nI see what you see. I believe Jesus delivers. I want His work to spread.\n\nLet\'s talk about partnership.\n\nThanks';
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
              className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-rc-accent font-medium border-2 border-rc-accent rounded-lg hover:bg-rc-accent/5 transition-all duration-200"
            >
              Start a Conversation
            </button>
          </div>

          <div className="pt-8 border-t border-rc-border/40">
            <p className="text-xs font-medium text-rc-text/60 uppercase tracking-widest mb-6">Explore</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
              <a href="/" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
                Home
                <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
              </a>
              <a href="/testimonies" className="text-base text-rc-text/80 hover:text-rc-text transition-colors duration-200 group">
                Success Stories
                <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-2"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

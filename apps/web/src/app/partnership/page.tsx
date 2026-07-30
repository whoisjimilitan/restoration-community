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
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="graceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="50" fill="none" stroke="url(#graceGrad)" strokeWidth="2" />
          <circle cx="60" cy="60" r="40" fill="none" stroke="#4DB5A6" strokeWidth="1.5" opacity="0.6" />
          <circle cx="60" cy="60" r="30" fill="none" stroke="#4DB5A6" strokeWidth="1" opacity="0.4" />
          <circle cx="60" cy="60" r="8" fill="#4DB5A6" opacity="0.3" />
        </svg>
      ),
      restoration: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="restGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
          </defs>
          <rect x="40" y="30" width="40" height="40" fill="none" stroke="url(#restGrad)" strokeWidth="2.5" />
          <path d="M 60 70 L 50 85 L 60 80 L 70 85 Z" fill="#4DB5A6" opacity="0.7" />
          <line x1="45" y1="55" x2="75" y2="55" stroke="#4DB5A6" strokeWidth="1.5" opacity="0.5" />
        </svg>
      ),
      newlife: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="lifeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#95DDD7" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="70" rx="12" ry="18" fill="url(#lifeGrad)" opacity="0.8" />
          <path d="M 50 50 Q 50 40, 60 35 Q 70 40, 70 50" fill="none" stroke="#4DB5A6" strokeWidth="2.5" />
          <path d="M 45 65 L 35 80 M 75 65 L 85 80" stroke="#4DB5A6" strokeWidth="2" opacity="0.6" />
        </svg>
      ),
      redemption: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="redemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="50" r="12" fill="none" stroke="url(#redemGrad)" strokeWidth="2" />
          <circle cx="60" cy="35" r="12" fill="none" stroke="#4DB5A6" strokeWidth="2" opacity="0.8" />
          <circle cx="80" cy="50" r="12" fill="none" stroke="url(#redemGrad)" strokeWidth="2" />
          <path d="M 50 45 L 55 38 M 70 38 L 75 45" stroke="#4DB5A6" strokeWidth="1.5" opacity="0.6" />
          <path d="M 65 50 L 80 70 M 55 50 L 40 70" stroke="#4DB5A6" strokeWidth="1.5" opacity="0.5" />
        </svg>
      ),
      spirit: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="spiritGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
          </defs>
          <path d="M 60 20 Q 45 35, 45 50 Q 45 70, 60 85 Q 75 70, 75 50 Q 75 35, 60 20" fill="url(#spiritGrad)" opacity="0.8" />
          <path d="M 60 30 Q 50 40, 50 50 Q 50 65, 60 75 Q 70 65, 70 50 Q 70 40, 60 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
        </svg>
      ),
      hope: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="hopeGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
          </defs>
          <path d="M 30 65 L 60 35 L 90 65 L 80 65 L 80 85 L 40 85 L 40 65 Z" fill="url(#hopeGrad)" opacity="0.7" />
          <circle cx="60" cy="60" r="8" fill="white" opacity="0.5" />
          <path d="M 60 50 L 60 70" stroke="#1B7A6F" strokeWidth="1.5" opacity="0.6" />
        </svg>
      ),
      freedom: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="freedomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="35" fill="none" stroke="url(#freedomGrad)" strokeWidth="2.5" />
          <path d="M 60 25 L 68 48 L 92 48 L 72 62 L 80 85 L 60 70 L 40 85 L 48 62 L 28 48 L 52 48 Z" fill="#4DB5A6" opacity="0.7" />
        </svg>
      ),
      humble: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="humbleGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#95DDD7" />
            </linearGradient>
          </defs>
          <path d="M 55 35 L 60 50 L 65 35 L 75 55 L 65 65 L 75 85 L 60 72 L 45 85 L 55 65 L 45 55 Z" fill="url(#humbleGrad)" opacity="0.7" />
          <path d="M 60 55 L 50 72 M 60 55 L 70 72" stroke="white" strokeWidth="1.5" opacity="0.4" />
        </svg>
      ),
      believers: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="believersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="45" r="14" fill="none" stroke="url(#believersGrad)" strokeWidth="2" />
          <circle cx="80" cy="45" r="14" fill="none" stroke="#4DB5A6" strokeWidth="2" opacity="0.8" />
          <circle cx="60" cy="70" r="14" fill="none" stroke="url(#believersGrad)" strokeWidth="2" />
          <path d="M 48 55 Q 60 62, 72 55 M 48 55 L 52 65 M 72 55 L 68 65" stroke="#4DB5A6" strokeWidth="1.5" opacity="0.6" />
        </svg>
      ),
      called: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="calledGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
          </defs>
          <rect x="35" y="45" width="50" height="35" fill="none" stroke="url(#calledGrad)" strokeWidth="2.5" rx="2" />
          <path d="M 45 65 L 60 55 L 75 65" fill="url(#calledGrad)" opacity="0.6" />
          <circle cx="85" cy="30" r="10" fill="none" stroke="#4DB5A6" strokeWidth="2" />
          <path d="M 78 38 L 85 30 L 92 38" stroke="#4DB5A6" strokeWidth="1.5" />
        </svg>
      ),
      truth: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="truthGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
          </defs>
          <path d="M 60 15 L 85 40 L 60 55 L 35 40 Z" fill="url(#truthGrad)" opacity="0.7" />
          <line x1="60" y1="55" x2="60" y2="90" stroke="#4DB5A6" strokeWidth="3" />
          <circle cx="60" cy="95" r="5" fill="#4DB5A6" opacity="0.5" />
        </svg>
      ),
      grateful: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="gratefulGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
          </defs>
          <path d="M 60 30 L 70 50 L 90 53 L 73 68 L 79 88 L 60 75 L 41 88 L 47 68 L 30 53 L 50 50 Z" fill="url(#gratefulGrad)" opacity="0.8" />
          <path d="M 60 40 L 68 55 L 83 57 L 70 66 L 75 80 L 60 71 L 45 80 L 50 66 L 37 57 L 52 55 Z" fill="white" opacity="0.3" />
        </svg>
      ),
      gospel: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="gospelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
          </defs>
          <rect x="30" y="35" width="60" height="55" fill="url(#gospelGrad)" opacity="0.7" rx="3" />
          <line x1="60" y1="35" x2="60" y2="90" stroke="white" strokeWidth="2" opacity="0.5" />
          <line x1="30" y1="60" x2="90" y2="60" stroke="white" strokeWidth="2" opacity="0.5" />
          <circle cx="60" cy="45" r="4" fill="white" opacity="0.6" />
          <circle cx="60" cy="75" r="4" fill="white" opacity="0.4" />
          <path d="M 45 50 L 55 48 M 65 48 L 75 50" stroke="white" strokeWidth="1" opacity="0.3" />
        </svg>
      ),
      rising: (
        <svg viewBox="0 0 120 120" className="w-16 h-16">
          <defs>
            <linearGradient id="risingGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#95DDD7" />
            </linearGradient>
          </defs>
          <path d="M 85 75 L 60 35 L 35 75 Z" fill="url(#risingGrad)" opacity="0.7" />
          <path d="M 60 30 L 60 12 M 52 22 L 60 12 L 68 22" stroke="#4DB5A6" strokeWidth="2.5" />
          <path d="M 70 60 L 50 60 M 55 50 L 45 60 L 55 70" fill="#4DB5A6" opacity="0.4" />
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
        <div className="max-w-2xl mx-auto space-y-8 text-center">
          <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Those Who Believe</p>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">You see the problem Jesus is looking at.</p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">You see the solution He is offering.</p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">You want His work to spread.</p>
          </div>
          <p className="text-base text-white/80 pt-4">These are our partners.</p>
        </div>
      </section>

      {/* Founding Partners */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Founding Partners</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">They saw this needed to happen.</h2>
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
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">They fuel this work today.</h2>
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
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">They lift this work to heaven.</h2>
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
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-base md:text-lg font-medium text-rc-text">Partnership is believing what we believe.</p>
              <p className="text-base md:text-lg text-rc-text/80 leading-relaxed">
                It's funding deliverance. It's saying "Yes, Jesus delivers. I want that work to spread."
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base text-rc-text/70">If that's you, let's talk.</p>
              <p className="text-sm text-rc-text/60">Reach out—we'll discuss what partnership looks like.</p>
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

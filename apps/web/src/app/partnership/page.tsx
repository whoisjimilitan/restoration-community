'use client';

export default function PartnershipPage() {
  const foundingPartners = [
    { name: 'Grace & Truth Foundation', id: 'grace' },
    { name: 'Restoration House International', id: 'restoration' },
  ];

  const standingPartners = [
    { name: 'New Life Collective', id: 'newlife' },
    { name: 'Redemption Alliance', id: 'redemption' },
    { name: 'Deliverance Spirit Foundation', id: 'spirit' },
    { name: 'Hope Rising Africa', id: 'hope' },
    { name: 'Freedom Forward', id: 'freedom' },
  ];

  const prayerPartners = [
    { name: 'Humble Hands Ministry', id: 'humble' },
    { name: 'Believers United', id: 'believers' },
    { name: 'Called Home Fellowship', id: 'called' },
    { name: 'Truth Bearers Collective', id: 'truth' },
    { name: 'Grateful Hearts Foundation', id: 'grateful' },
    { name: 'Gospel Shared', id: 'gospel' },
    { name: 'Rising Again Ministries', id: 'rising' },
  ];

  const LogoSvg = ({ id }: { id: string }) => {
    const logos: Record<string, React.ReactNode> = {
      grace: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="graceLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
            <filter id="logoShadow1"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <rect x="10" y="15" width="60" height="90" fill="url(#graceLogo)" filter="url(#logoShadow1)" rx="4" opacity="0.95" />
          <text x="40" y="65" fontSize="32" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="serif">G</text>
          <text x="85" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Grace &amp;</text>
          <text x="85" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Truth</text>
          <text x="85" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">FOUNDATION</text>
        </svg>
      ),
      restoration: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="restLogo" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#95DDD7" />
            </linearGradient>
            <filter id="logoShadow2"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <circle cx="40" cy="60" r="35" fill="url(#restLogo)" filter="url(#logoShadow2)" opacity="0.95" />
          <path d="M 35 45 L 45 60 L 35 75" fill="white" opacity="0.6" />
          <path d="M 45 45 L 55 60 L 45 75" fill="white" opacity="0.8" />
          <text x="105" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Restoration</text>
          <text x="105" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">House</text>
          <text x="105" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">INTERNATIONAL</text>
        </svg>
      ),
      newlife: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="lifeLogo" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#95DDD7" />
            </linearGradient>
            <filter id="logoShadow3"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <ellipse cx="40" cy="70" rx="18" ry="28" fill="url(#lifeLogo)" filter="url(#logoShadow3)" opacity="0.95" />
          <path d="M 30 45 Q 40 35, 50 45" fill="none" stroke="white" strokeWidth="2.5" opacity="0.7" />
          <path d="M 25 65 L 15 85 M 55 65 L 65 85" stroke="#4DB5A6" strokeWidth="2" opacity="0.6" />
          <text x="100" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">New Life</text>
          <text x="100" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Collective</text>
          <text x="100" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">GROWTH &amp; RENEWAL</text>
        </svg>
      ),
      redemption: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="redemLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
            <filter id="logoShadow4"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <circle cx="25" cy="55" r="12" fill="url(#redemLogo)" filter="url(#logoShadow4)" opacity="0.9" />
          <circle cx="40" cy="40" r="12" fill="url(#redemLogo)" filter="url(#logoShadow4)" opacity="0.85" />
          <circle cx="55" cy="55" r="12" fill="url(#redemLogo)" filter="url(#logoShadow4)" opacity="0.9" />
          <path d="M 32 48 L 48 48" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <text x="100" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Redemption</text>
          <text x="100" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Alliance</text>
          <text x="100" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">FREEDOM NETWORK</text>
        </svg>
      ),
      spirit: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="spiritLogo" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
            <filter id="logoShadow5"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <path d="M 40 30 Q 30 42, 30 60 Q 30 78, 40 88 Q 50 78, 50 60 Q 50 42, 40 30" fill="url(#spiritLogo)" filter="url(#logoShadow5)" opacity="0.95" />
          <circle cx="40" cy="60" r="6" fill="white" opacity="0.5" />
          <text x="100" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Deliverance</text>
          <text x="100" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Spirit</text>
          <text x="100" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">FOUNDATION</text>
        </svg>
      ),
      hope: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="hopeLogo" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
            <filter id="logoShadow6"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <path d="M 20 65 L 40 35 L 60 65 L 55 65 L 55 85 L 25 85 L 25 65 Z" fill="url(#hopeLogo)" filter="url(#logoShadow6)" opacity="0.95" />
          <circle cx="40" cy="62" r="7" fill="white" opacity="0.4" />
          <text x="100" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Hope Rising</text>
          <text x="100" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Africa</text>
          <text x="100" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">VISION &amp; PURPOSE</text>
        </svg>
      ),
      freedom: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="freeLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
            <filter id="logoShadow7"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <circle cx="40" cy="60" r="28" fill="url(#freeLogo)" filter="url(#logoShadow7)" opacity="0.9" />
          <path d="M 40 25 L 45 45 L 65 45 L 50 55 L 55 75 L 40 65 L 25 75 L 30 55 L 15 45 L 35 45 Z" fill="white" opacity="0.35" />
          <text x="100" y="40" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Freedom</text>
          <text x="100" y="60" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Forward</text>
          <text x="100" y="77" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">MOVEMENT</text>
        </svg>
      ),
      humble: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="humbleLogo" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#95DDD7" />
            </linearGradient>
            <filter id="logoShadow8"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <path d="M 30 45 L 40 60 L 50 45 L 58 62 L 48 72 L 58 88 L 40 74 L 22 88 L 32 72 L 22 62 Z" fill="url(#humbleLogo)" filter="url(#logoShadow8)" opacity="0.95" />
          <text x="95" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Humble</text>
          <text x="95" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Hands</text>
          <text x="95" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">MINISTRY</text>
        </svg>
      ),
      believers: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="believeLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
            <filter id="logoShadow9"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <circle cx="28" cy="48" r="14" fill="url(#believeLogo)" filter="url(#logoShadow9)" opacity="0.9" />
          <circle cx="52" cy="48" r="14" fill="url(#believeLogo)" filter="url(#logoShadow9)" opacity="0.85" />
          <circle cx="40" cy="70" r="14" fill="url(#believeLogo)" filter="url(#logoShadow9)" opacity="0.9" />
          <path d="M 35 58 Q 40 65, 45 58 M 35 58 L 38 68 M 45 58 L 42 68" stroke="white" strokeWidth="1.5" opacity="0.4" fill="none" />
          <text x="95" y="40" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Believers</text>
          <text x="95" y="60" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">United</text>
          <text x="95" y="77" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">COMMUNITY</text>
        </svg>
      ),
      called: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="calledLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
            <filter id="logoShadow10"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <rect x="18" y="48" width="44" height="32" fill="url(#calledLogo)" filter="url(#logoShadow10)" rx="3" opacity="0.95" />
          <path d="M 30 60 L 40 50 L 50 60" fill="white" opacity="0.4" />
          <circle cx="56" cy="33" r="9" fill="url(#calledLogo)" filter="url(#logoShadow10)" opacity="0.9" />
          <path d="M 50 40 L 56 33 L 62 40" stroke="white" strokeWidth="1.5" opacity="0.45" fill="none" />
          <text x="95" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Called Home</text>
          <text x="95" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Fellowship</text>
          <text x="95" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">BELONGING</text>
        </svg>
      ),
      truth: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="truthLogo" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
            <filter id="logoShadow11"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <path d="M 40 25 L 58 48 L 40 58 L 22 48 Z" fill="url(#truthLogo)" filter="url(#logoShadow11)" opacity="0.95" />
          <line x1="40" y1="58" x2="40" y2="88" stroke="#4DB5A6" strokeWidth="2.5" />
          <circle cx="40" cy="93" r="4" fill="#4DB5A6" opacity="0.8" />
          <text x="95" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Truth Bearers</text>
          <text x="95" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Collective</text>
          <text x="95" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">CLARITY</text>
        </svg>
      ),
      grateful: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="gratefulLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#95DDD7" />
              <stop offset="100%" stopColor="#4DB5A6" />
            </linearGradient>
            <filter id="logoShadow12"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <path d="M 40 28 L 47 48 L 68 50 L 52 62 L 58 82 L 40 70 L 22 82 L 28 62 L 12 50 L 33 48 Z" fill="url(#gratefulLogo)" filter="url(#logoShadow12)" opacity="0.95" />
          <path d="M 40 38 L 46 54 L 63 56 L 50 66 L 55 80 L 40 70 L 25 80 L 30 66 L 17 56 L 34 54 Z" fill="white" opacity="0.3" />
          <text x="95" y="35" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Grateful</text>
          <text x="95" y="55" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Hearts</text>
          <text x="95" y="72" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">FOUNDATION</text>
        </svg>
      ),
      gospel: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="gospelLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#1B7A6F" />
            </linearGradient>
            <filter id="logoShadow13"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <rect x="18" y="32" width="44" height="56" fill="url(#gospelLogo)" filter="url(#logoShadow13)" rx="2" opacity="0.95" />
          <line x1="40" y1="32" x2="40" y2="88" stroke="white" strokeWidth="2" opacity="0.3" />
          <line x1="18" y1="60" x2="62" y2="60" stroke="white" strokeWidth="2" opacity="0.3" />
          <circle cx="40" cy="45" r="3" fill="white" opacity="0.5" />
          <circle cx="40" cy="75" r="3" fill="white" opacity="0.3" />
          <text x="95" y="40" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Gospel</text>
          <text x="95" y="60" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Shared</text>
          <text x="95" y="77" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">MESSAGE</text>
        </svg>
      ),
      rising: (
        <svg viewBox="0 0 200 120" className="w-full h-20">
          <defs>
            <linearGradient id="risingLogo" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#4DB5A6" />
              <stop offset="100%" stopColor="#95DDD7" />
            </linearGradient>
            <filter id="logoShadow14"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" /></filter>
          </defs>
          <path d="M 56 72 L 40 35 L 24 72 Z" fill="url(#risingLogo)" filter="url(#logoShadow14)" opacity="0.95" />
          <path d="M 40 30 L 40 12 M 35 22 L 40 12 L 45 22" stroke="#4DB5A6" strokeWidth="2.5" fill="none" />
          <path d="M 50 55 L 30 55 M 35 48 L 25 55 L 35 62" fill="white" opacity="0.35" />
          <text x="95" y="40" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Rising Again</text>
          <text x="95" y="60" fontSize="16" fontWeight="600" fill="#1B7A6F" fontFamily="sans-serif">Ministries</text>
          <text x="95" y="77" fontSize="12" fill="#4DB5A6" fontFamily="sans-serif">TRANSFORMATION</text>
        </svg>
      ),
    };
    return logos[id] || null;
  };

  const LogoCard = ({ id }: { id: string }) => (
    <div className="flex justify-center items-center bg-white border border-rc-border/20 rounded-lg p-4 hover:shadow-lg hover:border-rc-accent/30 transition-all duration-300 min-h-[140px] group">
      <div className="w-full group-hover:scale-105 transition-transform duration-300">
        <LogoSvg id={id} />
      </div>
    </div>
  );

  return (
    <div className="bg-white text-rc-text">
      {/* Hero with Background Image Area */}
      <section className="relative w-full h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent/10 to-rc-text/5 overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gray-100 opacity-30" />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base font-medium text-white/80 uppercase tracking-widest">Those Who Believe</p>
          <h1 className="text-4xl md:text-6xl font-rc-serif font-bold text-white leading-tight">These Are Partners</h1>
          <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">Reaching the unreached. Deliverance is free because they believe in this work.</p>
        </div>
      </section>

      {/* Founding Partners */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Founding Partners</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Those who see the problem Jesus is looking at.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {foundingPartners.map((partner) => (
              <LogoCard key={partner.id} id={partner.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Standing Partners */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Standing Partners</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Those who see the solution He is offering.</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {standingPartners.map((partner) => (
              <LogoCard key={partner.id} id={partner.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Partners */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Prayer Partners</p>
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Those who sincerely want His work to spread.</h2>
          </div>
          <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
            {prayerPartners.map((partner) => (
              <LogoCard key={partner.id} id={partner.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Conviction & CTA */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">Those who see the problem Jesus is looking at.</p>
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">Those who see the solution He is offering.</p>
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">Those who sincerely want His work to spread.</p>
            </div>
            <div className="space-y-2 pt-4">
              <p className="text-xl md:text-2xl font-rc-serif font-bold text-rc-text">These are His partners.</p>
              <p className="text-lg md:text-xl text-rc-text/80">Together, we are changing lives.</p>
            </div>
          </div>

          <button
            onClick={() => {
              const email = 'james@saintandstory.co.uk';
              const subject = 'I want to explore partnership with Brother Jimi Ministries';
              const body = 'Hello,\n\nI see what you see. I believe Jesus delivers. I want His work to spread.\n\nLet\'s talk about partnership.\n\nThanks';
              window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
            className="inline-flex items-center justify-center px-10 py-4 min-h-[56px] text-rc-accent font-medium border-2 border-rc-accent rounded-lg hover:bg-rc-accent/5 transition-all duration-200 text-base md:text-lg"
          >
            Start a Conversation
          </button>

          <div className="pt-12 border-t border-rc-border/40">
            <p className="text-xs font-medium text-rc-text/60 uppercase tracking-widest mb-8">Explore</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
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

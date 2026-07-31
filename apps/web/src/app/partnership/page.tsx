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

  return (
    <div className="bg-white text-rc-text">
      {/* Hero with Background Image Area */}
      <section className="relative w-full h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base font-medium text-white/80 uppercase tracking-widest">Those Who Believe</p>
          <h1 className="text-4xl md:text-6xl font-rc-serif font-bold text-white leading-tight">These Are Partners</h1>
          <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">Reaching the unreached. Deliverance is free because they believe in this work.</p>
        </div>
      </section>

      {/* Founding Partners Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Founding Partners</p>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who saw the problem first.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {foundingPartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center p-8 rounded-lg bg-white border border-rc-border/20 min-h-[160px]">
                <p className="text-center text-lg font-rc-serif font-semibold text-rc-text/80">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standing Partners Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Standing Partners</p>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who fuel this work now.</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {standingPartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center p-6 rounded-lg bg-white border border-rc-border/20 min-h-[140px]">
                <p className="text-center text-sm font-rc-serif font-semibold text-rc-text/80 leading-tight">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Partners Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider">Prayer Partners</p>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Those who hold this in prayer.</h2>
          </div>
          <div className="grid md:grid-cols-7 gap-4">
            {prayerPartners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center p-5 rounded-lg bg-white border border-rc-border/20 min-h-[120px]">
                <p className="text-center text-xs font-rc-serif font-semibold text-rc-text/80 leading-tight">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Story Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">
                Partnership isn't a donation. It's a declaration.
              </p>
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">
                It says: <span className="font-semibold text-rc-text">I see what Jesus sees.</span> I recognize the spiritual trap of fraud and bondage. I understand the power of deliverance. And I'm willing to fund that freedom for people I'll never meet.
              </p>
              <p className="text-lg md:text-xl text-rc-text/80 leading-relaxed">
                That's not charity. That's conviction translated into action.
              </p>
            </div>

            <div className="pt-8 space-y-6 border-t border-rc-border/40">
              <div className="space-y-4">
                <p className="text-base md:text-lg text-rc-text/70">These partners share one belief:</p>
                <p className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text">Deliverance is real. Freedom is possible. And it's worth the investment.</p>
              </div>
            </div>

            <div className="pt-8 space-y-8 border-t border-rc-border/40">
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-rc-text/80">
                  If you see what we see. If you believe what we believe. If you're ready to fund freedom instead of just wishing for it.
                </p>
                <p className="text-xl md:text-2xl font-rc-serif font-semibold text-rc-text">
                  Let's talk about partnership.
                </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-8">
            <p className="text-xs font-medium text-rc-text/60 uppercase tracking-widest">Explore</p>
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

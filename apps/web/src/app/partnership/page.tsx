'use client';

export default function PartnershipPage() {
  return (
    <div className="bg-rc-bg text-rc-text">
      {/* Hero */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 border-b border-rc-border">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider mb-4">Partner With Us</p>
            <h1 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight mb-6">Help More People Meet Jesus</h1>
            <p className="text-base md:text-lg text-rc-text/80 leading-relaxed">Every person who finds freedom started with someone who believed in this work. Will you partner with us?</p>
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-b border-rc-border">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">Ways to Partner</h2>

          <div className="space-y-10">
            {/* Financial Partnership */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium text-rc-text">Financial Partnership</h3>
              <p className="text-base text-rc-text/70 leading-relaxed">Every deliverance prayer, every stage journey, every person who walks into freedom&mdash;it&rsquo;s made possible by people like you. Your contribution directly funds the ministry.</p>
              <a href="mailto:james@saintandstory.co.uk?subject=I want to partner financially" className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                Discuss Partnership
              </a>
            </div>

            {/* Prayer Partnership */}
            <div className="space-y-4 pt-8 border-t border-rc-border">
              <h3 className="text-xl md:text-2xl font-medium text-rc-text">Prayer Partnership</h3>
              <p className="text-base text-rc-text/70 leading-relaxed">This is spiritual work. We need people who will pray&mdash;for the young people entering the journey, for Brother Jimi, for wisdom, for breakthroughs. Prayer changes everything.</p>
              <p className="text-sm text-rc-accent font-medium">Join our prayer community and receive monthly updates on who and what to pray for.</p>
            </div>

            {/* Referral Partnership */}
            <div className="space-y-4 pt-8 border-t border-rc-border">
              <h3 className="text-xl md:text-2xl font-medium text-rc-text">Referral Partnership</h3>
              <p className="text-base text-rc-text/70 leading-relaxed">Do you know someone trapped in fraud or deception? You know someone who could help others find freedom? Share this message. Share the testimonies. Your voice carries weight.</p>
              <p className="text-sm text-rc-accent font-medium">Every person you refer who finds deliverance multiplies the impact of your own partnership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 border-b border-rc-border">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight">What Your Partnership Creates</h2>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-rc-accent">15</p>
              <p className="text-sm text-rc-text/70">Young people in first cohort (August 8, 2026)</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-rc-accent">7</p>
              <p className="text-sm text-rc-text/70">Stages of restoration and transformation</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-rc-accent">∞</p>
              <p className="text-sm text-rc-text/70">Potential for exponential multiplication</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight mb-6">Ready to Partner?</h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">Reach out. Let&rsquo;s talk about how you can be part of this movement.</p>
          </div>
          <div>
            <a href="mailto:james@saintandstory.co.uk?subject=I want to partner with Brother Jimi Ministries" className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:shadow-lg transition-all duration-200">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

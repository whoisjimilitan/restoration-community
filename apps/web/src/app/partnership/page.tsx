'use client';

import { useState } from 'react';

export default function PartnershipPage() {
  const [formStep, setFormStep] = useState<'type' | 'details' | 'complete'>('type');
  const [formType, setFormType] = useState<'individual' | 'organization' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '', consent: false });

  const partners = {
    founding: [
      { name: 'Grace & Truth Foundation', id: 'grace' },
      { name: 'Restoration House International', id: 'restoration' },
    ],
    standing: [
      { name: 'New Life Collective', id: 'newlife' },
      { name: 'Redemption Alliance', id: 'redemption' },
      { name: 'Deliverance Spirit Foundation', id: 'spirit' },
      { name: 'Hope Rising Africa', id: 'hope' },
      { name: 'Freedom Forward', id: 'freedom' },
    ],
    prayer: [
      { name: 'Humble Hands Ministry', id: 'humble' },
      { name: 'Believers United', id: 'believers' },
      { name: 'Called Home Fellowship', id: 'called' },
      { name: 'Truth Bearers Collective', id: 'truth' },
      { name: 'Grateful Hearts Foundation', id: 'grateful' },
      { name: 'Gospel Shared', id: 'gospel' },
      { name: 'Rising Again Ministries', id: 'rising' },
    ],
  };

  const handleTypeSelect = (type: 'individual' | 'organization') => {
    setFormType(type);
    setFormStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep('complete');
    setTimeout(() => {
      setFormStep('type');
      setFormType(null);
      setFormData({ name: '', email: '', organization: '', message: '', consent: false });
    }, 3000);
  };

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* Hero */}
      <header className="w-full px-6 sm:px-8 md:px-12 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-rc-serif font-bold leading-tight">
            These Are Partners
          </h1>
          <p className="text-lg md:text-xl text-rc-text/70 leading-relaxed font-light">
            They make this possible. Every program. Every deliverance. Every life restored.
          </p>
        </div>
      </header>

      {/* Partners Section */}
      <section className="w-full px-6 sm:px-8 md:px-12 py-20 md:py-28 border-t border-rc-border">
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">

          {/* Founding Partners */}
          <article className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-rc-serif font-bold">FOUNDING PARTNERS</h2>
              <p className="text-rc-text/70 text-lg">Those who believed with us</p>
              <p className="text-rc-text/60 text-base max-w-2xl">They saw the need first. They moved. They proved this matters.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-8">
              {partners.founding.map((p) => (
                <div key={p.id} className="text-rc-text/80 hover:text-rc-text transition-colors duration-300">
                  <p className="font-rc-serif font-semibold text-lg">{p.name}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Standing Partners */}
          <article className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-rc-serif font-bold">STANDING PARTNERS</h2>
              <p className="text-rc-text/70 text-lg">Those who continue to believe with us</p>
              <p className="text-rc-text/60 text-base max-w-2xl">Week after week, they sustain the mission. Their consistency makes programs possible.</p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 pt-8">
              {partners.standing.map((p) => (
                <div key={p.id} className="text-rc-text/80 hover:text-rc-text transition-colors duration-300">
                  <p className="font-rc-serif font-semibold text-base">{p.name}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Prayer Partners */}
          <article className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-rc-serif font-bold">PRAYER PARTNERS</h2>
              <p className="text-rc-text/70 text-lg">Those who will not stop believing with us</p>
              <p className="text-rc-text/60 text-base max-w-2xl">They intercede when others cannot. Prayer is the foundation this work stands on.</p>
            </div>
            <div className="grid md:grid-cols-5 lg:grid-cols-6 gap-6 pt-8">
              {partners.prayer.map((p) => (
                <div key={p.id} className="text-rc-text/80 hover:text-rc-text transition-colors duration-300">
                  <p className="font-rc-serif font-semibold text-sm">{p.name}</p>
                </div>
              ))}
            </div>
          </article>

        </div>
      </section>

      {/* Why Partners Matter */}
      <section className="w-full px-6 sm:px-8 md:px-12 py-20 md:py-28 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-rc-serif font-bold">Why This Matters</h2>
            <p className="text-rc-text/70 text-lg leading-relaxed">
              Our programs are free. Deliverance classes. Restoration work. Education for the broken. None of this costs money because partners fund it. No one pays to be free. No one pays to be restored. These believers make that possible.
            </p>
          </div>
        </div>
      </section>

      {/* Invitation to Partner */}
      <section className="w-full px-6 sm:px-8 md:px-12 py-20 md:py-28 border-t border-rc-border">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-8">

            {/* Step 1: Type Selection */}
            {formStep === 'type' && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold">Ready to believe with us?</h2>
                  <p className="text-rc-text/70 text-lg">Let us know who you are.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleTypeSelect('individual')}
                    className="p-8 border-2 border-rc-border/40 hover:border-rc-accent/60 rounded-lg transition-all duration-300 text-left hover:bg-rc-accent/5"
                  >
                    <p className="font-rc-serif font-semibold text-lg">Individual</p>
                    <p className="text-sm text-rc-text/60 mt-2">I want to partner</p>
                  </button>
                  <button
                    onClick={() => handleTypeSelect('organization')}
                    className="p-8 border-2 border-rc-border/40 hover:border-rc-accent/60 rounded-lg transition-all duration-300 text-left hover:bg-rc-accent/5"
                  >
                    <p className="font-rc-serif font-semibold text-lg">Organization</p>
                    <p className="text-sm text-rc-text/60 mt-2">We want to partner</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {formStep === 'details' && formType && (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {formType === 'organization' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-rc-text/70">Organization</label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors"
                      placeholder="Organization name"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Tell us why you want to partner</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors resize-none"
                    placeholder="Your thoughts..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2 pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded border-rc-border/40"
                    />
                    <span className="text-sm text-rc-text/70">
                      I understand this is about partnership with God's mission, and I'm ready to discuss how I can participate.
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setFormStep('type');
                      setFormType(null);
                    }}
                    className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-accent/90 transition-all duration-300"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Complete */}
            {formStep === 'complete' && (
              <div className="py-12 space-y-6">
                <div className="space-y-2">
                  <p className="text-2xl font-rc-serif font-bold">Thank you.</p>
                  <p className="text-rc-text/70">We'll reach out soon to talk about partnership.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="w-full px-6 sm:px-8 md:px-12 py-16 md:py-20 bg-rc-warm-gray border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <a href="/" className="text-rc-text/80 hover:text-rc-text transition-colors group">
            Home
            <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-1"></span>
          </a>
          <a href="/testimonies" className="text-rc-text/80 hover:text-rc-text transition-colors group">
            Success Stories
            <span className="block h-px w-0 group-hover:w-full bg-rc-text/80 transition-all duration-300 mt-1"></span>
          </a>
        </div>
      </nav>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

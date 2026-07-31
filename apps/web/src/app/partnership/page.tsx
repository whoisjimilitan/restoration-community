'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PartnershipPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStep, setFormStep] = useState<'type' | 'details' | 'complete'>('type');
  const [formType, setFormType] = useState<'individual' | 'organization' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '', consent: false });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const partners = {
    founding: Array.from({ length: 2 }, (_, i) => ({ id: `founding-${i}` })),
    standing: Array.from({ length: 5 }, (_, i) => ({ id: `standing-${i}` })),
    prayer: Array.from({ length: 7 }, (_, i) => ({ id: `prayer-${i}` })),
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
      {/* HERO - Matches Landing Page Styling */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">These Are Partners</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              These are partners. People who make the mission possible.
            </h1>
          </div>
        </div>
      </section>

      {/* FOUNDING PARTNERS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-12">
            <h2 className="text-xl md:text-2xl font-rc-serif font-bold uppercase tracking-wider">Founding Partners</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {partners.founding.map((p) => (
                <div key={p.id} className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-rc-border/20 flex items-center justify-center">
                  <span className="text-rc-text/30 text-xs">Logo</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* STANDING PARTNERS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-12">
            <h2 className="text-xl md:text-2xl font-rc-serif font-bold uppercase tracking-wider">Standing Partners</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {partners.standing.map((p) => (
                <div key={p.id} className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-rc-border/20 flex items-center justify-center">
                  <span className="text-rc-text/30 text-xs">Logo</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRAYER PARTNERS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-12">
            <h2 className="text-xl md:text-2xl font-rc-serif font-bold uppercase tracking-wider">Prayer Partners</h2>
            <div className="grid md:grid-cols-7 gap-4">
              {partners.prayer.map((p) => (
                <div key={p.id} className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-rc-border/20 flex items-center justify-center">
                  <span className="text-rc-text/30 text-xs">Logo</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-6 text-base md:text-lg text-rc-text leading-relaxed font-light">
            <p>Our programs are free. No one pays Jesus to be set free—partners make that possible. Every counseling session, every educational opportunity exists because these believers have chosen to fund freedom. <span className="font-medium">Great shall be their reward.</span></p>
          </div>
        </motion.div>
      </section>

      {/* INVITATION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center space-y-8">

            {/* Step 1 */}
            {formStep === 'type' && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold">Are you called to partner with us?</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <button onClick={() => handleTypeSelect('individual')} className="p-8 border-2 border-rc-border/40 hover:border-rc-accent/60 hover:shadow-md hover:bg-rc-accent/5 rounded-lg transition-all duration-300 text-left">
                    <p className="font-rc-serif font-semibold text-lg">Individual</p>
                    <p className="text-sm text-rc-text/60 mt-2">I want to partner</p>
                  </button>
                  <button onClick={() => handleTypeSelect('organization')} className="p-8 border-2 border-rc-border/40 hover:border-rc-accent/60 hover:shadow-md hover:bg-rc-accent/5 rounded-lg transition-all duration-300 text-left">
                    <p className="font-rc-serif font-semibold text-lg">Organization</p>
                    <p className="text-sm text-rc-text/60 mt-2">We want to partner</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {formStep === 'details' && formType && (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors" placeholder="your@email.com" />
                </div>
                {formType === 'organization' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-rc-text/70">Organization</label>
                    <input type="text" required value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors" placeholder="Organization name" />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Tell us why you want to partner</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors resize-none" placeholder="Your thoughts..." rows={4} />
                </div>
                <div className="space-y-2 pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mt-1 w-5 h-5 rounded border-rc-border/40" />
                    <span className="text-sm text-rc-text/70">I understand this is about partnership with God's mission, and I'm ready to discuss how I can participate.</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-8">
                  <button type="button" onClick={() => { setFormStep('type'); setFormType(null); }} className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors">Back</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300">Begin the Conversation</button>
                </div>
              </form>
            )}

            {/* Step 3 */}
            {formStep === 'complete' && (
              <div className="py-12 space-y-2">
                <p className="text-2xl font-rc-serif font-bold">Thank you.</p>
                <p className="text-rc-text/70">We'll reach out soon to talk about partnership.</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Navigation links with underline-grow hover */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-4">
            <a href="/" className="text-white/80 hover:text-white transition-colors group">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/testimonies" className="text-white/80 hover:text-white transition-colors group">
              Success Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>

          {/* Existing footer content */}
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

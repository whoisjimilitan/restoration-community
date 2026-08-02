'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PartnershipPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStep, setFormStep] = useState<'form' | 'complete'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', consent: false });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const partners = {
    founding: Array.from({ length: 2 }, (_, i) => ({ id: `founding-${i}` })),
    standing: Array.from({ length: 5 }, (_, i) => ({ id: `standing-${i}` })),
    prayer: Array.from({ length: 7 }, (_, i) => ({ id: `prayer-${i}` })),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep('complete');
    setTimeout(() => {
      setFormStep('form');
      setFormData({ name: '', email: '', organization: '', consent: false });
    }, 3000);
  };

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* HERO - Matches Landing Page Styling */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Partners in Ministry</p>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              Partners fuel what Jesus is doing.
            </h1>
          </div>

          <div className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '360ms' }}>
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                They're individuals and organizations. Stakeholders in His work. Partners in the vision. Answering the call.
              </p>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                Are you one of them?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRIDGE - Three Kinds of Partners */}
      <section className="w-full py-16 md:py-20 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-6">
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">
              Some see a problem and think: "Not my responsibility."
            </p>
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">
              Others see a calling and think: "This is ours."
            </p>
            <div className="pt-2 space-y-4">
              <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">
                Three kinds of partners are answering this call.
              </p>
              <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">
                Individuals. Organizations. All answering together.
              </p>
              <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">
                All three kinds are essential.
              </p>
              <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">
                One of these is you. Or yours.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOUNDING PARTNERS CONTEXT */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-8">
            <h3 className="text-xl md:text-2xl font-rc-serif font-bold uppercase tracking-wider text-rc-text">Why Belief Comes First</h3>
            <div className="space-y-6 text-base md:text-lg text-rc-text leading-relaxed font-light">
              <p>
                These partners believed first.
              </p>

              <p className="pt-2">
                Not when there was proof.
              </p>
              <p>
                Not when there was momentum.
              </p>
              <p>
                Not when success was obvious.
              </p>

              <p className="pt-3">
                They believed when it was just a vision.
              </p>
              <p>
                When the cost was highest.
              </p>
              <p className="font-medium">
                When the outcome was unknown.
              </p>

              <p className="pt-3 font-medium">
                This requires a different kind of faith.
              </p>
            </div>
          </div>
        </motion.div>
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

      {/* STANDING PARTNERS CONTEXT */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-8">
            <h3 className="text-xl md:text-2xl font-rc-serif font-bold uppercase tracking-wider text-rc-text">Why Verification Builds Commitment</h3>
            <div className="space-y-6 text-base md:text-lg text-rc-text leading-relaxed font-light">
              <p>
                These partners saw the transformation and chose to fuel it.
              </p>

              <p className="pt-2">
                They waited for proof.
              </p>
              <p>
                Not because they doubted God.
              </p>
              <p className="font-medium">
                But because they knew: Verification builds commitment.
              </p>

              <p className="pt-3">
                They see young people walking free.
              </p>
              <p>
                They see families restored.
              </p>
              <p>
                They see what Jesus does.
              </p>

              <p className="pt-3 font-medium">
                And they say: "I'm in."
              </p>
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

      {/* PRAYER PARTNERS CONTEXT */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-8">
            <h3 className="text-xl md:text-2xl font-rc-serif font-bold uppercase tracking-wider text-rc-text">Why Intercession is Warfare</h3>
            <div className="space-y-6 text-base md:text-lg text-rc-text leading-relaxed font-light">
              <p>
                These partners pray.
              </p>

              <p className="pt-2">
                Not casual prayer. Not "bless the work" prayer.
              </p>
              <p className="font-medium">
                Intercession. Spiritual warfare. Breaking spiritual strongholds.
              </p>

              <p className="pt-3">
                They understand: The battle is spiritual.
              </p>
              <p>
                The victory is spiritual.
              </p>
              <p>
                Prayer is the armor that protects the work.
              </p>

              <p className="pt-3 font-medium">
                Without them, the work collapses.
              </p>
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
          <div className="space-y-12">
            <h2 className="text-xl md:text-2xl font-rc-serif font-bold uppercase tracking-wider">Why This Matters</h2>
            <div className="space-y-6 text-base md:text-lg text-rc-text leading-relaxed font-light">
              <p className="font-medium">Our program is free because partners chose this calling.</p>

              <p className="pt-3">This is important.</p>
              <p>Listen closely.</p>

              <p className="pt-3">More money doesn't free young people from fraud.</p>
              <p>More laws don't break the spirit controlling them.</p>
              <p>More programs don't deliver them.</p>

              <p className="pt-3 font-medium text-rc-accent">Only Jesus delivers.</p>

              <p className="pt-2">And Jesus works through people who answer the call.</p>

              <div className="space-y-4 pt-6 border-t border-rc-border/30">
                <p className="pt-4">
                  The question isn't: "Can I afford this?"
                </p>
                <p className="font-medium">
                  The question is: "Am I called to this?"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRANSITION TO FORM */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-8">
            <p className="text-base md:text-lg text-rc-text leading-relaxed font-light">
              If your heart or your organization feels called to this work, we'd like to talk about it.
            </p>
            <div className="space-y-6 text-base md:text-lg text-rc-text leading-relaxed font-light pt-4 border-t border-rc-border/30">
              <p className="pt-4">
                Not as a donor or sponsor.
              </p>
              <p>
                As a partner in the work.
              </p>
              <p>
                As a stakeholder in what Jesus is doing.
              </p>
              <div className="space-y-4 pt-6">
                <p className="font-medium">
                  Which kind of partner are you?
                </p>
                <div className="space-y-2 text-base pt-2">
                  <p>
                    Do you believe before the proof exists?
                  </p>
                  <p>
                    Do you fuel what you see working?
                  </p>
                  <p>
                    Do you intercede spiritually?
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-rc-border/30">
                <p className="pt-4">
                  The answer matters.
                </p>
                <p>
                  Because the call is real.
                </p>
              </div>
            </div>
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
            {/* Form */}
            {formStep === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-center">Answer the Call</h2>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors" placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors" placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rc-text/70">Organization <span className="text-rc-text/50">(optional)</span></label>
                  <input type="text" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full px-4 py-3 border border-rc-border/40 rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors" placeholder="Your organization name" />
                </div>

                <div className="space-y-2 pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mt-1 w-5 h-5 rounded border-rc-border/40" />
                    <span className="text-sm text-rc-text/70">I understand this is a call to partnership in God's mission. I'm ready to discuss how I can answer.</span>
                  </label>
                </div>

                <button type="submit" className="w-full px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300">Begin the Conversation</button>
              </form>
            )}

            {/* Success */}
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
      <footer className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="/"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/partnership"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Partnership
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/testimonies"
              className="text-white/80 hover:text-white transition-colors group"
            >
              Success Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>

          {/* Copyright Only */}
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DeliveringRequestModal from '@/components/DeliveringRequestModal';

const proofItems = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b2f?w=400&h=400&fit=crop',
    caption: 'Transformation',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1513225557199-3e91250b6da4?w=400&h=400&fit=crop',
    caption: 'Freedom',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    caption: 'New Identity',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1552058544-f771b1a615ce?w=400&h=400&fit=crop',
    caption: 'Purpose',
  },
];

const userPaths = [
  {
    id: 'convicted',
    title: 'I Want Deliverance',
    description: 'You feel the trap. You\'re ready for freedom.',
    cta: 'Request Deliverance',
    color: 'from-rc-accent to-rc-text',
  },
  {
    id: 'curious',
    title: 'I Want to Understand',
    description: 'You believe, but need to know why only Jesus.',
    cta: 'Explore the Truth',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'community',
    title: 'I Want Community',
    description: 'You\'re ready to join others on this journey.',
    cta: 'Join the Gathering',
    color: 'from-emerald-600 to-teal-600',
  },
];

export default function StoriesPage() {
  const [isDeliveringModalOpen, setIsDeliveringModalOpen] = useState(false);

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO: SAMUEL'S VIDEO (Cinematic, Premium) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rc-accent/5 to-rc-text/5 overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
          <div className="max-w-4xl w-full space-y-8">
            {/* Title Parallax */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <p className="text-xs font-medium text-white/70 uppercase tracking-widest letter-spacing-2">
                  Samuel Johnson's Deliverance
                </p>
                <h1 className="text-5xl md:text-7xl font-rc-serif font-bold text-white leading-tight tracking-tight">
                  One Touch Changed Everything
                </h1>
              </div>

              {/* Synopsis - The Hook */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-lg md:text-xl text-white/85 leading-relaxed font-light max-w-3xl"
              >
                A professional fraudster. A spiritual prison. In 41 minutes, watch Samuel confess everything—how he built an empire of deception, taught hundreds his criminal methods, and lived enslaved by the spirit driving internet fraud across Africa. Then watch what happens when he encounters the authority of Jesus Christ.
              </motion.p>
            </motion.div>

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-16 w-full"
            >
              <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/bKJCcWQVuq8?enablejsapi=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Samuel Johnson's 41-Minute Deliverance Confession"
                />
              </div>

              {/* Video Meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-4 flex items-center justify-between text-white/60 text-sm"
              >
                <p>41 minutes • Full confession at The SCOAN</p>
                <p>2015</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SAMUEL'S STORY: Who He Was & What Happened */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Story - Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight">
                  The Fraudster
                </h2>
                <p className="text-base text-rc-text/70 font-medium">Professional internet scammer. Teacher of thousands.</p>
              </div>

              <div className="space-y-6 text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                <p>
                  Samuel Johnson was no ordinary criminal. He was a professional. Known as "Yahoo" in Nigeria and "Sakawa" in Ghana—the names themselves carried weight in the underworld of internet fraud.
                </p>

                <p>
                  But Samuel wasn't just running scams. He was building an empire. Teaching hundreds of young men his methods. Spreading the spirit of deception across nations. Each person he trained multiplied the damage.
                </p>

                <p className="font-medium text-rc-text pt-2">
                  He was the king of a kingdom built on lies.
                </p>

                <p>
                  The mysterious urge for wealth. The fiery anger when he didn't get it. The compulsion to deceive. The confidence that he was smarter than everyone else. These were not his personality—these were spiritual forces using him.
                </p>

                <p>
                  Fraud is a spiritual trap. And Samuel was in deep.
                </p>
              </div>

              {/* The Encounter */}
              <div className="pt-8 border-t border-rc-border/30 space-y-4">
                <h3 className="text-2xl font-rc-serif font-bold text-rc-text">
                  Then Came Jesus Christ
                </h3>

                <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                  In 2015. At The SCOAN. One touch from the anointed servant of God.
                </p>

                <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light italic">
                  Something left him. Everything changed.
                </p>

                <div className="space-y-3 pt-4">
                  <p className="text-base text-rc-text/70 font-light">The mysterious urge for more—<span className="font-medium text-rc-text">gone.</span></p>
                  <p className="text-base text-rc-text/70 font-light">The fiery anger—<span className="font-medium text-rc-text">gone.</span></p>
                  <p className="text-base text-rc-text/70 font-light">His identity restored—<span className="font-medium text-rc-text">complete.</span></p>
                </div>
              </div>
            </motion.div>

            {/* Proof Gallery - Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs font-medium text-rc-text/60 uppercase tracking-wider">Proof of Transformation</p>

              <div className="grid grid-cols-2 gap-4">
                {proofItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                    className="group relative aspect-square rounded-xl overflow-hidden"
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-light">{item.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* WHY THIS MATTERS: Theology Woven In */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/20" style={{ backgroundColor: '#FAFAF8' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight">
              What This Means for You
            </h2>
            <p className="text-base text-rc-text/60 font-light">Why Samuel's story is not just a story</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8"
          >
            <p>
              Samuel was trapped in fraud. Every tactic. Every deception. Every fear. The authority of a spiritual force had complete control over his life.
            </p>

            <p>
              One encounter with Jesus Christ. Everything changed.
            </p>

            <p>
              This is not a story about one man finding redemption. This is proof that Jesus delivers.
            </p>

            <div className="pt-4 space-y-4">
              <p className="font-medium text-rc-text">Three truths from Samuel's deliverance:</p>

              <div className="space-y-3 text-base">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rc-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-rc-accent">1</span>
                  </div>
                  <p><span className="font-medium text-rc-text">Fraud is a spiritual issue.</span> Not financial. Not legal. Spiritual.</p>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rc-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-rc-accent">2</span>
                  </div>
                  <p><span className="font-medium text-rc-text">Money can't fix it. Law can't fix it. Punishment can't fix it.</span> Only authority breaks authority.</p>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rc-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-rc-accent">3</span>
                  </div>
                  <p><span className="font-medium text-rc-text">Only Jesus has that authority.</span> He is the only way out.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light italic pt-4"
          >
            If Jesus could deliver Samuel, He can deliver you. The same Jesus who met Samuel at The SCOAN is ready to meet you where you are.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* THE RESTORATION PATH: Teaser to Journey */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight">
              What Comes After Deliverance
            </h2>
            <p className="text-base text-rc-text/60 font-light">The path that leads to total restoration</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 text-base md:text-lg text-rc-text/80 leading-relaxed font-light"
          >
            <p>
              Deliverance is the breakthrough moment. But it's not the end of the story—it's the beginning of a new one.
            </p>

            <p>
              After you encounter Jesus and the bondage breaks, you walk a path of restoration. Seven stages. Seven weeks. Each one moves you closer to becoming like Him.
            </p>

            <p className="font-medium text-rc-text">
              Truth → Confession → Repentance → Forgiveness → Reconciliation → Honest Work → Service
            </p>

            <p>
              You don't walk alone. You have mentors. You have community. You have people who understand because they've walked it themselves.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <a
              href="/journey"
              className="inline-flex items-center justify-center px-8 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              See the 7-Stage Journey
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* WHERE ARE YOU? User Path Selection */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/20" style={{ backgroundColor: '#F5F5F3' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto space-y-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center space-y-3"
          >
            <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight">
              Where Are You Right Now?
            </h2>
            <p className="text-base md:text-lg text-rc-text/70 font-light">Choose the path that resonates with your heart.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {userPaths.map((path, idx) => (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8 }}
                onClick={() => {
                  if (path.id === 'convicted') {
                    setIsDeliveringModalOpen(true);
                  } else if (path.id === 'curious') {
                    window.location.href = '/what-is-deliverance';
                  } else {
                    window.location.href = '/gathering';
                  }
                }}
                className="group text-left"
              >
                <div className={`h-full p-8 rounded-xl bg-gradient-to-br ${path.color} transition-all duration-300 hover:shadow-xl`}>
                  <div className="space-y-6 h-full flex flex-col">
                    <h3 className="text-xl md:text-2xl font-rc-serif font-bold text-white leading-tight group-hover:text-white/90 transition-colors">
                      {path.title}
                    </h3>

                    <p className="text-base text-white/80 leading-relaxed font-light flex-1">
                      {path.description}
                    </p>

                    <div className="pt-4 flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">{path.cta}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FINAL CTA: Take Action */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight">
              Ready to Be Free?
            </h2>

            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
              The same Jesus who delivered Samuel is ready to deliver you. All you have to do is ask.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => setIsDeliveringModalOpen(true)}
            className="inline-flex items-center justify-center px-12 py-4 bg-white text-rc-text font-medium text-lg rounded-lg hover:shadow-2xl transition-all duration-300"
          >
            Request Deliverance
          </motion.button>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FOOTER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-12 bg-rc-text border-t border-rc-border/20 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <nav className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a href="/" className="text-white/80 hover:text-white transition-colors group text-sm">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/stories" className="text-white hover:text-white/80 transition-colors group text-sm font-medium">
              Stories
              <span className="block h-px w-full bg-white mt-1"></span>
            </a>
            <a href="/gathering" className="text-white/80 hover:text-white transition-colors group text-sm">
              The Gathering
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/journey" className="text-white/80 hover:text-white transition-colors group text-sm">
              The Journey
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/partnership" className="text-white/80 hover:text-white transition-colors group text-sm">
              Partnership
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </nav>

          <div className="pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">Brother Jimi — Servant of Jesus Christ</p>
            <p className="text-white/30 text-xs mt-2">© 2026. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* DELIVERANCE MODAL */}
      <DeliveringRequestModal isOpen={isDeliveringModalOpen} onClose={() => setIsDeliveringModalOpen(false)} />
    </div>
  );
}

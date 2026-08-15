'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliverance, setDeliverance] = useState({
    step: 'video' as string | number,
    need: '',
    duration: '',
    name: '',
    email: '',
    phone: '',
    submitted: false,
  });
  const [isSubmittingDeliverance, setIsSubmittingDeliverance] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState<'form' | 'complete'>('form');
  const [attendanceData, setAttendanceData] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleOpenAttendance = () => setIsAttendanceModalOpen(true);
    document.addEventListener('open-attendance-modal', handleOpenAttendance);
    return () => document.removeEventListener('open-attendance-modal', handleOpenAttendance);
  }, []);

  return (
    <div className="bg-rc-bg text-rc-text relative">
      {/* HERO - Premium Minimal Binary + Scripture */}
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full flex flex-col justify-center space-y-0">
          {/* The Binary - Conversational Contrast */}
          <div className={`transform transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-base md:text-lg text-white/70 font-rc-serif font-normal leading-relaxed">
              You think it's a blessing.
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-rc-serif font-bold text-white leading-tight tracking-tight mt-2">
              It is a curse.
            </h1>
          </div>

          {/* Scripture Validation - Unified with Binary */}
          <div className={`transform transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ marginTop: '3rem' }}>
            <blockquote className="border-l-4 border-white/30 pl-6 md:pl-8">
              <p className="text-base md:text-lg text-white/90 leading-relaxed font-rc-serif font-normal">
                Like a partridge that hatches eggs it did not lay are those who gain riches by fraud. At midlife they will prove to be fools, and in the end they will face the consequences of their folly.
              </p>
              <p className="text-sm md:text-base text-white/70 font-rc-serif font-light mt-4">
                — Jeremiah 17:11
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* WHAT FRAUD DOES */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Face of Fraud</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>Fraud is intentional deception.</p>
            <p>It promises quick gain.</p>
            <p>But it brings long lasting loss.</p>

            <div className="pt-4 space-y-4">
              <p>It destroys people.</p>
              <p>It steals destinies.</p>
              <p>It kills nations.</p>
              <p>It lures others.</p>
              <p>It multiplies itself.</p>
            </div>

            <div className="pt-4 space-y-4">
              <p>The Lord sees it.</p>
              <p>The Lord judges it.</p>
              <p>The Lord avenges such acts.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* HOW FRAUD BINDS YOU */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Spirit Behind It</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>When you believe a lie</p>
            <p>for the promise of gain,</p>
            <p>you agree with deception.</p>
            <p>And its spirit controls that agreement.</p>
            <p className="pt-4">Two entities but one body.</p>
            <p>You war against yourself.</p>
            <p className="pt-4">One wants you to inherit a curse.</p>
            <p>The other genuinely wrestles.</p>
          </div>
        </motion.div>
      </section>

      {/* MY STORY + THE WAY OUT - Continuous Narrative */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-16"
        >
          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text -ml-8">My Story</h2>
            <p>I too was once controlled by that spirit.</p>
            <p>I told myself I was taking back our money.</p>
            <p>I convinced myself I had no choice.</p>
            <p className="pt-4">Even though I had it all.</p>
            <p>But there was no peace.</p>
            <p className="pt-4">That partridge was me.</p>
            <p>Hatching eggs I did not lay.</p>
            <p>Labor without gain.</p>
            <p>Gain without substance.</p>
            <p className="pt-4">Just as the Bible says.</p>
          </div>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <h3 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text -ml-8">The Way Out</h3>
            <p>Deliverance means to be set free.</p>
            <p className="pt-4">Believe.</p>
            <p>Jesus breaks chains.</p>
            <p className="pt-4">Confess.</p>
            <p>Break agreement with the lie.</p>
            <p className="pt-4">Repent.</p>
            <p>Turn away.</p>
            <p className="pt-4">And He met me there.</p>
            <p>2015. Prophet TB Joshua.</p>
            <p>"All that is over."</p>
            <p className="pt-4">The urge for wastage left.</p>
            <p>My confusion gone.</p>
            <p>The curses undone.</p>
            <p>Jesus shattered my chains.</p>
          </div>
        </motion.div>
      </section>

      {/* NEXT STEP - Direct CTA */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text">What's Next</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="https://calendly.com/restoration-community/video-call"
              className="p-6 border border-rc-border rounded-lg hover:bg-rc-warm-gray hover:-translate-y-1 transition-all duration-300 text-center space-y-3"
            >
              <svg className="w-6 h-6 mx-auto text-rc-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-medium text-rc-text">Video</p>
                <p className="text-sm text-rc-text/60">Face to face</p>
              </div>
            </a>

            <a
              href="#"
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              className="p-6 border border-rc-border rounded-lg hover:bg-rc-warm-gray hover:-translate-y-1 transition-all duration-300 text-center space-y-3"
            >
              <svg className="w-6 h-6 mx-auto text-rc-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.718.735 5.37 2.129 7.689L.929 23.71l8.272-2.737c2.194 1.156 4.653 1.771 7.169 1.771 5.432 0 9.852-4.48 9.797-9.798 0-2.616-.79-5.07-2.291-7.16A9.773 9.773 0 0011.95 6.979z" />
              </svg>
              <div>
                <p className="font-medium text-rc-text">Audio</p>
                <p className="text-sm text-rc-text/60">Phone call</p>
              </div>
            </a>

            <a
              href="#"
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              className="p-6 border border-rc-border rounded-lg hover:bg-rc-warm-gray hover:-translate-y-1 transition-all duration-300 text-center space-y-3"
            >
              <svg className="w-6 h-6 mx-auto text-rc-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div>
                <p className="font-medium text-rc-text">Chat</p>
                <p className="text-sm text-rc-text/60">Text message</p>
              </div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* FRIDAY GATHERING - Community Gathering */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text">Friday Gathering</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
            <p>Every Friday, 3 PM EST.</p>
            <p>Patmos Retreat Centre, Larteh Junction, Akropong.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsAttendanceModalOpen(true)}
              className="flex-1 px-8 py-4 bg-rc-accent text-white font-medium rounded-lg hover:bg-rc-accent/90 hover:-translate-y-1 transition-all duration-300"
            >
              Register
            </button>

            <a
              href="https://maps.google.com/?q=Patmos+Retreat+Centre+Larteh+Junction+Akropong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-8 py-4 bg-white border border-rc-text text-rc-text font-medium rounded-lg hover:bg-rc-text/5 hover:-translate-y-1 transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
        </motion.div>
      </section>

      {/* PRAYER REQUEST MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-2xl font-rc-serif font-bold text-rc-text mb-6">Prayer Request</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={deliverance.name}
                  onChange={(e) => setDeliverance({ ...deliverance, name: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={deliverance.email}
                  onChange={(e) => setDeliverance({ ...deliverance, email: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={deliverance.phone}
                  onChange={(e) => setDeliverance({ ...deliverance, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg"
                />
                <textarea
                  placeholder="What would you like prayer for?"
                  value={deliverance.need}
                  onChange={(e) => setDeliverance({ ...deliverance, need: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg h-24"
                />

                <button
                  onClick={async () => {
                    if (!deliverance.name || !deliverance.email || !deliverance.need) {
                      alert('Please fill in all required fields');
                      return;
                    }
                    setIsSubmittingDeliverance(true);
                    try {
                      const res = await fetch('/api/prayer-request', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: deliverance.name,
                          email: deliverance.email,
                          phone: deliverance.phone,
                          need: deliverance.need,
                        }),
                      });
                      if (res.ok) {
                        setDeliverance({
                          step: 'video',
                          need: '',
                          duration: '',
                          name: '',
                          email: '',
                          phone: '',
                          submitted: true,
                        });
                        alert('Thank you. Your prayer request has been received.');
                        setIsModalOpen(false);
                      }
                    } catch (e) {
                      console.error(e);
                      alert('Error submitting request. Please try again.');
                    } finally {
                      setIsSubmittingDeliverance(false);
                    }
                  }}
                  disabled={isSubmittingDeliverance}
                  className="w-full px-4 py-2 bg-rc-accent text-white rounded-lg font-bold hover:bg-rc-accent/90 disabled:opacity-50"
                >
                  {isSubmittingDeliverance ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ATTENDANCE MODAL */}
      <AnimatePresence>
        {isAttendanceModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAttendanceModalOpen(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-2xl font-rc-serif font-bold text-rc-text mb-6">Friday Gathering - 3 PM EST</h3>

              {attendanceStep === 'form' ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={attendanceData.name}
                    onChange={(e) => setAttendanceData({ ...attendanceData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-rc-border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={attendanceData.email}
                    onChange={(e) => setAttendanceData({ ...attendanceData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-rc-border rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={attendanceData.phone}
                    onChange={(e) => setAttendanceData({ ...attendanceData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-rc-border rounded-lg"
                  />

                  <button
                    onClick={async () => {
                      if (!attendanceData.name || !attendanceData.email) {
                        alert('Please fill in required fields');
                        return;
                      }
                      setIsSubmittingAttendance(true);
                      try {
                        const res = await fetch('/api/attendance', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(attendanceData),
                        });
                        if (res.ok) {
                          setAttendanceStep('complete');
                        }
                      } catch (e) {
                        console.error(e);
                        alert('Error submitting. Please try again.');
                      } finally {
                        setIsSubmittingAttendance(false);
                      }
                    }}
                    disabled={isSubmittingAttendance}
                    className="w-full px-4 py-2 bg-rc-accent text-white rounded-lg font-bold hover:bg-rc-accent/90 disabled:opacity-50"
                  >
                    {isSubmittingAttendance ? 'Registering...' : 'Register'}
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-lg text-rc-text font-rc-serif">You're registered!</p>
                  <p className="text-rc-text/80">We'll send you the call link via email. See you Friday at 3 PM EST.</p>
                  <button
                    onClick={() => {
                      setIsAttendanceModalOpen(false);
                      setAttendanceStep('form');
                    }}
                    className="w-full px-4 py-2 bg-rc-accent text-white rounded-lg font-bold"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <a
              href="/"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/stories"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/gathering"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Gathering
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a
              href="/journey"
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              Journey
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

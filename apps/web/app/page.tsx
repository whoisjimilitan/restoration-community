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

      {/* MY ENCOUNTER */}
      <section className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">My Story</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
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
        </motion.div>
      </section>

      {/* THE ONLY WAY */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Only Way</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>Only One Man can deliver.</p>
            <p>His name is Jesus Christ.</p>

            <p className="pt-4">By acting faith in Him,</p>
            <p>you fetch in His grace.</p>

            <p className="pt-4">Believe what you read here.</p>
            <p>Confess your sins.</p>
            <p>Repent genuinely.</p>

            <p className="pt-4">You will be delivered.</p>
            <p>You will be saved.</p>

            <p className="pt-4">Then you are ready for prayer.</p>
          </div>
        </motion.div>
      </section>

      {/* THE GIFT OF PRAYER */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">The Gift Of Prayer</h2>

          <div className="space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light border-l-4 border-rc-accent pl-8">
            <p>Do you need prayer?</p>
            <p>Yes.</p>

            <p className="pt-4">The Bible says:</p>
            <p>Ask and you shall receive.</p>
            <p>Seek and you will find.</p>
            <p>Knock and the door will be opened.</p>

            <p className="pt-4">You cannot do this alone.</p>
            <p>Two believers are better than one.</p>

            <p className="pt-4">Use your faith.</p>
            <p>Press the button.</p>
            <p>And never remain the same.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block px-8 py-4 bg-rc-accent text-white font-rc-serif font-bold text-lg rounded-full hover:bg-rc-accent/90 transition-all"
          >
            Request Prayer
          </button>
        </motion.div>
      </section>

      {/* GATHERING */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">Friday Gathering</h2>

          <div className="space-y-6">
            <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
              Every Friday at 3 PM EST, we gather to pray. The call is free. No agenda—just prayer. If you're facing something that fraud has bound you to, come pray with us.
            </p>

            <button
              onClick={() => setIsAttendanceModalOpen(true)}
              className="inline-block px-8 py-4 bg-rc-accent text-white font-rc-serif font-bold text-lg rounded-full hover:bg-rc-accent/90 transition-all"
            >
              Join the Call
            </button>
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
    </div>
  );
}

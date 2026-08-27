'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeliveringRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '447471605871';

function buildWhatsAppLink(need: string, duration: string, name: string): string {
  const lines = [
    name ? `Hi Brother Jimi, my name is ${name}.` : 'Hi Brother Jimi.',
    need ? `What I need deliverance from: ${need}` : '',
    duration ? `How long this has been going on: ${duration}` : '',
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n\n'))}`;
}

export default function DeliveringRequestModal({ isOpen, onClose }: DeliveringRequestModalProps) {
  const [deliverance, setDeliverance] = useState({
    step: 1 as number,
    need: '',
    duration: '',
    name: '',
  });

  const handleClose = () => {
    setDeliverance({ step: 1, need: '', duration: '', name: '' });
    onClose();
  };

  const waLink = buildWhatsAppLink(deliverance.need, deliverance.duration, deliverance.name);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-rc-bg rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Step 1: Need */}
            {deliverance.step === 1 && (
              <div className="p-8 md:p-12 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                    What do you need deliverance from?
                  </h2>
                  <p className="text-rc-text/70 text-sm">Step 1 of 3</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (deliverance.need.trim()) {
                      setDeliverance({ ...deliverance, step: 2 });
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <textarea
                      required
                      value={deliverance.need}
                      onChange={(e) => setDeliverance({ ...deliverance, need: e.target.value })}
                      className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text resize-none"
                      placeholder="Be honest about what's binding you."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Duration */}
            {deliverance.step === 2 && (
              <div className="p-8 md:p-12 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                    How long has this been?
                  </h2>
                  <p className="text-rc-text/70 text-sm">Step 2 of 3</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (deliverance.duration.trim()) {
                      setDeliverance({ ...deliverance, step: 3 });
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-rc-text/70">
                      Duration
                    </label>
                    <input
                      type="text"
                      required
                      value={deliverance.duration}
                      onChange={(e) => setDeliverance({ ...deliverance, duration: e.target.value })}
                      className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                      placeholder="e.g., 2 years, since 2022"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setDeliverance({ ...deliverance, step: 1 })}
                      className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-rc-accent text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Name, then straight to WhatsApp */}
            {deliverance.step === 3 && (
              <div className="p-8 md:p-12 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-rc-serif font-bold text-rc-text tracking-tight">
                    What&apos;s your name?
                  </h2>
                  <p className="text-rc-text/70 text-sm">Step 3 of 3</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (deliverance.name.trim()) {
                      window.open(waLink, '_blank', 'noopener,noreferrer');
                      setDeliverance({ ...deliverance, step: 4 });
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-rc-text/70">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={deliverance.name}
                      onChange={(e) => setDeliverance({ ...deliverance, name: e.target.value })}
                      className="w-full px-4 py-3 border border-rc-border rounded-lg focus:outline-none focus:border-rc-accent/60 transition-colors bg-white text-rc-text"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setDeliverance({ ...deliverance, step: 2 })}
                      className="px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                    >
                      Continue on WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Confirmation, with a manual fallback in case the popup was blocked */}
            {deliverance.step === 4 && (
              <div className="p-8 md:p-12 text-center space-y-4">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-rc-serif font-bold text-rc-text">
                  Opening WhatsApp
                </h3>
                <p className="text-rc-text/70">
                  Your message is ready to send. If WhatsApp did not open automatically, tap below.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                >
                  Open WhatsApp →
                </a>
                <button
                  onClick={handleClose}
                  className="block mx-auto mt-4 px-6 py-3 text-rc-text/70 hover:text-rc-text transition-colors"
                >
                  Back to Page
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
'use client';

import { useState } from 'react';

const testimonials = [
  {
    quote: 'I ran scams for 12 years. I thought I was trapped forever. When I met the team, they didn\'t judge me—they just pointed me to Jesus. That changed everything.',
    name: 'David',
    detail: 'Ran fraud operations, now honest work'
  },
  {
    quote: 'The shame was suffocating. But they showed me that forgiveness reaches even into the darkest places. I\'m free now. Really free.',
    name: 'Sarah',
    detail: 'Involved in cryptocurrency scams for 8 years'
  },
  {
    quote: 'I didn\'t believe anyone could help me. I didn\'t believe God would take me back. But they walked with me through every step. I\'m standing now.',
    name: 'Marcus',
    detail: 'Fraud consultant, now leading others to freedom'
  }
];

export default function DeliverancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    contactNumber: '',
    duration: '',
    freedomFrom: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/deliverance-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'freedomFrom') {
      setCharCount(e.target.value.length);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-rc-bg flex flex-col justify-center py-24 md:py-32 px-6 sm:px-8 md:px-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="space-y-8">
            {/* Success Checkmark */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-rc-gold/20 flex items-center justify-center animate-scale-in">
                <svg className="w-8 h-8 text-rc-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
                Thank you.
              </h1>
            </div>

            <div className="space-y-6 text-lg text-rc-text leading-relaxed">
              <p>We have received your request.</p>
              <p>We will call you personally very soon.</p>
            </div>

            <div className="space-y-6 text-lg text-rc-text-secondary leading-relaxed border-l-4 border-rc-gold pl-8 py-4">
              <p>We will speak with you.</p>
              <p>We will listen to you.</p>
              <p>We will counsel you.</p>
              <p>We will help you get ready.</p>
              <p>We will arrange a time for your deliverance.</p>
              <p className="pt-4 border-t border-rc-text/10">
                After you are set free we will walk with you through seven days of truth. One day at a time. To help you stand firm in your new life.
              </p>
              <p>Be encouraged. Jesus Christ is able to set you free.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rc-bg py-24 md:py-32 px-6 sm:px-8 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="space-y-12 mb-20">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
              Request D<span className="italic">e</span>liverance
            </h1>
          </div>

          <p className="text-lg text-rc-text-secondary leading-relaxed">
            Tell us about yourself. We will call you personally to discuss how we can help you walk toward freedom in Jesus Christ.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <p className="text-sm font-medium text-rc-text uppercase tracking-wide mb-8">
            Real people. Real freedom.
          </p>

          <div className="grid gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-l-4 border-rc-gold pl-6 py-4 bg-rc-warm-gray/30 rounded-r"
              >
                <p className="text-lg text-rc-text italic mb-4 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-rc-text">
                  {testimonial.name}
                </p>
                <p className="text-xs text-rc-text-secondary">
                  {testimonial.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-rc-text mb-3">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rc-text mb-3">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rc-text mb-3">
              How long have you lived in this situation?
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 5 years, 10 months"
              required
              className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200"
            />
          </div>

          <div>
            <div className="flex items-end justify-between mb-3">
              <label className="block text-sm font-medium text-rc-text">
                What is one thing you want to be free from most?
              </label>
              <span className="text-xs text-rc-text-tertiary">
                {charCount}/500
              </span>
            </div>
            <textarea
              name="freedomFrom"
              value={formData.freedomFrom}
              onChange={handleChange}
              required
              maxLength={500}
              rows={6}
              className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200 resize-none"
              placeholder="Tell us what burden weighs heaviest on your heart..."
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[48px] bg-rc-accent hover:bg-rc-accent-light text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-gold focus:ring-offset-2 focus:ring-offset-rc-bg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              {loading ? 'Submitting...' : 'Request Deliverance'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function DeliverancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto w-full">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
              Thank you.
            </h1>
          </div>

          <div className="space-y-6 text-lg text-rc-text leading-relaxed">
            <p>We have received your request.</p>
            <p>We will call you personally very soon.</p>
          </div>

          <div className="space-y-6 text-lg text-rc-text-secondary leading-relaxed border-l-4 border-rc-accent pl-8 py-4">
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
    );
  }

  return (
    <div className="min-h-screen bg-rc-bg py-24 md:py-32 px-6 sm:px-8 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-12 mb-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
              Request Deliverance
            </h1>
          </div>

          <p className="text-lg text-rc-text-secondary leading-relaxed">
            Tell us a bit about yourself and your situation. We will reach out to you personally to discuss how we can help you walk toward freedom in Jesus Christ.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-rc-text mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-rc-border rounded-lg text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:ring-2 focus:ring-rc-accent focus:border-transparent transition-all duration-200"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rc-text mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-rc-border rounded-lg text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:ring-2 focus:ring-rc-accent focus:border-transparent transition-all duration-200"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rc-text mb-2">
              How long have you lived in this situation?
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 5 years, 10 months"
              required
              className="w-full px-4 py-3 border border-rc-border rounded-lg text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:ring-2 focus:ring-rc-accent focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rc-text mb-2">
              What is one thing you want to be free from most?
            </label>
            <textarea
              name="freedomFrom"
              value={formData.freedomFrom}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-rc-border rounded-lg text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:ring-2 focus:ring-rc-accent focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tell us what burden weighs heaviest on your heart..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-rc-accent hover:bg-rc-accent-light text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-accent focus:ring-offset-2 focus:ring-offset-rc-bg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Request Deliverance'}
          </button>
        </form>
      </div>
    </div>
  );
}

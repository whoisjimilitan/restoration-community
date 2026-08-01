'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PrayerBookingFormProps {
  bookedSlot: string;
  onBookingSuccess: (bookingId: string, wherebyUrl: string, email: string) => void;
}

export default function PrayerBookingForm({ bookedSlot, onBookingSuccess }: PrayerBookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consentRecording: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    if (!formData.consentRecording) {
      newErrors.consentRecording = 'You must consent to recording for this service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/prayer/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bookedSlot,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to book prayer call');
      }

      const data = await response.json();
      onBookingSuccess(data.bookingId, data.wherebyUrl, formData.email);
    } catch (err) {
      console.error('[PRAYER-BOOKING-FORM] Error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-rc-border p-6 max-w-md w-full shadow-lg"
    >
      <h2 className="text-xl font-semibold text-rc-text mb-6">Your Information</h2>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-rc-text mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded text-sm ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-rc-border'
            } focus:outline-none focus:ring-1 focus:ring-rc-accent`}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-rc-text mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded text-sm ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-rc-border'
            } focus:outline-none focus:ring-1 focus:ring-rc-accent`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-rc-text mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded text-sm ${
              errors.phone ? 'border-red-400 bg-red-50' : 'border-rc-border'
            } focus:outline-none focus:ring-1 focus:ring-rc-accent`}
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-rc-text mb-1">
            Prayer Request (Optional)
          </label>
          <textarea
            id="message"
            placeholder="Share what's on your heart..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={loading}
            className="w-full px-3 py-2 border border-rc-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-rc-accent resize-none"
            rows={3}
          />
        </div>

        {/* Consent Checkbox */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentRecording}
              onChange={(e) => setFormData({ ...formData, consentRecording: e.target.checked })}
              disabled={loading}
              className="w-4 h-4 mt-1 border border-rc-border rounded focus:ring-rc-accent"
            />
            <span className="text-sm text-rc-text">
              I consent to Brother Jimi recording this prayer encounter for my testimony
            </span>
          </label>
          {errors.consentRecording && (
            <p className="text-xs text-red-600 ml-7">{errors.consentRecording}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-rc-accent text-white font-semibold rounded hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Confirming...' : 'Confirm Prayer Call'}
        </button>
      </form>

      <p className="text-xs text-rc-warm-gray mt-4 text-center">
        Your information is secure and private. We respect your confidentiality.
      </p>
    </motion.div>
  );
}

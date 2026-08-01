'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BookingConfirmationProps {
  bookingId: string;
  wherebyUrl: string;
  email: string;
}

export default function BookingConfirmation({ bookingId, wherebyUrl, email }: BookingConfirmationProps) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-lg border border-rc-border p-8 max-w-md w-full text-center"
    >
      <div className="mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-semibold text-rc-text">Prayer Call Confirmed</h2>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-rc-border rounded p-4">
          <p className="text-xs text-rc-warm-gray uppercase tracking-wide mb-1">Booking ID</p>
          <p className="font-mono text-sm text-rc-text break-all">{bookingId}</p>
        </div>

        <p className="text-sm text-rc-text">
          A confirmation email has been sent to{' '}
          <span className="font-semibold">{email}</span>
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-xs text-blue-900 mb-2">
            <strong>Next Steps:</strong>
          </p>
          <ul className="text-xs text-blue-900 space-y-1 text-left">
            <li>• Check your email for the prayer call details</li>
            <li>• Join 5 minutes before your scheduled time</li>
            <li>• Find a quiet, private space to be fully present</li>
            <li>• Brother Jimi will guide you through the encounter</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={wherebyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 bg-rc-accent text-white font-semibold rounded hover:opacity-90 transition"
        >
          View Prayer Room
        </a>

        <Link
          href="/"
          className="block w-full py-3 bg-rc-border text-rc-text font-semibold rounded hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>

      <p className="text-xs text-rc-warm-gray mt-6">
        This is a sacred encounter. Come with an open heart.
      </p>
    </motion.div>
  );
}

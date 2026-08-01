'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import PrayerBookingForm from './components/PrayerBookingForm';
import BookingConfirmation from './components/BookingConfirmation';

type Step = 'calendar' | 'form' | 'confirmation';

interface BookingConfirmationData {
  bookingId: string;
  wherebyUrl: string;
  email: string;
}

export default function RequestPrayerPage() {
  const [step, setStep] = useState<Step>('calendar');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<BookingConfirmationData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch booked slots on mount
  useEffect(() => {
    async function fetchBookedSlots() {
      try {
        const response = await fetch('/api/prayer/bookings/available');
        if (response.ok) {
          const data = await response.json();
          setBookedSlots(data.bookedSlots || []);
        }
      } catch (error) {
        console.error('[REQUEST-PRAYER] Error fetching booked slots:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookedSlots();
  }, []);

  function handleSlotSelected(slot: string) {
    setSelectedSlot(slot);
    setStep('form');
  }

  function handleBookingSuccess(bookingId: string, wherebyUrl: string, email: string) {
    setConfirmationData({ bookingId, wherebyUrl, email });
    setStep('confirmation');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rc-bg to-rc-cream flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-rc-text mb-4">
            Schedule Your Prayer Encounter
          </h1>
          <p className="text-lg text-rc-warm-gray max-w-md mx-auto">
            Request a live prayer call with Brother Jimi. Share your situation, receive deliverance, begin your transformation.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {(['calendar', 'form', 'confirmation'] as Step[]).map((s) => (
            <motion.div
              key={s}
              className={`h-2 rounded-full transition ${
                step === s ? 'bg-rc-accent w-8' : s === 'confirmation' && step === 'confirmation' ? 'bg-rc-accent w-8' : 'bg-rc-border w-2'
              }`}
              animate={{ width: step === s ? 32 : 8 }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {loading ? (
            <div className="text-center">
              <p className="text-rc-warm-gray">Loading availability...</p>
            </div>
          ) : step === 'calendar' ? (
            <AvailabilityCalendar
              onSlotSelected={handleSlotSelected}
              bookedSlots={bookedSlots}
            />
          ) : step === 'form' ? (
            selectedSlot && (
              <PrayerBookingForm
                bookedSlot={selectedSlot}
                onBookingSuccess={handleBookingSuccess}
              />
            )
          ) : confirmationData ? (
            <BookingConfirmation
              bookingId={confirmationData.bookingId}
              wherebyUrl={confirmationData.wherebyUrl}
              email={confirmationData.email}
            />
          ) : null}
        </div>

        {/* Footer Note */}
        {step === 'calendar' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center text-sm text-rc-warm-gray"
          >
            <p>
              This is a free encounter. After your prayer call, you'll be invited to join our 7-day restoration intensive (completely free).
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

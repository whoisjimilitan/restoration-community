'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateGhanaMidnightSlots } from '@/lib/prayer-utils';

interface AvailabilityCalendarProps {
  onSlotSelected: (slot: string) => void;
  bookedSlots: string[];
}

export default function AvailabilityCalendar({ onSlotSelected, bookedSlots }: AvailabilityCalendarProps) {
  const [calendar, setCalendar] = useState<(Date | null)[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [userTimezone, setUserTimezone] = useState('UTC');

  useEffect(() => {
    // Get user's timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(tz);
    } catch {
      setUserTimezone('UTC');
    }
  }, []);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: (Date | null)[] = [];
    let day = new Date(startDate);

    while (days.length < 42) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    setCalendar(days);
  };

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  function handleDateClick(date: Date) {
    setSelectedDate(date);
    setShowTimeSlots(true);
  }

  function handleSlotClick(slot: string) {
    setSelectedSlot(slot);
    onSlotSelected(slot);
  }

  function getTimeSlots(date: Date): string[] {
    const slots = generateGhanaMidnightSlots(date.toISOString().split('T')[0]);
    const bookedSet = new Set(bookedSlots);
    return slots.filter(slot => !bookedSet.has(slot));
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-lg border border-rc-border p-6 max-w-md w-full">
      {!showTimeSlots ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-rc-text mb-6">Select a Date</h2>

          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-1 hover:bg-rc-border rounded text-rc-text"
            >
              ←
            </button>
            <h3 className="font-semibold text-rc-text">{monthName}</h3>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-1 hover:bg-rc-border rounded text-rc-text"
            >
              →
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-rc-warm-gray py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendar.map((date, idx) => {
              const isCurrentMonth = date && date.getMonth() === currentDate.getMonth();
              const isPast = date && date < new Date();
              const hasAvailability = date && getTimeSlots(date).length > 0;

              return (
                <button
                  key={idx}
                  onClick={() => date && handleDateClick(date)}
                  disabled={!isCurrentMonth || isPast || !hasAvailability}
                  className={`aspect-square flex items-center justify-center rounded text-sm font-medium transition ${
                    !isCurrentMonth || isPast || !hasAvailability
                      ? 'text-rc-warm-gray bg-gray-50 cursor-not-allowed opacity-50'
                      : 'text-rc-text hover:bg-rc-accent hover:text-white cursor-pointer'
                  }`}
                >
                  {date?.getDate()}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-rc-warm-gray mt-4 text-center">
            Available: midnight–5am Ghana time
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => setShowTimeSlots(false)}
            className="text-sm text-rc-accent mb-4 hover:underline"
          >
            ← Back to calendar
          </button>

          <h2 className="text-xl font-semibold text-rc-text mb-6">
            {selectedDate?.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>

          <div className="space-y-2">
            {getTimeSlots(selectedDate!).length === 0 ? (
              <p className="text-sm text-rc-warm-gray text-center py-4">
                No available slots for this date. Please choose another.
              </p>
            ) : (
              getTimeSlots(selectedDate!).map((slot) => {
                const slotDate = new Date(slot);

                return (
                  <motion.button
                    key={slot}
                    onClick={() => handleSlotClick(slot)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-3 rounded border transition text-left text-sm ${
                      selectedSlot === slot
                        ? 'bg-rc-accent text-white border-rc-accent'
                        : 'border-rc-border hover:border-rc-accent hover:bg-rc-border'
                    }`}
                  >
                    <div className="font-medium">{slotDate.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                    <div className="text-xs opacity-75 mt-1">{userTimezone}</div>
                  </motion.button>
                );
              })
            )}
          </div>

          <p className="text-xs text-rc-warm-gray mt-4 text-center">
            Select a time to continue
          </p>
        </motion.div>
      )}
    </div>
  );
}

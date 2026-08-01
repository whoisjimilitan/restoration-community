import { formatInTimeZone } from 'date-fns-tz';

// Ghana timezone (GMT+0 year-round, no DST)
const GHANA_TIMEZONE = 'Africa/Accra';

// Prayer call availability: midnight to 5am Ghana time
const PRAYER_CALL_START_HOUR = 0;  // midnight
const PRAYER_CALL_END_HOUR = 5;    // 5am

export function generateGhanaMidnightSlots(dateString: string): string[] {
  // Generate 6 slots per day: midnight, 30min, 1am, 1:30am, 2am, 2:30am, 3am, 3:30am, 4am, 4:30am
  const slots: string[] = [];
  const date = new Date(dateString);

  // Set to midnight Ghana time
  date.setUTCHours(0, 0, 0, 0);

  // Generate slots from midnight to 5am (6 slots of 30 minutes each)
  for (let i = 0; i < 12; i++) {
    const slotTime = new Date(date);
    slotTime.setMinutes(slotTime.getMinutes() + i * 30);

    // Only include slots between midnight and 5am
    if (slotTime.getUTCHours() < 5) {
      slots.push(slotTime.toISOString());
    }
  }

  return slots;
}

export function convertUTCToLocalTime(utcDate: Date, userTimezone: string): string {
  try {
    return formatInTimeZone(utcDate, userTimezone, 'MMM d, yyyy p zzz');
  } catch (e) {
    // Fallback if timezone is invalid
    return formatInTimeZone(utcDate, 'UTC', 'MMM d, yyyy p zzz');
  }
}

export function isValidBookingSlot(slot: string): boolean {
  try {
    const date = new Date(slot);
    const utcHours = date.getUTCHours();

    // Slot must be between midnight and 5am UTC
    return utcHours >= PRAYER_CALL_START_HOUR && utcHours < PRAYER_CALL_END_HOUR;
  } catch {
    return false;
  }
}

export function getAvailableSlots(
  dateRange: { start: string; end: string },
  bookedSlots: string[]
): string[] {
  const allSlots: string[] = [];
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);

  const bookedSet = new Set(bookedSlots);

  // Generate all slots for each day in range
  let current = new Date(start);
  while (current <= end) {
    const daySlots = generateGhanaMidnightSlots(current.toISOString().split('T')[0]);
    allSlots.push(...daySlots);
    current.setDate(current.getDate() + 1);
  }

  // Filter out booked slots
  return allSlots.filter(slot => !bookedSet.has(slot));
}

export function formatBookingDateTime(utcDate: Date): string {
  return formatInTimeZone(utcDate, GHANA_TIMEZONE, 'EEEE, MMMM d, yyyy • h:mm a z');
}

export function getGhanaMidnightAsUTC(date: Date): Date {
  // Convert any date to midnight Ghana time in UTC
  const ghanaMidnight = new Date(date);
  ghanaMidnight.setUTCHours(0, 0, 0, 0);
  return ghanaMidnight;
}

export function isSlotInPast(slot: string): boolean {
  return new Date(slot) < new Date();
}

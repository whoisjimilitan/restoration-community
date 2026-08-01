import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { isValidBookingSlot, convertUTCToLocalTime } from '@/lib/prayer-utils';
import { getConfirmationEmailHTML, getSubjectLine } from '@/lib/email-templates';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_KEY);

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  console.log('[PRAYER-BOOKINGS] POST /api/prayer/bookings initiated');

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('[PRAYER-BOOKINGS] No authenticated user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, message, bookedSlot, consentRecording } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: 'Phone number must be at least 10 digits' }, { status: 400 });
    }

    if (!bookedSlot) {
      return NextResponse.json({ error: 'Booking time is required' }, { status: 400 });
    }

    if (!isValidBookingSlot(bookedSlot)) {
      return NextResponse.json(
        { error: 'Slot must be between midnight and 5am Ghana time' },
        { status: 400 }
      );
    }

    if (!consentRecording) {
      return NextResponse.json(
        { error: 'Recording consent is required' },
        { status: 400 }
      );
    }

    // Check if slot is already booked
    const slotDate = new Date(bookedSlot);
    const existingBooking = await prisma.prayerCall.findFirst({
      where: {
        scheduledTime: slotDate,
        status: { in: ['scheduled', 'completed'] },
      },
    });

    if (existingBooking) {
      console.log('[PRAYER-BOOKINGS] Slot already booked:', bookedSlot);
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      );
    }

    // Get or create user by email
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: '', // No password for prayer call bookings
          role: 'VISITOR',
        },
      });
    }

    // Get Brother Jimi (logged-in admin) - default to session user
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!adminUser) {
      console.log('[PRAYER-BOOKINGS] Admin user not found:', session.user.email);
      return NextResponse.json({ error: 'Admin user not found' }, { status: 500 });
    }

    // Create PrayerCall record
    const wherebyRoomUrl = process.env.WHEREBY_ROOM_URL || 'https://whereby.com/themanondmount';

    const prayerCall = await prisma.prayerCall.create({
      data: {
        brotherJimiId: adminUser.id, // Logged-in admin is facilitator
        userId: user.id,
        scheduledTime: slotDate,
        wherebyRoomUrl,
        consentGiven: consentRecording,
        status: 'scheduled',
        notes: message ? `Prayer request: ${message}` : undefined,
      },
    });

    console.log('[PRAYER-BOOKINGS] PrayerCall created:', prayerCall.id);

    // Get user's timezone (default to UTC if not set)
    let userProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    const userTimeZone = userProfile?.timeZone || 'UTC';
    const localTime = convertUTCToLocalTime(slotDate, userTimeZone);

    // Send confirmation email
    try {
      const emailHtml = getConfirmationEmailHTML({
        name,
        email,
        bookingId: prayerCall.id,
        bookedSlot,
        wherebyRoomUrl,
        localTime,
      });

      const subject = getSubjectLine('confirmation', name);

      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'test') {
        // Real Resend API
        await resend.emails.send({
          from: process.env.EMAIL_FROM_ADDRESS || 'noreply@brotherjimi.com',
          to: email,
          subject,
          html: emailHtml,
        });
        console.log('[PRAYER-BOOKINGS] Confirmation email sent to:', email);
      } else {
        // Test mode - just log
        console.log('[PRAYER-BOOKINGS] Test mode - would send email to:', email);
      }
    } catch (emailError) {
      console.error('[PRAYER-BOOKINGS] Email send failed:', emailError);
      // Don't fail the booking if email fails
    }

    console.log('[PRAYER-BOOKINGS] Booking complete. ID:', prayerCall.id);

    return NextResponse.json(
      {
        success: true,
        bookingId: prayerCall.id,
        wherebyUrl: wherebyRoomUrl,
        message: 'Prayer call booked successfully. Check your email for details.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[PRAYER-BOOKINGS] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

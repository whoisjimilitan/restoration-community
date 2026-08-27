import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { error: 'The waitlist is not accepting signups yet. Please check back soon.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email,
    firstName: name,
    audienceId,
  });

  if (error) {
    return NextResponse.json({ error: 'Could not join the waitlist right now. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}

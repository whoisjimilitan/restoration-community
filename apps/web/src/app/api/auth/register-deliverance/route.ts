import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

let resend: any = null;
if (process.env.RESEND_API_KEY) {
  const { Resend } = require('resend');
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  console.log('[DELIVERANCE-REGISTER] Starting registration process');

  try {
    const body = await request.json();
    const { situation, seeking, story, readiness, name, contact, country } = body;

    // Validation
    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Name and contact are required' },
        { status: 400 }
      );
    }

    console.log('[DELIVERANCE-REGISTER] Validating form data:', { name, situation, readiness });

    // Auto-generate email from name
    const timestamp = Date.now();
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}+${timestamp}@deliverance.local`;
    const tempPassword = Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15);
    const hashedPassword = await hash(tempPassword, 12);

    console.log('[DELIVERANCE-REGISTER] Creating user account:', { email });

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerified: new Date(), // Auto-verify for deliverance entry
      },
    });

    console.log('[DELIVERANCE-REGISTER] User created:', user.id);

    // Store deliverance intake data
    const intake = await prisma.deliveranceIntake.create({
      data: {
        userId: user.id,
        situation,
        seeking: seeking || [],
        story,
        readiness,
        contact,
        country,
      },
    });

    console.log('[DELIVERANCE-REGISTER] Intake data stored:', intake.id);

    // Send welcome email with temporary password
    if (resend) {
      try {
        await resend.emails.send({
        from: 'deliverance@brotherjimi.com',
        to: contact, // Use their provided contact (actual email they'll check)
        subject: `Welcome to Your Deliverance Journey, ${name}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0D5E57; font-size: 28px;">Your Journey Begins</h1>

            <p style="font-size: 16px; line-height: 1.6; color: #202124;">
              Hello ${name},
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #202124;">
              Jesus Christ is ready to deliver you. Your journey toward freedom, restoration, and a new life begins now.
            </p>

            <div style="background-color: #F8F6F2; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h2 style="color: #0D5E57; margin-top: 0;">Your Account Details</h2>
              <p style="margin: 10px 0;"><strong>Account Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Temporary Password:</strong> ${tempPassword}</p>
              <p style="margin: 20px 0; font-size: 14px; color: #666;">You can change your password anytime from your dashboard.</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #202124;">
              Your dashboard is waiting. Stage 1: Truth is your first step in the seven-stage restoration journey.
            </p>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              In Christ,<br/>
              Brother Jimi & the Restoration Community
            </p>
          </div>
        `,
        });

        console.log('[DELIVERANCE-REGISTER] Welcome email sent to:', contact);
      } catch (emailError) {
        console.error('[DELIVERANCE-REGISTER] Email send failed:', emailError);
        // Don't fail registration if email fails
      }
    } else {
      console.log('[DELIVERANCE-REGISTER] Resend not configured, skipping email');
    }

    console.log('[DELIVERANCE-REGISTER] Registration complete. User:', user.id);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        redirectTo: '/dashboard/stages',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[DELIVERANCE-REGISTER] Error:', error);

    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
          { error: 'Account already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

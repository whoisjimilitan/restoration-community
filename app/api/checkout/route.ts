import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  try {
    const { amount, email } = await req.json();

    if (!amount || typeof amount !== "number" || amount < 1) {
      return NextResponse.json({ error: "Valid amount required" }, { status: 400 });
    }

    const stripe = getStripe();
    const baseUrl = process.env.SITE_URL || "https://brotherjimi.com";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Brother Jimi Partnership",
              description: `Support daily counsel — $${amount}/month`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/partner?success=true`,
      cancel_url: `${baseUrl}/partner`,
      ...(email && { customer_email: email }),
      subscription_data: {
        metadata: {
          partner_request: "true",
        },
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json(
      { url: session.url },
      { status: 201 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
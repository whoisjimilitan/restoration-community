import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/mailerlite";

export async function POST(req: NextRequest) {
  try {
    const { email, ref, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Determine tags based on source
    const tags = ["journey"];
    if (source === "received") {
      tags.push("received");
    }

    // Add to MailerLite
    const result = await addSubscriber(email, tags, ref, source);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, subscriber: result.subscriber }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";

// TODO: Integrate with actual storage (database, file system, or email)
// For now, we'll just notify via email

export async function POST(req: NextRequest) {
  try {
    const { prayer } = await req.json();

    if (!prayer || typeof prayer !== "string") {
      return NextResponse.json({ error: "Prayer text required" }, { status: 400 });
    }

    // TODO: Store prayer in database or file
    // TODO: Send notification to Jimi at whoisjimi.today@gmail.com
    console.log("[prayer] Received:", prayer.substring(0, 50) + "...");

    return NextResponse.json({ success: true, message: "Prayer received" }, { status: 201 });
  } catch (error) {
    console.error("Prayer error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
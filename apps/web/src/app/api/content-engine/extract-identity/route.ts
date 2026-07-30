import { NextResponse } from "next/server";
import { extractIdentityChoice } from "@/lib/identity-extraction";

export async function POST(request: Request) {
  console.log("[CONTENT-ENGINE] Extracting identity from text");

  try {
    const body = await request.json();
    const { text } = body;

    // Validate required fields
    if (!text || text.trim().length === 0) {
      console.log("[CONTENT-ENGINE] Missing or empty text field");
      return NextResponse.json(
        { error: "Text field is required and cannot be empty" },
        { status: 400 }
      );
    }

    // Extract identity
    const identity = extractIdentityChoice(text);

    console.log(
      `[CONTENT-ENGINE] Identity extracted: ${identity.label} (Choice ${identity.choice})`
    );

    return NextResponse.json({
      success: true,
      identity
    });
  } catch (error) {
    console.error(
      "[CONTENT-ENGINE] Error extracting identity:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Failed to extract identity" },
      { status: 500 }
    );
  }
}

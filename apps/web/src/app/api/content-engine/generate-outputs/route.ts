import { NextResponse } from "next/server";
import { extractIdentityChoice } from "@/lib/identity-extraction";
import { extractVoiceTheme } from "@/lib/voice-extraction";
import { generateAllOutputs } from "@/lib/content-generation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  console.log("[CONTENT-ENGINE] Generating outputs with database persistence");

  try {
    const body = await request.json();
    const { text, sourceType, sourceTitle, sourceUrl, userId } = body;

    // Validate required fields
    if (!text || text.trim().length === 0) {
      console.log("[CONTENT-ENGINE] Missing or empty text field");
      return NextResponse.json(
        { error: "Text field is required and cannot be empty" },
        { status: 400 }
      );
    }

    if (!sourceType) {
      console.log("[CONTENT-ENGINE] Missing sourceType field");
      return NextResponse.json(
        { error: "sourceType field is required" },
        { status: 400 }
      );
    }

    if (!sourceTitle) {
      console.log("[CONTENT-ENGINE] Missing sourceTitle field");
      return NextResponse.json(
        { error: "sourceTitle field is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      console.log("[CONTENT-ENGINE] Missing userId field");
      return NextResponse.json(
        { error: "userId field is required" },
        { status: 400 }
      );
    }

    console.log(
      `[CONTENT-ENGINE] Generating outputs for: ${sourceTitle} (userId: ${userId})`
    );

    // Extract identity
    const identity = extractIdentityChoice(text);
    console.log(
      `[CONTENT-ENGINE] Identity extracted: ${identity.label} (Choice ${identity.choice})`
    );

    // Extract voice theme
    const theme = extractVoiceTheme(text, identity);
    console.log(
      `[CONTENT-ENGINE] Voice theme extracted with revelation: ${theme.revelation.substring(0, 50)}...`
    );

    // Generate all outputs
    const outputs = generateAllOutputs(theme);
    console.log("[CONTENT-ENGINE] All 9 content formats generated");

    // Save to database
    const sourceExcerpt = text.substring(0, 500);

    const contentPlan = await prisma.contentPlan.create({
      data: {
        identityChoice: identity.choice,
        identityLabel: identity.label,
        sourceType,
        sourceTitle,
        sourceUrl: sourceUrl || null,
        sourceExcerpt,
        revelation: theme.revelation,
        userId,
        status: "draft",
        outputs: {
          create: [
            {
              format: "daily-letter",
              content: outputs.dailyLetter,
              title: `Daily Letter: ${identity.label}`
            },
            {
              format: "social-post",
              content: outputs.socialPost,
              title: "Social Post"
            },
            {
              format: "micro-insight",
              content: outputs.microInsight,
              title: identity.label
            },
            {
              format: "devotional",
              content: outputs.devotional,
              title: `Devotional: ${identity.label}`
            },
            {
              format: "article",
              content: outputs.articleExcerpt,
              title: identity.label
            },
            {
              format: "short-video-script",
              content: outputs.shortVideoScript,
              title: `Video Script: ${identity.label}`,
              duration: "30-60 seconds"
            },
            {
              format: "long-video-script",
              content: outputs.longVideoScript,
              title: `Long Video: ${identity.label}`,
              duration: "5-10 minutes"
            },
            {
              format: "podcast-moment",
              content: outputs.podcastMoment,
              title: `Podcast: ${identity.label}`,
              duration: "90-120 seconds"
            },
            {
              format: "email",
              content: JSON.stringify(outputs.email),
              title: outputs.email.subject
            }
          ]
        }
      },
      include: {
        outputs: true
      }
    });

    console.log(
      `[CONTENT-ENGINE] Outputs generated and saved: ${contentPlan.id} with ${contentPlan.outputs.length} formats`
    );

    return NextResponse.json({
      success: true,
      identity,
      theme: {
        revelation: theme.revelation,
        contrast: theme.contrast,
        callToIdentity: theme.callToIdentity,
        examples: theme.examples,
        scriptural: theme.scriptural,
        coreMessage: theme.coreMessage
      },
      outputs,
      contentPlan
    });
  } catch (error) {
    console.error(
      "[CONTENT-ENGINE] Error generating outputs:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Failed to generate outputs" },
      { status: 500 }
    );
  }
}

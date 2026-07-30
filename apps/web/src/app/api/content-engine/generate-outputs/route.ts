import { NextResponse } from "next/server";
import { extractIdentityChoice } from "@/lib/identity-extraction";
import { extractVoiceTheme } from "@/lib/voice-extraction";
import { generateAllOutputsV2 } from "@/lib/content-generation-v2";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  console.log("[CONTENT-ENGINE] Generating outputs with database persistence");

  try {
    const body = await request.json();
    const { text, sourceType, sourceTitle, sourceUrl, userId, contentIndex: bodyContentIndex } = body;

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

    // Determine content index (use provided value or default to 0)
    const contentIndex = typeof bodyContentIndex === 'number' ? bodyContentIndex : 0;

    // Generate all outputs with v2 pipeline
    const outputs = generateAllOutputsV2({
      theme,
      identityChoice: identity.choice,
      contentIndex
    });
    console.log("[CONTENT-ENGINE] All 9 content formats generated with v2 pipeline");

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
        frame: outputs.frame,
        conversationalEntry: outputs.conversationalEntry,
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
              content: outputs.article,
              title: identity.label
            },
            {
              format: "short-video-script",
              content: outputs.shortVideo,
              title: `Video Script: ${identity.label}`,
              duration: "30-60 seconds"
            },
            {
              format: "long-video-script",
              content: outputs.longVideo,
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
              content: outputs.email,
              title: `Email: ${identity.label}`
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
    console.log(
      `[CONTENT-ENGINE] Frame: ${outputs.frame}, Voice validation: ${outputs.voiceValidation.isValid ? 'valid' : 'invalid'}`
    );

    return NextResponse.json({
      success: true,
      data: {
        frame: outputs.frame,
        conversationalEntry: outputs.conversationalEntry,
        voiceValidation: outputs.voiceValidation,
        outputs: {
          dailyLetter: outputs.dailyLetter,
          socialPost: outputs.socialPost,
          microInsight: outputs.microInsight,
          devotional: outputs.devotional,
          article: outputs.article,
          shortVideo: outputs.shortVideo,
          longVideo: outputs.longVideo,
          podcastMoment: outputs.podcastMoment,
          email: outputs.email
        }
      },
      identity,
      theme: {
        revelation: theme.revelation,
        contrast: theme.contrast,
        callToIdentity: theme.callToIdentity,
        examples: theme.examples,
        scriptural: theme.scriptural,
        coreMessage: theme.coreMessage
      },
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

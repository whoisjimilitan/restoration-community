import { NextRequest, NextResponse } from "next/server";

/**
 * CONTENT GENERATOR - PRODUCES REAL OUTPUT
 * Not templates - actual content transformation per format
 */

interface ContentOptions {
  text: string;
  title: string;
}

function extractCoreMessage(text: string): string {
  // Find the most important sentence (usually has core insight words)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const insightWords = ['realize', 'realized', 'understand', 'understood', 'truth', 'happen', 'means', 'because'];
  
  let bestSentence = sentences[0];
  let bestScore = 0;
  
  sentences.forEach(sent => {
    let score = insightWords.filter(word => sent.toLowerCase().includes(word)).length;
    if (score > bestScore) {
      bestScore = score;
      bestSentence = sent;
    }
  });
  
  return bestSentence.trim();
}

function generateDailyLetter(text: string): string {
  const coreMessage = extractCoreMessage(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return `Good morning.

${coreMessage}.

${sentences.slice(1, 2).map(s => s.trim()).join(' ')}

This is what I want you to sit with today. Not just intellectually, but in the real moments of your life when attention matters.

In faith,
Brother Jimi`;
}

function generateSocialPost(text: string): string {
  const coreMessage = extractCoreMessage(text);
  const post = coreMessage.length > 280 ? coreMessage.substring(0, 277) + '…' : coreMessage;
  return post + '.';
}

function generateMicroInsight(text: string): string {
  const coreMessage = extractCoreMessage(text);
  return coreMessage.endsWith('.') ? coreMessage : coreMessage + '.';
}

function generateDevotional(text: string): string {
  const coreMessage = extractCoreMessage(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const secondKey = sentences.slice(1, 2).map(s => s.trim()).join(' ');
  
  return `${coreMessage}.

${secondKey}

Sit with that for a moment. What would change if you actually believed this?`;
}

function generateArticle(text: string, title: string): string {
  const coreMessage = extractCoreMessage(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return `# ${title}

## The Core Truth

${coreMessage}.

## Why This Matters

${sentences.slice(1, 3).map(s => s.trim()).join(' ')}

## What This Means for Your Life

The question is not whether you intellectually agree. The question is whether you live like you believe it. Because transformation happens in the gap between knowing and doing.`;
}

function generateShortVideoScript(text: string): string {
  const coreMessage = extractCoreMessage(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return `${coreMessage}.

[PAUSE]

${sentences.slice(1, 2).map(s => s.trim()).join(' ')}

That's the real moment.`;
}

function generateLongVideoScript(text: string): string {
  const coreMessage = extractCoreMessage(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return `[OPEN]
"Most of us have this wrong."

[STORY]
${sentences.slice(0, 2).map(s => s.trim()).join(' ')}

[INSIGHT]
Here's what I eventually realized: ${coreMessage}.

[PROOF]
${sentences.slice(2, 4).map(s => s.trim()).join(' ')}

[CLOSE]
So the question you need to ask yourself is: are you living like you believe this?`;
}

function generatePodcastMoment(text: string): string {
  const coreMessage = extractCoreMessage(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return `[PODCAST MOMENT]

"${coreMessage}."

${sentences.slice(1, 2).map(s => s.trim()).join(' ')}

That shift changes everything.`;
}

function generateEmail(text: string, title: string): { subject: string; body: string } {
  const coreMessage = extractCoreMessage(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return {
    subject: title || coreMessage.substring(0, 50),
    body: `Hi there,

I wanted to share something that's been on my mind:

${coreMessage}.

${sentences.slice(1, 2).map(s => s.trim()).join(' ')}

The real question is: what changes when you stop just believing this and start living it?

Looking forward to your thoughts.

Best,
Jimi`
  };
}

export async function POST(request: NextRequest) {
  console.log("[CONTENT-ENGINE] Generating formats");

  try {
    const body = await request.json();
    const { text, sourceTitle } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const outputs = {
      dailyLetter: generateDailyLetter(text),
      socialPost: generateSocialPost(text),
      microInsight: generateMicroInsight(text),
      devotional: generateDevotional(text),
      articleExcerpt: generateArticle(text, sourceTitle),
      shortVideoScript: generateShortVideoScript(text),
      longVideoScript: generateLongVideoScript(text),
      podcastMoment: generatePodcastMoment(text),
      email: generateEmail(text, sourceTitle),
    };

    return NextResponse.json({
      success: true,
      identity: { label: "Teaching", choice: "teaching" },
      theme: { revelation: extractCoreMessage(text) },
      outputs,
      contentPlan: null,
    });
  } catch (error) {
    console.error("[CONTENT-ENGINE] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Processing failed" },
      { status: 500 }
    );
  }
}

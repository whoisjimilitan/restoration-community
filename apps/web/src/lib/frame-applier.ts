export type Frame = 'counsel' | 'advise' | 'uplift' | 'enlighten' | 'educate';

export interface FrameContext {
  narrative: string;
  frame: Frame;
  elements?: {
    revelation?: string;
    contrast?: string;
    coreMessage?: string;
  };
}

export interface FramedResult {
  framedNarrative: string;
  frameUsed: Frame;
}

/**
 * Applies a frame to a narrative, structuring it with intention
 */
export function applyFrame(context: FrameContext): FramedResult {
  const { narrative, frame } = context;

  console.log('[FRAMER] Applying frame:', frame);

  const opening = getFrameOpening(frame);
  const closing = getFrameClosing(frame);

  const framedNarrative = `${opening}

${narrative}

${closing}`;

  console.log('[FRAMER] Frame applied successfully');

  return { framedNarrative, frameUsed: frame };
}

function getFrameOpening(frame: Frame): string {
  const openings: Record<Frame, string> = {
    counsel: 'Let me counsel you on what I see happening here.',
    advise: 'Here is what I need to tell you:',
    uplift: 'Here is what is possible for you:',
    enlighten: 'Let me show you what is actually happening.',
    educate: 'Let me explain how this actually works.',
  };
  return openings[frame];
}

function getFrameClosing(frame: Frame): string {
  const closings: Record<Frame, string> = {
    counsel: 'That is what wisdom looks like.',
    advise: 'That is the path forward.',
    uplift: 'That is what you are capable of.',
    enlighten: 'That is the truth most people miss.',
    educate: 'That is how transformation happens.',
  };
  return closings[frame];
}

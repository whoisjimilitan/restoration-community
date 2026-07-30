export type Frame = 'counsel' | 'advise' | 'uplift' | 'enlighten' | 'educate';

const FRAME_ROTATION: Frame[] = ['counsel', 'advise', 'uplift', 'enlighten', 'educate'];

export function selectFrameForContent(
  identityChoice: number,
  contentIndex: number
): Frame {
  const frameIndex = (identityChoice + contentIndex) % FRAME_ROTATION.length;
  return FRAME_ROTATION[frameIndex];
}

export function getFrameDescription(frame: Frame): string {
  const descriptions: Record<Frame, string> = {
    counsel: 'Offering perspective on their situation',
    advise: 'Giving clear guidance on what to do',
    uplift: 'Lifting them up despite doubt',
    enlighten: 'Teaching something that expands understanding',
    educate: 'Explaining truth they might not see',
  };
  return descriptions[frame];
}

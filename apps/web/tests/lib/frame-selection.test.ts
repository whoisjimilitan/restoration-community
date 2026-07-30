import { selectFrameForContent } from '@/lib/frame-selection';
import { extractIdentityChoice } from '@/lib/identity-extraction';

describe('selectFrameForContent', () => {
  it('rotates through 5 frames consistently', () => {
    const identity = extractIdentityChoice('Your test text here');

    const frame0 = selectFrameForContent(identity.choice, 0);
    const frame1 = selectFrameForContent(identity.choice, 1);
    const frame2 = selectFrameForContent(identity.choice, 2);
    const frame3 = selectFrameForContent(identity.choice, 3);
    const frame4 = selectFrameForContent(identity.choice, 4);
    const frame5 = selectFrameForContent(identity.choice, 5);

    expect(['counsel', 'advise', 'uplift', 'enlighten', 'educate']).toContain(frame0);
    expect(['counsel', 'advise', 'uplift', 'enlighten', 'educate']).toContain(frame1);
    expect(frame5).toBe(frame0);
  });

  it('same identity + same index always returns same frame', () => {
    const identity = extractIdentityChoice('Test text');
    const frame1 = selectFrameForContent(identity.choice, 0);
    const frame2 = selectFrameForContent(identity.choice, 0);

    expect(frame1).toBe(frame2);
  });

  it('different indices return different frames for same identity', () => {
    const identity = extractIdentityChoice('Test text');
    const frame0 = selectFrameForContent(identity.choice, 0);
    const frame1 = selectFrameForContent(identity.choice, 1);

    expect(frame0).not.toBe(frame1);
  });
});

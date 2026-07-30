/**
 * Conversational Entry System
 *
 * Generates frame-specific conversational entry points—the opening line
 * that sets the tone for the entire message. All entries must sound like
 * Brother Jimi naturally starting a conversation with one friend, not like
 * a script or proclamation.
 */

import type { Frame } from './frame-selection';
import type { VoiceTheme } from './voice-extraction';

/**
 * Frame-specific conversational openers that sound natural and authentic
 * Each frame has a distinct conversational approach while maintaining
 * Brother Jimi's bold, raw, prophetic voice.
 */
const CONVERSATIONAL_OPENERS: Record<Frame, string[]> = {
  counsel: [
    "I see what's happening here.",
    "You know what I'm noticing?",
    "Let me show you what's actually going on.",
    "Here's what's really at play.",
    "Pay attention to this.",
  ],
  advise: [
    "You know what your real problem is?",
    "Here's what you need to understand.",
    "Let me be straight with you.",
    "I'm going to tell you the truth.",
    "Listen, here's what actually matters.",
  ],
  uplift: [
    "You're stronger than you think.",
    "Here's what I know about you.",
    "You've already got this in you.",
    "Don't underestimate what you can do.",
    "You're capable of more than you realize.",
  ],
  enlighten: [
    "This is what people miss.",
    "Nobody's talking about this, but here's the reality.",
    "The truth is simpler than you think.",
    "Here's what they won't tell you.",
    "Most people don't see this.",
  ],
  educate: [
    "Let me break this down for you.",
    "Here's how this actually works.",
    "I want to show you something.",
    "Let me explain what's really happening.",
    "Watch how this connects.",
  ],
};

/**
 * Generate a conversational entry for a given frame
 *
 * Returns a natural opening line that sounds like Brother Jimi speaking to one friend,
 * varying by frame while maintaining authentic voice throughout.
 *
 * @param frame - The frame intention ('counsel' | 'advise' | 'uplift' | 'enlighten' | 'educate')
 * @param theme - Voice theme with revelation, contrast, examples
 * @param identityChoice - Which of the 7 identity choices (1-7)
 * @returns A conversational opener string (1-2 sentences)
 */
export function generateConversationalEntry(
  frame: Frame,
  theme: VoiceTheme,
  identityChoice: number
): string {
  const openers = CONVERSATIONAL_OPENERS[frame];

  // Use identityChoice and theme content to deterministically select opener
  // This ensures same inputs always produce same output
  const hashValue = (identityChoice + theme.revelation.length + theme.identity.choice) % openers.length;

  return openers[hashValue];
}

/**
 * Get all available conversational openers for a specific frame
 * Useful for understanding the variation available within a frame
 */
export function getFrameOpeners(frame: Frame): string[] {
  return CONVERSATIONAL_OPENERS[frame] || [];
}

/**
 * Get a description of what a frame's conversational approach is about
 * Helps understand the intention behind each frame's entry points
 */
export function getFrameConversationalStyle(frame: Frame): string {
  const styles: Record<Frame, string> = {
    counsel: 'Observational and diagnostic—pointing out what\'s actually happening',
    advise: 'Direct and prescriptive—telling them what they need to know',
    uplift: 'Empowering and strengthening—reminding them of their capability',
    enlighten: 'Revelatory and truth-revealing—sharing what others miss',
    educate: 'Teaching and instructive—explaining how something actually works',
  };
  return styles[frame];
}

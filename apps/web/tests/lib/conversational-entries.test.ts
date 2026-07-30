import { generateConversationalEntry } from '@/lib/conversational-entries';
import type { Frame } from '@/lib/frame-selection';
import type { VoiceTheme } from '@/lib/voice-extraction';

describe('generateConversationalEntry', () => {
  // Mock theme for testing
  const mockTheme: VoiceTheme = {
    identity: {
      choice: 1,
      stage: 'someone who chooses truth over lies',
      question: 'Are you a person of TRUTH or LIES?',
      confidence: 0.95
    },
    coreMessage: "Here's who you're choosing to be.",
    revelation: 'The truth is simpler than you think',
    contrast: 'The lie: You are someone who lives in lies. The truth: You are someone who chooses truth.',
    callToIdentity: 'Are you a person of TRUTH or LIES?',
    scriptural: 'John 8:32',
    examples: ['Example 1', 'Example 2']
  };

  it('generates different entries for different frames', () => {
    const counselEntry = generateConversationalEntry('counsel', mockTheme, 1);
    const adviseEntry = generateConversationalEntry('advise', mockTheme, 1);
    const upliftEntry = generateConversationalEntry('uplift', mockTheme, 1);
    const enlightenEntry = generateConversationalEntry('enlighten', mockTheme, 1);
    const educateEntry = generateConversationalEntry('educate', mockTheme, 1);

    // All entries should be unique
    const entries = [counselEntry, adviseEntry, upliftEntry, enlightenEntry, educateEntry];
    const uniqueEntries = new Set(entries);
    expect(uniqueEntries.size).toBe(5);
  });

  it('returns the same entry for the same frame + theme + identityChoice', () => {
    const entry1 = generateConversationalEntry('counsel', mockTheme, 1);
    const entry2 = generateConversationalEntry('counsel', mockTheme, 1);
    expect(entry1).toBe(entry2);
  });

  it('returns a string that sounds like spoken language', () => {
    const frames: Frame[] = ['counsel', 'advise', 'uplift', 'enlighten', 'educate'];

    for (const frame of frames) {
      const entry = generateConversationalEntry(frame, mockTheme, 1);

      // Should sound conversational (no corporate/AI language)
      expect(entry).not.toMatch(/leverage|synergy|paradigm|utilize|facilitate/i);
      expect(entry).not.toMatch(/please find below|as per your request|kindly/i);
    }
  });

  it('maintains authentic voice (no flowery language)', () => {
    const frames: Frame[] = ['counsel', 'advise', 'uplift', 'enlighten', 'educate'];

    for (const frame of frames) {
      const entry = generateConversationalEntry(frame, mockTheme, 1);

      // Check for flowery/over-polish language
      expect(entry).not.toMatch(/abundantly|magnificently|profoundly|eternally|gracious|benevolent/i);
      expect(entry).not.toMatch(/\s{2,}/); // No excessive spacing
      expect(entry.length).toBeGreaterThan(10); // Not too short
      expect(entry.length).toBeLessThan(200); // Not too long
    }
  });

  it('generates entries for all frames without error', () => {
    const frames: Frame[] = ['counsel', 'advise', 'uplift', 'enlighten', 'educate'];

    for (const frame of frames) {
      expect(() => {
        generateConversationalEntry(frame, mockTheme, 1);
      }).not.toThrow();
    }
  });

  it('varies entries across different identity choices within same frame', () => {
    const entries: string[] = [];

    for (let i = 1; i <= 7; i++) {
      entries.push(generateConversationalEntry('counsel', mockTheme, i));
    }

    // At least some variation across different identity choices
    const uniqueEntries = new Set(entries);
    expect(uniqueEntries.size).toBeGreaterThan(1);
  });

  it('each frame entry is contextually appropriate', () => {
    // Counsel: observational, diagnostic
    const counselEntry = generateConversationalEntry('counsel', mockTheme, 1);
    expect(counselEntry).toMatch(/see|notice|happening|going on|what's really/i);

    // Advise: direct, prescriptive
    const adviseEntry = generateConversationalEntry('advise', mockTheme, 1);
    expect(adviseEntry).toMatch(/problem|need to|straight|truth|understand/i);

    // Uplift: empowering, strengthening
    const upliftEntry = generateConversationalEntry('uplift', mockTheme, 1);
    expect(upliftEntry).toMatch(/stronger|capable|got this|know about|realize/i);

    // Enlighten: revelatory, truth-revealing
    const enlightenEntry = generateConversationalEntry('enlighten', mockTheme, 1);
    expect(enlightenEntry).toMatch(/miss|talking about|truth|reality|see/i);

    // Educate: teaching, instructive
    const educateEntry = generateConversationalEntry('educate', mockTheme, 1);
    expect(educateEntry).toMatch(/break down|how|works|show you|explain/i);
  });
});

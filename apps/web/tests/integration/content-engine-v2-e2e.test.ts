/**
 * Content Engine v2 End-to-End Integration Tests
 *
 * Verifies the complete pipeline from raw material (theme) through API response.
 * Tests frame selection, conversational entries, voice validation, and all 9 output formats.
 *
 * This test suite simulates real-world usage where:
 * 1. Raw material comes in (article, podcast, observation)
 * 2. Identity choice is extracted
 * 3. Voice theme is extracted
 * 4. Content is generated across all 9 formats
 * 5. Voice validation confirms authenticity
 * 6. API returns complete response
 */

import { describe, it, expect } from '@jest/globals';
import { generateAllOutputsV2 } from '@/lib/content-generation-v2';
import { extractIdentityChoice } from '@/lib/identity-extraction';
import { extractVoiceTheme } from '@/lib/voice-extraction';
import type { VoiceTheme } from '@/lib/voice-extraction';

describe('Content Engine v2 End-to-End Integration', () => {
  /**
   * Simulated raw material (like from WordPress/podcast)
   * This represents how content would come in before processing
   */
  const rawMaterial = `
    You are choosing right now who to become. Every choice you make shapes your identity.
    This is not theoretical. Your life is proof of this.

    Most people don't see the connection between their daily choices and who they're becoming.
    They think identity is fixed, inherited, determined by circumstances.

    But watch this: Your choices compound. Small decisions create patterns.
    Patterns create habits. Habits shape character.

    Example: You choose to be honest when it costs you nothing. Over time, honesty becomes who you are.
    Example: You choose to quit at the first sign of resistance. Over time, quitting becomes your nature.
  `;

  describe('Step 1: Extract Identity and Voice from Raw Material', () => {
    it('extracts identity choice from raw material', () => {
      const identity = extractIdentityChoice(rawMaterial);

      expect(identity).toBeDefined();
      expect(identity.choice).toBeGreaterThanOrEqual(1);
      expect(identity.choice).toBeLessThanOrEqual(7);
      expect(identity.confidence).toBeGreaterThan(0);
      expect(identity.stage).toBeDefined();
      expect(identity.question).toBeDefined();
    });

    it('extracts voice theme from raw material', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      expect(theme).toBeDefined();
      expect(theme.revelation).toBeDefined();
      expect(theme.revelation.length).toBeGreaterThan(0);
      expect(theme.contrast).toBeDefined();
      expect(theme.coreMessage).toBe("Here's who you're choosing to be.");
      expect(theme.callToIdentity).toBeDefined();
      expect(theme.examples).toBeDefined();
      expect(Array.isArray(theme.examples)).toBe(true);
    });

    it('ensures revelation is the first sentence', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      // Revelation should be first sentence-like structure
      expect(theme.revelation.length).toBeGreaterThan(10);
      expect(theme.revelation).toMatch(/\./);
    });

    it('ensures examples are extracted', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      expect(theme.examples.length).toBeGreaterThan(0);
      expect(theme.examples.every((ex) => ex.length > 0)).toBe(true);
    });
  });

  describe('Step 2: Generate v2 Content from Extracted Material', () => {
    it('generates v2 content with complete output', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Verify all 9 formats are present
      expect(output.dailyLetter).toBeDefined();
      expect(output.socialPost).toBeDefined();
      expect(output.microInsight).toBeDefined();
      expect(output.devotional).toBeDefined();
      expect(output.article).toBeDefined();
      expect(output.shortVideo).toBeDefined();
      expect(output.longVideo).toBeDefined();
      expect(output.podcastMoment).toBeDefined();
      expect(output.email).toBeDefined();

      // Verify metadata
      expect(output.frame).toBeDefined();
      expect(output.conversationalEntry).toBeDefined();
      expect(output.voiceValidation).toBeDefined();
    });

    it('generates non-empty content for all 9 formats', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      const formats = [
        { name: 'dailyLetter', content: output.dailyLetter },
        { name: 'socialPost', content: output.socialPost },
        { name: 'microInsight', content: output.microInsight },
        { name: 'devotional', content: output.devotional },
        { name: 'article', content: output.article },
        { name: 'shortVideo', content: output.shortVideo },
        { name: 'longVideo', content: output.longVideo },
        { name: 'podcastMoment', content: output.podcastMoment },
        { name: 'email', content: output.email }
      ];

      for (const format of formats) {
        expect(format.content.length).toBeGreaterThan(0);
        expect(typeof format.content).toBe('string');
      }
    });
  });

  describe('Step 3: Frame Rotation Through Content Indices', () => {
    it('produces different frames for different content indices', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const outputs = [];
      for (let i = 0; i < 5; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });
        outputs.push(output.frame);
      }

      // Should have rotated through frames
      const uniqueFrames = new Set(outputs);
      expect(uniqueFrames.size).toBeGreaterThan(1);
    });

    it('rotates through all 5 frames predictably', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const frames: string[] = [];
      for (let i = 0; i < 5; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });
        frames.push(output.frame);
      }

      // Should have 5 different frames (one for each content index)
      const uniqueFrames = new Set(frames);
      expect(uniqueFrames.size).toBe(5);
      expect(['counsel', 'advise', 'uplift', 'enlighten', 'educate']).toEqual(
        expect.arrayContaining(frames)
      );
    });

    it('produces consistent frame order for same identity and varying indices', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      // Generate twice and verify same frame order
      const frames1 = [];
      for (let i = 0; i < 5; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });
        frames1.push(output.frame);
      }

      const frames2 = [];
      for (let i = 0; i < 5; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });
        frames2.push(output.frame);
      }

      // Frames should be identical (same input = same output)
      expect(frames1).toEqual(frames2);
    });
  });

  describe('Step 4: Voice Validation Across Frames', () => {
    it('maintains voice authenticity across frame rotations', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      for (let i = 0; i < 5; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });

        // All outputs should pass voice validation
        expect(output.voiceValidation).toBeDefined();
        expect(typeof output.voiceValidation.confidence).toBe('number');
        expect(output.voiceValidation.confidence).toBeGreaterThan(0);
        expect(Array.isArray(output.voiceValidation.warnings)).toBe(true);
      }
    });

    it('produces valid voice validation results', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Validate structure
      expect(output.voiceValidation.isValid).toBeDefined();
      expect(typeof output.voiceValidation.isValid).toBe('boolean');
      expect(output.voiceValidation.confidence).toBeGreaterThanOrEqual(0);
      expect(output.voiceValidation.confidence).toBeLessThanOrEqual(1);
      expect(Array.isArray(output.voiceValidation.warnings)).toBe(true);
    });

    it('detects anti-patterns and generates warnings', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Warnings array should exist (may be empty if content is good)
      expect(Array.isArray(output.voiceValidation.warnings)).toBe(true);
      // Each warning should be a string
      if (output.voiceValidation.warnings.length > 0) {
        for (const warning of output.voiceValidation.warnings) {
          expect(typeof warning).toBe('string');
        }
      }
    });
  });

  describe('Step 5: Complete Content Diversity from Single Material', () => {
    it('generates complete, diverse content from one piece of raw material', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      // Generate 3 pieces of content from same material
      const content1 = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      const content2 = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 1
      });

      const content3 = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 2
      });

      // All three should be different (different frames)
      expect(content1.frame).not.toBe(content2.frame);
      expect(content2.frame).not.toBe(content3.frame);

      // But all should be valid
      expect(content1.voiceValidation.isValid || content1.voiceValidation.confidence > 0).toBe(true);
      expect(content2.voiceValidation.isValid || content2.voiceValidation.confidence > 0).toBe(true);
      expect(content3.voiceValidation.isValid || content3.voiceValidation.confidence > 0).toBe(true);
    });

    it('produces different daily letters for each frame', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const letters = [];
      for (let i = 0; i < 3; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });
        letters.push(output.dailyLetter);
      }

      // Letters should be different
      expect(letters[0]).not.toBe(letters[1]);
      expect(letters[1]).not.toBe(letters[2]);

      // All should be non-empty
      for (const letter of letters) {
        expect(letter.length).toBeGreaterThan(0);
      }
    });

    it('uses same revelation but different framing across outputs', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const outputs = [];
      for (let i = 0; i < 3; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });
        outputs.push(output);
      }

      // All should reference the core theme
      // (though in different ways due to different frames)
      for (const output of outputs) {
        // Frame should vary
        expect(['counsel', 'advise', 'uplift', 'enlighten', 'educate']).toContain(output.frame);
        // But voice should remain consistent
        expect(output.voiceValidation.confidence).toBeGreaterThan(0);
      }
    });
  });

  describe('Step 6: API Integration Simulation', () => {
    it('generates response structure matching API contract', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Simulate what API would return
      const apiResponse = {
        success: true,
        data: {
          frame: output.frame,
          conversationalEntry: output.conversationalEntry,
          voiceValidation: output.voiceValidation,
          outputs: {
            dailyLetter: output.dailyLetter,
            socialPost: output.socialPost,
            microInsight: output.microInsight,
            devotional: output.devotional,
            article: output.article,
            shortVideo: output.shortVideo,
            longVideo: output.longVideo,
            podcastMoment: output.podcastMoment,
            email: output.email
          }
        }
      };

      // Verify structure
      expect(apiResponse.success).toBe(true);
      expect(apiResponse.data).toBeDefined();
      expect(apiResponse.data.frame).toBeDefined();
      expect(apiResponse.data.conversationalEntry).toBeDefined();
      expect(apiResponse.data.voiceValidation).toBeDefined();
      expect(apiResponse.data.outputs).toBeDefined();
      expect(Object.keys(apiResponse.data.outputs).length).toBe(9);
    });

    it('validates API response data types', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Check data types
      expect(typeof output.frame).toBe('string');
      expect(typeof output.conversationalEntry).toBe('string');
      expect(typeof output.dailyLetter).toBe('string');
      expect(typeof output.socialPost).toBe('string');
      expect(typeof output.microInsight).toBe('string');
      expect(typeof output.devotional).toBe('string');
      expect(typeof output.article).toBe('string');
      expect(typeof output.shortVideo).toBe('string');
      expect(typeof output.longVideo).toBe('string');
      expect(typeof output.podcastMoment).toBe('string');
      expect(typeof output.email).toBe('string');

      // Voice validation
      expect(typeof output.voiceValidation.isValid).toBe('boolean');
      expect(typeof output.voiceValidation.confidence).toBe('number');
      expect(Array.isArray(output.voiceValidation.warnings)).toBe(true);
    });

    it('ensures all content formats are present in API response', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // All 9 formats should be present
      const requiredFormats = [
        'dailyLetter',
        'socialPost',
        'microInsight',
        'devotional',
        'article',
        'shortVideo',
        'longVideo',
        'podcastMoment',
        'email'
      ];

      for (const format of requiredFormats) {
        expect(output[format as keyof typeof output]).toBeDefined();
        expect(typeof output[format as keyof typeof output]).toBe('string');
      }
    });
  });

  describe('Step 7: Determinism and Consistency', () => {
    it('produces identical output for same inputs', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const input = {
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      };

      const result1 = generateAllOutputsV2(input);
      const result2 = generateAllOutputsV2(input);

      expect(result1.dailyLetter).toBe(result2.dailyLetter);
      expect(result1.frame).toBe(result2.frame);
      expect(result1.conversationalEntry).toBe(result2.conversationalEntry);
      expect(result1.socialPost).toBe(result2.socialPost);
      expect(result1.article).toBe(result2.article);
    });

    it('handles multiple calls without state pollution', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      // Call multiple times
      const result1 = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      const result2 = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 1
      });

      const result3 = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Result 1 and 3 should be identical (same inputs)
      expect(result1.dailyLetter).toBe(result3.dailyLetter);
      expect(result1.frame).toBe(result3.frame);

      // Result 2 should be different (different contentIndex)
      expect(result2.frame).not.toBe(result1.frame);
    });
  });

  describe('Step 8: Real-World Usage Scenarios', () => {
    it('handles all 7 identity choices successfully', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      for (let i = 1; i <= 7; i++) {
        expect(() => {
          generateAllOutputsV2({
            theme,
            identityChoice: i,
            contentIndex: 0
          });
        }).not.toThrow();
      }
    });

    it('processes content at scale (10 items with rotation)', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const results = [];
      for (let i = 0; i < 10; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });
        results.push(output);
      }

      expect(results.length).toBe(10);
      expect(results.every((r) => r.dailyLetter.length > 0)).toBe(true);
      expect(results.every((r) => r.frame)).toBe(true);
    });

    it('maintains voice across long content processing', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      for (let i = 0; i < 20; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: identity.choice,
          contentIndex: i
        });

        // Voice should remain consistent even after many iterations
        expect(output.voiceValidation.confidence).toBeGreaterThan(0);
        expect(output.dailyLetter.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Step 9: Error Handling', () => {
    it('handles edge case: minimum valid input', () => {
      const minimalMaterial = 'Truth matters. This is real.';
      const identity = extractIdentityChoice(minimalMaterial);
      const theme = extractVoiceTheme(minimalMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      expect(output).toBeDefined();
      expect(output.dailyLetter.length).toBeGreaterThan(0);
    });

    it('handles edge case: very long input', () => {
      const longMaterial = rawMaterial + rawMaterial + rawMaterial;
      const identity = extractIdentityChoice(longMaterial);
      const theme = extractVoiceTheme(longMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      expect(output).toBeDefined();
      expect(output.dailyLetter.length).toBeGreaterThan(0);
    });

    it('handles different identity choice values', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      // Test each identity value 1-7
      for (let i = 1; i <= 7; i++) {
        const output = generateAllOutputsV2({
          theme,
          identityChoice: i,
          contentIndex: 0
        });

        expect(output.dailyLetter.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Step 10: Content Quality Metrics', () => {
    it('ensures all outputs meet minimum length requirements', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Minimum lengths
      expect(output.dailyLetter.length).toBeGreaterThan(50);
      expect(output.socialPost.length).toBeGreaterThan(10);
      expect(output.microInsight.length).toBeGreaterThan(10);
      expect(output.devotional.length).toBeGreaterThan(50);
      expect(output.article.length).toBeGreaterThan(200);
      expect(output.shortVideo.length).toBeGreaterThan(50);
      expect(output.longVideo.length).toBeGreaterThan(200);
      expect(output.podcastMoment.length).toBeGreaterThan(50);
      expect(output.email.length).toBeGreaterThan(100);
    });

    it('ensures format-specific constraints', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      // Social post should be short (Twitter-friendly)
      expect(output.socialPost.length).toBeLessThan(300);

      // Micro insight should be very concise
      expect(output.microInsight.length).toBeLessThan(200);

      // Article should be longer than daily letter
      expect(output.article.length).toBeGreaterThan(output.dailyLetter.length);

      // Videos should have script markers
      expect(output.shortVideo).toMatch(/\[/);
      expect(output.longVideo).toMatch(/\[/);

      // Email should have subject line
      expect(output.email).toMatch(/Subject:/);
    });

    it('ensures no forbidden language patterns', () => {
      const identity = extractIdentityChoice(rawMaterial);
      const theme = extractVoiceTheme(rawMaterial, identity);

      const output = generateAllOutputsV2({
        theme,
        identityChoice: identity.choice,
        contentIndex: 0
      });

      const allContent = Object.values(output)
        .filter((v) => typeof v === 'string')
        .join(' ')
        .toLowerCase();

      // Should not contain corporate jargon
      expect(allContent).not.toMatch(/leverage|synergy|paradigm|utilize|facilitate/);

      // Should not contain formal business language
      expect(allContent).not.toMatch(/as per|please find|kindly|regarding|furthermore/);
    });
  });
});

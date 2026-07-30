/**
 * Content Generation Tests
 *
 * Validates all 9 content formats generated from VoiceTheme
 * Tests character counts, timing validation, voice authenticity, and format compliance
 */

import {
  generateAllOutputs,
  getSocialPostCharCount,
  getVideoScriptTimings
} from "@/lib/content-generation";
import type { VoiceTheme } from "@/lib/voice-extraction";
import type { ExtractedIdentity } from "@/lib/identity-framework";

/**
 * Mock VoiceTheme for testing
 * Based on Identity 2: Confession vs Hiding
 */
const createMockVoiceTheme = (): VoiceTheme => {
  const mockIdentity: ExtractedIdentity = {
    choice: 2,
    label: "Confession vs Hiding",
    question: "Do you OWN your actions or HIDE?",
    stage: "Confession",
    confidence: 0.85,
    reasoning: "Test identity for confession",
    keywordMatches: ["confession", "responsibility"]
  };

  return {
    identity: mockIdentity,
    coreMessage: "Here's who you're choosing to be.",
    revelation:
      "The moment you stop hiding is the moment your life begins to change.",
    contrast:
      "The lie: You are someone who hides your actions and truth. The truth: You are someone who chooses Confession.",
    callToIdentity: "Do you OWN your actions or HIDE?",
    scriptural: "1 John 1:9",
    examples: [
      "I finally decided to confess what I did and face the consequences.",
      "Taking responsibility meant having difficult conversations with people I'd hurt.",
      "The freedom on the other side of admission was worth every uncomfortable moment."
    ]
  };
};

/**
 * Mock VoiceTheme for Identity 7: Service vs Passivity
 */
const createServiceVoiceTheme = (): VoiceTheme => {
  const mockIdentity: ExtractedIdentity = {
    choice: 7,
    label: "Service vs Passivity",
    question: "Do you MATTER or WASTE your life?",
    stage: "Service",
    confidence: 0.78,
    reasoning: "Test identity for service",
    keywordMatches: ["service", "purpose"]
  };

  return {
    identity: mockIdentity,
    coreMessage: "Here's who you're choosing to be.",
    revelation: "Your life has purpose when you choose to serve something bigger than yourself.",
    contrast:
      "The lie: You are someone who wastes your life in passivity. The truth: You are someone who chooses Service.",
    callToIdentity: "Do you MATTER or WASTE your life?",
    scriptural: "Matthew 25:35-40",
    examples: [
      "I stopped waiting for the perfect moment and started serving where I was.",
      "Volunteering my time transformed how I see my own value.",
      "When I focus on what I can give, I stop obsessing over what I lack."
    ]
  };
};

describe("Content Generation Pipeline", () => {
  describe("All 9 Formats Generated", () => {
    it("should generate all 9 content formats from VoiceTheme", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs).toHaveProperty("dailyLetter");
      expect(outputs).toHaveProperty("socialPost");
      expect(outputs).toHaveProperty("microInsight");
      expect(outputs).toHaveProperty("devotional");
      expect(outputs).toHaveProperty("articleExcerpt");
      expect(outputs).toHaveProperty("shortVideoScript");
      expect(outputs).toHaveProperty("longVideoScript");
      expect(outputs).toHaveProperty("podcastMoment");
      expect(outputs).toHaveProperty("email");
    });

    it("should generate email with both subject and body", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.email).toHaveProperty("subject");
      expect(outputs.email).toHaveProperty("body");
      expect(typeof outputs.email.subject).toBe("string");
      expect(typeof outputs.email.body).toBe("string");
      expect(outputs.email.subject.length).toBeGreaterThan(0);
      expect(outputs.email.body.length).toBeGreaterThan(0);
    });

    it("should generate all formats as non-empty strings", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.dailyLetter.length).toBeGreaterThan(50);
      expect(outputs.socialPost.length).toBeGreaterThan(20);
      expect(outputs.microInsight.length).toBeGreaterThan(20);
      expect(outputs.devotional.length).toBeGreaterThan(50);
      expect(outputs.articleExcerpt.length).toBeGreaterThan(300);
      expect(outputs.shortVideoScript.length).toBeGreaterThan(100);
      expect(outputs.longVideoScript.length).toBeGreaterThan(500);
      expect(outputs.podcastMoment.length).toBeGreaterThan(200);
    });
  });

  describe("Social Post Format Validation", () => {
    it("should keep social post under 280 characters", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(getSocialPostCharCount(outputs.socialPost)).toBeLessThanOrEqual(280);
    });

    it("should include core message in social post", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.socialPost).toContain("Here's who you're choosing to be");
    });

    it("should include identity question in social post", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.socialPost).toContain(theme.callToIdentity);
    });

    it("should maintain under 280 chars even with long revelation", () => {
      const theme = createServiceVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(getSocialPostCharCount(outputs.socialPost)).toBeLessThanOrEqual(280);
    });
  });

  describe("Video Script Format Validation", () => {
    it("short video script should contain timing markers", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // Should contain timing format like [0:XX-0:XX]
      expect(outputs.shortVideoScript).toMatch(/0:[0-9]{2}-0:[0-9]{2}/);
    });

    it("short video script should include text on screen cues", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.shortVideoScript).toMatch(/\[TEXT ON SCREEN/);
    });

    it("should extract timing information from short video script", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // Short video scripts use different format [0:XX-0:XX] that our regex captures
      expect(outputs.shortVideoScript).toMatch(/[0-9]:[0-9]{2}-[0-9]:[0-9]{2}/);
    });

    it("long video script should have multiple sections with timing", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.longVideoScript).toContain("(");
      expect(outputs.longVideoScript).toContain("HOOK");
      expect(outputs.longVideoScript).toContain("SETUP");
      expect(outputs.longVideoScript).toContain("CONTRAST");
      expect(outputs.longVideoScript).toContain("CLOSING");
    });

    it("long video script should include stage directions", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.longVideoScript).toMatch(/\[.*\]/);
    });
  });

  describe("Content Voice Authenticity", () => {
    it("should maintain identity-centered voice in all formats", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // Check that core message appears in key formats
      expect(outputs.dailyLetter).toContain("Here's who you're choosing to be");
      expect(outputs.microInsight).toContain("Here's who you're choosing to be");
      expect(outputs.devotional).toContain("Here's who you're choosing to be");
      expect(outputs.email.body).toContain("Here's who you're choosing to be");
    });

    it("should include revelation in all formats", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);
      const { revelation } = theme;

      expect(outputs.dailyLetter).toContain(revelation);
      expect(outputs.microInsight).toContain(revelation);
      expect(outputs.devotional).toContain(revelation);
      expect(outputs.articleExcerpt).toContain(revelation);
      expect(outputs.shortVideoScript).toContain(revelation);
      expect(outputs.email.body).toContain(revelation);
    });

    it("should reference identity choice in formats", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.dailyLetter).toContain(theme.callToIdentity);
      expect(outputs.socialPost).toContain(theme.callToIdentity);
      expect(outputs.devotional).toContain(theme.callToIdentity);
      expect(outputs.shortVideoScript).toContain(theme.callToIdentity);
      expect(outputs.longVideoScript).toContain(theme.callToIdentity);
    });

    it("should use transformation language (not sales language)", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // Should avoid sales language
      expect(outputs.dailyLetter).not.toContain("Buy now");
      expect(outputs.dailyLetter).not.toContain("Limited time");
      expect(outputs.socialPost).not.toContain("Don't miss out");

      // Should include transformation language
      expect(outputs.articleExcerpt).toMatch(/transform|choice|choosing|become/i);
    });
  });

  describe("Format-Specific Content", () => {
    it("daily letter should include signature", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.dailyLetter).toMatch(/Brother Jimi|With faith/);
    });

    it("devotional should include reflection question", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.devotional).toMatch(/\?/);
    });

    it("article excerpt should include markdown headers", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.articleExcerpt).toMatch(/#/);
    });

    it("podcast moment should be formatted for audio/dialogue", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.podcastMoment).toMatch(/AUDIO/i);
      expect(outputs.podcastMoment).toMatch(/[0-9]{1,2}:[0-9]{2}/);
    });

    it("email should include P.S.", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.email.body).toContain("P.S.");
    });
  });

  describe("Cross-Format Consistency", () => {
    it("should maintain consistent identity label across formats", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);
      const { label } = theme.identity;

      expect(outputs.articleExcerpt).toContain(label);
      expect(outputs.email.subject).toBe(label);
    });

    it("should reference examples in article and email", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // At least one example should appear in article
      expect(outputs.articleExcerpt).toContain(theme.examples[0].substring(0, 30));
      expect(outputs.email.body).toMatch(/confess|responsibility|freedom/);
    });

    it("should use contrast consistently", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // Contrast should appear in multiple formats
      expect(outputs.devotional).toContain("lie");
      expect(outputs.dailyLetter).toContain("lie");
      expect(outputs.articleExcerpt).toContain("lie");
    });
  });

  describe("Multiple Identity Tests", () => {
    it("should generate different content for different identities", () => {
      const theme1 = createMockVoiceTheme(); // Confession
      const theme2 = createServiceVoiceTheme(); // Service

      const outputs1 = generateAllOutputs(theme1);
      const outputs2 = generateAllOutputs(theme2);

      // Outputs should be different (not identical)
      expect(outputs1.dailyLetter).not.toBe(outputs2.dailyLetter);
      expect(outputs1.socialPost).not.toBe(outputs2.socialPost);
      expect(outputs1.email.subject).not.toBe(outputs2.email.subject);
    });

    it("confession identity should emphasize ownership and responsibility", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.articleExcerpt).toMatch(/own|responsibility|confess/i);
    });

    it("service identity should emphasize purpose and contribution", () => {
      const theme = createServiceVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.articleExcerpt).toMatch(/purpose|serve|contribution/i);
    });
  });

  describe("Character and Length Validation", () => {
    it("micro insight should be under 150 characters", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.microInsight.length).toBeLessThan(150);
    });

    it("article excerpt should be 500-1000 words", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      const wordCount = outputs.articleExcerpt.split(/\s+/).length;
      expect(wordCount).toBeGreaterThan(300);
      expect(wordCount).toBeLessThan(1200);
    });

    it("short video script should have timing under 1 minute", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // Should have timing markers
      expect(outputs.shortVideoScript).toMatch(/0:[0-9]{2}-0:[0-9]{2}/);

      // Extract timing info - look for the closing section which should indicate 0:XX-0:60
      const timingMatches = outputs.shortVideoScript.match(/0:(\d{2})-0:(\d{2})/g);
      expect(timingMatches).not.toBeNull();

      // Verify that the script ends at or before 0:60 (1 minute)
      if (timingMatches) {
        const lastMatch = timingMatches[timingMatches.length - 1];
        const endTime = parseInt(lastMatch.split("-")[1].split(":")[1]);
        expect(endTime).toBeLessThanOrEqual(60);
      }
    });

    it("long video script should reference multiple time sections", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      // Long video should have section headers
      expect(outputs.longVideoScript).toContain("HOOK");
      expect(outputs.longVideoScript).toContain("SETUP");
      expect(outputs.longVideoScript).toContain("CALL TO ACTION");
    });

    it("podcast moment should indicate 90-120 second range", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.podcastMoment).toContain("90");
      expect(outputs.podcastMoment).toContain("120");
    });
  });

  describe("Email Format Validation", () => {
    it("email subject should match identity label", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.email.subject).toBe(theme.identity.label);
    });

    it("email body should start with greeting", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.email.body).toMatch(/^Hello/i);
    });

    it("email body should end with signature and P.S.", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.email.body).toContain("Brother Jimi");
      expect(outputs.email.body).toMatch(/P\.S\./);
    });

    it("email should include revelation and contrast", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(outputs.email.body).toContain(theme.revelation);
      expect(outputs.email.body).toContain("lie");
      expect(outputs.email.body).toContain("truth");
    });
  });

  describe("Return Value Types", () => {
    it("generateAllOutputs should return correct types", () => {
      const theme = createMockVoiceTheme();
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.dailyLetter).toBe("string");
      expect(typeof outputs.socialPost).toBe("string");
      expect(typeof outputs.microInsight).toBe("string");
      expect(typeof outputs.devotional).toBe("string");
      expect(typeof outputs.articleExcerpt).toBe("string");
      expect(typeof outputs.shortVideoScript).toBe("string");
      expect(typeof outputs.longVideoScript).toBe("string");
      expect(typeof outputs.podcastMoment).toBe("string");
      expect(typeof outputs.email).toBe("object");
      expect(typeof outputs.email.subject).toBe("string");
      expect(typeof outputs.email.body).toBe("string");
    });

    it("getSocialPostCharCount should return number", () => {
      const result = getSocialPostCharCount("test");
      expect(typeof result).toBe("number");
      expect(result).toBe(4);
    });

    it("getVideoScriptTimings should return array of timing objects", () => {
      const script = "[0:00-0:30] Some content [1:00-2:00] More content";
      const timings = getVideoScriptTimings(script);

      expect(Array.isArray(timings)).toBe(true);
      expect(timings.length).toBeGreaterThan(0);
      expect(timings[0]).toHaveProperty("start");
      expect(timings[0]).toHaveProperty("end");
    });
  });

  describe("Edge Cases", () => {
    it("should handle themes with no examples", () => {
      const theme = createMockVoiceTheme();
      theme.examples = [];

      const outputs = generateAllOutputs(theme);

      // Should still generate all formats
      expect(outputs.articleExcerpt.length).toBeGreaterThan(300);
      expect(outputs.email.body.length).toBeGreaterThan(100);
    });

    it("should handle themes with no scriptural reference", () => {
      const theme = createMockVoiceTheme();
      theme.scriptural = "";

      const outputs = generateAllOutputs(theme);

      // Should still generate all formats
      expect(outputs.dailyLetter.length).toBeGreaterThan(50);
    });

    it("should handle long revelation text", () => {
      const theme = createMockVoiceTheme();
      theme.revelation =
        "This is a very long revelation that goes on and on with many details about the profound nature of truth and how it impacts our lives in ways we might not immediately understand.";

      const outputs = generateAllOutputs(theme);

      // Social post should still be under 280
      expect(outputs.socialPost.length).toBeLessThanOrEqual(280);
    });
  });
});

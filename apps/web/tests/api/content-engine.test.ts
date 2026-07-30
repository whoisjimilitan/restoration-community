/**
 * Content Engine Tests
 *
 * Tests for the identity extraction and output generation pipeline
 */

import { generateAllOutputs, type ContentOutputs } from "@/lib/content-generation";
import { extractIdentityChoice } from "@/lib/identity-extraction";
import { extractVoiceTheme } from "@/lib/voice-extraction";

describe("Content Engine: Output Generation", () => {
  const testText =
    "I decided to confess what I did wrong. I'm taking responsibility for my actions and making a change. This is who I'm choosing to be.";

  describe("Output Generation", () => {
    it("should generate all 9 content formats", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
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

    it("should generate daily letter with correct structure", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.dailyLetter).toBe("string");
      expect(outputs.dailyLetter.length).toBeGreaterThan(0);
      expect(outputs.dailyLetter).toContain("Brother Jimi");
    });

    it("should generate social post with correct structure", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.socialPost).toBe("string");
      expect(outputs.socialPost.length).toBeGreaterThan(0);
    });

    it("should generate micro-insight with correct structure", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.microInsight).toBe("string");
      expect(outputs.microInsight.length).toBeGreaterThan(0);
    });

    it("should generate devotional with correct structure", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.devotional).toBe("string");
      expect(outputs.devotional.length).toBeGreaterThan(0);
    });

    it("should generate article excerpt with correct structure", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.articleExcerpt).toBe("string");
      expect(outputs.articleExcerpt.length).toBeGreaterThan(0);
      expect(outputs.articleExcerpt).toContain("#");
    });

    it("should generate short video script with timing markers", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.shortVideoScript).toBe("string");
      expect(outputs.shortVideoScript.length).toBeGreaterThan(0);
      expect(outputs.shortVideoScript).toContain("[");
    });

    it("should generate long video script with timing markers", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.longVideoScript).toBe("string");
      expect(outputs.longVideoScript.length).toBeGreaterThan(0);
      expect(outputs.longVideoScript).toContain("[");
    });

    it("should generate podcast moment with correct structure", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(typeof outputs.podcastMoment).toBe("string");
      expect(outputs.podcastMoment.length).toBeGreaterThan(0);
    });

    it("should generate email with subject and body", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(outputs.email).toHaveProperty("subject");
      expect(outputs.email).toHaveProperty("body");
      expect(typeof outputs.email.subject).toBe("string");
      expect(typeof outputs.email.body).toBe("string");
      expect(outputs.email.subject.length).toBeGreaterThan(0);
      expect(outputs.email.body.length).toBeGreaterThan(0);
    });
  });

  describe("Content Quality", () => {
    it("should include identity stage in outputs", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      const allContent = [
        outputs.dailyLetter,
        outputs.devotional,
        outputs.articleExcerpt
      ].join(" ");

      // At least one format should reference the identity stage
      expect(
        allContent.toLowerCase().includes(identity.stage.toLowerCase()) ||
          allContent.includes("choosing")
      ).toBe(true);
    });

    it("should include revelation in key formats", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      // Revelation should appear in multiple formats
      const count = [
        outputs.dailyLetter,
        outputs.articleExcerpt,
        outputs.podcastMoment
      ].filter((f) =>
        f.toLowerCase().includes(theme.revelation.substring(0, 20).toLowerCase())
      ).length;

      expect(count).toBeGreaterThanOrEqual(1);
    });

    it("should maintain consistent voice", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      // All outputs should reference "choosing to be" or similar phrases
      const formats = [
        outputs.dailyLetter,
        outputs.devotional,
        outputs.articleExcerpt,
        outputs.email.body
      ];

      const choosingReferences = formats.filter((f) =>
        f.toLowerCase().includes("choosing")
      ).length;

      expect(choosingReferences).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Different Identity Choices", () => {
    it("should adapt content for Identity 1 (Truth vs Deception)", () => {
      const truthText =
        "I committed to honesty and transparency. No more lies. Truth is the foundation.";
      const identity = extractIdentityChoice(truthText);
      const theme = extractVoiceTheme(truthText, identity);
      const outputs = generateAllOutputs(theme);

      expect(identity.choice).toBe(1);
      expect(outputs.articleExcerpt).toContain("Truth");
    });

    it("should adapt content for Identity 4 (Forgiveness vs Bitterness)", () => {
      const forgivenessText =
        "I forgave those who hurt me. I released the resentment and found healing. Grace changed everything.";
      const identity = extractIdentityChoice(forgivenessText);
      const theme = extractVoiceTheme(forgivenessText, identity);
      const outputs = generateAllOutputs(theme);

      expect(identity.choice).toBe(4);
      expect(outputs.devotional).toContain("Forgiveness");
    });

    it("should adapt content for Identity 7 (Service vs Passivity)", () => {
      const serviceText =
        "I found my purpose serving others. My life has meaning now, not waste. I matter.";
      const identity = extractIdentityChoice(serviceText);
      const theme = extractVoiceTheme(serviceText, identity);
      const outputs = generateAllOutputs(theme);

      expect(identity.choice).toBe(7);
      expect(outputs.articleExcerpt).toContain("Service");
    });
  });

  describe("Email Format", () => {
    it("should include identity label in subject", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(outputs.email.subject).toContain(identity.label);
    });

    it("should have meaningful body content", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(outputs.email.body.length).toBeGreaterThan(100);
      expect(outputs.email.body).toContain("Brother Jimi");
    });
  });

  describe("Video Script Formatting", () => {
    it("should include timing markers in short video script", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(outputs.shortVideoScript).toContain("[OPENING");
      expect(outputs.shortVideoScript).toContain("[CLOSING");
      expect(outputs.shortVideoScript).toContain("[TEXT");
    });

    it("should include detailed sections in long video script", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      expect(outputs.longVideoScript).toContain("HOOK");
      expect(outputs.longVideoScript).toContain("SETUP");
      expect(outputs.longVideoScript).toContain("minutes");
    });
  });

  describe("Word Count Estimation", () => {
    it("should generate appropriately sized formats", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      const microWords = outputs.microInsight.split(/\s+/).length;
      const dailyWords = outputs.dailyLetter.split(/\s+/).length;
      const articleWords = outputs.articleExcerpt.split(/\s+/).length;

      // Micro-insight should be shortest
      expect(microWords).toBeLessThan(dailyWords);
      // Daily letter should be shorter than article
      expect(dailyWords).toBeLessThan(articleWords);
    });

    it("should generate substantial video scripts", () => {
      const identity = extractIdentityChoice(testText);
      const theme = extractVoiceTheme(testText, identity);
      const outputs = generateAllOutputs(theme);

      const shortVideoWords = outputs.shortVideoScript.split(/\s+/).length;
      const longVideoWords = outputs.longVideoScript.split(/\s+/).length;

      // Long video should be longer than short video
      expect(longVideoWords).toBeGreaterThan(shortVideoWords);
      // Both should have substantial content
      expect(shortVideoWords).toBeGreaterThan(50);
      expect(longVideoWords).toBeGreaterThan(200);
    });
  });
});

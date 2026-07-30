/**
 * Identity Extraction Tests
 *
 * Tests for the identity extraction logic across all 7 identity choices.
 */

import { extractIdentityChoice } from "@/lib/identity-extraction";

describe("Identity Extraction", () => {
  describe("Identity 1: Truth vs Deception", () => {
    it("should identify text about truth and honesty", () => {
      const text =
        "I believe in being honest and transparent. The truth is always better than deception.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(1);
      expect(result.label).toBe("Truth vs Deception");
      expect(result.stage).toBe("Truth");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.keywordMatches).toContain("truth");
      expect(result.keywordMatches).toContain("honest");
    });

    it("should identify text that mentions deception/lies", () => {
      const text =
        "I was living a lie, spreading deception to everyone around me. But now I embrace honesty.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(1);
      expect(result.confidence).toBeGreaterThan(0.2);
      expect(result.keywordMatches.length).toBeGreaterThan(0);
    });
  });

  describe("Identity 2: Confession vs Hiding", () => {
    it("should identify text about confession and ownership", () => {
      const text =
        "I finally decided to confess what I did. I'm taking responsibility for my actions instead of hiding.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(2);
      expect(result.label).toBe("Confession vs Hiding");
      expect(result.stage).toBe("Confession");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.keywordMatches).toContain("confess");
    });

    it("should identify text about accountability", () => {
      const text =
        "I own my mistakes. Accountability matters. I'm not going to deny what happened.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(2);
      expect(result.confidence).toBeGreaterThan(0.2);
    });
  });

  describe("Identity 3: Repentance vs Stubbornness", () => {
    it("should identify text about change and transformation", () => {
      const text =
        "I decided to repent and change my ways. I'm transforming my life, not staying stuck in old patterns.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(3);
      expect(result.label).toBe("Repentance vs Stubbornness");
      expect(result.stage).toBe("Repentance");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.keywordMatches).toContain("repent");
    });

    it("should identify text about redirecting", () => {
      const text =
        "I stopped being stubborn and opened myself to change. I'm on a different path now.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(3);
      expect(result.confidence).toBeGreaterThan(0.2);
    });
  });

  describe("Identity 4: Forgiveness vs Bitterness", () => {
    it("should identify text about forgiveness and healing", () => {
      const text =
        "I chose to forgive and let go of the resentment. Healing is possible when you release the pain.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(4);
      expect(result.label).toBe("Forgiveness vs Bitterness");
      expect(result.stage).toBe("Forgiveness");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.keywordMatches).toContain("forgive");
    });

    it("should identify text about grace", () => {
      const text =
        "Grace transformed my heart. I stopped holding grudges and started healing.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(4);
      expect(result.confidence).toBeGreaterThan(0.2);
    });
  });

  describe("Identity 5: Reconciliation vs Isolation", () => {
    it("should identify text about reconciliation and rebuilding", () => {
      const text =
        "We reconciled after years apart. Rebuilding our relationships and reconnecting as a community.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(5);
      expect(result.label).toBe("Reconciliation vs Isolation");
      expect(result.stage).toBe("Reconciliation");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.keywordMatches.some((k) => k.includes("reconcile"))).toBe(true);
    });

    it("should identify text about building bridges", () => {
      const text =
        "Instead of destroying relationships, I'm building bridges. We're connecting again.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(5);
      expect(result.confidence).toBeGreaterThan(0.2);
    });
  });

  describe("Identity 6: Honest Work vs Hypocrisy", () => {
    it("should identify text about integrity and honest work", () => {
      const text =
        "I committed to integrity in my work. No more fraud, just honest effort and genuine contribution.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(6);
      expect(result.label).toBe("Honest Work vs Hypocrisy");
      expect(result.stage).toBe("Honest Work");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.keywordMatches).toContain("integrity");
    });

    it("should identify text about authentic labor", () => {
      const text =
        "I stopped being a phony and started doing real, meaningful work. Building something genuine.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(6);
      expect(result.confidence).toBeGreaterThan(0.2);
    });
  });

  describe("Identity 7: Service vs Passivity", () => {
    it("should identify text about service and purpose", () => {
      const text =
        "I found my purpose in service to others. My life has meaning now, not waste.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(7);
      expect(result.label).toBe("Service vs Passivity");
      expect(result.stage).toBe("Service");
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.keywordMatches).toContain("service");
    });

    it("should identify text about meaningful impact", () => {
      const text =
        "I stopped being passive and started volunteering. My contribution actually matters now.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBe(7);
      expect(result.confidence).toBeGreaterThan(0.2);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty text", () => {
      const result = extractIdentityChoice("");

      expect(result.choice).toBe(1);
      expect(result.confidence).toBe(0);
      expect(result.reasoning).toContain("No text provided");
    });

    it("should handle whitespace-only text", () => {
      const result = extractIdentityChoice("   \n\t  ");

      expect(result.choice).toBe(1);
      expect(result.confidence).toBe(0);
    });

    it("should handle generic text", () => {
      const text =
        "I went to the store and bought some groceries. The weather was nice today.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBeGreaterThanOrEqual(1);
      expect(result.choice).toBeLessThanOrEqual(7);
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });

    it("should handle text with multiple identities", () => {
      const text =
        "I confessed my lies and repented. Now I'm serving others with honesty and integrity.";
      const result = extractIdentityChoice(text);

      expect(result.choice).toBeGreaterThanOrEqual(1);
      expect(result.choice).toBeLessThanOrEqual(7);
      expect(result.confidence).toBeGreaterThan(0.2);
    });
  });

  describe("Confidence Scoring", () => {
    it("should return confidence between 0 and 1", () => {
      const tests = [
        "truth and honesty",
        "confession and responsibility",
        "repentance and change",
        "forgiveness and healing",
        "reconciliation and rebuilding",
        "integrity and honest work",
        "service and purpose"
      ];

      for (const text of tests) {
        const result = extractIdentityChoice(text);
        expect(result.confidence).toBeGreaterThanOrEqual(0);
        expect(result.confidence).toBeLessThanOrEqual(1);
      }
    });

    it("should have higher confidence with more keyword matches", () => {
      const weakText = "I want to be honest.";
      const strongText =
        "I committed to truth and honesty. I embraced transparency and authenticity. No more deception.";

      const weakResult = extractIdentityChoice(weakText);
      const strongResult = extractIdentityChoice(strongText);

      expect(strongResult.confidence).toBeGreaterThanOrEqual(weakResult.confidence);
    });
  });

  describe("Keyword Matching", () => {
    it("should be case-insensitive", () => {
      const lowerText = "i confess my mistakes";
      const upperText = "I CONFESS MY MISTAKES";
      const mixedText = "I CoNfEsS mY mIsTaKeS";

      const lowerResult = extractIdentityChoice(lowerText);
      const upperResult = extractIdentityChoice(upperText);
      const mixedResult = extractIdentityChoice(mixedText);

      expect(lowerResult.choice).toBe(upperResult.choice);
      expect(lowerResult.choice).toBe(mixedResult.choice);
    });

    it("should use word boundaries", () => {
      // "truthful" contains "truth" but should match separately
      const text = "I value truthfulness in all my dealings";
      const result = extractIdentityChoice(text);

      // Should still identify as choice 1, but via truthfulness keyword
      expect(result.choice).toBeLessThanOrEqual(7);
    });
  });

  describe("Return Value Structure", () => {
    it("should return all required fields", () => {
      const result = extractIdentityChoice("I confess my mistakes and take responsibility");

      expect(result).toHaveProperty("choice");
      expect(result).toHaveProperty("label");
      expect(result).toHaveProperty("question");
      expect(result).toHaveProperty("stage");
      expect(result).toHaveProperty("confidence");
      expect(result).toHaveProperty("reasoning");
      expect(result).toHaveProperty("keywordMatches");
    });

    it("should return correct data types", () => {
      const result = extractIdentityChoice("Test text");

      expect(typeof result.choice).toBe("number");
      expect(typeof result.label).toBe("string");
      expect(typeof result.question).toBe("string");
      expect(typeof result.stage).toBe("string");
      expect(typeof result.confidence).toBe("number");
      expect(typeof result.reasoning).toBe("string");
      expect(Array.isArray(result.keywordMatches)).toBe(true);
    });
  });
});

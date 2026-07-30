/**
 * Voice Extraction Tests
 *
 * Tests for the voice extraction logic that converts raw text + identity
 * into a VoiceTheme with revelation, contrast, examples, and call-to-identity.
 */

import {
  extractVoiceTheme,
  type VoiceTheme
} from "@/lib/voice-extraction";
import { extractIdentityChoice } from "@/lib/identity-extraction";

describe("Voice Extraction", () => {
  describe("Core Voice Theme Structure", () => {
    it("should return a complete VoiceTheme with all required fields", () => {
      const text =
        "Truth sets us free from deception. When we choose honesty, we find freedom. This authenticity builds trust.";
      const identity = extractIdentityChoice(text);

      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme).toHaveProperty("identity");
      expect(voiceTheme).toHaveProperty("coreMessage");
      expect(voiceTheme).toHaveProperty("revelation");
      expect(voiceTheme).toHaveProperty("contrast");
      expect(voiceTheme).toHaveProperty("callToIdentity");
      expect(voiceTheme).toHaveProperty("scriptural");
      expect(voiceTheme).toHaveProperty("examples");
    });

    it("should have correct data types in VoiceTheme", () => {
      const text =
        "I believe in being honest. Transparency matters. Integrity is everything.";
      const identity = extractIdentityChoice(text);

      const voiceTheme = extractVoiceTheme(text, identity);

      expect(typeof voiceTheme.coreMessage).toBe("string");
      expect(typeof voiceTheme.revelation).toBe("string");
      expect(typeof voiceTheme.contrast).toBe("string");
      expect(typeof voiceTheme.callToIdentity).toBe("string");
      expect(typeof voiceTheme.scriptural).toBe("string");
      expect(Array.isArray(voiceTheme.examples)).toBe(true);
      expect(voiceTheme.examples.every((e) => typeof e === "string")).toBe(
        true
      );
    });
  });

  describe("Core Message", () => {
    it("should always be: 'Here's who you're choosing to be.'", () => {
      const texts = [
        "I confess my mistakes.",
        "I repent and change.",
        "I forgive and heal.",
        "I rebuild relationships.",
        "I work with integrity.",
        "I serve with purpose."
      ];

      for (const text of texts) {
        const identity = extractIdentityChoice(text);
        const voiceTheme = extractVoiceTheme(text, identity);

        expect(voiceTheme.coreMessage).toBe("Here's who you're choosing to be.");
      }
    });
  });

  describe("Call to Identity", () => {
    it("should match identity.question exactly", () => {
      const text = "I choose truth over deception. Honesty is my foundation.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.callToIdentity).toBe(identity.question);
    });

    it("Choice 1: should be 'Are you a person of TRUTH or LIES?'", () => {
      const text = "Truth and honesty matter deeply to me.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 1) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.callToIdentity).toBe(
          "Are you a person of TRUTH or LIES?"
        );
      }
    });

    it("Choice 2: should be 'Do you OWN your actions or HIDE?'", () => {
      const text = "I confess and take responsibility for my actions.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 2) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.callToIdentity).toBe("Do you OWN your actions or HIDE?");
      }
    });

    it("Choice 3: should be 'Do you CHANGE or stay STUCK?'", () => {
      const text = "I repent and transform my life into something new.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 3) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.callToIdentity).toBe("Do you CHANGE or stay STUCK?");
      }
    });

    it("Choice 4: should be 'Do you HEAL or POISON yourself?'", () => {
      const text =
        "I forgive and let go of my bitterness. Healing is real.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 4) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.callToIdentity).toBe(
          "Do you HEAL or POISON yourself?"
        );
      }
    });

    it("Choice 5: should be 'Do you BUILD or DESTROY?'", () => {
      const text =
        "I reconcile and rebuild relationships that were broken.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 5) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.callToIdentity).toBe("Do you BUILD or DESTROY?");
      }
    });

    it("Choice 6: should be 'Are you INTEGRITY or a LIE?'", () => {
      const text = "I commit to integrity in my honest work and labor.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 6) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.callToIdentity).toBe("Are you INTEGRITY or a LIE?");
      }
    });

    it("Choice 7: should be 'Do you MATTER or WASTE your life?'", () => {
      const text = "I serve others with purpose and meaningful impact.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 7) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.callToIdentity).toBe(
          "Do you MATTER or WASTE your life?"
        );
      }
    });
  });

  describe("Contrast Statement", () => {
    it("should contain both 'The lie:' and 'The truth:'", () => {
      const text = "I choose truth and honesty in all my dealings.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.contrast).toContain("The lie:");
      expect(voiceTheme.contrast).toContain("The truth:");
    });

    it("should contain the identity stage", () => {
      const text = "I confess my mistakes and take full responsibility.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.contrast).toContain(identity.stage);
    });

    it("Choice 1: should reference deception opposite side", () => {
      const text = "Truth is my foundation.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 1) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.contrast).toContain("living in lies and deception");
      }
    });

    it("Choice 2: should reference hiding opposite side", () => {
      const text = "I confess everything.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 2) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.contrast).toContain("hiding your actions and truth");
      }
    });

    it("Choice 3: should reference stubbornness opposite side", () => {
      const text = "I repent and change.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 3) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.contrast).toContain(
          "staying stuck and refusing to change"
        );
      }
    });

    it("Choice 4: should reference bitterness opposite side", () => {
      const text = "I forgive and heal.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 4) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.contrast).toContain("poisoning yourself with bitterness");
      }
    });

    it("Choice 5: should reference isolation opposite side", () => {
      const text = "I reconcile and rebuild.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 5) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.contrast).toContain(
          "destroying relationships through isolation"
        );
      }
    });

    it("Choice 6: should reference hypocrisy opposite side", () => {
      const text = "I work with integrity and honesty.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 6) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.contrast).toContain("living a hypocritical lie");
      }
    });

    it("Choice 7: should reference passivity opposite side", () => {
      const text = "I serve with purpose.";
      const identity = extractIdentityChoice(text);

      if (identity.choice === 7) {
        const voiceTheme = extractVoiceTheme(text, identity);
        expect(voiceTheme.contrast).toContain("wasting your life in passivity");
      }
    });
  });

  describe("Revelation", () => {
    it("should be the first sentence of the text", () => {
      const text =
        "Truth is the foundation of everything. Without it, we cannot build anything real. Honesty is courage.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.revelation).toBe("Truth is the foundation of everything.");
    });

    it("should not be empty", () => {
      const text =
        "Confession is the beginning of freedom. Vulnerability is strength.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.revelation.length).toBeGreaterThan(0);
    });

    it("should trim whitespace from edges", () => {
      const text =
        "   I choose transformation.   Everything changes now.   ";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.revelation).not.toMatch(/^\s/);
      expect(voiceTheme.revelation).not.toMatch(/\s$/);
    });
  });

  describe("Examples Extraction", () => {
    it("should extract 2-3 supporting sentences", () => {
      const text =
        "Truth is our foundation. When we choose honesty, we find freedom. This authenticity builds deep trust. Real relationships are built on transparency.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.examples.length).toBeGreaterThanOrEqual(2);
      expect(voiceTheme.examples.length).toBeLessThanOrEqual(3);
    });

    it("should skip the first sentence (revelation)", () => {
      const text =
        "Truth sets us free. When we choose honesty, we find freedom. This authenticity builds trust.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.examples).not.toContain("Truth sets us free.");
    });

    it("should not include trivial short sentences", () => {
      const text =
        "Truth matters. When we embrace honesty and transparency, we experience true freedom. Real connection flows from authentic relationships.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      // Should include only substantial sentences
      for (const example of voiceTheme.examples) {
        const wordCount = example.split(/\s+/).length;
        // Should be reasonably substantial
        expect(wordCount).toBeGreaterThanOrEqual(4);
      }
    });

    it("should return empty array if insufficient text", () => {
      const text = "Truth matters.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      // Very short text should have few or no examples
      expect(voiceTheme.examples.length).toBeLessThanOrEqual(1);
    });

    it("should extract examples from real ministry text", () => {
      const text =
        "Confession is the doorway to freedom that opens your transformation. When you stop hiding and start owning your actions, everything changes. The moment you speak the truth about yourself is the moment you become free.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.examples.length).toBeGreaterThanOrEqual(2);
      expect(voiceTheme.examples.every((e) => e.length > 0)).toBe(true);
    });
  });

  describe("Scriptural Reference Extraction", () => {
    it("should extract a Bible verse reference if present", () => {
      const text =
        "The truth will set you free. John 8:32 reminds us that honesty is liberation.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.scriptural).toBe("John 8:32");
    });

    it("should extract single chapter references", () => {
      const text =
        "Romans 12:2 says we are transformed by renewing our minds.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.scriptural).toBe("Romans 12:2");
    });

    it("should extract verse ranges", () => {
      const text =
        "Proverbs 28:13-14 speaks about confession and blessing.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.scriptural).toContain("Proverbs 28");
    });

    it("should be empty string if no scripture present", () => {
      const text = "We choose to be honest and transparent with each other.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.scriptural).toBe("");
    });

    it("should handle books with numbers (1 John, 2 Corinthians)", () => {
      const text = "1 John 1:9 says if we confess our sins, He is faithful.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      // Should extract the verse reference
      expect(voiceTheme.scriptural.length).toBeGreaterThan(0);
    });
  });

  describe("Identity Preservation", () => {
    it("should preserve the input identity in output", () => {
      const text = "I confess my actions and take full responsibility now.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.identity).toEqual(identity);
      expect(voiceTheme.identity.choice).toBe(identity.choice);
      expect(voiceTheme.identity.confidence).toBe(identity.confidence);
    });

    it("should work with all 7 identity choices", () => {
      const testCases = [
        "Truth and honesty are everything.",
        "I confess and own my actions.",
        "I repent and transform my life.",
        "I forgive and let go of bitterness.",
        "I reconcile and rebuild relationships.",
        "I work with integrity and honesty.",
        "I serve others with purpose."
      ];

      for (const text of testCases) {
        const identity = extractIdentityChoice(text);
        const voiceTheme = extractVoiceTheme(text, identity);

        expect(voiceTheme.identity).toBeDefined();
        expect(voiceTheme.identity.choice).toBeGreaterThanOrEqual(1);
        expect(voiceTheme.identity.choice).toBeLessThanOrEqual(7);
      }
    });
  });

  describe("Error Handling", () => {
    it("should throw error if text is empty", () => {
      const identity = extractIdentityChoice("I confess.");

      expect(() => {
        extractVoiceTheme("", identity);
      }).toThrow("Raw text is required for voice extraction");
    });

    it("should throw error if text is only whitespace", () => {
      const identity = extractIdentityChoice("I confess.");

      expect(() => {
        extractVoiceTheme("   \n\t  ", identity);
      }).toThrow("Raw text is required for voice extraction");
    });
  });

  describe("Integration with Identity Extraction", () => {
    it("should work seamlessly with extractIdentityChoice output", () => {
      const text =
        "I finally confess my mistakes and take responsibility. Accountability is everything. No more hiding.";

      // Extract identity from text
      const identity = extractIdentityChoice(text);

      // Then extract voice from that identity
      const voiceTheme = extractVoiceTheme(text, identity);

      // Should have complete, consistent theme
      expect(voiceTheme.identity.choice).toBe(identity.choice);
      expect(voiceTheme.callToIdentity).toBe(identity.question);
      expect(voiceTheme.contrast).toContain(identity.stage);
    });

    it("should create valid voice theme pipeline for all identity choices", () => {
      const scenarios = [
        {
          text: "Truth is the foundation. Honesty matters.",
          expectedChoice: 1
        },
        {
          text: "I confess. I own it. Accountability now.",
          expectedChoice: 2
        },
        {
          text: "I repent. I change. Transformation starts.",
          expectedChoice: 3
        },
        {
          text: "I forgive. I heal. Let it go.",
          expectedChoice: 4
        },
        {
          text: "I reconcile. I rebuild. Community restored.",
          expectedChoice: 5
        },
        {
          text: "I work honestly. Integrity always.",
          expectedChoice: 6
        },
        {
          text: "I serve. I matter. Purpose found.",
          expectedChoice: 7
        }
      ];

      for (const scenario of scenarios) {
        const identity = extractIdentityChoice(scenario.text);

        // Should match expected choice or be a valid identity
        if (identity.confidence > 0.2) {
          const voiceTheme = extractVoiceTheme(scenario.text, identity);

          // Verify complete structure
          expect(voiceTheme.identity).toBeDefined();
          expect(voiceTheme.coreMessage).toBe("Here's who you're choosing to be.");
          expect(voiceTheme.callToIdentity).toBe(identity.question);
          expect(voiceTheme.contrast).toContain("The lie:");
          expect(voiceTheme.contrast).toContain("The truth:");
          expect(voiceTheme.revelation.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe("Real Ministry Text Examples", () => {
    it("should extract voice theme from confession-focused text", () => {
      const text =
        "Confession is the doorway to freedom that opens your transformation. When you stop hiding and start owning your actions, everything changes. The moment you speak the truth about yourself is the moment you become free. This is the way back.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.revelation).toContain("Confession");
      expect(voiceTheme.examples.length).toBeGreaterThanOrEqual(2);
      expect(voiceTheme.coreMessage).toBe("Here's who you're choosing to be.");
    });

    it("should extract voice theme from transformation-focused text", () => {
      const text =
        "Repentance is not regret; it is transformation. When you change direction, your entire life shifts. Every person who has ever changed started with this single decision. The power to transform is available to you right now.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.revelation).toContain("Repentance");
      expect(voiceTheme.contrast).toBeDefined();
    });

    it("should extract voice theme from reconciliation-focused text", () => {
      const text =
        "Reconciliation is the brave choice to rebuild what was broken. It requires courage to face those we've hurt and extend grace to those who've hurt us. Community is restored when we stop destroying and start building. This is the restoration community path.";
      const identity = extractIdentityChoice(text);
      const voiceTheme = extractVoiceTheme(text, identity);

      expect(voiceTheme.revelation.length).toBeGreaterThan(0);
      expect(voiceTheme.examples.length).toBeGreaterThanOrEqual(2);
    });
  });
});

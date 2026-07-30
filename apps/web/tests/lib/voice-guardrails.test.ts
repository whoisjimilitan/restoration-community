import { validateBrotherJimiVoice } from '@/lib/voice-guardrails';

describe('validateBrotherJimiVoice', () => {
  it('passes authentic voice samples', () => {
    const authentic = "You know what's happening? I see it. Here's the truth.";
    const result = validateBrotherJimiVoice(authentic);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeLessThan(2);
    expect(result.confidence).toBeGreaterThan(0.7);
  });

  it('warns on flowery language', () => {
    const flowery = "This profoundly elegant revelation will abundantly transform your life.";
    const result = validateBrotherJimiVoice(flowery);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(
      result.warnings.some(
        w =>
          w.toLowerCase().includes('flowery') ||
          w.toLowerCase().includes('elegant')
      )
    ).toBe(true);
  });

  it('warns on corporate jargon', () => {
    const corporate = "Let us leverage synergy to optimize your paradigm.";
    const result = validateBrotherJimiVoice(corporate);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(
      result.warnings.some(
        w =>
          w.toLowerCase().includes('jargon') ||
          w.toLowerCase().includes('leverage')
      )
    ).toBe(true);
  });

  it('warns on soft/passive language', () => {
    const soft = "Perhaps you might possibly consider the arguably important matter.";
    const result = validateBrotherJimiVoice(soft);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(
      result.warnings.some(
        w =>
          w.toLowerCase().includes('soft') ||
          w.toLowerCase().includes('passive')
      )
    ).toBe(true);
  });

  it('warns on excessive adjectives', () => {
    const adjectiveHeavy =
      "This beautiful, wonderful, magnificent truth will change your life.";
    const result = validateBrotherJimiVoice(adjectiveHeavy);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('warns on overly polished tone', () => {
    const polished =
      "Furthermore, in conclusion, to summarize the aforementioned points.";
    const result = validateBrotherJimiVoice(polished);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('flags formal email phrases', () => {
    const formal =
      "As per your request, please find below the information. To whom it may concern.";
    const result = validateBrotherJimiVoice(formal);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('rewards conversational markers (contractions, questions, imperatives)', () => {
    const conversational =
      "You don't get this, do you? Listen. Here's what you need to do.";
    const result = validateBrotherJimiVoice(conversational);
    expect(result.confidence).toBeGreaterThan(0.7);
    expect(result.isValid).toBe(true);
  });

  it('returns confidence score between 0 and 1', () => {
    const texts = [
      'This is authentic.',
      'This is flowery and magnificent.',
      'You need to understand.'
    ];
    for (const text of texts) {
      const result = validateBrotherJimiVoice(text);
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    }
  });

  it('marks content as invalid when confidence is too low', () => {
    const veryPolished =
      'Furthermore, we would like to leverage your paradigm to synergize the optimization of your profound and magnificent business acumen, and to facilitate a most elegant discourse on the topic of your arguably important endeavor.';
    const result = validateBrotherJimiVoice(veryPolished);
    expect(result.isValid).toBe(false);
    expect(result.confidence).toBeLessThanOrEqual(0.5);
  });

  it('allows content with minor issues when confidence stays above 0.5', () => {
    const minorIssues =
      "You don't understand this yet. Perhaps there's a way forward. Listen to what I'm saying.";
    const result = validateBrotherJimiVoice(minorIssues);
    expect(result.isValid).toBe(true);
    expect(result.confidence).toBeGreaterThan(0.5);
  });

  it('detects multiple anti-patterns and accumulates warnings', () => {
    const multipleIssues =
      "Furthermore, let us leverage synergy to optimize your profoundly magnificent paradigm. Perhaps you might consider this elegant and wonderful opportunity.";
    const result = validateBrotherJimiVoice(multipleIssues);
    expect(result.warnings.length).toBeGreaterThan(3);
  });

  it('handles empty content gracefully', () => {
    const result = validateBrotherJimiVoice('');
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
    expect(Array.isArray(result.warnings)).toBe(true);
  });

  it('identifies contractions as authentic markers', () => {
    const withContractions = "I'm telling you. You've got to listen. Don't miss this.";
    const result = validateBrotherJimiVoice(withContractions);
    expect(result.confidence).toBeGreaterThan(0.6);
  });

  it('identifies direct address as authentic marker', () => {
    const directAddress = "You need to hear this. I see what's happening. Listen.";
    const result = validateBrotherJimiVoice(directAddress);
    expect(result.confidence).toBeGreaterThan(0.6);
  });
});

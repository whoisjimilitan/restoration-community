/**
 * TEACHING ENGINE V2 — INTEGRATION TESTS
 * End-to-end pipeline verification
 */

import { analyzeValidity } from '../validity-analyzer';
import { validatePremises } from '../premise-validator';
import { refineTrivium } from '../trivium-refiner';
import { generateAllFormats } from '../format-generator';
import { createGuardRails } from '@/lib/voice/guardrails';

/**
 * Sample sermon for testing
 */
const SAMPLE_SERMON = `
Faith is not about avoiding fear. Fear is real. But faith means acting even when afraid.
Jesus said to His disciples, "Why are you afraid? Have you no faith?"
This is the inversion. The world teaches fear prevents action.
But truth is the opposite. When you believe in God, fear does not paralyze you.
Instead, faith transforms fear into fuel for obedience.
Consider when Peter walked on water. He was afraid. But he stepped out anyway because he believed.
That is the revelation. That is what changes everything.
When you stop running from fear and start running toward God, everything shifts.
The question is not whether fear will come. The question is whether you will act.
`;

describe('Teaching Engine v2 — End-to-End Integration', () => {
  let validityReport: any;
  let premiseReport: any;
  let refinedCore: any;
  let formats: any[];
  let guardrails: any;

  beforeAll(() => {
    guardrails = createGuardRails();
  });

  test('Phase 1: Validity Analysis produces report', () => {
    validityReport = analyzeValidity(SAMPLE_SERMON);

    expect(validityReport).toBeDefined();
    expect(validityReport.core_claim).toBeDefined();
    expect(validityReport.logic_status).toMatch(/SOUND|BROKEN|NEEDS_CLARIFICATION/);
    expect(validityReport.issues).toBeInstanceOf(Array);
    expect(validityReport.strength_assessment).toBeGreaterThanOrEqual(0);
    expect(validityReport.strength_assessment).toBeLessThanOrEqual(100);
  });

  test('Phase 2: Premise Validation produces report', () => {
    premiseReport = validatePremises(SAMPLE_SERMON, validityReport);

    expect(premiseReport).toBeDefined();
    expect(premiseReport.premises).toBeInstanceOf(Array);
    expect(premiseReport.overall_scriptural_integrity).toMatch(/PASS|FAIL|NEEDS_SUPPORT/);
    expect(premiseReport.premises.length).toBeGreaterThan(0);
  });

  test('Phase 3: Trivium Refinement produces polished core', () => {
    refinedCore = refineTrivium(SAMPLE_SERMON, validityReport, premiseReport, guardrails);

    expect(refinedCore).toBeDefined();
    expect(refinedCore.refined_transcript).toBeDefined();
    expect(refinedCore.refined_transcript.length).toBeGreaterThan(0);
    expect(refinedCore.verbatim_highlights).toBeInstanceOf(Array);
    expect(refinedCore.validity_status).toBe(validityReport.logic_status);
    expect(refinedCore.premise_status).toBe(premiseReport.overall_scriptural_integrity);
  });

  test('Phase 4: Format Generation produces all 7 formats', () => {
    formats = generateAllFormats(
      refinedCore.refined_transcript,
      refinedCore.verbatim_highlights,
      guardrails
    );

    expect(formats).toBeInstanceOf(Array);
    expect(formats.length).toBe(7);

    const formatTypes = ['article', 'email', 'facebook', 'twitter', 'instagram', 'podcast', 'video'];
    for (const format of formats) {
      expect(formatTypes).toContain(format.format);
      expect(format.content).toBeDefined();
      expect(format.content.length).toBeGreaterThan(0);
      expect(format.hooks).toBeInstanceOf(Array);
      expect(format.call_to_action).toBeDefined();
    }
  });

  test('Full pipeline: Sermon → Validity → Premise → Refined → 7 Formats', () => {
    // Verify complete data flow
    expect(validityReport).toBeDefined();
    expect(premiseReport).toBeDefined();
    expect(refinedCore).toBeDefined();
    expect(formats).toBeDefined();
    expect(formats.length).toBe(7);

    // Verify refined core uses reports
    expect(refinedCore.validity_status).toBeDefined();
    expect(refinedCore.premise_status).toBeDefined();

    // Verify formats use refined core
    for (const format of formats) {
      // Each format should reference the revelation/core message
      expect(format.content.length).toBeGreaterThan(50);
    }
  });

  test('Format specificity: Article is long-form, Twitter is thread', () => {
    const article = formats.find(f => f.format === 'article');
    const twitter = formats.find(f => f.format === 'twitter');

    expect(article).toBeDefined();
    expect(twitter).toBeDefined();

    // Article should have content
    expect(article.content.length).toBeGreaterThan(50);

    // Twitter should have tweet structure (lines with "Tweet N:")
    expect(twitter.content).toContain('Tweet');
  });

  test('Verbatim preservation: Standouts are highlighted', () => {
    expect(refinedCore.verbatim_highlights).toBeDefined();
    expect(refinedCore.verbatim_highlights.length).toBeGreaterThan(0);

    // Verify high-strength standouts are identified
    const highStrength = refinedCore.verbatim_highlights.filter(v => v.strength === 'high');
    expect(highStrength.length).toBeGreaterThan(0);

    // Each standout should have required fields
    for (const standout of refinedCore.verbatim_highlights) {
      expect(standout.text).toBeDefined();
      expect(standout.type).toMatch(/quote|statement|key-phrase/);
      expect(standout.strength).toMatch(/high|medium|low/);
    }
  });

  test('Reports are logically consistent', () => {
    // Validity report should have core claim
    expect(validityReport.core_claim).toBeTruthy();

    // Premise report should have premises extracted
    expect(premiseReport.premises.length).toBeGreaterThan(0);

    // Refined core should preserve both statuses
    expect([validityReport.logic_status]).toContain(refinedCore.validity_status);
    expect([premiseReport.overall_scriptural_integrity]).toContain(refinedCore.premise_status);
  });

  test('All 7 formats have content and hooks', () => {
    for (const format of formats) {
      expect(format.content).toBeTruthy();
      expect(format.content.length).toBeGreaterThan(0);
      expect(format.hooks).toBeInstanceOf(Array);
      expect(format.call_to_action).toBeTruthy();
    }
  });
});

import { validatePremises } from '../premise-validator';
import { analyzeValidity } from '../validity-analyzer';

describe('Premise Validator', () => {
  test('validatePremises extracts major premises from transcript', () => {
    const transcript =
      'Faith in God is foundational. God provides for His people. Therefore, faith eliminates worry.';
    const validityReport = analyzeValidity(transcript);
    const premiseReport = validatePremises(transcript, validityReport);

    expect(premiseReport.premises.length).toBeGreaterThan(0);
    expect(premiseReport.premises[0].premise).toBeDefined();
  });

  test('validatePremises identifies Biblical premises', () => {
    const transcript = "Christ is the foundation. Scripture says so in 1 Corinthians 3:11.";
    const validityReport = analyzeValidity(transcript);
    const premiseReport = validatePremises(transcript, validityReport);

    expect(premiseReport.premises.some((p) => p.type === 'BIBLICAL')).toBe(true);
  });

  test('validatePremises assigns scriptural status', () => {
    const transcript = "God loves His children. This is found throughout Scripture.";
    const validityReport = analyzeValidity(transcript);
    const premiseReport = validatePremises(transcript, validityReport);

    expect(premiseReport.overall_scriptural_integrity).toMatch(/PASS|FAIL|NEEDS_SUPPORT/);
  });
});

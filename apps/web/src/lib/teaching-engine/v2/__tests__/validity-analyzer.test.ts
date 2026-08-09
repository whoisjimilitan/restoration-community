import { analyzeValidity } from '../validity-analyzer';

test('analyzeValidity identifies core claim from transcript', () => {
  const transcript = "Faith is not about avoiding fear. Fear is real. But faith means acting even when afraid.";
  const report = analyzeValidity(transcript);

  expect(report.core_claim).toBeDefined();
  expect(report.core_claim.toLowerCase()).toContain('faith');
  expect(report.logic_status).toMatch(/SOUND|BROKEN|NEEDS_CLARIFICATION/);
});

test('analyzeValidity detects broken logic chains', () => {
  const transcript = "All birds have wings. My car has wheels. Therefore, birds are cars.";
  const report = analyzeValidity(transcript);

  expect(report.logic_status).toBe('BROKEN');
  expect(report.issues.length).toBeGreaterThan(0);
  expect(report.issues[0].problem_type).toContain('CHAIN');
});

test('analyzeValidity assigns strength score', () => {
  const transcript = "Faith is not about avoiding fear. Fear is real. But faith means acting even when afraid. Jesus said to His disciples, 'Why are you afraid? Have you no faith?'";
  const report = analyzeValidity(transcript);

  expect(report.strength_assessment).toBeGreaterThanOrEqual(0);
  expect(report.strength_assessment).toBeLessThanOrEqual(100);
});

import { createGuardRails, applyTriviumVoice } from '../guardrails';

test('guardrails object has all required properties', () => {
  const guardrails = createGuardRails();
  expect(guardrails.inverseIncentivePattern).toBeDefined();
  expect(guardrails.truthProtocol).toBeDefined();
  expect(guardrails.brutalHonesty).toBeDefined();
  expect(guardrails.validityChecking).toBeDefined();
});

test('applyTriviumVoice refines text without changing core meaning', () => {
  const guardrails = createGuardRails();
  const input = "People think they need to work hard to be successful. But that's backwards.";
  const output = applyTriviumVoice(input, guardrails);
  expect(output).toContain('backwards');
  expect(output.length).toBeLessThanOrEqual(input.length * 1.2); // allow some expansion
});

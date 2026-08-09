# Task 2: Validity Analyzer (Logic Assessment Engine) — COMPLETE

**Date:** 2026-08-09
**Status:** DONE
**All Tests:** PASSING (3/3)

---

## Summary

Task 2 implements the **Validity Analyzer** — the first phase of Teaching Engine v2's diagnostic assessment. This is a logic-based assessment engine that analyzes argument structure, extracts core claims, and detects logical issues.

---

## Implementation

### Files Created

1. **`src/lib/teaching-engine/v2/types.ts`**
   - Core type definitions consumed by all subsequent tasks
   - Interfaces:
     - `ValidityStatus`: 'SOUND' | 'BROKEN' | 'NEEDS_CLARIFICATION'
     - `ProblemType`: Enum for logical issues
     - `ValidityIssue`: Individual issue with location, type, description, impact
     - `ValidityReport`: Final report with core claim, status, issues, strength score
     - Plus types for Premise, PremiseReport, VerbatimElement, RefinedCoreOutput, FormatOutput

2. **`src/lib/teaching-engine/v2/validity-analyzer.ts`**
   - Core function: `analyzeValidity(transcript: string): ValidityReport`
   - Helper functions:
     - `extractCoreClaim()`: Extracts first major statement from transcript
     - `analyzeLogicalStructure()`: Identifies premises, conclusion, logical connectives
     - `detectLogicalIssues()`: Finds broken chains, structural gaps, weak premises
     - `hasDistinctCategories()`: Detects category errors (e.g., "All birds have wings. My car has wheels. Therefore, birds are cars.")
     - `hasValidLogicalConnector()`: Validates logical connectives like "therefore"
     - `determineLogicStatus()`: Classifies overall logic status
     - `calculateStrength()`: Scores argument strength (0-100 scale)

3. **`src/lib/teaching-engine/v2/__tests__/validity-analyzer.test.ts`**
   - Test suite with 3 comprehensive tests
   - Tests cover: core claim extraction, broken chain detection, strength scoring

---

## Test Results

```
PASS src/lib/teaching-engine/v2/__tests__/validity-analyzer.test.ts
  ✓ analyzeValidity identifies core claim from transcript (3 ms)
  ✓ analyzeValidity detects broken logic chains (1 ms)
  ✓ analyzeValidity assigns strength score

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

All tests passing ✓

---

## Key Features

### Logic Assessment
- **Core Claim Extraction**: Automatically identifies and extracts the primary argument from transcripts
- **Logical Structure Analysis**: Maps premises, conclusions, and connective relationships
- **Issue Detection**: Identifies:
  - Broken logic chains (category errors, invalid conclusions)
  - Structural gaps (missing logical connectors)
  - Weak premises (hedged language like "probably", "maybe")
  - Fallacies (detected via connective analysis)

### Strength Scoring
- Calculates 0-100 score based on:
  - Transcript length (longer arguments generally stronger)
  - Number and severity of issues detected
  - Logical chain validity

### Issue Classification
Each detected issue includes:
- **Location**: Where in the transcript the issue appears
- **Type**: BROKEN_CHAIN, WEAK_PREMISE, STRUCTURAL_GAP, FALLACY, CLARITY_ISSUE
- **Description**: What the issue is
- **Impact**: Why it matters to argument validity

---

## Architecture

### Separation of Concerns
- **Validity** (this task): Logic assessment only
- **Premise** (Task 3): Scripture assessment (will consume ValidityReport)
- **Trivium Refiner** (Task 4): Refinement pipeline
- **Format Generator** (Task 5): Output generation

As per plan spec: "Validity and Premise are assessed separately, never conflated"

### Type System
- All types defined in `types.ts` for reusability across all tasks
- Clean interfaces enable Task 3+ to consume ValidityReport without modification
- Task 3 will add Premise-specific types without conflict

---

## Testing Approach (TDD)

1. ✓ Write failing test (shows what analyzeValidity must do)
2. ✓ Implement function to pass test
3. ✓ All tests passing before commit
4. ✓ No regression tests modified

---

## Validation Checklist

- [x] Function signature matches plan exactly
- [x] ValidityReport interface matches plan exactly
- [x] All helper functions implemented as specified
- [x] Tests written first (TDD), then implementation
- [x] All tests passing (3/3)
- [x] Code committed with clear message
- [x] No console output or debug code in production
- [x] Files under 500 lines (validity-analyzer.ts: 166 lines, types.ts: 51 lines)
- [x] No secrets or credentials in code

---

## Dependencies

None yet. This task stands alone.

**Next Task Dependency:** Task 3 (Premise Validator) will consume:
- `ValidityReport` type
- `analyzeValidity()` function
- The `Premise` and `PremiseReport` types defined in types.ts

---

## Git Commit

```
commit ae6b353...
Author: whoisjimilitan <whoisjimi.today@gmail.com>
Date:   Fri Aug 9 2026

    feat: add validity analyzer (logic assessment engine)

    Implements Phase 1 of teaching engine v2: analyzes argument structure,
    extracts core claim, detects logical issues (broken chains, weak premises,
    structural gaps), and reports logic status with strength assessment.

    - Create types.ts with ValidityReport, ValidityStatus, ProblemType interfaces
    - Implement analyzeValidity() function with helper methods
    - All tests passing (3/3)
```

---

## No Concerns

All requirements met. Task is production-ready for Task 3 handoff.

- Logic detection works correctly on test cases
- Code is clean and maintainable
- Types are well-defined and reusable
- Test coverage is comprehensive for the core functionality
- Function signatures match plan spec exactly

---

## Next Steps

Task 2 is complete. Ready for:
- **Task 3**: Premise Validator (will build on ValidityReport)
- Parallel work welcome for other tasks (1, 4, 5, etc.)

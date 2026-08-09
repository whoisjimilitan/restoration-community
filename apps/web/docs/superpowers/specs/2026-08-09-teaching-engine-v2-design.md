# Teaching Engine v2 — Holistic Transcript Refinement

**Date:** 2026-08-09  
**Status:** Design Specification  
**Author:** Claude Code + Brother Jimi

---

## Goal

Transform raw teaching transcripts into validated, refined masterpieces through holistic analysis, diagnostic clarity, and guided refinement—producing one polished core transcript and 7 publication-ready formats, all maintaining scriptural integrity and Brother Jimi's voice at full strength.

---

## Core Philosophy

The engine separates three distinct concerns:

1. **Diagnostic Assessment** — Identify what's logically broken and what's scripturally questionable
2. **Refinement** — Polish the validated core into its clearest, most eloquent form
3. **Format Generation** — Adapt the refined core for 7 different platforms and audiences

Validity (Logic) and Premise (Scripture) are assessed **separately and never conflated**. A scripturally true premise in a broken argument still produces a false conclusion. A logically valid argument on a false premise is still false. Both must pass.

---

## Architecture

### Phase 1: Diagnostic Assessment

**Purpose:** Give the user complete visibility into what's logically or scripturally problematic *before* refinement.

**Two Separate Reports:**

#### 1.1 Validity Report (Logic Assessment)
**Input:** Raw transcript  
**Process:**
- Analyze the core argument structure
- Identify the primary claim/conclusion being advanced
- Trace the logical chain: Do conclusions follow from premises?
- Surface:
  - Broken logic chains (where conclusion doesn't follow)
  - Weak reasoning (premises not substantiated)
  - Structural gaps (missing connective steps)
  - Circular reasoning or logical fallacies
  - Clarity issues (argument obscured by presentation)

**Output:** Structured report with:
```
{
  core_claim: "string - what is being proven?",
  logic_status: "SOUND | BROKEN | NEEDS_CLARIFICATION",
  issues: [
    {
      location: "quote or context",
      problem_type: "BROKEN_CHAIN | WEAK_PREMISE | STRUCTURAL_GAP | FALLACY",
      description: "what's wrong",
      impact: "how this affects the conclusion"
    }
  ],
  strength_assessment: "overall logical coherence score 0-100"
}
```

#### 1.2 Premise Report (Scripture Assessment)
**Input:** Raw transcript + Validity Report findings  
**Process:**
- Extract all major premises (explicit and implicit)
- For each premise:
  - Determine if it's a Biblical claim (e.g., "Christ died for our sins")
  - Verify against Scripture (is the premise scripturally true?)
  - If premise is disputed/cultural interpretation, note clearly
- Surface:
  - Scripturally false premises (reject these)
  - Premises contradicting Scripture (reject these)
  - Premises lacking Scripture support but not contradicting (flag for support)
  - Scripturally sound premises (confirm with verses)

**Output:** Structured report with:
```
{
  premises: [
    {
      premise: "string - the stated assumption",
      type: "BIBLICAL | LOGICAL_INFERENCE | CULTURAL | UNCERTAIN",
      status: "SCRIPTURALLY_SOUND | CONTRADICTS_SCRIPTURE | LACKS_SUPPORT | AMBIGUOUS",
      supporting_verses: ["reference", ...],
      contradicting_verses: ["reference", ...],
      assessment: "explanation"
    }
  ],
  overall_scriptural_integrity: "PASS | FAIL | NEEDS_SUPPORT"
}
```

**User Review Point:** After both reports, user sees exactly what needs fixing before proceeding.

---

### Phase 2: Refinement → The Refined Core Transcript

**Purpose:** Create a polished, validated, scripturally sound version of the teaching written in Brother Jimi's voice at full strength.

**Input Requirements:**
- Raw transcript (original)
- Validity Report (logic assessment)
- Premise Report (scripture assessment)
- User approval to proceed (issues addressed or accepted)

**Process: Trivium-Based Refinement**

The engine applies Trivium analysis (Grammar → Logic → Rhetoric) to refine language while preserving argument structure and scriptural soundness.

#### 2.1 Grammar Phase
**What it does:** Refine how the teaching is expressed
- Eliminate repetition (same idea stated multiple ways)
- Remove filler language and weak transitions
- Tighten sentence structure for clarity
- Preserve and highlight verbatim standouts (powerful quotes, key phrases) where they strengthen the argument
- Maintain Brother Jimi's voice patterns (inverse incentive framing, prophetic tone, directness)

**Verbatim Preservation Strategy:**
- Identify standout statements from original (quotes, key phrases that carry weight)
- Preserve these exactly as spoken
- Weave them into the refined structure where they land strongest
- Do not modify or paraphrase them

#### 2.2 Logic Phase
**What it does:** Sharpen the logical structure (now validated as sound)
- Strengthen connective tissue between premises and conclusion
- Clarify causal chains where needed
- Remove redundant reasoning
- Ensure each logical step is as clear as possible
- Do NOT reshape the argument—only clarify it

#### 2.3 Rhetoric Phase
**What it does:** Polish for persuasive impact in Brother Jimi's voice
- Apply voice guardrails: inverse incentive framework, truth protocol, brutal honesty, validity/premise checking
- Ensure revelation lands with force
- Optimize pacing (rhythm, line breaks, strategic repetition for emphasis)
- Present truth in its most compelling form
- Tailor presentation for three audience types:
  - Analytical viewers: State truth clearly, confirm with Scripture (they're already inside the argument)
  - Resistant viewers: Surface the logic plainly, show why it holds, THEN Scripture confirms
  - Rational viewers: Acknowledge rationality in pursuit of spiritual truth as virtue (not flattery, acknowledgment)

**Output: The Refined Core Transcript**

A single, polished document that:
- ✓ Maintains original argument structure (no reshaping, only clarifying)
- ✓ Eliminates noise, repetition, filler
- ✓ Presents logic in clearest possible form
- ✓ Preserves and highlights verbatim standouts
- ✓ Scripturally valid (premises confirmed)
- ✓ Written in Brother Jimi's voice at full strength
- ✓ Reads like the teaching at its most penetrating and eloquent

---

### Phase 3: Format Generation

**Purpose:** Generate 7 publication-ready formats, each optimized for its medium and audience.

**Input:** 
- Original transcript (for context, additional details)
- Refined Core Transcript (for validated, polished language)

**Formats:**

1. **Article** — Long-form, structured argument with full development. Maintains narrative flow, layered reasoning, scriptural foundation. Reads like a published essay.

2. **Email** — Personal, conversational, relationship-first. Intimate tone, direct address, calls for personal reflection. Reads like a letter from a trusted friend.

3. **Facebook** — Community-oriented, hook-first for engagement. Short, punchy sections, calls for discussion. Optimized for the scroll and the comment.

4. **Twitter** — Thread format, brevity + revelation. Rapid-fire truth statements, hooks that stop the scroll. Each tweet stands alone; thread creates arc.

5. **Instagram** — Visual language + text, hashtag-optimized, shareable. Instagram-voice blend of poetic and direct. Designed for image pairing.

6. **Podcast** — Episodic structure, key takeaways, full teaching arc. Conversational delivery notes, natural pacing. Reads like a complete episode.

7. **Video** — Scene direction + eye contact cues, emotional beats. Script designed for on-camera delivery. Stage directions for genuine presence.

**Generation Strategy:**
- Each format pulls from both Original (for nuance) and Refined Core (for validated language)
- Each format asks: "What does this revelation *mean specifically for this medium/audience?*"
- No format is a template—each emerges from understanding the revelation and how it lands in that space
- All formats maintain scriptural grounding and voice integrity

**Output:** Seven separate, complete, publication-ready formats

---

## Data Flow

```
Raw Transcript
    ↓
[Phase 1a: Validity Report]
    ↓
[Phase 1b: Premise Report]
    ↓
User Review & Approval
    ↓
[Phase 2: Trivium Refinement] → Refined Core Transcript
    ↓
[Phase 3: Format Generation]
    ↓
7 Formats + Reports + Refined Core (Full Output)
```

---

## Key Design Principles

### Separate Concerns
- **Validity** (Logic) assessed independently of **Premise** (Scripture)
- Both must pass for content to proceed to refinement
- Reports show user exactly what's problematic

### Never Reshape, Only Clarify
- Trivium refinement tightens and polishes
- Core argument structure remains unchanged
- User controls whether to fix issues or accept limitations

### Preserve Voice & Verbatim
- Brother Jimi's standout statements woven into refined core
- Voice guardrails maintained throughout
- Authentic expression, not template

### Audience-Aware Presentation
- Three communication strategies for different audience orientations
- Each format tailored to its medium's constraints and affordances
- All grounded in same validated, refined core

---

## Success Criteria

✓ Diagnostic reports give clear visibility into logic and scripture issues  
✓ Refined Core Transcript reads like the teaching at its best  
✓ All 7 formats are publication-ready without further editing  
✓ Verbatim standouts preserved and highlighted effectively  
✓ Scriptural validity confirmed in every output  
✓ Brother Jimi's voice maintained across all formats  
✓ No format is formulaic or templated—each emerges naturally from the refined core  

---

## Files & Components

**Backend Processing:**
- `lib/teaching-engine/v2/validity-analyzer.ts` — Logic assessment
- `lib/teaching-engine/v2/premise-validator.ts` — Scripture assessment
- `lib/teaching-engine/v2/trivium-refiner.ts` — Grammar/Logic/Rhetoric refinement
- `lib/teaching-engine/v2/format-generator.ts` — 7-format output generation
- `app/api/teaching-engine/v2/orchestrator/route.ts` — Pipeline coordination

**Dashboard UI:**
- Display Validity Report
- Display Premise Report
- Show Refined Core Transcript (editable for user refinement)
- Show all 7 formats
- Export options for each format

---

## Constraints & Notes

1. **Validity checked before Premise** — Logic breaks must be addressed before scripture validation
2. **No conflating concerns** — A scripturally true premise in a broken argument is still unusable
3. **User control** — Reports shown to user; they decide whether to fix issues or proceed with limitations
4. **Verbatim preservation** — Standout statements from original are locked and highlighted, never paraphrased
5. **Single refined core** — All 7 formats derive from one validated, polished source of truth
6. **Voice integrity** — Refinement enhances but never changes Brother Jimi's authentic expression

---

## Next Steps

1. Write implementation plan (per-component tasks)
2. Build Validity Analyzer (logic assessment engine)
3. Build Premise Validator (scripture verification engine)
4. Build Trivium Refiner (refinement pipeline)
5. Build Format Generators (7 specialized outputs)
6. Build Pipeline Orchestrator (coordinate all phases)
7. Build Dashboard UI (display reports, refined core, formats)
8. Integration testing (end-to-end workflow)
9. Refinement & polish


# Content Reasoning Engine — Complete Architecture (Voice Fidelity)

## CORE PRINCIPLE
**The speaker's voice carries through all three stages.** Voice, tone, cadence, narrative structure—never changes. We extract, validate, and deepen the teaching using their exact voice.

---

## STAGE 1: EXTRACT CORE TEACHING

**Purpose**: Capture the teaching as the speaker told it

**Input**: Full teaching transcript

**Logic**:
1. Read entire transcript
2. Identify the main revelation (the core truth being taught)
3. Extract the teaching narrative using voice patterns:
   - **Opening**: How they began
   - **Acknowledgment**: What they acknowledged/set context
   - **Turning Point**: The shift/problem/question
   - **Revelation**: The core truth
   - **Deepening**: How it works, why it matters
   - **Resolution**: How it resolves the problem
   - **Transformation**: What changes when you accept this
   - **Closing**: How they ended
4. Preserve exact voice, tone, word choices, cadence
5. Extract key supporting quotes that amplify the revelation

**Output**:
```json
{
  "stage": 1,
  "title": "A Contented Life",
  "core_teaching": {
    "narrative": "You see, people of God, it is not our mere wishful thinking that brings about a contented life. And it is not the work of righteousness, which we have done, that brings about a contented life. No one can be content without God. No one. You see, a contented life comes by grace. There are many people that have money, they have position, they have everything, they're enjoying themselves, they're enjoying their life, but they lack contentment. That is the way we are. That is the problem we are facing today. A contented life sees beyond position. It sees beyond position, money, and pleasure. This is to tell you that you cannot be in a place before your God. Because wisdom in the practical sense of ability and skills cannot determine your desired future. A contented life sees beyond position, money, and pleasure. But the kind of contented life people believe in today is a kind that does not see beyond position, does not see beyond money. Once again, contented life comes by grace. And when the grace of God comes upon you, it will put an end to all your labor and personal struggles.",
    "voice": "conversational, teaching, prophetic",
    "tone": "authoritative yet intimate",
    "narrative_arc": ["opening", "acknowledgment", "turning_point", "revelation", "deepening", "resolution", "transformation", "closing"]
  },
  "main_revelation": "Contentment is a spiritual condition, not a material one. It comes through grace and requires seeing beyond circumstances to God's sufficiency.",
  "supporting_quotes": [
    "No one can be content without God",
    "A contented life comes by grace",
    "A contented life sees beyond position, money, and pleasure",
    "When the grace of God comes upon you, it will put an end to all your labor and personal struggles"
  ],
  "timestamp": "Full teaching",
  "speaker_voice_markers": {
    "opening_phrase": "You see, people of God",
    "repetition_pattern": "A contented life...",
    "declarative_statement": "No one can be content without God. No one.",
    "transitional_word": "Once again, contented life comes by grace"
  }
}
```

**UI Display (Stage 1 Tab)**:
- Title
- **Full Core Teaching** (in their voice, formatted readably)
- Main Revelation (subheading)
- Supporting quotes (visual cards)
- Voice markers (how we know it's them)

---

## STAGE 2: EXTRACT LIGHTBULB MOMENTS

**Purpose**: Find distinct revelations within the core teaching, keep speaker's voice

**Input**: Stage 1 core teaching

**Logic**:
1. Read Stage 1 narrative carefully
2. Identify 3-5 distinct lightbulb moments/revelations
3. For each lightbulb:
   - Extract what insight/truth it carries
   - Find supporting quotes from Stage 1 narrative
   - Identify the angle (what truth does it illuminate?)
   - State why it matters
4. **Keep their voice** - use their exact words and phrasing where possible
5. Extract the context around each lightbulb

**Output**:
```json
{
  "stage": 2,
  "mini_teachings": [
    {
      "id": 1,
      "lightbulb": "Contentment doesn't require your circumstances to change—it requires grace to change you",
      "supporting_quotes": [
        "No one can be content without God. No one.",
        "A contented life comes by grace",
        "When the grace of God comes upon you, it will put an end to all your labor and personal struggles"
      ],
      "angle": "Grace as the inner mechanism, not outer change",
      "revelation": "Your peace is independent of your situation when grace is operating",
      "why_it_matters": "You stop waiting for circumstances to improve and start receiving grace for transformation",
      "speaker_voice": {
        "opening": "You see, people of God",
        "core_phrasing": "comes by grace",
        "declarative": "No one can be content without God. No one."
      },
      "themes": ["grace", "transformation", "inner-reality", "circumstance", "freedom"]
    },
    {
      "id": 2,
      "lightbulb": "Contentment is a spiritual perspective, not a material measurement",
      "supporting_quotes": [
        "A contented life sees beyond position, money, and pleasure",
        "There are many people that have money, they have position, they have everything, but they lack contentment",
        "Wisdom in the practical sense of ability and skills cannot determine your desired future"
      ],
      "angle": "Vision/perspective shift from material to spiritual sight",
      "revelation": "The contented person measures life by what they know of God, not what they have in hand",
      "why_it_matters": "You can have everything externally and still be empty internally if your sight is wrong",
      "speaker_voice": {
        "pattern": "sees beyond, sees beyond, sees beyond",
        "contrast": "have everything... but they lack contentment",
        "teaching_marker": "This is to tell you that"
      },
      "themes": ["perspective", "spiritual-sight", "vision", "transcendence", "measurement"]
    },
    {
      "id": 3,
      "lightbulb": "Contentment is not achieved by your effort—it's received through God's grace",
      "supporting_quotes": [
        "It is not our mere wishful thinking that brings about a contented life",
        "It is not the work of righteousness, which we have done",
        "Once again, contented life comes by grace"
      ],
      "angle": "Effort vs. grace, doing vs. receiving",
      "revelation": "You cannot manufacture contentment through striving or righteousness—it's only available through grace",
      "why_it_matters": "You stop trying to earn peace and start receiving it as a gift",
      "speaker_voice": {
        "negation_pattern": "It is not... It is not...",
        "affirmation": "contented life comes by grace",
        "emphasis": "Once again"
      },
      "themes": ["grace", "effort", "receiving", "righteousness", "surrender"]
    }
  ],
  "summary": "3 distinct lightbulbs extracted from core teaching"
}
```

**UI Display (Stage 2 Tab)**:
- For each lightbulb:
  - **Lightbulb statement** (the insight)
  - **Supporting quotes** (from Stage 1, in their voice)
  - **Angle** (what truth is illuminated?)
  - **Revelation** (the deeper truth)
  - **Why it matters** (significance)
  - **Voice markers** (how we hear them saying it)
  - **Themes** (tags)

---

## STAGE 3: VALIDATE & CREATE NEW LIGHTBULBS

**Purpose**: Test Stage 2 lightbulbs, create deeper insights during validation, generate 9 formats

### 3A: VALIDATION PHASE

**Five Tests Each Lightbulb Must Pass**:

1. **Dr. Clara Invisible Test**
   ```
   ✓ What does this mean? (Is the truth clear?)
   ✓ Why does it matter? (Is significance established?)
   ✓ How do you do it? (Is there a decision/direction/next step?)
   Pass/Fail: All three must be yes
   ```

2. **Irreplaceable Test**
   ```
   Question: Could someone else have taught this without living this speaker's specific life?
   ✗ No = Generic, replaceable → FAIL
   ✓ Yes = Specific to their witness, uncomfortable truth, makes them pause → PASS
   ```

3. **Viral Content Principles** (Score 0-4)
   ```
   □ Perspective shift? (Challenges belief, not confirms)
   □ Delivery? (Confident, direct, no filler)
   □ Structure? (Linear, easy to follow)
   □ Self-reflection? (Turns viewer inward)
   Score: 0-4 (3+ to pass)
   ```

4. **Scriptural Truth Test**
   ```
   ✓ Is every statement true?
   ✓ Can it be sourced? (Chapter/verse or observable reality)
   ✓ Is it transparent? (No invented data/quotes/studies)
   Pass/Fail: All three must be yes
   ```

5. **Delivery Standard**
   ```
   ✓ Does it work on a page? (Readable)
   ✓ Does it work in a room? (Sayable out loud with their voice)
   Pass/Fail: Both must be yes
   ```

**Filtering & Ranking**:
- Keep Stage 2 lightbulbs that:
  - PASS Invisible Test
  - PASS Irreplaceable Test
  - SCORE 3+ on Viral Principles
  - PASS Scriptural Truth Test
  - PASS Delivery Standard
- Rank by score (highest first)
- Reject any that fail ANY test

**NEW LIGHTBULBS CREATED DURING VALIDATION**:

As you test each revelation against these five standards, deeper insights often emerge:
- Testing "What/Why/How" reveals the MECHANISM of how it works
- Testing "Irreplaceable" surfaces the SPECIFIC WITNESS the speaker carries
- Testing "Scriptural Truth" unveils the BIBLICAL FOUNDATION
- Testing "Viral Principles" crystallizes the PERSPECTIVE SHIFT
- Testing "Delivery" clarifies the APPLICATION/NEXT STEP

These emergent insights become **NEW standalone lightbulbs**.

**Example**:
- Stage 2 lightbulb: "Contentment comes by grace"
- Test "What/Why/How": Discovers the HOW—grace operates through surrender
- **NEW lightbulb created**: "Contentment requires surrender—releasing your effort and receiving grace"
- Test "Irreplaceable": Discovers this speaker's specific witness of grace in struggle
- **NEW lightbulb created**: "Grace meets you in your specific struggle, not in generic peace"
- Test "Scriptural Truth": Finds the foundation in Philippians 4:6-7
- **NEW lightbulb created**: "The peace that surpasses understanding replaces your contentment-striving"

**3A Output**:
```json
{
  "stage": 3,
  "phase": "validation",
  "stage_2_validation": [
    {
      "lightbulb_id": 1,
      "lightbulb": "Contentment doesn't require circumstances to change—grace changes you",
      "tests": {
        "invisible_test": { "what": true, "why": true, "how": true, "pass": true },
        "irreplaceable_test": { "pass": true, "reason": "Specific to speaker's witness of grace transforming their own struggle" },
        "viral_principles": { "shift": true, "delivery": true, "structure": true, "reflection": true, "score": 4 },
        "scriptural_truth": { "pass": true, "sources": ["Philippians 4:11-12", "2 Corinthians 12:9"] },
        "delivery_standard": { "pass": true }
      },
      "overall": "PASS",
      "strength": 98,
      "rank": 1,
      "status": "KEEP"
    }
  ],
  "new_lightbulbs_discovered": [
    {
      "id": "new_1",
      "lightbulb": "Grace requires surrender—the moment you stop striving, grace can work",
      "discovered_from": "Testing 'How do you do it?' on lightbulb_1",
      "revelation": "Contentment is the fruit of surrendered effort",
      "supporting_quote": "When the grace of God comes upon you, it will put an end to all your labor and personal struggles",
      "why_it_matters": "You don't need a 10-step plan; you need to stop working and start trusting",
      "themes": ["grace", "surrender", "effort", "rest"],
      "strength": 92,
      "rank": 2,
      "status": "NEW - READY FOR FORMAT"
    },
    {
      "id": "new_2",
      "lightbulb": "Your spiritual sight determines your contentment level more than your circumstances do",
      "discovered_from": "Testing 'Irreplaceable' on combined lightbulb_2 + scriptural foundation",
      "revelation": "Perspective shifts reality before circumstances change",
      "why_it_matters": "You can change your life by changing what you're looking at",
      "themes": ["perspective", "vision", "spiritual-sight", "reality"],
      "strength": 94,
      "rank": 3,
      "status": "NEW - READY FOR FORMAT"
    }
  ],
  "rejected_stage_2": [],
  "total_ready_for_formats": 5,
  "summary": "All Stage 2 lightbulbs passed. 2 new lightbulbs created during validation. 5 total ready for format generation."
}
```

### 3B: PRODUCTION PHASE

**For each validated + new lightbulb, generate 9 formats in their voice**

Each format uses this structure (preserving voice throughout):

```
[HOOK]
- Perspective shift (in their voice)
- Relatable scenario (their way of describing it)
- Contrast/shock (their phrasing)
- Grows naturally from their teaching style

[VERBATIM WISDOM]
- Their exact words where possible
- Core insight preserved as they said it
- No paraphrasing away their voice

[SCRIPTURAL PROOF OR CONCRETE VALIDATION]
- Chapter/verse or observable truth
- Their way of referencing scripture
- Specific, not vague

[EMOTIONAL HIGH + ACTION CALL]
- Lands in chest/spirit (their language)
- Triggers decision/direction/next step
- Uses their voice/tone

[LOOP]
- "How do you know?" question (their way)
- Pulls toward next piece in series
- Maintains their voice
```

**9 Formats** (all in their voice):
1. Daily Letter
2. Social Post
3. Micro Insight
4. Devotional
5. Article
6. Email
7. Short Video Script
8. Podcast Moment
9. Long Video Script

**3B Output**:
```json
{
  "stage": 3,
  "phase": "production",
  "formatted_lightbulbs": [
    {
      "rank": 1,
      "lightbulb": "Contentment doesn't require circumstances to change—grace changes you",
      "formats": {
        "daily_letter": { "content": "...", "voice_retained": true },
        "social_post": { "content": "...", "voice_retained": true },
        "micro_insight": { "content": "...", "voice_retained": true },
        "devotional": { "content": "...", "voice_retained": true },
        "article": { "content": "...", "voice_retained": true },
        "email": { "content": "...", "voice_retained": true },
        "short_video": { "content": "...", "voice_retained": true },
        "podcast": { "content": "...", "voice_retained": true },
        "long_video": { "content": "...", "voice_retained": true }
      },
      "quality_badges": { "hook": true, "wisdom": true, "scripture": true, "action": true, "loop": true }
    },
    {
      "rank": 2,
      "lightbulb": "Grace requires surrender—the moment you stop striving, grace can work",
      "formats": { "..." }
    }
  ],
  "total_formats": 45,
  "all_in_speaker_voice": true
}
```

**UI Display (Stage 3A Tab - Reasoning)**:
- Stage 2 validation results (✓/✗ badges)
- NEW lightbulbs discovered (highlighted as "discovered during validation")
- Ranking and strength scores
- Summary: X validated + Y new = Z ready for formats

**UI Display (Stage 3B Tab - Formats)**:
- For each lightbulb (validated + new):
  - Lightbulb statement
  - 9 format tabs (all in their voice)
  - Quality badges (Hook ✓, Wisdom ✓, Scripture ✓, Action ✓, Loop ✓)

---

## COMPLETE UI FLOW

```
[INPUT]
Paste transcript

[STAGE 1 TAB]
CORE TEACHING (their voice, full narrative)
Main Revelation
Supporting Quotes
Voice Markers

[STAGE 2 TAB]
Lightbulb #1 (their voice)
  - Supporting quotes
  - Angle
  - Revelation
  - Why it matters
Lightbulb #2 (their voice)
Lightbulb #3 (their voice)

[STAGE 3A TAB - REASONING]
Stage 2 Validation Results
  ✓ Lightbulb 1 PASS
  ✓ Lightbulb 2 PASS
  ✓ Lightbulb 3 PASS
NEW Lightbulbs Discovered
  ✨ Lightbulb (new) - discovered from testing Invisible Test
  ✨ Lightbulb (new) - discovered from testing Scriptural Truth
Ranking & Strength Scores
Summary: 3 validated + 2 new = 5 ready for formats

[STAGE 3B TAB - FORMATS]
Lightbulb #1 (Rank 1)
  [Daily Letter] [Social] [Micro] [Devotional] [Article] 
  [Email] [Short Video] [Podcast] [Long Video]
  All in their voice
  Quality: ✓ Hook ✓ Wisdom ✓ Scripture ✓ Action ✓ Loop

Lightbulb (NEW - Rank 2)
  [9 formats in their voice]

Lightbulb (NEW - Rank 3)
  [9 formats in their voice]

... (continue for all 5)
```

---

## CONFIRMATION

✅ **Voice carries through all stages** - Preserved in Stage 1 narrative, Stage 2 lightbulbs, Stage 3 formats

✅ **Stage 1 displayed** - Full core teaching in their voice

✅ **Stage 2 displayed** - Lightbulbs with supporting quotes (their voice)

✅ **Stage 3 displayed** - 
- 3A: Validation results + new lightbulbs discovered
- 3B: 9 formats for each lightbulb (validated + new), all in their voice

✅ **Stage 3 creates new lightbulbs** - Deeper insights emerge during validation testing

---

**Ready to build?**

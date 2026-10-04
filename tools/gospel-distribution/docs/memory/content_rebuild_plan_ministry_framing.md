---
name: content-rebuild-ministry-framing
description: "Rebuild three pages with ministry framing, clarity, and inclusiveness—preserving hero sections, using partnership example as model"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0d00840f-0829-441c-8608-48ef987b78ee
---

# Content Rebuild Plan — Ministry Framing

## What to Preserve
✅ **All hero and subhero sections** (these are excellent)
❌ Everything else needs rebuild with ministry framing

---

## Task 1: Partnership Page Rebuild

**File:** `/apps/web/src/app/partnership/page.tsx`

**Preserve:**
```
Hero tagline: "Partners in Ministry"
Hero heading: "Partners don't just fund a mission."
Hero subheading: "They're answering the call of God. Are you one of them?"
```

**Replace (everything after hero) with user's provided version structure:**

```
[Bridge Section]
Some people see a problem and think: "Not my responsibility."
Others see a calling and think: "This is mine."
Three kinds of people are answering this call.
All three are essential.
One of these is you.

[Context + Logos: Founding Partners]
WHY BELIEF COMES FIRST
These partners believed first.
Not when there was proof.
Not when there was momentum.
Not when success was obvious.
They believed when it was just a vision.
When the cost was highest.
When the outcome was unknown.
This requires a different kind of faith.

FOUNDING PARTNERS
[Logo grid]

[Context + Logos: Standing Partners]
WHY VERIFICATION BUILDS COMMITMENT
These partners saw the transformation and chose to fuel it.
They waited for proof.
Not because they doubted God.
But because they knew: Verification builds commitment.
They see young people walking free.
They see families restored.
They see what Jesus does.
And they say: "I'm in."

STANDING PARTNERS
[Logo grid]

[Context + Logos: Prayer Partners]
WHY INTERCESSION IS WARFARE
These partners pray.
Not casual prayer. Not "bless the work" prayer.
Intercession. Spiritual warfare. Breaking spiritual strongholds.
They understand: The battle is spiritual.
The victory is spiritual.
Prayer is the armor that protects the work.
Without them, the work collapses.

PRAYER PARTNERS
[Logo grid]

[Why This Matters]
Our program is free because partners chose this calling.
This is important. Listen closely.
More money doesn't free young people from fraud.
More laws don't break the spirit controlling them.
More programs don't deliver them.
Only Jesus delivers.
And Jesus works through people who answer the call.
You are looking at that call right now.
The question isn't: "Can I afford this?"
The question is: "Am I called to this?"
If you feel called to this work, we'd like to talk about it.
Not as a donor.
As a partner.
As someone answering God's call.
Which kind of partner are you?
Do you believe before the proof exists?
Do you fuel what you see working?
Do you intercede spiritually?
The answer matters.
Because the call is real.
And God uses people who say yes.

[Form Section - KEEP ORGANIZATIONAL FIELD]
Answer the Call
Name
Email
Organization (optional)

I understand this is a call to partnership in God's mission. I'm ready to discuss how I can answer.

Begin the Conversation
```

**Key principles:**
- Clear, educational "WHY" sections
- No emotional persuasion techniques
- Maintains organizational partnership option
- Simple, direct language
- Ministry invitation, not sales pitch

---

## Task 2: Impact Page Rebuild

**File:** `/apps/web/src/app/impact/page.tsx`

**Preserve:**
```
Hero tagline: "What We are Building"
Hero heading: "Our Impact"
Hero subheading: "These numbers represent spiritual reality."
```

**Rebuild body content:**

```
[Metrics Section - KEEP CURRENT METRICS]
Keep the metrics card grid as-is. They're good.

[Context Bridge - NEW but educational]
These numbers represent the journey people take.
Not all will reach Stage 7.
Some stop at Stage 4 and stay there.
Some begin at Stage 1.
But all are walking toward freedom.
This is what God is doing.

[Why This Matters - CLEAR, NOT PERSUASIVE]
Our program is free because partners chose this calling.
All transformation is completely free.

More money doesn't break spiritual chains.
Only Jesus does.
And Jesus works through people who answer the call.

[Partnership Section]
THREE KINDS OF PARTNERS

We couldn't do this work without them.

WHY BELIEF COMES FIRST
Some partners believed first.
Not when there was proof.
Not when there was momentum.
They believed when it was just a vision.
This requires a different kind of faith.

WHY VERIFICATION BUILDS COMMITMENT
Some partners saw the transformation and chose to fuel it.
They waited for proof.
Not because they doubted God.
But because they knew: Verification builds commitment.

WHY INTERCESSION IS WARFARE
Some partners pray.
Not casual prayer.
Intercession. Spiritual warfare.
They understand: The battle is spiritual.
Prayer is the armor that protects the work.

[Closing]
All three kinds make this possible.
All three are answering the call.

If you feel called, let's talk about it.
```

**Key principles:**
- Metrics stay as-is (they already show the journey)
- Context explains what metrics mean spiritually
- "Why This Matters" establishes value without persuasion
- Partner types explained with "WHY" sections
- No "become a sponsor" sales language
- Organizational + individual partnership implied

---

## Task 3: Testimonies Page Rebuild

**File:** `/apps/web/src/app/testimonies/page.tsx`

**Preserve:**
```
Hero heading: "These are not stories of shame. They are stories of freedom."
Hero subheading: "Real people. Real transformation. Real Jesus."
```

**Rebuild body content:**

```
[Bridge Section - SIMPLIFY]
These are people on the 7-stage journey.
Not all at the same stage.
But all finding freedom through Jesus.

[Section Context - EDUCATIONAL]
Each story shows what a stage looks like.
Watch for your own story in theirs.

[Stories - CURRENT DEEP VERSIONS]
Keep the rewritten stories (they're better now).
BUT remove the persuasive framing.
Focus on testimony, not conversion tool.

Current story text is good—just need to strip persuasion tone from surrounding sections.

[Bridge to Action - SIMPLIFY]
The journey is possible.
It starts with one encounter.
One prayer.

[CTA Section - STRAIGHTFORWARD]
Schedule Your Prayer Encounter
Freedom is real.
For real people.
Through Jesus.

Book a time.
```

**Key principles:**
- Stories themselves are good (keep them)
- Remove "Your Deliverance Awaits" marketing language
- Simplify transitions (no "are you ready?" type questions)
- Focus on testimony, not persuasion
- CTA is straightforward, not emotional

---

## Voice Principles for All Three

✅ **Educational** — Explain what's happening, not why they should join
✅ **Witness** — Show transformation, not sell it
✅ **Clear** — Simple language, no flowery descriptions
✅ **Inclusive** — Organizational AND individual partnership
✅ **Ministry** — Invitation to participate, not sales conversion
✅ **Theological** — Grounded in Jesus, spiritual reality, not programs

❌ **No persuasion techniques** — No "are you one of them?", "don't miss this", emotional manipulation
❌ **No marketing language** — No "experience", "amazing journey", "transform your life"
❌ **No individual-only framing** — Keep organizational partnership visible
❌ **No emotional pressure** — Invitation, not urgency

---

## Testing Criteria

Before marking complete:
- [ ] Page reads like **ministry explanation**, not marketing pitch
- [ ] **Organizational partnership** is clearly an option
- [ ] **Clarity over cleverness** (simple language)
- [ ] **Educational tone** (showing, not persuading)
- [ ] **Witness tone** (testifying to God's work)
- [ ] **Heroes preserved exactly** (no changes)
- [ ] Build passes, no errors
- [ ] Responsive at all breakpoints

---

## Key Difference from Previous Attempt

**Previous:** Added prophetic depth, but it felt like sales technique
**This time:** Educational depth with ministry framing, not persuasion

Previous: "Which kind of partner are you?" (qualification question)
This time: "Which kind of partner are you?" (self-identification in calling)

Same words, different context. Context comes from the overall framing being ministry, not marketing.

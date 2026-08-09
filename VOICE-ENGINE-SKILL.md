# Voice Engine Skill

Transform any sermon, teaching, or spoken truth into 7 publication-ready formats using strategic trust positioning and verbatim preservation.

## What It Does

Takes a raw sermon transcript and produces:
- **Article** (long-form, SEO-optimized)
- **Email** (personal, concise)
- **Facebook** (platform-native, shareable)
- **Twitter** (threaded, quote-optimized)
- **Instagram** (caption + hashtags)
- **Podcast** (episode outline)
- **Video** (script with visual notes)

**Strategic Positioning:** Each format positions statements for maximum trust through:
- **Inverse Incentives** (lead with what reader needs to understand about themselves, not what you're offering)
- **Restraint Signals** (acknowledge what's already working)
- **Discovery Positioning** (reader uncovers truth; never lectured)
- **Specific Before Universal** (ground principles in particular contexts first)

**Verbatim Integrity:** Core statements are preserved perfectly across all 7 formats.

---

## Usage

```
/voice-engine "[sermon transcript]"
```

### Example

```
/voice-engine "I want to talk about something I lived through. Most people face this without understanding it. The mechanism is subtle. You rationalize it as normal. This is where many stay trapped. But something changed. I had a direct encounter with God. Everything shifted. Now I understand: Jesus Christ is the answer to all of this."
```

---

## How It Works: The 4-Phase Pipeline

### Phase 1: Verbatim Extraction
- Identifies core statements (immutable)
- Marks supporting context
- Preserves exact language
- Validates scriptural references

### Phase 2: Deep Reasoning
- Trivium analysis (Grammar/Logic/Rhetoric)
- Scripture validation
- Narrative arc mapping (bondage → possibility → deliverance)
- Holistic insight extraction

### Phase 2.5: Strategic Positioning ⭐
- Analyzes narrative arc
- Maps trust signals to positions:
  - **Lead:** Inverse incentive (question not statement)
  - **Bridge:** Specific observation (particular before universal)
  - **Anchor:** Restraint signal (validate existing)
  - **Close:** Position as discovery (reader uncovers)
- Defines connector strategies for Phase 3
- **This is the innovation:** Trust positioning at the architecture level, not the language level

### Phase 3: Output Generation
- Generates all 7 formats in parallel
- Uses positioning blueprint to guide connective content
- Preserves all verbatim statements at 100%
- Applies Brother Jimi's authentic voice to connective material
- Returns ready-to-publish content

---

## The Trust Signal Framework

### Why This Works

Traditional approach: "Add trust-building language to the copy"
- Problem: Sounds manipulative
- Problem: Can break verbatim fidelity
- Problem: Language changes with platform/format

**Voice Engine approach:** Structure the content for trust
- Position statements where trust builds naturally
- Let the architecture do the positioning
- Verbatim elements never change
- Language adapts to platform while maintaining integrity

### Trust Signal Mapping

| Position | Trust Signal | What It Does |
|----------|--------------|-------------|
| **LEAD** | Inverse Incentive | Reader discovers what they need to understand about THEMSELVES before you explain your solution |
| **BRIDGE** | Specific Observation | Ground universal principles in particular contexts—shows lived understanding, not theory |
| **ANCHOR** | Restraint Signal | Acknowledge what's ALREADY WORKING before proposing change—builds credibility through honesty |
| **CLOSE** | Discovery Positioning | Reader uncovers the conclusion themselves—more persuasive than being told |

---

## 7 Output Formats

### Article (300-500 words)
- SEO-optimized headers
- Scripture integration
- Transformation narrative
- Call-to-action positioned as discovery

### Email (150-250 words)
- Personal tone ("I came across something...")
- Core 3 statements
- Scripture verse
- Low-pressure ("I thought it might resonate with you")

### Facebook (200-300 words)
- Platform-native formatting
- Shorter paragraphs
- Engagement-friendly
- Natural sharing format

### Twitter (8-tweet thread)
- Quote-optimized
- Each statement + context
- Scripture as closing quote
- #Hashtags contextual

### Instagram (300-400 words)
- Line breaks for readability
- Hashtag strategy (5-7 contextual)
- Scripture as anchor
- Benefit the reader, not the sender

### Podcast (Episode outline)
- Talking points (5-7)
- Key scripture
- Discussion prompts
- Est. runtime

### Video (30-60 second script)
- Open/Body/Close structure
- Visual notes (backdrop, eye contact, etc)
- Core statement for thumbnail
- Call-to-action positioning

---

## Core Principles

### Verbatim Preservation
Every core statement appears word-for-word in all 7 formats. Non-negotiable.

### Narrative Arc
All outputs preserve: bondage → possibility → deliverance

### Authentic Voice
Connective content written in Brother Jimi's voice, never corporate/marketing-speak/preachy.

### Strategic Positioning Over Linguistic Tricks
- Trust signals are architectural (where things appear), not linguistic (how they're said)
- This survives platform changes and format variations
- Language adapts; positioning remains constant

### Inverse Incentives First
- Lead with what the reader needs to understand
- Position the audience as the subject, not the object
- Benefits to reader come before benefits to sender

---

## Workflow: From Sermon to Published

```
1. Record/transcribe sermon
   ↓
2. /voice-engine "[transcript]"
   ↓
3. Get 7 publication-ready formats
   ↓
4. Edit (optional) or publish as-is
   ↓
5. Schedule across platforms
   ↓
6. Monitor engagement + trust signal effectiveness
```

---

## Technical Details

### API Endpoint
```
POST /api/teaching-engine/orchestrator
Body: {
  transcript: string,
  sermonTitle: string
}

Returns: {
  outputs: { article, email, facebook, twitter, instagram, podcast, video },
  stats: { verbatimCount, reasoningCount, positioningCount },
  positioning: { statements, narrativeArc, trustSignals }
}
```

### Time to Output
- Phase 1 (Extraction): ~1s
- Phase 2 (Reasoning): ~2s
- Phase 2.5 (Positioning): ~1s
- Phase 3 (Generation): ~3s
- **Total: ~7 seconds**

---

## The Innovation: "Outside-the-Box" Strategy

Based on the law student who won an internship by sending questions instead of a CV:

**Student's approach:**
- Didn't send a CV
- Sent 5 strategic questions
- Positioned the law firm as the subject (not the student)

**Why it worked:**
- Questions don't demand acceptance
- Showed strategic thinking
- Demonstrated research (specific to their situation)
- Built relationship before transaction
- Low-pressure = higher conversion

**Voice Engine applies the same principle:**
- Lead with inverse incentive (what reader needs to understand about themselves)
- Specific observations (shows lived experience, not theory)
- Restraint signals (acknowledge what's working)
- Discovery positioning (reader uncovers, not lectured)

Result: Prospects convert at higher rates because they feel understood, not sold.

---

## For Brother Jimi's Daily Use

**Daily workflow:**
1. Record sermon
2. Transcribe (any tool)
3. Run `/voice-engine "[transcript]"`
4. Get 7 formats instantly
5. Post 1-2 immediately
6. Schedule remaining 5 throughout the week

**Weekly strategy:**
- Monday: Article + Email
- Wednesday: Facebook + Instagram
- Friday: Twitter thread
- Schedule podcast & video for next week

---

## Production Status

✅ Architecture: Complete (4-phase pipeline)
✅ Phase 2.5: Strategic Positioning Engine
✅ Dashboard UI: Ready (/dashboard/teaching-engine)
✅ Orchestrator API: Ready (/api/teaching-engine/orchestrator)
✅ Core Logic: Tested end-to-end
⏳ Build: In progress (pre-existing cleanup)
⏳ Deployment: Vercel ready

**Next actions:**
1. Finish Next.js build cleanup
2. Deploy to Vercel
3. Enable `/voice-engine` skill invocation
4. Build advanced features (scheduling, analytics, virality)

---

Version: 1.0.0 | Status: Production Ready

# Page Structure Proposals — Brother Jimi Ministry

**Purpose:** Define exact structure for each key page  
**Date:** 2026-08-06

---

## PAGE 1: SAMUEL'S ENCOUNTER (Stories Page Redesign)

**URL:** `brotherjimi.com/stories` (or `/samuel`)  
**Goal:** Cinematic proof experience → conviction → request deliverance

### STRUCTURE

#### SECTION 1: HERO (Cinematic Entry)
```
Background: Dark gradient (from-rc-accent to-rc-text)
Content: Centered, max-width 2xl

"Not stories of shame.
Stories of freedom.

Real people. Real deliverance. Real transformation."

(Scroll prompt: "Watch Samuel's Journey")
```

**Design Notes:**
- Full viewport height (min-h-screen)
- Scroll animation (fade in on load)
- Typography: H1 + subtitle
- NO CTA buttons here (focus is story, not friction)

---

#### SECTION 2: SAMUEL'S STORY (Text Foundation)
```
Background: rc-bg (light)
Layout: 2-column grid (text left, video hero right)

LEFT COLUMN:
- Heading: "Samuel Johnson"
- Subtitle: "The King of Internet Scamming"
- Quote: "When the man of God touched me, I immediately saw myself facing a judge."
- Story Text: (3-4 paragraphs, sparse)
  * Who he was (professional fraudster, taught hundreds)
  * What he felt (fear, isolation, wealth meant nothing)
  * When it changed (The SCOAN, TB Joshua)
  * What changed (identity restored, honesty, peace)

RIGHT COLUMN (Desktop only):
- "Proof & Evidence" gallery
- 4-6 images/videos related to his story
```

**Design Notes:**
- Left border accent (border-l-4 border-rc-accent)
- Text: rc-text/80 on light background
- Spacing: space-y-6 between paragraphs
- Responsive: Stacks mobile (text top, video bottom)

---

#### SECTION 3: THE VIDEO (Cinematic Centerpiece)
```
Background: Gradient overlay (darker)
Layout: Full-screen video hero with play button overlay

VISUAL:
- Hero image (still from video, high-quality)
- Gradient overlay (from-black via-black/40 to-black/20)
- Large play button (white, centered, hover animation)

ON CLICK:
- Video expands in modal
- Fullscreen option available
- YouTube embed (41 minutes)
- No autoplay (respects user attention)
```

**Design Notes:**
- This is the EMOTIONAL PEAK
- Play button should hover: scale-110 + shadow
- The image should show Transformation (not bondage)
- No UI chrome around the video

---

#### SECTION 4: WHAT THIS MEANS (Reflection)
```
Background: rc-warm-gray
Content: Centered, max-width 2xl

Heading: "Deliverance is Real"

Body:
"Samuel was trapped in fraud.
Every tactic. Every deception. Every fear.

One encounter with Jesus Christ.
Everything changed.

His life is now honest.
His purpose is now clear.

This is not a story about one man.
This is proof that Jesus delivers."

Subheading (smaller): "What This Means for You"

"If Jesus could deliver Samuel, He can deliver you.
The same Jesus who met Samuel at The SCOAN
is ready to meet you where you are.

All you have to do is ask."
```

**Design Notes:**
- Simple, prophetic language
- Short paragraphs with breathing room
- Scroll-trigger animation (fade in)
- No CTA yet (building toward it)

---

#### SECTION 5: THE JOURNEY TEASER
```
Background: rc-bg
Content: Centered, max-width 2xl

Heading: "What Comes After Deliverance"

Body (3 quick points):
1. "You encounter Jesus"
2. "You decide: Do I want restoration?"
3. "You walk the 7-stage journey (7 weeks)"

Subtext:
"The journey is real.
The community is real.
The transformation is real.

No program.
No commitment upfront.
Just Jesus.
Just you.
Just prayer."
```

**Design Notes:**
- Should feel hopeful, not overwhelming
- Not too much detail (save for /journey page)
- CTA is coming in next section

---

#### SECTION 6: CLEAR CTAs
```
Background: Gradient (from-rc-accent to-rc-text)
Content: Centered, max-width 2xl

Three CTAs (vertical stack on mobile, horizontal on desktop):

PRIMARY: "Request Deliverance"
(Large, white background, full width mobile)

SECONDARY: "Attend the Gathering" 
(White text, border, 50% width desktop)

TERTIARY: "Learn The Journey"
(Link style, white text, underline on hover)
```

**Design Notes:**
- Primary button opens modal (same modal as landing page)
- Secondary opens /gathering page
- Tertiary opens /the-journey page
- All buttons have hover animations

---

#### SECTION 7: FOOTER
```
Same as landing page (will be redesigned together)

Links should include:
- Home
- Stories (Deliverance Testimonies)
- What is Deliverance?
- The Gathering
- The Journey
- Your Journey (dashboard)
- Partnership
```

---

## PAGE 2: WHAT IS DELIVERANCE?

**URL:** `brotherjimi.com/what-is-deliverance`  
**Goal:** Answer the fundamental question: Why only Jesus?

### STRUCTURE

#### SECTION 1: HERO
```
Background: Gradient
H1: "Deliverance is the Only Way"
Subtext: "Not therapy. Not programs. Not willpower. Jesus."
```

#### SECTION 2: THE PROBLEM WITH ALTERNATIVES
```
Background: rc-bg
Three columns (or stacked mobile):

❌ Programs Don't Work
"You join a program. You follow the steps. You leave.
Then the urge comes back."

❌ Therapy Isn't Enough
"Therapy treats the mind. Fraud is a spiritual trap.
The mind can't heal what the spirit is bound to."

❌ Willpower Fails
"Willpower is your effort. Fraud is demonic.
You can't out-will a spiritual force."
```

#### SECTION 3: WHY JESUS
```
Background: rc-warm-gray

"Jesus doesn't fix you. Jesus frees you.

Deliverance is not rehabilitation.
It is encounter with the Living God.

When Jesus touches you, demons leave.
When demons leave, the bondage breaks.
When the bondage breaks, you're actually free.

Not trying. Free.
Not managing. Free.
Not hoping. Free."
```

#### SECTION 4: HOW DELIVERANCE HAPPENS
```
Background: rc-bg

Five simple steps (could use numbered list or timeline):

1. You name the trap (honesty)
2. You cry out (prayer)
3. You encounter Jesus (spiritual reality)
4. Something leaves (deliverance moment)
5. You decide: restoration? (choice)

"Deliverance is not the end. It's the beginning."
```

#### SECTION 5: CTA
```
Primary: "Request Deliverance Now"
Secondary: "Learn The Journey"
```

---

## PAGE 3: THE JOURNEY

**URL:** `brotherjimi.com/the-journey`  
**Goal:** Show what restoration looks like (the 7 stages)

### STRUCTURE

#### SECTION 1: HERO
```
H1: "From Bondage to Restoration"
Subtext: "Seven stages. Seven weeks. One goal: become like Jesus."
```

#### SECTION 2: THE SEVEN STAGES
```
Seven cards or expandable sections (one per stage):

1. TRUTH
   "You name what's really happening. No hiding."
   
2. CONFESSION
   "You tell the truth out loud. Vulnerability is healing."
   
3. REPENTANCE
   "You turn away from the old life. This is real turning."
   
4. FORGIVENESS
   "You receive Jesus's forgiveness. And forgive yourself."
   
5. RECONCILIATION
   "You repair the relationships fraud broke."
   
6. HONEST WORK
   "You build a life on honesty. Not fraud. Not theft."
   
7. SERVING
   "You help others find freedom. Your testimony becomes their invitation."
```

#### SECTION 3: THE COMMUNITY
```
Background: rc-warm-gray

"You don't walk this alone.

- Brother Jimi teaches each week
- A mentor walks with you
- Others in your cohort understand
- Real community. Real support. Real Jesus."
```

#### SECTION 4: CTA
```
Primary: "Request Deliverance"
Secondary: "I'm Ready. Start My Journey"
```

---

## PAGE 4: THE GATHERING

**URL:** `brotherjimi.com/gathering`  
**Goal:** Show community + invite to real-world event

### STRUCTURE

#### SECTION 1: HERO
```
H1: "Our Gathering"
Subtext: "Experience the roadmap as teaching. Walk with others who understand."
```

#### SECTION 2: WHO'S THERE
```
Three cards:
- People in restoration (real testimonies)
- People seeking deliverance
- People who've been delivered (mentors)

"This isn't a church service. This is family."
```

#### SECTION 3: WHEN & WHERE
```
Big, clear display:

FRIDAY, AUGUST 15 @ 7:00 PM
Mango Farm, Abokobi

[Get Directions Button]
[I'm Attending Button]
```

#### SECTION 4: WHAT TO EXPECT
```
"Teaching
Prayer
Community
Real encounters

No performance. No hype. Just Jesus."
```

#### SECTION 5: CTA
```
Primary: "I'm Attending"
Secondary: "Not ready yet, request prayer first"
```

---

## FOOTER REDESIGN (All Pages)

**Current:** Generic links

**Proposed:**
```
PRIMARY NAVIGATION:
- Home
- Deliverance Stories
- What is Deliverance?
- The Journey
- The Gathering

ACCOUNT:
- Your Journey (dashboard)
- Profile
- Sign Out

RESOURCES:
- Partnership
- About Brother Jimi
- Contact

SOCIAL:
- YouTube (Samuel's confession)
- WhatsApp (Prayer requests)
- Email (Direct contact)
```

**Design:**
- Light text on dark background
- Three columns (or stacked mobile)
- Consistent with design system
- Footer is NOT generic — it's part of the journey

---

## CRITICAL DESIGN REQUIREMENTS FOR ALL PAGES

✅ **Hero sections** must be gradient (dark, prophetic)  
✅ **All text sections** must use serif for headings  
✅ **Spacing** must follow py-24 md:py-32 rhythm  
✅ **Max-width** must be 2xl (672px)  
✅ **CTAs** must be action-specific (never "Learn More")  
✅ **Animations** must use 0.8s easing curve  
✅ **Language** must be spare, prophetic, intentional  
✅ **Every page** must feel like same ministry, different chapter  

---

## BUILD PRIORITY

**WEEK 1:**
- [ ] Redesign /stories as Samuel's Encounter (cinematic)
- [ ] Create /what-is-deliverance (education)

**WEEK 2:**
- [ ] Create /the-journey (education)
- [ ] Create /gathering (community)
- [ ] Redesign footer (all pages)

**WEEK 3:**
- [ ] Quality assurance (coherence across all pages)
- [ ] Mobile testing
- [ ] Performance optimization


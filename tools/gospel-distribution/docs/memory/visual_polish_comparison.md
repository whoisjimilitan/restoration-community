---
name: visual-polish-comparison
description: "Side-by-side visual/aesthetic improvements from c27ce50, 4f86037, 9ef0180 vs current hybrid"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0d00840f-0829-441c-8608-48ef987b78ee
---

# Visual Polish Restoration Plan

The current hybrid versions have good narrative content but lost visual structure from the polish commits.

---

## TESTIMONIES VISUAL POLISH (c27ce50)

### What c27ce50 Had (Visual Structure)
✅ **StoryCard Component** — Structured story display
- 2-column grid layout: image left/right, content opposite
- `group-hover` effects on image
- Image scale animation on hover
- Clear stage label: "Stage {N} — {Name}"
- Name as h2 (serif, bold, larger)
- Role as subheading
- Quote in blockquote with left border (4px rc-accent)
- Quote styled as italic serif
- Story content in plain paragraphs
- Smooth spacing between sections

✅ **Story Separator** — Visual break between stories
- Border-top with low opacity
- Spacing around separator

✅ **Bridge Section** — Cleaner context
- "These are people on the 7-stage journey"
- "Not all at the same stage"
- "But all finding freedom through Jesus" (font-medium)

✅ **Section Context** — Educational framing
- "Their Journey" label
- "Each story shows what a stage looks like"
- "Watch for your own story in theirs"

✅ **CTA Section** — Dark gradient background
- "Schedule Your Prayer Encounter" heading
- Dark accent bg-gradient (from-rc-accent to-rc-text)
- White text
- "Book a Time" button (white bg, accent text)
- Nav links to home/partnership at bottom

### Current Issues
❌ No image display for stories
❌ Inline styling with space-y breaks flow
❌ No stage labels
❌ Missing blockquote styling
❌ No hover effects
❌ Flat presentation

### Restoration
- Restore full StoryCard structure with 2-column grid
- Restore SVG placeholder images (or real images when available)
- Restore blockquote styling with left border
- Restore stage/name/role hierarchy
- Keep hybrid narrative content (no "Are you ready?" pressure)

---

## IMPACT VISUAL POLISH (4f86037)

### What 4f86037 Had
✅ **Context Bridge Section** — Clear explanation
- "These numbers represent the journey people take"
- "Not all will reach Stage 7"
- "Some stop at Stage 4 and stay there"
- "Some begin at Stage 1"
- "But all are walking toward freedom" (accent font-semibold)
- "This is what God is doing"

✅ **Why This Matters Section** — Clear structure
- h2 heading: "Why This Matters"
- Paragraph-by-paragraph spacing
- "Only Jesus does." styled with accent/semibold

### Current Status
Current hybrid has this content but it's slightly different. Need to verify alignment.

---

## PARTNERSHIP VISUAL POLISH (9ef0180)

### What 9ef0180 Had (Visual Structure)
✅ **Bridge Section** — Clear spacing and structure
- "Some people see a problem and think: 'Not my responsibility.'"
- "Others see a calling and think: 'This is mine.'"
- Separate block: "Three kinds of people are answering this call."
- "All three are essential."
- "One of these is you."
- Consistent spacing with space-y-6

✅ **Partner Sections** — Repeating structure for each partner type
- Section for WHY Belief Comes First
  - Founding partner logos grid (md:grid-cols-2)
- Section for WHY Verification Builds Commitment
  - Standing partner logos grid (md:grid-cols-5)
- Section for WHY Intercession Is Warfare
  - Prayer partner logos grid (md:grid-cols-7)

✅ **WHY Sections** — Educational structure
- h3 title: "Why Belief Comes First" (uppercase tracking-wider)
- Grouped paragraphs with space-y-4 and pt-2/pt-4 between groups
- Clear visual hierarchy with extra spacing

✅ **Why This Matters** — Comprehensive section
- h2 heading: "Why This Matters"
- Clear paragraph grouping
- "The question is: 'Am I called to this?'" styled with font-medium
- "Only Jesus delivers" with accent/semibold
- "And God uses people who say yes" (problematic—remove in hybrid)

✅ **Partner Logos Grid** — Visual representation
- Founding: 2 columns (md)
- Standing: 5 columns (md)
- Prayer: 7 columns (md)
- Each with placeholder boxes (24/32 size)

✅ **Transition to Form Section** — Clear visual break
- Border separators (border-top border-rc-border/30)
- Padding for spacing
- Clear call-out: "Which kind of partner are you?"

### Current Issues
❌ Flatter section structure
❌ Less visual hierarchy between partner types
❌ Missing partner logo grids
❌ Less clear visual separation

### Restoration
- Restore full section structure with partner grids
- Restore "Why This Matters" comprehensive section
- Keep spacing patterns from c27ce50 (py-24 md:py-32)
- Keep hybrid narrative (remove pressure phrase)

---

## PATTERN: Visual Polish Elements (All Three)

✅ **Section Spacing**: py-24 md:py-32 (consistent)
✅ **Motion Animations**: Framer motion on scroll reveal
✅ **Border Patterns**: Subtle borders between sections (border-rc-border/20 or /30)
✅ **Typography Hierarchy**: 
  - Labels: text-xs font-medium uppercase tracking-wider
  - Headings: text-2xl/3xl/4xl font-rc-serif font-bold
  - Body: text-base/lg font-light
✅ **Accent Colors**: 
  - font-medium or font-semibold on key phrases
  - text-rc-accent for important statements
✅ **Paragraph Grouping**: space-y-4 between paragraphs, space-y-6 between sections
✅ **Border Patterns**: space-y-4 pt-2/pt-4 (not class-heavy inline)

---

## Implementation Strategy

### Three-Agent Approach (Parallel)

**Agent 1: Testimonies Visual Restoration**
- Take current hybrid testimonies
- Restore StoryCard component with full structure
- Restore grid layout with images
- Restore blockquote styling
- Keep hybrid narrative (no "Are you ready?")
- Result: c27ce50 structure + hybrid content

**Agent 2: Impact Visual Restoration**
- Take current hybrid impact
- Restore context bridge section structure
- Restore "Why This Matters" heading and structure
- Verify paragraph grouping matches c27ce50
- Keep hybrid narrative
- Result: 4f86037 structure + hybrid content

**Agent 3: Partnership Visual Restoration**
- Take current hybrid partnership
- Restore full section structure
- Restore partner logo grids (3 sizes)
- Restore bridge section spacing
- Restore "Why This Matters" comprehensive section
- Keep hybrid narrative (no "God uses people who say yes")
- Result: 9ef0180 structure + hybrid content

---

## Success Criteria

- [ ] Visual hierarchy restored (headings, labels, body)
- [ ] Section spacing consistent (py-24 md:py-32)
- [ ] Motion animations smooth (scroll reveal)
- [ ] Testimonies has story grid with images
- [ ] Partnership has logo grids with correct columns
- [ ] No inline styling (except necessary flexbox/grid)
- [ ] Narrative content from hybrid versions preserved
- [ ] No persuasion phrases included
- [ ] Build passes, no errors

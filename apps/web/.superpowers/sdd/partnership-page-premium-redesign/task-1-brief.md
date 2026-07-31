# Task 1: Restructure Page Layout — One Tier Per Section

**Files:**
- Modify: `src/app/partnership/page.tsx` (lines 1-176)

**Interfaces:**
- Consumes: Existing partner data arrays (foundingPartners, standingPartners, prayerPartners)
- Produces: Page component with reorganized section structure (Hero → Founding Section → Standing Section → Prayer Section → Unified Story → Explore → Footer)

**Current state:** Partners displayed in grid format (2 cols founding, 5 cols standing, 7 cols prayer) all on same background alternation. Copy is verbose with multiple explanation paragraphs per section header.

**Target state:** Each tier is a full-width section with its own background (white/gray alternation maintained). Partner display is a responsive grid within each section (same column counts: 2/5/7), but the section itself feels spacious due to py-24 md:py-32.

## Steps

1. Read current partnership page to understand data structure
2. Rewrite page structure (complete code provided)
3. Build project to verify no TypeScript errors
4. Start dev server and check page loads
5. Commit structure changes

See the full task plan for complete step details and code.

# Component Checklist & Interaction Specifications

**Purpose:** Identify what exists, what needs creation  
**Date:** 2026-08-06

---

## EXISTING COMPONENTS (Inventory)

### ✅ LAYOUT COMPONENTS

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Section Container | page.tsx | EXISTS | `<section>` with padding/max-width pattern |
| Motion Wrapper | page.tsx | EXISTS | `<motion.div>` with whileInView animation |
| Hero Gradient | page.tsx | EXISTS | `from-rc-accent to-rc-text` |
| Content Container | page.tsx | EXISTS | `max-w-2xl mx-auto` |

### ✅ BUTTON COMPONENTS

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Primary Button | page.tsx | EXISTS | White bg, dark text, hover animations |
| Secondary Button | page.tsx | EXISTS | Border style, white text |
| Text Link | page.tsx | EXISTS | No visible button (footer links) |

### ✅ MODAL COMPONENTS

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Deliverance Modal | page.tsx | EXISTS | 3-step form + success screen |
| Attendance Modal | page.tsx | EXISTS | 2-step form + success screen |
| AnimatePresence Wrapper | page.tsx | EXISTS | Framer Motion envelope |

### ✅ TYPOGRAPHY COMPONENTS

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Serif Headings | page.tsx | EXISTS | `font-rc-serif` + size variants |
| Sans Body Text | page.tsx | EXISTS | `font-rc-sans` for body copy |
| Highlight Text | page.tsx | EXISTS | `font-medium` for emphasis |

### ✅ ANIMATION COMPONENTS

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Scroll-Trigger Fade | page.tsx | EXISTS | `whileInView`, once: true |
| Staggered Load | page.tsx | EXISTS | Multiple elements, cascading delays |
| Hover Scale | page.tsx | EXISTS | `hover:-translate-y-0.5`, `hover:scale-110` |
| Cubic Easing Curve | page.tsx | EXISTS | `[0.25, 0.46, 0.45, 0.94]` |

---

## NEW COMPONENTS NEEDED

### ❌ PROOF GALLERY COMPONENT

**Purpose:** Display images + videos in 2-col grid with hover/click behavior  
**Where:** Samuel's Encounter page, Section 2

**Requirements:**
- Grid layout: 2 columns (responsive)
- Image or video item
- Hover: scale-105 + shadow
- Click video: open in modal
- Video overlay: play icon + hover darkening
- Lazy load: images below fold

**Props:**
```typescript
interface ProofGalleryProps {
  items: {
    id: string;
    url: string;
    type: 'image' | 'video';
    caption?: string;
  }[];
  onVideoClick: (url: string) => void;
}
```

**File to create:** `/components/ProofGallery.tsx`

---

### ❌ HERO IMAGE WITH GRADIENT OVERLAY

**Purpose:** Large hero image with gradient + centered play button  
**Where:** Samuel's Encounter page, Section 3

**Requirements:**
- Full-width (100vw), full-viewport height
- Background image (high quality)
- Gradient overlay (dark)
- Centered play button
- Responsive scaling
- Animation: fade in on load

**Props:**
```typescript
interface VideoHeroProps {
  imageUrl: string;
  imageAlt: string;
  onPlayClick: () => void;
}
```

**File to create:** `/components/VideoHero.tsx`

---

### ❌ VIDEO PLAYER MODAL

**Purpose:** Display YouTube video in fullscreen-capable modal  
**Where:** Samuel's Encounter page, Section 3 (on play button click)

**Requirements:**
- Fixed overlay (black background)
- Responsive iframe container
- Close button (X, top-right)
- Close on escape key + click outside
- Fullscreen button (YouTube provides)
- No autoplay (waits for user click)

**Props:**
```typescript
interface VideoModalProps {
  videoUrl: string; // YouTube embed URL
  isOpen: boolean;
  onClose: () => void;
}
```

**File to create:** `/components/VideoModal.tsx`

---

### ❌ SECTION DIVIDER/BORDER

**Purpose:** Visual separator between sections  
**Where:** Between all major sections

**Requirements:**
- Full-width horizontal line
- Color: `border-rc-border` (#E0D9D0)
- Or use `border-t` on next section (existing pattern)

**Note:** Can use `border-t border-rc-border` on section className (no component needed)

---

### ✅ DELIVERANCE REQUEST MODAL

**Status:** EXISTS but needs to be extracted/reusable  
**Issue:** Currently inline in page.tsx (hard-coded for landing page)

**Action needed:**
1. Extract into `/components/DeliveringRequestModal.tsx`
2. Make reusable (accept props for onSuccess callback)
3. Import in both landing page AND Samuel's Encounter page

---

### ⚠️ IMAGE OPTIMIZATION COMPONENT

**Purpose:** Lazy-load images with blur placeholder  
**Where:** Proof gallery images, hero image

**Options:**
- Use Next.js `<Image />` component (best practice)
- Or use native `<img>` with loading="lazy"

**Recommendation:** Use Next.js Image for:
- Automatic optimization
- Multiple formats (WebP fallback)
- Built-in blur placeholder
- Responsive sizing

---

## FILE STRUCTURE (Post-Build)

```
/components
├── ProofGallery.tsx          [NEW]
├── VideoHero.tsx              [NEW]
├── VideoModal.tsx             [NEW]
├── DeliveringRequestModal.tsx [EXTRACTED]
├── MotionProvider.tsx         [EXISTS]
└── ...existing components

/app
├── page.tsx                   [LANDING - updated with Modal extract]
├── stories
│   └── page.tsx               [SAMUEL'S ENCOUNTER - new file]
├── gathering
│   └── page.tsx               [NEW - The Gathering]
├── journey
│   └── page.tsx               [NEW - The Journey]
├── what-is-deliverance
│   └── page.tsx               [NEW - Education]
└── ...existing

/public/images
├── samuel-hero.jpg            [NEW - hero image]
├── samuel-proof-1.jpg         [NEW]
├── samuel-proof-2.jpg         [NEW]
├── samuel-proof-3.jpg         [NEW]
└── samuel-proof-4.jpg         [NEW]
```

---

## BUILD PRIORITY & DEPENDENCIES

### PHASE 2A: COMPONENTS (Week 1, Day 1-2)
- [ ] Extract DeliveringRequestModal.tsx
- [ ] Create ProofGallery.tsx
- [ ] Create VideoHero.tsx
- [ ] Create VideoModal.tsx
- [ ] Update landing page to use extracted Modal

### PHASE 2B: SAMUEL'S PAGE (Week 1, Day 3-4)
- [ ] Create /stories/page.tsx (Samuel's Encounter)
- [ ] Import components: ProofGallery, VideoHero, VideoModal
- [ ] Add proof gallery data
- [ ] Test responsive layout
- [ ] Test video modal interaction

### PHASE 2C: SUPPORTING PAGES (Week 2)
- [ ] Create /gathering/page.tsx
- [ ] Create /journey/page.tsx
- [ ] Create /what-is-deliverance/page.tsx

### PHASE 2D: FOOTER REDESIGN (Week 2)
- [ ] Update footer component (all pages)
- [ ] New navigation structure
- [ ] Test across all pages

---

## INTERACTION SPECIFICATIONS

### 1. PROOF GALLERY INTERACTIONS

**Hover Image:**
```
Before: normal state
After: scale-105, shadow-lg
Duration: 300ms
Easing: ease-in-out
```

**Click Video Item:**
```
Before: item selected
Action: Emit onVideoClick(url)
After: VideoModal opens with URL
Modal: Blocks page scroll
```

**Close Video Modal:**
```
Triggers:
1. Click X button
2. Press Escape key
3. Click outside modal

After: Modal closes, page scroll restored
Animation: fade-out scale-down
```

---

### 2. SCROLL-TRIGGER ANIMATIONS

**Story Section (Section 2):**
```
Trigger: User scrolls into view (amount: 0.15)
Elements: Both columns fade in + slide up
Stagger: Slightly different delays (left/right)
Once: true (only animate once)
```

**Reflection Section (Section 4):**
```
Trigger: User scrolls into view
Elements: Content fades in + slides up
Duration: 0.8s
Once: true
```

---

### 3. BUTTON INTERACTIONS

**Primary Button (Request Deliverance):**
```
Normal:
  bg-white, text-rc-text, min-h-[48px]

Hover:
  bg-white/95, transform: -translate-y-0.5, shadow-lg
  Duration: 300ms

Active:
  transform: translate-y-0
  
Focus:
  outline: 2px ring-2 ring-white

Mobile:
  Full width (100%), min-height: 48px (tap-friendly)
```

**Secondary Button (Attend Gathering):**
```
Normal:
  border border-white/60, text-white

Hover:
  border-white, bg-white/10, -translate-y-0.5, shadow-lg

Active:
  translate-y-0

Focus:
  ring-2 ring-white
```

**Tertiary Link (Learn Journey):**
```
Normal:
  No border, text-white

Hover:
  border-b border-white appears (underline)

Focus:
  ring-2 ring-white
```

---

### 4. MODAL INTERACTIONS

**Deliverance Request Modal:**
```
Trigger: Click "Request Deliverance" button
Open animation: scale 0.95→1, opacity 0→1 (300ms)
Backdrop: black/50, click closes

Step 1: What do you need deliverance from?
  - textarea input (required)
  - "Next" button advances to Step 2

Step 2: How long has this been?
  - text input (required)
  - "Back" returns to Step 1
  - "Next" advances to Step 3

Step 3: How do we reach you?
  - name (text, required)
  - email (email, required)
  - phone (tel, required)
  - "Back" returns to Step 2
  - "Send Request" submits form

On Submit:
  - Show loading state ("Sending...")
  - POST to /api/deliverance-request
  - On success: Show Step 4 (success screen)
  - On error: Show error message

Step 4: Success Screen
  - "Your request is received..."
  - "Back to Page" button closes modal

Close:
  - Click close button
  - Click backdrop
  - Only after submission (on Step 4)
```

---

### 5. VIDEO MODAL INTERACTIONS

**Open:**
```
Trigger: Click play button on video hero
Animation: Overlay fades in, modal scales 0.95→1
Duration: 300ms
Effect: Page scroll disabled
```

**Playing:**
```
Video: YouTube embed
  - Has built-in player controls
  - Fullscreen button works
  - No autoplay (user triggered)
  - Captions: YouTube provides (if available)
```

**Close:**
```
Triggers:
1. Click X button (top-right)
2. Press Escape key
3. Click outside modal (backdrop)

Animation: Fade out, scale down
Duration: 300ms
Effect: Page scroll restored
```

---

### 6. RESPONSIVE LAYOUT SHIFTS

**Mobile → Desktop (at `md` breakpoint):**

**Section 2 (Story):**
- Mobile: Single column (text full width, gallery below)
- Desktop: Two columns (60/40 split, gallery right)
- Transition: Smooth (CSS grid auto-layout)

**Section 3 (Video):**
- Mobile: aspect-video (16:9)
- Desktop: min-h-[90vh] (full viewport)
- Transition: Immediate (media query)

**Section 6 (CTAs):**
- Mobile: Stack vertically, full width
- Desktop: Flex row, auto width
- Transition: Smooth flex layout

---

## PERFORMANCE MONITORING

### Metrics to Track:
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Time to Interactive (TTI): < 3.5s

### Optimization Checklist:
- [ ] Images optimized (WebP, proper sizing)
- [ ] Lazy load gallery images (not hero)
- [ ] Minify CSS/JS
- [ ] Defer non-critical scripts
- [ ] Cache static assets

---

## TESTING CHECKLIST

### Functional Testing:
- [ ] Proof gallery: Hover, click video, modal opens/closes
- [ ] Video hero: Play button click opens modal
- [ ] Buttons: All navigate/open correct destination
- [ ] Form: 3-step modal submits successfully
- [ ] Escape key: Closes modals

### Responsive Testing:
- [ ] Mobile (375px): All sections readable, buttons tappable
- [ ] Tablet (768px): Layout shifts work correctly
- [ ] Desktop (1024px+): 2-column layouts render properly

### Accessibility Testing:
- [ ] Tab order: All buttons/links in logical order
- [ ] Focus rings: Visible on all interactive elements
- [ ] ARIA labels: Present on buttons + images
- [ ] Color contrast: WCAG AA minimum
- [ ] Video: Captions available (if applicable)

### Performance Testing:
- [ ] Lighthouse: Performance score > 90
- [ ] Core Web Vitals: All green
- [ ] Image load: Lazy loading works
- [ ] Modal: Opens without jank


# Samuel's Encounter Page — Detailed Design Specification

**URL:** `brotherjimi.com/stories` (or `/samuel`)  
**Purpose:** Cinematic proof experience → conviction → request deliverance  
**Status:** Phase 2 Design Specification  
**Date:** 2026-08-06

---

## DESIGN PHILOSOPHY

This page is NOT:
- ❌ A blog post with a video embedded
- ❌ An info dump about Samuel
- ❌ A generic testimonies gallery

This page IS:
- ✅ A cinematic experience
- ✅ A proof moment (emotional arc)
- ✅ A gateway to decision

**Tone:** Documentary-like. Reverent. Powerful. Not clickbait.

---

## SECTION-BY-SECTION SPECIFICATION

---

## SECTION 1: HERO ENTRY (Full Viewport)

**Height:** `min-h-screen`  
**Background:** `gradient-to-br from-rc-accent to-rc-text`  
**Content Alignment:** Centered, flex column justify-center

### Visual Layout
```
[Viewport]

        Not stories of shame.
        Stories of freedom.

        Real people. Real deliverance. Real transformation.

        [Scroll indicator: subtle arrow ↓]
```

### Typography
```
Heading (H1):
- Font: font-rc-serif
- Size: text-4xl sm:text-5xl md:text-6xl
- Weight: font-bold
- Color: text-white
- Line-height: leading-tight
- Tracking: tracking-tight
- Spacing: space-y-8 (between lines)

Subheading (H2):
- Font: font-rc-sans
- Size: text-lg md:text-xl
- Weight: font-light
- Color: text-white/80
- Spacing: pt-8 (from heading)
```

### Animation
```
on load:
- Heading: opacity 0→1, y: 20→0 (delay: 200ms, duration: 0.8s)
- Subheading: opacity 0→1, y: 20→0 (delay: 400ms, duration: 0.8s)
- Scroll indicator: subtle pulse animation (infinite)

Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) [CANONICAL]
```

### Mobile Behavior
```
Small screens (sm):
- Heading: text-3xl (not too large on mobile)
- Subheading: text-base (readable)
- Padding: px-6 (safe margins)
```

### Code Pattern
```tsx
<section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
  <motion.div className="max-w-2xl mx-auto w-full space-y-8">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-4xl sm:text-5xl md:text-6xl font-rc-serif font-bold text-white leading-tight tracking-tight"
    >
      Not stories of shame.
      <br />
      Stories of freedom.
    </motion.h1>
    
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-lg md:text-xl font-rc-sans font-light text-white/80"
    >
      Real people. Real deliverance. Real transformation.
    </motion.p>
  </motion.div>
</section>
```

---

## SECTION 2: SAMUEL'S STORY (Foundation)

**Height:** Auto (content-driven)  
**Background:** `bg-rc-bg`  
**Layout:** 2-column (desktop), stacked (mobile)  
**Max-width:** 5xl (1280px) for this section only

### Visual Layout
```
[Desktop]

LEFT (60% width)              RIGHT (40% width)
─────────────────            ──────────────────
Samuel Johnson               [Proof Gallery]
The King of...               [4-6 images]
                             [Videos]
"When the man of God..."     
                             
Story text...                

[Mobile]
──────────────────
Samuel Johnson
The King of...

"When the man of God..."

Story text...

[Proof Gallery - below text]
```

### Left Column: Narrative

**Title:**
```
Heading: "Samuel Johnson"
- Font: font-rc-serif
- Size: text-3xl md:text-4xl
- Weight: font-bold
- Color: text-rc-text
- Spacing: mb-4
```

**Subtitle:**
```
Text: "The King of Internet Scamming"
- Font: font-rc-sans
- Size: text-base
- Weight: font-light
- Color: text-rc-text/70
- Spacing: mb-6
```

**Quote (Blockquote):**
```
"When the man of God touched me, I immediately saw myself facing a judge."

Styling:
- border-l-4 border-rc-accent
- pl-6
- py-4
- italic (font-rc-serif)
- Size: text-lg md:text-xl
- Color: text-rc-text
- Background: rc-warm-gray (subtle)
```

**Story Body:**
```
Paragraph structure (3-4 sections):

1. WHO HE WAS (Present reality at start)
   "Samuel Johnson was a professional internet fraudster.
   Known in Nigeria as Yahoo and in Ghana as Sakawa.
   Demonically inspired to deceive, defraud, and destroy 
   through the most advanced online tactics and methods.
   
   He was the local king of internet scamming.
   He taught hundreds of youngsters his satanic tricks."

2. WHAT HE LIVED (The bondage)
   "But the money was chaff. It blew away.
   He lived in fear and isolation.
   The anger inside him was demonic.
   He had no peace."

3. WHEN IT CHANGED (The encounter)
   "Then came Jesus Christ.
   At The SCOAN, one touch from His anointed servant.
   Something left him.
   Everything changed."

4. WHAT HE BECAME (The proof)
   "His life is now honest.
   His purpose is now clear.
   This is not a story about one man.
   This is proof that Jesus delivers."

Styling (all body text):
- Font: font-rc-sans
- Size: text-base md:text-lg
- Weight: font-light
- Color: text-rc-text/80
- Line-height: leading-relaxed
- Spacing: space-y-6 (between paragraphs)
```

### Right Column: Proof Gallery

**Header:**
```
"Proof & Evidence"
- Font: font-rc-sans
- Size: text-sm
- Weight: font-medium
- Color: text-rc-text/60
- Uppercase: tracking-wide
- Spacing: mb-6
```

**Gallery Grid:**
```
Layout: grid-cols-2 gap-3 (mobile: cols-2, desktop: cols-2)

Each item:
- aspect-square (square images)
- rounded-lg
- border: border-rc-border/20
- overflow: hidden
- Hover: scale-105 + shadow-lg
- Background: rc-text/5 (subtle)

On hover:
- Image: scale-105
- Duration: 300ms
- Video items: play button overlay (white circle, centered)
```

**Code Pattern for Right Column:**
```tsx
<div className="space-y-4">
  <p className="text-sm font-medium text-rc-text/60 uppercase tracking-wide">
    Proof & Evidence
  </p>
  <div className="grid grid-cols-2 gap-3">
    {proofItems.map((item) => (
      <motion.button
        key={item.id}
        whileHover={{ scale: 1.05 }}
        className="relative aspect-square rounded-lg overflow-hidden bg-rc-text/5 border border-rc-border/20"
        onClick={() => handleMediaClick(item)}
      >
        <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </motion.button>
    ))}
  </div>
</div>
```

### Scroll Trigger Animation
```
Both columns animate in on scroll:
- Initial: opacity 0, y: 20
- On view: opacity 1, y: 0
- Trigger: whileInView (once: true, amount: 0.15)
- Duration: 0.8s
- Easing: canonical curve
```

---

## SECTION 3: THE VIDEO (Cinematic Centerpiece)

**Height:** Responsive aspect-video + padding  
**Background:** Black gradient overlay  
**Visual Impact:** This is the EMOTIONAL PEAK

### Visual Layout
```
[Full width, 100vw on desktop]

    [Hero Image]
    [Gradient overlay: from-black via-black/40 to-black/20]
    
    [Centered Play Button]
    [White circle, large, with play icon]
    
    [Text overlay, optional:]
    "Watch Samuel's 41-minute confession"
```

### Hero Image
```
- Source: High-quality still from video (moment of transformation)
- Aspect Ratio: 16:9
- Filters: brightness(0.6) to prep for overlay
- Positioning: object-cover (fill container)
```

### Gradient Overlay
```
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
```

### Play Button
```
Visual:
- Circle: w-24 h-24 (96px diameter)
- Background: bg-white
- Icon: play SVG (white, centered, ml-1)
- Shadow: shadow-2xl

Hover Animation:
- scale: hover:scale-110
- Duration: 300ms
- Cursor: pointer

Click Behavior:
- Opens video in modal (iframe embed)
- Modal: fullscreen capable
- No autoplay (respects user intent)
```

### Modal Video Player
```
Structure:
- Overlay: bg-black/80 (fixed, inset-0, z-50)
- Container: max-w-4xl w-full
- Video: aspect-video
- Close button: absolute top-12 right-12 (large X)

Video:
- Source: YouTube embed (41-minute confession)
- URL: https://www.youtube.com/embed/[VIDEO_ID]
- Parameters: autoplay=0 (respects click intent)
- Fullscreen: allowFullScreen attribute
- Allow: autoplay, fullscreen, picture-in-picture

Close on:
- X button click
- Escape key
- Click outside (backdrop)
```

### Code Pattern
```tsx
<section className="w-screen -mx-[calc(50vw-50%)] bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.15 }}
    className="w-full relative aspect-video md:aspect-auto md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
  >
    {/* Hero Image */}
    <img
      src="/images/samuel-hero.jpg"
      alt="Samuel's Transformation"
      className="absolute inset-0 w-full h-full object-cover"
    />
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
    
    {/* Play Button */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={() => setSelectedVideo(SAMUEL_VIDEO_URL)}
      className="relative z-20 flex items-center justify-center"
    >
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl hover:shadow-xl cursor-pointer">
        <svg className="w-10 h-10 text-[#0F0F0F] ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </motion.button>
  </motion.div>
</section>

{/* Video Modal */}
<AnimatePresence>
  {selectedVideo && (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl"
      >
        <button
          onClick={() => setSelectedVideo(null)}
          className="absolute -top-12 right-0 text-white hover:text-white/70"
        >
          <X size={32} />
        </button>
        
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`${selectedVideo}?autoplay=0`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          ></iframe>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
```

---

## SECTION 4: WHAT THIS MEANS (Reflection)

**Height:** Auto  
**Background:** `bg-rc-warm-gray`  
**Max-width:** 2xl  

### Visual Layout
```
Centered, single column

Heading: "Deliverance is Real"

Body text (multiple paragraphs)

Subheading: "What This Means for You"

Body text (multiple paragraphs)
```

### Typography
```
Main Heading:
- Font: font-rc-serif
- Size: text-3xl md:text-4xl
- Weight: font-bold
- Color: text-rc-text
- Spacing: mb-8

Body:
- Font: font-rc-sans
- Size: text-base md:text-lg
- Weight: font-light
- Color: text-rc-text/80
- Line-height: leading-relaxed
- Spacing: space-y-6 (paragraphs)

Subheading:
- Font: font-rc-serif
- Size: text-2xl md:text-3xl
- Weight: font-bold
- Color: text-rc-text
- Spacing: pt-12 (from previous), mb-6
```

### Copy
```
SECTION 1: THE PROOF

"Samuel was trapped in fraud.
Every tactic. Every deception. Every fear.

One encounter with Jesus Christ.
Everything changed.

His life is now honest.
His purpose is now clear.

This is not a story about one man.
This is proof that Jesus delivers."

SECTION 2: PERSONAL CALL

"What This Means for You

If Jesus could deliver Samuel, He can deliver you.
The same Jesus who met Samuel at The SCOAN
is ready to meet you where you are.

All you have to do is ask."
```

### Scroll Animation
```
Same as Section 2:
- Fade in on scroll
- whileInView
- once: true
```

---

## SECTION 5: THE JOURNEY TEASER

**Height:** Auto  
**Background:** `bg-rc-bg`  
**Max-width:** 2xl  

### Visual Layout
```
Heading: "What Comes After Deliverance"

Three subsections (stacked, no columns):

1. "You encounter Jesus"
2. "You decide: Do I want restoration?"
3. "You walk the 7-stage journey (7 weeks)"

Then final paragraph
```

### Typography
```
Heading:
- Font: font-rc-serif
- Size: text-3xl md:text-4xl
- Weight: font-bold
- Color: text-rc-text
- Spacing: mb-8

Points (bold labels):
- Font: font-rc-serif
- Size: text-lg
- Weight: font-bold
- Color: text-rc-text
- Spacing: space-y-4

Body text:
- Font: font-rc-sans
- Size: text-base md:text-lg
- Weight: font-light
- Color: text-rc-text/80
```

### Copy
```
"What Comes After Deliverance

1. You encounter Jesus
   (Not a program. An encounter.)

2. You decide: Do I want restoration?
   (No pressure. No commitment upfront.)

3. You walk the 7-stage journey (7 weeks)
   (Truth → Confession → Repentance → Forgiveness 
    → Reconciliation → Honest Work → Serving)

The journey is real.
The community is real.
The transformation is real.

No program.
No commitment upfront.
Just Jesus. Just you. Just prayer."
```

---

## SECTION 6: CLEAR CTAs

**Height:** Auto  
**Background:** `gradient-to-br from-rc-accent to-rc-text`  
**Max-width:** 2xl  

### Visual Layout
```
[Desktop]
Three buttons horizontally spaced

[Mobile]
Three buttons stacked vertically (full width)
```

### Button Specifications

**PRIMARY: "Request Deliverance"**
```
Styling:
- Background: bg-white
- Text: text-rc-text
- Width: full (mobile), auto (desktop)
- Padding: px-8 py-3
- Border-radius: rounded-lg
- Font: font-medium
- Min-height: min-h-[48px] (accessibility)

Hover:
- Background: bg-white/95
- Transform: -translate-y-0.5
- Shadow: shadow-lg
- Duration: 300ms

Active:
- Transform: translate-y-0
- Duration: 300ms

Interaction:
- onClick: Opens deliverance request modal (same as landing page)
- Modal has 3 steps: need, duration, contact info
```

**SECONDARY: "Attend the Gathering"**
```
Styling:
- Background: transparent
- Border: border border-white/60
- Text: text-white
- Padding: px-8 py-3
- Font: font-medium
- Min-height: min-h-[48px]

Hover:
- Border: border-white
- Background: bg-white/10
- Transform: -translate-y-0.5
- Shadow: shadow-lg

Active:
- Transform: translate-y-0

Interaction:
- onClick: Navigate to /gathering page
- New page loads (full page transition)
```

**TERTIARY: "Learn The Journey"**
```
Styling:
- Background: transparent
- Text: text-white
- Font: font-medium
- Padding: px-0 py-3
- Border-bottom: border-b border-white (on hover)

Hover:
- Border-bottom: border-white (appears)
- Opacity: text-white/80 → text-white

Active:
- Same

Interaction:
- onClick: Navigate to /the-journey page
```

### Responsive Layout
```
Mobile (sm):
- Stack vertically
- Full width (px-6)
- space-y-3 between buttons

Desktop (md):
- Flex row, gap-4
- Auto width (shrink-fit)
- Primary: flex-1 (takes available space)
```

### Code Pattern
```tsx
<section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
  <motion.div className="max-w-2xl mx-auto space-y-12">
    
    {/* Heading & Copy */}
    <div className="space-y-6 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white">
        Ready to be free?
      </h2>
      <p className="text-base md:text-lg text-white/80">
        The same Jesus who delivered Samuel is ready to deliver you.
      </p>
    </div>
    
    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 pt-8">
      <button
        onClick={() => setIsDeliveringModalOpen(true)}
        className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-text font-medium rounded-lg hover:bg-white/95 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
      >
        Request Deliverance
      </button>
      
      <a
        href="/gathering"
        className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] text-white font-medium border border-white/60 rounded-lg hover:border-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
      >
        Attend the Gathering
      </a>
      
      <a
        href="/the-journey"
        className="inline-flex items-center justify-center px-0 py-3 text-white font-medium hover:border-b hover:border-white transition-all duration-300"
      >
        Learn The Journey
      </a>
    </div>
  </motion.div>
</section>
```

---

## SECTION 7: FOOTER

**Same as landing page** (to be redesigned together)

---

## MOBILE BEHAVIOR (Full Specifications)

### Breakpoints
```
sm: 640px  → Show full text, stack buttons
md: 768px  → Larger images, adjust text sizing
lg: 1024px → Desktop layout (but not used on this page)
```

### Section 2 (Story + Gallery)
```
Mobile (< md):
- Single column (text full width)
- Gallery below text
- Grid: cols-2 (side-by-side on mobile)
- Images: smaller (2-4 items visible)

Desktop (md+):
- Two columns (60/40 split)
- Gallery on right
- Side-by-side scroll behavior
```

### Section 3 (Video)
```
Mobile:
- Aspect ratio: 16:9 (responsive)
- Play button: w-20 h-20 (smaller, but still tapable)
- Full width (100vw)

Desktop:
- Aspect ratio: changes to min-h-[90vh]
- Full height viewport
- Play button: w-24 h-24 (larger)
```

### Section 6 (CTAs)
```
Mobile:
- Full width (100%)
- Stacked vertically
- space-y-3 between
- Touch-friendly hit area (min-h-[48px])

Desktop:
- Row layout, auto width
- Primary: flex-1 (takes space)
- gap-4 between buttons
```

---

## PERFORMANCE SPECIFICATIONS

### Image Optimization
```
Hero image:
- Format: WebP with JPG fallback
- Size: 1920x1080 (high quality)
- Compressed: < 200KB
- Lazy load: NO (above fold)

Proof gallery images:
- Size: 400x400 (square)
- Compressed: < 50KB each
- Lazy load: YES (below fold)
- Format: WebP with JPG fallback
```

### Video Optimization
```
Hero placeholder image:
- Load immediately (above fold)
- High contrast (dark gradient overlay ensures readability)
- Play button is interactive element (no actual video until click)

Modal video:
- YouTube embed (outsourced to CDN)
- No autoplay (respects bandwidth)
- Fullscreen capable (good UX)
```

### Scroll Performance
```
Animations:
- Use transform, opacity only (GPU-accelerated)
- Never animate width/height/position
- Easing curve is consistent (0.8s)
- Motion component handles all animations (library optimized)

Images:
- Lazy load gallery images
- Use next/image for optimization
- Placeholder blur while loading
```

---

## ACCESSIBILITY SPECIFICATIONS

### Focus States
```
All interactive elements (buttons, links):
- Visible focus ring (focus:ring-2 focus:ring-white)
- Min touch target: 48px × 48px
- Keyboard navigation: all buttons/links in order
```

### ARIA Labels
```
Play button:
- aria-label="Watch Samuel's 41-minute confession"

Close button (modal):
- aria-label="Close video player"

Navigation links:
- aria-label="Navigate to Gathering page"
```

### Color Contrast
```
Text on white: text-rc-text (#1A1A18) ✓ (WCAG AAA)
Text on dark: text-white ✓ (WCAG AAA)
Text on gradients: white/80 minimum ✓ (WCAG AA)
```

### Video Accessibility
```
YouTube embed:
- Has captions (YouTube provides)
- Audio description: NOT available in 41-min video
  (Recommendation: Add caption file if possible)
- Transcript: Link to transcript if available
```

---

## FINAL CHECKLIST

✅ Hero section: Cinematic, scroll-triggered  
✅ Story section: 2-column, proof gallery, scroll-triggered  
✅ Video section: Full-screen play button, modal player  
✅ Reflection section: Emotional arc, scroll-triggered  
✅ Journey teaser: Hopeful, not overwhelming  
✅ CTAs: 3 clear options, accessible  
✅ Footer: Consistent with design system  
✅ Mobile: Fully responsive, touch-friendly  
✅ Performance: Optimized images, lazy loading  
✅ Accessibility: WCAG AA compliant, semantic HTML  

---

## NEXT STEP

Build component checklist to see what exists vs what needs creation.


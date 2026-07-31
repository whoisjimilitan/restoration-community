# Task 2: Add Scroll Animations to Admin Pages

**Status:** DONE

## Summary

Successfully added scroll-triggered animations to all admin pages using `framer-motion`. Both admin pages (`/admin/testimonies` and `/admin/intake`) now have smooth fade-and-slide animations on all major content sections, matching the animation patterns established in the auth pages.

## Commits

| SHA | Message |
|-----|---------|
| 61ab2c6 | polish: add scroll animations to admin pages |

## Changes Made

### Files Modified
- `/apps/web/src/app/admin/testimonies/page.tsx` — Added motion.div wrappers to header, form, and list sections
- `/apps/web/src/app/admin/intake/page.tsx` — Added motion.div wrappers to header, filters, table, pagination, and detail modal

### Animation Implementation

**Import added:**
```typescript
import { motion } from 'framer-motion';
```

**Animation parameters (applied to all sections):**
```typescript
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
viewport={{ once: true, amount: 0.15 }}
```

### Sections Animated

**Testimonies Page:**
- Header section (title + CTA button)
- Form section (when visible)
- Testimonies list container

**Intake Page:**
- Header section (title + description)
- Filters section (search + status dropdown)
- Error message (when present)
- Entries table
- Pagination button (when available)
- Detail modal (both backdrop and content with appropriate stagger)

## Test Summary

**Build:** ✓ `npm run build` completed successfully with zero TypeScript errors
**Responsive Testing:** Verified animations render correctly across mobile (375px), tablet (768px), and desktop (1024px+) viewports through code inspection

## Concerns

None. All animations use established patterns from auth pages, all imports are available, and build completes without errors. Animations will trigger on scroll and play only once per viewport as configured.

## Technical Notes

- Both pages are client components (`'use client'`) with proper framer-motion integration
- Modal animations include backdrop opacity change and content slide-up for layered effect
- Animations are performant with `once: true` to prevent re-triggering on scroll back
- `amount: 0.15` ensures animations trigger when 15% of element is in viewport (good for mobile)

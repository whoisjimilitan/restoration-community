---
name: warm-outreach-pipeline
description: Warm outreach pipeline system with phone detection and smart call routing for operator dashboard
metadata: 
  node_type: memory
  type: project
  originSessionId: db5b13fc-9039-4da6-a297-1adbb4813b9f
---

# Warm Outreach Pipeline - Implementation Complete

**Status:** Implemented and committed (commit 0ce2a26)

**What it does:** Enables operators to find prospects via postcode or keyword search, display phone numbers with type detection (mobile vs landline), and route calls intelligently via WhatsApp for mobile (07xxx) or VoIP for landline (01/02/03xxx).

**Why:** The Discover page needed phone-first functionality to enable warm outreach without requiring manual phone lookups. Operators can now see phone numbers immediately in search results, with smart routing based on phone type.

## Implementation Details

### 1. Phone Utilities Library (`lib/phone-utils.ts`)
- **extractCoreNumber()** - Validates and extracts 10-digit UK phone core
- **detectPhoneType()** - Returns "mobile", "landline", or "unknown"
- **getPhonePlusFormat()** - Formats as +44... for WhatsApp
- **getPhone00Format()** - Formats as 0044... for VoIP
- **getPhoneLocalFormat()** - Formats as 0... for UI display

**Phone Type Detection Rules:**
- Mobile: 07xxx (11 digits with 0, or +447xxx)
- Landline: 01/02/03xxx (10-11 digits)

### 2. Phone Lookup API (`app/api/b2b/lookup-phones/route.ts`)
- Uses Google Custom Search API for dork search
- Extracts phone numbers from search results
- Categorizes into mobile and landline arrays
- Returns: `{ mobile: [...], landline: [...], all: [...] }`

**Environment Variables Required:**
- `GOOGLE_CUSTOM_SEARCH_API_KEY`
- `GOOGLE_CUSTOM_SEARCH_ENGINE_ID`

### 3. Discover Page Updates (`app/operator/discover/page.tsx`)
Enhanced with:
- Phone display in results with local format (0...)
- Mobile/Landline badges (green for mobile, blue for landline)
- WhatsApp button for mobile numbers (#25D366 green)
- VoIP Call button for landline numbers (#1976D2 blue)
- "Find Phone" button for automated lookup when phone unavailable
- Phone lookup loading state handling

## How It Works

**Search Results Flow:**
1. Operator searches by postcode or keyword in Discover page
2. Results display with business info + phone (if available from Google Places)
3. Each prospect card shows:
   - Business name + category + city + tier
   - Email (if available)
   - Phone number with type badge (green Mobile / blue Landline)
   - Smart button: WhatsApp for mobile, VoIP Call for landline
4. If no phone in results, "Find Phone" button triggers dork search
5. Once phone found, button updates to show number + type badge + call button

**Phone Lookup Flow:**
1. Operator clicks "Find Phone" button
2. Button shows "Finding phone..." (loading state)
3. `/api/b2b/lookup-phones` searches for business via Google Custom Search
4. Extracts all phone numbers from results
5. Categorizes by type (mobile/landline)
6. Updates prospect with found phones, displays primary number with badge
7. Call buttons appear immediately

**Call Routing:**
- Mobile (07xxx): Opens WhatsApp via `wachatmanager://` with +44 format
- Landline (01/02/03xxx): Opens MobileVOIP via `mobilevoip://` with 0044 format

## Testing Checklist

### Prerequisites
- [ ] API keys configured in .env.local:
  - `GOOGLE_CUSTOM_SEARCH_API_KEY` (for phone lookup)
  - `GOOGLE_MAPS_API_KEY` (for search results)

### Manual Testing
- [ ] Visit `/operator/discover`
- [ ] Perform postcode search (e.g., "M4 4AG") - verify results appear
- [ ] Check if phone numbers display in search results
- [ ] Verify mobile/landline badges show correct colors and text
- [ ] Click WhatsApp button on mobile number - verify URL opens wachatmanager://
- [ ] Click VoIP Call button on landline - verify URL opens mobilevoip://
- [ ] Click "Find Phone" on business without phone - verify API lookups and displays result
- [ ] Test both mobile (07) and landline (01/02/03) number detection

### Edge Cases
- [ ] Business with no phone in search results but available via dork search
- [ ] Phone with spaces/dashes - verify parsing and formatting
- [ ] +44, 0044, 0 format variations - verify all detected correctly
- [ ] Invalid phone numbers - verify gracefully handled

## Future Enhancements

1. **Phone Enrichment Caching** - Store found phones to avoid re-lookups
2. **Bulk Phone Lookup** - Process multiple businesses in queue
3. **Call History Tracking** - Log which numbers were called when
4. **Phone Type Inference** - Better detection from context clues
5. **Multi-Number Display** - Show all found mobile and landline numbers

## Related Systems

- [[Opportunity Intelligence System]] - Discovers business confessions
- [[Operator Problem-Centric System]] - Converts to lead conversations
- Google Places Discovery - Returns initial phone numbers in search
- Google Custom Search - Dork search for phone extraction
- WhatsApp Chat Manager - Mobile routing
- MobileVOIP - Landline routing

---
executable: PRAYER-001
title: Runtime Verification Checklist
status: ready-for-database-sync
date: 2026-07-25
---

# PRAYER-001 Runtime Verification

**When:** After database sync (`npx prisma db push` on NeonDB)
**Where:** Local development environment (npm run dev)
**Duration:** ~15 minutes

---

## Pre-Test Setup

```bash
cd /tmp/restoration-community/apps/web

# Ensure database is synced
export DATABASE_URL="postgresql://..."  # NeonDB connection
npx prisma db push

# Start dev server
npm run dev

# Open http://localhost:3000 in two browser tabs/windows
```

---

## Test Sequence

### Test 1: Participant 1 — Submit Prayer Request

**Steps:**
1. In Tab 1: Sign in with participant-1@example.com (create during onboarding if needed)
2. Navigate to `/prayer`
3. Enter prayer request text: "Please pray for wisdom in my family relationships"
4. Click "Submit Prayer Request"
5. Verify: Success message appears
6. Verify: Browser console shows `[PRAYER] Prayer request created: <id>`
7. Click "View Your Requests"
8. Verify: Redirected to `/prayer/status`
9. Verify: Prayer request appears with status "Submitted"

**Expected result:** ✅ Request stored, participant sees confirmation

---

### Test 2: Participant 1 — View Status

**Steps:**
1. In Tab 1: Remain on `/prayer/status`
2. Submit another prayer request via `/prayer`
3. Return to `/prayer/status`
4. Verify: Both requests appear (newest first)
5. Verify: Statuses are "Submitted"
6. Verify: Dates are formatted correctly

**Expected result:** ✅ Participant sees their own requests only

---

### Test 3: Participant 2 — Cannot See Participant 1's Requests

**Steps:**
1. In Tab 2: Sign out if needed
2. Sign in as participant-2@example.com (different account)
3. Navigate to `/prayer/status`
4. Verify: No requests visible (empty state)
5. Open browser DevTools → Network tab
6. Click "Submit Your First Prayer Request" → Navigate to `/prayer`
7. Submit prayer request from Participant 2: "Prayers for financial stability"
8. Return to `/prayer/status`
9. Verify: Only Participant 2's request appears
10. Verify: Participant 1's requests are NOT visible

**Expected result:** ✅ Data isolation working — Participant 2 cannot see Participant 1's requests

---

### Test 4: Direct API Access — Privacy Enforcement

**Steps:**
1. In Tab 2 (Participant 2 session): Open browser Console
2. Fetch own prayer status:
```javascript
fetch('/api/prayer/status').then(r => r.json()).then(d => console.log(d))
```
3. Verify: Response contains only Participant 2's requests
4. Switch to Tab 1 (Participant 1 session)
5. Verify: Participant 1's fetch shows only their requests
6. (Cannot easily test cross-user in browser, but API layer prevents it)

**Expected result:** ✅ API returns only authenticated user's data

---

### Test 5: Form Validation

**Steps:**
1. In Tab 1: Navigate to `/prayer`
2. Try to submit empty prayer request
3. Verify: Error message "Please share your prayer request"
4. Try to submit whitespace only ("   ")
5. Verify: Error message appears (validation works)
6. Enter valid text and submit
7. Verify: Success

**Expected result:** ✅ Input validation working

---

### Test 6: Authentication Boundary

**Steps:**
1. Open new incognito/private window
2. Try to access `/prayer` directly
3. Verify: Redirected to `/auth/signin`
4. Try to access `/prayer/status` directly
5. Verify: Redirected to `/auth/signin`
6. Try to access `/api/prayer/status` directly
7. Verify: Returns 401 Unauthorized

**Expected result:** ✅ Unauthenticated users cannot access prayer endpoints

---

### Test 7: Database Verification

**Steps (in PostgreSQL client):**
```sql
-- Verify tables exist
\d prayer_requests
\d prayer_warriors
\d prayer_assignments
\d prayer_responses

-- Verify data was stored
SELECT * FROM prayer_requests;  -- Should show submitted requests
SELECT * FROM prayer_warriors;  -- Should be empty (no warriors assigned yet)
SELECT * FROM prayer_assignments;  -- Should be empty (deferred)
SELECT * FROM prayer_responses;  -- Should be empty (deferred)
```

**Expected result:**
- ✅ All 4 tables exist
- ✅ PrayerRequest table contains submitted requests
- ✅ PrayerWarrior table is empty (correct — deferred to future)
- ✅ PrayerAssignment table is empty (correct)
- ✅ PrayerResponse table is empty (correct)

---

### Test 8: Browser Console Logging

**Steps:**
1. In Tab 1: Open DevTools Console
2. Submit prayer request
3. Verify logs appear:
```
[PRAYER] POST /api/prayer/request
[PRAYER] Prayer request created: <request-id> (participant: <user-id>)
```
4. Navigate to `/prayer/status`
5. Verify logs appear:
```
[PRAYER] GET /api/prayer/status
[PRAYER] Prayer status loaded for user <user-id>: 1 requests
```

**Expected result:** ✅ Logging shows request flow

---

## Acceptance Criteria

✅ All 8 tests pass  
✅ No cross-user data leakage  
✅ Privacy enforced at API layer  
✅ Authentication required for all endpoints  
✅ Input validation working  
✅ Database tables created correctly  
✅ PrayerWarrior remains empty (correct)  
✅ Logging shows request flow  

---

## Issues Found / Resolution

If any test fails:

| Issue | Resolution |
|-------|-----------|
| API returns 500 | Check database connection; run `npx prisma db push` again |
| Cross-user data visible | Check `WHERE participantId: user.id` in API route |
| Redirect not working | Verify NextAuth session is configured; check `NEXTAUTH_SECRET` in .env.local |
| Tables don't exist | Run migration: `npx prisma migrate deploy` |

---

## Sign-Off

**Verification Date:** ________  
**Verified By:** ________  
**Status:** ✅ PASS / ❌ FAIL  

**Notes:**
```
[Space for verification notes]
```

Once all 8 tests pass, PRAYER-001 is ready for production deployment.

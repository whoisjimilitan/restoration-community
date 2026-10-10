# MailerLite Setup Instructions

## Domain Setup
- Domain: `brotherjimi.com` (added to MailerLite)
- Status: Pending verification
- **Action needed:** Add DNS records to your domain registrar

### DNS Records (Get from MailerLite Dashboard → Settings → Domain)
- SPF record
- DKIM record (usually 2 records)
- CNAME record (if required)

---

## Email Sequences to Create

### 1. Journey Sequence (Automation)
**Trigger:** Tag added = `journey`

**Emails:**
- Day 1: First letter (6:00 AM)
- Day 2: Second letter (6:00 AM)
- ... (Days 3-90)
- Day 30: Partnership invitation (6:00 AM)
- Day 90: Graduation email → Remove tag `journey`, Add tag `today`

**Settings:**
- Send time: 6:00 AM (recipient's local time if available)
- Each subscriber gets their own Day 1-90 sequence starting from signup date

### 2. Day 30 Partnership Ask
**Trigger:** 30 days after subscribing + tag `journey`

**Email:** Partnership invitation (Pray / Share / Give)
**CTA:** Link to `/partner`

### 3. Day 90 Graduation
**Trigger:** 90 days after subscribing + tag `journey`

**Email:** "You're sent" + Impact summary
**Action:** Automation removes `journey` tag, adds `today` tag

### 4. Today Track Sequence
**Trigger:** Tag added = `today`

**Email:** Daily at 6:00 AM
**Content:** Today's counsel (from Notion, Track = "Today")
**Send:** Continues indefinitely until subscriber unsubscribes

---

## Email Sending Configuration

### From Address
- Domain: `brotherjimi.com`
- From name: "Brother Jimi"
- Reply-to: Monitored inbox (set up monitoring)

### Links in Emails
- "Send to one person" → WhatsApp link to `/today`
- "Start your own Day 1" → `/` with `?ref=<subscriber_id>`
- "Partner" link → `/partner`

---

## Tags (Already Created)
- `journey` (Days 1-90 subscribers)
- `today` (Day 90+ subscribers)
- `partner` (Active monthly partners)
- `received` (Subscribers from /start who prayed)
- `new` (Days 1-29)
- `engaged` (Opened most + replied/shared at Day 30)
- `fold` (Special inner circle)
- `quiet` (Few opens for 14 days)

---

## Notion Integration

**Database:** 3efb5217e90e8067b776f1d90ac77dd6

**Fields needed for emails:**
- Track: "Journey" or "Today"
- Day: 1-90 (for Journey)
- Subject: Email subject line
- Body: Full letter content
- Shareable line: Quotable for share buttons

---

## Setup Checklist

- [ ] Add DNS records to brotherjimi.com registrar
- [ ] Verify domain in MailerLite
- [ ] Create Journey automation (Days 1-90)
- [ ] Create Day 30 partnership ask
- [ ] Create Day 90 graduation automation
- [ ] Create Today track daily send
- [ ] Test: Sign up with test email → Receive Day 1
- [ ] Test: Day 30 email arrives at correct time
- [ ] Test: Day 90 automation tags subscriber as `today`
- [ ] Test: Today track starts sending daily
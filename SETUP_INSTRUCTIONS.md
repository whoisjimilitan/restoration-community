# Brother Jimi Website — Setup Instructions

## Quick Start

This guide covers the final setup steps to launch brotherjimi.com

### Step 1: Vercel Configuration (5 minutes)
See: [VERCEL_SETUP.md](VERCEL_SETUP.md)
- Switch production branch to `brotherjimi-live`
- Add environment variables (get values from MailerLite, Notion)
- Verify deployment

### Step 2: Configure Sending Domain (10 minutes)
See: [DNS_SETUP.md](DNS_SETUP.md)
- Add brotherjimi.com to Vercel
- Add brotherjimi.com to MailerLite
- Add DNS records to domain registrar
- Wait for verification

### Step 3: Set Up Email Automation (15 minutes)
See: [MAILERLITE_SETUP.md](MAILERLITE_SETUP.md)
- Create Journey sequence (Days 1-90)
- Set up Day 30 partnership ask
- Set up Day 90 graduation
- Configure Today track (daily emails)

### Step 4: End-to-End Testing (20 minutes)
See: [TESTING_GUIDE.md](TESTING_GUIDE.md)
- Test all API endpoints
- Test signup flow
- Test email delivery
- Verify Stripe (if configured)
- Verify design lock passes

### Step 5: Launch
Once all tests pass:
```bash
python3 after-launch/go-live.py
```

---

## Environment Variables

Add these to Vercel:

| Variable | Source | Required |
|----------|--------|----------|
| `MAILERLITE_API_KEY` | MailerLite → Profile → API | Yes |
| `NOTION_API_KEY` | Notion → Settings → Integrations | Yes |
| `NOTION_DATABASE_ID` | 3efb5217e90e8067b776f1d90ac77dd6 | Yes |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API Keys | No (add later) |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks | No (add later) |
| `SITE_URL` | https://brotherjimi.com | Yes |

---

## Timeline

- **Now:** Complete Steps 1-4
- **DNS verification:** 5-30 minutes (happens in parallel)
- **Email automation:** Set up while DNS propagates
- **Testing:** 20 minutes
- **Launch:** When all tests pass

**Total time:** ~1 hour (mostly waiting for DNS)

---

## Support Files

- `CLAUDE.md` — Rules for this project
- `HANDOFF.md` — Original design spec
- `LETTER-STYLE.md` — How daily letters are written
- `LAUNCH_CHECKLIST.md` — Full pre-launch checklist
- `.env.local.example` — Environment variable template

---

## Need Help?

Check the relevant setup guide for your step. Each has troubleshooting sections.
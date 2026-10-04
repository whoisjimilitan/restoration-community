---
name: brotherjimi-deployment-topology
description: "brotherjimi.com production deploys from the restoration-community GitHub repo via the Vercel project named brotherjiminew, not Netlify and not the 'brotherjimi' or 'restoration-community' Vercel projects"
metadata: 
  node_type: memory
  type: project
  originSessionId: 87807f87-b1d1-46d9-bd0c-1587b927bb37
---

Production `brotherjimi.com` is served by the Vercel project **`brotherjiminew`** (account/team `jimi2`), auto-deploying from the `main` branch of the [[project_brotherjimi_five_open_items|restoration-community]] GitHub repo on every push.

**Why this matters:** there are several similarly-named Vercel projects under `jimi2` that are decoys — `brotherjimi` (deploys to `brotherjimi-jimi2.vercel.app`, not the custom domain) and `restoration-community` (deploys to `restoration-community-jimi2.vercel.app`, also not the custom domain). Only `brotherjiminew` maps to the real `brotherjimi.com` domain. Also: deployment is Vercel, not Netlify — an earlier memory wrongly said Netlify and was corrected 2026-08-27.

**How to apply:** After pushing to `restoration-community` main, verify the live change by checking `npx vercel ls brotherjiminew` (not the other two projects) for a fresh Production deployment, then `curl https://brotherjimi.com/` to confirm content directly — don't assume the push alone means it's live.

---
name: feedback-localhost-before-vercel
description: "For restoration-community/brotherjimi.com work, iterate on localhost:4021 and only push to origin/main once changes are confirmed - not every small tweak"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 87807f87-b1d1-46d9-bd0c-1587b927bb37
---

Make copy/design tweaks on the local dev server (`localhost:4021` in [[project_brotherjimi_five_open_items|restoration-community]]) and verify visually before committing/pushing, rather than pushing straight to Vercel after each small edit.

**Why:** Vercel has a daily build-minute/deploy limit on the account behind [[brotherjimi_deployment_topology|brotherjiminew]]. Pushing every micro-edit (a wording tweak, a font-size change) burns that budget fast across a long iterative session.

**How to apply:** Start `npm run dev -- -p 4021` in `apps/web`, use the `browser` skill (agent-browser) to screenshot and click through real interactions, iterate there. Only `git push origin main` once the user has confirmed the round of changes is good — batch several related fixes into one push rather than one push per fix.

# Graph Report - brotherjimi  (2026-10-11)

## Corpus Check
- 58 files · ~68,230 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: .woff2 5, .example 1, (none) 1)

## Summary
- 117 nodes · 132 edges · 14 communities (11 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- API Routes
- Design System
- Data Models
- Configuration
- Integration Points
- Frontend Pages
- Type Definitions
- Utilities
- Styles
- Scripts
- Documentation
- Build Config

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 19 edges
2. `scripts` - 6 edges
3. `next` - 5 edges
4. `permissions` - 3 edges
5. `POST()` - 3 edges
6. `normalise()` - 3 edges
7. `digest()` - 3 edges
8. `addSubscriber()` - 3 edges
9. `tagSubscriber()` - 3 edges
10. `isFullPage()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `addSubscriber()`  [EXTRACTED]
  app/api/subscribe/route.ts → lib/mailerlite.ts
- `POST()` --calls--> `tagSubscriber()`  [EXTRACTED]
  app/api/webhooks/stripe/route.ts → lib/mailerlite.ts

## Import Cycles
- None detected.

## Communities (14 total, 3 thin omitted)

### Community 0 - "API Routes"
Cohesion: 0.09
Nodes (21): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+13 more)

### Community 1 - "Design System"
Cohesion: 0.14
Nodes (15): Switch this project from 'build mode' (locked) to 'after launch' (full access).…, digest(), main(), normalise(), Design lock for brotherjimi.com. Run: python3 verify.py -> checks every locked…, hashlib, json, pathlib (+7 more)

### Community 2 - "Data Models"
Cohesion: 0.19
Nodes (12): getStripe(), POST(), POST(), getStripe(), POST(), TODO: Map Stripe customer ID to email and update tags, TODO: Map Stripe customer ID to email and remove partner tag, addSubscriber() (+4 more)

### Community 3 - "Configuration"
Cohesion: 0.15
Nodes (11): description, name, version, @playwright/test, react, react-dom, @types/node, @types/nodemailer (+3 more)

### Community 4 - "Integration Points"
Cohesion: 0.48
Nodes (6): getAllReflections(), getReflectionByDay(), getRichTextValue(), isFullPage(), notion, @notionhq/client

### Community 5 - "Frontend Pages"
Cohesion: 0.29
Nodes (7): dependencies, next, nodemailer, @notionhq/client, react, react-dom, stripe

### Community 6 - "Type Definitions"
Cohesion: 0.33
Nodes (3): notion, transporter, nodemailer

### Community 7 - "Utilities"
Cohesion: 0.33
Nodes (6): devDependencies, @playwright/test, @types/node, @types/nodemailer, @types/react, typescript

### Community 8 - "Styles"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, prebuild, start

### Community 9 - "Scripts"
Cohesion: 0.40
Nodes (4): permissions, ask, deny, $schema

### Community 10 - "Documentation"
Cohesion: 0.50
Nodes (3): permissions, ask, $schema

## Knowledge Gaps
- **56 isolated node(s):** `$schema`, `ask`, `deny`, `$schema`, `ask` (+51 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 69 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Data Models` to `Configuration`, `Type Definitions`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `@notionhq/client` connect `Integration Points` to `Configuration`, `Type Definitions`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Pages` to `Configuration`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `$schema`, `ask`, `deny` to the rest of the system?**
  _56 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Design System` be split into smaller, more focused modules?**
  _Cohesion score 0.14210526315789473 - nodes in this community are weakly interconnected._
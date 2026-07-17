# Repository Guide

## Purpose

This repository is the canonical home of the Restoration Community project.

It contains:
- Governance documents that define the ministry and its principles
- Requirements that specify what the platform must do
- Architecture that explains how the platform is designed
- Implementation code that realizes the design
- Decision records that preserve the rationale for significant choices

This repository is not a software project that happens to have documentation.

It is a governed knowledge repository in which software is one part.

Future contributors should be able to read this repository and understand:
- Why the Restoration Community exists
- Who we are as a ministry
- How technology is governed
- What the platform must do
- How it is designed and implemented
- How decisions are made

---

## Repository Structure

### The Governance Hierarchy

Each folder in the governance/ directory answers a specific question:

| Folder | Question | Status |
|--------|----------|--------|
| `governance/stewardship/` | Why do we exist and how do we steward this ministry? | Canonical |
| `governance/ministry/` | Who are we as a ministry? | Canonical |
| `governance/engineering/` | How should technology be governed? | Canonical |
| `governance/requirements/` | What must the platform do? | Canonical |
| `governance/architecture/` | How is the platform designed to satisfy requirements? | Canonical |
| `governance/operations/` | How is the platform operated and maintained? | Canonical |

### Supporting Folders

| Folder | Purpose | Status | Steward Role |
|--------|---------|--------|--------------|
| `decisions/` | Architecture Decision Records (ADRs) | Historical Record | Architecture Stewards |
| `architecture/` | Working design artifacts: diagrams, C4 models, sequences | Working Design | Architecture Team |
| `docs/` | Working documentation: notes, research, guides, brainstorming | Supporting Documentation | Contributors |
| `templates/` | Reusable templates for governance and implementation documents | Reference | Repository Maintainers |
| `assets/` | Logos, branding, icons, images | Reference | Repository Maintainers |
| `implementation/` | Application source code organized by domain | Production | Engineering Team |
| `infrastructure/` | Infrastructure as Code, deployment, environments | Production-Critical | Platform Team |
| `scripts/` | Automation and developer tooling | Tooling | Engineering Team |
| `tests/` | Automated tests and test assets | Verification | Engineering Team |

---

## Document Status

Every document in this repository has a clear status:

| Status | Meaning | How to Treat It |
|--------|---------|-----------------|
| **Canonical** | Authoritative, approved, binding | This is law. Changes require intentional review. |
| **Historical Record** | Past decisions archived for context | Reference only. Amendments create new records. |
| **Working Design** | Exploration and sketches supporting governance | Fluid. Informs but does not bind. |
| **Supporting Documentation** | Notes, research, guides, brainstorming | Helpful but non-binding. Community knowledge. |
| **Production** | Running code and infrastructure | Governed by tests, code review, and operations policy. |
| **Verification** | Tests that validate behavior against requirements | If tests fail, code fails. |
| **Reference** | Patterns and templates | Use as a guide; override if justified. |

---

## Governance Hierarchy and Document Authority

### The Governance Hierarchy

The repository follows a clear authority hierarchy:

```
Scripture
    ↓
Four-Book Foundation
    ├── Book One: The Community Manual
    ├── Book Two: The Restoration Journey
    ├── Book Three: Discipleship Framework
    └── Book Four: Ministry Governance
    ↓
Engineering Constitution
    ↓
Requirements
    ↓
Architecture
    ↓
Implementation
    ↓
Tests
```

### The Four-Book Foundation

The Four-Book Foundation consists of four peer documents.

**They are not hierarchical.** No book supersedes another. Each addresses a distinct aspect of the ministry:

- **Book One** (The Community Manual) — Who we are and how we live together
- **Book Two** (The Restoration Journey) — The seven stages guiding participants toward restoration
- **Book Three** (Discipleship Framework) — How members grow and are discipled
- **Book Four** (Ministry Governance) — How decisions are made and the ministry is led

These books are interpreted together as a unified foundation. They inform and complement one another.

### Document Precedence

**When two documents appear to disagree:**

1. **Within the same authority level** (e.g., two books in the Four-Book Foundation, or two requirements documents):
   - First, determine whether they are addressing different concerns
   - If both are addressing the same concern, resolve the apparent conflict through an approved governance revision
   - Do not assume one document overrides another

2. **At different authority levels** (e.g., Engineering Constitution vs. Requirements):
   - The document higher in the hierarchy takes precedence
   - Unless an approved revision has explicitly changed it

3. **Examples:**
   - A PRD cannot silently contradict the Engineering Constitution (higher authority)
   - Book One cannot silently contradict Book Two (same authority level—resolve through revision)
   - Working documentation cannot override approved requirements (lower authority)
   - Code cannot redefine an approved architecture without an ADR (lower authority)

---

## Metadata Standard

Every document under `governance/` begins with metadata:

```yaml
---
title: Document Title
status: Approved | Draft | Archived
version: X.Y.Z or draft
owner: [Steward Role]
last-reviewed: YYYY-MM-DD
---
```

**Status:**
- `Approved` — Governance Stewards have approved this document
- `Draft` — Under development, not yet approved
- `Archived` — Historical record, no longer active

**Version:**
- `0.1.0` or `draft` — Evolving document
- `1.0.0` — Frozen version, changes create new versions

**Owner:** The steward role responsible for this document (e.g., Governance Stewards, Engineering Team)

**Last-reviewed:** When this document was last reviewed and approved

---

## Contribution Workflow

### For Governance Documents

1. Create a branch: `git checkout -b add-governance-document`
2. Write the document in the appropriate folder under `governance/`
3. Include metadata at the top
4. Commit: `git commit -m "Add governance: [document title]"`
5. Push and request review from the appropriate Steward Role
6. Merge only after approval

### For Working Documentation

1. Create a branch
2. Add your document to `docs/`
3. Commit: `git commit -m "Add documentation: [topic]"`
4. Push for feedback (less formal review required)

### For Code and Tests

1. Create a branch: `git checkout -b feature/description`
2. Write code and tests
3. Ensure tests pass
4. Commit: `git commit -m "Implement: [feature]"`
5. Push for code review

### For Architecture Decisions

1. Create a new ADR in `decisions/` following the format: `ADR-NNNN-brief-title.md`
2. Document the decision, context, and consequences
3. Commit: `git commit -m "Record decision: [ADR title]"`
4. ADRs are archived records; amendments become new ADRs

---

## Commit Message Standards

Commits should tell the story of the project. Write meaningful messages:

✅ Good:
- `Add Book One to governance/ministry/`
- `Implement authentication module`
- `Record decision: API versioning strategy`
- `Fix: correct requirements typo`

❌ Poor:
- `update`
- `fix`
- `changes`
- `wip`

---

## Repository Principles

### Canonical Home
Every file has one authoritative location. Information appears once; other documents reference it. No duplication.

### Repository-First
Every approved document lives in this repository before it lives anywhere else.

### Small, Reviewable Commits
Each commit represents one coherent change. Easy to review, easy to understand history.

### Deliberate Evolution
If we discover a better structure, we change it through a documented decision, not ad hoc reorganization.

---

## Steward Roles

| Role | Responsibility |
|------|-----------------|
| **Governance Stewards** | Maintain Four-Book Foundation, stewardship documents, approval of governance changes |
| **Architecture Stewards** | Maintain architecture decisions, review ADRs, approve architectural changes |
| **Architecture Team** | Create and maintain working architecture artifacts (diagrams, models) |
| **Repository Maintainers** | Maintain repository structure, templates, and conventions |
| **Engineering Team** | Write and maintain implementation code and tests |
| **Platform Team** | Maintain infrastructure, deployment, and operational code |
| **Contributors** | Add working documentation, participate in discussions, propose improvements |

---

## Questions?

- **Where does X belong?** → See the folder table above
- **How formal does my change need to be?** → See the status table
- **Can I edit this document?** → If it's in `governance/`, ask Governance Stewards. If it's in `docs/`, yes.
- **What's the difference between a working document and a governance document?** → Governance documents are approved and binding. Working documents are exploration and support.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

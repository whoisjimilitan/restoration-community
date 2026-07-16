# Contributing to Restoration Community

Thank you for contributing to the Restoration Community project.

## Before You Contribute

Read REPOSITORY_GUIDE.md to understand:
- The governance hierarchy
- Which folders are authoritative vs. working documents
- The status and ownership of each section
- How changes flow through the review process

## Contribution Workflow

### For Governance Documents

Governance documents (governance/) require approval before merge.

1. Create a branch: git checkout -b add-your-document
2. Write your document in the appropriate folder
3. Include metadata at the top:

---
title: Your Document Title
status: Draft
version: 0.1.0
owner: [Your Steward Role]
last-reviewed: [YYYY-MM-DD]
---

4. Commit with a clear message: git commit -m "Add governance document: [title]"
5. Push and request review from the appropriate Steward Role

### For Working Documentation

Working documents (docs/) can be added more freely.

1. Create a branch
2. Add your document
3. Commit: git commit -m "Add documentation: [topic]"
4. Push for feedback

### For Code and Tests

1. Create a branch: git checkout -b feature/your-feature
2. Write code and tests
3. Ensure tests pass: npm test
4. Commit: git commit -m "Implement: [feature description]"
5. Push for code review

## Commit Message Standards

Write commits that tell the story:

- YES: Add Book One to governance
- YES: Implement authentication module
- YES: Fix: correct typo in requirements
- NO: update
- NO: fix
- NO: changes

## Document Precedence

When documents appear to conflict:

Higher precedence overrides lower unless an approved revision changes it.

1. Scripture (if referenced)
2. Four-Book Foundation
3. Engineering Constitution
4. Requirements
5. Architecture
6. Implementation
7. Working Documentation

## Questions?

See REPOSITORY_GUIDE.md or contact a Governance Steward.

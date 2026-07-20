```
# PRD 00 – Product Constitution

**Version:** 1.0 (Draft)

## Purpose

This Product Constitution establishes the purpose, scope, and governing principles of the Restoration Community platform.

It serves as the bridge between the Four-Book Foundation and the engineering, design, and operational work required to implement the platform.

This document does not replace or extend the Four-Book Foundation.

It faithfully translates the Foundation into product and engineering language.

Where any conflict appears to exist, the Four-Book Foundation takes precedence.

---

# Authority

The platform exists under the authority of Holy Scripture as understood and applied through the Four-Book Foundation of the Restoration Community.

Every product decision, design decision, engineering decision, and operational decision should remain faithful to that Foundation.

Technology serves the mission.

It never defines the mission.

---

# Product Purpose

The Restoration Community platform exists to support the ministry's mission by providing a digital environment that enables people to participate in the Restoration Community, engage in the Restoration Journey, build authentic relationships, pursue honest work and living, and grow as disciples of Jesus Christ.

The platform is a ministry tool.

It is not the ministry itself.

---

# Mission Alignment

Every feature, workflow, and service within the platform should contribute to one or more of the following purposes:

* helping people begin or continue their Restoration Journey;
* strengthening Christ-centred community;
* supporting mentoring and discipleship;
* encouraging honest work and living;
* equipping leaders and mentors;
* enabling wise stewardship of the ministry.

Features that do not clearly support the mission should not be included.

---

# Product Principles

The platform shall be:

## Christ-centred

The platform exists to support people in following Jesus Christ.

It does not seek to replace the work of God through His Spirit, His Word, or His people.

---

## Restoration-focused

Every major capability should contribute meaningfully to the ministry's understanding of restoration.

Technology should remove unnecessary barriers rather than become the centre of attention.

---

## Community-oriented

The platform should strengthen genuine relationships rather than encourage isolation or unhealthy dependence on technology.

Whenever possible, technology should facilitate meaningful interaction between people.

---

## Grace-filled

The platform should communicate truth with compassion, encouraging growth while respecting the dignity of every participant.

---

## Simple

Complexity should be introduced only when it clearly serves the mission.

The simplest faithful solution should normally be preferred.

---

## Accessible

The platform should be usable by people with different abilities, devices, levels of digital literacy, and internet connectivity wherever reasonably practical.

---

## Secure

The ministry has a responsibility to protect personal information entrusted to it.

Security and privacy should therefore be considered fundamental design requirements.

---

## Sustainable

The platform should be designed so that future stewards can understand, maintain, and extend it responsibly.

---

# Product Scope

The platform supports the ministry by providing capabilities for:

* participant onboarding;
* restoration journey guidance;
* mentoring relationships;
* community participation;
* learning resources;
* communication;
* ministry administration;
* reporting appropriate to ministry stewardship.

The platform intentionally avoids functionality that distracts from or conflicts with the mission.

---

# Out of Scope

The platform does not exist to maximise user engagement for its own sake.

It does not seek to become a social media platform.

It does not replace local Christian fellowship, pastoral care, or the ministry of the local church.

It should always encourage healthy engagement with real people and real communities.

---

# Success Measures

The success of the platform is measured primarily by its faithfulness to the mission established in the Four-Book Foundation.

Secondary measures include:

* usability;
* accessibility;
* reliability;
* security;
* maintainability;
* adoption by the Restoration Community.

Technical success without faithfulness is not considered success.

---

# Traceability

Every subsequent PRD, design specification, architectural document, implementation plan, and engineering task shall identify the relevant source within the Four-Book Foundation from which it derives.

This ensures that implementation remains accountable to the constitutional documents of the Restoration Community.

---

# Closing Statement

The Restoration Community platform exists to faithfully support God's work of restoration by strengthening community, encouraging discipleship, and guiding people toward honest work and living in Christ Jesus.

Every design decision, engineering decision, and operational decision should reflect this purpose.

By God's grace.

In Christ Jesus.

One faithful step at a time.


# PRD 01 – Product Principles

**Version:** 1.0 (Draft)

## Purpose

This document establishes the enduring principles that govern the design, development, implementation, operation, and ongoing stewardship of the Restoration Community platform.

These principles derive from the Four-Book Foundation and the Product Constitution (PRD 00). They are intended to guide decisions consistently across product management, user experience, engineering, quality assurance, operations, and future AI-assisted development.

Where a decision is not explicitly covered elsewhere, these principles should guide the preferred course of action.

---

# Principle 1 – Christ Remains the Centre

### Rationale

The platform exists because of the ministry's mission, and the ministry exists because of the Gospel of Jesus Christ.

Technology must always remain a servant of that mission.

### Implementation Guidance

* Product decisions should strengthen the ministry's Christ-centred purpose.
* Features should encourage participation in authentic Christian community.
* Technology should never attempt to replace discipleship, mentoring, pastoral care, or the work of the Holy Spirit.

---

# Principle 2 – Faithfulness Before Features

### Rationale

Not every technically possible feature serves the ministry.

The platform should implement the Foundation faithfully rather than imitate trends or maximise engagement.

### Implementation Guidance

* Every significant feature must trace back to the Four-Book Foundation.
* New ideas should be evaluated against the ministry's purpose before implementation.
* Features without a clear ministry purpose should normally be declined.

---

# Principle 3 – Simplicity Before Complexity

### Rationale

Simple systems are easier to understand, maintain, test, secure, and steward.

Complexity should only be introduced where it clearly serves the mission.

### Implementation Guidance

* Prefer clear, maintainable designs.
* Reduce unnecessary configuration.
* Avoid duplicate functionality.
* Optimise for long-term stewardship rather than short-term novelty.

---

# Principle 4 – Community Over Consumption

### Rationale

The Restoration Community exists to foster genuine relationships.

The platform should encourage participation rather than passive consumption.

### Implementation Guidance

* Design workflows that encourage meaningful interaction.
* Promote mentoring, discipleship, and community engagement.
* Avoid features that encourage unhealthy comparison, addiction, or vanity.

---

# Principle 5 – Grace and Truth

### Rationale

The platform should reflect both compassion and biblical truth.

### Implementation Guidance

* Use respectful, encouraging language.
* Design moderation and communication tools that promote dignity and accountability.
* Ensure guidance remains consistent with the Foundation.

---

# Principle 6 – Accessibility by Design

### Rationale

Every person should have a reasonable opportunity to participate regardless of ability, device, or technical experience.

### Implementation Guidance

* Follow recognised accessibility standards.
* Support keyboard navigation, screen readers, and appropriate colour contrast.
* Design for responsive layouts and varying internet connectivity.
* Use clear language throughout the platform.

---

# Principle 7 – Privacy and Trust

### Rationale

Participants entrust the ministry with personal information.

Trust is earned through responsible stewardship.

### Implementation Guidance

* Collect only information necessary to support the ministry.
* Apply the principle of least privilege to access control.
* Protect personal information through appropriate security measures.
* Be transparent about how information is used.

---

# Principle 8 – Security is Foundational

### Rationale

Security protects both people and the ministry.

It should be considered from the beginning rather than added later.

### Implementation Guidance

* Secure authentication and authorisation.
* Protect data in transit and at rest where appropriate.
* Validate inputs and handle errors safely.
* Review dependencies and address security vulnerabilities promptly.

---

# Principle 9 – Traceability

### Rationale

Every implementation decision should be explainable.

Future stewards should understand why a feature exists.

### Implementation Guidance

Every significant requirement should include:

* Requirement ID
* Source within the Four-Book Foundation
* Business purpose
* Acceptance criteria
* Dependencies

Technical designs should reference the requirements they implement.

---

# Principle 10 – Stewardship

### Rationale

The platform is intended to serve the ministry for many years.

Good stewardship values maintainability as highly as functionality.

### Implementation Guidance

* Write clear, well-documented code.
* Prefer readability over cleverness.
* Document architectural decisions.
* Keep technical debt visible and manageable.
* Maintain comprehensive automated testing where practical.

---

# Principle 11 – Quality Before Release

### Rationale

Releasing quickly should never come at the expense of reliability or trust.

### Implementation Guidance

A feature is complete only when it has been:

* implemented;
* reviewed;
* tested;
* documented;
* verified against its acceptance criteria;
* confirmed to align with the Foundation.

---

# Principle 12 – Continuous Stewardship

### Rationale

The platform will evolve over time, but its evolution should strengthen rather than dilute the ministry's mission.

### Implementation Guidance

* Review significant changes against the Product Constitution and the Four-Book Foundation.
* Preserve backward compatibility where practical.
* Record major architectural decisions.
* Evaluate whether proposed changes genuinely improve the ministry's ability to fulfil its mission.

---

# Decision Framework

When evaluating any significant product or engineering decision, contributors should ask:

1. Is this faithful to Scripture as understood through the Four-Book Foundation?
2. Does this strengthen the mission of the Restoration Community?
3. Does this support restoration, discipleship, community, and honest work and living?
4. Is there a simpler solution that fulfils the same purpose?
5. Will future stewards understand and maintain this decision?

If a proposal cannot be confidently answered in the affirmative, it should be reconsidered before implementation.

---

# Closing Statement

These principles exist to ensure that every feature, design decision, engineering decision, and operational practice faithfully serves the mission of the Restoration Community.

Technology changes.

Methods evolve.

Tools improve.

The mission remains.

By God's grace.

In Christ Jesus.

One faithful step at a time.


# PRD 02 – People, Roles & Permissions

**Version:** 1.0 (Draft)

## Purpose

This document defines the people who interact with the Restoration Community platform, the responsibilities entrusted to them, and the permissions required to fulfil those responsibilities.

Roles exist to serve people and the mission of the Restoration Community.

Permissions exist to support responsible stewardship.

Neither should become an end in themselves.

---

# Foundational Principles

The platform recognises every participant as a person created in the image of God and worthy of dignity, respect, and care.

Roles represent responsibilities rather than status.

Permissions should always be limited to what is necessary to fulfil those responsibilities.

The principle of least privilege shall govern all access control.

---

# Core Role Model

The platform is designed around six primary roles.

Additional specialised roles may be introduced in future provided they remain consistent with the Four-Book Foundation.

---

# Role 1 – Visitor

## Description

A visitor is someone exploring the Restoration Community without having joined.

### Responsibilities

* Learn about the ministry.
* Explore publicly available resources.
* Begin the onboarding process.

### Typical Capabilities

* View public content.
* Create an account.
* Contact the ministry.
* Access introductory resources.

Visitors cannot access participant-only community features.

---

# Role 2 – Participant

## Description

A participant is an individual actively engaging in the Restoration Community and the Restoration Journey.

Participants form the heart of the platform.

### Responsibilities

* Participate honestly and respectfully.
* Engage in the Restoration Journey.
* Build healthy relationships.
* Contribute positively to the community.
* Pursue honest work and living.

### Typical Capabilities

* Maintain a personal profile.
* Access learning resources.
* Participate in community discussions.
* Request mentoring.
* Track personal progress where appropriate.
* Communicate with approved mentors and leaders.
* Participate in ministry activities.

Participants should never be presented merely as "users."

They are members of a restoration community.

---

# Role 3 – Mentor

## Description

Mentors provide encouragement, accountability, guidance, and support to participants within clearly defined ministry expectations.

### Responsibilities

* Support participants faithfully.
* Encourage spiritual growth.
* Promote healthy boundaries.
* Maintain confidentiality where appropriate.
* Escalate safeguarding concerns according to ministry policy.

### Typical Capabilities

* View assigned participants.
* Record mentoring interactions where appropriate.
* Recommend resources.
* Receive ministry guidance.
* Participate in mentor training.
* Communicate within approved mentoring channels.

Mentors are servants of the ministry rather than supervisors of participants.

---

# Role 4 – Community Leader

## Description

Community Leaders oversee groups, communities, events, and local ministry activities.

### Responsibilities

* Foster healthy community life.
* Encourage participation.
* Support mentors.
* Coordinate ministry activities.
* Identify emerging pastoral or safeguarding needs.

### Typical Capabilities

* Manage communities and groups.
* Approve community events where authorised.
* View community participation information.
* Coordinate volunteers.
* Support communication within their area of responsibility.

---

# Role 5 – Ministry Administrator

## Description

Ministry Administrators support the operational stewardship of the Restoration Community.

Their authority is administrative rather than pastoral unless separately appointed by the ministry.

### Responsibilities

* Support operational effectiveness.
* Manage approved administrative processes.
* Maintain accurate records.
* Assist ministry leaders.

### Typical Capabilities

* Manage participant records where authorised.
* Configure operational settings.
* Produce reports appropriate to ministry stewardship.
* Manage communications.
* Support onboarding and administration.

Administrative authority should never exceed ministry authority.

---

# Role 6 – Platform Administrator

## Description

Platform Administrators maintain the technical operation of the platform.

Technical authority does not imply ministry authority.

### Responsibilities

* Maintain platform reliability.
* Protect security.
* Monitor platform health.
* Support deployments.
* Respond to technical incidents.

### Typical Capabilities

* Configure infrastructure.
* Manage authentication systems.
* Monitor logs and performance.
* Perform backups and recovery.
* Maintain integrations.

Platform Administrators should access participant information only when operationally necessary and in accordance with approved policies.

---

# Role Relationships

The platform should encourage collaboration rather than hierarchy.

Leadership exists for service.

Administration exists for stewardship.

Technology exists for support.

Every role ultimately serves the mission established in the Four-Book Foundation.

---

# Permission Principles

Permissions should be:

* explicit;
* minimal;
* auditable;
* reviewable;
* revocable.

No permission should be granted without a corresponding ministry or operational responsibility.

---

# Access Control

The platform should implement role-based access control (RBAC).

Future attribute-based controls may be introduced where appropriate without replacing the principle of least privilege.

All privileged actions should be logged appropriately.

Sensitive administrative actions should require additional verification where practical.

---

# Safeguarding

Certain responsibilities require enhanced safeguards.

These include, but are not limited to:

* mentoring;
* participant communications;
* access to sensitive personal information;
* administrative actions;
* safeguarding case management.

Additional policies governing these responsibilities should be maintained within the Operations repository.

---

# Future Roles

Future specialised roles may include:

* Volunteer
* Trainer
* Content Editor
* Translator
* Event Coordinator
* Regional Leader
* Developer
* Quality Assurance Reviewer
* Documentation Steward

Each new role should be introduced only when a clear ministry or operational need exists.

---

# Traceability

Every role, responsibility, permission set, and workflow should be traceable to the Four-Book Foundation and the Product Constitution.

Technical convenience should never become the primary reason for defining a role.

Roles exist to serve people and faithfully support the ministry.

---

# Closing Statement

The Restoration Community platform recognises people before permissions.

Every role is an opportunity to serve.

Every responsibility is an act of stewardship.

Every permission exists only to enable faithful service to the mission entrusted to the Restoration Community.

By God's grace.

In Christ Jesus.

One faithful step at a time.


# PRD 03 – User Journeys

**Version:** 1.0 (Draft)

## Purpose

This document defines the principal journeys people take through the Restoration Community platform.

These journeys describe meaningful participation in the ministry rather than simple navigation through software.

Every feature implemented within the platform should support one or more of these journeys.

Features exist to serve journeys.

Journeys exist to support the ministry's mission.

---

# Journey Philosophy

The Restoration Community platform is designed around people, relationships, and restoration.

Technology should support natural ministry experiences rather than becoming the focus of attention.

Each journey should:

* encourage genuine participation;
* strengthen community;
* support restoration;
* promote honest work and living;
* remain faithful to the Four-Book Foundation.

---

# Journey 1 – Discover the Restoration Community

## Purpose

Enable visitors to understand the ministry before deciding to participate.

### Typical Journey

Visitor

→

Learns about the ministry

→

Explores the Four-Book Foundation (appropriate public content)

→

Reads testimonies and introductory resources

→

Understands the mission

→

Chooses whether to continue

### Success Criteria

The visitor understands:

* who the Restoration Community is;
* why it exists;
* what participation involves;
* how to begin.

---

# Journey 2 – Join the Community

## Purpose

Guide a new participant into the Restoration Community with clarity, simplicity, and encouragement.

### Typical Journey

Visitor

→

Creates an account

→

Completes onboarding

→

Accepts community expectations

→

Creates a personal profile

→

Begins participation

### Success Criteria

The participant feels welcomed, informed, and prepared to begin the Restoration Journey.

---

# Journey 3 – Begin the Restoration Journey

## Purpose

Support participants as they begin engaging intentionally with the ministry's restoration pathway.

### Typical Journey

Participant

→

Completes initial orientation

→

Explores learning resources

→

Sets appropriate goals

→

Begins personal reflection

→

Engages with the community

### Success Criteria

Participants understand that restoration is God's work by His grace in Christ Jesus and recognise their invitation to participate faithfully in that ongoing work.

---

# Journey 4 – Build Healthy Relationships

## Purpose

Strengthen authentic Christ-centred relationships within the Restoration Community.

### Typical Journey

Participant

→

Joins community groups

→

Participates in discussions

→

Attends events

→

Builds trusted relationships

→

Serves alongside others

### Success Criteria

Participants experience increasing connection, encouragement, accountability, and belonging.

---

# Journey 5 – Receive Mentoring

## Purpose

Connect participants with suitable mentors who can provide encouragement, wisdom, and accountability.

### Typical Journey

Participant

→

Requests mentoring

→

Appropriate matching process

→

Mentoring relationship begins

→

Regular interaction

→

Ongoing encouragement

→

Periodic review

### Success Criteria

Mentoring relationships remain healthy, supportive, and consistent with ministry expectations and safeguarding policies.

---

# Journey 6 – Grow in Honest Work and Living

## Purpose

Encourage participants to pursue lives characterised by integrity, responsibility, faithful service, and honest work.

### Typical Journey

Participant

→

Learns biblical principles

→

Applies them in daily life

→

Receives encouragement

→

Reflects on progress

→

Encourages others

### Success Criteria

Participants increasingly demonstrate growth in faithful living within their families, workplaces, churches, and communities.

---

# Journey 7 – Serve the Community

## Purpose

Enable participants to contribute their gifts in service to others.

### Typical Journey

Participant

→

Discovers opportunities to serve

→

Receives appropriate preparation

→

Serves responsibly

→

Receives ongoing support

→

Encourages others through faithful service

### Success Criteria

Service strengthens both the individual and the wider Restoration Community.

---

# Journey 8 – Become a Mentor

## Purpose

Prepare suitable participants to serve faithfully as mentors.

### Typical Journey

Participant

→

Recommended or applies

→

Completes assessment

→

Receives mentor training

→

Approved by ministry leadership

→

Begins mentoring

→

Receives continuing support

### Success Criteria

Mentors serve with wisdom, humility, healthy boundaries, and accountability.

---

# Journey 9 – Lead a Community

## Purpose

Support leaders in nurturing healthy, Christ-centred communities.

### Typical Journey

Leader appointed

→

Receives leadership preparation

→

Coordinates community life

→

Supports mentors and participants

→

Encourages participation

→

Develops future leaders

### Success Criteria

Communities remain healthy, welcoming, and faithful to the ministry's mission.

---

# Journey 10 – Steward the Ministry

## Purpose

Enable administrators and ministry leaders to support the ministry responsibly.

### Typical Journey

Administrator

→

Manages operational responsibilities

→

Supports participants and leaders

→

Monitors ministry health

→

Maintains appropriate records

→

Supports continuous improvement

### Success Criteria

Operational stewardship strengthens the ministry without becoming burdensome or bureaucratic.

---

# Journey 11 – Steward the Platform

## Purpose

Enable technical teams to maintain a secure, reliable, and sustainable platform.

### Typical Journey

Platform Administrator

→

Monitors platform health

→

Responds to incidents

→

Deploys improvements

→

Maintains security

→

Supports future development

### Success Criteria

The platform remains reliable, secure, maintainable, and aligned with the Product Constitution.

---

# Cross-Journey Principles

Every journey should:

* minimise unnecessary complexity;
* preserve participant dignity;
* encourage authentic relationships;
* support safeguarding;
* protect privacy;
* promote accessibility;
* remain traceable to the Four-Book Foundation.

Journeys should never encourage dependency upon the platform itself.

The platform should continually direct people toward Christ, healthy community, and faithful participation in the ministry.

---

# Journey Traceability

Every functional requirement introduced within the Product Requirements Document shall identify the journey or journeys it supports.

Every user interface, workflow, API, database entity, notification, report, and operational process should be traceable to at least one defined journey.

This ensures that implementation remains organised around ministry outcomes rather than isolated software features.

---

# Closing Statement

The Restoration Community platform exists to accompany people through meaningful journeys of restoration, discipleship, service, and community.

The platform succeeds not when people spend more time using it, but when it faithfully supports people as they grow in Christ, participate in authentic community, and live lives marked by honest work and faithful stewardship.

By God's grace.

In Christ Jesus.

One faithful step at a time.


# PRD 04 – Functional Requirements

This section contains detailed functional requirements organized by module.

---

# PRD 04.01 – Identity & Authentication

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Purpose

This module defines the functional requirements governing identity, authentication, account security, and access to the Restoration Community platform.

Identity establishes who a person is within the platform.

Authentication verifies that identity.

Authorisation determines what responsibilities and permissions are available after authentication.

This module provides the foundation upon which all other platform capabilities depend.

---

# Scope

This module includes:

* Account registration
* Authentication
* Identity verification
* Password management
* Session management
* Multi-factor authentication
* Account recovery
* Account lifecycle
* Account security
* Authentication auditing

This module does not define role permissions. Those are governed by PRD 02.

---

# Guiding Principles

Identity exists to support people, not merely accounts.

Security protects participants and the ministry.

Authentication should be secure without becoming unnecessarily burdensome.

Privacy and dignity should be preserved throughout every authentication process.

Every authentication decision should support responsible stewardship.

---

# Business Rules

### BR-AUTH-001

Every account shall represent one identifiable individual or one approved system account.

---

### BR-AUTH-002

Shared participant accounts shall not be permitted.

---

### BR-AUTH-003

Platform administrative accounts shall be individually assigned.

---

### BR-AUTH-004

Authentication records shall be retained according to approved operational policies.

---

### BR-AUTH-005

Every privileged action shall be attributable to an authenticated identity.

---

# Functional Requirements

## Registration

### REQ-AUTH-001

The platform shall allow a Visitor to create a personal account.

**Source**

Book Three – Journey 2 (Join the Community)

**Priority**

Must

---

### REQ-AUTH-002

The platform shall require a unique email address for each personal account unless an approved alternative identity mechanism has been configured.

**Priority**

Must

---

### REQ-AUTH-003

The platform shall verify ownership of the registered email address before activating the account.

**Priority**

Must

---

### REQ-AUTH-004

The platform shall prevent duplicate active accounts associated with the same verified identity unless explicitly authorised through ministry policy.

**Priority**

Must

---

## Authentication

### REQ-AUTH-005

The platform shall authenticate participants before granting access to protected resources.

---

### REQ-AUTH-006

The platform shall securely store passwords using contemporary industry-approved password hashing algorithms.

---

### REQ-AUTH-007

The platform shall never store passwords in plaintext.

---

### REQ-AUTH-008

The platform shall enforce configurable password complexity requirements.

---

### REQ-AUTH-009

The platform shall support password reset through verified identity recovery procedures.

---

### REQ-AUTH-010

The platform shall invalidate password reset requests after a configurable expiration period.

---

## Multi-Factor Authentication

### REQ-AUTH-011

The platform shall support multi-factor authentication for privileged roles.

---

### REQ-AUTH-012

The platform should support optional multi-factor authentication for participants.

---

## Session Management

### REQ-AUTH-013

The platform shall establish authenticated sessions only after successful identity verification.

---

### REQ-AUTH-014

The platform shall automatically expire inactive sessions after a configurable period.

---

### REQ-AUTH-015

The platform shall allow authenticated participants to sign out of active sessions.

---

### REQ-AUTH-016

The platform shall invalidate active sessions following a password change.

---

## Account Recovery

### REQ-AUTH-017

The platform shall provide secure account recovery procedures.

---

### REQ-AUTH-018

The platform shall require identity verification before granting account recovery.

---

## Account Lifecycle

### REQ-AUTH-019

The platform shall support account activation.

---

### REQ-AUTH-020

The platform shall support account suspension.

---

### REQ-AUTH-021

The platform shall support account deactivation in accordance with ministry policy and applicable legal requirements.

---

### REQ-AUTH-022

The platform shall preserve audit records associated with deactivated accounts where required by approved retention policies.

---

## Security

### REQ-AUTH-023

The platform shall protect authentication endpoints against automated credential attacks.

---

### REQ-AUTH-024

The platform shall record authentication failures for security monitoring.

---

### REQ-AUTH-025

The platform shall support configurable account lockout or equivalent protective measures following repeated failed authentication attempts.

---

### REQ-AUTH-026

The platform shall generate security audit records for successful and unsuccessful authentication events.

---

## Audit

### REQ-AUTH-027

Every authentication event shall include:

* Timestamp
* Account identifier
* Event type
* Outcome
* Originating device or client information where reasonably available

---

# Acceptance Criteria

This module shall be considered complete when:

* every authentication requirement has been implemented;
* all requirements are independently testable;
* security reviews have been completed;
* audit logging has been verified;
* traceability to the Four-Book Foundation has been confirmed;
* documentation has been completed.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 02 – People, Roles & Permissions
* PRD 03 – Journey 2 (Join the Community)

Future implementation artifacts shall reference these requirements by Requirement ID.

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Identity provider selection
* Authentication protocols
* Session token implementation
* Password hashing algorithm selection
* Multi-factor authentication technologies
* Deployment architecture

These decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

Status: Draft

Next Module:

PRD 04.02 – Onboarding


# PRD 04.02 – Onboarding

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Purpose

This module defines the functional requirements governing how a Visitor becomes a Participant in the Restoration Community platform.

Onboarding is not merely an account setup process.

It is the participant's first structured experience of the Restoration Community and should reflect the ministry's values of clarity, grace, truth, hospitality, stewardship, and Christ-centred restoration.

The onboarding experience shall prepare participants to engage meaningfully with the community rather than simply gain access to software.

---

# Scope

This module includes:

* Welcome experience
* Account activation completion
* Community introduction
* Participant profile initiation
* Community expectations
* Consent and acknowledgements
* Initial orientation
* Accessibility considerations
* Onboarding completion

This module does not define mentoring, learning content, or participant profiles in detail. Those are addressed in their respective modules.

---

# Guiding Principles

Onboarding shall:

* welcome rather than overwhelm;
* inform rather than confuse;
* encourage rather than pressure;
* prepare rather than merely register;
* introduce the ministry faithfully;
* minimise unnecessary friction.

Every onboarding step should have a clear ministry purpose.

---

# Business Rules

### BR-ONB-001

Every Participant shall complete the onboarding process before accessing participant-only community features.

---

### BR-ONB-002

Onboarding progress shall be resumable.

Participants shall not be required to restart the process after an interruption.

---

### BR-ONB-003

The platform shall present onboarding in a logical sequence.

Steps may not be skipped unless explicitly permitted by ministry policy.

---

### BR-ONB-004

Completion of onboarding shall be recorded for audit and operational purposes.

---

# Functional Requirements

## Welcome

### REQ-ONB-001

The platform shall present a welcome experience following successful account activation.

**Source**

PRD 03 – Journey 2 (Join the Community)

**Priority**

Must

---

### REQ-ONB-002

The welcome experience shall introduce the purpose and mission of the Restoration Community in language consistent with the Four-Book Foundation.

---

## Community Introduction

### REQ-ONB-003

The platform shall provide an introduction to the Restoration Community, explaining its purpose, values, and expectations.

---

### REQ-ONB-004

The platform shall clearly communicate that restoration is God's work by His grace in Christ Jesus and that the platform exists to support participation in that ministry.

---

## Community Expectations

### REQ-ONB-005

The platform shall present the Community Covenant and require the Participant to acknowledge it before completing onboarding.

---

### REQ-ONB-006

The platform shall record the Participant's acknowledgement of the Community Covenant with a timestamp.

---

## Participant Information

### REQ-ONB-007

The platform shall collect only the information required to begin participation in accordance with ministry policy.

---

### REQ-ONB-008

The platform shall clearly identify required and optional information.

---

### REQ-ONB-009

The platform shall allow Participants to update their personal information after onboarding, subject to applicable policies.

---

## Orientation

### REQ-ONB-010

The platform shall provide an introductory orientation to help Participants understand the Restoration Journey and the opportunities available within the community.

---

### REQ-ONB-011

The orientation shall explain how Participants can engage with community groups, mentoring, learning resources, and opportunities for service.

---

## Accessibility

### REQ-ONB-012

The onboarding process shall be fully navigable using keyboard-only interaction.

---

### REQ-ONB-013

The onboarding process shall support assistive technologies in accordance with the platform's accessibility standards.

---

### REQ-ONB-014

The platform shall present onboarding content using clear, concise, and understandable language.

---

## Completion

### REQ-ONB-015

The platform shall confirm successful completion of onboarding.

---

### REQ-ONB-016

Upon completion of onboarding, the platform shall grant access to participant capabilities appropriate to the Participant's role.

---

### REQ-ONB-017

The platform shall direct the Participant to the next recommended step in the Restoration Journey rather than leaving them without guidance.

---

## Recovery

### REQ-ONB-018

The platform shall preserve onboarding progress if a Participant leaves before completion.

---

### REQ-ONB-019

The platform shall resume onboarding from the most recently completed step when the Participant returns.

---

# Acceptance Criteria

This module shall be considered complete when:

* onboarding can be completed from beginning to end without ambiguity;
* Participants receive a clear introduction to the ministry;
* Community Covenant acknowledgement is recorded;
* progress can be resumed after interruption;
* accessibility requirements have been verified;
* traceability to PRD 03 Journey 2 has been confirmed;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 02 – People, Roles & Permissions
* PRD 03 – Journey 2 (Join the Community)
* PRD 03 – Journey 3 (Begin the Restoration Journey)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Stepper versus single-page onboarding flow
* Progressive disclosure techniques
* Analytics implementation
* Localisation strategy
* Content management approach

These decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

Status: Draft

Next Module:

PRD 04.03 – Participant Profiles


# PRD 04.03 – Participant Profiles

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Purpose

This module defines the functional requirements governing Participant Profiles within the Restoration Community platform.

A Participant Profile provides the information necessary to support authentic relationships, mentoring, community participation, and ministry stewardship.

Profiles exist to help people become known within the community while preserving dignity, privacy, and appropriate safeguarding.

They do not exist to encourage self-promotion, competition, or personal branding.

---

# Scope

This module includes:

* Participant profile creation
* Profile information
* Profile visibility
* Privacy controls
* Profile updates
* Profile images
* Ministry information
* Relationship information
* Audit history

This module does not define mentoring records, learning progress, messaging, or safeguarding case information.

---

# Guiding Principles

Participant Profiles shall:

* reflect dignity rather than popularity;
* support relationships rather than performance;
* encourage authenticity rather than self-promotion;
* collect only information necessary to support ministry participation;
* respect participant privacy;
* support safeguarding and responsible stewardship.

---

# Business Rules

### BR-PROF-001

Every Participant shall have one active Participant Profile.

---

### BR-PROF-002

A Participant Profile shall be linked to exactly one authenticated participant account.

---

### BR-PROF-003

The platform shall distinguish between information visible to the Participant, information visible to the community, and information restricted to authorised ministry roles.

---

### BR-PROF-004

Profile visibility shall default to the most privacy-preserving setting consistent with participation in the Restoration Community.

---

# Functional Requirements

## Profile Creation

### REQ-PROF-001

The platform shall create a Participant Profile during the onboarding process.

**Source**

PRD 03 – Journey 2 (Join the Community)

**Priority**

Must

---

### REQ-PROF-002

The platform shall assign a unique identifier to each Participant Profile.

---

## Core Information

### REQ-PROF-003

The platform shall maintain core participant information required for community participation.

---

### REQ-PROF-004

The platform shall clearly distinguish required profile information from optional profile information.

---

### REQ-PROF-005

The platform shall allow Participants to update permitted profile information.

---

## Profile Photograph

### REQ-PROF-006

The platform may allow Participants to upload a profile photograph.

---

### REQ-PROF-007

Where profile photographs are supported, Participants shall be able to remove or replace them.

---

### REQ-PROF-008

Profile photographs shall comply with ministry content standards.

---

## Visibility

### REQ-PROF-009

The platform shall define profile visibility according to approved privacy policies.

---

### REQ-PROF-010

Participants shall be able to view the information visible to others.

---

### REQ-PROF-011

The platform shall prevent unauthorised access to restricted profile information.

---

## Privacy

### REQ-PROF-012

Participants shall be informed how their profile information is used.

---

### REQ-PROF-013

The platform shall process profile information in accordance with applicable privacy requirements and ministry policy.

---

### REQ-PROF-014

The platform shall maintain an audit history of significant profile changes.

---

## Community Participation

### REQ-PROF-015

Participant Profiles shall support appropriate participation in mentoring, community groups, learning activities, and ministry events.

---

### REQ-PROF-016

Profile information displayed within the platform shall be limited to what is necessary for the relevant ministry context.

---

## Safeguarding

### REQ-PROF-017

Restricted safeguarding information shall not form part of the visible Participant Profile.

---

### REQ-PROF-018

Access to restricted participant information shall be limited to authorised roles in accordance with PRD 02.

---

## Account Relationship

### REQ-PROF-019

Suspending or deactivating a participant account shall not automatically remove associated profile records where retention is required by ministry policy or applicable law.

---

### REQ-PROF-020

The platform shall preserve referential integrity between participant accounts and Participant Profiles throughout the account lifecycle.

---

# Acceptance Criteria

This module shall be considered complete when:

* every Participant has a unique profile;
* profile information supports meaningful community participation;
* privacy controls function as specified;
* restricted information is protected;
* audit history is maintained;
* all requirements are independently testable;
* traceability to the Four-Book Foundation and PRD 03 has been verified.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 02 – People, Roles & Permissions
* PRD 03 – Journey 2 (Join the Community)
* PRD 03 – Journey 4 (Build Healthy Relationships)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Profile data model
* Image storage strategy
* Privacy preference implementation
* Media optimisation
* Synchronisation across services

These decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.04 – Restoration Journey


# PRD 04.04 – Restoration Journey

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Purpose

This module defines the functional requirements governing how the platform supports Participants as they engage in the Restoration Journey.

The platform exists to encourage, organise, and support participation in the Restoration Journey established by the Four-Book Foundation.

The platform does not define restoration.

The platform does not produce restoration.

Restoration is God's work by His grace through Jesus Christ.

The platform faithfully serves that work.

---

# Scope

This module includes:

* Journey enrolment
* Journey progression
* Learning pathways
* Reflection
* Milestones
* Encouragement
* Participant guidance
* Journey history

This module excludes:

* assessment of spiritual maturity;
* automated spiritual evaluation;
* ranking participants;
* competitive scoring;
* gamification.

---

# Guiding Principles

The Restoration Journey shall:

* remain Christ-centred;
* encourage faithfulness rather than performance;
* support participation rather than competition;
* strengthen discipleship rather than dependency upon technology;
* encourage community and mentoring;
* preserve participant dignity.

The platform shall never present restoration as something earned through platform activity.

---

# Business Rules

### BR-RJ-001

Every Restoration Journey shall derive from the Four-Book Foundation.

---

### BR-RJ-002

Journey content shall be approved according to ministry governance.

---

### BR-RJ-003

Participants may progress at different rates.

The platform shall not require identical progression timelines.

---

### BR-RJ-004

Journey participation records shall remain confidential except where access is authorised by ministry policy.

---

# Functional Requirements

## Journey Participation

### REQ-RJ-001

The platform shall allow Participants to begin the Restoration Journey following successful onboarding.

**Source**

PRD 03 – Journey 3 (Begin the Restoration Journey)

**Priority**

Must

---

### REQ-RJ-002

The platform shall maintain each Participant's Journey record.

---

### REQ-RJ-003

The platform shall preserve Journey history throughout the Participant account lifecycle in accordance with ministry policy.

---

## Learning

### REQ-RJ-004

The platform shall present approved learning resources associated with the Restoration Journey.

---

### REQ-RJ-005

The platform shall record completion of learning activities where appropriate.

---

### REQ-RJ-006

Completion of learning activities shall not be presented as evidence of spiritual maturity.

---

## Reflection

### REQ-RJ-007

The platform may provide opportunities for personal reflection.

---

### REQ-RJ-008

Personal reflections shall remain private unless the Participant explicitly chooses to share them or ministry policy requires otherwise.

---

## Milestones

### REQ-RJ-009

The platform may record Journey milestones established by ministry guidance.

---

### REQ-RJ-010

Milestones shall represent participation in the Journey rather than achievement of spiritual status.

---

### REQ-RJ-011

The platform shall avoid language implying that restoration has been completed through platform activity.

---

## Encouragement

### REQ-RJ-012

The platform shall provide encouraging guidance appropriate to the Participant's current stage of participation.

---

### REQ-RJ-013

Encouragement shall remain consistent with the Four-Book Foundation.

---

### REQ-RJ-014

The platform shall encourage Participants to engage with mentors, community, Scripture, prayer, and local Christian fellowship where appropriate.

---

## Progress

### REQ-RJ-015

The platform shall display Journey progress in a manner that communicates participation rather than spiritual achievement.

---

### REQ-RJ-016

Journey progress shall not be ranked against other Participants.

---

### REQ-RJ-017

The platform shall not assign scores, levels, spiritual ratings, or comparative rankings to Participants.

---

### REQ-RJ-018

The platform shall not use gamification mechanisms that encourage competition in spiritual formation.

---

## Administration

### REQ-RJ-019

Authorised ministry leaders shall be able to maintain Journey content in accordance with approved governance.

---

### REQ-RJ-020

Changes to Journey content shall be auditable.

---

# Acceptance Criteria

This module shall be considered complete when:

* Participants can begin the Restoration Journey;
* Journey participation is recorded accurately;
* learning resources are available;
* reflections are protected appropriately;
* progress is presented without implying spiritual measurement;
* competitive mechanisms are absent;
* all requirements are independently testable;
* traceability to the Four-Book Foundation has been confirmed.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 03 – Journey 3 (Begin the Restoration Journey)
* PRD 03 – Journey 6 (Grow in Honest Work and Living)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Journey workflow engine
* Content delivery architecture
* Learning content storage
* Reflection storage strategy
* Offline participation support
* Synchronisation model

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.05 – Mentoring


# PRD 04.05 – Mentoring

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Purpose

This module defines the functional requirements governing mentoring within the Restoration Community platform.

The platform exists to facilitate healthy, Christ-centred mentoring relationships by providing appropriate tools, structure, communication, and safeguards.

The platform does not replace the mentor.

The platform does not replace pastoral care.

The platform does not replace the work of the Holy Spirit.

Mentoring remains a ministry relationship between people.

Technology faithfully supports that relationship.

---

# Scope

This module includes:

* Mentor eligibility
* Mentor assignment
* Mentoring requests
* Mentoring relationships
* Communication support
* Meeting coordination
* Mentoring records
* Safeguarding
* Relationship lifecycle
* Audit history

This module excludes:

* automated mentoring;
* AI-generated pastoral authority;
* automated spiritual assessments;
* replacement of human mentors.

---

# Guiding Principles

Mentoring shall:

* remain Christ-centred;
* encourage trust and accountability;
* preserve dignity and confidentiality;
* strengthen authentic relationships;
* support safeguarding;
* remain under appropriate ministry oversight.

Technology shall always remain a servant of the mentoring relationship.

---

# Business Rules

### BR-MENT-001

Every mentoring relationship shall involve at least one approved Mentor and one Participant.

---

### BR-MENT-002

Mentors shall satisfy ministry approval requirements before being assigned Participants.

---

### BR-MENT-003

Mentoring relationships shall remain subject to ministry oversight.

---

### BR-MENT-004

Mentoring relationships may be concluded, paused, or reassigned according to ministry policy.

---

### BR-MENT-005

Confidential information shall be handled in accordance with safeguarding policies and applicable legal requirements.

---

# Functional Requirements

## Mentor Eligibility

### REQ-MENT-001

The platform shall support ministry approval of Mentor eligibility before mentoring responsibilities are assigned.

**Source**

PRD 03 – Journey 8 (Become a Mentor)

**Priority**

Must

---

### REQ-MENT-002

The platform shall maintain the current mentoring status of each approved Mentor.

---

## Mentoring Requests

### REQ-MENT-003

Participants shall be able to request mentoring through approved ministry workflows.

---

### REQ-MENT-004

The platform shall support ministry review of mentoring requests before assignment where required by ministry policy.

---

## Mentor Assignment

### REQ-MENT-005

The platform shall support assignment of Participants to approved Mentors.

---

### REQ-MENT-006

The platform shall record the start date of every mentoring relationship.

---

### REQ-MENT-007

The platform shall maintain the current status of each mentoring relationship.

---

## Communication Support

### REQ-MENT-008

The platform may provide secure communication tools to support mentoring relationships.

---

### REQ-MENT-009

Where communication tools are provided, they shall operate in accordance with ministry safeguarding policies.

---

### REQ-MENT-010

The platform shall not require mentoring conversations to occur exclusively within the platform.

---

## Meeting Coordination

### REQ-MENT-011

The platform may support scheduling of mentoring meetings.

---

### REQ-MENT-012

Participants and Mentors shall be able to record that a mentoring meeting occurred without requiring disclosure of confidential discussion content.

---

## Mentoring Records

### REQ-MENT-013

The platform may maintain mentoring records appropriate to ministry stewardship.

---

### REQ-MENT-014

Mentoring records shall be protected according to role-based access controls defined in PRD 02.

---

### REQ-MENT-015

The platform shall distinguish operational records from confidential pastoral content.

---

## Safeguarding

### REQ-MENT-016

The platform shall support safeguarding procedures defined by ministry policy.

---

### REQ-MENT-017

Authorised safeguarding personnel shall have access only to information necessary to fulfil safeguarding responsibilities.

---

### REQ-MENT-018

The platform shall generate audit records for significant administrative actions affecting mentoring relationships.

---

## Relationship Lifecycle

### REQ-MENT-019

The platform shall support the conclusion of mentoring relationships.

---

### REQ-MENT-020

The platform shall preserve historical mentoring records in accordance with ministry retention policies.

---

### REQ-MENT-021

The platform shall allow Participants to request a review of a mentoring relationship through approved ministry processes.

---

## Platform Boundaries

### REQ-MENT-022

The platform shall not present AI-generated content as pastoral counsel or spiritual authority.

---

### REQ-MENT-023

The platform shall not automatically assign spiritual maturity ratings, mentoring scores, or pastoral evaluations.

---

### REQ-MENT-024

The platform shall clearly distinguish administrative platform guidance from ministry guidance where both are presented.

---

# Acceptance Criteria

This module shall be considered complete when:

* mentoring requests can be submitted and reviewed;
* approved mentoring relationships can be established and concluded;
* safeguarding controls function as specified;
* confidential information is protected;
* administrative actions are auditable;
* platform boundaries are enforced;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 02 – People, Roles & Permissions
* PRD 03 – Journey 5 (Receive Mentoring)
* PRD 03 – Journey 8 (Become a Mentor)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Scheduling integration
* Communication platform integration
* Notification mechanisms
* Data retention implementation
* Encryption strategy
* Audit storage architecture

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.06 – Community


# PRD 04.06 – Community

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform supports healthy participation in the Restoration Community.

The platform provides capabilities that encourage fellowship, mutual encouragement, service, communication, and shared participation.

---

# Platform Boundary

The platform shall not claim to create Christian community.

Christian community is formed through relationships centred on Jesus Christ.

Technology exists only to support those relationships.

---

# Purpose

This module defines the functional requirements governing community participation within the Restoration Community platform.

Community capabilities exist to help Participants know one another, encourage one another, serve together, and participate faithfully in the life of the Restoration Community.

Community participation shall remain Christ-centred, relational, respectful, and accountable.

---

# Scope

This module includes:

* Community membership
* Groups
* Community discovery
* Fellowship participation
* Community communication
* Community moderation
* Community reporting
* Community safeguarding
* Community lifecycle

This module excludes:

* anonymous public social networking;
* popularity-based engagement systems;
* algorithmic promotion of people;
* competitive social mechanics.

---

# Guiding Principles

Community shall:

* encourage belonging without encouraging exclusivity;
* strengthen relationships rather than popularity;
* promote encouragement rather than argument;
* support service rather than self-promotion;
* preserve dignity;
* operate under appropriate ministry oversight.

---

# Business Rules

### BR-COMM-001

Every community space shall have an approved ministry purpose.

---

### BR-COMM-002

Community groups shall operate under appropriate ministry oversight.

---

### BR-COMM-003

Participants shall remain subject to the Community Covenant while participating in community spaces.

---

### BR-COMM-004

Community interactions shall be subject to safeguarding and moderation policies.

---

# Functional Requirements

## Community Membership

### REQ-COMM-001

The platform shall allow authorised Participants to join approved community groups.

**Source**

PRD 03 – Journey 4 (Build Healthy Relationships)

**Priority**

Must

---

### REQ-COMM-002

The platform shall maintain membership records for community groups.

---

### REQ-COMM-003

Participants shall be able to leave community groups unless restricted by ministry policy.

---

## Community Discovery

### REQ-COMM-004

The platform shall help Participants discover relevant community opportunities according to approved ministry guidance.

---

### REQ-COMM-005

Community recommendations shall prioritise ministry purpose over engagement optimisation.

---

## Communication

### REQ-COMM-006

The platform may provide communication capabilities that support healthy community participation.

---

### REQ-COMM-007

Communication capabilities shall operate in accordance with the Community Covenant and safeguarding policies.

---

### REQ-COMM-008

Participants shall be able to report inappropriate community behaviour through approved reporting processes.

---

## Moderation

### REQ-COMM-009

Authorised ministry moderators shall be able to review reported community concerns.

---

### REQ-COMM-010

Moderation actions shall be recorded for audit purposes.

---

### REQ-COMM-011

Participants affected by moderation actions shall be informed in accordance with ministry policy.

---

## Community Participation

### REQ-COMM-012

The platform shall encourage respectful participation consistent with the Four-Book Foundation.

---

### REQ-COMM-013

The platform shall avoid mechanisms that reward popularity, controversy, or excessive platform engagement.

---

### REQ-COMM-014

The platform shall not display public popularity metrics such as follower counts or participant rankings.

---

### REQ-COMM-015

The platform may recognise faithful service where approved by ministry governance, provided such recognition does not encourage pride or competition.

---

## Safeguarding

### REQ-COMM-016

The platform shall support safeguarding procedures for community participation.

---

### REQ-COMM-017

Safeguarding concerns shall be escalated according to ministry policy.

---

## Community Lifecycle

### REQ-COMM-018

The platform shall support the creation, suspension, archival, and closure of community groups through authorised ministry processes.

---

### REQ-COMM-019

Historical community records shall be retained according to approved retention policies.

---

### REQ-COMM-020

Community data shall remain auditable throughout its lifecycle.

---

# Acceptance Criteria

This module shall be considered complete when:

* Participants can join and participate in approved communities;
* community interactions are governed by the Community Covenant;
* moderation and safeguarding processes function correctly;
* popularity-based mechanics are absent;
* all requirements are independently testable;
* traceability to the Four-Book Foundation has been verified.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 03 – Journey 4 (Build Healthy Relationships)
* PRD 03 – Journey 7 (Serve the Community)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Group architecture
* Messaging technology
* Moderation tooling
* Search and discovery implementation
* Notification strategy
* Scalability approach

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.07 – Learning Resources


# PRD 04.07 – Learning Resources

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform provides access to learning resources that support the Restoration Journey.

The platform organises, delivers, and manages approved learning resources so that Participants can engage with them individually and within the life of the Restoration Community.

---

# Platform Boundary

The platform shall not claim that access to learning resources, completion of learning activities, or acquisition of knowledge constitutes spiritual maturity, wisdom, repentance, or restoration.

Understanding and transformation remain the work of God through His Word, His Spirit, and His people.

---

# Purpose

This module defines the functional requirements governing learning resources within the Restoration Community platform.

Learning resources exist to support Participants as they grow in biblical understanding, practical wisdom, honest work and living, and faithful participation in the Restoration Community.

Learning shall always serve the ministry's mission and never become an end in itself.

---

# Scope

This module includes:

* Learning resource catalogue
* Resource organisation
* Learning pathways
* Resource access
* Progress recording
* Reflection opportunities
* Resource recommendations
* Administrative management
* Audit history

This module excludes:

* automated spiritual evaluation;
* competitive learning systems;
* public learner rankings;
* learning algorithms that replace ministry judgement.

---

# Guiding Principles

Learning resources shall:

* remain Christ-centred;
* support discipleship rather than information accumulation;
* encourage reflection and application;
* complement mentoring and community participation;
* remain faithful to the Four-Book Foundation;
* preserve participant dignity.

---

# Business Rules

### BR-LRN-001

Every learning resource shall support the mission established in the Four-Book Foundation.

---

### BR-LRN-002

Learning resources shall be approved through ministry governance before publication.

---

### BR-LRN-003

Learning pathways may vary according to ministry guidance and participant needs.

---

### BR-LRN-004

Learning progress records shall be maintained in accordance with ministry policy.

---

# Functional Requirements

## Learning Catalogue

### REQ-LRN-001

The platform shall maintain a catalogue of approved learning resources.

**Source**

PRD 03 – Journey 3 (Begin the Restoration Journey)

**Priority**

Must

---

### REQ-LRN-002

Learning resources shall be organised according to approved ministry structure.

---

### REQ-LRN-003

Participants shall be able to discover learning resources appropriate to their current stage of participation.

---

## Resource Access

### REQ-LRN-004

The platform shall provide authorised Participants with access to approved learning resources.

---

### REQ-LRN-005

The platform shall support multiple resource formats where approved by ministry governance.

---

### REQ-LRN-006

The platform shall provide accessible access to learning resources in accordance with platform accessibility standards.

---

## Learning Progress

### REQ-LRN-007

The platform may record completion of learning activities where appropriate.

---

### REQ-LRN-008

Recorded completion shall represent participation only and shall not imply spiritual maturity or restoration.

---

### REQ-LRN-009

Participants shall be able to review their own learning history.

---

## Reflection

### REQ-LRN-010

The platform may provide opportunities for personal reflection associated with learning resources.

---

### REQ-LRN-011

Reflection records shall remain private unless intentionally shared or otherwise required by ministry policy.

---

## Recommendations

### REQ-LRN-012

The platform may recommend learning resources consistent with approved ministry pathways.

---

### REQ-LRN-013

Recommendations shall prioritise ministry guidance rather than maximising engagement metrics.

---

## Administration

### REQ-LRN-014

Authorised ministry personnel shall be able to create, update, publish, archive, and retire learning resources.

---

### REQ-LRN-015

Significant administrative actions affecting learning resources shall be auditable.

---

### REQ-LRN-016

The platform shall preserve version history for learning resources where required by ministry policy.

---

# Acceptance Criteria

This module shall be considered complete when:

* Participants can access approved learning resources;
* learning resources are organised according to ministry structure;
* progress can be recorded without implying spiritual achievement;
* reflection opportunities are protected appropriately;
* administrative actions are auditable;
* all requirements are independently testable;
* traceability to the Four-Book Foundation has been verified.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 03 – Journey 3 (Begin the Restoration Journey)
* PRD 03 – Journey 6 (Grow in Honest Work and Living)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Content storage architecture
* Media delivery strategy
* Offline access
* Search implementation
* Recommendation implementation
* Versioning strategy

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.08 – Service Opportunities


# PRD 04.08 – Service Opportunities

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform supports Participants in discovering, coordinating, and participating in opportunities to serve within the Restoration Community.

The platform helps connect willing people with genuine ministry needs.

---

# Platform Boundary

The platform shall not present service as a means of earning spiritual status, recognition, or favour.

Service remains an act of Christian love, faithful stewardship, and grateful response to God's grace.

---

# Purpose

This module defines the functional requirements governing service opportunities within the Restoration Community platform.

Service opportunities exist to encourage Participants to contribute their time, gifts, abilities, and experience in ways that strengthen the community and advance its mission.

The platform shall support participation in service while preserving humility, dignity, and voluntary commitment.

---

# Scope

This module includes:

* Service opportunity catalogue
* Volunteer participation
* Role matching
* Scheduling support
* Participation records
* Ministry coordination
* Administrative management
* Audit history

This module excludes:

* competitive volunteer rankings;
* public service leaderboards;
* reward systems based on service volume;
* automated assignment of Participants to ministry service.

---

# Guiding Principles

Service opportunities shall:

* reflect Christ-like humility;
* encourage willing participation;
* strengthen the community;
* recognise stewardship over recognition;
* complement mentoring and community life;
* remain under ministry oversight.

---

# Business Rules

### BR-SERV-001

Every service opportunity shall support an approved ministry purpose.

---

### BR-SERV-002

Service opportunities shall be created and managed by authorised ministry personnel.

---

### BR-SERV-003

Participation in service shall remain voluntary unless explicitly defined as part of an approved ministry responsibility.

---

### BR-SERV-004

Participation records shall be retained according to ministry policy.

---

# Functional Requirements

## Service Catalogue

### REQ-SERV-001

The platform shall maintain a catalogue of approved service opportunities.

**Source**

PRD 03 – Journey 7 (Serve the Community)

**Priority**

Must

---

### REQ-SERV-002

Participants shall be able to browse available service opportunities.

---

### REQ-SERV-003

Service opportunities shall include sufficient information to enable informed participation.

---

## Participation

### REQ-SERV-004

Participants shall be able to express interest in approved service opportunities.

---

### REQ-SERV-005

The platform shall support ministry review and confirmation of participation where required.

---

### REQ-SERV-006

The platform shall record participation in service activities where appropriate.

---

## Scheduling

### REQ-SERV-007

The platform may support scheduling and coordination of service activities.

---

### REQ-SERV-008

Participants shall receive relevant information regarding confirmed service activities.

---

## Administration

### REQ-SERV-009

Authorised ministry personnel shall be able to create, modify, publish, archive, and retire service opportunities.

---

### REQ-SERV-010

Administrative actions affecting service opportunities shall be auditable.

---

### REQ-SERV-011

The platform shall preserve historical records of service opportunities according to ministry retention policies.

---

## Participation Records

### REQ-SERV-012

Participants shall be able to review their own history of service participation.

---

### REQ-SERV-013

Participation records shall represent ministry involvement and shall not be interpreted as evidence of spiritual maturity.

---

### REQ-SERV-014

The platform shall not display public rankings, scores, or comparisons based on service participation.

---

## Safeguarding

### REQ-SERV-015

Service opportunities involving safeguarding considerations shall follow approved ministry safeguarding procedures.

---

### REQ-SERV-016

Access to sensitive service information shall be restricted according to authorised ministry roles.

---

# Acceptance Criteria

This module shall be considered complete when:

* approved service opportunities can be published;
* Participants can express interest in serving;
* ministry personnel can coordinate participation;
* service participation is recorded appropriately;
* public rankings and competitive mechanisms are absent;
* safeguarding requirements are enforced;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 03 – Journey 7 (Serve the Community)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Volunteer scheduling architecture
* Calendar integration
* Notification mechanisms
* Opportunity matching
* Reporting implementation

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.09 – Honest Work & Living


# PRD 04.09 – Honest Work & Living

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform supports Participants in pursuing honest work and living consistent with the mission of the Restoration Community.

The platform provides resources, opportunities, guidance, and coordination that encourage Participants as they rebuild their lives through honest work, responsible living, and faithful Christian stewardship.

---

# Platform Boundary

The platform shall not determine a Participant's character, sincerity, repentance, faithfulness, or spiritual maturity.

The platform shall not guarantee employment, financial success, or life outcomes.

The platform faithfully supports Participants as they pursue honest work and living by God's grace.

---

# Purpose

This module defines the functional requirements governing capabilities that encourage honest work and living.

These capabilities exist to help Participants discover opportunities, develop practical readiness, connect with appropriate support, and celebrate faithful progress without reducing restoration to employment status or measurable success alone.

Honest work and living includes integrity, responsibility, stewardship, service, relationships, and daily faithfulness–not employment alone.

---

# Scope

This module includes:

* Employment opportunities
* Skills development pathways
* Vocational guidance
* Goal planning
* Practical resource signposting
* Progress records
* Ministry encouragement
* Administrative oversight
* Audit history

This module excludes:

* employment guarantees;
* automated suitability decisions;
* financial scoring;
* prosperity-based measurements;
* judgement of a Participant's personal worth or spiritual condition.

---

# Guiding Principles

Honest Work & Living shall:

* reflect the dignity of work;
* encourage integrity in every area of life;
* support practical restoration;
* value faithfulness over visible success;
* strengthen personal responsibility;
* remain centred on Christ and the ministry's mission.

---

# Business Rules

### BR-HWL-001

Every capability within this module shall support the mission of guiding people toward honest work and living.

---

### BR-HWL-002

Vocational resources shall be approved according to ministry governance.

---

### BR-HWL-003

Participants may pursue different vocational pathways according to their circumstances, abilities, and opportunities.

---

### BR-HWL-004

Participation records shall be retained according to ministry policy.

---

# Functional Requirements

## Opportunities

### REQ-HWL-001

The platform shall maintain approved opportunities related to honest work and living.

**Source**

PRD 03 – Journey 6 (Grow in Honest Work and Living)

**Priority**

Must

---

### REQ-HWL-002

Participants shall be able to discover opportunities relevant to their circumstances where appropriate.

---

### REQ-HWL-003

The platform may provide information about vocational pathways, skills development, entrepreneurship, education, or employment support approved by ministry governance.

---

## Goal Planning

### REQ-HWL-004

Participants may establish personal goals related to honest work and living.

---

### REQ-HWL-005

Goal records shall remain private except where intentionally shared or otherwise required by ministry policy.

---

### REQ-HWL-006

The platform may support periodic review of personal goals.

---

## Resources

### REQ-HWL-007

The platform shall provide access to approved practical resources that support honest work and living.

---

### REQ-HWL-008

Resources shall remain consistent with the Four-Book Foundation and ministry governance.

---

## Progress

### REQ-HWL-009

The platform may record participation in activities related to honest work and living.

---

### REQ-HWL-010

Recorded participation shall not be interpreted as evidence of spiritual maturity, personal worth, or guaranteed future success.

---

### REQ-HWL-011

The platform shall avoid comparative rankings based on employment, income, qualifications, or other measures of worldly achievement.

---

## Administration

### REQ-HWL-012

Authorised ministry personnel shall be able to manage approved resources and opportunities.

---

### REQ-HWL-013

Administrative actions shall be auditable.

---

### REQ-HWL-014

Historical records shall be retained according to ministry retention policies.

---

## Safeguarding & Privacy

### REQ-HWL-015

Personal vocational information shall be protected according to approved privacy and safeguarding policies.

---

### REQ-HWL-016

Access to sensitive participant information shall be limited according to authorised ministry roles.

---

# Acceptance Criteria

This module shall be considered complete when:

* Participants can discover approved opportunities and resources;
* personal goals can be recorded and reviewed;
* participation is supported without implying judgement of character or spiritual condition;
* privacy and safeguarding controls function correctly;
* administrative actions are auditable;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 03 – Journey 6 (Grow in Honest Work and Living)
* Book One – *The Community Manual* (Mission: Guiding people toward honest work and living)

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Employment integration strategy
* Goal management implementation
* Resource recommendation approach
* External partner integration
* Reporting architecture

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.10 – Notifications & Communications


# PRD 04.10 – Notifications & Communications

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform delivers timely, relevant, and respectful communications that support participation in the Restoration Community.

The platform communicates to inform, encourage, coordinate, and safeguard Participants in ways that faithfully support the ministry's mission.

---

# Platform Boundary

The platform shall not employ communication mechanisms designed primarily to maximise engagement, increase screen time, manipulate behaviour, or create dependency upon the platform.

Communication shall always serve people rather than the platform.

---

# Purpose

This module defines the functional requirements governing notifications and communications.

Communications exist to help Participants remain informed, connected, encouraged, and aware of ministry activities while respecting privacy, attention, and personal dignity.

---

# Scope

This module includes:

* Notifications
* Announcements
* Reminders
* Direct communications
* Email communications
* In-platform messaging
* Communication preferences
* Delivery history
* Audit history

This module excludes:

* advertising;
* engagement optimisation algorithms;
* behavioural manipulation;
* promotional communications unrelated to the ministry.

---

# Guiding Principles

Communications shall:

* be purposeful;
* be respectful;
* be timely;
* be truthful;
* preserve participant dignity;
* support ministry participation without creating unnecessary interruption.

---

# Business Rules

### BR-COMMS-001

Every communication shall support an approved ministry purpose.

---

### BR-COMMS-002

Participants shall be able to manage communication preferences where appropriate.

---

### BR-COMMS-003

Mandatory safeguarding or security communications shall override optional communication preferences where required.

---

### BR-COMMS-004

Communication history shall be retained according to ministry policy.

---

# Functional Requirements

## Notifications

### REQ-COMMS-001

The platform shall deliver notifications relevant to approved ministry activities.

**Source**

Multiple PRD 03 journeys

**Priority**

Must

---

### REQ-COMMS-002

Participants shall be able to view their notification history.

---

### REQ-COMMS-003

Participants shall be able to configure supported notification preferences.

---

## Announcements

### REQ-COMMS-004

Authorised ministry personnel shall be able to publish announcements.

---

### REQ-COMMS-005

Announcements shall be targeted according to approved ministry rules where applicable.

---

## Reminders

### REQ-COMMS-006

The platform may deliver reminders relating to approved ministry activities.

---

### REQ-COMMS-007

Reminder scheduling shall support ministry coordination while avoiding unnecessary repetition.

---

## Communication Preferences

### REQ-COMMS-008

Participants shall be able to manage supported communication channels and preferences.

---

### REQ-COMMS-009

The platform shall respect participant preferences except where overriding safeguarding, legal, or security obligations apply.

---

## Administration

### REQ-COMMS-010

Authorised ministry personnel shall manage communication templates.

---

### REQ-COMMS-011

Significant communication administration actions shall be auditable.

---

## Delivery Records

### REQ-COMMS-012

The platform shall maintain delivery records for supported communication channels.

---

### REQ-COMMS-013

Delivery records shall be retained according to ministry retention policies.

---

## Platform Integrity

### REQ-COMMS-014

The platform shall not generate communications intended solely to increase user engagement.

---

### REQ-COMMS-015

The platform shall not employ artificial urgency, streak mechanics, or similar behavioural manipulation techniques.

---

### REQ-COMMS-016

Communications generated by AI, where permitted, shall be clearly identifiable as system-generated assistance and shall not be presented as pastoral or spiritual authority.

---

# Acceptance Criteria

This module shall be considered complete when:

* Participants receive appropriate communications;
* communication preferences are respected;
* mandatory communications function correctly;
* communication administration is auditable;
* manipulative engagement mechanisms are absent;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* Multiple PRD 03 participant journeys

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Notification delivery architecture
* Email provider integration
* Push notification implementation
* Template engine
* Queue architecture
* Delivery monitoring

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.11 – Events & Gatherings


# PRD 04.11 – Events & Gatherings

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform supports the planning, coordination, communication, and administration of events and gatherings within the Restoration Community.

The platform provides the tools necessary to organise gatherings that support the ministry's mission.

---

# Platform Boundary

The platform shall not claim to create Christian fellowship, worship, discipleship, or community through the scheduling of events.

Gatherings become meaningful through the presence of God's people and the work of God among them.

The platform faithfully supports their coordination.

---

# Purpose

This module defines the functional requirements governing events and gatherings.

Events exist to help Participants gather for encouragement, prayer, learning, mentoring, fellowship, service, outreach, and other ministry purposes consistent with the Four-Book Foundation.

---

# Scope

This module includes:

* Event management
* Meeting scheduling
* Registration
* Attendance recording
* Calendar integration
* Event communications
* Volunteer coordination
* Administrative management
* Audit history

This module excludes:

* commercial ticketing;
* entertainment ranking;
* popularity-based event promotion;
* automated determination of spiritual significance.

---

# Guiding Principles

Events and gatherings shall:

* support ministry participation;
* encourage personal presence where appropriate;
* strengthen relationships;
* remain Christ-centred;
* preserve dignity and safety;
* operate under ministry oversight.

---

# Business Rules

### BR-EVT-001

Every event shall support an approved ministry purpose.

---

### BR-EVT-002

Events shall be created and managed by authorised ministry personnel.

---

### BR-EVT-003

Registration requirements shall be determined according to ministry policy.

---

### BR-EVT-004

Attendance records shall be retained according to ministry policy.

---

# Functional Requirements

## Event Management

### REQ-EVT-001

The platform shall allow authorised ministry personnel to create, update, publish, archive, and cancel events.

**Priority**

Must

---

### REQ-EVT-002

Events shall include sufficient information for Participants to make informed attendance decisions.

---

### REQ-EVT-003

The platform shall support categorisation of events according to approved ministry purposes.

---

## Registration

### REQ-EVT-004

Participants shall be able to register for events where registration is required.

---

### REQ-EVT-005

The platform shall manage attendance capacity where applicable.

---

### REQ-EVT-006

Participants shall be able to withdraw their registration where permitted by ministry policy.

---

## Attendance

### REQ-EVT-007

Authorised personnel shall be able to record attendance.

---

### REQ-EVT-008

Attendance records shall represent participation in an event and shall not be interpreted as evidence of spiritual maturity or commitment.

---

## Communication

### REQ-EVT-009

The platform shall support communications relating to approved events.

---

### REQ-EVT-010

Participants shall receive relevant updates regarding events for which they are registered.

---

## Administration

### REQ-EVT-011

Administrative actions affecting events shall be auditable.

---

### REQ-EVT-012

Historical event records shall be retained according to ministry retention policies.

---

## Safeguarding

### REQ-EVT-013

Events involving safeguarding considerations shall comply with approved safeguarding policies.

---

### REQ-EVT-014

Access to participant attendance information shall be restricted according to authorised ministry roles.

---

# Acceptance Criteria

This module shall be considered complete when:

* authorised personnel can manage events;
* Participants can register where appropriate;
* attendance can be recorded accurately;
* event communications function correctly;
* safeguarding requirements are enforced;
* administrative actions are auditable;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* PRD 03 – Multiple participant journeys involving gatherings and community participation

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Calendar provider integration
* Attendance capture methods
* QR code or check-in mechanisms
* Recurring event implementation
* External calendar synchronisation

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.12 – Safeguarding & Incident Management


# PRD 04.12 – Safeguarding & Incident Management

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform supports the identification, reporting, management, escalation, documentation, and audit of safeguarding concerns and ministry incidents.

The platform exists to assist authorised ministry personnel in fulfilling their safeguarding responsibilities through secure, accountable, confidential, and traceable processes.

Protecting people entrusted to the ministry is an expression of faithful stewardship.

---

# Platform Boundary

The platform shall not replace pastoral judgement, safeguarding professionals, legal authorities, ministry leadership, or civil authorities.

The platform records, protects, notifies, coordinates, and preserves information.

People remain responsible for making safeguarding decisions, exercising pastoral wisdom, complying with applicable law, and caring for those entrusted to them.

---

# Purpose

This module defines the functional requirements governing safeguarding and incident management within the Restoration Community platform.

Its purpose is to ensure that safeguarding concerns are handled with confidentiality, accountability, urgency, integrity, and appropriate ministry oversight while preserving the dignity and wellbeing of every person involved.

The platform shall prioritise protection over convenience whenever these objectives conflict.

---

# Scope

This module includes:

* Safeguarding concern reporting
* Incident recording
* Case management
* Risk classification
* Escalation workflows
* Confidential documentation
* Evidence management
* Audit history
* Access control
* Retention management
* Reporting

This module excludes:

* automated safeguarding decisions;
* AI determination of risk;
* automated pastoral judgement;
* legal advice;
* replacement of statutory safeguarding procedures.

---

# Guiding Principles

Safeguarding processes shall:

* protect people before protecting systems;
* preserve dignity for every person involved;
* maintain confidentiality;
* support timely and appropriate action;
* remain fully auditable;
* comply with ministry governance and applicable legal obligations;
* recognise that safeguarding is a ministry responsibility supported by technology.

---

# Business Rules

### BR-SAFE-001

Every safeguarding concern shall receive a unique case record.

---

### BR-SAFE-002

Only authorised safeguarding personnel shall access safeguarding case information.

---

### BR-SAFE-003

Every safeguarding action shall be attributable to an identified authorised individual.

---

### BR-SAFE-004

Safeguarding records shall be retained according to approved ministry retention policies and applicable legal requirements.

---

### BR-SAFE-005

High-risk safeguarding concerns shall follow approved escalation procedures without unnecessary delay.

---

### BR-SAFE-006

Safeguarding actions shall always prioritise the protection and wellbeing of people.

---

# Functional Requirements

## Concern Reporting

### REQ-SAFE-001

The platform shall allow authorised users to record safeguarding concerns.

**Priority**

Must

---

### REQ-SAFE-002

Concern reports shall record relevant facts without alteration of the original submission.

---

### REQ-SAFE-003

The platform shall record the identity of the reporting individual where required by ministry policy.

---

### REQ-SAFE-004

Supporting documentation may be attached to safeguarding records where authorised.

---

## Case Management

### REQ-SAFE-005

Authorised safeguarding personnel shall be able to manage safeguarding cases.

---

### REQ-SAFE-006

Case status changes shall be recorded with timestamps and responsible personnel.

---

### REQ-SAFE-007

The platform shall maintain a complete history of safeguarding case activity.

---

## Escalation

### REQ-SAFE-008

The platform shall support escalation workflows according to approved safeguarding procedures.

---

### REQ-SAFE-009

Escalation notifications shall be delivered to authorised safeguarding personnel.

---

### REQ-SAFE-010

Escalation workflows shall remain configurable according to ministry governance.

---

## Confidentiality

### REQ-SAFE-011

Safeguarding information shall be protected using role-based access controls.

---

### REQ-SAFE-012

Sensitive safeguarding records shall not be visible to unauthorised users.

---

### REQ-SAFE-013

Access to safeguarding information shall be fully auditable.

---

## Audit & Accountability

### REQ-SAFE-014

Every significant safeguarding action shall generate an immutable audit record.

---

### REQ-SAFE-015

Audit records shall include the responsible individual, action performed, and timestamp.

---

### REQ-SAFE-016

Audit records shall be protected from unauthorised modification.

---

## Evidence Management

### REQ-SAFE-017

Authorised personnel may securely associate supporting evidence with safeguarding cases.

---

### REQ-SAFE-018

Evidence records shall preserve integrity throughout the retention period.

---

## Retention

### REQ-SAFE-019

Safeguarding records shall be retained according to approved retention schedules and applicable legal requirements.

---

### REQ-SAFE-020

Where lawful and appropriate, safeguarding records shall support secure archival and eventual disposal in accordance with approved policies.

---

## Reporting

### REQ-SAFE-021

Authorised safeguarding personnel shall be able to generate safeguarding reports consistent with ministry governance.

---

### REQ-SAFE-022

Reports shall preserve confidentiality and disclose only information appropriate to the recipient's authorised role.

---

# Acceptance Criteria

This module shall be considered complete when:

* safeguarding concerns can be securely recorded;
* authorised safeguarding personnel can manage safeguarding cases;
* escalation workflows operate correctly;
* confidentiality is enforced through role-based access control;
* every significant action is fully auditable;
* evidence integrity is preserved;
* retention policies are correctly applied;
* all requirements are independently testable;
* traceability to the Four-Book Foundation has been verified.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* Book One – *The Community Manual* (Truth, Grace, Respect, Accountability, Dignity)
* Book Two – Community Governance
* Book Four – Ministry Governance

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Case management architecture
* Evidence storage strategy
* Encryption implementation
* Escalation engine
* Notification integration
* Legal hold implementation
* Disaster recovery strategy
* Security monitoring

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.13 – Roles, Permissions & Delegated Authority


# PRD 04.13 – Roles, Permissions & Delegated Authority

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform implements roles, permissions, and delegated authority in support of the Restoration Community's governance.

The platform faithfully enforces permissions that correspond to responsibilities delegated through approved ministry governance.

---

# Platform Boundary

The platform shall not create, grant, or determine ministry authority.

Authority is delegated through ministry governance.

The platform implements that delegated authority by enforcing the permissions assigned to authorised roles.

---

# Purpose

This module defines the functional requirements governing roles, permissions, delegated authority, and access control.

Its purpose is to ensure that access to information and capabilities is granted only to those entrusted with the corresponding ministry responsibilities, while preserving accountability, least privilege, and faithful stewardship.

---

# Scope

This module includes:

* Role management
* Permission management
* Delegated authority
* Role assignment
* Permission inheritance
* Temporary delegation
* Access review
* Separation of duties
* Audit history

This module excludes:

* self-assigned authority;
* privilege escalation outside approved governance;
* permanent emergency permissions;
* automated determination of ministry authority.

---

# Guiding Principles

Roles and permissions shall:

* reflect delegated ministry responsibility;
* implement the principle of least privilege;
* preserve accountability;
* support separation of duties where appropriate;
* remain fully auditable;
* operate under approved ministry governance.

---

# Business Rules

### BR-RBAC-001

Every platform permission shall correspond to an approved ministry responsibility.

---

### BR-RBAC-002

Every role shall be defined and approved through ministry governance.

---

### BR-RBAC-003

Users shall receive only the permissions necessary to fulfil their entrusted responsibilities.

---

### BR-RBAC-004

Temporary delegation shall have defined start and end conditions.

---

### BR-RBAC-005

Emergency access shall be exceptional, time-limited, fully auditable, and subject to post-event review.

---

# Functional Requirements

## Role Management

### REQ-RBAC-001

The platform shall maintain approved ministry roles.

**Priority**

Must

---

### REQ-RBAC-002

Authorised administrators shall be able to create, modify, retire, and review roles in accordance with ministry governance.

---

### REQ-RBAC-003

Role definitions shall include documented responsibilities and associated permissions.

---

## Permission Management

### REQ-RBAC-004

The platform shall enforce permissions based on assigned roles.

---

### REQ-RBAC-005

Permissions shall be centrally managed and consistently enforced across all platform capabilities.

---

### REQ-RBAC-006

Permission changes shall take effect according to approved governance processes.

---

## Delegation

### REQ-RBAC-007

The platform shall support temporary delegation of approved responsibilities.

---

### REQ-RBAC-008

Delegated permissions shall automatically expire according to approved delegation conditions.

---

### REQ-RBAC-009

The platform shall preserve a complete history of delegated authority.

---

## Access Review

### REQ-RBAC-010

Authorised personnel shall periodically review role assignments.

---

### REQ-RBAC-011

The platform shall support identification of inactive or unnecessary permissions.

---

### REQ-RBAC-012

Access reviews shall be recorded for audit purposes.

---

## Separation of Duties

### REQ-RBAC-013

The platform shall support separation of duties where required by ministry governance.

---

### REQ-RBAC-014

Conflicting permissions shall be identified and prevented where defined by approved policy.

---

## Audit & Accountability

### REQ-RBAC-015

Every significant role or permission change shall generate an immutable audit record.

---

### REQ-RBAC-016

Audit records shall identify the responsible individual, action performed, and timestamp.

---

### REQ-RBAC-017

Audit records shall be protected from unauthorised modification.

---

# Acceptance Criteria

This module shall be considered complete when:

* approved roles can be managed;
* permissions are consistently enforced;
* delegated authority operates correctly;
* temporary delegation expires automatically;
* access reviews are supported;
* separation of duties can be enforced;
* every significant administrative action is fully auditable;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* Book Two – Community Governance
* Book Four – Ministry Governance

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Identity provider integration
* Permission evaluation strategy
* Role hierarchy implementation
* Delegation workflow
* Access review automation
* Emergency access mechanisms

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.14 – Reporting, Analytics & Ministry Insights


# PRD 04.14 – Reporting, Analytics & Ministry Insights

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform provides reporting, analytics, and ministry insights that support faithful stewardship, informed decision-making, and responsible ministry governance.

The platform presents information that assists authorised users in understanding ministry operations while respecting privacy, dignity, and the limits of what software can know.

---

# Platform Boundary

The platform shall not determine spiritual maturity, repentance, faithfulness, Christian character, ministry effectiveness, or God's work in a person's life.

Reports and analytics provide information.

Interpretation, discernment, and ministry decisions remain the responsibility of authorised people.

---

# Purpose

This module defines the functional requirements governing reporting, analytics, dashboards, and ministry insights.

Its purpose is to enable ministry leaders to understand operational patterns, support good stewardship, monitor approved ministry activities, and make informed decisions without replacing human judgement or pastoral discernment.

---

# Scope

This module includes:

* Operational reporting
* Dashboards
* Analytics
* Trend analysis
* Ministry insights
* Audit reporting
* Export capabilities
* Scheduled reporting
* Report administration

This module excludes:

* spiritual scoring;
* behavioural manipulation;
* predictive judgement of character;
* AI-generated pastoral decisions;
* ranking Participants according to spiritual worth.

---

# Guiding Principles

Reporting and analytics shall:

* support stewardship;
* present truthful information;
* preserve participant dignity;
* protect confidentiality;
* remain understandable and explainable;
* support informed decision-making without replacing human judgement.

---

# Business Rules

### BR-RPT-001

Every report shall support an approved ministry purpose.

---

### BR-RPT-002

Access to reports shall be governed by authorised ministry roles.

---

### BR-RPT-003

Reports containing sensitive information shall be protected according to ministry privacy and safeguarding policies.

---

### BR-RPT-004

Report definitions and scheduled reports shall be auditable.

---

# Functional Requirements

## Operational Reporting

### REQ-RPT-001

The platform shall provide operational reports supporting approved ministry activities.

**Priority**

Must

---

### REQ-RPT-002

Authorised users shall be able to access reports appropriate to their delegated responsibilities.

---

### REQ-RPT-003

Reports shall present accurate information derived from approved platform data.

---

## Dashboards

### REQ-RPT-004

The platform shall provide dashboards appropriate to authorised ministry roles.

---

### REQ-RPT-005

Dashboard information shall be relevant to the responsibilities of the authorised user.

---

### REQ-RPT-006

Dashboards shall not present metrics that imply judgement of a Participant's spiritual condition or personal worth.

---

## Analytics

### REQ-RPT-007

The platform may provide analytical summaries of ministry activities and operational trends.

---

### REQ-RPT-008

Analytics shall clearly distinguish observed information from interpretation or recommendation.

---

### REQ-RPT-009

Where AI-assisted analytical summaries are provided, they shall be clearly identified as decision-support tools and shall not replace ministry judgement.

---

## Export

### REQ-RPT-010

Authorised users may export approved reports where permitted by ministry governance.

---

### REQ-RPT-011

Exported information shall remain subject to ministry privacy, safeguarding, and retention policies.

---

## Administration

### REQ-RPT-012

Authorised personnel shall manage report definitions and schedules.

---

### REQ-RPT-013

Administrative actions affecting reporting shall be fully auditable.

---

## Audit Reporting

### REQ-RPT-014

The platform shall support reporting on audit records where authorised.

---

### REQ-RPT-015

Audit reports shall preserve the integrity and confidentiality of audit information.

---

## Data Protection

### REQ-RPT-016

Reports shall expose only the information necessary for the recipient's authorised responsibilities.

---

### REQ-RPT-017

Personally identifiable or sensitive information shall be protected according to approved governance and applicable legal requirements.

---

# Acceptance Criteria

This module shall be considered complete when:

* authorised users can access appropriate reports;
* dashboards present relevant operational information;
* analytics support stewardship without implying spiritual judgement;
* report exports comply with governance;
* reporting administration is auditable;
* privacy and safeguarding controls are enforced;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* Book One – *The Community Manual*
* Book Four – Ministry Governance

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Reporting architecture
* Dashboard framework
* Analytics engine
* Data warehouse strategy
* AI-assisted insight implementation
* Scheduled reporting infrastructure

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.15 – Audit, Compliance & Records Management


# PRD 04.15 – Audit, Compliance & Records Management

**Version:** 1.0 (Draft)

## Parent Document

PRD 04 – Functional Requirements

---

# Platform Responsibility

This module defines how the platform records significant actions, preserves ministry records, demonstrates accountability, and supports compliance with approved ministry governance and applicable legal obligations.

The platform exists to create trustworthy records that enable faithful stewardship, responsible oversight, and institutional continuity.

---

# Platform Boundary

The platform shall not determine compliance, assign blame, establish guilt, or replace ministry leadership, legal counsel, auditors, or regulatory authorities.

The platform preserves evidence, records activity, and supports accountability.

People remain responsible for governance, interpretation, judgement, and appropriate action.

---

# Purpose

This module defines the functional requirements governing audit logging, compliance support, records management, retention, archival, and lawful disposal of records.

Its purpose is to ensure that ministry operations remain transparent, accountable, traceable, and capable of responsible review while protecting confidentiality and participant dignity.

---

# Scope

This module includes:

* Audit logging
* Compliance support
* Records management
* Retention schedules
* Archival
* Legal holds
* Records disposal
* Compliance reporting
* Audit review

This module excludes:

* automated legal advice;
* automated disciplinary decisions;
* automated compliance certification;
* replacement of human governance.

---

# Guiding Principles

Audit and records management shall:

* preserve truthfulness;
* protect record integrity;
* maintain confidentiality;
* support accountability;
* preserve institutional memory;
* demonstrate faithful stewardship.

---

# Business Rules

### BR-AUD-001

Every significant administrative and governance action shall generate an immutable audit record.

---

### BR-AUD-002

Audit records shall accurately reflect the recorded action and shall not be altered after creation.

---

### BR-AUD-003

Records shall be retained according to approved ministry retention policies and applicable legal requirements.

---

### BR-AUD-004

Records subject to approved legal or safeguarding holds shall not be disposed of until the hold is released.

---

### BR-AUD-005

Access to audit information shall be restricted to authorised roles.

---

# Functional Requirements

## Audit Logging

### REQ-AUD-001

The platform shall record significant administrative, governance, safeguarding, security, and operational events.

**Priority**

Must

---

### REQ-AUD-002

Audit records shall include the responsible individual, action performed, affected resource, timestamp, and outcome where applicable.

---

### REQ-AUD-003

Audit records shall be protected from unauthorised modification or deletion.

---

## Records Management

### REQ-AUD-004

The platform shall manage ministry records according to approved classification and retention policies.

---

### REQ-AUD-005

Records shall support secure archival while preserving integrity and accessibility for authorised purposes.

---

### REQ-AUD-006

Where approved, records shall support secure disposal in accordance with ministry governance and applicable legal requirements.

---

## Compliance Support

### REQ-AUD-007

The platform shall support authorised compliance reviews through approved reporting capabilities.

---

### REQ-AUD-008

Compliance-related activities shall be traceable to supporting records where applicable.

---

## Legal Holds

### REQ-AUD-009

Authorised personnel shall be able to apply and release legal or governance holds on applicable records.

---

### REQ-AUD-010

Records under an active hold shall not be altered or disposed of contrary to the applicable policy.

---

## Audit Review

### REQ-AUD-011

Authorised users shall be able to review audit records appropriate to their delegated responsibilities.

---

### REQ-AUD-012

Audit review activities shall themselves be auditable where required by ministry governance.

---

## Reporting

### REQ-AUD-013

The platform shall provide audit and compliance reports appropriate to authorised roles.

---

### REQ-AUD-014

Reports shall preserve confidentiality and disclose only information necessary for the recipient's authorised responsibilities.

---

# Acceptance Criteria

This module shall be considered complete when:

* significant actions are consistently audited;
* audit records are immutable;
* records management supports retention, archival, and lawful disposal;
* legal holds function correctly;
* authorised users can perform audit reviews;
* compliance reporting is available;
* confidentiality is maintained;
* all requirements are independently testable.

---

# Traceability

This module primarily supports:

* PRD 00 – Product Constitution
* PRD 01 – Product Principles
* Book Two – Community Governance
* Book Four – Ministry Governance

---

# Open Questions

The following implementation decisions are intentionally deferred to the Technical Architecture:

* Audit storage architecture
* Immutable log implementation
* Record classification strategy
* Archival infrastructure
* Retention automation
* Disaster recovery integration

These implementation decisions shall satisfy the requirements defined in this module without altering them.

---

# Module Completion

**Status:** Draft

**Next Module:**

PRD 04.16 – AI Assistance & Automation
```

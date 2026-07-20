# High-Level Technical Architecture

**Version:** 1.0

**Status:** Frozen

**Date:** 2026-07-20

---

# Preamble

## Purpose

This document describes the high-level technical organization of the Restoration Community platform.

It establishes the major architectural components, data domains, technology choices, and deployment model that will guide implementation.

This architecture is intentionally lean. It answers core organizational questions without specifying implementation details.

## Authority

This architecture is authorised by the Engineering Constitution, Requirements Baseline, and Product Requirements Document.

All architectural decisions must remain consistent with those governing documents.

## Audience

This document is written for engineers, architects, and technical leaders who will build and maintain the platform.

New team members should be able to read this document and understand:

* How the platform is organized;
* Why it is organized this way;
* Where new features belong;
* How components communicate;
* What technology choices have been made and why.

## Scope

This architecture describes the Restoration Community platform as a coherent system.

It does not specify:

* API contracts or endpoint definitions;
* database schema or table structures;
* user interface layouts or workflows;
* detailed business logic or implementation algorithms;
* deployment infrastructure details beyond the deployment model.

Those details belong in implementation, ADRs, and feature specifications.

## Constraints

This architecture serves the ministry's mission as established in the Four-Book Foundation.

Technology choices must support:

* faithful implementation of the Requirements Baseline;
* security and privacy appropriate to participant data;
* accessibility for diverse users and devices;
* long-term maintainability and stewardship;
* sustainable deployment and operations.

---

# Architectural Principles

These principles guide all architectural decisions and future evolution.

## 1. Faithfulness Over Features

The platform exists to serve the Restoration Community's mission.

Architectural decisions must prioritise alignment with the Four-Book Foundation over technical novelty or competitive features.

## 2. Layer Separation

The architecture maintains clear separation between:

* **Access Layer** — Authentication, authorization, role enforcement
* **Application Layer** — Business logic and participant workflows
* **Data Layer** — Persistent information and audit records
* **Integration Layer** — External systems and services

Changes within one layer should minimise impact on others.

## 3. Principle of Least Privilege

All access control—whether to features, data, or administrative functions—follows the principle of least privilege.

Users receive only the permissions necessary to fulfil their delegated responsibilities.

## 4. Auditability

Significant actions throughout the system must be traceable.

Every meaningful administrative, governance, or safeguarding action must generate an immutable audit record.

## 5. Security by Design

Security is foundational, not added later.

Authentication, authorisation, data protection, and audit capabilities are core architectural concerns, not afterthoughts.

## 6. Simplicity

Architectural components should be as simple as possible while fulfilling their responsibilities.

Complexity should be introduced only where it clearly serves the mission or improves resilience.

## 7. Stewardship

The architecture must be comprehensible to future maintainers.

Intentional choices should be documented through ADRs.

Code should be readable and well-structured.

Technical debt should be visible and managed.

---

# System Topology

## Major Components

The platform is organized around these major components:

### Access & Identity

Manages authentication, user identity, role assignment, and permission enforcement.

Serves as the security boundary for the entire system.

**Responsibilities:**

* Account registration and lifecycle
* Authentication (passwordless, MFA-capable)
* Role and permission management
* Session management
* Access audit logging

**Participants:**

* Identity provider (internal or federated)
* Authentication service
* Authorization service
* Audit logging system

### Participant Management

Manages individual participant profiles, personal information, and participation history.

Serves as the foundation for all participant-centric features.

**Responsibilities:**

* Participant profile creation and maintenance
* Personal information management
* Restoration Journey engagement and progress
* Participant lifecycle (onboarding through conclusion)

**Participants:**

* Participant profile service
* Restoration Journey engine
* Personal data storage

### Mentoring System

Manages mentoring relationships, mentor-participant connections, and safeguarding oversight of mentoring.

**Responsibilities:**

* Mentor approval and qualification
* Mentoring relationship lifecycle
* Mentoring communication support
* Safeguarding oversight of mentoring relationships

**Participants:**

* Mentor management service
* Mentoring relationship service
* Communication support (optional)

### Community & Fellowship

Manages community groups, participant interaction, and community-based participation.

**Responsibilities:**

* Community group creation and management
* Community membership
* Community communication
* Community moderation and safeguarding

**Participants:**

* Community management service
* Group coordination service
* Communication and messaging system

### Learning & Resources

Manages learning resources, pathways, and participant engagement with educational content.

**Responsibilities:**

* Learning resource catalogue and organisation
* Learning pathway definition and progression
* Resource delivery and access control
* Participant progress tracking

**Participants:**

* Learning resource management
* Learning pathway engine
* Resource delivery service

### Service & Opportunity Coordination

Manages service opportunities, volunteer participation, and coordination of ministry activities.

**Responsibilities:**

* Service opportunity catalogue
* Volunteer participation management
* Scheduling and coordination
* Participation tracking

**Participants:**

* Service opportunity management
* Volunteer coordination service
* Scheduling service

### Honest Work & Living Support

Manages resources, opportunities, and guidance for participants pursuing honest work and living.

**Responsibilities:**

* Work and living resources
* Vocational opportunity discovery
* Goal planning and tracking
* Progress encouragement

**Participants:**

* Resource management
* Opportunity coordination
* Goal tracking service

### Safeguarding & Incident Management

Manages safeguarding concerns, incident reporting, case management, and escalation.

Operates with special confidentiality and access controls.

**Responsibilities:**

* Safeguarding concern reporting and recording
* Incident case management
* Escalation workflows
* Confidential documentation
* Audit trail

**Participants:**

* Safeguarding case management service
* Incident tracking
* Escalation engine

### Ministry Administration

Manages administrative operations, events, communications, and ministry coordination.

**Responsibilities:**

* Event creation and management
* Announcement and notification distribution
* Administrative reports
* Ministry communication coordination

**Participants:**

* Event management service
* Notification and communication service
* Reporting service

### Platform Operations & Audit

Manages platform health, security monitoring, audit logging, records management, and compliance.

**Responsibilities:**

* Audit logging across all systems
* Compliance and governance records
* Platform monitoring and health
* System integration and coordination

**Participants:**

* Audit logging system
* Compliance and records management
* Platform monitoring

## Component Relationships

Components communicate through well-defined interfaces.

**Access & Identity** is a foundational component consulted by all others for authentication and authorisation.

**Participant Management** is central; most other components maintain relationships or references to participants.

**Safeguarding & Incident Management** receives information from all components where safeguarding concerns arise.

**Platform Operations & Audit** receives audit events from all components and maintains comprehensive audit records.

Other components operate within their domains with minimal coupling.

---

# Data Architecture

## Primary Data Domains

Data is organised into distinct domains, each serving a specific set of responsibilities:

### Identity & Access

* User accounts
* Authentication credentials (securely hashed)
* Roles and permissions
* Session records
* Access audit log

### Participant Profiles

* Participant personal information
* Profile visibility preferences
* Restoration Journey participation record
* Participant lifecycle history

### Mentoring

* Mentor records and qualifications
* Mentoring relationship records
* Mentoring interaction history
* Safeguarding flags

### Community

* Community group definitions
* Group membership
* Community interaction history
* Moderation actions

### Learning

* Learning resource catalogue
* Learning pathways
* Participant progress records
* Resource completion history

### Service & Opportunities

* Service opportunity catalogue
* Volunteer participation records
* Scheduling information
* Participation history

### Honest Work & Living

* Resource catalogue
* Participant goals and tracking
* Opportunity records
* Progress records

### Safeguarding

* Safeguarding case records
* Incident reports
* Case history and status changes
* Escalation records
* Confidential documentation
* Safeguarding audit trail (separate from general audit)

### Ministry Administration

* Event records
* Communication history
* Administrative settings
* Ministry coordination data

### Audit & Compliance

* Complete audit log (immutable)
* Records management metadata
* Compliance records
* Legal holds
* Retention schedules

## Data Principles

**Separation:** Sensitive data domains (Identity, Safeguarding) maintain strict separation and access controls.

**Immutability:** Audit records and compliance information are immutable. Updates are recorded as new entries, not modifications.

**Privacy:** Personal participant information is protected according to ministry policy and applicable legal requirements.

**Traceability:** All significant data changes are auditable. Foreign key relationships maintain referential integrity.

**Retention:** Data retention policies are consistently applied across all domains.

---

# Communication Patterns

## Synchronous (Request-Response)

Used for interactive workflows where a response is required before proceeding.

**Examples:**

* Authentication and authorization checks
* Participant profile queries
* Mentoring relationship creation
* Community membership requests
* Learning resource access

**Implementation:** REST APIs or equivalent request-response pattern.

## Asynchronous (Event-Driven)

Used for operations that don't require immediate response or for coordinating across components.

**Examples:**

* Audit logging (all components → audit system)
* Safeguarding escalation (incident detected → safeguarding system)
* Notification delivery (event occurred → notification service)
* Email communication (administrative action → email service)

**Implementation:** Event queue or message broker pattern.

## Real-Time (Streaming)

Used for live updates in community and communication contexts.

**Examples:**

* Community messaging
* Live notifications
* Presence indication (optional)

**Implementation:** WebSocket or equivalent real-time protocol (if implemented).

## External Integration

Used for communication with services outside the platform.

**Examples:**

* Email provider integration
* Calendar provider integration (optional)
* Search service integration (optional)
* Payment processing (if ministry requires)

**Implementation:** Webhook, API polling, or provider-specific protocols.

---

# Technology Stack and Rationale

## Frontend

**Technology:** React with Next.js (App Router)

**Rationale:**

* Next.js provides server-side rendering and static generation for performance and SEO.
* App Router enables modern routing patterns and layout management.
* React ecosystem provides accessible component libraries and tooling.
* TypeScript support ensures type safety throughout the frontend.

## Backend

**Technology:** Node.js with TypeScript

**Rationale:**

* Unified language across frontend and backend reduces cognitive overhead.
* Mature ecosystem and libraries support all required patterns.
* TypeScript provides compile-time type safety.
* Performance is sufficient for ministry platform scale.

## Database

**Technology:** PostgreSQL with Prisma ORM

**Rationale:**

* PostgreSQL is robust, widely deployed, and supports relational data models.
* Supports JSONB for flexible nested data where needed without sacrificing relational integrity.
* Prisma ORM provides type-safe database access and automatic migrations.
* Migration tools support safe schema evolution.

## Authentication

**Technology:** Industry-standard authentication provider (OAuth 2.0 compatible)

**Rationale:**

* Externalized authentication reduces implementation burden and security risk.
* Supports multiple authentication methods without coupling to implementation details.
* Providers maintain security compliance and best practices.

Specific provider selection is deferred to implementation based on ministry requirements and operational needs.

## Deployment & Hosting

**Technology:** Cloud platform with containerisation

**Rationale:**

* Supports scaling as ministry grows.
* Enables separation of environments (development, staging, production).
* Provides managed services for database, storage, and monitoring.
* Supports CI/CD pipelines for automated deployment.

Specific provider (Vercel, AWS, etc.) is deferred to implementation based on cost, operational capability, and ministry preference.

## File Storage

**Technology:** Cloud object storage (S3-compatible)

**Rationale:**

* Supports secure storage of participant documents and resources.
* Separates storage from application tier.
* Provides scalability for media content.

## Search (if required)

**Technology:** Elasticsearch or equivalent search service (optional)

**Rationale:**

* Provides full-text search capability where needed for resource discovery.
* Decoupled from primary database.

Decision to implement full-text search is deferred to implementation based on performance requirements.

## Monitoring & Observability

**Technology:** Centralized logging and monitoring

**Rationale:**

* Tracks system health and performance.
* Enables debugging of production issues.
* Supports audit and compliance monitoring.

---

# Security & Safeguarding

## Authentication Boundary

All access to participant-only features requires successful authentication.

Public resources (homepage, introductory content) are accessible without authentication.

Authenticated users operate within their assigned roles and permissions.

## Authorization Framework

Role-based access control (RBAC) enforces permissions across all components.

Every significant action is authorised before execution.

Access decisions are logged.

## Data Protection

**In Transit:**

* All communication uses TLS encryption.
* Certificates are current and valid.

**At Rest:**

* Sensitive data (passwords, authentication tokens, safeguarding records) is encrypted.
* Encryption keys are managed securely and rotated according to policy.

**Access Control:**

* Access to sensitive data is restricted by role.
* Cross-component access to sensitive data is audited.

## Audit & Accountability

Every significant administrative, governance, safeguarding, or security action generates an immutable audit record.

Audit records include:

* Responsible individual
* Action performed
* Affected resource
* Timestamp
* Outcome

Audit records are protected from unauthorised modification.

Access to audit records is restricted to authorised roles.

## Safeguarding Architecture

Safeguarding data maintains special isolation and access controls.

Only authorised safeguarding personnel access safeguarding case information.

Safeguarding escalation paths are built into incident workflows.

---

# Deployment & Operations

## Environment Model

**Development:** Local or shared development environment for active development.

**Staging:** Production-like environment for testing before release.

**Production:** Live ministry platform serving participants.

Each environment has separate data and configuration.

## Deployment Pipeline

Changes are deployed through an automated CI/CD pipeline:

1. Code commit to repository
2. Automated tests run
3. Build artifacts generated
4. Deployment to staging
5. Manual approval (if required)
6. Deployment to production

Rollback capabilities are maintained for all deployments.

## Database Migrations

Schema changes are managed through migration tools (Prisma, etc.).

Migrations are reversible where practical.

Data integrity is verified after migrations.

## Scaling

The architecture supports horizontal scaling of stateless components.

Database scaling is managed through the database provider.

Load balancing distributes traffic across application instances.

---

# System Boundaries & Integrations

## External System Integrations

### Email Provider

The platform integrates with an email provider for transactional and administrative email.

Messages sent by the platform (confirmations, announcements, notifications) are delivered via email.

**Boundary:** Platform → Email Provider (unidirectional)

### Calendar Integration (Optional)

If implemented, the platform may integrate with calendar providers (Google Calendar, etc.) for event scheduling.

Participants can optionally sync ministry events to personal calendars.

**Boundary:** Platform ↔ Calendar Provider (bidirectional)

### Search Service (Optional)

If full-text search is required, the platform integrates with a search service.

Resource discovery and community search queries are served through the search service.

**Boundary:** Platform → Search Service (unidirectional for indexing)

### Authentication Provider

The platform delegates authentication to an external provider.

The provider handles user registration, password management, and multi-factor authentication.

**Boundary:** Platform ↔ Authentication Provider (bidirectional)

### Cloud Infrastructure

All platform services run on cloud infrastructure provided by a hosting provider.

Databases, storage, monitoring, and networking are provided by the hosting platform.

**Boundary:** Platform services ↔ Cloud Infrastructure (tightly coupled)

## API Boundaries

### Public API

A limited public API may be exposed for third-party integrations (e.g., ministry website integration).

Public API endpoints are documented and versioned.

Rate limiting and authentication protect public endpoints.

**Scope:** Deferred to implementation.

### Internal APIs

Internal service-to-service communication uses well-defined internal APIs.

Internal APIs are not versioned; they evolve together with the system.

---

# Architectural Evolution

This architecture describes the current intended organisation of the platform.

Significant architectural changes must be recorded through Architecture Decision Records (ADRs).

Each ADR captures:

* The architectural decision made
* The problem being addressed
* Alternative approaches considered
* The rationale for the chosen approach
* Any trade-offs or constraints

ADRs are stored in the repository alongside the code and referenced in commit messages when architectural decisions are implemented.

The architecture document should be updated to reflect accepted architectural decisions while remaining consistent with:

* Engineering Constitution
* Requirements Baseline
* Product Requirements Document

Minor implementation refinements (database optimisations, performance tuning, library upgrades) do not require architectural updates unless they represent a change in fundamental organisation.

---

# Closing Statement

This architecture establishes the technical foundation for implementing the Restoration Community platform.

It is intentionally lean, answering core organisational questions without prescribing implementation details.

Implementation teams should use this architecture as a reference for understanding system organisation while making detailed decisions through code, ADRs, and feature specifications.

The architecture is frozen at v1.0. Future updates will be captured through ADRs and reflected in subsequent versions as decisions are accepted and implemented.

By God's grace.

In Christ Jesus.

One faithful step at a time.

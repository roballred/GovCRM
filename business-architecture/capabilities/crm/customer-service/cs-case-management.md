---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Case Management

**Validation Status: [UNVERIFIED] Assumed** — present in 6/7 surveyed platforms (native or first-party suite: Service Cloud, Service Hub, Dynamics Customer Service, Zoho Cases, Freshdesk, Sugar Serve; absent in Pipedrive); not validated with any real organization.

## What It Does
The system must capture every customer issue as a case with a lifecycle — new, assigned, in progress, waiting, resolved, closed — linked to the customer, categorized for analysis, and visible to everyone who serves that customer.

## Personas
- **Support Agent** — creates, works, and resolves cases
- **Support Manager** — monitors queues, backlog, and category patterns
- **Account Manager** — sees open cases before renewal conversations

## Behaviors
- Create cases from any channel, linked to contact and account
- Assign via queues and routing rules; support manual reassignment
- Track status, priority, and category through a defined lifecycle
- Thread all customer communication on the case record
- Resolve with a resolution summary; capture reusable knowledge at closure
- Reopen within a defined window; link related and duplicate cases

## Rules
- A case always has an owner (user or queue) — no orphaned cases
- Case-to-contact/account linkage is mandatory whenever the customer is identifiable
- Categorization is required at closure — pattern analysis depends on it

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-contact-management, cdm-account-management
- Enables: cs-sla-management, cs-knowledge-base (capture at closure), cs-customer-feedback
- Related: cs-omnichannel-support, wa-workflow-rules

---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Audit Logging

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (field history, setup audit trails, security logs; depth varies by tier); not validated with any real organization.

## What It Does
The system must record who did what, when: field-level change history on records, configuration and security-setting changes, access events (logins, exports), and automation-driven changes attributed to their rules.

## Personas
- **CRM Administrator** — investigates incidents and answers audit questions
- **Sales Operations Analyst** — uses field history for trend and hygiene analysis
- **Support Manager** — reviews case-handling history in disputes
- **Executive Sponsor** — depends on auditability for governance and compliance

## Behaviors
- Capture field-level change history (old value, new value, actor, timestamp) on configured fields
- Log configuration, permission, and security-setting changes
- Log access events: logins, failed logins, exports, API access
- Attribute automation-driven changes to the rule that made them
- Search and filter the log by record, user, event type, and period
- Retain logs per policy and export them for external audit

## Rules
- Audit records are immutable — no edit or delete, including by administrators
- Every change has an actor: a user, an integration credential, or a named rule
- Log access is itself logged

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-user-role-management (identity of actors)
- Enables: incident investigation, compliance evidence, wa automation debuggability
- Related: pa-security-controls, cdm-activity-timeline (customer-facing history vs. audit history)

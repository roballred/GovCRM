---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Platform Administration

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); all five sub-capabilities present in 7/7 platforms. Not validated with any real organization.

## What It Does
The system must be governable: administrators control who can access what, adapt the data model and screens to the business without code, enforce security policy, keep an audit trail of changes, and manage the data estate's lifecycle (backup, retention, recovery).

## Personas
- **CRM Administrator** — owns every sub-capability in this group
- **Sales Operations Analyst** — partner in customization and process configuration
- **Executive Sponsor** — accountable for the security and compliance posture
- **Customer** — indirect stakeholder in security, privacy, and retention behavior

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| User & Role Management | [pa-user-role-management.md](./pa-user-role-management.md) | Accounts, roles, permissions, and access scoping |
| Customization | [pa-customization.md](./pa-customization.md) | Custom fields, objects, layouts, and validation without code |
| Security Controls | [pa-security-controls.md](./pa-security-controls.md) | Authentication policy, SSO/2FA, encryption, and access restrictions |
| Audit Logging | [pa-audit-logging.md](./pa-audit-logging.md) | Who changed what, when — for data, config, and access events |
| Data Administration | [pa-data-administration.md](./pa-data-administration.md) | Backup, export, retention, recycle bin, and storage management |

## Success Criteria
- Onboarding/offboarding is a same-day, UI-only operation with least-privilege defaults
- The business adapts fields and processes without vendor or developer involvement
- Security reviews pass on evidence from the system itself (policies + audit log)
- "Who changed this and when" is answerable in minutes for any record or setting

## Rules
- Least privilege is the default posture; broad access is an explicit, logged decision
- Configuration changes are audited exactly like data changes
- Customization capability is matched by inventory/impact visibility — debt stays legible
- Personal-data handling supports consent, retention, and erasure obligations end to end

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: — (this is the root group)
- Enables: every other capability group
- Related: Integration & Extensibility (API credentials and app governance)

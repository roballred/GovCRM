---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Customer Data Management

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); not validated with any real organization.

## What It Does
The system must hold a single, accurate, shared record of every person and organization the business has a relationship with, and everything that has happened with them. This is the foundational group: every sales, marketing, and service capability reads from and writes to these records.

## Personas
- **Sales Representative** — reads context before every interaction; primary creator of contact data
- **Account Manager** — depends on complete account and relationship history
- **Marketing Manager** — segments audiences from this data; suffers first from poor quality
- **CRM Administrator** — owns data-quality tooling and import/export
- **Customer** — the subject of the data; expects it to be accurate, singular, and respectfully handled

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Contact Management | [cdm-contact-management.md](./cdm-contact-management.md) | Create and maintain person records with full profile and relationship context |
| Account Management | [cdm-account-management.md](./cdm-account-management.md) | Maintain organization records, hierarchies, and contact associations |
| Activity Timeline | [cdm-activity-timeline.md](./cdm-activity-timeline.md) | Chronological record of every interaction on a contact, account, or deal |
| Data Import & Export | [cdm-data-import-export.md](./cdm-data-import-export.md) | Bulk load, update, and extract records with mapping and error handling |
| Deduplication & Data Quality | [cdm-deduplication-data-quality.md](./cdm-deduplication-data-quality.md) | Detect, prevent, and merge duplicates; validate data at entry |
| Segmentation & Lists | [cdm-segmentation-lists.md](./cdm-segmentation-lists.md) | Saved filters, lists, and segments over any record type |

## Success Criteria
- Any user can answer "who is this and what is our history with them" from one screen
- A new data consumer (report, campaign, integration) needs no cleanup project first
- Duplicate rate stays low without periodic manual purges
- Customers are never asked for information the organization already holds

## Rules
- One record per real-world person and per real-world organization is the target state
- Every interaction capability (email, call, meeting, case, deal) must write to the activity timeline
- Data quality is enforced at entry (validation, dedupe checks), not only by later cleanup
- Personal data handling must respect consent, retention, and erasure obligations

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: Platform Administration (identity, permissions, customization)
- Enables: Sales Force Automation, Marketing Automation, Customer Service, Analytics & Reporting
- Related: Integration & Extensibility (sync sources feeding these records)

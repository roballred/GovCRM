---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Contact Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must maintain a record for each person the business interacts with — identity, contact details, role, communication preferences, and links to their organization, deals, and cases.

## Personas
- **Sales Representative** — creates and consults contacts daily
- **Support Agent** — identifies the caller and their history
- **Customer** — the record subject; expects accuracy and consent handling

## Behaviors
- Create, edit, and archive contact records with standard and custom fields
- Associate a contact with one or more accounts and record their role
- Record communication preferences and consent status (email, phone, SMS)
- Show all related records (deals, cases, campaigns, activities) on the contact page
- Track ownership so every contact has a responsible user
- Search contacts by any field, with recently viewed shortcuts

## Rules
- A contact must be uniquely identifiable; suspected duplicates are flagged at creation
- Consent and opt-out status must be respected by every outbound capability
- Archiving preserves history; hard deletion follows the retention policy in Data Administration

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-deduplication-data-quality, pa-customization
- Enables: sfa-lead-management, ma-email-marketing, cs-case-management
- Related: cdm-account-management, cdm-activity-timeline

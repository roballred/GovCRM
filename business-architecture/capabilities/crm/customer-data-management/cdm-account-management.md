---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Account Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (accounts / companies / organizations); not validated with any real organization.

## What It Does
The system must maintain a record for each organization the business deals with, including firmographic detail, associated contacts, parent/subsidiary hierarchy, and the full commercial relationship (deals, cases, revenue).

## Personas
- **Account Manager** — works from the account record as their home page
- **Sales Representative** — qualifies and plans within account context
- **Sales Operations Analyst** — reports revenue and coverage by account and hierarchy

## Behaviors
- Create, edit, and archive account records with firmographic and custom fields
- Link contacts to accounts with roles; handle contacts spanning multiple accounts
- Model parent/subsidiary hierarchies and roll related records up the hierarchy
- Show aggregated relationship data: open deals, open cases, lifetime revenue, recent activity
- Track account ownership and support team-based access

## Rules
- Deals and cases must belong to an account (directly or via their contact) so relationship rollups are complete
- Hierarchy rollups must be explicit about which levels they include
- Account merges preserve all related records and history

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-contact-management
- Enables: sfa-opportunity-management, cs-case-management, ar-sales-analytics
- Related: cdm-activity-timeline, cdm-deduplication-data-quality

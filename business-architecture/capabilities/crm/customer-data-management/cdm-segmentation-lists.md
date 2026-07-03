---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Segmentation & Lists

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (lists / views / segments / target lists); not validated with any real organization.

## What It Does
The system must let users define reusable, criteria-based subsets of any record type — saved views for daily work, static lists for one-off effort, and dynamic segments that update as data changes.

## Personas
- **Marketing Manager** — builds campaign audiences without exports
- **Sales Manager** — slices pipeline and accounts by team, region, or status
- **Sales Representative** — works from personal filtered views

## Behaviors
- Build filters over standard and custom fields with AND/OR logic
- Save filters as named, shareable views and lists
- Support dynamic segments (membership updates automatically) and static lists (frozen membership)
- Use any segment or list as input to campaigns, bulk actions, and reports
- Show list membership on the record ("which segments is this contact in")

## Rules
- Segment results respect the viewing user's record permissions
- Dynamic segment criteria are inspectable — membership must be explainable
- Bulk actions on a list are subject to the same rules as single-record actions

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-contact-management, cdm-account-management, cdm-deduplication-data-quality
- Enables: ma-campaign-management, ma-email-marketing, wa-workflow-rules (audience triggers)
- Related: ar-custom-reports

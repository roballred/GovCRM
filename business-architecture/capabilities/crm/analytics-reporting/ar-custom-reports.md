---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Custom Reports

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must let non-developers build, save, schedule, and share reports over any record type — filters, groupings, aggregates, and cross-object joins — so answering a new question does not require an engineer or an export.

## Personas
- **Sales Operations Analyst** — power user; builds the shared report library
- **Sales Manager / Support Manager** — self-serve variations on standard questions
- **Marketing Manager** — campaign and lead-flow reporting

## Behaviors
- Build reports over standard and custom objects with filters, groups, and aggregates
- Report across related records (e.g. accounts with their open cases and pipeline)
- Save, organize, and share reports with permission-aware visibility
- Schedule report delivery by email/export
- Export results to standard formats
- Start from a library of prebuilt report templates

## Rules
- Reports run under the viewer's permissions — shared report, personal scope
- Saved reports are owned and curatable — sprawl is managed, not inevitable
- A report's filters and definitions are visible to its consumers

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-customization (custom fields are reportable), cdm record capabilities
- Enables: ar-dashboards (reports as data sources)
- Related: cdm-data-import-export, ar-sales-analytics

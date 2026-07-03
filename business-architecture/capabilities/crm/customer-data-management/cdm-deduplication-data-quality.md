---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Deduplication & Data Quality

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must keep the customer dataset trustworthy: prevent duplicates at entry, find existing ones, merge them safely, and enforce field-level validation so records stay complete and consistent.

## Personas
- **CRM Administrator** — configures matching rules and runs merge operations
- **Marketing Manager** — needs clean, deduplicated audiences
- **Sales Representative** — harmed by (and a source of) duplicates
- **Customer** — expects one accurate record of themselves, not three conflicting ones

## Behaviors
- Warn on probable duplicates at record creation and during import
- Scan existing data for duplicate candidates with configurable matching rules
- Merge duplicate records, preserving all related activities, deals, and cases
- Enforce field validation rules (formats, required fields, allowed values)
- Report data-quality metrics (completeness, duplicate rate) over time

## Rules
- Merges are non-destructive to history: related records re-point, nothing is orphaned
- Matching rules are configurable per record type, not hard-coded
- Validation applies identically across UI, import, and API entry paths

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-customization (validation rule definitions)
- Enables: cdm-segmentation-lists, ma-lead-scoring, ar-custom-reports (trustworthy inputs)
- Related: cdm-data-import-export, cdm-contact-management

---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Data Import & Export

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must let users bulk-load, bulk-update, and extract records through guided file-based workflows, so data can enter from legacy systems and leave for analysis without engineering involvement.

## Personas
- **CRM Administrator** — runs migrations and recurring imports
- **Marketing Manager** — imports event/list data; exports segments
- **Sales Operations Analyst** — extracts data for analysis beyond built-in reports

## Behaviors
- Import records from delimited files with field mapping, preview, and validation
- Detect and resolve duplicates during import (skip, update, or merge)
- Bulk-update existing records via keyed import
- Report import errors row-by-row with a correctable error file
- Export any record type, filtered list, or report to standard formats
- Track import history: who loaded what, when, with rollback of a bad batch where feasible

## Rules
- Imports run the same validation and dedupe rules as manual entry — no side door for bad data
- Export permission is a distinct, auditable privilege (bulk data leaves the system)
- Every import batch is attributable and traceable in the audit log

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-deduplication-data-quality, pa-user-role-management
- Enables: onboarding/migration onto the platform; external analysis
- Related: pa-data-administration, ix-api-webhooks

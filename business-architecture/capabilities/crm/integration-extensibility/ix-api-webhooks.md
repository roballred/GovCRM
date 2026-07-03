---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: APIs & Webhooks

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must expose documented APIs for programmatic read/write of all record types (standard and custom) and push record events to external systems via webhooks, so the CRM composes with the rest of the business's systems.

## Personas
- **CRM Administrator** — issues and governs API credentials
- **Sales Operations Analyst** — commissions integrations with adjacent systems (billing, ERP, BI)
- **Customer** — indirectly: integrations are why they only have to say things once

## Behaviors
- Provide documented REST-style APIs covering CRUD on all objects, including custom ones
- Authenticate via scoped, named, revocable credentials (OAuth-style)
- Enforce and publish rate limits; fail informatively
- Emit webhook events on record create/update/delete with configurable payloads and retries
- Version APIs with deprecation windows
- Log API access and changes attributably (see pa-audit-logging)

## Rules
- Everything the UI can do to data, the API can do — no UI-only data operations
- API writes obey the same validation, dedupe, and permission rules as the UI
- Credentials are scoped to least privilege and individually revocable

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-security-controls, pa-customization (custom objects surfaced)
- Enables: ix-app-marketplace apps, external system integration, wa-workflow-rules webhook actions
- Related: cdm-data-import-export (bulk vs. transactional movement)

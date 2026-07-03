---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Lead Capture Forms

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (web-to-lead, forms, LeadBooster, marketing forms); not validated with any real organization.

## What It Does
The system must turn website and landing-page visitors into lead records: build forms without code, embed them anywhere, and flow submissions directly into lead management with source attribution and consent capture.

## Personas
- **Marketing Manager** — builds and places forms; owns conversion rates
- **Sales Representative** — receives form-sourced leads with context
- **Customer** — submits the form; expects it to count as "telling the organization once"

## Behaviors
- Build forms field-by-field mapped to lead/contact fields, without code
- Embed forms on external sites and hosted landing pages
- Create or update lead records on submission, with dedupe against existing records
- Capture source, page, campaign, and consent at submission time
- Trigger follow-up automation (routing, notification, nurture) on submission
- Protect against spam submissions

## Rules
- Every form captures explicit consent state alongside the data
- Submissions dedupe against existing records rather than blindly creating leads
- Attribution captured at submission is immutable afterward

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-deduplication-data-quality
- Enables: sfa-lead-management, ma-campaign-management (response capture)
- Related: wa-workflow-rules, ma-lead-scoring

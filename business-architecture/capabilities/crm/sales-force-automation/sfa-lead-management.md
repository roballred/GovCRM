---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Lead Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must capture prospective-customer records from any source, support qualification, route them to the right owner, and convert qualified leads into contacts, accounts, and opportunities without re-keying.

## Personas
- **Sales Representative** — qualifies and converts assigned leads
- **Marketing Manager** — feeds leads in and owns pre-qualification nurture
- **Sales Manager** — sets routing rules and monitors follow-up discipline

## Behaviors
- Create leads manually, from imports, from forms, and via API
- Record lead source and campaign attribution at capture time
- Assign leads by configurable routing rules (round-robin, territory, criteria)
- Track qualification status through a defined lead lifecycle
- Convert a qualified lead into contact + account + opportunity, carrying all history
- Disqualify with a reason code, preserving the record for analysis

## Rules
- No lead sits unowned: routing must always resolve to a responsible user or queue
- Conversion never re-keys data — everything captured on the lead carries forward
- Disqualified leads are kept (with reasons) — they are data, not garbage

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-contact-management, ma-lead-capture-forms
- Enables: sfa-opportunity-management
- Related: ma-lead-scoring, wa-workflow-rules, wa-sales-sequences

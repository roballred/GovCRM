---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Calendar Integration

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must sync with users' calendars two-way, log customer meetings onto the relevant records automatically, and let customers book time via scheduling links that respect real availability.

## Personas
- **Sales Representative** — meetings logged without effort; booking links cut scheduling ping-pong
- **Account Manager** — recurring customer touchpoints visible on account history
- **Customer** — books a meeting in two clicks instead of five emails

## Behaviors
- Two-way sync of events between the CRM and Google/Microsoft calendars
- Match meetings with customer participants onto their contact/account/deal records
- Offer shareable booking links honoring live availability and buffer rules
- Create CRM activities from booked meetings automatically, including form-captured context
- Respect private events — sync visibility is user-controlled

## Rules
- Personal/private events never surface in CRM beyond busy/free state
- A booked meeting always resolves to a CRM activity on an identified or newly created contact
- Cancellations and reschedules propagate both ways without duplication

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-security-controls (credentials, consent)
- Enables: sfa-task-activity-management, cdm-activity-timeline
- Related: ix-email-integration

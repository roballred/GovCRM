---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Activity Timeline

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must present a chronological, unified history of every interaction — emails, calls, meetings, notes, cases, deal events — on each contact, account, and deal, assembled automatically wherever possible.

## Personas
- **Sales Representative** — reviews the timeline before every touch
- **Account Manager** — relies on the timeline to survive rep handoffs
- **Support Agent** — sees prior interactions without asking the customer

## Behaviors
- Aggregate logged and auto-captured activities (email, calendar, calls) into one ordered stream
- Roll activities up from contacts to their account and related deals
- Support manual notes and file attachments as timeline entries
- Filter the timeline by activity type, participant, and date range
- Show upcoming (planned) activities alongside history

## Rules
- Automatic capture is the default; manual logging is the fallback, not the plan
- Timeline entries are attributable (who, when, via what channel) and not silently editable
- Visibility of timeline entries respects record-level permissions

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: ix-email-integration, ix-calendar-integration, ix-telephony-integration
- Enables: sfa-task-activity-management, ar-ai-insights
- Related: cdm-contact-management, cdm-account-management, pa-audit-logging

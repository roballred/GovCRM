---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Telephony Integration

**Validation Status: [UNVERIFIED] Assumed** — present in 6/7 surveyed platforms (Open CTI/Dialer, HubSpot calling, Teams telephony, Zoho PhoneBridge, Pipedrive Caller, Freshsales built-in phone; Sugar via marketplace only); not validated with any real organization.

## What It Does
The system must connect voice calling to customer records: click-to-call from any phone number field, automatic call logging with duration and outcome, inbound screen-pop of the caller's record, and recording where lawful and configured.

## Personas
- **Sales Representative** — calls from records; calls log themselves
- **Support Agent** — sees who is calling and their history before answering
- **Support Manager** — call volumes and outcomes feed service metrics

## Behaviors
- Click-to-call from any phone field via built-in or connected telephony
- Log calls automatically with timestamp, duration, direction, and disposition
- Pop the matching contact/account/case on inbound calls
- Record calls where enabled, with consent handling, attached to the activity
- Support post-call wrap-up: notes, outcome codes, follow-up task creation

## Rules
- Call recording follows configured consent/notification rules per jurisdiction — off by default
- Every connected call resolves to an activity on a record; unmatched calls queue for triage
- Telephony provider choice is pluggable; the logging model is not

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-security-controls (consent configuration)
- Enables: cdm-activity-timeline completeness, cs-omnichannel-support phone channel
- Related: ix-mobile-apps, sfa-task-activity-management

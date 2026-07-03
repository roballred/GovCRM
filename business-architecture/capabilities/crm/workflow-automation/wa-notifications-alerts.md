---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Notifications & Alerts

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must tell the right person when something needs them — new assignments, approaching SLAs, stalled deals, mentions, threshold breaches — through in-app, email, and mobile channels, under user-controllable preferences.

## Personas
- **Sales Representative** — assignment, reminder, and deal-signal alerts
- **Support Agent** — new case and SLA-timer alerts
- **Sales Manager / Support Manager** — exception and escalation alerts
- **CRM Administrator** — automation-failure and system alerts

## Behaviors
- Notify on assignment, ownership change, and @-mentions
- Alert on rule-defined events and thresholds (stalled deal, SLA at risk, big deal won)
- Deliver in-app, by email, and by mobile push per user preference
- Digest low-urgency notifications; deliver high-urgency ones immediately
- Deep-link every notification to the record and action it concerns

## Rules
- Users control channel and frequency per notification type — within admin-set floors for critical alerts
- Every notification links to its subject — no context-free pings
- Notification pressure is measurable; alert fatigue is a monitored failure mode

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: wa-workflow-rules (event source)
- Enables: timely action on cs-sla-management, sfa-pipeline-management signals
- Related: ix-mobile-apps, ix-email-integration

---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Task & Activity Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must let sellers plan, schedule, and track their work — tasks, calls, meetings, follow-ups — attached to the records they concern, so nothing owed to a customer is forgotten.

## Personas
- **Sales Representative** — plans the day from their task list
- **Account Manager** — schedules recurring relationship touchpoints
- **Sales Manager** — sees follow-up discipline across the team

## Behaviors
- Create tasks and schedule calls/meetings linked to contacts, accounts, deals, or cases
- Set due dates, priorities, and reminders
- Present a consolidated "my activities" view across all record types
- Mark activities complete, feeding the activity timeline automatically
- Support recurring activities and follow-up chains

## Rules
- Every activity links to at least one CRM record — orphan tasks defeat the purpose
- Completed activities become immutable timeline entries
- Overdue activities are surfaced, not silently buried

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-activity-timeline, ix-calendar-integration
- Enables: wa-sales-sequences (sequences generate activities)
- Related: wa-notifications-alerts, ix-mobile-apps

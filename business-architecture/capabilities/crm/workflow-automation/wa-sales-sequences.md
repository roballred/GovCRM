---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Sales Sequences

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (Sales Engagement cadences, HubSpot Sequences, Dynamics sequences, Zoho Cadences, Freshsales sequences; Pipedrive via Automations, Sugar via Sugar Market); not validated with any real organization.

## What It Does
The system must run multi-step, multi-day outreach cadences — emails, call tasks, reminders — that enroll contacts or leads, execute steps on schedule, and exit automatically when the person replies or converts.

## Personas
- **Sales Representative** — enrolls prospects and works generated steps
- **Sales Manager** — standardizes proven cadences across the team
- **Marketing Manager** — coordinates so sequences and campaigns don't collide

## Behaviors
- Define sequences of timed steps: automated emails, call tasks, manual to-dos
- Enroll individuals or list/segment members; cap concurrent enrollments per contact
- Execute steps on schedule, generating tasks and sends automatically
- Exit on reply, meeting booked, conversion, opt-out, or manual removal
- Report per-step and per-sequence performance (reply, conversion, drop-off)
- Share sequence templates across the team

## Rules
- A person is in at most a bounded number of sequences at once; collisions are prevented
- Any reply or opt-out halts automated steps immediately
- Sequence sends respect the same consent rules as ma-email-marketing

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: ix-email-integration, sfa-task-activity-management
- Enables: consistent follow-up in sfa-lead-management
- Related: ma-email-marketing, wa-workflow-rules

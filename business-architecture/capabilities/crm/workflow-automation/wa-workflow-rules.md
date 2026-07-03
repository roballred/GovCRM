---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Workflow Rules

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (Flow, HubSpot workflows, Power Automate, Zoho workflows, Pipedrive Automations, Freshsales workflows, SugarBPM); not validated with any real organization.

## What It Does
The system must let admins define trigger → condition → action rules without code: when a record is created or changed (or time elapses), evaluate conditions, then update fields, create tasks, send emails, assign owners, or call external systems.

## Personas
- **CRM Administrator** — builds and maintains the rule inventory
- **Sales Manager / Support Manager** — specify the processes rules encode
- **Sales Representative** — experiences rules as time saved or friction added

## Behaviors
- Trigger on record create/update, field changes, and time-based conditions
- Evaluate multi-condition logic before acting
- Execute actions: field updates, task creation, email sends, owner assignment, webhook calls
- Chain steps into multi-stage flows with branching
- Test rules before activation; version and deactivate them safely
- Log every execution with trigger, evaluation result, and actions taken

## Rules
- Rule executions are fully logged and attributable (see pa-audit-logging)
- Rules have named owners and descriptions — orphan automation is configuration debt
- Cascade depth is limited; rules triggering rules is bounded and visible

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-customization, pa-audit-logging
- Enables: sfa-lead-management routing, cs-case-management routing, ma nurture flows
- Related: wa-notifications-alerts, wa-approval-processes, ix-api-webhooks

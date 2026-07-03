---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Workflow & Automation

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); not validated with any real organization.

## What It Does
The system must automate the repetitive connective tissue of CRM work: trigger-based rules that act on record changes, structured approval flows, notifications that reach the right person at the right time, and multi-step outreach sequences. Automation is what turns documented process into enforced process.

## Personas
- **CRM Administrator** — authors and maintains all automation; owns its debuggability
- **Sales Manager** — relies on routing, alerts, and approvals to enforce process
- **Sales Representative** — beneficiary (time saved) and subject (process enforced)
- **Support Manager** — case routing and escalation policy

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Workflow Rules | [wa-workflow-rules.md](./wa-workflow-rules.md) | Trigger → condition → action automation on record events |
| Approval Processes | [wa-approval-processes.md](./wa-approval-processes.md) | Structured multi-step approvals with delegation and audit |
| Notifications & Alerts | [wa-notifications-alerts.md](./wa-notifications-alerts.md) | Event- and threshold-driven notifications across channels |
| Sales Sequences | [wa-sales-sequences.md](./wa-sales-sequences.md) | Multi-step, multi-channel outreach cadences with exit conditions |

## Success Criteria
- Routine handoffs (lead routing, case assignment, follow-up creation) happen without human dispatching
- Approvals complete in hours, not days, with a full audit trail
- Automation behavior is explainable: an admin can answer "why did this record change" in minutes
- Notification volume stays useful — people act on alerts instead of filtering them out

## Rules
- Every automated change is attributed to its rule in the audit log — no anonymous automation
- Automations are inventoried, documented, and deactivatable individually
- Automation failures surface to an owner; silent failure is a defect
- Recursion and cascade limits protect the system from self-inflicted loops

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: Platform Administration (configuration authority), Customer Data Management (events)
- Enables: process consistency across Sales Force Automation, Marketing Automation, Customer Service
- Related: Analytics & Reporting (threshold triggers), Integration & Extensibility (webhook actions)

---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: SLA Management

**Validation Status: [UNVERIFIED] Assumed** — present in 6/7 surveyed platforms (entitlements, SLA policies, escalation rules; absent in Pipedrive); not validated with any real organization.

## What It Does
The system must apply response- and resolution-time targets to cases based on priority, customer tier, or contract; run visible timers against them; and escalate automatically when targets are at risk or breached.

## Personas
- **Support Manager** — defines SLA policies and answers for attainment
- **Support Agent** — works against visible, fair timers
- **Account Manager** — relies on contractual SLAs being honored for their accounts

## Behaviors
- Define SLA policies with targets by priority, tier, channel, or contract
- Apply the right policy automatically when a case is created or reclassified
- Display countdown/elapsed timers on the case; pause when waiting on the customer
- Escalate (notify, reassign, raise priority) on at-risk and breached targets
- Report attainment by team, agent, category, and account

## Rules
- SLA clock rules (business hours, pause conditions) are explicit and consistently applied
- Breaches are recorded permanently — no retroactive editing of SLA outcomes
- Escalation always lands on an accountable owner, not a broadcast

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cs-case-management
- Enables: contractual service commitments; cs-omnichannel-support consistency
- Related: wa-notifications-alerts, wa-workflow-rules, pa-audit-logging

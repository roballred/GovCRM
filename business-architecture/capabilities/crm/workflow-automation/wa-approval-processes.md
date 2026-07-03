---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Approval Processes

**Validation Status: [UNVERIFIED] Assumed** — present in 5/7 surveyed platforms (Salesforce, HubSpot quote approvals, Dynamics via Power Automate, Zoho, SugarBPM; absent native in Pipedrive and Freshsales); not validated with any real organization.

## What It Does
The system must route records that exceed defined thresholds — discounts, credits, non-standard terms — through structured approval chains, recording who approved what, when, and why, before the action proceeds.

## Personas
- **Sales Manager** — approves discounts and exceptions for their team
- **Sales Representative** — submits and tracks approval requests
- **CRM Administrator** — configures chains, thresholds, and delegation

## Behaviors
- Define approval chains by criteria (amount, discount %, record type, region)
- Submit records into approval automatically on threshold breach or manually
- Notify approvers with context; support approve/reject with comments
- Support delegation and escalation when approvers are unavailable
- Lock relevant record fields while approval is pending
- Record the full approval history on the record

## Rules
- Approval history is immutable and attributable
- Pending approval blocks the gated action — no proceed-then-ask
- Delegation is explicit and time-bound, never silent

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: wa-workflow-rules (trigger mechanics), pa-user-role-management (who may approve)
- Enables: controlled discounting in sfa-quote-product-management
- Related: wa-notifications-alerts, pa-audit-logging

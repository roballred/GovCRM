---
validation: UNVERIFIED
basis: sourced-from-govcore
date: 2026-07-03
---

# Capability: Support Access

**Validation Status: [UNVERIFIED] Assumed** — sourced from GovCore (`@govcore/support`: break-glass + act-as sessions); not validated with any real operator.

## What It Does
The system must let the instance operator help a tenant without normalizing surveillance: exceptional, explicit, time-boxed access into an organization's data (break-glass) and scoped act-as sessions for reproducing a user's problem — every second of it audited.

## Personas
- **Instance Operator** *(persona to be written)* — uses it rarely, under scrutiny
- **CRM Administrator** — the tenant-side stakeholder who must be able to see that access happened
- **Customer** — the reason the bar is high: their data is only exceptionally visible to the operator

## Behaviors
- Elevate into a tenant via an explicit break-glass session with a stated reason
- Start act-as sessions bound to a target user, with a default TTL and enumerated end reasons
- Audit session start, every action taken inside, and session end — immutably
- Auto-expire sessions; allow early termination
- Make support access visible to the affected organization's admins

## Rules
- No standing cross-tenant read access exists; all operator content access flows through a session with a reason
- Sessions are time-boxed by default and cannot be silently extended
- The audit trail of a support session is immutable and tenant-visible

## Implementation Status
Planned — `@govcore/support` ships the session machinery (break-glass + act-as, TTL, end reasons); GovCRM has not yet wired its console surfaces.

## Links
- Depends on: po-instance-administration, po-multi-tenancy
- Enables: operable support without eroding tenant trust
- Related: pa-audit-logging, pa-security-controls

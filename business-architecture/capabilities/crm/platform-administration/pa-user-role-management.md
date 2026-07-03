---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: User & Role Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must manage user accounts and what they may see and do: role-based permission sets, record-level access scoping (own / team / all), team structures, and clean activation/deactivation.

## Personas
- **CRM Administrator** — creates, modifies, and deactivates users and roles
- **Sales Manager / Support Manager** — request access mapped to team structure
- **Executive Sponsor** — accountable that access maps to responsibility

## Behaviors
- Create, edit, deactivate, and reactivate user accounts from the UI
- Assign roles bundling object- and action-level permissions
- Scope record visibility (own, team, territory, all) per role
- Model team/reporting structures used for pipeline and queue rollups
- Reassign a departing user's records in bulk
- Review who has what access, and why, on demand

## Rules
- Deactivation preserves the user's history and record attributions
- Every permission grant is attributable (who granted, when)
- At least one administrator must always remain — the last admin cannot be removed

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-security-controls (authentication)
- Enables: all record-level permission behavior across the system
- Related: pa-audit-logging, cdm record ownership

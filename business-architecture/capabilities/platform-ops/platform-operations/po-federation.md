---
validation: UNVERIFIED
basis: sourced-from-govcore
date: 2026-07-03
---

# Capability: Federation

**Validation Status: [UNVERIFIED] Assumed** — sourced from GovCore (`@govcore/federation`: org connections, cross-org links, visibility) and govEA's multi-org group; 0/7 in the CRM vendor scan — this is a differentiator, not a market-common capability. Not validated with any real organization.

## What It Does
The system must let organizations on the same instance opt into connections with each other and share selected content across them — e.g. a state-level org publishing shared account or capability data that county-level orgs link to — while ownership never transfers and single-org installs stay untouched.

## Personas
- **CRM Administrator** — approves connections and controls what their org shares
- **Executive Sponsor** — the cross-org visibility case (e.g. shared constituent/vendor records across agencies)
- **Instance Operator** *(persona to be written)* — oversees the connection fabric

## Behaviors
- Propose, accept, and reject org-to-org connections (pending/active/rejected lifecycle)
- Mark content visibility as org / connections / instance
- Request, approve, and reject cross-org links between records, with the link lifecycle audited
- Show read-only remote detail for linked cross-org records
- Keep all federation surfaces invisible for orgs with no connections

## Rules
- Federation is opt-in from both sides; no org can be forced into a connection
- Content ownership never transfers across org boundaries
- Cross-org visibility is enforced by the same query-helper layer everywhere — no ad-hoc joins across tenants

## Implementation Status
Planned — `@govcore/federation` ships connections, visibility helpers, and the link lifecycle; GovCRM defines no entity-specific link semantics yet (which CRM record types federate is an open product decision requiring validated personas).

## Links
- Depends on: po-multi-tenancy
- Enables: cross-agency sharing scenarios (differentiator)
- Related: po-instance-administration, cdm-account-management

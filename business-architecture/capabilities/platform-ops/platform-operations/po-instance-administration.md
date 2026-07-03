---
validation: UNVERIFIED
basis: sourced-from-govcore
date: 2026-07-03
---

# Capability: Instance Administration

**Validation Status: [UNVERIFIED] Assumed** — sourced from GovCore (`@govcore/nextkit` instance console, `instanceSettings`/`platformConfig` tables) and govEA's `iam-instance-administration`; not validated with any real operator.

## What It Does
The system must give the instance operator a cross-organization console: inventory of tenants and users, platform configuration, org lifecycle (create, suspend), and the platform audit view — a separate operating plane from org-scoped administration.

## Personas
- **Instance Operator** *(persona to be written)* — runs the shared deployment
- **CRM Administrator** — counterpart on the tenant side; escalates to the operator for cross-org matters

## Behaviors
- Present a cross-org console: organizations, users, memberships, recent platform audit events
- Hold `instance_admin` as an instance-scoped role stored separately from org-scoped roles
- Create organizations and their initial admin accounts from the console
- Suspend and reinstate organizations without destroying their data
- Manage instance-wide settings and platform configuration

## Rules
- `instance_admin` grants platform operations, not automatic ownership of tenant content — content access goes through po-support-access
- Every instance-scoped action is audited with the operator's identity
- The console is gated in middleware (`instanceOnlyPaths`), not just in page code

## Implementation Status
Planned — the app scaffold ships a first `/instance` console (orgs, users, memberships, audit) on `@govcore/nextkit` components, gated by `@govcore/middleware`. Org lifecycle actions (create/suspend from the console) are not yet wired.

## Links
- Depends on: po-multi-tenancy
- Enables: tenant onboarding; operator accountability
- Related: po-support-access, pa-audit-logging

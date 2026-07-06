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
Partially implemented — the `/instance` console now has real routes with list and edit views: organizations (inventory with user counts, create with auto-slug, rename), users (cross-org inventory, create with org/role/initial password/instance-admin grant, edit role/active/instance-admin), a full audit browser (latest 50, actors and orgs resolved to names), and a support-sessions view. All mutations run on the privileged operator pool, are gated to `instance_admin` (middleware + layout + per-action), and are audited (`platform.*` events). Guards shipped: last-active-org-admin cannot be demoted or deactivated; an operator cannot remove their own instance-admin role. **Not yet wired:** org suspension (no core column — GovCore's `organizations.metadata` is the extension point) and deletion; user password reset; pagination on list views.

## Links
- Depends on: po-multi-tenancy
- Enables: tenant onboarding; operator accountability
- Related: po-support-access, pa-audit-logging

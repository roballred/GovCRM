---
validation: UNVERIFIED
basis: sourced-from-govcore
date: 2026-07-03
---

# Capability: Platform Operations

**Validation Status: [UNVERIFIED] Assumed** — sourced from the GovCore platform plane and govEA precedent (`iam-instance-administration`, multi-org), not from the CRM vendor scan; not validated with any real operator.

## What It Does
The system must be operable as a **multi-tenant instance**: multiple organizations share one deployment with database-enforced isolation, an instance operator can administer tenants and users across org boundaries with full auditability, and organizations can optionally connect and share selected content. This module is the SaaS-operator plane — invisible to the CRM personas when it works, existential when it doesn't.

## Personas
- **CRM Administrator** — org-scoped admin; interacts with this plane at tenant boundaries (org settings, escalations to the operator)
- **Instance Operator** *(persona not yet written — see Rules)* — runs the shared instance: tenant lifecycle, cross-org support, platform configuration
- **Customer** — indirect: tenant isolation is why their data never leaks to another organization

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Multi-Tenancy | [po-multi-tenancy.md](./po-multi-tenancy.md) | Organizations, memberships, active-org resolution, DB-enforced isolation |
| Instance Administration | [po-instance-administration.md](./po-instance-administration.md) | Cross-org operator console: tenant lifecycle, users, platform config |
| Support Access | [po-support-access.md](./po-support-access.md) | Audited break-glass elevation and time-boxed act-as sessions |
| Federation | [po-federation.md](./po-federation.md) | Opt-in org connections and cross-org content visibility/linking |

## Success Criteria
- A cross-org data leak is impossible at the database layer, not just the application layer
- The operator can answer "which tenants exist, who administers them, what happened when" from the console
- Support access to tenant data is exceptional, time-boxed, and fully audited — never routine
- Single-org installs work identically with the federation surface invisible

## Rules
- Tenant isolation is enforced by Postgres RLS with a transaction-local org GUC — application-level filtering is defense in depth, never the only barrier
- Instance-operator power is a separate role from org-scoped admin and must not silently expand into tenant content ownership
- All operator and support actions are audited immutably
- An **Instance Operator persona** must be written and validated before this module drives UI priorities beyond what `@govcore/nextkit` ships

## Implementation Status
Planned — GovCRM consumes this plane from `@govcore/*` (schema, tenancy, rbac, auth, middleware, server, support, federation, nextkit) rather than building it. The app scaffold wires tenancy, auth, RBAC, audit, and the instance console; support-access and federation surfaces are not yet wired.

## Links
- Depends on: — (root platform plane; provided by GovCore)
- Enables: crm/platform-administration (pa-user-role-management, pa-security-controls, pa-audit-logging run on this plane), every crm/ capability group
- Related: docs/design/govcore-fit-gap.md (build list and boundary)

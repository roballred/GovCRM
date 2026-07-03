---
validation: UNVERIFIED
basis: sourced-from-govcore
date: 2026-07-03
---

# Capability: Multi-Tenancy

**Validation Status: [UNVERIFIED] Assumed** — sourced from the GovCore platform plane (`@govcore/schema`, `@govcore/tenancy`, `@govcore/server`); not validated with any real operator.

## What It Does
The system must host multiple organizations on one deployment with hard isolation: each org's users, CRM records, and audit history are invisible to every other org, enforced at the database layer, with users resolved to an active organization on every request.

## Personas
- **CRM Administrator** — administers exactly their own organization; isolation is the boundary of their power
- **Customer** — their data lives in one tenant and never leaks across
- **Sales Representative / Support Agent** — work entirely inside the active org without ever seeing the seams

## Behaviors
- Create organizations with platform-owned identity (id, name, slug) and app-owned settings sidecar
- Bind users to organizations through memberships; resolve one active org per session
- Scope every domain table to an organization (`orgScoped`) and enforce isolation with Postgres RLS + a transaction-local org GUC
- Run all tenant data access inside a tenant transaction that sets the org context from the trusted session, never from request input
- Operate the database under a two-role split: owner role for migrations, non-owner runtime role subject to RLS

## Rules
- RLS is FORCEd on tenant tables — even the table owner path in the app cannot bypass it
- The active organization comes from the authenticated session; no client-supplied org IDs
- Every new domain table ships with its RLS policy in the same migration

## Implementation Status
Planned — provided by `@govcore/schema` / `@govcore/tenancy` / `@govcore/server`; the app scaffold wires the tenant transaction (`createTenantActions`) for its first content type. GovCRM domain tables must add their own RLS policies as they are created.

## Links
- Depends on: — (provided by GovCore)
- Enables: every crm/ capability; po-instance-administration; po-federation
- Related: pa-security-controls, pa-audit-logging

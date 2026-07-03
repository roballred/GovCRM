---
validation: UNVERIFIED
basis: prototype-direction
date: 2026-07-03
---

# Direction — GovCRM

**Validation Status: [UNVERIFIED] Assumed** — direction set as a prototype exercise by the maintainer; no stakeholder organization has confirmed the goals.

EasyEA **Step 1 (Set the Direction)** artifact for GovCRM.

## What GovCRM Is

A free, open-source **CRM for state and local government**, built the same way GovEA was: EasyEA-governed business architecture, and the **GovCore platform plane** (`@govcore/*` from npm) for tenants, identity, and trust. GovCRM is **GovCore consumer #2** — the first consumer that isn't the app GovCore was extracted from, and therefore the real test of GovCore's "new app in under a day" value proposition.

## Business Goals

1. Prove the **EasyEA → baseline → product** pipeline end to end: the easyea-crm-baseline artifact set graduates into this repo as the governing business architecture.
2. Prove **GovCore reuse**: stand up tenancy, auth, RBAC, audit, theming, and an instance console by composition, not reimplementation, and feed friction back to GovCore as issues.
3. Produce a credible CRM foundation for government use cases (constituent/vendor relationship management), where multi-tenancy and federation are differentiators, not enterprise afterthoughts.

## Problems to Solve

- Small government bodies run constituent and vendor relationships on spreadsheets or overpriced commercial CRM seats.
- Commercial CRMs treat multi-org government structures (state ↔ county ↔ city) as an enterprise licensing problem rather than a data-sharing capability.
- Every new product rebuilds the platform plane badly; GovCRM must not.

## Method

- **Business architecture governs.** `business-architecture/` (imported from easyea-crm-baseline, plus the GovCore-sourced `platform-ops/` module) defines what GovCRM must do. All of it is `[UNVERIFIED]` — see Constraints.
- **Platform by composition.** Everything in `platform-ops/` and much of `crm/platform-administration` is consumed from `@govcore/*`. The genuine build list is `docs/design/govcore-fit-gap.md` §3.
- **First capability slice:** `cdm-contact-management` on the GovCore content engine (a `contact` content type → generated table, RLS, CRUD actions, screens), because Customer Data Management is the foundation group every other group depends on.

## Constraints and Boundaries

- **Local-only repo for now** — no GitHub remote, no CI yet. GovEA-style issue-first traceability begins when the remote exists; until then, commits carry `Capability:` footers.
- **All personas and capabilities are [UNVERIFIED].** Scaffolding the platform plane is acceptable risk (it's GovCore-proven); building CRM feature depth against unvalidated personas is not. Stakeholder validation (interviews) and an EasyEA ARB review gate feature implementation.
- **No local Postgres** on the dev machine — DB-backed verification runs against a container or in CI (same constraint as GovEA/GovCore).
- Stack is GovCore's: Next.js App Router, TypeScript, Drizzle, Postgres/RLS, Auth.js, Tailwind + `@govcore/theme`.

## Success Criteria for the Scaffold Phase

- `pnpm install && pnpm build` succeeds with `@govcore/*` consumed from npm.
- The app wires: platform schema re-export, tenancy, auth (credentials), RBAC (admin/contributor/viewer), middleware gating, the instance console, and one content-engine domain type.
- Every scaffold commit traces to a capability ID.

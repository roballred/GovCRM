# GovCRM

**A free, open-source CRM for state and local government — built on the [GovCore](https://github.com/roballred/GovCore) platform core and governed by the [EasyEA](https://github.com/roballred/EasyEA) methodology.**

GovCRM is **GovCore consumer #2** (after [GovEA](https://github.com/roballred/GovEA), the app GovCore was extracted from): tenants, identity, RBAC, audit, support access, federation, theming, and the content engine come from versioned `@govcore/*` npm packages, so this repo spends its effort on the CRM domain.

> **⚠️ Prototype status.** All personas and capabilities under `business-architecture/` are tagged **[UNVERIFIED]** — synthesized from vendor market research (via the easyea-crm-baseline prototype), not validated with any real stakeholder. Platform scaffolding proceeds on GovCore-proven ground; CRM feature depth waits for stakeholder validation and an EasyEA ARB review.

## Layout

```
GovCRM/
├── README.md / CLAUDE.md / Standards.md   ← this file; AI operating policy; EasyEA-based standards
├── capabilities.md                        ← capability summary + map (start here)
├── business-architecture/
│   ├── STYLE.md                           ← doc format standard (govEA-canonical + UNVERIFIED rules)
│   ├── personas/                          ← 10 imported personas (all [UNVERIFIED])
│   └── capabilities/
│       ├── crm-vendor-reference.md        ← reference source: capability × vendor evidence matrix
│       ├── crm/                           ← 8 market-derived groups, 40 sub-capabilities
│       └── platform-ops/                  ← GovCore-sourced operator plane (4 sub-capabilities)
├── docs/
│   ├── direction.md                       ← EasyEA Step 1: goals, method, constraints
│   ├── design/govcore-fit-gap.md          ← what GovCore provides vs. what GovCRM must build
│   └── research/crm-market-scan.md        ← market-research method + cited sources
└── apps/govcrm/                           ← Next.js app on @govcore/* (npm)
```

## Provenance

| Ingredient | Source |
|---|---|
| Business-architecture format (personas, capability groups, IDs, link vocabulary) | govEA `business-architecture/` + STYLE.md |
| CRM capability & persona content | [easyea-crm-baseline](../easyea-crm-baseline/) (7-vendor market scan, ≥5/7 inclusion rule) |
| Platform plane (`platform-ops/` + app foundation) | `@govcore/*` 0.x from npm; app modeled on GovCore's `examples/minimal-app` |
| Build/adopt boundary | `docs/design/govcore-fit-gap.md` |

## The app (`apps/govcrm`)

Next.js App Router on the GovCore stack. Wired and **verified running**: platform schema re-export, credentials auth (`@govcore/auth`), app-local RBAC (admin / contributor / viewer via `@govcore/rbac`), middleware gating, the instance console (`@govcore/nextkit`), and five CRM content types — **account, contact, lead, deal, activity** — defined as data and compiled by `@govcore/content` into RLS-bound tables with generated CRUD actions and screens, plus a dashboard, nav shell, and create forms with reference selects. Capabilities: `cdm-contact-management`, `cdm-account-management`, `sfa-lead-management`, `sfa-opportunity-management`, `sfa-task-activity-management`, `ar-dashboards` (first slices).

```bash
pnpm install
pnpm build                                          # no DB needed
podman run -d --name govcrm-pg -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 docker.io/library/postgres:16        # local database
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/govcrm_dev pnpm seed
cp apps/govcrm/.env.example apps/govcrm/.env.local  # then set AUTH_SECRET
pnpm dev                                            # sign in: admin@govcrm.test / govcrm-demo
```

Two DB invariants, both verified against the running app: the app connects as the **non-superuser runtime role** (`govcrm_app`, created by the seed) so FORCEd RLS actually applies — superusers bypass it; and **auth uses a separate owner-credentialed pool** (`AUTH_DATABASE_URL`) because the login lookup runs before any org context exists and `govcore.users` RLS requires the org GUC (GovCore gap, filed upstream).

## Working on GovCRM

Read [`CLAUDE.md`](./CLAUDE.md) (operating policy) and [`Standards.md`](./Standards.md) (EasyEA-based development standards). Short version: capabilities and personas govern what gets built; every implementation commit carries a `Capability:` footer; `@govcore/*` stays in `transpilePackages` (source-first packages); platform tables are migration-based via `govcore-migrate`, never `db:push`.

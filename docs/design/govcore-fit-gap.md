---
validation: UNVERIFIED
basis: source-inspection-of-govcore
date: 2026-07-03
---

# GovCore Fit/Gap — Platform Administration Capabilities

> **Provenance:** authored in the easyea-crm-baseline prototype (2026-07-03) and imported into GovCRM, where it serves as the adopt-vs-build boundary. §4's recommended `platform-ops/` module now exists in this repo.

**Validation Status: [UNVERIFIED] Assumed** — based on source inspection of the GovCore repo (`/Users/robbot/Repos/Claude/GovCore`) on 2026-07-03. GovCore is in active extraction; per-package maturity must be re-verified at adoption time.

## Purpose

Answers two questions for anyone building a CRM (or any domain product) from this baseline **on top of GovCore** (`@govcore/*`):

1. **Overlap** — which Platform Administration (`pa-*`) capabilities GovCore already provides, so they are adopted rather than rebuilt.
2. **Gaps** — in both directions: `pa-*` behaviors GovCore does not provide (the build list), and GovCore capabilities this baseline has no capability for (the model-extension list).

Also records the **internal overlap audit** of the baseline itself (§5).

Comparison is done at the `## Behaviors` level of each `pa-*` file against GovCore's 14 packages.

## 1. Reading GovCore correctly

GovCore owns the **platform plane** of a multi-tenant SaaS — "who can do what, in which org, and how do we prove it." Its packages split into:

- **Capability-bearing** (map to business capabilities): `rbac`, `auth`, `audit`, `backup`, `tenancy`, `federation`, `support`, `content`, `schema`
- **Plumbing / nonfunctional** (implement capabilities, no 1:1 mapping): `middleware`, `server` (tenantAction: RLS + permission gate + audit binding), `theme` (WCAG-AA), `nextkit` (presentational UI), `testing`

Plumbing packages must not be forced into the capability map — they are *how*, and the map is *what*.

**Maturity caveat:** GovCore's README describes `rbac` and `schema` as implemented and the rest as in-progress; source inspection shows substantial implementations also in `auth` (~480 lines), `backup` (~570), `content` (~2,000), `federation` (~640), `support` (~480). `@govcore/*` packages are published to npm. Verify per-package status before relying on any "Covered" cell below.

## 2. Overlap map: `pa-*` × GovCore

Legend: ✅ covered by GovCore · ◐ partial (GovCore provides machinery; behavior incomplete or app-side) · ✗ gap (build or buy).

### pa-user-role-management

| Behavior | Fit | GovCore source |
|---|---|---|
| Roles bundling object/action permissions | ✅ | `@govcore/rbac` `createRbac`; enforcement via `@govcore/server` tenantAction. Role/permission *vocabulary* stays app-local by design |
| User accounts, org membership storage | ✅ | `@govcore/schema` (`users`, `accounts`, `memberships`); `@govcore/tenancy` active-org resolution |
| Admin UI for create/edit/deactivate users | ◐ | `@govcore/nextkit` ships presentational console components; flows are app-side (GovEA keeps user management app-local) |
| Record visibility scoping *within* an org (own / team / all) | ✗ | GovCore isolates **between orgs** (RLS org GUC). CRM-style ownership/team/territory visibility inside an org is app domain |
| Team/reporting structures for rollups | ✗ | App domain |
| Bulk reassignment on departure | ✗ | App domain |
| Last-admin guard | ✗ | App-level rule in GovEA; not a core guarantee |

### pa-customization

| Behavior | Fit | GovCore source |
|---|---|---|
| Custom objects with storage/validation/lifecycle | ◐ | `@govcore/content` compiles content-type *definitions as data* into real Drizzle tables + migrations — the machinery exists, but it is developer/deploy-facing (second milestone), not runtime admin editing |
| Admin no-code custom fields, layouts, picklists | ✗ | No runtime field editor; GovEA v1 metamodel is fixed |
| Validation enforced across UI/import/API | ◐ | Content-engine validation for its types; there is no import/API surface in core to enforce against |
| Customization inventory / debt visibility | ✗ | Nothing |

### pa-security-controls

| Behavior | Fit | GovCore source |
|---|---|---|
| SSO (OIDC) + local credentials fallback | ✅ | `@govcore/auth` (Auth.js factory, SSO guard, active-membership sessions) |
| Login/logout as audited events | ✅ | `@govcore/auth` → `@govcore/audit` |
| Two-factor authentication | ✗ | Explicit roadmap item (design doc: "MFA for local credentials (#761)") — not implemented |
| Password policy, session-timeout policy knobs | ✗ | Auth.js sessions exist; policy configuration is not exposed (GovEA lists Security Settings as "Not implemented") |
| IP / network restrictions | ✗ | Nothing (deploy-layer concern today) |
| Encryption at rest | ✗ | Deployment/database concern; not a package feature |
| Privacy operations: consent, subject export, erasure | ✗ | `backup` exports whole tenants, not per-subject; no erasure workflow |
| Anomalous-access alerting | ✗ | Nothing |

### pa-audit-logging

| Behavior | Fit | GovCore source |
|---|---|---|
| Append-only, admin-proof audit log | ✅ | `@govcore/schema` immutability trigger + `@govcore/audit` typed writer; writes join the mutation's transaction (no orphan/no lost rows) |
| Before/after change capture | ✅ | `AuditEvent.before/after` JSON |
| Actor attribution | ◐ | `userId` + free-form `metadata`; no first-class "automation rule" or "integration credential" actor as `pa-audit-logging` requires — representable, not modeled |
| Config/security-setting change logging | ◐ | Writer is generic; whether settings changes are logged is app discipline |
| Access events (logins / exports / API) | ◐ | Logins ✅; export logging unverified; no API surface exists to log |
| Search/filter the log | ◐ | `listAuditForOrg` (newest-first, limit) + console views; rich search ✗ |
| "Log access is itself logged" | ✗ | Not present |
| Log retention/export for external audit | ✗ | Only via registering the audit table in backup |

### pa-data-administration

| Behavior | Fit | GovCore source |
|---|---|---|
| Whole-tenant backup/export and restore | ✅ | `@govcore/backup` registration-based JSON export/restore. Completeness = app registering every table — make that a governance rule |
| Scheduled backups | ✗ | Engine is on-demand; scheduling is ops-side |
| Recycle bin / deleted-record restore window | ✗ | Nothing |
| Retention policies (archive/purge) | ✗ | Motivation named in design doc; no engine |
| Storage consumption reporting | ✗ | Nothing |

### Adjacent capabilities worth flagging

| Baseline capability | Fit | Note |
|---|---|---|
| `ix-api-webhooks` | ✗ | GovCore/GovEA v1 are session-based; no public API, tokens, or webhooks — entire capability is a build |
| `cdm-data-import-export` | ✗ | Record-level CSV import/export is app-side (GovEA has partial CSV in-app) |
| `wa-workflow-rules` attribution rule | ◐ | The baseline's "every automated change attributed to its rule" lands on the `@govcore/audit` metadata gap above |

## 3. The build list (GovCore gaps against `pa-*`)

If this baseline were implemented on GovCore today, the platform-administration work remaining, roughly ordered by risk:

1. **2FA/MFA** (roadmap #761 — confirm before building)
2. **Privacy operations** — consent tracking, data-subject export, erasure workflow
3. **In-org record visibility model** (own/team/territory) on top of RLS org isolation
4. **Security policy surface** — password/session policy, IP restrictions
5. **Retention + recycle bin** on the data estate
6. **Runtime customization UI** (fields/layouts/picklists) — decide whether `@govcore/content` definitions-as-data is the substrate or the alternative
7. **Audit hardening** — first-class automation/integration actors, log-access logging, retention/export
8. **User-management flows** (UI + last-admin guard) over nextkit primitives

## 4. Reverse gaps: GovCore capabilities the baseline does not model

These are real capabilities GovCore provides that no file in `business-architecture/capabilities/crm/` describes. They are **correctly absent** from a *market* baseline — they describe the **SaaS-operator plane**, not what a CRM does for its users, and none would pass the ≥5/7 vendor-visible test. They become required the moment this baseline is used to *build a multi-tenant product*:

| GovCore capability | Package(s) | Baseline status | If building on GovCore |
|---|---|---|---|
| Multi-tenancy: orgs, memberships, active-org, RLS isolation | `tenancy`, `schema`, `server` | Absent (baseline implicitly single-org) | Add an operator-plane module (e.g. `capabilities/platform-ops/`), mirroring govEA's `iam-instance-administration` |
| Instance administration console | `nextkit`, `schema` (`instanceSettings`, `platformConfig`) | Absent | Same module |
| Support access: break-glass + act-as sessions (TTL'd, audited) | `support` | Absent | Same module — this is a differentiated trust capability; don't lose it |
| Cross-org federation: connections, cross-org links, org/connections/instance visibility | `federation` | Absent (0/7 in CRM market scan) | Optional module; gov-sector differentiator |
| Maintenance/instance gating | `middleware` | Absent | Ops concern; document as NFR, not capability |
| WCAG-AA theming | `theme` | Absent | Nonfunctional requirement — belongs in an NFR register, not the capability map |

**Recommended pattern:** keep the market-derived `crm/` module untouched (its evidence rule is vendor presence), and add a second L0 module `platform-ops/` sourced from GovCore/govEA rather than the vendor scan, with its own evidence note. Two modules, two provenances — matching how govEA separates `cms/` and `ea/`.

## 5. Internal overlap audit of the baseline

Checked every boundary where two capabilities could claim the same ground. All are resolved with explicit boundary language in the files:

| Pair | Boundary (as written in the files) |
|---|---|
| `pa-data-administration` ↔ `cdm-data-import-export` | Estate-level backup/retention/egress vs. user-facing record-level import/export; cross-referenced as "record-level vs. estate-level" |
| `pa-audit-logging` ↔ `cdm-activity-timeline` | System audit history vs. customer-facing interaction history; cross-referenced in both files |
| `pa-security-controls` ↔ `pa-user-role-management` | Authentication/policy vs. authorization/roles; linked as dependency, no shared behaviors |
| `pa-customization` ↔ `cdm-deduplication-data-quality` | Validation rules *defined* in customization, *enforced* by data quality; expressed as Depends on |
| `pa-security-controls` ↔ `pa-audit-logging` | Policy definition vs. event recording; security changes are declared "high-sensitivity audit events" |

**Result: no unresolved overlap** — no behavior appears under two owners; all adjacency is expressed through the Depends on / Enables / Related vocabulary.

## Verdict

- **Adopt, don't rebuild** (overlap with GovCore): role/permission machinery, local+OIDC auth with audited logins, the append-only audit writer + trigger, whole-tenant backup/restore, and the platform schema (users/orgs/memberships/sessions).
- **Biggest true gaps** if building on GovCore: 2FA, privacy operations, in-org visibility scoping, security-policy surface, retention/recycle-bin, and the entire `ix-api-webhooks` capability.
- **Model extension needed**: an operator-plane module (`platform-ops/`) to hold tenancy, instance administration, support access, and (optionally) federation — GovCore's strongest assets, which a market-derived CRM baseline structurally cannot surface.

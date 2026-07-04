# GovCRM — Project Instructions for Claude

> **Governing documents:** [`Standards.md`](./Standards.md) (EasyEA-based development standards) and [`business-architecture/`](./business-architecture/) (what GovCRM must do). [`docs/direction.md`](./docs/direction.md) records the goals and constraints. If this file conflicts with Standards.md, Standards.md governs.

## What This Is

GovCRM is a free, open-source CRM for state and local government, built on the **GovCore** platform core (`@govcore/*` from npm) — GovCore consumer #2 after GovEA. Sibling repos: `/Users/robbot/Repos/Claude/GovCore` (platform, read-only from here), `/Users/robbot/Repos/Claude/govea-app` (pattern reference, read-only from here), `/Users/robbot/Repos/Claude/easyea-crm-baseline` (the imported artifact source, now historical).

## Current State

**Scaffold phase.** Local git repo only — no GitHub remote, no CI yet. The business architecture is imported and governing; the app (`apps/govcrm`) wires the GovCore platform plane plus one domain slice (`contact` on the content engine, capability `cdm-contact-management`). Everything in `business-architecture/` is **[UNVERIFIED]** — do not deepen CRM features until personas are validated and an ARB review has run (Standards.md workflow).

## Critical Invariants (learned from GovEA/GovCore — do not rediscover these)

- **`@govcore/*` packages are source-first** (`main: ./src/index.ts`, no `dist/`) even on npm: every consumed package must be listed in `transpilePackages` in `apps/govcrm/next.config.ts`.
- **Platform tables are migration-based from day one** — `govcore-migrate` (the seed script runs it). Never apply `db:push` to `govcore.*` tables. Domain tables may use drizzle-kit migrations; every new domain table ships its RLS policy in the same migration.
- **Tenant isolation is RLS + the `app.current_org` GUC** set inside `tenantAction` transactions from the trusted session. Never accept an organization ID from request input.
- **Role vocabulary is app-local** (admin / contributor / viewer in `src/lib/rbac.ts`), supplied to `createRbac` — GovCore has no baked-in roles.
- **Next.js middleware `config.matcher` must stay inline** — an imported matcher value fails Next's static parsing.
- **The app must connect as the non-superuser runtime role (`govcrm_app`)** — superusers bypass RLS, silently disabling tenant isolation. The seed provisions the role and grants (two-role split, GovCore design §13.2). Verified: cross-org reads return 0 rows under this role.
- **Auth uses a separate owner-credentialed pool** (`AUTH_DATABASE_URL`, only consumed by `createAuth` via `authDb`): the login credentials lookup runs before any org context exists, and `govcore.users` RLS requires the org GUC — login is impossible on the runtime role. GovCore consumer gap, filed upstream.
- **Local DB runs in podman** (`podman run -d --name govcrm-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 docker.io/library/postgres:16`), then seed with the owner URL: `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/govcrm_dev pnpm seed`. `pnpm build`/typecheck need no DB.

## Traceability

Every implementation commit carries a capability footer (IDs are file stems under `business-architecture/capabilities/`):

```
feat(contacts): add contact list filtering

Capability: cdm-contact-management
```

Issue-first workflow (GovEA-style) begins when the GitHub remote exists; until then commits + this repo's docs are the record. When creating the remote: recreate govEA's label conventions only after personas are validated.

## Git

- Commit identity is repo-local **Rob Allred `<roballred@hotmail.com>`** (already configured; do not let commits land as RobBot).
- No remote yet — do not push, and do not create a GitHub repo without being asked.

## What NOT to do

- Don't modify GovCore or govea-app from this repo — file GovCore friction as GovCore issues instead.
- Don't build capabilities absent from `business-architecture/` — extend the architecture first (Standards.md).
- Don't remove or weaken `[UNVERIFIED]` markers except through actual validation evidence.
- Don't run the dev server unless asked.

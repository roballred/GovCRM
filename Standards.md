# AI-Enabled Development Standards — GovCRM

Adapted from GovEA's `Standards.md` (the same EasyEA-based standards, trimmed of GovEA-specific label registries). Where this file is silent, GovEA's Standards.md is the reference pattern.

## Core Principle

Humans lead the work. AI is a capability amplifier, not the decision maker. Humans define intent, review outputs, own tradeoffs, and are solely responsible for merge decisions.

## EasyEA-Based Product and Architecture Definition

Use the [EasyEA framework](https://github.com/roballred/EasyEA) to define what should be built before implementation starts:

- Start with direction (`docs/direction.md`): business goals, problems, principles, constraints.
- Develop personas for each distinct type of person affected; capture pain points, goals, role, critical insight.
- Derive capabilities from persona pain points and goals; define **what**, not **how**.
- Validate capabilities against the EasyEA criteria: what-not-how, stable over time, delivers business value, traceable to a persona, measurable, actionable for AI, adoption risk when applicable.
- Keep personas and capabilities living artifacts.

### Validation Status

Every persona **and capability** carries an explicit status (GovCRM extends govEA's persona-only rule because its content is synthetic):

- **[UNVERIFIED] Assumed** — synthesized without user research. May shape capability design; **must not drive feature prioritization or implementation depth** until reviewed by a human with domain knowledge. Platform scaffolding on GovCore-proven ground is the accepted exception (recorded in `docs/direction.md`).
- **Assumed** — human-drafted without direct research (govEA semantics).
- **Validated** — confirmed through at least one interview or direct observation.

### Structure and Format

Capabilities are hierarchical (module → group → sub-capability) under `business-architecture/capabilities/`; one file per persona under `business-architecture/personas/`. Format, IDs, prefixes, and link vocabulary: [`business-architecture/STYLE.md`](./business-architecture/STYLE.md). Reference sources live alongside capability files, clearly labeled, non-authoritative.

## Operating Standards

1. **Human-led execution** — a human owns scope, acceptance, and merge; AI assists.
2. **Same workflow for humans and AI** — repository, branches, commits, (and PRs/issues once the remote exists); no untracked side channels.
3. **Persona and capability traceability** — work that cannot be tied to a persona pain point, goal, or capability pauses for clarification. Implementation commits carry `Capability: <id>` footers.
4. **Issue-first development once the GitHub remote exists** — issues declare capability, persona, and acceptance criteria before code. Until then, commits and docs are the record.
5. **Testing is part of development** — every change ships appropriate tests or a written rationale; DB-backed tests run in CI/containers (no local Postgres).
6. **Review for correctness, maintainability, risk, and alignment** to persona/capability/business goal.
7. **Small, reviewable changes** — one concern per commit/PR.
8. **Security and data boundaries** — no secrets in the repo; tenant isolation invariants (RLS, trusted-session org resolution) are non-negotiable review items.
9. **AI is allowed to be wrong** — treat AI output as a draft; verify against code, tests, and docs.

## ARB Review

Before CRM feature implementation begins (beyond the platform scaffold), run an EasyEA ARB review across the capability set and record findings; high-severity findings are resolved first. ARB output is decision support, weighed by a human with real evidence — not validation.

## Draft Workflow

1. Direction (`docs/direction.md`) → 2. Personas (validate: interviews) → 3. Capabilities (validate: EasyEA criteria) → 4. ARB review → 5. Issue/commit tied to persona + capability → 6. Implement on a branch → 7. Test → 8. Review → 9. Human merges.

GovCRM is currently between steps 3 and 4: architecture imported, validation and ARB pending, platform scaffold running ahead under the recorded exception.

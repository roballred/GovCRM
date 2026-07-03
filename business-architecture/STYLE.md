# Business Architecture Documentation Style — GovCRM

This file defines the format standard for persona and capability documentation under `business-architecture/`. It follows govEA's `business-architecture/STYLE.md` (headings, link vocabulary, and naming kept exactly canonical) with the UNVERIFIED extension inherited from the [easyea-crm-baseline](../../easyea-crm-baseline/) prototype this content was imported from.

GovCRM is a **product repository** — unlike the baseline, `## Implementation Status` here is meaningful and must be kept honest ("Planned — not yet implemented" until code ships), and the govEA `Scope:` field (v1 / v2 / out of scope) may be added to group parents once release planning starts.

---

## UNVERIFIED Tagging

Imported personas and capabilities were synthesized from vendor market research and are **not yet validated with real stakeholders**. Every such file carries the status twice:

1. **Frontmatter:** `validation: UNVERIFIED`, `basis: synthetic-market-research` (or `sourced-from-govcore` for platform-ops), `date: <generation date>`
2. **Visible line under the H1:** `**Validation Status: [UNVERIFIED] Assumed** — <rationale>`

`[UNVERIFIED]` = govEA's **Assumed**, plus: it must not drive prioritization or implementation until a human with domain knowledge has reviewed it. When validated, replace both markers with `Validation Status: Validated` and record the evidence. Implementation that proceeds against UNVERIFIED content (e.g. platform scaffolding) must note the elevated risk in its commit/issue.

---

## File Templates

Persona, capability-group (L1), and sub-capability (L2) templates are exactly govEA's — see the file bodies in this repo for live examples:

- **Personas** (`personas/<slug>.md`): H1 `Persona: <Name>`, status line, then `## Role Type`, `## Who They Are`, `## Goals`, `## Pain Points`, `## Critical Insight`, `## Relevant Capabilities`.
- **Group parents** (`capabilities/<module>/<group>/<group>.md`): H1 `Capability: <Name>`, status line, then `## What It Does`, `## Personas`, `## Sub-Capabilities` (table), `## Success Criteria`, `## Rules`, `## Implementation Status`, `## Links`.
- **Sub-capabilities** (`capabilities/<module>/<group>/<prefix>-<slug>.md`): H1 `Capability: <Name>`, status line, then `## What It Does`, `## Personas`, `## Behaviors`, `## Rules`, `## Implementation Status`, `## Links`.

## Taxonomy

L0 module → L1 capability group → L2 sub-capability; L3 detail lives as `## Behaviors` bullets inside L2 files. GovCRM has **two L0 modules with different provenance**:

| Module | Provenance | Evidence rule |
|---|---|---|
| `crm/` | 7-vendor market scan (see `capabilities/crm-vendor-reference.md`) | present in ≥5 of 7 surveyed platforms |
| `platform-ops/` | GovCore platform plane + govEA precedent (see `docs/design/govcore-fit-gap.md`) | capability shipped by `@govcore/*` or required to operate a multi-tenant instance |

## Capability ID Convention

IDs are file stems (`sfa-opportunity-management`); group IDs are directory paths (`crm/sales-force-automation`). Use them in issues, PRs, and commit footers (`Capability: <id>`). Prefixes:

| Group | Prefix |
|---|---|
| crm/customer-data-management | `cdm` |
| crm/sales-force-automation | `sfa` |
| crm/marketing-automation | `ma` |
| crm/customer-service | `cs` |
| crm/analytics-reporting | `ar` |
| crm/workflow-automation | `wa` |
| crm/platform-administration | `pa` |
| crm/integration-extensibility | `ix` |
| platform-ops/platform-operations | `po` |

## Link Vocabulary

Exactly three labels: **Depends on:**, **Enables:**, **Related:**. No others.

## Reference Sources

Reference material lives alongside capability files, clearly labeled non-authoritative (govEA's pattern). Here: `capabilities/crm-vendor-reference.md`. Capability definitions govern on conflict.

## Lint

govEA's `lint-business-architecture.mjs` can be adopted with three adaptations: point `BA_ROOT` here, add `crm-vendor-reference.md` to `REFERENCE_FILES`, extend the validation-status regex to accept `[UNVERIFIED] Assumed`. Not yet wired up.

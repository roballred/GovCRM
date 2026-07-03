---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Persona: Sales Operations Analyst

**Validation Status: [UNVERIFIED] Assumed** — synthesized from vendor market research and common role patterns; would move to Validated through interviews with real sales-ops / revenue-ops analysts.

## Role Type
Internal — Revenue Operations

## Who They Are
The Sales Operations Analyst owns the sales process as a system: reporting and analytics, forecast mechanics, quotas and territories, pipeline hygiene, and the tooling that supports them. They sit between sales leadership (who ask questions) and the CRM (which holds imperfect answers), and they build the reports both live from.

## Goals
- Answer leadership questions from CRM data without manual spreadsheet assembly
- Define and enforce a consistent sales process (stages, exit criteria, fields)
- Run forecast and quota processes on reliable mechanics
- Measure funnel conversion and velocity to find where deals leak
- Keep report and dashboard sprawl curated so there is one version of the truth

## Pain Points
- Garbage-in analytics: missing close dates, stale stages, skipped fields
- Metric definitions that drift between reports and teams
- Historical trend analysis blocked by lack of field-history capture
- Export-to-spreadsheet as the default escape hatch for every hard question
- Process changes that reps route around within a week

## Critical Insight
The analyst can only report on what the process forces into existence. Their most valuable "analytics capability" is actually upstream: validation rules, required fields, and stage definitions that make good data the path of least resistance.

## Relevant Capabilities
- Analytics & Reporting (all of `crm/analytics-reporting`)
- `sfa-sales-forecasting`, `sfa-pipeline-management`
- `pa-customization` (field/validation design), `pa-audit-logging`
- `cdm-data-import-export`, `cdm-deduplication-data-quality`, `cdm-segmentation-lists`

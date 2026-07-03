---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Sales Forecasting

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must roll pipeline data into revenue forecasts by period, owner, and team — combining stage/probability mechanics with seller judgment (commit/best-case categories) and tracking forecast against quota.

## Personas
- **Sales Manager** — adjusts, submits, and defends the team forecast
- **Executive Sponsor** — consumes the rolled-up number and its trend
- **Sales Operations Analyst** — owns forecast mechanics and accuracy measurement
- **Sales Representative** — categorizes their deals and sees quota progress

## Behaviors
- Compute forecast rollups by period from opportunity amount, close date, and stage/probability
- Support seller-judgment categories (pipeline, best case, commit, closed)
- Track quotas per rep, team, and period, and show attainment against them
- Allow manager overrides at each rollup level, preserving the underlying numbers
- Keep forecast snapshots over time so accuracy is measurable after the fact

## Rules
- The forecast derives from live opportunity data — no parallel spreadsheet universe
- Overrides never destroy the underlying rep-level numbers
- Historical snapshots are immutable; forecast accuracy is a first-class metric

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: sfa-opportunity-management, sfa-pipeline-management
- Enables: ar-sales-analytics, executive revenue planning
- Related: ar-ai-insights (predictive forecasting), ar-dashboards

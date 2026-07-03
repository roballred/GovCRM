---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Pipeline Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (kanban/board pipeline views, multiple pipelines); not validated with any real organization.

## What It Does
The system must present opportunities as a visual, stage-based pipeline that teams work from directly — dragging deals between stages, spotting stalls, and filtering by owner, team, or period — with support for multiple pipelines for distinct sales processes.

## Personas
- **Sales Representative** — works their deals from the board daily
- **Sales Manager** — runs reviews and spots risk from the team pipeline
- **Sales Operations Analyst** — designs pipelines and stage definitions

## Behaviors
- Display opportunities on a kanban-style board by stage, with value totals per stage
- Move deals between stages directly from the board
- Support multiple named pipelines, each with its own stages and exit criteria
- Highlight stalled deals (no activity or stage change beyond a threshold)
- Filter and roll up by owner, team, period, and custom criteria

## Rules
- Every pipeline stage has a written definition and exit criteria
- A deal is in exactly one stage of exactly one pipeline at a time
- Stage-duration data is captured automatically for velocity analytics

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: sfa-opportunity-management
- Enables: sfa-sales-forecasting, ar-sales-analytics
- Related: wa-workflow-rules (stage-triggered automation), ar-ai-insights

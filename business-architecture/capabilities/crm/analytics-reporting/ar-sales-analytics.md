---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Sales Analytics

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must analyze the sales machine itself: funnel conversion between stages, pipeline velocity, win/loss rates and reasons, quota attainment, and trend against history — the analytics that tell leadership where deals leak and why.

## Personas
- **Sales Operations Analyst** — primary analyst of funnel and velocity
- **Sales Manager** — win/loss and attainment by rep and segment
- **Executive Sponsor** — pipeline coverage and conversion trends

## Behaviors
- Measure stage-to-stage conversion rates and time-in-stage across the funnel
- Compute pipeline velocity and average cycle length by segment
- Analyze win/loss outcomes by reason, competitor, source, and segment
- Track attainment against quota by rep, team, and period
- Compare periods and trend metrics over time using stage-history data
- Measure pipeline coverage against forthcoming-period targets

## Rules
- Velocity and conversion metrics derive from recorded stage history, never reconstruction
- Win/loss analysis requires the closure reason codes enforced by opportunity management
- Segment definitions used in analysis match those used elsewhere (one vocabulary)

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: sfa-opportunity-management (stage history), sfa-pipeline-management, sfa-sales-forecasting
- Enables: process improvement, territory and quota design
- Related: ar-dashboards, ar-ai-insights

---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Dashboards

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms; not validated with any real organization.

## What It Does
The system must present live, visual, role-appropriate views of key metrics — pipeline, attainment, case load, campaign performance — that update from operational data without manual assembly, readable by people who will never build a report.

## Personas
- **Executive Sponsor** — the zero-training consumer this capability must serve
- **Sales Manager** — team performance at a glance
- **Support Manager** — queue, SLA, and satisfaction panels
- **Sales Representative** — personal attainment and activity view

## Behaviors
- Compose dashboards from charts, tables, and single-number tiles backed by reports
- Provide role-default dashboards out of the box, customizable per user/team
- Refresh automatically; drill down from any tile to underlying records
- Filter dashboards by period, team, and territory
- Share dashboards with permission-aware visibility

## Rules
- Every tile drills through to its data — no dead-end numbers
- Dashboards inherit the viewer's permissions
- Role defaults are maintained deliberately; the executive view is a product, not an afterthought

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: ar-custom-reports
- Enables: executive adoption, management by live data
- Related: ar-sales-analytics, ar-ai-insights

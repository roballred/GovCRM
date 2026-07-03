---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Analytics & Reporting

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); all four sub-capabilities present in 7/7 platforms. Not validated with any real organization.

## What It Does
The system must turn operational CRM data into decisions: user-buildable reports, role-appropriate dashboards, sales-performance analytics, and AI-assisted insight that surfaces what humans would miss. This group is the payoff for the data discipline every other group enforces.

## Personas
- **Sales Operations Analyst** — builds and curates the reporting estate
- **Sales Manager** — runs the team from dashboards and pipeline analytics
- **Executive Sponsor** — consumes the trusted top-level view
- **Support Manager** — service-side reporting on the same foundations

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Custom Reports | [ar-custom-reports.md](./ar-custom-reports.md) | User-built tabular/summary reports over any record type |
| Dashboards | [ar-dashboards.md](./ar-dashboards.md) | Role-oriented visual panels of live metrics |
| Sales Analytics | [ar-sales-analytics.md](./ar-sales-analytics.md) | Funnel conversion, velocity, win/loss, and attainment analysis |
| AI Insights | [ar-ai-insights.md](./ar-ai-insights.md) | Model-driven predictions, risk flags, and recommendations |

## Success Criteria
- Routine leadership questions are answered from saved reports, not fresh spreadsheet work
- Each role has a default dashboard they actually open unprompted
- There is one agreed number for each key metric — definitions don't drift between reports
- AI insights are acted on (or explicitly dismissed), not ignored

## Rules
- All analytics respect record-level permissions — a report is not a permission bypass
- Metric definitions are documented and shared across reports and dashboards
- AI-generated insight is labeled as such and always explainable enough to challenge

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: Customer Data Management, Sales Force Automation, Customer Service (data sources)
- Enables: executive decision-making, forecast credibility, service management
- Related: Workflow & Automation (metric-threshold triggers)

---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Sales Force Automation

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); not validated with any real organization.

## What It Does
The system must support the end-to-end selling motion: capturing and qualifying leads, progressing opportunities through a defined pipeline, planning sales activity, producing quotes, and forecasting revenue. This is the historical core of every surveyed CRM.

## Personas
- **Sales Representative** — primary daily user of every sub-capability
- **Sales Manager** — runs the team from pipeline and forecast views
- **Sales Operations Analyst** — designs the process the group encodes
- **Account Manager** — uses opportunity and quote capabilities for renewals and expansion
- **Executive Sponsor** — consumes the forecast this group produces

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Lead Management | [sfa-lead-management.md](./sfa-lead-management.md) | Capture, qualify, route, and convert leads |
| Opportunity Management | [sfa-opportunity-management.md](./sfa-opportunity-management.md) | Track deals with value, stage, close date, and linked records |
| Pipeline Management | [sfa-pipeline-management.md](./sfa-pipeline-management.md) | Visual, stage-based pipeline views over opportunities |
| Sales Forecasting | [sfa-sales-forecasting.md](./sfa-sales-forecasting.md) | Roll pipeline into quota-aware revenue forecasts |
| Quote & Product Management | [sfa-quote-product-management.md](./sfa-quote-product-management.md) | Product catalog, price books, and quote generation |
| Task & Activity Management | [sfa-task-activity-management.md](./sfa-task-activity-management.md) | Plan and track sales tasks, calls, and meetings |

## Success Criteria
- A lead's path from first capture to closed deal is traceable without leaving the system
- Pipeline reviews run from live views, not exported spreadsheets
- Forecast accuracy improves measurably as stage discipline takes hold
- Reps report the system saves them time in a typical week, not costs it

## Rules
- Every opportunity traces back to an account, and to a lead or source where one exists
- Stage definitions and exit criteria are explicit and shared — a stage means one thing
- Selling data is captured as a by-product of selling activity wherever possible

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: Customer Data Management
- Enables: Analytics & Reporting (pipeline/forecast data), Workflow & Automation (sales process triggers)
- Related: Marketing Automation (lead handoff boundary), Integration & Extensibility

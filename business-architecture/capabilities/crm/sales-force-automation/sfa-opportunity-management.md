---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Opportunity Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (opportunities / deals); not validated with any real organization.

## What It Does
The system must track each potential sale as a first-class record — value, stage, expected close date, probability, competitors, and the people and products involved — from qualification to won or lost.

## Personas
- **Sales Representative** — owns and progresses opportunities
- **Sales Manager** — inspects deals during pipeline reviews
- **Account Manager** — tracks renewal and expansion opportunities

## Behaviors
- Create opportunities linked to an account and originating lead or source
- Track amount, currency, stage, probability, and expected close date
- Record stage transitions with timestamps for velocity analysis
- Link contacts with buying roles, products/line items, and competitors
- Close as won or lost with reason codes
- Support multiple concurrent opportunities per account

## Rules
- An opportunity always belongs to exactly one account and one pipeline
- Stage changes are recorded, not overwritten — history is analyzable
- Won/lost closure requires a reason; closed records become read-only except by exception

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-account-management, sfa-lead-management
- Enables: sfa-pipeline-management, sfa-sales-forecasting, sfa-quote-product-management
- Related: cdm-activity-timeline, ar-sales-analytics

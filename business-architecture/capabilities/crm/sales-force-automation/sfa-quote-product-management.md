---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Quote & Product Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (native or first-party add-on: Pipedrive via Smart Docs, Freshsales via CPQ add-on); not validated with any real organization.

## What It Does
The system must maintain a catalog of products and services with price books, let reps assemble opportunity line items from it, and generate customer-facing quote documents from those line items.

## Personas
- **Sales Representative** — builds quotes without chasing pricing data
- **Account Manager** — quotes renewals and expansions
- **Sales Operations Analyst** — maintains the catalog and price books

## Behaviors
- Maintain a product catalog with descriptions, units, and active/retired status
- Support multiple price books (currency, market, customer tier)
- Add products as opportunity line items with quantity and discounts
- Generate a formatted quote document from opportunity line items
- Version quotes so superseded offers remain on record

## Rules
- Quotes derive from the catalog and price books — no free-typed pricing by default
- Discount latitude beyond a threshold requires approval (see wa-approval-processes)
- A sent quote is a record: versioned, attributable, and retained

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: sfa-opportunity-management, pa-customization
- Enables: accurate deal values for sfa-sales-forecasting
- Related: wa-approval-processes

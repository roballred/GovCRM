---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Customer Feedback

**Validation Status: [UNVERIFIED] Assumed** — present in 5/7 surveyed platforms (Salesforce Feedback Management, HubSpot surveys, Dynamics Customer Voice, Zoho Survey, Freshdesk CSAT; absent in Pipedrive and Sugar core); the weakest inclusion in the baseline — verify first. Not validated with any real organization.

## What It Does
The system must measure how customers feel — post-case satisfaction, periodic relationship surveys — and attach the results to the case, contact, and account they concern, so sentiment is data rather than anecdote.

## Personas
- **Support Manager** — tracks satisfaction by team, category, and agent
- **Account Manager** — watches sentiment trend on their accounts
- **Customer** — gives feedback once and expects it to matter
- **Executive Sponsor** — consumes aggregate satisfaction alongside revenue

## Behaviors
- Send post-resolution satisfaction surveys automatically (CSAT-style)
- Support periodic relationship surveys (NPS-style) to segments
- Record responses against the triggering case and the contact/account
- Aggregate scores by team, category, account, and period; trend over time
- Alert owners on strongly negative responses for follow-up

## Rules
- Survey frequency is capped per contact — feedback collection must not become spam
- Responses are permanently linked to their subject (case/account); anonymous aggregation is a view, not the storage model
- Negative feedback triggers a follow-up owner, not just a dashboard entry

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cs-case-management, ma-email-marketing (delivery mechanics)
- Enables: account-health signals, service-quality management
- Related: ar-dashboards, wa-notifications-alerts

---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Campaign Management

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (native or first-party suite); not validated with any real organization.

## What It Does
The system must represent marketing efforts as campaign records — with audience, budget, schedule, and channel — track who was targeted and who responded, and connect responses to the leads and opportunities they produce.

## Personas
- **Marketing Manager** — plans, runs, and reports on campaigns
- **Sales Operations Analyst** — analyzes campaign-to-pipeline conversion
- **Executive Sponsor** — sees marketing contribution to pipeline

## Behaviors
- Create campaign records with type, schedule, budget, and target audience
- Populate campaign membership from segments and lists
- Track member status (targeted, sent, responded, converted)
- Attribute leads and opportunities to their source campaign(s)
- Report campaign outcomes: responses, leads, pipeline, cost against budget
- Support parent/child campaign hierarchies for programs and their tactics

## Rules
- Campaign membership is recorded per person with status history
- A lead or opportunity may carry multiple campaign attributions; the model must not force one
- Campaign audiences respect consent status at send time, not just at list-build time

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-segmentation-lists
- Enables: ma-email-marketing, campaign ROI analysis in ar-custom-reports
- Related: sfa-lead-management, ma-lead-capture-forms

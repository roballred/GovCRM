---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Lead Scoring

**Validation Status: [UNVERIFIED] Assumed** — present in 6/7 surveyed platforms (rule-based and/or AI: Einstein, Zia, Freddy, SugarPredict, HubSpot, Dynamics predictive scoring; absent native in Pipedrive); not validated with any real organization.

## What It Does
The system must rank leads by likelihood to convert — combining fit (who they are) and engagement (what they've done) — through configurable rules and/or model-based scoring, so sales effort goes to the best leads first.

## Personas
- **Marketing Manager** — configures scoring and defends its credibility
- **Sales Representative** — works the queue in score order — if they trust it
- **Sales Manager** — uses score thresholds in routing and SLAs

## Behaviors
- Score on fit criteria (role, industry, size) and engagement events (visits, opens, replies)
- Support rule-based scoring configurable by admins and, where available, model-based scoring
- Show the factors behind a score on the lead record
- Recalculate as new signals arrive; decay stale engagement
- Trigger threshold-based actions: routing, alerts, stage changes

## Rules
- Every score is explainable on the record — factors visible, not a black box
- Scoring models/rules are versioned; a score is interpretable against its version
- Score influences priority, never gates human judgment — reps can work any lead

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: ma-email-marketing (engagement signals), cdm-contact-management (fit data)
- Enables: prioritized sfa-lead-management, wa-workflow-rules (threshold triggers)
- Related: ar-ai-insights

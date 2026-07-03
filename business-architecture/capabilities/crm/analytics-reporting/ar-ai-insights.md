---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: AI Insights

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms in 2026 (Einstein/Agentforce, Breeze, Copilot, Zia, Pipedrive AI, Freddy, SugarPredict); the fastest-moving area in the scan — definitions here are deliberately conservative. Not validated with any real organization.

## What It Does
The system must apply models to CRM data to surface what humans would miss: deal-risk flags, predictive lead and forecast scoring, next-best-action suggestions, and natural-language summarization of records and history.

## Personas
- **Sales Representative** — receives prioritization and next-step suggestions
- **Sales Manager** — sees at-risk deals before the pipeline review
- **Sales Operations Analyst** — evaluates whether model output beats the baseline
- **Executive Sponsor** — consumes AI-assisted forecast confidence

## Behaviors
- Flag at-risk deals from engagement, velocity, and history signals
- Predictively score leads and opportunities alongside rule-based scores
- Suggest next actions on records from context and past patterns
- Summarize long record histories in plain language
- Explain each insight's contributing factors
- Learn from outcomes; report its own accuracy

## Rules
- Every insight is labeled as AI-generated and shows its basis — challengeable, not oracular
- AI recommends; humans decide. No autonomous record changes without explicit configuration
- Model access respects record permissions; insights don't leak data across boundaries
- Accuracy is measured and visible — an insight feature that can't show its hit rate is theater

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cdm-activity-timeline, sfa-opportunity-management (signal sources)
- Enables: prioritized selling, earlier risk intervention
- Related: ma-lead-scoring, sfa-sales-forecasting, ar-sales-analytics

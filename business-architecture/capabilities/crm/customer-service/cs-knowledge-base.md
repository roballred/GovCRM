---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Knowledge Base

**Validation Status: [UNVERIFIED] Assumed** — present in 6/7 surveyed platforms (absent in Pipedrive); not validated with any real organization.

## What It Does
The system must maintain curated, searchable solution articles so known answers are found rather than re-derived — surfaced to agents in case context and optionally published to customers for self-service.

## Personas
- **Support Agent** — searches while working cases; drafts articles from resolutions
- **Support Manager** — curates coverage and retires stale content
- **Customer** — self-serves from published articles instead of opening a case

## Behaviors
- Author articles with categories, tags, and lifecycle (draft, review, published, retired)
- Search from within a case and suggest articles matching the case content
- Attach/link articles to cases; track which article resolved what
- Publish selected articles to a customer-facing portal
- Track usage and helpfulness to guide curation
- Draft articles directly from case resolutions

## Rules
- Articles carry review/expiry discipline — stale answers are worse than none
- Internal vs. customer-facing visibility is explicit per article
- Article-to-case linkage is recorded so deflection and reuse are measurable

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cs-case-management (source of knowledge)
- Enables: faster resolution, customer self-service deflection
- Related: cs-omnichannel-support, ar-custom-reports (usage analysis)

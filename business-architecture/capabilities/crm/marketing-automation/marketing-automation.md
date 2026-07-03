---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Marketing Automation

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); several vendors deliver parts of this group via first-party suite products, noted per sub-capability. Not validated with any real organization.

## What It Does
The system must generate and nurture demand: capture leads from the web, run email campaigns to segmented audiences, score leads for sales-readiness, and hand qualified leads to sales with source attribution intact.

## Personas
- **Marketing Manager** — owns every sub-capability in this group
- **Sales Representative** — receives the output (qualified, scored leads)
- **Customer** — receives the outreach; expects relevance and respected consent

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Campaign Management | [ma-campaign-management.md](./ma-campaign-management.md) | Plan campaigns, track membership, and attribute responses |
| Email Marketing | [ma-email-marketing.md](./ma-email-marketing.md) | Bulk/list email with templates, sending controls, and engagement tracking |
| Lead Capture Forms | [ma-lead-capture-forms.md](./ma-lead-capture-forms.md) | Web forms and landing-page capture flowing straight into lead records |
| Lead Scoring | [ma-lead-scoring.md](./ma-lead-scoring.md) | Rank leads by fit and engagement so sales works the best first |

## Success Criteria
- Leads arrive in sales with source, campaign, and engagement history attached
- Audience building happens in-system from segments, not via export/re-import
- Unsubscribes and consent are honored automatically across all sends
- Marketing can show which campaigns produced accepted leads and pipeline

## Rules
- All outbound respects consent and opt-out status from Customer Data Management — no exceptions
- Campaign attribution is captured at the moment of response, not reconstructed later
- The marketing-to-sales handoff criteria are explicit and jointly owned with sales

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: Customer Data Management (contacts, segments, consent)
- Enables: Sales Force Automation (qualified lead flow)
- Related: Workflow & Automation (nurture journeys), Analytics & Reporting (campaign performance)

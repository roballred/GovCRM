---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Customer Service

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); 6/7 vendors offer this group natively or via first-party suite (absent in Pipedrive). Not validated with any real organization.

## What It Does
The system must manage post-sale customer issues end to end: capture them as cases from any channel, route and resolve them against service targets, reuse known answers from a knowledge base, and measure how customers felt about it.

## Personas
- **Support Agent** — works the case queue; primary daily user
- **Support Manager** — owns SLAs, routing policy, and service quality
- **Account Manager** — watches case health on their accounts
- **Customer** — raises the issues; experiences this group directly

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Case Management | [cs-case-management.md](./cs-case-management.md) | Capture, route, track, and resolve customer issues as cases |
| Knowledge Base | [cs-knowledge-base.md](./cs-knowledge-base.md) | Curated, searchable solution articles for agents and customers |
| SLA Management | [cs-sla-management.md](./cs-sla-management.md) | Response/resolution targets, timers, and escalations |
| Omnichannel Support | [cs-omnichannel-support.md](./cs-omnichannel-support.md) | Unified case handling across email, chat, phone, and web |
| Customer Feedback | [cs-customer-feedback.md](./cs-customer-feedback.md) | Surveys and satisfaction measurement tied to cases and accounts |

## Success Criteria
- Customers never re-explain their history when a case changes hands or channels
- SLA attainment is visible live, not discovered in a monthly report
- Common issues are answered from the knowledge base faster than from memory
- Case patterns feed product and process fixes, shrinking repeat volume

## Rules
- Every customer issue becomes a case — no side-channel resolution without a record
- Cases link to the contact and account so service history is part of the 360° view
- Feedback is always linked to what it is feedback about (case, interaction, account)

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: Customer Data Management
- Enables: account-health views for Account Managers; churn signals for Analytics & Reporting
- Related: Workflow & Automation (routing/escalation), Integration & Extensibility (channels)

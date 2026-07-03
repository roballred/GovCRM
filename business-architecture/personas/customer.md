---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Persona: Customer

**Validation Status: [UNVERIFIED] Assumed** — synthesized from vendor market research and common role patterns; would move to Validated through interviews or observation of real customers of a CRM-using organization.

## Role Type
External — buyer / user of the organization's products or services

## Who They Are
The Customer never logs into the CRM, but they are the person every record describes and the person most affected by how well it works. They experience the CRM indirectly: whether the salesperson remembers the last conversation, whether support knows their history, whether marketing emails are relevant, and whether their data is handled respectfully.

## Goals
- Tell the organization something once and have it remembered
- Get relevant contact, not spam — and be able to opt out and be forgotten
- Have issues resolved without repeating history to each new person
- Receive accurate quotes and commitments that the organization honors
- Trust that their personal data is stored securely and used appropriately

## Pain Points
- Being asked for the same information by sales, then support, then billing
- Irrelevant outreach that shows the organization doesn't know them at all
- Handoffs (rep changes, escalations) where the context visibly resets to zero
- Consent and privacy preferences ignored or lost between systems
- Errors in their data that they have no way to see or correct

## Critical Insight
Every internal capability in this baseline is, from the Customer's side, a single capability: "act like one organization that knows me." The Customer is the test that keeps the capability map honest — a capability that cannot be traced to a better customer experience or a legitimate business need is inventory, not architecture.

## Relevant Capabilities
- `cdm-contact-management`, `cdm-deduplication-data-quality` (data about them is accurate and singular)
- `cs-case-management`, `cs-omnichannel-support`, `cs-sla-management`, `cs-customer-feedback`
- `ma-email-marketing` (consent and relevance), `ma-lead-capture-forms`
- `pa-security-controls`, `pa-data-administration` (privacy, retention, right to erasure)

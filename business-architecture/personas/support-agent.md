---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Persona: Support Agent

**Validation Status: [UNVERIFIED] Assumed** — synthesized from vendor market research and common role patterns; would move to Validated through interviews with real front-line support agents.

## Role Type
Internal — Customer Service (front line)

## Who They Are
The Support Agent resolves customer issues arriving by email, chat, phone, and web forms. They work a queue of cases against response-time targets, switching context constantly. Their effectiveness depends on how fast the system gives them the customer's history and a likely answer.

## Goals
- Resolve cases on first contact whenever possible
- See who the customer is — products owned, past cases, open deals — without asking
- Find known answers fast in a knowledge base instead of re-deriving them
- Meet SLA targets without gaming the queue
- Escalate cleanly, with full context attached, when an issue is beyond them

## Pain Points
- Asking customers to repeat information the company already has
- Channel-switching (chat to email to phone) losing the thread of the case
- Knowledge that lives in senior agents' heads instead of the knowledge base
- SLA timers that punish agents for queue routing they don't control
- No visibility that the frustrated caller is also in a renewal negotiation

## Critical Insight
Every case is answered twice: once to the customer and once into the record. Agents under queue pressure will always skip the second answer unless capturing resolution knowledge is nearly free — knowledge-base growth must be a by-product of case work, not an extra task.

## Relevant Capabilities
- Customer Service (all of `crm/customer-service`)
- `cdm-contact-management`, `cdm-account-management`, `cdm-activity-timeline`
- `wa-workflow-rules` (routing), `wa-notifications-alerts`
- `ix-telephony-integration`, `ix-email-integration`

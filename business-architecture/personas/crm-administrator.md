---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Persona: CRM Administrator

**Validation Status: [UNVERIFIED] Assumed** — synthesized from vendor market research and common role patterns; would move to Validated through interviews with real CRM admins (often part-time admins in SMBs).

## Role Type
Internal — IT / Business Operations

## Who They Are
The CRM Administrator configures and maintains the platform: users and permissions, custom fields and layouts, automation rules, integrations, data quality, and security settings. In small organizations this is a part-time hat on an ops person; in large ones a dedicated role or team. Every other persona's experience is downstream of their configuration choices.

## Goals
- Onboard and offboard users quickly with correct, least-privilege access
- Adapt fields, layouts, and pipelines to the business without code
- Keep automations understandable — and debuggable when they misfire
- Protect data quality at the point of entry, not by quarterly cleanup
- Pass security reviews and answer "who changed what" from the audit log

## Pain Points
- Config sprawl: years of fields, rules, and workflows nobody dares delete
- Automation failures that surface as mysterious data changes
- Permission models too coarse (oversharing) or too fine (constant tickets)
- Integration breakage after vendor API or schema changes
- Being the single point of knowledge for how everything is wired

## Critical Insight
The admin's real job is managing configuration debt. Every customization capability is also a liability-creation capability — what admins need most is visibility into what exists, what depends on it, and whether it is still used.

## Relevant Capabilities
- Platform Administration (all of `crm/platform-administration`)
- `wa-workflow-rules`, `wa-approval-processes` (author/maintainer)
- `cdm-deduplication-data-quality`, `cdm-data-import-export`
- `ix-api-webhooks`, `ix-app-marketplace`, `ix-email-integration`

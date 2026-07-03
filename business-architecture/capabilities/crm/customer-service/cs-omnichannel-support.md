---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Omnichannel Support

**Validation Status: [UNVERIFIED] Assumed** — present in 6/7 surveyed platforms (absent in Pipedrive); not validated with any real organization.

## What It Does
The system must accept and handle customer issues across channels — email, web form, chat, phone — converging them into the same case model with the same history, so the conversation continues regardless of channel.

## Personas
- **Support Agent** — handles a mixed-channel queue in one workspace
- **Customer** — starts on one channel, continues on another, without repeating themselves
- **Support Manager** — staffs and measures channels from one view

## Behaviors
- Convert inbound email and web-form submissions to cases automatically
- Support live chat with transcript capture onto the case
- Log phone interactions to the case (with ix-telephony-integration)
- Recognize the customer across channels and attach to existing cases
- Present agents one unified queue and workspace across channels
- Record channel on every interaction for staffing and analysis

## Rules
- All channels resolve to the same case model — no channel-specific silos
- Cross-channel continuation attaches to the existing case, not a new one
- Channel availability is configurable; the case model is not

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: cs-case-management, ix-email-integration, ix-telephony-integration
- Enables: consistent cs-sla-management across channels
- Related: cdm-activity-timeline, cs-knowledge-base

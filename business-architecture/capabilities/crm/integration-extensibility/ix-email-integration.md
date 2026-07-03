---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Email Integration

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (Gmail/Outlook sync universal); not validated with any real organization.

## What It Does
The system must connect to the user's mailbox so customer email is captured onto CRM records automatically, CRM email can be sent from the user's real address, and 1:1 sends support templates and open/click tracking.

## Personas
- **Sales Representative** — primary beneficiary; email is their main channel
- **Support Agent** — inbound support email lands on cases
- **Account Manager** — correspondence history survives personnel changes

## Behaviors
- Connect Gmail/Outlook mailboxes with per-user consent
- Match and log sent/received email to the right contact, account, deal, or case
- Send from CRM via the user's own address, with templates and merge fields
- Track opens and clicks on 1:1 email where policy allows
- Respect exclusions (private domains, personal contacts) from capture
- Surface CRM context inside the mail client (sidebar/add-in)

## Rules
- Capture requires the mailbox owner's consent and honors configured privacy exclusions
- Auto-logged email is attributed to the integration, and mismatches are correctable
- 1:1 sales email and bulk marketing email are distinct capabilities with distinct consent rules

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-security-controls (credentials, consent)
- Enables: cdm-activity-timeline, wa-sales-sequences, cs-omnichannel-support
- Related: ix-calendar-integration, ma-email-marketing

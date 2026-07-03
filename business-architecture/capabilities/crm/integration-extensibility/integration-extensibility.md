---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Integration & Extensibility

**Validation Status: [UNVERIFIED] Assumed** — derived from a 7-vendor market scan (see `../crm-vendor-reference.md`); five of six sub-capabilities present in 7/7 platforms. Not validated with any real organization.

## What It Does
The system must meet users where they already work (email, calendar, phone, mobile) and connect to everything else the business runs (APIs, webhooks, packaged apps). Automatic capture from these channels is what keeps CRM data truthful without manual entry.

## Personas
- **Sales Representative** — lives in email/calendar/phone; wants zero re-keying
- **CRM Administrator** — owns connections, credentials, and installed apps
- **Support Agent** — works channels that must land in the case model
- **Sales Operations Analyst** — moves data between CRM and adjacent systems

## Sub-Capabilities

| Capability | File | Description |
|---|---|---|
| Email Integration | [ix-email-integration.md](./ix-email-integration.md) | Two-way sync and capture with Gmail/Outlook; tracking on 1:1 email |
| Calendar Integration | [ix-calendar-integration.md](./ix-calendar-integration.md) | Calendar sync and meeting scheduling tied to records |
| APIs & Webhooks | [ix-api-webhooks.md](./ix-api-webhooks.md) | Programmatic read/write access and event push to external systems |
| App Marketplace | [ix-app-marketplace.md](./ix-app-marketplace.md) | Discover, install, and govern packaged third-party extensions |
| Mobile Apps | [ix-mobile-apps.md](./ix-mobile-apps.md) | Full-fidelity CRM work from phones and tablets |
| Telephony Integration | [ix-telephony-integration.md](./ix-telephony-integration.md) | Click-to-call, call logging, and screen-pop from customer records |

## Success Criteria
- A rep's routine emails, meetings, and calls appear on the right records with no manual logging
- New integrations connect via supported APIs/apps, not exports and re-imports
- The admin can enumerate every external system with access, and what access it has
- Mobile work (log a call, update a deal) is as natural as desktop for field users

## Rules
- Integrations authenticate with named, scoped, revocable credentials — never borrowed user passwords
- Externally sourced changes are attributed to their integration in the audit log
- Sync conflicts have defined resolution rules; silent data loss is a defect

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: Platform Administration (credentials, permissions)
- Enables: cdm-activity-timeline (auto-capture), Workflow & Automation (external actions)
- Related: every group — this is the system's boundary layer

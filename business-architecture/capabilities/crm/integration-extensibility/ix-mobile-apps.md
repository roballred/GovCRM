---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Mobile Apps

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (native iOS/Android apps); not validated with any real organization.

## What It Does
The system must work from a phone: view and update records, log calls and meetings in the moment, receive notifications, and capture data in the field — with sensible offline behavior for the moments between coverage.

## Personas
- **Sales Representative** — updates deals and logs visits between meetings
- **Account Manager** — full account context on the way into a customer site
- **Sales Manager** — approvals and pipeline checks away from the desk

## Behaviors
- View, search, create, and edit core records from native mobile apps
- Log calls and meetings at the point of occurrence, with minimal taps
- Receive and act on push notifications (assignments, approvals, alerts)
- Capture on-the-go inputs: voice notes, photos, business-card scans where supported
- Queue changes made offline and sync when connectivity returns
- Enforce mobile-specific security (device PIN/biometric, remote session revocation)

## Rules
- Mobile enforces identical permissions and validation as desktop
- Offline-queued changes replay with conflict detection, not silent overwrite
- Lost-device risk is mitigated: sessions are remotely revocable

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-security-controls, ix-api-webhooks (app platform)
- Enables: field-accurate cdm-activity-timeline, timely wa-approval-processes
- Related: wa-notifications-alerts

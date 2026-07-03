---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Security Controls

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (SSO/2FA universal; IP restrictions and session policy in most); not validated with any real organization.

## What It Does
The system must enforce the organization's security policy: strong authentication (SSO, 2FA), session and password policy, network-level restrictions where required, encryption of data at rest and in transit, and privacy controls supporting regulatory obligations.

## Personas
- **CRM Administrator** — configures and evidences the security posture
- **Executive Sponsor** — answers for customer-data protection
- **Customer** — trusts their personal data is protected and their privacy rights work

## Behaviors
- Support single sign-on via standard protocols alongside local authentication
- Enforce two-factor authentication and password/session policies
- Restrict access by IP range or trusted network where policy demands
- Encrypt data in transit and at rest
- Support privacy operations: consent tracking, data subject export, and erasure
- Alert on anomalous access patterns (mass export, unusual login)

## Rules
- Security settings changes are high-sensitivity audit events
- Privacy operations (erasure, export) are first-class, logged workflows — not manual surgery
- A security control that can be silently disabled is a defect; disabling is loud and logged

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-user-role-management
- Enables: regulatory compliance; customer trust; safe ix-api-webhooks credentials
- Related: pa-audit-logging, pa-data-administration (retention/erasure)

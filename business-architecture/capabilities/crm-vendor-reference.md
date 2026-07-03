---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# CRM Vendor Capability Reference — Capability × Vendor Matrix

> **REFERENCE SOURCE — NOT AUTHORITATIVE.** This file is a research input to capability design (govEA's `orchardcore-capabilities.md` pattern). The capability definitions under `crm/` govern. If this file conflicts with a capability definition, the definition wins.
>
> **Validation Status: [UNVERIFIED] Assumed** — compiled from vendor marketing/documentation pages on 2026-07-02 without hands-on testing. Cells reflect the researcher's judgment of feature equivalence.

Method, inclusion rule, and full source list: [`docs/research/crm-market-scan.md`](../../docs/research/crm-market-scan.md).

Legend: **✓** native · **(s)** via the vendor's own first-party suite/add-on (counts, per inclusion rule) · **—** absent or third-party-only (does not count).
Columns: SF = Salesforce Sales Cloud · HS = HubSpot · D365 = Dynamics 365 Sales · ZH = Zoho CRM · PD = Pipedrive · FS = Freshsales · SG = Sugar Sell.

## Included Capabilities (≥5 of 7)

### Customer Data Management (cdm)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| Contact management | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Account management (companies/orgs) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Activity timeline on records | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Data import/export (CSV, wizards) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Deduplication & data quality | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Segmentation & lists (views, filters) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |

### Sales Force Automation (sfa)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| Lead management (capture→qualify→convert) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Opportunity/deal management | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Visual pipeline management (kanban, multi-pipeline) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Sales forecasting & quotas | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Quote & product/price-book management | ✓ | ✓ | ✓ | ✓ | (s) Smart Docs | (s) CPQ add-on | ✓ | 7/7 |
| Task & sales activity management | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |

### Marketing Automation (ma)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| Campaign management | ✓ | ✓ | (s) Customer Insights | ✓ | (s) Campaigns add-on | (s) Suite | ✓ | 7/7 |
| Email marketing (bulk/list email, templates, tracking) | (s) Account Engagement; list email native | ✓ | (s) Customer Insights | ✓ | (s) Campaigns | ✓ | (s) Sugar Market | 7/7 |
| Lead capture forms (web-to-lead, landing forms) | ✓ | ✓ | (s) forms via Journeys | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Lead scoring | ✓ Einstein | ✓ | ✓ predictive | ✓ Zia + rules | — | ✓ Freddy | ✓ SugarPredict | 6/7 |

### Customer Service (cs)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| Case/ticket management | (s) Service Cloud | ✓ Service Hub | (s) Customer Service | ✓ Cases module | — | (s) Freshdesk | (s) Sugar Serve | 6/7 |
| Knowledge base | (s) | ✓ | (s) | ✓ Solutions | — | (s) | (s) | 6/7 |
| SLA & escalation management | (s) entitlements | ✓ | (s) | ✓ escalation rules | — | (s) | (s) | 6/7 |
| Omnichannel support (email, chat, phone) | (s) | ✓ | (s) | ✓ SalesSignals/Desk | — | ✓ | (s) | 6/7 |
| Customer feedback & surveys | (s) Feedback Mgmt | ✓ | (s) Customer Voice | (s) Zoho Survey | — | (s) CSAT | — | 5/7 |

### Analytics & Reporting (ar)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| Custom reports | ✓ | ✓ | ✓ + Power BI | ✓ | ✓ Insights | ✓ | ✓ | 7/7 |
| Dashboards | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Sales performance analytics (pipeline, win rate, velocity) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| AI-assisted insights & predictions | ✓ Einstein/Agentforce | ✓ Breeze | ✓ Copilot | ✓ Zia | ✓ AI assistant | ✓ Freddy | ✓ SugarPredict | 7/7 |

### Workflow & Automation (wa)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| Workflow rules (trigger → action automation) | ✓ Flow | ✓ | ✓ Power Automate | ✓ | ✓ Automations | ✓ | ✓ SugarBPM | 7/7 |
| Approval processes | ✓ | ✓ quote approvals | ✓ | ✓ | — | — | ✓ SugarBPM | 5/7 |
| Notifications & alerts | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Sales sequences / cadences | ✓ Sales Engagement | ✓ Sequences | ✓ sequences | ✓ Cadences | (s) via Automations | ✓ | (s) Sugar Market | 7/7 |

### Platform Administration (pa)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| User & role management (roles, profiles, permissions) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Customization (custom fields, objects/modules, layouts) | ✓ | ✓ | ✓ | ✓ | ✓ fields/pipelines | ✓ | ✓ no-code | 7/7 |
| Security controls (2FA/SSO, IP restrictions, encryption) | ✓ | ✓ | ✓ | ✓ | ✓ Security Center | ✓ | ✓ | 7/7 |
| Audit logging & field history | ✓ | ✓ (tier-gated) | ✓ | ✓ | ✓ Security Center logs | ✓ | ✓ | 7/7 |
| Data administration (backup/export, recycle bin, retention) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |

### Integration & Extensibility (ix)

| Capability | SF | HS | D365 | ZH | PD | FS | SG | Count |
|---|---|---|---|---|---|---|---|---|
| Email integration (Gmail/Outlook sync, tracking) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Calendar integration & meeting scheduling | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| APIs & webhooks | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| App marketplace | ✓ AppExchange | ✓ | ✓ AppSource | ✓ | ✓ | ✓ | ✓ SugarOutfitters | 7/7 |
| Native mobile apps | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/7 |
| Telephony integration (CTI / built-in calling) | ✓ Open CTI/Dialer | ✓ calling | ✓ Teams | ✓ PhoneBridge | ✓ Caller | ✓ built-in phone | — | 6/7 |

## Excluded Candidates (failed the ≥5/7 rule or vendor-specific)

| Candidate | Approx. count | Why excluded |
|---|---|---|
| Territory management | ~4/7 (SF, D365, ZH, SG) | Enterprise-skewed; absent in PD/HS-core/FS |
| Advanced CPQ (guided configuration, pricing rules) | ~3/7 | Add-on products, not baseline CRM |
| Marketing attribution / ROI modelling | ~3/7 | Marketing-suite territory |
| Field service management | ~2/7 | Separate product category |
| Project management | ~2/7 (ZH, SG partners) | Adjacent category |
| Inventory management | ~1/7 (ZH) | Vendor-specific |
| Native e-signature | ~2/7 | Usually partner integrations |
| Social media listening/publishing | ~2/7 | Declining category, suite add-ons |

These scores are the researcher's judgment from vendor documentation; re-verify before relying on them.

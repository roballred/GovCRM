---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# CRM Market Scan — Method and Sources

**Validation Status: [UNVERIFIED] Assumed** — desk research performed by an AI assistant on 2026-07-02; vendor claims were not independently tested, and no analyst reports or hands-on evaluations were used.

This document records **how** the baseline capability set was derived, so the method can be rerun for another domain. The **evidence** (capability × vendor matrix) lives in [`../../business-architecture/capabilities/crm-vendor-reference.md`](../../business-architecture/capabilities/crm-vendor-reference.md).

## Vendor Set

Seven widely adopted, general-purpose CRM platforms spanning enterprise to SMB:

| # | Platform | Vendor | Segment skew |
|---|---|---|---|
| 1 | Sales Cloud | Salesforce | Enterprise / mid-market |
| 2 | HubSpot (Smart CRM + Hubs) | HubSpot | SMB / mid-market |
| 3 | Dynamics 365 Sales | Microsoft | Enterprise / mid-market |
| 4 | Zoho CRM | Zoho | SMB / mid-market |
| 5 | Pipedrive | Pipedrive | SMB |
| 6 | Freshsales (Freshsales Suite) | Freshworks | SMB / mid-market |
| 7 | Sugar Sell | SugarCRM | Mid-market |

Selection rationale: all seven appear consistently in mainstream CRM comparisons; the mix deliberately spans market segments so "common" means common across the market, not common among enterprise suites only.

## Inclusion Rule

> A capability enters the baseline only if it is natively present (or present via the vendor's own first-party suite) in **at least 5 of the 7** platforms.

- Presence via a vendor's **own sibling product** (e.g. Freshworks' Freshdesk for service capabilities, Salesforce Service Cloud for cases) counts, with a note in the matrix — the test is "does the vendor treat this as part of their CRM offering," not "is it in the same SKU."
- Presence only via **third-party marketplace apps does not count**.
- Vendor-specific differentiators are recorded in the matrix's excluded list and do not enter the baseline.

## Process (repeatable for any domain)

1. Pick 5–8 representative platforms spanning market segments.
2. Collect each platform's own capability/feature documentation (vendor pages preferred; independent reviews as secondary corroboration).
3. Draft candidate capabilities in vendor-neutral language (what, not how).
4. Score each candidate per platform in a capability × vendor matrix with evidence notes.
5. Apply the inclusion threshold (≥70% of surveyed platforms); move failures to an explicit excluded list with their scores.
6. Group surviving capabilities into L1 groups; write L1/L2 files per `business-architecture/STYLE.md`.
7. Tag everything `[UNVERIFIED]` until validated with real stakeholders.

## Sources

Research performed 2026-07-02 via web search. Vendor pages are primary; independent reviews are corroboration. Marketing pages describe intended capability, not verified behavior — hence `[UNVERIFIED]`.

### Salesforce
- [Sales Cloud Features (Salesforce Help)](https://help.salesforce.com/s/articleView?id=experience.exp_cloud_setup_sales.htm&language=en_US&type=5)
- [Salesforce Sales Cloud features in 2026: full overview (Noltic)](https://noltic.com/stories/salesforce-sales-cloud-features)
- [Sales Cloud: Top 8 Salesforce Spring '26 Features (Salesforce Ben)](https://www.salesforceben.com/sales-cloud-top-salesforce-spring-26-features/)
- [Sales Cloud Basics, Spring '26 (Salesforce docs PDF)](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/sales_core.pdf)

### HubSpot
- [Explore HubSpot's Products, Features, and Benefits](https://www.hubspot.com/products)
- [HubSpot Free CRM overview](https://www.hubspot.com/products/crm)
- [HubSpot CRM Review (Forbes Advisor)](https://www.forbes.com/advisor/business/software/hubspot-crm-review/)

### Microsoft Dynamics 365 Sales
- [Welcome to Dynamics 365 Sales (Microsoft Learn)](https://learn.microsoft.com/en-us/dynamics365/sales/overview)
- [Dynamics 365 Sales capabilities (Microsoft)](https://dynamics.microsoft.com/en-us/sales/capabilities/)
- [Overview of Dynamics 365 Sales 2025 release wave 2 (Microsoft Learn)](https://learn.microsoft.com/en-us/dynamics365/release-plan/2025wave2/sales/dynamics365-sales/)

### Zoho CRM
- [Zoho CRM lead nurturing and pipeline management](https://www.zoho.com/crm/lead-nurturing.html)
- [Automation and process management (Zoho CRM Plus)](https://www.zoho.com/crm/crmplus/process-management.html)
- [Zoho CRM features](https://www.zoho.com/crm/features.html)

### Pipedrive
- [Pipedrive products overview](https://www.pipedrive.com/en/products)
- [Sales Pipeline Management Software (Pipedrive)](https://www.pipedrive.com/en/features/pipeline-management)
- [CRM Functions & CRM Functionality (Pipedrive)](https://www.pipedrive.com/en/products/sales/crm-functions)

### Freshsales (Freshworks)
- [CRM Software Features, Functionality & Capabilities (Freshsales)](https://www.freshworks.com/crm/features/)
- [Freshsales: Streamlined Sales CRM Solution](https://www.freshworks.com/crm/sales/)
- [Freshsales Suite: CRM plus Marketing Automation](https://www.freshworks.com/crm/suite/)

### SugarCRM
- [Sugar Sell Editions Overview & Comparison Chart (SugarCRM PDF)](https://www.sugarcrm.com/wp-content/uploads/overviews/sugar-sell-editions-overview-comparison-en.pdf)
- [What Is Sugar Sell? (SugarCRM blog)](https://www.sugarcrm.com/blog/what-is-sugar-sell-heres-what-you-need-to-know/)
- [SugarCRM Review 2026 (crm.org)](https://crm.org/news/sugarcrm-review)

## Limitations

- Desk research only; single-day snapshot (2026-07-02). Vendor packaging changes frequently.
- Feature naming varies wildly between vendors; matrix judgments about equivalence are the researcher's own.
- No hands-on product testing, no analyst reports (Gartner/Forrester), no practitioner interviews.

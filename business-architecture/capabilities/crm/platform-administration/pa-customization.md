---
validation: UNVERIFIED
basis: synthetic-market-research
date: 2026-07-02
---

# Capability: Customization

**Validation Status: [UNVERIFIED] Assumed** — present in 7/7 surveyed platforms (custom fields universal; custom objects/modules in most); not validated with any real organization.

## What It Does
The system must adapt to the business without code: custom fields on any record type, custom objects/modules for domain-specific data, configurable page layouts per role, picklist and validation-rule management, and renaming to match business vocabulary.

## Personas
- **CRM Administrator** — performs all customization
- **Sales Operations Analyst** — designs the fields and validations the process needs
- **Sales Representative** — experiences customization as fit (or clutter)

## Behaviors
- Add custom fields of standard types (text, number, date, picklist, lookup) to any object
- Create custom objects/modules with relationships to standard ones
- Configure page layouts and field visibility per role or team
- Define validation rules and required fields enforced across UI, import, and API
- Manage picklist values centrally with deactivation instead of deletion
- Inventory customizations: what exists, who made it, where it is used

## Rules
- Custom fields and objects are first-class: reportable, automatable, permissioned, exportable
- Validation is enforced uniformly on every entry path
- Customizations carry descriptions and owners — undocumented config is debt

## Implementation Status
Planned — not yet implemented.

## Links
- Depends on: pa-user-role-management (who may customize)
- Enables: cdm-deduplication-data-quality (validation), ar-custom-reports, wa-workflow-rules
- Related: pa-audit-logging (config change history)

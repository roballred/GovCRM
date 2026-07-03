// GovCore platform tables (organizations, users, memberships, audit_log,
// federation + support tables). GovCRM domain tables are added here as they
// are built, org-scoped via orgScoped() and shipped with RLS policies in the
// same migration (see CLAUDE.md invariants).
export * from '@govcore/schema'

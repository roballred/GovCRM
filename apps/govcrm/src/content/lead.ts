// Lead — an unqualified prospect, kept separate from Contacts until converted.
// Capability: sfa-lead-management.

import { buildContentTable, defineContentType } from '@govcore/content'

export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'disqualified'] as const

export const lead = defineContentType({
  name: 'lead',
  label: 'Lead',
  fields: [
    { name: 'first_name', label: 'First name', type: 'text', required: true },
    { name: 'last_name', label: 'Last name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'organization_name', label: 'Organization', type: 'text' },
    { name: 'source', label: 'Source', type: 'text' }, // web-form | referral | event | other
    { name: 'lead_status', label: 'Lead status', type: 'text' }, // LEAD_STATUSES
    { name: 'notes', label: 'Notes', type: 'textarea' },
  ],
  computed: [
    {
      name: 'full_name',
      label: 'Name',
      type: 'text',
      materialized: true,
      compute: (row) => `${row.first_name ?? ''} ${row.last_name ?? ''}`.trim(),
    },
  ],
})

export const leadTable = buildContentTable(lead)

// GovCRM's first domain type (capability: cdm-contact-management), defined as
// data and compiled by @govcore/content into an RLS-bound table with generated
// validation, CRUD actions, and screens.

import { buildContentTable, defineContentType } from '@govcore/content'

export const contact = defineContentType({
  name: 'contact',
  label: 'Contact',
  fields: [
    { name: 'first_name', label: 'First name', type: 'text', required: true },
    { name: 'last_name', label: 'Last name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'organization_name', label: 'Organization', type: 'text' },
    { name: 'notes', label: 'Notes', type: 'textarea' },
  ],
  computed: [
    // Materialized so lists can render it without recomputing on read.
    {
      name: 'full_name',
      label: 'Name',
      type: 'text',
      materialized: true,
      compute: (row) => `${row.first_name ?? ''} ${row.last_name ?? ''}`.trim(),
    },
  ],
})

/** The runtime Drizzle table for `contact` (mirrors the compiled DDL exactly). */
export const contactTable = buildContentTable(contact)

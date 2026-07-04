// Account — the organizations this office works with (vendors, chambers,
// partner agencies). Capability: cdm-account-management.

import { buildContentTable, defineContentType } from '@govcore/content'

export const account = defineContentType({
  name: 'account',
  label: 'Account',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'account_type', label: 'Type', type: 'text' }, // vendor | partner | community | other
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'website', label: 'Website', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'notes', label: 'Notes', type: 'textarea' },
  ],
})

export const accountTable = buildContentTable(account)

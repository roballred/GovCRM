// Deal — a tracked opportunity (procurement, grant, renewal) with a stage and
// value, tied to an Account and a primary Contact.
// Capability: sfa-opportunity-management.

import { buildContentTable, defineContentType } from '@govcore/content'

export const DEAL_STAGES = [
  'prospecting',
  'qualified',
  'proposal',
  'negotiation',
  'won',
  'lost',
] as const

export const deal = defineContentType({
  name: 'deal',
  label: 'Deal',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'account', label: 'Account', type: 'reference', to: 'account' },
    { name: 'primary_contact', label: 'Primary contact', type: 'reference', to: 'contact' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'stage', label: 'Stage', type: 'text' }, // DEAL_STAGES
    { name: 'close_date', label: 'Expected close', type: 'date' },
    { name: 'notes', label: 'Notes', type: 'textarea' },
  ],
})

export const dealTable = buildContentTable(deal)

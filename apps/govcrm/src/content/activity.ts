// Activity — a planned or logged touch (call, meeting, task, note) tied to a
// Contact and/or Deal. Capabilities: sfa-task-activity-management,
// cdm-activity-timeline (first slice).

import { buildContentTable, defineContentType } from '@govcore/content'

export const ACTIVITY_TYPES = ['call', 'meeting', 'task', 'note'] as const

export const activity = defineContentType({
  name: 'activity',
  label: 'Activity',
  fields: [
    { name: 'subject', label: 'Subject', type: 'text', required: true },
    { name: 'activity_type', label: 'Type', type: 'text' }, // ACTIVITY_TYPES
    { name: 'due_date', label: 'Due', type: 'date' },
    { name: 'completed', label: 'Completed', type: 'boolean' },
    { name: 'contact', label: 'Contact', type: 'reference', to: 'contact' },
    { name: 'deal', label: 'Deal', type: 'reference', to: 'deal' },
    { name: 'notes', label: 'Notes', type: 'textarea' },
  ],
})

export const activityTable = buildContentTable(activity)

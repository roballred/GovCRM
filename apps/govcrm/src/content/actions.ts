// Generated, org-scoped, audited CRUD for every CRM content type — one line
// per type over the shared tenantAction (see ./tenant.ts).

import { generateContentActions } from '@govcore/content'
import { contentPermissions, tenantAction } from './tenant'
import { account, accountTable } from './account'
import { activity, activityTable } from './activity'
import { contact, contactTable } from './contact'
import { deal, dealTable } from './deal'
import { lead, leadTable } from './lead'

const opts = { permissions: contentPermissions }

export const accountActions = generateContentActions(tenantAction, account, accountTable, opts)
export const contactActions = generateContentActions(tenantAction, contact, contactTable, opts)
export const leadActions = generateContentActions(tenantAction, lead, leadTable, opts)
export const dealActions = generateContentActions(tenantAction, deal, dealTable, opts)
export const activityActions = generateContentActions(tenantAction, activity, activityTable, opts)

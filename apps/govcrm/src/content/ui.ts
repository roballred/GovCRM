// Per-type UI config for the content screens: reference option loaders (from
// the generated list() actions, RLS-scoped) and enumerated-field choices.

import type { ReferenceDisplayMap } from '@govcore/content/screens'
import { accountActions, contactActions, dealActions } from './actions'
import { ACTIVITY_TYPES } from './activity'
import { DEAL_STAGES } from './deal'
import { LEAD_STATUSES } from './lead'

type Row = Record<string, unknown>

export function toOptions(rows: Row[], labelKey: string) {
  return rows.map((r) => ({ value: String(r.id), label: String(r[labelKey] ?? r.id) }))
}

const cap = (v: string) => (v ? v[0].toUpperCase() + v.slice(1).replace(/-/g, ' ') : v)
export const choiceList = (vals: readonly string[]) => vals.map((v) => ({ value: v, label: cap(v) }))

/** Flatten a route's searchParams to the flat `Record<string,string>` ContentListScreen wants. */
export function toQuery(sp: Record<string, string | string[] | undefined>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? (v[0] ?? '') : (v ?? '')]),
  )
}

const ACCOUNT_TYPES = ['vendor', 'partner', 'community', 'other'] as const
const LEAD_SOURCES = ['web-form', 'referral', 'event', 'other'] as const

export const accountChoices = { account_type: choiceList(ACCOUNT_TYPES) }
export const leadChoices = { source: choiceList(LEAD_SOURCES), lead_status: choiceList(LEAD_STATUSES) }
export const dealChoices = { stage: choiceList(DEAL_STAGES) }
export const activityChoices = { activity_type: choiceList(ACTIVITY_TYPES) }

async function accountOptions() {
  return toOptions((await accountActions.list()) as Row[], 'name')
}
async function contactOptions() {
  return toOptions((await contactActions.list()) as Row[], 'full_name')
}
async function dealOptions() {
  return toOptions((await dealActions.list()) as Row[], 'name')
}

/** contact.account → accounts */
export async function contactRefs(): Promise<ReferenceDisplayMap> {
  return { account: { options: await accountOptions(), hrefBase: '/accounts' } }
}

/** deal.account → accounts; deal.primary_contact → contacts */
export async function dealRefs(): Promise<ReferenceDisplayMap> {
  const [accounts, contacts] = await Promise.all([accountOptions(), contactOptions()])
  return {
    account: { options: accounts, hrefBase: '/accounts' },
    primary_contact: { options: contacts, hrefBase: '/contacts' },
  }
}

/** activity.contact → contacts; activity.deal → deals */
export async function activityRefs(): Promise<ReferenceDisplayMap> {
  const [contacts, deals] = await Promise.all([contactOptions(), dealOptions()])
  return {
    contact: { options: contacts, hrefBase: '/contacts' },
    deal: { options: deals, hrefBase: '/deals' },
  }
}

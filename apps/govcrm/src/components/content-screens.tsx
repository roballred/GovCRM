// Local mirror of @govcore/content/screens as enhanced by GovCore PR #62
// (reference display, form selects, choices, parseContentForm). When
// @govcore/content 0.2.0 publishes, swap imports back to
// '@govcore/content/screens' and delete this file.

import type { ReactNode } from 'react'
import { Badge, DataTable, PageHeader, type Column } from '@govcore/nextkit'
import {
  isLinkField,
  isReferenceField,
  isTaxonomyField,
  taxonomyNodeColumn,
  WORKFLOW_STATUSES,
  type ContentTypeDefinition,
  type FieldDefinition,
  type WorkflowStatus,
} from '@govcore/content'

type Row = Record<string, unknown>

const STATUS_KEY = 'status'

function humanize(name: string): string {
  return name
    .split('_')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ')
}

function fieldLabel(f: { name: string; label?: string }): string {
  return f.label ?? humanize(f.name)
}

function fieldKey(f: FieldDefinition): string {
  if (isReferenceField(f)) return `${f.name}_id`
  if (isTaxonomyField(f)) return taxonomyNodeColumn(f.name)
  return f.name
}

export function statusTone(status: unknown): 'default' | 'muted' | 'danger' {
  switch (status as WorkflowStatus) {
    case 'published':
      return 'default'
    case 'archived':
      return 'danger'
    case 'draft':
      return 'muted'
    default:
      return 'muted'
  }
}

function primaryField(def: ContentTypeDefinition): FieldDefinition | undefined {
  return def.fields.find((f) => f.type === 'text') ?? def.fields.find((f) => f.type === 'textarea')
}

// ── Reference display (#61) ─────────────────────────────────────────────────

export interface ReferenceDisplay {
  options?: Array<{ value: string; label: string }>
  labels?: Record<string, string>
  hrefBase?: string
}

/** Keyed by the reference **field name** (`account`), not its `account_id` column. */
export type ReferenceDisplayMap = Record<string, ReferenceDisplay>

function refLabel(display: ReferenceDisplay | undefined, id: string): string {
  return (
    display?.labels?.[id] ??
    display?.options?.find((o) => o.value === id)?.label ??
    `${id.slice(0, 8)}…`
  )
}

function renderRefValue(display: ReferenceDisplay | undefined, value: unknown): ReactNode {
  if (value == null || value === '') return '—'
  const id = String(value)
  const label = refLabel(display, id)
  return display?.hrefBase ? (
    <a className="text-primary hover:underline" href={`${display.hrefBase}/${id}`}>
      {label}
    </a>
  ) : (
    label
  )
}

// ── Columns ─────────────────────────────────────────────────────────────────

export function contentColumns(
  def: ContentTypeDefinition,
  opts: { basePath?: string; references?: ReferenceDisplayMap } = {},
): Column<Row>[] {
  const primary = primaryField(def)
  const columns: Column<Row>[] = []

  for (const f of def.fields) {
    if (isLinkField(f)) continue
    const key = fieldKey(f)
    const isPrimary = primary?.name === f.name
    const refDisplay = isReferenceField(f) ? opts.references?.[f.name] : undefined
    columns.push({
      key,
      header: fieldLabel(f),
      cell:
        isPrimary && opts.basePath
          ? (row) => (
              <a className="font-medium text-primary hover:underline" href={`${opts.basePath}/${String(row.id ?? '')}`}>
                {String(row[key] ?? '')}
              </a>
            )
          : isReferenceField(f) && opts.references
            ? (row) => renderRefValue(refDisplay, row[key])
            : undefined,
    })
  }

  for (const c of def.computed ?? []) {
    columns.push({ key: c.name, header: fieldLabel(c) })
  }

  columns.push({
    key: STATUS_KEY,
    header: 'Status',
    cell: (row) => <Badge tone={statusTone(row.status)}>{String(row.status ?? '')}</Badge>,
  })

  return columns
}

// ── Form fields ─────────────────────────────────────────────────────────────

export interface ContentFormField {
  name: string
  label: string
  required: boolean
  kind: 'text' | 'textarea' | 'number' | 'checkbox' | 'date' | 'reference' | 'taxonomy'
  field?: string
}

const SCALAR_KIND: Record<string, ContentFormField['kind']> = {
  text: 'text',
  textarea: 'textarea',
  number: 'number',
  boolean: 'checkbox',
  date: 'date',
}

export function contentFormFields(def: ContentTypeDefinition): ContentFormField[] {
  const fields: ContentFormField[] = []
  for (const f of def.fields) {
    if (isReferenceField(f)) {
      fields.push({ name: `${f.name}_id`, label: fieldLabel(f), required: !!f.required, kind: 'reference', field: f.name })
    } else if (isTaxonomyField(f)) {
      fields.push({ name: taxonomyNodeColumn(f.name), label: fieldLabel(f), required: !!f.required, kind: 'taxonomy', field: f.name })
    } else if (SCALAR_KIND[f.type]) {
      fields.push({ name: f.name, label: fieldLabel(f), required: !!f.required, kind: SCALAR_KIND[f.type] })
    }
  }
  return fields
}

// ── Screens ─────────────────────────────────────────────────────────────────

export function ContentListScreen({
  def,
  rows,
  basePath,
  title,
  description,
  references,
}: {
  def: ContentTypeDefinition
  rows: Row[]
  basePath?: string
  title?: string
  description?: string
  references?: ReferenceDisplayMap
}) {
  const label = title ?? def.label ?? humanize(def.name)
  return (
    <div>
      <PageHeader title={label} description={description} />
      <DataTable columns={contentColumns(def, { basePath, references })} rows={rows} empty={`No ${label.toLowerCase()} yet.`} />
    </div>
  )
}

export function ContentDetailScreen({
  def,
  row,
  title,
  references,
  actions,
}: {
  def: ContentTypeDefinition
  row: Row
  title?: string
  references?: ReferenceDisplayMap
  actions?: ReactNode
}) {
  const primary = primaryField(def)
  const primaryValue = primary ? String(row[primary.name] ?? '') : ''
  const heading = title ?? (primaryValue || def.label || humanize(def.name))
  const entries = contentColumns(def, { references }).filter((c) => c.key !== STATUS_KEY)

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
        <Badge tone={statusTone(row.status)}>{String(row.status ?? '')}</Badge>
        {actions ? <div className="ml-auto">{actions}</div> : null}
      </div>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {entries.map((c) => (
          <div key={c.key}>
            <dt className="text-sm text-muted-foreground">{c.header}</dt>
            <dd className="mt-0.5 text-foreground">{c.cell ? c.cell(row) : String(row[c.key] ?? '')}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export type ContentFormAction = string | ((formData: FormData) => void | Promise<void>)

function inputClass(): string {
  return 'mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground'
}

export function ContentForm({
  def,
  action,
  row,
  submitLabel,
  references,
  choices,
}: {
  def: ContentTypeDefinition
  action: ContentFormAction
  row?: Row
  submitLabel?: string
  references?: ReferenceDisplayMap
  choices?: Record<string, Array<{ value: string; label: string }>>
}): ReactNode {
  const fields = contentFormFields(def)
  const editing = !!row?.id
  return (
    <form action={action} className="max-w-xl space-y-4">
      {editing ? <input type="hidden" name="id" value={String(row?.id ?? '')} /> : null}
      {fields.map((f) => {
        const value = row?.[f.name]
        const options =
          f.kind === 'reference' && f.field ? references?.[f.field]?.options : choices?.[f.name]
        return (
          <div key={f.name}>
            <label htmlFor={f.name} className="text-sm font-medium text-foreground">
              {f.label}
              {f.required ? <span className="text-destructive"> *</span> : null}
            </label>
            {options ? (
              <select
                id={f.name}
                name={f.name}
                required={f.required}
                defaultValue={String(value ?? '')}
                className={inputClass()}
              >
                {f.required ? null : <option value="">—</option>}
                {options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : f.kind === 'textarea' ? (
              <textarea id={f.name} name={f.name} required={f.required} defaultValue={String(value ?? '')} className={inputClass()} rows={4} />
            ) : f.kind === 'checkbox' ? (
              <input id={f.name} name={f.name} type="checkbox" defaultChecked={!!value} className="mt-1 block" />
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.kind === 'number' ? 'number' : f.kind === 'date' ? 'date' : 'text'}
                required={f.required}
                defaultValue={String(value ?? '')}
                className={inputClass()}
              />
            )}
          </div>
        )
      })}
      <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        {submitLabel ?? (editing ? 'Save' : `Create ${def.label ?? humanize(def.name)}`)}
      </button>
    </form>
  )
}

export function parseContentForm(def: ContentTypeDefinition, formData: FormData): Row {
  const row: Row = {}
  for (const f of contentFormFields(def)) {
    if (f.kind === 'checkbox') {
      row[f.name] = formData.get(f.name) === 'on'
      continue
    }
    const raw = formData.get(f.name)
    const value = typeof raw === 'string' ? raw.trim() : ''
    row[f.name] = value === '' ? (f.required ? '' : null) : value
  }
  return row
}

export const CONTENT_STATUSES = WORKFLOW_STATUSES

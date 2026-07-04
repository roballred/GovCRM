// Small server-renderable form controls shared by the CRM create forms —
// the generated ContentForm renders references as raw uuid inputs, so the
// app supplies selects instead.

import type { ReactNode } from 'react'

const inputClass =
  'mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  )
}

export function TextInput({
  name,
  label,
  required,
  type = 'text',
}: {
  name: string
  label: string
  required?: boolean
  type?: 'text' | 'email' | 'date' | 'number'
}) {
  return (
    <Field label={label} htmlFor={name}>
      <input id={name} name={name} type={type} required={required} step={type === 'number' ? '0.01' : undefined} className={inputClass} />
    </Field>
  )
}

export function TextArea({ name, label }: { name: string; label: string }) {
  return (
    <Field label={label} htmlFor={name}>
      <textarea id={name} name={name} rows={3} className={inputClass} />
    </Field>
  )
}

export function Select({
  name,
  label,
  options,
  placeholder = '—',
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
}) {
  return (
    <Field label={label} htmlFor={name}>
      <select id={name} name={name} defaultValue="" className={inputClass}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
    >
      {children}
    </button>
  )
}

// Minimal form controls for non-content-type forms (the platform console).
// Content-type forms use ContentForm; these cover everything else. nextkit
// ships no form primitives yet — flagged upstream.

import type { ReactNode } from 'react'

const inputClass = 'mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'

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
  defaultValue,
}: {
  name: string
  label: string
  required?: boolean
  type?: 'text' | 'email' | 'password'
  defaultValue?: string
}) {
  return (
    <Field label={label} htmlFor={name}>
      <input id={name} name={name} type={type} required={required} defaultValue={defaultValue} className={inputClass} />
    </Field>
  )
}

export function Select({
  name,
  label,
  options,
  defaultValue = '',
  placeholder,
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
  defaultValue?: string
  placeholder?: string
}) {
  return (
    <Field label={label} htmlFor={name}>
      <select id={name} name={name} defaultValue={defaultValue} className={inputClass}>
        {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string
  label: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} />
      {label}
    </label>
  )
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      {children}
    </button>
  )
}

/** Console error banner, driven by a `?error=` search param. */
export function ErrorNotice({ code, messages }: { code?: string; messages: Record<string, string> }) {
  if (!code) return null
  return (
    <p className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {messages[code] ?? 'Something went wrong.'}
    </p>
  )
}

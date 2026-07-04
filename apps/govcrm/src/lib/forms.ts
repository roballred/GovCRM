// Form-data coercion for content-engine inserts: empty strings must become
// null (uuid/date/numeric columns reject ''), checkboxes arrive as 'on'.

export function str(fd: FormData, key: string): string | null {
  const v = String(fd.get(key) ?? '').trim()
  return v === '' ? null : v
}

export function req(fd: FormData, key: string): string {
  return String(fd.get(key) ?? '').trim()
}

export function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === 'on'
}

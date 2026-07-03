export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">GovCRM</h1>
      <p className="mt-3 text-muted-foreground">
        A free, open-source CRM for state and local government — tenants, identity, RBAC, audit,
        and theming provided by the <code>@govcore/*</code> platform packages.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/contacts"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Contacts
        </a>
        <a href="/instance" className="rounded-md border border-border px-4 py-2 text-sm font-medium">
          Instance console
        </a>
        <a href="/login" className="rounded-md border border-border px-4 py-2 text-sm font-medium">
          Sign in
        </a>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Demo instance admin (after <code>pnpm seed</code>): <code>admin@govcrm.test</code> /{' '}
        <code>govcrm-demo</code>
      </p>
    </main>
  )
}

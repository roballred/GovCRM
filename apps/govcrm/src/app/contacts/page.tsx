import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/contact-actions'
import { ContentForm, ContentListScreen } from '@govcore/content/screens'

export const dynamic = 'force-dynamic'

// Capability: cdm-contact-management — first CRM domain slice. Org scoping,
// RLS, audit, and the content:write permission all come from tenantAction.
async function createContact(formData: FormData) {
  'use server'
  await contactActions.create({
    first_name: String(formData.get('first_name') ?? ''),
    last_name: String(formData.get('last_name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    organization_name: String(formData.get('organization_name') ?? ''),
    notes: String(formData.get('notes') ?? ''),
  })
  revalidatePath('/contacts')
}

export default async function ContactsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  // RLS-scoped to the active org by the tenantAction GUC — no org filter here.
  const rows = (await contactActions.list()) as Record<string, unknown>[]

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <ContentListScreen
        def={contact}
        rows={rows}
        basePath="/contacts"
        title="Contacts"
        description="People and organizations this office works with — the first slice of Customer Data Management."
      />

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">New contact</h2>
        <ContentForm def={contact} action={createContact} />
      </section>
    </main>
  )
}

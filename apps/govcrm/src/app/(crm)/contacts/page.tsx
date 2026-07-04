import { revalidatePath } from 'next/cache'
import { ContentListScreen } from '@govcore/content/screens'
import { contact } from '@/content/contact'
import { accountActions, contactActions } from '@/content/actions'
import { Select, SubmitButton, TextArea, TextInput } from '@/components/fields'
import { req, str } from '@/lib/forms'

export const dynamic = 'force-dynamic'

// Capability: cdm-contact-management
async function createContact(formData: FormData) {
  'use server'
  await contactActions.create({
    first_name: req(formData, 'first_name'),
    last_name: req(formData, 'last_name'),
    email: str(formData, 'email'),
    phone: str(formData, 'phone'),
    title: str(formData, 'title'),
    account_id: str(formData, 'account_id'),
    notes: str(formData, 'notes'),
  })
  revalidatePath('/contacts')
}

export default async function ContactsPage() {
  const [rows, accounts] = await Promise.all([contactActions.list(), accountActions.list()])

  const accountOptions = (accounts as Record<string, unknown>[]).map((a) => ({
    value: String(a.id),
    label: String(a.name),
  }))

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <ContentListScreen
        def={contact}
        rows={rows as Record<string, unknown>[]}
        basePath="/contacts"
        title="Contacts"
        description="People this office works with."
      />

      <section className="mt-10 max-w-xl">
        <h2 className="mb-3 text-lg font-semibold">New contact</h2>
        <form action={createContact} className="space-y-4">
          <TextInput name="first_name" label="First name" required />
          <TextInput name="last_name" label="Last name" required />
          <TextInput name="email" label="Email" type="email" />
          <TextInput name="phone" label="Phone" />
          <TextInput name="title" label="Title" />
          <Select name="account_id" label="Account" options={accountOptions} placeholder="No account" />
          <TextArea name="notes" label="Notes" />
          <SubmitButton>Create contact</SubmitButton>
        </form>
      </section>
    </main>
  )
}

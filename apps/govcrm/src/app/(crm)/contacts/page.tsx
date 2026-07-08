import { revalidatePath } from 'next/cache'
import { ContentForm, ContentListScreen, parseContentForm } from '@govcore/content/screens'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/actions'
import { contactRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-contact-management
async function createContact(formData: FormData) {
  'use server'
  await contactActions.create(parseContentForm(contact, formData))
  revalidatePath('/contacts')
}

export default async function ContactsPage() {
  const [rows, references] = await Promise.all([contactActions.list(), contactRefs()])

  return (
    <div className="max-w-4xl">
      <ContentListScreen
        def={contact}
        rows={rows as Record<string, unknown>[]}
        basePath="/contacts"
        references={references}
        title="Contacts"
        description="People this office works with."
      />

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">New contact</h2>
        <ContentForm def={contact} action={createContact} references={references} />
      </section>
    </div>
  )
}

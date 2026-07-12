import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@govcore/content/screens'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/actions'
import { contactRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-contact-management
async function createContact(formData: FormData) {
  'use server'
  await contactActions.create(parseContentForm(contact, formData))
  revalidatePath('/contacts')
  redirect('/contacts')
}

export default async function NewContactPage() {
  const references = await contactRefs()
  return (
    <div className="max-w-3xl">
      <a href="/contacts" className="text-sm text-primary hover:underline">
        ← Contacts
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">New contact</h1>
      <ContentForm def={contact} action={createContact} references={references} />
    </div>
  )
}

import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ContentForm, parseContentForm } from '@govcore/content/screens'
import { contact } from '@/content/contact'
import { contactActions } from '@/content/actions'
import { contactRefs } from '@/content/ui'

export const dynamic = 'force-dynamic'

// Capability: cdm-contact-management
async function updateContact(formData: FormData) {
  'use server'
  const id = String(formData.get('id'))
  await contactActions.update({ id, values: parseContentForm(contact, formData) })
  revalidatePath('/contacts')
  redirect(`/contacts/${id}`)
}

export default async function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [row, references] = await Promise.all([contactActions.get({ id }), contactRefs()])
  if (!row) notFound()

  return (
    <div className="max-w-3xl">
      <a href={`/contacts/${id}`} className="text-sm text-primary hover:underline">
        ← Back
      </a>
      <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">Edit contact</h1>
      <ContentForm def={contact} row={row as Record<string, unknown>} action={updateContact} references={references} />
    </div>
  )
}

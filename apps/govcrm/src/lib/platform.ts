'use server'

// Instance-console operator mutations (capability: po-instance-administration).
// These are the operator-plane counterpart to the content tenantActions: they run
// through `operatorAction` (privileged platformDb pool, instance_admin-gated, no
// tenant GUC) and delegate the actual write + audit to the GovCore platform
// functions — @govcore/tenancy for org/user administration, @govcore/auth for
// user provisioning. The DB write, the last-admin/own-admin guards, the
// membership write-sync, and the audit event all live in core now (#63/#65); this
// file is just the thin Next wrapper: parse FormData, map the typed result to the
// page's error query code, revalidate, and redirect.

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  createOrganization as createOrganizationCore,
  renameOrganization,
  updateUserAdministration,
} from '@govcore/tenancy'
import { provisionUser } from '@govcore/auth'
import { operatorAction } from '@/lib/operator'

const ADMIN_ROLE = 'admin'

export const createOrganization = operatorAction(async ({ ctx, db }, formData: FormData) => {
  const name = String(formData.get('name') ?? '')
  const slug = String(formData.get('slug') ?? '').trim()

  let error: string | null = null
  try {
    const result = await createOrganizationCore(db, {
      name,
      slug: slug || undefined,
      actorUserId: ctx.userId,
    })
    if (!result.ok) error = result.reason
  } catch {
    error = 'failed'
  }
  revalidatePath('/instance/organizations')
  redirect(error ? `/instance/organizations?error=${error}` : '/instance/organizations')
})

export const updateOrganization = operatorAction(async ({ ctx, db }, formData: FormData) => {
  const id = String(formData.get('id') ?? '')
  const name = String(formData.get('name') ?? '')

  const result = await renameOrganization(db, {
    organizationId: id,
    name,
    actorUserId: ctx.userId,
  })
  const error = result.ok ? null : result.reason
  revalidatePath('/instance/organizations')
  redirect(error ? `/instance/organizations/${id}/edit?error=${error}` : '/instance/organizations')
})

export const createUser = operatorAction(async ({ ctx, db }, formData: FormData) => {
  const email = String(formData.get('email') ?? '')
  const name = String(formData.get('name') ?? '').trim() || null
  const organizationId = String(formData.get('organization_id') ?? '')
  const role = String(formData.get('role') ?? 'viewer')
  const instanceAdmin = formData.get('instance_admin') === 'on'
  const password = String(formData.get('password') ?? '')

  let error: string | null = null
  try {
    const result = await provisionUser(db, {
      email,
      name,
      organizationId,
      role,
      instanceAdmin,
      password,
      actorUserId: ctx.userId,
    })
    if (!result.ok) {
      // Preserve the page's error vocabulary: core's `weak-password` is the
      // console's `password-too-short`.
      error = result.reason === 'weak-password' ? 'password-too-short' : result.reason
    }
  } catch {
    error = 'failed'
  }
  revalidatePath('/instance/users')
  redirect(error ? `/instance/users?error=${error}` : '/instance/users')
})

export const updateUser = operatorAction(async ({ ctx, db }, formData: FormData) => {
  const id = String(formData.get('id') ?? '')
  const role = String(formData.get('role') ?? 'viewer')
  const isActive = formData.get('is_active') === 'on'
  const instanceAdmin = formData.get('instance_admin') === 'on'

  const result = await updateUserAdministration(db, {
    userId: id,
    role,
    isActive,
    instanceAdmin,
    actorUserId: ctx.userId,
    adminRole: ADMIN_ROLE,
  })
  const error = result.ok ? null : result.reason
  revalidatePath('/instance/users')
  redirect(error ? `/instance/users/${id}/edit?error=${error}` : '/instance/users')
})

'use server'

// Audited platform actions for the instance console (capability:
// po-instance-administration). These are operator-plane mutations: they run on
// the privileged platformDb pool, are gated to instance_admin, and every one
// writes an audit event. They are NOT tenantActions — they legitimately cross
// org boundaries.

import { and, eq, ne } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { writeAuditLog } from '@govcore/audit'
import { hashPassword } from '@govcore/auth/password'
import { organizations, userOrganizationMemberships, users } from '@govcore/schema'
import { platformDb } from '@/db/client'
import { auth } from '@/lib/auth'

async function requireInstanceAdmin() {
  const session = await auth()
  const user = session?.user
  if (!user?.id || user.instanceRole !== 'instance_admin') redirect('/dashboard')
  return user
}

function isUniqueViolation(err: unknown): boolean {
  return !!err && typeof err === 'object' && 'code' in err && (err as { code?: string }).code === '23505'
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createOrganization(formData: FormData) {
  const actor = await requireInstanceAdmin()
  const name = String(formData.get('name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim() || slugify(name)

  let error: string | null = name ? null : 'name-required'
  if (!error) {
    try {
      const [org] = await platformDb.insert(organizations).values({ name, slug }).returning()
      await writeAuditLog(platformDb, {
        action: 'platform.org.create',
        entityType: 'organization',
        entityId: org.id,
        organizationId: org.id,
        userId: actor.id,
        after: { name, slug },
      })
    } catch (err) {
      error = isUniqueViolation(err) ? 'slug-taken' : 'failed'
    }
  }
  revalidatePath('/instance/organizations')
  redirect(error ? `/instance/organizations?error=${error}` : '/instance/organizations')
}

export async function updateOrganization(formData: FormData) {
  const actor = await requireInstanceAdmin()
  const id = String(formData.get('id') ?? '')
  const name = String(formData.get('name') ?? '').trim()

  let error: string | null = name ? null : 'name-required'
  if (!error) {
    const [before] = await platformDb.select().from(organizations).where(eq(organizations.id, id))
    if (!before) error = 'not-found'
    else {
      await platformDb
        .update(organizations)
        .set({ name, updatedAt: new Date() })
        .where(eq(organizations.id, id))
      await writeAuditLog(platformDb, {
        action: 'platform.org.update',
        entityType: 'organization',
        entityId: id,
        organizationId: id,
        userId: actor.id,
        before: { name: before.name },
        after: { name },
      })
    }
  }
  revalidatePath('/instance/organizations')
  redirect(error ? `/instance/organizations/${id}/edit?error=${error}` : '/instance/organizations')
}

export async function createUser(formData: FormData) {
  const actor = await requireInstanceAdmin()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const name = String(formData.get('name') ?? '').trim() || null
  const organizationId = String(formData.get('organization_id') ?? '')
  const role = String(formData.get('role') ?? 'viewer')
  const instanceAdmin = formData.get('instance_admin') === 'on'
  const password = String(formData.get('password') ?? '')

  let error: string | null = null
  if (!email || !organizationId) error = 'missing-fields'
  else if (password.length < 8) error = 'password-too-short'

  if (!error) {
    try {
      const passwordHash = await hashPassword(password)
      const [user] = await platformDb
        .insert(users)
        .values({
          email,
          name,
          organizationId,
          role,
          instanceRole: instanceAdmin ? 'instance_admin' : null,
          passwordHash,
        })
        .returning()
      await platformDb
        .insert(userOrganizationMemberships)
        .values({ userId: user.id, organizationId, role, isPrimary: true })
      await writeAuditLog(platformDb, {
        action: 'platform.user.create',
        entityType: 'user',
        entityId: user.id,
        organizationId,
        userId: actor.id,
        after: { email, role, instanceRole: user.instanceRole }, // never the password
      })
    } catch (err) {
      error = isUniqueViolation(err) ? 'email-taken' : 'failed'
    }
  }
  revalidatePath('/instance/users')
  redirect(error ? `/instance/users?error=${error}` : '/instance/users')
}

export async function updateUser(formData: FormData) {
  const actor = await requireInstanceAdmin()
  const id = String(formData.get('id') ?? '')
  const role = String(formData.get('role') ?? 'viewer')
  const isActive = formData.get('is_active') === 'on'
  const instanceAdmin = formData.get('instance_admin') === 'on'

  const [target] = await platformDb.select().from(users).where(eq(users.id, id))
  let error: string | null = target ? null : 'not-found'

  // Guard: an operator cannot remove their own instance_admin (lockout).
  if (!error && target.id === actor.id && !instanceAdmin) error = 'own-instance-admin'

  // Guard: the last active org admin cannot be demoted or deactivated.
  if (!error && target.role === 'admin' && (role !== 'admin' || !isActive)) {
    const others = await platformDb
      .select({ id: users.id })
      .from(users)
      .where(
        and(
          eq(users.organizationId, target.organizationId),
          eq(users.role, 'admin'),
          eq(users.isActive, true),
          ne(users.id, target.id),
        ),
      )
    if (others.length === 0) error = 'last-admin'
  }

  if (!error) {
    await platformDb
      .update(users)
      .set({
        role,
        isActive,
        instanceRole: instanceAdmin ? 'instance_admin' : null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
    // Keep the membership's role in sync with the denormalized cache on users.
    await platformDb
      .update(userOrganizationMemberships)
      .set({ role })
      .where(
        and(
          eq(userOrganizationMemberships.userId, id),
          eq(userOrganizationMemberships.organizationId, target.organizationId),
        ),
      )
    await writeAuditLog(platformDb, {
      action: 'platform.user.update',
      entityType: 'user',
      entityId: id,
      organizationId: target.organizationId,
      userId: actor.id,
      before: { role: target.role, isActive: target.isActive, instanceRole: target.instanceRole },
      after: { role, isActive, instanceRole: instanceAdmin ? 'instance_admin' : null },
    })
  }
  revalidatePath('/instance/users')
  redirect(error ? `/instance/users/${id}/edit?error=${error}` : '/instance/users')
}

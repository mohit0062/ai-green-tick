'use server'

import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { getAdminContext, requireSuperAdmin } from '@/utils/admin-auth'
import { hashPassword } from '@/utils/password'

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const getAdminAuthClient = () => {
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE

  if (!serviceRoleKey) return null

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

const findAuthUserByEmail = async (email: string): Promise<{ data?: { adminAuth: SupabaseClient; user?: User }; error?: string }> => {
  const adminAuth = getAdminAuthClient()
  if (!adminAuth) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY is missing in .env. Add it to sync admin passwords with Supabase Auth.' }
  }

  let page = 1
  const perPage = 1000

  while (true) {
    const { data, error } = await adminAuth.auth.admin.listUsers({ page, perPage })
    if (error) return { error: error.message }

    const user = data.users.find((authUser) => authUser.email?.toLowerCase() === email)
    if (user || data.users.length < perPage) return { data: { adminAuth, user } }

    page += 1
  }
}

const syncAuthPassword = async (email: string, password: string, metadata?: Record<string, string>) => {
  const lookup = await findAuthUserByEmail(email)
  if (lookup.error || !lookup.data) return { error: lookup.error || 'Unable to access Supabase Auth.' }

  const { adminAuth, user } = lookup.data

  if (user) {
    const { error } = await adminAuth.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
      user_metadata: {
        ...user.user_metadata,
        ...metadata,
      },
    })

    if (error) return { error: error.message }
    return { success: true }
  }

  const { error } = await adminAuth.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: metadata,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function getAdminsAction(): Promise<{ data?: any; error?: string }> {
  const guard = await requireSuperAdmin().catch((e: Error) => ({ error: e.message }))
  if ('error' in guard) return guard

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .order('email', { ascending: true })

  if (error) {
    console.error('Error fetching admins:', error)
    return { error: error.message }
  }
  return { data }
}

export async function updateAdminRoleAction(email: string, role: string): Promise<{ success?: boolean; error?: string }> {
  const guard = await requireSuperAdmin().catch((e: Error) => ({ error: e.message }))
  if ('error' in guard) return guard

  const supabase = await createClient()
  const { error } = await supabase
    .from('admin')
    .update({ role })
    .eq('email', normalizeEmail(email))

  if (error) {
    console.error('Error updating role:', error)
    return { error: error.message }
  }
  revalidatePath('/admin/users')
  return { success: true }
}

export async function deleteAdminAction(email: string): Promise<{ success?: boolean; error?: string }> {
  const guard = await requireSuperAdmin().catch((e: Error) => ({ error: e.message }))
  if ('error' in guard) return guard

  const supabase = await createClient()
  const { error } = await supabase
    .from('admin')
    .delete()
    .eq('email', normalizeEmail(email))

  if (error) {
    console.error('Error deleting admin:', error)
    return { error: error.message }
  }
  revalidatePath('/admin/users')
  return { success: true }
}

export async function createAdminAction(email: string, name: string, role: string, password?: string): Promise<{ success?: boolean; error?: string }> {
  const guard = await requireSuperAdmin().catch((e: Error) => ({ error: e.message }))
  if ('error' in guard) return guard

  const supabase = await createClient()
  const normalizedEmail = normalizeEmail(email)
  const normalizedPassword = password?.trim()

  if (!normalizedPassword) return { error: 'Password cannot be empty.' }

  // Check if user already exists
  const { data: existing } = await supabase
    .from('admin')
    .select('email')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (existing) {
    return { error: 'An admin with this email already exists in the database!' }
  }

  const authResult = await syncAuthPassword(normalizedEmail, normalizedPassword, { role, name })
  if (authResult.error) {
    console.error('Error syncing admin in auth:', authResult.error)
    return { error: authResult.error }
  }

  const { error } = await supabase
    .from('admin')
    .insert({
      email: normalizedEmail,
      name,
      role,
      avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=Admin_${name.replace(/\s+/g, '')}`,
      // Store a salted hash only. Real auth is handled by Supabase Auth above.
      password: hashPassword(normalizedPassword),
    })

  if (error) {
    console.error('Error creating admin:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/users')
  return { success: true }
}

export async function changePasswordAction(email: string, password?: string): Promise<{ success?: boolean; error?: string }> {
  const normalizedEmail = normalizeEmail(email)
  const normalizedPassword = password?.trim()
  if (!normalizedPassword) return { error: 'Password cannot be empty.' }

  // Authorization: only a super admin may change another user's password;
  // any authenticated admin may change their own.
  const ctx = await getAdminContext()
  if (!ctx) return { error: 'Unauthorized: Admin authentication required.' }
  const isSelf = ctx.email.toLowerCase() === normalizedEmail
  if (ctx.role !== 'super_admin' && !isSelf) {
    return { error: 'Forbidden: Only a Super Admin can change another user\u2019s password.' }
  }

  const supabase = await createClient()
  const fallbackEmail = process.env.ADMIN_FALLBACK_EMAIL?.trim().toLowerCase()

  if (!getAdminAuthClient() && fallbackEmail === normalizedEmail) {
    const { error: dbErr } = await supabase
      .from('admin')
      .update({ password: hashPassword(normalizedPassword) })
      .eq('email', normalizedEmail)

    if (dbErr) {
      console.error('Error updating fallback admin password:', dbErr)
      return { error: dbErr.message }
    }

    revalidatePath('/admin/users')
    return { success: true }
  }

  if (getAdminAuthClient()) {
    const authResult = await syncAuthPassword(normalizedEmail, normalizedPassword)
    if (authResult.error) {
      console.error('Error updating auth password:', authResult.error)
      return { error: authResult.error }
    }
  } else if (isSelf) {
    const { error: authErr } = await supabase.auth.updateUser({ password: normalizedPassword })
    if (authErr) {
      console.error('Error updating auth password:', authErr)
      return { error: authErr.message }
    }
  } else {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY is missing in .env. Password was not changed in Supabase Auth.' }
  }

  // Mirror a salted hash into public.admin for legacy/audit compatibility (never plaintext).
  const { error: dbErr } = await supabase
    .from('admin')
    .update({ password: hashPassword(normalizedPassword) })
    .eq('email', normalizedEmail)

  if (dbErr) {
    console.error('Error updating DB password:', dbErr)
    return { error: dbErr.message }
  }

  revalidatePath('/admin/users')
  return { success: true }
}

export async function getRolePermissionsAction(): Promise<{ data?: any; error?: string }> {
  const guard = await requireSuperAdmin().catch((e: Error) => ({ error: e.message }))
  if ('error' in guard) return guard

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_sections')
    .select('content')
    .eq('key', 'role_permissions')
    .maybeSingle()

  if (error) {
    console.error('Error fetching role permissions:', error)
    return { error: error.message }
  }
  return { data: data?.content || null }
}

export async function saveRolePermissionsAction(permissions: Record<string, string[]>): Promise<{ success?: boolean; error?: string }> {
  const guard = await requireSuperAdmin().catch((e: Error) => ({ error: e.message }))
  if ('error' in guard) return guard

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('site_sections')
    .select('id')
    .eq('key', 'role_permissions')
    .maybeSingle()

  let error
  if (existing) {
    const { error: err } = await supabase
      .from('site_sections')
      .update({ content: permissions })
      .eq('key', 'role_permissions')
    error = err
  } else {
    const { error: err } = await supabase
      .from('site_sections')
      .insert({
        key: 'role_permissions',
        category: 'settings',
        content: permissions,
      })
    error = err
  }

  if (error) {
    console.error('Error saving role permissions:', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

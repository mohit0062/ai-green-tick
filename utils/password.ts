import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

const KEYLEN = 64

/**
 * Produces a salted scrypt hash in the form `scrypt:<salt>:<derivedKey>`.
 * Used for the legacy `admin.password` column so we never persist plaintext.
 * Primary admin auth is handled by Supabase Auth; this is defense-in-depth for
 * the break-glass fallback comparison and audit column.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const derived = scryptSync(password, salt, KEYLEN).toString('hex')
  return `scrypt:${salt}:${derived}`
}

/**
 * Verifies a plaintext password against a stored value. Supports the new
 * scrypt format and, for backward compatibility, legacy plaintext rows that
 * predate hashing (those should be re-saved to migrate to a hash).
 */
export function verifyPassword(password: string, stored?: string | null): boolean {
  if (!stored) return false

  if (stored.startsWith('scrypt:')) {
    const [, salt, derived] = stored.split(':')
    if (!salt || !derived) return false
    const derivedBuf = Buffer.from(derived, 'hex')
    const testBuf = scryptSync(password, salt, KEYLEN)
    return derivedBuf.length === testBuf.length && timingSafeEqual(derivedBuf, testBuf)
  }

  // Legacy plaintext row (pre-hashing). Kept only for backward compatibility.
  return stored === password
}

import type * as T from '@app-designer/types'

/**
 * 生成 z.string().base64() 代码 (Base32)
 */
export function generateBase32(type: T.Base32): string {
  const parts: string[] = ['z.string().regex(/^[A-Z2-7]+=*$/)']

  if (type.minLength !== undefined) {
    parts.push(`.min(${type.minLength})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${type.maxLength})`)
  }

  return parts.join('')
}

/**
 * 生成 Base36 验证代码
 */
export function generateBase36(type: T.Base36): string {
  const parts: string[] = ['z.string().regex(/^[0-9A-Z]+$/i)']

  if (type.minLength !== undefined) {
    parts.push(`.min(${type.minLength})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${type.maxLength})`)
  }

  return parts.join('')
}

/**
 * 生成 z.string().base64() 代码
 */
export function generateBase64(type: T.Base64): string {
  const parts: string[] = ['z.string().base64()']

  if (type.minLength !== undefined) {
    parts.push(`.min(${type.minLength})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${type.maxLength})`)
  }

  return parts.join('')
}

/**
 * 生成 Base64URL 验证代码
 */
export function generateBase64URL(type: T.Base64URL): string {
  const parts: string[] = ['z.string().base64url()']

  if (type.minLength !== undefined) {
    parts.push(`.min(${type.minLength})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${type.maxLength})`)
  }

  return parts.join('')
}

/**
 * 生成十六进制验证代码
 */
export function generateHex(type: T.Hex): string {
  const parts: string[] = ['z.string().regex(/^[0-9A-Fa-f]+$/)']

  if (type.minLength !== undefined) {
    parts.push(`.min(${type.minLength})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${type.maxLength})`)
  }

  return parts.join('')
}

/**
 * 生成哈希验证代码
 */
export function generateHash(type: T.Hash): string {
  const hashLengths: Record<string, number> = {
    'md5': 32,
    'sha1': 40,
    'sha128': 32,
    'sha224': 56,
    'sha256': 64,
    'sha384': 96,
    'sha512': 128,
    'sha3-224': 56,
    'sha3-256': 64,
    'sha3-384': 96,
    'sha3-512': 128
  }

  const length = hashLengths[type.algorithm] || 64
  return `z.string().regex(/^[0-9A-Fa-f]{${length}}$/)`
}

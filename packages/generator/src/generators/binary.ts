import type * as T from '@app-designer/types'

/**
 * 计算 Base32 编码后的字符串长度（从字节数计算）
 * Base32: 每 5 字节编码为 8 个字符
 */
function base32EncodedLength(bytes: number): number {
  return Math.ceil(bytes * 8 / 5)
}

/**
 * 计算 Base36 编码后的字符串长度（从字节数计算）
 * Base36: 近似每字节编码为 1.6 个字符
 */
function base36EncodedLength(bytes: number): number {
  return Math.ceil(bytes * Math.log(256) / Math.log(36))
}

/**
 * 计算 Base64 编码后的字符串长度（从字节数计算）
 * Base64: 每 3 字节编码为 4 个字符
 */
function base64EncodedLength(bytes: number): number {
  return Math.ceil(bytes * 4 / 3)
}

/**
 * 计算 Hex 编码后的字符串长度（从字节数计算）
 * Hex: 每字节编码为 2 个字符
 */
function hexEncodedLength(bytes: number): number {
  return bytes * 2
}

/**
 * 生成 z.string().base64() 代码 (Base32)
 * minLength/maxLength 指的是原始二进制内容的字节长度
 */
export function generateBase32(type: T.Base32): string {
  const parts: string[] = ['z.string().regex(/^[A-Z2-7]+=*$/)']

  if (type.minLength !== undefined) {
    parts.push(`.min(${base32EncodedLength(type.minLength)})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${base32EncodedLength(type.maxLength)})`)
  }

  return parts.join('')
}

/**
 * 生成 Base36 验证代码
 * minLength/maxLength 指的是原始二进制内容的字节长度
 */
export function generateBase36(type: T.Base36): string {
  const parts: string[] = ['z.string().regex(/^[0-9A-Z]+$/i)']

  if (type.minLength !== undefined) {
    parts.push(`.min(${base36EncodedLength(type.minLength)})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${base36EncodedLength(type.maxLength)})`)
  }

  return parts.join('')
}

/**
 * 生成 z.string().base64() 代码
 * minLength/maxLength 指的是原始二进制内容的字节长度
 */
export function generateBase64(type: T.Base64): string {
  const parts: string[] = ['z.string().base64()']

  if (type.minLength !== undefined) {
    parts.push(`.min(${base64EncodedLength(type.minLength)})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${base64EncodedLength(type.maxLength)})`)
  }

  return parts.join('')
}

/**
 * 生成 Base64URL 验证代码
 * minLength/maxLength 指的是原始二进制内容的字节长度
 */
export function generateBase64URL(type: T.Base64URL): string {
  const parts: string[] = ['z.string().base64url()']

  if (type.minLength !== undefined) {
    parts.push(`.min(${base64EncodedLength(type.minLength)})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${base64EncodedLength(type.maxLength)})`)
  }

  return parts.join('')
}

/**
 * 生成十六进制验证代码
 * minLength/maxLength 指的是原始二进制内容的字节长度
 */
export function generateHex(type: T.Hex): string {
  const parts: string[] = ['z.string().regex(/^[0-9A-Fa-f]+$/)']

  if (type.minLength !== undefined) {
    parts.push(`.min(${hexEncodedLength(type.minLength)})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${hexEncodedLength(type.maxLength)})`)
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

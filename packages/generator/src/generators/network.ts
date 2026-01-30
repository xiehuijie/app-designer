import type * as T from '@app-designer/types'

/**
 * 生成 z.string().ip() 代码 (IPv4)
 */
export function generateIPv4(_type: T.IPv4): string {
  return 'z.string().ip({ version: "v4" })'
}

/**
 * 生成 z.string().ip() 代码 (IPv6)
 */
export function generateIPv6(_type: T.IPv6): string {
  return 'z.string().ip({ version: "v6" })'
}

/**
 * 生成 CIDR v4 验证代码
 */
export function generateCIDRv4(_type: T.CIDRv4): string {
  return 'z.string().cidr({ version: "v4" })'
}

/**
 * 生成 CIDR v6 验证代码
 */
export function generateCIDRv6(_type: T.CIDRv6): string {
  return 'z.string().cidr({ version: "v6" })'
}

/**
 * 生成 MAC 地址验证代码
 */
export function generateMAC(_type: T.MAC): string {
  return 'z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)'
}

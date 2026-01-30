import type * as T from '@app-designer/types'

/**
 * 生成 z.string().email() 代码
 */
export function generateEmail(type: T.Email): string {
  const parts: string[] = ['z.string().email()']

  // 支持根据 mode 和 domain 生成白名单 / 黑名单域名校验
  const emailType = type as unknown as {
    mode?: 'whitelist' | 'blacklist'
    domain?: string[] | string
  }

  const { mode } = emailType
  const domain = emailType.domain

  if (mode && domain !== undefined) {
    const domainsArray = Array.isArray(domain) ? domain : [domain]

    if (domainsArray.length > 0) {
      const serializedDomains = JSON.stringify(domainsArray)

      if (mode === 'whitelist') {
        parts.push(
          `.refine((value) => { const domain = value.split('@')[1]; if (!domain) return false; const allowed = ${serializedDomains}; return allowed.includes(domain); }, { message: 'Invalid email domain' })`,
        )
      } else if (mode === 'blacklist') {
        parts.push(
          `.refine((value) => { const domain = value.split('@')[1]; if (!domain) return false; const blocked = ${serializedDomains}; return !blocked.includes(domain); }, { message: 'Invalid email domain' })`,
        )
      }
    }
  }

  return parts.join('')
}

/**
 * 生成 z.string().uuid() 代码
 */
export function generateUUID(_type: T.UUID): string {
  return 'z.string().uuid()'
}

/**
 * 生成 z.string().cuid() 代码
 */
export function generateCUID(_type: T.CUID): string {
  return 'z.string().cuid()'
}

/**
 * 生成 z.string().uuid() 代码 (GUID 等同于 UUID)
 */
export function generateGUID(_type: T.GUID): string {
  return 'z.string().uuid()'
}

/**
 * 生成 z.string().ulid() 代码
 */
export function generateULID(_type: T.ULID): string {
  return 'z.string().ulid()'
}

/**
 * 生成 z.string().nanoid() 代码
 */
export function generateNanoID(type: T.NanoID): string {
  const parts: string[] = ['z.string().nanoid()']

  if (type.length !== undefined) {
    parts.push(`.length(${type.length})`)
  }

  return parts.join('')
}

/**
 * 生成 z.string().url() 代码
 */
export function generateURL(type: T.URL): string {
  const parts: string[] = ['z.string().url()']

  const hasProtocol = (type as any).protocol !== undefined
  const hasDomain = (type as any).domain !== undefined
  const hasPort = (type as any).port !== undefined
  const hasPath = (type as any).path !== undefined

  if (hasProtocol || hasDomain || hasPort || hasPath) {
    const checks: string[] = []

    if (hasProtocol) {
      const protocol = (type as any).protocol
      if (Array.isArray(protocol)) {
        const list = JSON.stringify(protocol.map((p: string) => p.replace(/:$/, '')))
        checks.push(
          `if (!${list}.includes(url.protocol.replace(/:$/, ''))) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL protocol' }); }`,
        )
      } else {
        const value = JSON.stringify(String(protocol).replace(/:$/, ''))
        checks.push(
          `if (url.protocol.replace(/:$/, '') !== ${value}) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL protocol' }); }`,
        )
      }
    }

    if (hasDomain) {
      const domain = (type as any).domain
      if (Array.isArray(domain)) {
        const list = JSON.stringify(domain)
        checks.push(
          `if (!${list}.includes(url.hostname)) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL domain' }); }`,
        )
      } else {
        const value = JSON.stringify(String(domain))
        checks.push(
          `if (url.hostname !== ${value}) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL domain' }); }`,
        )
      }
    }

    if (hasPort) {
      const port = (type as any).port
      if (Array.isArray(port)) {
        const list = JSON.stringify(port.map((p: number) => String(p)))
        checks.push(
          `if (!${list}.includes(url.port)) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL port' }); }`,
        )
      } else {
        const value = JSON.stringify(String(port))
        checks.push(
          `if (url.port !== ${value}) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL port' }); }`,
        )
      }
    }

    if (hasPath) {
      const path = (type as any).path
      if (Array.isArray(path)) {
        const list = JSON.stringify(path)
        checks.push(
          `if (!${list}.some((prefix: string) => url.pathname.startsWith(prefix))) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL path' }); }`,
        )
      } else {
        const value = JSON.stringify(String(path))
        checks.push(
          `if (!url.pathname.startsWith(${value})) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid URL path' }); }`,
        )
      }
    }

    const body = [
      '(value, ctx) => {',
      'try {',
      'const url = new URL(value);',
      '} catch {',
      'return;',
      '}',
      ...checks,
      '}',
    ].join('')

    parts.push(`.superRefine${body}`)
  }

  return parts.join('')
}

/**
 * 生成颜色验证代码
 */
export function generateColor(_type: T.Color): string {
  // Zod 没有内置颜色验证，使用正则表达式
  return 'z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/)'
}

/**
 * 生成时区验证代码
 */
export function generateTimezone(_type: T.Timezone): string {
  return 'z.string()'
}

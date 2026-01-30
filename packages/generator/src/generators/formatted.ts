import type * as T from '@app-designer/types'

/**
 * 生成 z.string().email() 代码
 */
export function generateEmail(_type: T.Email): string {
  return 'z.string().email()'
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
export function generateURL(_type: T.URL): string {
  return 'z.string().url()'
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

import type * as T from '@app-designer/types'

/**
 * 生成 z.iso.date() 代码 (Zod 4 标准)
 */
export function generateDate(_type: T.Date): string {
  return 'z.iso.date()'
}

/**
 * 生成 z.iso.time() 代码 (Zod 4 标准)
 */
export function generateTime(type: T.Time): string {
  if (type.precision !== undefined) {
    return `z.iso.time({ precision: ${type.precision} })`
  }
  return 'z.iso.time()'
}

/**
 * 生成 z.iso.datetime() 代码 (Zod 4 标准)
 */
export function generateDateTime(type: T.DateTime): string {
  const options: string[] = []

  if (type.offset !== undefined) {
    options.push(`offset: ${type.offset}`)
  }
  if (type.local !== undefined) {
    options.push(`local: ${type.local}`)
  }
  if (type.precision !== undefined) {
    options.push(`precision: ${type.precision}`)
  }

  if (options.length > 0) {
    return `z.iso.datetime({ ${options.join(', ')} })`
  }
  return 'z.iso.datetime()'
}

/**
 * 生成 z.iso.duration() 代码 (Zod 4 标准)
 */
export function generateDuration(_type: T.Duration): string {
  return 'z.iso.duration()'
}

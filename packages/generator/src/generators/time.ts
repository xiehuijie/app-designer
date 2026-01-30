import type * as T from '@app-designer/types'

/**
 * 生成 z.string().date() 代码
 */
export function generateDate(_type: T.Date): string {
  return 'z.string().date()'
}

/**
 * 生成 z.string().time() 代码
 */
export function generateTime(type: T.Time): string {
  if (type.precision !== undefined) {
    return `z.string().time({ precision: ${type.precision} })`
  }
  return 'z.string().time()'
}

/**
 * 生成 z.string().datetime() 代码
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
    return `z.string().datetime({ ${options.join(', ')} })`
  }
  return 'z.string().datetime()'
}

/**
 * 生成 z.string().duration() 代码
 */
export function generateDuration(_type: T.Duration): string {
  return 'z.string().duration()'
}

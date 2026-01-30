import type * as T from '@app-designer/types'

/**
 * 生成 z.string() 代码
 */
export function generateString(type: T.String): string {
  const parts: string[] = ['z.string()']

  if (type.pattern !== undefined) {
    parts.push(`.regex(new RegExp(${JSON.stringify(type.pattern)}))`)
  }
  if (type.minLength !== undefined) {
    parts.push(`.min(${type.minLength})`)
  }
  if (type.maxLength !== undefined) {
    parts.push(`.max(${type.maxLength})`)
  }

  return parts.join('')
}

/**
 * 生成 z.number() 代码
 */
export function generateNumber(type: T.Number): string {
  const parts: string[] = ['z.number()']

  if (type.minimum !== undefined) {
    if (type.exclusiveMinimum) {
      parts.push(`.gt(${type.minimum})`)
    } else {
      parts.push(`.gte(${type.minimum})`)
    }
  }
  if (type.maximum !== undefined) {
    if (type.exclusiveMaximum) {
      parts.push(`.lt(${type.maximum})`)
    } else {
      parts.push(`.lte(${type.maximum})`)
    }
  }
  if (type.multipleOf !== undefined) {
    parts.push(`.multipleOf(${type.multipleOf})`)
  }

  return parts.join('')
}

/**
 * 生成 z.boolean() 代码
 */
export function generateBoolean(_type: T.Boolean): string {
  return 'z.boolean()'
}

/**
 * 生成 z.literal() 代码
 */
export function generateLiteral(type: T.Literal): string {
  return `z.literal(${JSON.stringify(type.value)})`
}

/**
 * 生成 z.enum() 代码
 */
export function generateEnum(type: T.Enum): string {
  // Zod enum 只支持字符串数组
  const hasNonString = type.values.some(v => typeof v !== 'string')
  
  if (hasNonString) {
    // 使用 union of literals 来处理非字符串值
    const literals = type.values.map(v => `z.literal(${JSON.stringify(v)})`).join(', ')
    return `z.union([${literals}])`
  }
  
  const values = type.values.map(v => JSON.stringify(v)).join(', ')
  return `z.enum([${values}])`
}

/**
 * 生成 z.null() 代码
 */
export function generateNull(_type: T.Null): string {
  return 'z.null()'
}

/**
 * 生成 z.any() 代码
 */
export function generateAny(_type: T.Any): string {
  return 'z.any()'
}

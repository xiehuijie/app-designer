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
 * 注意：Zod 的 z.enum() 仅支持字符串数组，
 * 但可以通过 z.nativeEnum() 支持 number/boolean 等类型
 * 这里使用 union of literals 来统一处理所有类型
 */
export function generateEnum(type: T.Enum): string {
  // 处理空数组情况
  if (type.values.length === 0) {
    return 'z.never()'
  }

  // 单个值情况直接使用 literal
  if (type.values.length === 1) {
    return `z.literal(${JSON.stringify(type.values[0])})`
  }

  // Zod z.enum() 仅支持字符串数组，对于包含 number/boolean/null 的枚举使用 union of literals
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

import type * as T from '@app-designer/types'

/**
 * 生成 z.array() 代码
 */
export function generateArray(type: T.Array, generateZod: (type: T.Type) => string): string {
  const itemSchema = generateZod(type.itemType)
  const parts: string[] = [`z.array(${itemSchema})`]

  if (type.minItems !== undefined) {
    parts.push(`.min(${type.minItems})`)
  }
  if (type.maxItems !== undefined) {
    parts.push(`.max(${type.maxItems})`)
  }

  return parts.join('')
}

/**
 * 生成 z.object() 代码
 */
export function generateObject(type: T.Object, generateZod: (type: T.Type) => string): string {
  const properties = Object.entries(type.properties)
    .map(([key, value]) => {
      const schema = generateZod(value)
      const isRequired = type.required.includes(key)
      return `  ${JSON.stringify(key)}: ${schema}${isRequired ? '' : '.optional()'}`
    })
    .join(',\n')

  let result = `z.object({\n${properties}\n})`

  if (type.additionalProperties === true) {
    result += '.passthrough()'
  } else if (type.additionalProperties === false) {
    result += '.strict()'
  }

  return result
}

/**
 * 生成 z.tuple() 代码
 */
export function generateTuple(type: T.Tuple, generateZod: (type: T.Type) => string): string {
  const items = type.items.map(item => generateZod(item)).join(', ')
  return `z.tuple([${items}])`
}

/**
 * 生成 z.union() 代码 (anyOf)
 */
export function generateAnyOf(type: T.AnyOf, generateZod: (type: T.Type) => string): string {
  if (type.types.length === 0) {
    return 'z.never()'
  }
  if (type.types.length === 1) {
    return generateZod(type.types[0])
  }
  const types = type.types.map(t => generateZod(t)).join(', ')
  return `z.union([${types}])`
}

/**
 * 生成 z.intersection() 代码 (allOf)
 */
export function generateAllOf(type: T.AllOf, generateZod: (type: T.Type) => string): string {
  if (type.types.length === 0) {
    return 'z.never()'
  }
  if (type.types.length === 1) {
    return generateZod(type.types[0])
  }

  // 使用 intersection 链接多个类型
  let result = generateZod(type.types[0])
  for (let i = 1; i < type.types.length; i++) {
    result = `${result}.and(${generateZod(type.types[i])})`
  }
  return result
}

/**
 * 生成 z.discriminatedUnion() 或 z.union() 代码 (oneOf)
 */
export function generateOneOf(type: T.OneOf, generateZod: (type: T.Type) => string): string {
  if (type.types.length === 0) {
    return 'z.never()'
  }
  if (type.types.length === 1) {
    return generateZod(type.types[0])
  }
  const types = type.types.map(t => generateZod(t)).join(', ')
  return `z.union([${types}])`
}

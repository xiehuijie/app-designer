import type { Text } from './text'

/** 基础类型定义 */
export interface CommonTypeDefinition<T extends unknown = unknown> {
  /** 类型 ID */
  id: string
  /** 类型名称 */
  name: Text
  /** 类型描述 */
  description: Text
  /** 基类型 */
  type: string
  /** 精准类型匹配 */
  exact: boolean
  /** 示例 */
  examples: T[]
}
/** 字符串类型定义 */
export interface CommonStringTypeDefinition extends CommonTypeDefinition<string> {
  type: 'string'
}
/** 常规字符串类型定义 */
export interface NormalStringTypeDefinition extends CommonStringTypeDefinition {
  format: 'empty' | 'hex' | 'base64' | 'base64url'
  /** 最小长度 */
  minLength?: number
  /** 最大长度 */
  maxLength?: number
}
/** 特殊格式字符串类型定义 */
export interface SpecialStringTypeDefinition extends CommonStringTypeDefinition {
  format: 'email' | 'url' | 'ipv4' | 'ipv6' | 'cidrv4' | 'cidrv6' | 'mac' | 'uuid'
}
/** 日期型字符串类型定义 */
export interface DateStringTypeDefinition extends CommonStringTypeDefinition {
  format: 'isoDate'
}
/** 时间型字符串类型定义 */
export interface TimeStringTypeDefinition extends CommonStringTypeDefinition {
  format: 'isoTime'
  /** 时间精度 */
  precision: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
}
/** 日期时间型字符串类型定义 */
export interface DateTimeStringTypeDefinition extends CommonStringTypeDefinition {
  format: 'isoDateTime'
  /** 允许时区偏移 */
  offset: boolean
  /** 时间精度 */
  precision: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
}
/** 正则表达式字符串类型定义 */
export interface CustomStringTypeDefinition extends CommonStringTypeDefinition {
  format: 'custom'
  /** 自定义正则表达式 */
  regex: string
}
/** 字符串类型定义 */
export type StringTypeDefinition =
  | NormalStringTypeDefinition
  | SpecialStringTypeDefinition
  | DateStringTypeDefinition
  | TimeStringTypeDefinition
  | DateTimeStringTypeDefinition
  | CustomStringTypeDefinition

/** 数字类型定义 */
export interface NumberTypeDefinition extends CommonTypeDefinition<number> {
  type: 'number'
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 粒度 */
  step?: number
}
/** 布尔类型定义 */
export interface BooleanTypeDefinition extends CommonTypeDefinition<boolean> {
  type: 'boolean'
}
/** 空类型定义 */
export interface NullTypeDefinition extends CommonTypeDefinition<null> {
  type: 'null'
}
/** 枚举类型定义 */
export interface EnumTypeDefinition extends CommonTypeDefinition<string | number | boolean | null> {
  type: 'enum'
  /** 枚举值 */
  values: (string | number | boolean | null)[]
}
/** 基础类型定义 */
export type BaseTypeDefinition =
  | StringTypeDefinition
  | NumberTypeDefinition
  | BooleanTypeDefinition
  | EnumTypeDefinition
  | NullTypeDefinition

/** 对象属性定义 */
export interface PropertyTypeDefinition {
  /** 属性名称 */
  name: Text
  /** 属性描述 */
  description: Text
  /** 默认值 */
  default?: unknown
  /** 是否可选 */
  optional?: boolean
  /** 属性类型 */
  type: TypeDefinition
}

/** 对象类型定义 */
export interface ObjectTypeDefinition extends Omit<CommonTypeDefinition, 'examples' | 'exact'> {
  type: 'object'
  /** 属性定义 */
  properties: Record<string, PropertyTypeDefinition>
}

/** 数组类型定义 */
export interface ArrayTypeDefinition extends Omit<CommonTypeDefinition, 'examples' | 'exact'> {
  type: 'array'
  /** 元素类型定义 */
  items: TypeDefinition
}

/** 组合类型定义 */
export interface CompositeTypeDefinition extends Omit<CommonTypeDefinition, 'examples' | 'exact'> {
  type: 'anyOf' | 'allOf' | 'oneOf'
  /** 子类型定义 */
  types: Exclude<TypeDefinition, CompositeTypeDefinition>[]
}

/** 类型定义 */
export type TypeDefinition = BaseTypeDefinition | ObjectTypeDefinition | ArrayTypeDefinition | CompositeTypeDefinition
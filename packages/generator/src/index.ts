import type * as T from '@app-designer/types'

// 导入各类生成器
import {
  generateString,
  generateNumber,
  generateBoolean,
  generateLiteral,
  generateEnum,
  generateNull,
  generateAny,
  generateArray,
  generateObject,
  generateTuple,
  generateAnyOf,
  generateAllOf,
  generateOneOf,
  generateEmail,
  generateUUID,
  generateCUID,
  generateGUID,
  generateULID,
  generateNanoID,
  generateURL,
  generateColor,
  generateTimezone,
  generateBase32,
  generateBase36,
  generateBase64,
  generateBase64URL,
  generateHex,
  generateHash,
  generateIPv4,
  generateIPv6,
  generateCIDRv4,
  generateCIDRv6,
  generateMAC,
  generateDate,
  generateTime,
  generateDateTime,
  generateDuration,
  generateReference
} from './generators'

/**
 * 类型到生成器的映射表
 */
const generatorMap: Record<string, (type: any) => string> = {
  // 基础类型
  'string': generateString,
  'number': generateNumber,
  'boolean': generateBoolean,
  'literal': generateLiteral,
  'enum': generateEnum,
  'null': generateNull,
  'any': generateAny,

  // 复合类型
  'array': generateArray,
  'object': generateObject,
  'tuple': generateTuple,
  'anyOf': generateAnyOf,
  'allOf': generateAllOf,
  'oneOf': generateOneOf,

  // 格式化类型
  'email': generateEmail,
  'uuid': generateUUID,
  'cuid': generateCUID,
  'guid': generateGUID,
  'ulid': generateULID,
  'nanoid': generateNanoID,
  'url': generateURL,
  'color': generateColor,
  'timezone': generateTimezone,

  // 二进制类型
  'base32': generateBase32,
  'base36': generateBase36,
  'base64': generateBase64,
  'base64url': generateBase64URL,
  'hex': generateHex,
  'hash': generateHash,

  // 网络类型
  'ipv4': generateIPv4,
  'ipv6': generateIPv6,
  'cidrv4': generateCIDRv4,
  'cidrv6': generateCIDRv6,
  'mac': generateMAC,

  // 时间类型
  'date': generateDate,
  'time': generateTime,
  'datetime': generateDateTime,
  'duration': generateDuration,

  // 引用类型
  'ref': generateReference
}

/**
 * 根据类型定义生成 Zod 验证代码
 * @param type 类型定义对象
 * @returns 生成的 Zod 代码字符串
 */
export function generateZod(type: T.Type): string {
  const generator = generatorMap[type.type]

  if (!generator) {
    throw new Error(`Unknown type: ${type.type}`)
  }

  return generator(type)
}

// 导出所有生成器函数供需要时单独使用
export * from './generators'

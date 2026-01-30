import type * as T from '@app-designer/types'
import { generateZod, registerGenerator } from './generateZod'

// 导入各类生成器
import {
  generateString,
  generateNumber,
  generateBoolean,
  generateLiteral,
  generateEnum,
  generateNull,
  generateAny
} from './generators/basic'

import {
  generateArray,
  generateObject,
  generateTuple,
  generateAnyOf,
  generateAllOf,
  generateOneOf
} from './generators/composite'

import {
  generateEmail,
  generateUUID,
  generateCUID,
  generateGUID,
  generateULID,
  generateNanoID,
  generateURL,
  generateColor,
  generateTimezone
} from './generators/formatted'

import {
  generateBase32,
  generateBase36,
  generateBase64,
  generateBase64URL,
  generateHex,
  generateHash
} from './generators/binary'

import {
  generateIPv4,
  generateIPv6,
  generateCIDRv4,
  generateCIDRv6,
  generateMAC
} from './generators/network'

import {
  generateDate,
  generateTime,
  generateDateTime,
  generateDuration
} from './generators/time'

import { generateReference } from './generators/reference'

// 注册基础类型生成器
registerGenerator('string', generateString)
registerGenerator('number', generateNumber)
registerGenerator('boolean', generateBoolean)
registerGenerator('literal', generateLiteral)
registerGenerator('enum', generateEnum)
registerGenerator('null', generateNull)
registerGenerator('any', generateAny)

// 注册复合类型生成器
registerGenerator('array', generateArray)
registerGenerator('object', generateObject)
registerGenerator('tuple', generateTuple)
registerGenerator('anyOf', generateAnyOf)
registerGenerator('allOf', generateAllOf)
registerGenerator('oneOf', generateOneOf)

// 注册格式化类型生成器
registerGenerator('email', generateEmail)
registerGenerator('uuid', generateUUID)
registerGenerator('cuid', generateCUID)
registerGenerator('guid', generateGUID)
registerGenerator('ulid', generateULID)
registerGenerator('nanoid', generateNanoID)
registerGenerator('url', generateURL)
registerGenerator('color', generateColor)
registerGenerator('timezone', generateTimezone)

// 注册二进制类型生成器
registerGenerator('base32', generateBase32)
registerGenerator('base36', generateBase36)
registerGenerator('base64', generateBase64)
registerGenerator('base64url', generateBase64URL)
registerGenerator('hex', generateHex)
registerGenerator('hash', generateHash)

// 注册网络类型生成器
registerGenerator('ipv4', generateIPv4)
registerGenerator('ipv6', generateIPv6)
registerGenerator('cidrv4', generateCIDRv4)
registerGenerator('cidrv6', generateCIDRv6)
registerGenerator('mac', generateMAC)

// 注册时间类型生成器
registerGenerator('date', generateDate)
registerGenerator('time', generateTime)
registerGenerator('datetime', generateDateTime)
registerGenerator('duration', generateDuration)

// 注册引用类型生成器
registerGenerator('ref', generateReference)

// 导出主函数
export { generateZod } from './generateZod'

// 导出类型注册表相关函数
export { registerType, resolveReference, clearTypeRegistry, getRegisteredTypes } from './registry'

// 导出所有生成器函数供需要时单独使用
export * from './generators/basic'
export * from './generators/composite'
export * from './generators/formatted'
export * from './generators/binary'
export * from './generators/network'
export * from './generators/time'
export * from './generators/reference'

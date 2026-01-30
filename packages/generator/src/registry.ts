import type * as T from '@app-designer/types'

/**
 * 类型注册表，用于存储所有已定义的类型
 */
const typeRegistry: Map<string, T.Type> = new Map()

/**
 * 注册类型定义
 * @param name 类型名称/引用路径
 * @param type 类型定义
 */
export function registerType(name: string, type: T.Type): void {
  typeRegistry.set(name, type)
}

/**
 * 根据引用路径查找类型定义
 * @param ref 引用路径
 * @returns 类型定义，如果未找到则返回 undefined
 */
export function resolveReference(ref: string): T.Type | undefined {
  return typeRegistry.get(ref)
}

/**
 * 清空类型注册表
 */
export function clearTypeRegistry(): void {
  typeRegistry.clear()
}

/**
 * 获取所有已注册的类型
 */
export function getRegisteredTypes(): Map<string, T.Type> {
  return new Map(typeRegistry)
}

import type * as T from '@app-designer/types'

// 生成器函数类型
type GeneratorFunction = (type: any, generateZod: (type: T.Type) => string) => string

/**
 * 类型到生成器的映射表
 */
const generatorMap: Map<string, GeneratorFunction> = new Map()

/**
 * 注册生成器函数
 * @param typeName 类型名称
 * @param generator 生成器函数
 */
export function registerGenerator(typeName: string, generator: GeneratorFunction): void {
  generatorMap.set(typeName, generator)
}

/**
 * 根据类型定义生成 Zod 验证代码
 * @param type 类型定义对象
 * @returns 生成的 Zod 代码字符串
 */
export function generateZod(type: T.Type): string {
  const generator = generatorMap.get(type.type)

  if (!generator) {
    throw new Error(`Unknown type: ${type.type}`)
  }

  return generator(type, generateZod)
}

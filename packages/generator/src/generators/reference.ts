import type * as T from '@app-designer/types'
import { resolveReference } from '../registry'

/**
 * 生成引用类型代码
 * 通过引用路径查找实际类型定义，然后生成对应的 Zod 代码
 */
export function generateReference(type: T.Reference, generateZod: (type: T.Type) => string): string {
  const resolvedType = resolveReference(type.ref)
  
  if (resolvedType) {
    // 找到了引用的类型，直接生成对应的 Zod 代码
    return generateZod(resolvedType)
  }
  
  // 未找到引用的类型，使用 lazy 支持延迟解析（用于递归引用）
  // 将引用路径转换为安全的标识符
  const safeIdentifier = type.ref.replace(/[^A-Za-z0-9_$]/g, '_')
  return `z.lazy(() => ${safeIdentifier}Schema)`
}

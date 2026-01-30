import type * as T from '@app-designer/types'

/**
 * 生成引用类型代码
 * 引用类型需要在运行时解析，这里只生成占位符
 */
export function generateReference(type: T.Reference): string {
  // 使用 lazy 来支持递归引用
  return `z.lazy(() => ${type.ref}Schema)`
}

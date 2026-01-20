/**
 * 文件系统 Provider 抽象基类
 * 定义了访问文件系统的标准接口
 */

/** 文件/目录条目信息 */
export interface FileEntry {
  /** 文件名 */
  name: string
  /** 完整路径 */
  path: string
  /** 是否为目录 */
  isDirectory: boolean
  /** 是否为文件 */
  isFile: boolean
}

/** 目录列表结果 */
export interface DirectoryListResult {
  /** 目录路径 */
  path: string
  /** 目录中的条目 */
  items: FileEntry[]
}

/** 文件内容读取结果 */
export interface FileReadResult {
  /** 文件路径 */
  path: string
  /** 文件内容 */
  content: string
}

/** 文件写入结果 */
export interface FileWriteResult {
  /** 是否成功 */
  success: boolean
  /** 文件路径 */
  path: string
}

/** 文件/目录统计信息 */
export interface FileStatResult {
  /** 路径 */
  path: string
  /** 是否为目录 */
  isDirectory: boolean
  /** 是否为文件 */
  isFile: boolean
  /** 文件大小（字节） */
  size: number
  /** 创建时间 */
  created: string
  /** 修改时间 */
  modified: string
}

/** 路径存在检查结果 */
export interface PathExistsResult {
  /** 路径 */
  path: string
  /** 是否存在 */
  exists: boolean
}

/** 健康检查结果 */
export interface HealthCheckResult {
  /** 状态 */
  status: string
  /** Provider 类型 */
  provider: string
}

/**
 * 文件系统 Provider 抽象基类
 * 所有具体的 Provider 实现都需要继承此类
 */
export abstract class FileSystemProvider {
  /** Provider 名称 */
  abstract readonly name: string

  /**
   * 获取目录列表
   * @param path 目录路径
   * @returns 目录中的文件和子目录列表
   */
  abstract listDirectory(path: string): Promise<DirectoryListResult>

  /**
   * 读取文件内容
   * @param path 文件路径
   * @returns 文件内容
   */
  abstract readFile(path: string): Promise<FileReadResult>

  /**
   * 写入文件内容
   * @param path 文件路径
   * @param content 文件内容
   * @returns 写入结果
   */
  abstract writeFile(path: string, content: string): Promise<FileWriteResult>

  /**
   * 创建目录
   * @param path 目录路径
   * @returns 创建结果
   */
  abstract createDirectory(path: string): Promise<FileWriteResult>

  /**
   * 删除文件或目录
   * @param path 路径
   * @returns 删除结果
   */
  abstract delete(path: string): Promise<FileWriteResult>

  /**
   * 获取文件/目录统计信息
   * @param path 路径
   * @returns 统计信息
   */
  abstract stat(path: string): Promise<FileStatResult>

  /**
   * 检查路径是否存在
   * @param path 路径
   * @returns 是否存在
   */
  abstract exists(path: string): Promise<PathExistsResult>

  /**
   * 健康检查
   * @returns 健康状态
   */
  abstract healthCheck(): Promise<HealthCheckResult>
}

// ============ Provider 实例管理 ============

/** 当前活动的 Provider */
let currentProvider: FileSystemProvider | null = null

/**
 * 设置当前 Provider
 * @param provider Provider 实例
 */
export function setProvider(provider: FileSystemProvider): void {
  currentProvider = provider
}

/**
 * 获取当前 Provider
 * @returns 当前 Provider 实例
 * @throws 如果没有设置 Provider
 */
export function getProvider(): FileSystemProvider {
  if (!currentProvider) {
    throw new Error('No provider has been set. Call setProvider() first.')
  }
  return currentProvider
}

/**
 * 检查是否已设置 Provider
 * @returns 是否已设置
 */
export function hasProvider(): boolean {
  return currentProvider !== null
}

// 导出类型
export type { FileSystemProvider as IFileSystemProvider }

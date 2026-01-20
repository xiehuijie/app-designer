/**
 * Remote Provider - 基于 HTTP 请求的远程服务提供者
 * 用于连接 @app-designer/local 后端服务
 */

import {
  FileSystemProvider,
  type DirectoryListResult,
  type FileReadResult,
  type FileWriteResult,
  type FileStatResult,
  type PathExistsResult,
  type HealthCheckResult,
} from './index'

/** Remote Provider 配置选项 */
export interface RemoteProviderOptions {
  /** 后端服务器基础 URL */
  baseUrl: string
  /** 请求超时时间（毫秒） */
  timeout?: number
}

/**
 * Remote Provider 实现
 * 通过 HTTP API 与 local 后端通信
 */
export class RemoteProvider extends FileSystemProvider {
  readonly name = 'remote'
  
  private baseUrl: string
  private timeout: number

  constructor(options: RemoteProviderOptions) {
    super()
    this.baseUrl = options.baseUrl.replace(/\/$/, '') // 移除末尾斜杠
    this.timeout = options.timeout ?? 30000
  }

  /**
   * 发送 HTTP 请求的通用方法
   */
  private async request<T>(
    method: 'GET' | 'POST' | 'DELETE',
    endpoint: string,
    params?: Record<string, string>,
    body?: unknown
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error: ${response.status}`)
      }

      return await response.json()
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * 获取目录列表
   */
  async listDirectory(path: string): Promise<DirectoryListResult> {
    return this.request<DirectoryListResult>('GET', '/api/fs/list', { path })
  }

  /**
   * 读取文件内容
   */
  async readFile(path: string): Promise<FileReadResult> {
    return this.request<FileReadResult>('GET', '/api/fs/read', { path })
  }

  /**
   * 写入文件内容
   */
  async writeFile(path: string, content: string): Promise<FileWriteResult> {
    return this.request<FileWriteResult>('POST', '/api/fs/write', undefined, {
      path,
      content,
    })
  }

  /**
   * 创建目录
   */
  async createDirectory(path: string): Promise<FileWriteResult> {
    return this.request<FileWriteResult>('POST', '/api/fs/mkdir', undefined, {
      path,
    })
  }

  /**
   * 删除文件或目录
   */
  async delete(path: string): Promise<FileWriteResult> {
    return this.request<FileWriteResult>('DELETE', '/api/fs/delete', { path })
  }

  /**
   * 获取文件/目录统计信息
   */
  async stat(path: string): Promise<FileStatResult> {
    return this.request<FileStatResult>('GET', '/api/fs/stat', { path })
  }

  /**
   * 检查路径是否存在
   */
  async exists(path: string): Promise<PathExistsResult> {
    return this.request<PathExistsResult>('GET', '/api/fs/exists', { path })
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<HealthCheckResult> {
    return this.request<HealthCheckResult>('GET', '/api/health')
  }
}

/**
 * 创建连接到 local 后端的 Remote Provider
 * @param baseUrl 后端服务器地址，默认为 http://localhost:3001
 */
export function createRemoteProvider(baseUrl = 'http://localhost:3001'): RemoteProvider {
  return new RemoteProvider({ baseUrl })
}
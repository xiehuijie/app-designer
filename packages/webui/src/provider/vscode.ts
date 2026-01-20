/**
 * VS Code Provider - 在 VS Code 环境下基于插件的方式提供服务
 * 目前为占位实现
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

/**
 * VS Code Provider 实现
 * 通过 VS Code Extension API 与编辑器通信
 */
export class VSCodeProvider extends FileSystemProvider {
  readonly name = 'vscode'

  constructor() {
    super()
    console.warn('VSCodeProvider is not implemented yet')
  }

  async listDirectory(_path: string): Promise<DirectoryListResult> {
    throw new Error('VSCodeProvider.listDirectory is not implemented')
  }

  async readFile(_path: string): Promise<FileReadResult> {
    throw new Error('VSCodeProvider.readFile is not implemented')
  }

  async writeFile(_path: string, _content: string): Promise<FileWriteResult> {
    throw new Error('VSCodeProvider.writeFile is not implemented')
  }

  async createDirectory(_path: string): Promise<FileWriteResult> {
    throw new Error('VSCodeProvider.createDirectory is not implemented')
  }

  async delete(_path: string): Promise<FileWriteResult> {
    throw new Error('VSCodeProvider.delete is not implemented')
  }

  async stat(_path: string): Promise<FileStatResult> {
    throw new Error('VSCodeProvider.stat is not implemented')
  }

  async exists(_path: string): Promise<PathExistsResult> {
    throw new Error('VSCodeProvider.exists is not implemented')
  }

  async healthCheck(): Promise<HealthCheckResult> {
    throw new Error('VSCodeProvider.healthCheck is not implemented')
  }
}
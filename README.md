# app-designer

A visualization design application that structures data, defines business logic, specifies interface definitions, and allows exporting template code.

## Monorepo 结构

此项目采用 pnpm workspace monorepo 结构，包含以下包：

| 包名 | 路径 | 描述 |
|------|------|------|
| `@app-designer/webui` | `packages/webui` | 前端项目，提供交互式界面 |
| `@app-designer/local` | `packages/local` | 基于 Express 的本地后端服务器 |
| `@app-designer/vscode` | `packages/vscode` | VS Code 插件后端（待实现） |
| `@app-designer/tauri` | `packages/tauri` | 基于 Tauri 的桌面应用后端（待实现） |

## 快速开始

### 安装依赖

```sh
pnpm install
```

### 开发模式

```sh
# 启动前端开发服务器
pnpm start:webui

# 启动本地后端服务器（支持热更新）
pnpm start:local

# 同时启动前端和后端（需要两个终端）
# 终端 1:
pnpm start:local
# 终端 2:
pnpm start:webui
```

### 构建

```sh
# 构建本地版本（前端 + 后端）
pnpm build:local

# 构建 VS Code 插件（待实现）
pnpm build:vscode

# 构建 Tauri 桌面应用（待实现）
pnpm build:tauri
```

### 测试

```sh
# 运行单元测试
pnpm test:unit

# 运行端到端测试
pnpm test:e2e

# 类型检查
pnpm type-check
```

## 项目架构

### Provider 机制

前端 (`@app-designer/webui`) 通过 Provider 机制连接不同的后端：

- **Local Provider**: 连接 `@app-designer/local` 后端，访问本地文件系统
- **VS Code Provider**: 连接 `@app-designer/vscode` 后端，在 VS Code 中使用
- **Tauri Provider**: 连接 `@app-designer/tauri` 后端，作为独立桌面应用

### 本地后端 API

`@app-designer/local` 提供以下文件系统 API：

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/fs/list` | GET | 获取目录列表 |
| `/api/fs/read` | GET | 读取文件内容 |
| `/api/fs/write` | POST | 写入文件内容 |
| `/api/fs/mkdir` | POST | 创建目录 |
| `/api/fs/delete` | DELETE | 删除文件或目录 |
| `/api/fs/stat` | GET | 获取文件/目录信息 |
| `/api/fs/exists` | GET | 检查路径是否存在 |
| `/api/health` | GET | 健康检查 |

## 推荐 IDE 配置

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 推荐浏览器配置

- Chromium 浏览器 (Chrome, Edge, Brave 等):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 许可证

查看 [LICENSE](./LICENSE) 文件。

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```

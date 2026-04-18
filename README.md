# app-designer
A visualization design application that structures data, defines business logic, specifies interface definitions, and allows exporting template code.

## Changesets Workflow

### 1. 开发阶段（在功能 PR 中）

1. 对 `apps/*` 或 `packages/*` 进行用户可见改动后，执行 `pnpm changeset`。
2. 选择变更类型（patch/minor/major）并填写变更说明。
3. 提交生成的 `.changeset/*.md` 文件到该 PR。

### 2. 版本管理（main 分支）

- 本仓库使用 Changesets 的 `fixed` 组策略，`apps` 与 `packages` 下现有包会保持同一版本号。
- 当 changeset 合并到 `main` 后，CI 会自动创建或更新版本 PR（`chore: version packages`）。
- 合并该版本 PR 后，所有固定组包的 `version` 会被统一提升。

### 3. 发布阶段（可选）

- 本地检查：`pnpm changeset:status`
- 本地改版本：`pnpm changeset:version`
- 发布到 npm（按需）：`pnpm changeset:publish`

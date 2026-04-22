import * as path from "node:path";
import * as vscode from "vscode";

const VIEW_ID = "appDesignerProjectTree";
const COMMAND_SELECT_PROJECT = "appDesigner.selectProject";
const COMMAND_REFRESH_PROJECTS = "appDesigner.refreshProjects";

const EXCLUDED_DIRECTORY_NAMES = new Set([
  "node_modules",
  ".git",
  "dist",
  "out",
  "build",
  ".next",
  ".turbo",
  "coverage",
]);

type AppDesignProject = {
  id: string;
  name: string;
  title: string;
  rootUri: vscode.Uri;
  appmetaUri: vscode.Uri;
};

type ProjectPickerNode = {
  kind: "picker";
};

type FileTreeNode = {
  kind: "folder" | "file";
  projectId: string;
  uri: vscode.Uri;
  label: string;
  isRoot?: boolean;
};

type ProjectTreeNode = ProjectPickerNode | FileTreeNode;

type ProjectQuickPickItem = vscode.QuickPickItem & {
  project: AppDesignProject;
};

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

class AppDesignerProjectTreeProvider implements vscode.TreeDataProvider<ProjectTreeNode> {
  private readonly onDidChangeTreeDataEmitter = new vscode.EventEmitter<
    ProjectTreeNode | undefined | void
  >();

  readonly onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;

  private projects: AppDesignProject[] = [];
  private selectedProjectId: string | undefined;
  private treeView: vscode.TreeView<ProjectTreeNode> | undefined;

  attachTreeView(treeView: vscode.TreeView<ProjectTreeNode>): void {
    this.treeView = treeView;
    this.updateTreeViewMeta();
  }

  async refreshProjects(showMessage = false): Promise<void> {
    const previousSelectedProjectId = this.selectedProjectId;
    this.projects = await this.scanWorkspaceProjects();

    if (this.projects.length === 0) {
      this.selectedProjectId = undefined;
      this.updateTreeViewMeta();
      this.onDidChangeTreeDataEmitter.fire();

      if (showMessage) {
        void vscode.window.showWarningMessage(
          "当前工作区未找到应用设计项目（未发现 appmeta.json）。",
        );
      }

      return;
    }

    const hasPreviousSelection = this.projects.some(
      (project) => project.id === previousSelectedProjectId,
    );

    this.selectedProjectId = hasPreviousSelection
      ? previousSelectedProjectId
      : this.projects[0]?.id;

    this.updateTreeViewMeta();
    this.onDidChangeTreeDataEmitter.fire();
  }

  async selectProject(): Promise<void> {
    await this.refreshProjects(false);

    if (this.projects.length === 0) {
      void vscode.window.showWarningMessage(
        "当前工作区未找到应用设计项目（未发现 appmeta.json）。",
      );
      return;
    }

    const quickPickItems: ProjectQuickPickItem[] = this.projects.map((project) => ({
      label: project.title,
      description: project.name,
      detail: vscode.workspace.asRelativePath(project.rootUri, false),
      picked: project.id === this.selectedProjectId,
      project,
    }));

    const selected = await vscode.window.showQuickPick(quickPickItems, {
      placeHolder: "选择当前工作区中的应用设计项目",
      title: "应用设计项目管理",
      matchOnDescription: true,
      matchOnDetail: true,
    });

    if (!selected) {
      return;
    }

    this.selectedProjectId = selected.project.id;
    this.updateTreeViewMeta();
    this.onDidChangeTreeDataEmitter.fire();
  }

  getTreeItem(element: ProjectTreeNode): vscode.TreeItem {
    if (element.kind === "picker") {
      const selectedProject = this.getSelectedProject();
      const label = selectedProject ? `当前项目: ${selectedProject.title}` : "选择应用设计项目";

      const pickerItem = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.None);
      pickerItem.tooltip = "点击选择工作区中的应用设计项目";
      pickerItem.description = selectedProject ? selectedProject.name : "点击选择";
      pickerItem.iconPath = new vscode.ThemeIcon("chevron-down");
      pickerItem.command = {
        command: COMMAND_SELECT_PROJECT,
        title: "选择应用设计项目",
      };
      return pickerItem;
    }

    const collapsibleState =
      element.kind === "folder"
        ? element.isRoot
          ? vscode.TreeItemCollapsibleState.Expanded
          : vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None;

    const treeItem = new vscode.TreeItem(element.label, collapsibleState);
    treeItem.resourceUri = element.uri;
    treeItem.tooltip = vscode.workspace.asRelativePath(element.uri, false);

    if (element.kind === "folder") {
      treeItem.iconPath = element.isRoot
        ? new vscode.ThemeIcon("root-folder")
        : vscode.ThemeIcon.Folder;
      treeItem.contextValue = element.isRoot ? "rootFolder" : "folder";
      return treeItem;
    }

    treeItem.iconPath = vscode.ThemeIcon.File;
    treeItem.contextValue = "file";
    treeItem.command = {
      command: "vscode.open",
      title: "打开文件",
      arguments: [element.uri],
    };

    return treeItem;
  }

  async getChildren(element?: ProjectTreeNode): Promise<ProjectTreeNode[]> {
    if (!element) {
      const rootNodes: ProjectTreeNode[] = [{ kind: "picker" }];
      const selectedProject = this.getSelectedProject();

      if (!selectedProject) {
        return rootNodes;
      }

      rootNodes.push({
        kind: "folder",
        projectId: selectedProject.id,
        uri: selectedProject.rootUri,
        label: path.basename(selectedProject.rootUri.fsPath),
        isRoot: true,
      });

      return rootNodes;
    }

    if (element.kind === "picker" || element.kind === "file") {
      return [];
    }

    return this.readDirectoryChildren(element.uri, element.projectId);
  }

  private updateTreeViewMeta(): void {
    if (!this.treeView) {
      return;
    }

    const selectedProject = this.getSelectedProject();
    this.treeView.description = selectedProject ? selectedProject.title : "未选择项目";
    this.treeView.message =
      this.projects.length > 0 ? undefined : "未找到 appmeta.json，对应项目不可选。";
  }

  private getSelectedProject(): AppDesignProject | undefined {
    return this.projects.find((project) => project.id === this.selectedProjectId);
  }

  private async scanWorkspaceProjects(): Promise<AppDesignProject[]> {
    const appmetaFiles = await vscode.workspace.findFiles(
      "**/appmeta.json",
      "**/{node_modules,.git,dist,out,build,.next,.turbo,coverage}/**",
    );

    const projects = new Map<string, AppDesignProject>();

    for (const appmetaUri of appmetaFiles) {
      const rootUri = vscode.Uri.joinPath(appmetaUri, "..");
      const projectId = rootUri.toString();

      if (projects.has(projectId)) {
        continue;
      }

      const folderName = path.basename(rootUri.fsPath);
      const appmetaJson = await this.readAppmetaJson(appmetaUri);
      const name = readString(appmetaJson?.name) ?? folderName;
      const title = readString(appmetaJson?.title) ?? name;

      projects.set(projectId, {
        id: projectId,
        name,
        title,
        rootUri,
        appmetaUri,
      });
    }

    return [...projects.values()].sort((a, b) => a.title.localeCompare(b.title));
  }

  private async readAppmetaJson(
    appmetaUri: vscode.Uri,
  ): Promise<Record<string, unknown> | undefined> {
    try {
      const content = await vscode.workspace.fs.readFile(appmetaUri);
      const text = Buffer.from(content).toString("utf8");
      return JSON.parse(text) as Record<string, unknown>;
    } catch {
      return undefined;
    }
  }

  private async readDirectoryChildren(
    directoryUri: vscode.Uri,
    projectId: string,
  ): Promise<ProjectTreeNode[]> {
    const entries = await vscode.workspace.fs.readDirectory(directoryUri);
    const children: FileTreeNode[] = [];

    for (const [name, fileType] of entries) {
      const isDirectory = (fileType & vscode.FileType.Directory) === vscode.FileType.Directory;

      if (isDirectory && EXCLUDED_DIRECTORY_NAMES.has(name)) {
        continue;
      }

      const kind: "folder" | "file" = isDirectory ? "folder" : "file";
      children.push({
        kind,
        projectId,
        uri: vscode.Uri.joinPath(directoryUri, name),
        label: name,
      });
    }

    return children.sort((a, b) => {
      if (a.kind !== b.kind) {
        return a.kind === "folder" ? -1 : 1;
      }

      return a.label.localeCompare(b.label);
    });
  }
}

export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new AppDesignerProjectTreeProvider();
  const treeView = vscode.window.createTreeView(VIEW_ID, {
    treeDataProvider,
    showCollapseAll: true,
  });
  treeDataProvider.attachTreeView(treeView);

  const selectProjectDisposable = vscode.commands.registerCommand(
    COMMAND_SELECT_PROJECT,
    async () => {
      await treeDataProvider.selectProject();
    },
  );

  const refreshProjectsDisposable = vscode.commands.registerCommand(
    COMMAND_REFRESH_PROJECTS,
    async () => {
      await treeDataProvider.refreshProjects(true);
    },
  );

  const appmetaWatcher = vscode.workspace.createFileSystemWatcher("**/appmeta.json");
  const refreshFromWatcher = (): void => {
    void treeDataProvider.refreshProjects(false);
  };
  appmetaWatcher.onDidCreate(refreshFromWatcher);
  appmetaWatcher.onDidChange(refreshFromWatcher);
  appmetaWatcher.onDidDelete(refreshFromWatcher);

  void treeDataProvider.refreshProjects(false);

  context.subscriptions.push(treeView);
  context.subscriptions.push(selectProjectDisposable);
  context.subscriptions.push(refreshProjectsDisposable);
  context.subscriptions.push(appmetaWatcher);
}

export function deactivate() {}

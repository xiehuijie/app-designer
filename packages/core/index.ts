import type { IProject } from "@app-designer/types";
import { AppMetaSchema } from "@app-designer/types";

export class DesignProject implements IProject {
  /** 应用元数据 */
  public readonly appMeta: AppMetaOutput;

  constructor(appMeta: AppMetaInput) {
    this.appMeta = AppMetaSchema.parse(appMeta);
  }
}

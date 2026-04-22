import type { IProject } from "@app-designer/types";
import { AppMetaSchema } from "@app-designer/types";

export class DesignProject implements IProject {
  public readonly appMeta: AppMetaOutput;

  constructor(appMeta: AppMetaInput) {
    this.appMeta = AppMetaSchema.parse(appMeta);
  }

  registerType(typeDefinition: BuiltinType): void {}
}

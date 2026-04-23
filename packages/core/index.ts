import type { IProject } from "@app-designer/types";
import { AppMetaSchema, TypeSchema } from "@app-designer/types";

export class DesignProject implements IProject {
  public readonly appMeta: AppMetaOutput;
  public readonly types: Record<string, TypeDefinitionOutput> = {};

  constructor(appMeta: AppMetaInput) {
    this.appMeta = AppMetaSchema.parse(appMeta);
  }

  registerType(path: string, typeDefinition: TypeDefinitionInput): void {
    this.types[path] = TypeSchema.parse(typeDefinition) as TypeDefinitionOutput;
  }
}

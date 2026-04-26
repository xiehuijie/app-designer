import type { IProject } from "./core";

export interface GeneratorDefinition<Config = unknown> {
  name: string;
  generate: (project: IProject, config: Config) => Promise<void>;
}

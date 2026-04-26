import type { GeneratorDefinition } from "@app-designer/schemas";

interface ZodGeneratorConfig {
  // Add any configuration options for the Zod generator here
}
export default {
  name: "Zod",
  generate: async (_project, _config: ZodGeneratorConfig) => {},
} satisfies GeneratorDefinition<ZodGeneratorConfig>;

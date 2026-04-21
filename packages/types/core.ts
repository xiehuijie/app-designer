import { z } from "zod";

export const I18nLocaleSchema = z.string();

export const LanguageSchema = z.object({
  /** 语言代码 */
  code: I18nLocaleSchema,
  /** 语言名称 */
  name: z.string(),
});

export const ZodGeneratorSchema = z.object({
  /** 生成器类型 */
  type: z.literal("zod"),
  /** 生成文件输出路径 */
  outputPath: z.string(),
});

export const OpenApiGeneratorSchema = z.object({
  /** 生成器类型 */
  type: z.literal("openapi"),
  /** 生成文件输出路径 */
  outputPath: z.string(),
});

export const GeneratorSchema = z.union([ZodGeneratorSchema, OpenApiGeneratorSchema]);

export const AppMetaSchema = z
  .object({
    /** 应用名称 */
    name: z.string(),
    /** 应用版本 */
    version: z.string(),
    /** 应用描述 */
    description: z.string().optional(),
    /** 应用程序的作者 */
    author: z.string().optional(),
    /** 应用程序支持的语言列表 */
    languages: z.array(LanguageSchema).default([{ code: "default", name: "默认语言" }]),
    /** 应用程序的默认语言 */
    defaultLanguage: I18nLocaleSchema.optional(),
    /** 生成器配置 */
    generators: z.array(GeneratorSchema).default([]),
    /** 应用设计器的最低版本要求，例如`0.1.0`。 */
    engine: z.string().optional(),
  })
  .transform((appMeta) => ({
    ...appMeta,
    /** 应用程序的默认语言 */
    defaultLanguage: appMeta.defaultLanguage ?? appMeta.languages[0]?.code ?? "default",
  }))
  .superRefine((appMeta, ctx) => {
    const languages = appMeta.languages.map((language) => language.code);

    if (languages.includes(appMeta.defaultLanguage) === false) {
      ctx.addIssue({
        code: "invalid_value",
        values: languages,
        path: ["defaultLanguage"],
        message: `defaultLanguage must be one of the languages defined in the languages array.}`,
      });
    }
  });

export type AppMetaInput = z.input<typeof AppMetaSchema>;
export type AppMetaOutput = z.output<typeof AppMetaSchema>;

export interface IProject {
  readonly appMeta: AppMetaOutput;
}

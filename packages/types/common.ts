import { z } from "zod";

export const I18nTextSchema = z.record(z.string(), z.string());
export const MatchModeSchema = z.enum(["whitelist", "blacklist", "none"]);
export const LiteralValueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export const MatchStringListSchema = z.object({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的范围 */
  value: z.array(z.string()),
});
export const MatchNumberListSchema = z.object({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的范围 */
  value: z.array(z.number()),
});

export type I18nTextInput = z.input<typeof I18nTextSchema>;
export type I18nTextOutput = z.output<typeof I18nTextSchema>;

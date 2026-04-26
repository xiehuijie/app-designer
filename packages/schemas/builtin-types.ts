import { z } from "zod";
import {
  I18nTextSchema,
  MatchModeSchema,
  LiteralValueSchema,
  MatchStringListSchema,
  MatchNumberListSchema,
} from "./common";

const BuiltinTypeList = [
  "string",
  "number",
  "boolean",
  "literal",
  "enum",
  "null",
  "any",
  "array",
  "object",
  "tuple",
  "anyOf",
  "allOf",
  "oneOf",
  "email",
  "uuid",
  "cuid",
  "guid",
  "ulid",
  "nanoid",
  "color",
  "timezone",
  "url",
  "base32",
  "base36",
  "base64",
  "base64url",
  "hex",
  "hash",
  "ipv4",
  "ipv6",
  "cidrv4",
  "cidrv6",
  "mac",
  "date",
  "time",
  "datetime",
  "duration",
  "ref",
  "codec",
] as const;
type BuiltinTypeKey = (typeof BuiltinTypeList)[number];

export const DefaultIconMap = {
  string: "oui:string",
  number: "oui:number",
  boolean: "oui:boolean",
  literal: "carbon:quotes",
  enum: "mdi:format-list-bulleted-type",
  null: "mdi:null",
  any: "mdi:asterisk",
  array: "mdi:code-brackets-square",
  object: "mdi:code-json",
  tuple: "mdi:table-row",
  anyOf: "mdi:set-all",
  allOf: "mdi:set-center-right",
  oneOf: "mdi:set-left-right",
  email: "material-symbols:alternate-email",
  uuid: "mdi:identifier",
  cuid: "mdi:identifier",
  guid: "mdi:identifier",
  ulid: "mdi:identifier",
  nanoid: "mdi:fingerprint",
  color: "mdi:palette",
  timezone: "mdi:timezone",
  url: "mdi:link-variant",
  base32: "mdi:code-string",
  base36: "mdi:code-string",
  base64: "mdi:code-string",
  base64url: "mdi:code-string",
  hex: "mdi:code-string",
  hash: "mdi:hash",
  ipv4: "mdi:ip-network",
  ipv6: "mdi:ip-network",
  cidrv4: "mdi:ip-network",
  cidrv6: "mdi:ip-network",
  mac: "mdi:network-outline",
  date: "mdi:calendar",
  time: "mdi:clock-outline",
  datetime: "mdi:calendar-clock",
  duration: "mdi:timer-sand",
  ref: "mdi:link-box-variant",
  codec: "mdi:swap-horizontal-bold",
} satisfies Record<BuiltinTypeKey, string>;

const BaseSchemaMap = (() => {
  const base = z.object({
    /** 类型唯一标识符 */
    id: z.string(),
    /** 名称 */
    title: I18nTextSchema,
    /** 描述 */
    description: I18nTextSchema.optional(),
    /** 图标 */
    icon: z.string().default("mdi:shape-outline"),
    /** 排序值 */
    sort: z.number().default(0),
    /** 类型 */
    type: z.string(),
    /** 示例 */
    examples: z.array(z.unknown()).default([]),
  });
  const binary = base.extend({
    /** 最大长度（字节） */
    maxLength: z.number().optional(),
    /** 最小长度（字节） */
    minLength: z.number().optional(),
  });
  return { base, binary };
})();

const createSchema = <K extends BuiltinTypeKey, T extends keyof typeof BaseSchemaMap>(
  type: K,
  base: T = "base" as T,
) =>
  BaseSchemaMap[base].extend({
    /** 类型 */
    type: z.literal(type),
    /** 图标 */
    icon: z.string().default(DefaultIconMap[type]),
  });

export const SchemaMap = {
  string: createSchema("string").extend({
    /** 正则表达式 */
    pattern: z.string().optional(),
    /** 最小长度 */
    minLength: z.number().optional(),
    /** 最大长度 */
    maxLength: z.number().optional(),
  }),
  number: createSchema("number").extend({
    /** 最小值 */
    minimum: z.number().optional(),
    /** 最大值 */
    maximum: z.number().optional(),
    /** 是否包含最小值 */
    exclusiveMinimum: z.boolean().optional(),
    /** 是否包含最大值 */
    exclusiveMaximum: z.boolean().optional(),
    /** 步长 */
    multipleOf: z.number().optional(),
  }),
  boolean: createSchema("boolean"),
  literal: createSchema("literal").extend({
    /** 字面量值 */
    value: LiteralValueSchema,
  }),
  enum: createSchema("enum").extend({
    /** 枚举值 */
    values: z.array(LiteralValueSchema),
  }),
  null: createSchema("null"),
  any: createSchema("any"),
  array: createSchema("array").extend({
    /** 数组元素类型 */
    itemType: z.lazy(() => TypeSchema),
    /** 最小长度 */
    minItems: z.number().optional(),
    /** 最大长度 */
    maxItems: z.number().optional(),
  }),
  object: createSchema("object").extend({
    /** 属性 */
    properties: z.record(
      z.string(),
      z.lazy(() => TypeSchema),
    ),
    /** 必填属性 */
    required: z.array(z.string()),
    /** 允许额外属性 */
    additionalProperties: z.boolean().optional(),
  }),
  tuple: createSchema("tuple").extend({
    /** 元组元素类型 */
    items: z.array(z.lazy(() => TypeSchema)),
  }),
  anyOf: createSchema("anyOf").extend({
    /** 任意类型 */
    types: z.array(z.lazy(() => TypeSchema)),
  }),
  allOf: createSchema("allOf").extend({
    /** 所有类型 */
    types: z.array(z.lazy(() => TypeSchema)),
  }),
  oneOf: createSchema("oneOf").extend({
    /** 任意类型 */
    types: z.array(z.lazy(() => TypeSchema)),
  }),
  email: createSchema("email").extend({
    /** 匹配模式 */
    mode: MatchModeSchema,
    /** 允许/禁止的域 */
    domain: z.array(z.string()),
  }),
  uuid: createSchema("uuid"),
  cuid: createSchema("cuid"),
  guid: createSchema("guid"),
  ulid: createSchema("ulid"),
  nanoid: createSchema("nanoid").extend({
    /** 长度 */
    length: z.number().optional(),
    /** 字母表 */
    alphabet: z.string().optional(),
  }),
  color: createSchema("color").extend({
    /** 颜色匹配模式 */
    mode: MatchModeSchema,
    /** 允许/禁止的颜色格式 */
    format: z.array(z.enum(["hex", "hexa", "rgb", "rgba", "hsl", "hsla"])).optional(),
  }),
  timezone: createSchema("timezone"),
  base32: createSchema("base32", "binary"),
  base36: createSchema("base36", "binary"),
  base64: createSchema("base64", "binary"),
  base64url: createSchema("base64url", "binary"),
  hex: createSchema("hex", "binary"),
  url: createSchema("url").extend({
    /** 协议 */
    protocol: MatchStringListSchema,
    /** 域名 */
    domain: MatchStringListSchema,
    /** 端口 */
    port: MatchNumberListSchema,
    /** 路径 */
    path: MatchStringListSchema,
  }),
  hash: createSchema("hash").extend({
    /** 哈希算法 */
    algorithm: z.enum([
      "md5",
      "sha1",
      "sha128",
      "sha224",
      "sha256",
      "sha384",
      "sha512",
      "sha3-224",
      "sha3-256",
      "sha3-384",
      "sha3-512",
    ]),
  }),
  ipv4: createSchema("ipv4").extend({
    /** 匹配模式 */
    mode: MatchModeSchema,
    /** 允许/禁止的网段范围 */
    range: z.array(z.string()),
  }),
  ipv6: createSchema("ipv6").extend({
    /** 匹配模式 */
    mode: MatchModeSchema,
    /** 允许/禁止的网段范围 */
    range: z.array(z.string()),
  }),
  cidrv4: createSchema("cidrv4"),
  cidrv6: createSchema("cidrv6"),
  mac: createSchema("mac").extend({
    /** 匹配模式 */
    mode: MatchModeSchema,
    /** 允许/禁止的 MAC 地址范围 */
    range: z.array(z.string()),
  }),
  date: createSchema("date"),
  time: createSchema("time").extend({
    /** 精度 */
    precision: z.number().optional(),
  }),
  datetime: createSchema("datetime").extend({
    /** 允许时区偏移 */
    offset: z.boolean(),
    /** 允许为本地时间 */
    local: z.boolean(),
    /** 精度 */
    precision: z.number().optional(),
  }),
  duration: createSchema("duration"),
  ref: createSchema("ref").extend({
    /** 引用路径 */
    ref: z.string(),
  }),
  codec: createSchema("codec").extend({
    /** 输入类型 */
    input: z.lazy(() => TypeSchema),
    /** 输出类型 */
    output: z.lazy(() => TypeSchema),
    /** 正向（输入）解码函数 (parse/decode) */
    forward: z.string(),
    /** 反向（输出）编码函数 (encode) */
    backward: z.string(),
  }),
} satisfies Record<BuiltinTypeKey, z.ZodObject>;

export const TypeSchema: z.ZodLazy<z.ZodType> = z.lazy(() =>
  z.discriminatedUnion("type", Object.values(SchemaMap) as unknown as [z.ZodObject]),
);

export type TypeDefinitionInput = z.input<(typeof SchemaMap)[BuiltinTypeKey]>;
export type TypeDefinitionOutput = z.output<(typeof SchemaMap)[BuiltinTypeKey]>;

import { z } from "zod";

export const TextSchema = z.record(z.string(), z.string());
export const MatchModeSchema = z.enum(["whitelist", "blacklist", "none"]);
export const LiteralValueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export const BuiltinTypeIconDefaults = {
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
} as const;

export const BaseSchema = z.object({
  /** 类型唯一标识符 */
  id: z.string(),
  /** 名称 */
  title: TextSchema,
  /** 描述 */
  description: TextSchema.optional(),
  /** 图标 */
  icon: z.string().default("mdi:shape-outline"),
  /** 排序值 */
  sort: z.number().default(0),
  /** 类型 */
  type: z.string(),
  /** 示例 */
  examples: z.array(z.unknown()).default([]),
});

const createTypeBaseSchema = <T extends keyof typeof BuiltinTypeIconDefaults>(type: T) =>
  BaseSchema.extend({
    type: z.literal(type),
    icon: z.string().default(BuiltinTypeIconDefaults[type]),
  });

export const StringTypeSchema = createTypeBaseSchema("string").extend({
  /** 正则表达式 */
  pattern: z.string().optional(),
  /** 最小长度 */
  minLength: z.number().optional(),
  /** 最大长度 */
  maxLength: z.number().optional(),
});

export const NumberTypeSchema = createTypeBaseSchema("number").extend({
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
});

export const BooleanTypeSchema = createTypeBaseSchema("boolean");

export const LiteralTypeSchema = createTypeBaseSchema("literal").extend({
  /** 字面量值 */
  value: LiteralValueSchema,
});

export const EnumTypeSchema = createTypeBaseSchema("enum").extend({
  /** 枚举值 */
  values: z.array(LiteralValueSchema),
});

export const NullTypeSchema = createTypeBaseSchema("null");

export const AnyTypeSchema = createTypeBaseSchema("any");

export const ArrayTypeSchema = createTypeBaseSchema("array").extend({
  /** 数组元素类型 */
  itemType: z.lazy(() => BuiltinTypeSchema),
  /** 最小长度 */
  minItems: z.number().optional(),
  /** 最大长度 */
  maxItems: z.number().optional(),
});

export const ObjectTypeSchema = createTypeBaseSchema("object").extend({
  /** 属性 */
  properties: z.record(z.string(), z.lazy(() => BuiltinTypeSchema)),
  /** 必填属性 */
  required: z.array(z.string()),
  /** 允许额外属性 */
  additionalProperties: z.boolean().optional(),
});

export const TupleTypeSchema = createTypeBaseSchema("tuple").extend({
  /** 元组元素类型 */
  items: z.array(z.lazy(() => BuiltinTypeSchema)),
});

export const AnyOfTypeSchema = createTypeBaseSchema("anyOf").extend({
  /** 任意类型 */
  types: z.array(z.lazy(() => BuiltinTypeSchema)),
});

export const AllOfTypeSchema = createTypeBaseSchema("allOf").extend({
  /** 所有类型 */
  types: z.array(z.lazy(() => BuiltinTypeSchema)),
});

export const OneOfTypeSchema = createTypeBaseSchema("oneOf").extend({
  /** 任意类型 */
  types: z.array(z.lazy(() => BuiltinTypeSchema)),
});

export const EmailTypeSchema = createTypeBaseSchema("email").extend({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的域 */
  domain: z.array(z.string()),
});

export const UUIDTypeSchema = createTypeBaseSchema("uuid");

export const CUIDTypeSchema = createTypeBaseSchema("cuid");

export const GUIDTypeSchema = createTypeBaseSchema("guid");

export const ULIDTypeSchema = createTypeBaseSchema("ulid");

export const NanoIDTypeSchema = createTypeBaseSchema("nanoid").extend({
  /** 长度 */
  length: z.number().optional(),
  /** 字母表 */
  alphabet: z.string().optional(),
});

export const ColorTypeSchema = createTypeBaseSchema("color").extend({
  /** 颜色匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的颜色格式 */
  format: z.array(z.enum(["hex", "hexa", "rgb", "rgba", "hsl", "hsla"])).optional(),
});

export const TimezoneTypeSchema = createTypeBaseSchema("timezone");

const MatchStringListSchema = z.object({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的范围 */
  value: z.array(z.string()),
});

const MatchNumberListSchema = z.object({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的范围 */
  value: z.array(z.number()),
});

export const URLTypeSchema = createTypeBaseSchema("url").extend({
  /** 协议 */
  protocol: MatchStringListSchema,
  /** 域名 */
  domain: MatchStringListSchema,
  /** 端口 */
  port: MatchNumberListSchema,
  /** 路径 */
  path: MatchStringListSchema,
});

const BinarySchema = BaseSchema.extend({
  /** 最大长度（字节） */
  maxLength: z.number().optional(),
  /** 最小长度（字节） */
  minLength: z.number().optional(),
});

export const Base32TypeSchema = BinarySchema.extend({
  type: z.literal("base32"),
  icon: z.string().default(BuiltinTypeIconDefaults.base32),
});

export const Base36TypeSchema = BinarySchema.extend({
  type: z.literal("base36"),
  icon: z.string().default(BuiltinTypeIconDefaults.base36),
});

export const Base64TypeSchema = BinarySchema.extend({
  type: z.literal("base64"),
  icon: z.string().default(BuiltinTypeIconDefaults.base64),
});

export const Base64URLTypeSchema = BinarySchema.extend({
  type: z.literal("base64url"),
  icon: z.string().default(BuiltinTypeIconDefaults.base64url),
});

export const HexTypeSchema = BinarySchema.extend({
  type: z.literal("hex"),
  icon: z.string().default(BuiltinTypeIconDefaults.hex),
});

export const HashTypeSchema = createTypeBaseSchema("hash").extend({
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
});

export const IPv4TypeSchema = createTypeBaseSchema("ipv4").extend({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的网段范围 */
  range: z.array(z.string()),
});

export const IPv6TypeSchema = createTypeBaseSchema("ipv6").extend({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的网段范围 */
  range: z.array(z.string()),
});

export const CIDRv4TypeSchema = createTypeBaseSchema("cidrv4");

export const CIDRv6TypeSchema = createTypeBaseSchema("cidrv6");

export const MACTypeSchema = createTypeBaseSchema("mac").extend({
  /** 匹配模式 */
  mode: MatchModeSchema,
  /** 允许/禁止的 MAC 地址范围 */
  range: z.array(z.string()),
});

export const DateTypeSchema = createTypeBaseSchema("date");

export const TimeTypeSchema = createTypeBaseSchema("time").extend({
  /** 精度 */
  precision: z.number().optional(),
});

export const DateTimeTypeSchema = createTypeBaseSchema("datetime").extend({
  /** 允许时区偏移 */
  offset: z.boolean(),
  /** 允许为本地时间 */
  local: z.boolean(),
  /** 精度 */
  precision: z.number().optional(),
});

export const DurationTypeSchema = createTypeBaseSchema("duration");

export const ReferenceTypeSchema = createTypeBaseSchema("ref").extend({
  /** 引用路径 */
  ref: z.string(),
});

export const CodecTypeSchema = createTypeBaseSchema("codec").extend({
  /** 输入类型 */
  input: z.lazy(() => BuiltinTypeSchema),
  /** 输出类型 */
  output: z.lazy(() => BuiltinTypeSchema),
  /** 正向（输入）解码函数 (parse/decode) */
  forward: z.string(),
  /** 反向（输出）编码函数 (encode) */
  backward: z.string(),
});

export const BasicTypeSchema = z.discriminatedUnion("type", [
  StringTypeSchema,
  NumberTypeSchema,
  BooleanTypeSchema,
  LiteralTypeSchema,
  EnumTypeSchema,
  NullTypeSchema,
  AnyTypeSchema,
]);

export const CompositeTypeSchema = z.discriminatedUnion("type", [
  ArrayTypeSchema,
  ObjectTypeSchema,
  TupleTypeSchema,
  AnyOfTypeSchema,
  AllOfTypeSchema,
  OneOfTypeSchema,
]);

export const FormattedTypeSchema = z.discriminatedUnion("type", [
  EmailTypeSchema,
  UUIDTypeSchema,
  CUIDTypeSchema,
  GUIDTypeSchema,
  ULIDTypeSchema,
  NanoIDTypeSchema,
  ColorTypeSchema,
  TimezoneTypeSchema,
  URLTypeSchema,
]);

export const BinaryBasedTypeSchema = z.discriminatedUnion("type", [
  Base32TypeSchema,
  Base36TypeSchema,
  Base64TypeSchema,
  Base64URLTypeSchema,
  HexTypeSchema,
  HashTypeSchema,
]);

export const NetworkTypeSchema = z.discriminatedUnion("type", [
  IPv4TypeSchema,
  IPv6TypeSchema,
  CIDRv4TypeSchema,
  CIDRv6TypeSchema,
  MACTypeSchema,
]);

export const TimeBasedTypeSchema = z.discriminatedUnion("type", [
  DateTypeSchema,
  TimeTypeSchema,
  DateTimeTypeSchema,
  DurationTypeSchema,
]);

export const BuiltinTypeSchema: z.ZodTypeAny = z.lazy(() =>
  z.discriminatedUnion("type", [
    ...BasicTypeSchema.options,
    ...CompositeTypeSchema.options,
    ...FormattedTypeSchema.options,
    ...BinaryBasedTypeSchema.options,
    ...NetworkTypeSchema.options,
    ...TimeBasedTypeSchema.options,
    ReferenceTypeSchema,
    CodecTypeSchema,
  ]),
);

export type Text = z.output<typeof TextSchema>;
export type Base = z.output<typeof BaseSchema>;
export type StringType = z.output<typeof StringTypeSchema>;
export type NumberType = z.output<typeof NumberTypeSchema>;
export type BooleanType = z.output<typeof BooleanTypeSchema>;
export type LiteralType = z.output<typeof LiteralTypeSchema>;
export type EnumType = z.output<typeof EnumTypeSchema>;
export type NullType = z.output<typeof NullTypeSchema>;
export type AnyType = z.output<typeof AnyTypeSchema>;
export type ArrayType = z.output<typeof ArrayTypeSchema>;
export type ObjectType = z.output<typeof ObjectTypeSchema>;
export type TupleType = z.output<typeof TupleTypeSchema>;
export type AnyOfType = z.output<typeof AnyOfTypeSchema>;
export type AllOfType = z.output<typeof AllOfTypeSchema>;
export type OneOfType = z.output<typeof OneOfTypeSchema>;
export type EmailType = z.output<typeof EmailTypeSchema>;
export type UUIDType = z.output<typeof UUIDTypeSchema>;
export type CUIDType = z.output<typeof CUIDTypeSchema>;
export type GUIDType = z.output<typeof GUIDTypeSchema>;
export type ULIDType = z.output<typeof ULIDTypeSchema>;
export type NanoIDType = z.output<typeof NanoIDTypeSchema>;
export type ColorType = z.output<typeof ColorTypeSchema>;
export type TimezoneType = z.output<typeof TimezoneTypeSchema>;
export type URLType = z.output<typeof URLTypeSchema>;
export type Base32Type = z.output<typeof Base32TypeSchema>;
export type Base36Type = z.output<typeof Base36TypeSchema>;
export type Base64Type = z.output<typeof Base64TypeSchema>;
export type Base64URLType = z.output<typeof Base64URLTypeSchema>;
export type HexType = z.output<typeof HexTypeSchema>;
export type HashType = z.output<typeof HashTypeSchema>;
export type IPv4Type = z.output<typeof IPv4TypeSchema>;
export type IPv6Type = z.output<typeof IPv6TypeSchema>;
export type CIDRv4Type = z.output<typeof CIDRv4TypeSchema>;
export type CIDRv6Type = z.output<typeof CIDRv6TypeSchema>;
export type MACType = z.output<typeof MACTypeSchema>;
export type DateType = z.output<typeof DateTypeSchema>;
export type TimeType = z.output<typeof TimeTypeSchema>;
export type DateTimeType = z.output<typeof DateTimeTypeSchema>;
export type DurationType = z.output<typeof DurationTypeSchema>;
export type ReferenceType = z.output<typeof ReferenceTypeSchema>;
export type CodecType = z.output<typeof CodecTypeSchema>;

export type BasicType = z.output<typeof BasicTypeSchema>;
export type CompositeType = z.output<typeof CompositeTypeSchema>;
export type FormattedType = z.output<typeof FormattedTypeSchema>;
export type BinaryBasedType = z.output<typeof BinaryBasedTypeSchema>;
export type NetworkType = z.output<typeof NetworkTypeSchema>;
export type TimeBasedType = z.output<typeof TimeBasedTypeSchema>;

export type Type = z.output<typeof BuiltinTypeSchema>;

export type BuiltinType = Type;

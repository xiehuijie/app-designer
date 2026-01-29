export interface Base {
  /** 类型 */
  type: string;
  /** 示例 */
  examples: any[];
}

export interface String extends Base {
  type: 'string';
  /** 正则表达式 */
  pattern?: string;
  /** 最小长度 */
  minLength?: number;
  /** 最大长度 */
  maxLength?: number;
}

export interface Number extends Base {
  type: 'number';
  /** 最小值 */
  minimum?: number;
  /** 最大值 */
  maximum?: number;
  /** 是否包含最小值 */
  exclusiveMinimum?: boolean;
  /** 是否包含最大值 */
  exclusiveMaximum?: boolean;
  /** 步长 */
  multipleOf?: number;
}

export interface Boolean extends Base {
  type: 'boolean';
}

export interface Literal extends Base {
  type: 'literal';
  /** 字面量值 */
  value: string | number | boolean | null;
}

export interface Enum extends Base {
  type: 'enum';
  /** 枚举值 */
  values: (string | number | boolean | null)[];
}

export interface Null extends Base {
  type: 'null';
}

export interface Any extends Base {
  type: 'any';
}

export interface Array extends Base {
  type: 'array';
  /** 数组元素类型 */
  itemType: Type;
  /** 最小长度 */
  minItems?: number;
  /** 最大长度 */
  maxItems?: number;
}

export interface Object extends Base {
  type: 'object';
  /** 属性 */
  properties: Record<string, Type>;
  /** 必填属性 */
  required: string[];
  /** 允许额外属性 */
  additionalProperties?: boolean;
}

export interface Tuple extends Base {
  type: 'tuple';
  /** 元组元素类型 */
  items: Type[];
}

export interface AnyOf extends Base {
  type: 'anyOf';
  /** 任意类型 */
  types: Type[];
}

export interface AllOf extends Base {
  type: 'allOf';
  /** 所有类型 */
  types: Type[];
}

export interface OneOf extends Base {
  type: 'oneOf';
  /** 任意类型 */
  types: Type[];
}

export interface Email extends Base {
  type: 'email';
  /** 匹配模式 */
  mode: 'whitelist' | 'blacklist' | 'none';
  /** 允许/禁止的域 */
  domain: string[];
}

export interface UUID extends Base {
  type: 'uuid';
}

export interface CUID extends Base {
  type: 'cuid';
}

export interface GUID extends Base {
  type: 'guid';
}

export interface ULID extends Base {
  type: 'ulid';
}

export interface NanoID extends Base {
  type: 'nanoid';
  /** 长度 */
  length?: number;
  /** 字母表 */
  alphabet?: string;
}

export interface Color extends Base {
  type: 'color';
  /** 颜色匹配模式 */
  mode: 'whitelist' | 'blacklist' | 'none';
  /** 允许/禁止的颜色格式 */
  format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'[];
}

export interface Timezone extends Base {
  type: 'timezone';
}

export interface URL extends Base {
  type: 'url';
  /** 协议 */
  protocol: {
    /** 协议匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的协议范围 */
    value: string[];
  };
  /** 域名 */
  domain: {
    /** 域名匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的域名范围 */
    value: string[];
  };
  /** 端口 */
  port: {
    /** 端口匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的端口范围 */
    value: number[];
  };
  /** 路径 */
  path: {
    /** 路径匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的路径范围 */
    value: string[];
  };
}

interface Binary extends Base {
  /** 最大长度（字节） */
  maxLength?: number;
  /** 最小长度（字节） */
  minLength?: number;
}

export interface Base32 extends Binary {
  type: 'base32';
}

export interface Base36 extends Binary {
  type: 'base36';
}

export interface Base64 extends Binary {
  type: 'base64';
}

export interface Base64URL extends Binary {
  type: 'base64url';
}

export interface Hex extends Binary {
  type: 'hex';
}

export interface Hash extends Base {
  type: 'hash';
  /** 哈希算法 */
  algorithm: 'md5' | 'sha1' | 'sha128' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512';
}

export interface IPv4 extends Base {
  type: 'ipv4';
  /** 匹配模式 */
  mode: 'whitelist' | 'blacklist' | 'none';
  /** 允许/禁止的网段范围 */
  range: string[];
}

export interface IPv6 extends Base {
  type: 'ipv6';
  /** 匹配模式 */
  mode: 'whitelist' | 'blacklist' | 'none';
  /** 允许/禁止的网段范围 */
  range: string[];
}

export interface CIDRv4 extends Base {
  type: 'cidrv4';
}

export interface CIDRv6 extends Base {
  type: 'cidrv6';
}

export interface MAC extends Base {
  type: 'mac';
  /** 匹配模式 */
  mode: 'whitelist' | 'blacklist' | 'none';
  /** 允许/禁止的 MAC 地址范围 */
  range: string[];
}

export interface Date extends Base {
  type: 'date';
}

export interface Time extends Base {
  type: 'time';
  /** 精度 */
  precision?: number;
}

export interface DateTime extends Base {
  type: 'datetime';
  /** 允许时区偏移 */
  offset: boolean;
  /** 允许为本地时间 */
  local: boolean;
  /** 精度 */
  precision?: number;
}

export interface Duration extends Base {
  type: 'duration';
}

export interface Reference extends Base {
  type: 'ref';
  /** 引用路径 */
  ref: string;
}

type BasicType = String | Number | Boolean | Literal | Enum | Null | Any;
type CompositeType = Array | Object | Tuple | AnyOf | AllOf | OneOf;
type FormattedType = Email | UUID | CUID | GUID | ULID | NanoID | URL;
type BinaryBasedType = Base32 | Base36 | Base64 | Base64URL | Hex | Hash;
type NetworkType = IPv4 | IPv6 | CIDRv4 | CIDRv6 | MAC;
type TimeBasedType = Date | Time | DateTime | Duration | Timezone;
type ReferenceType = Reference;

export type Type = BasicType | CompositeType | FormattedType | BinaryBasedType | NetworkType | TimeBasedType | ReferenceType;

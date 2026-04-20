type Text = Record<string, string>

interface Base {
    /** 类型唯一标识符 */
    id: string;
    /** 名称 */
    title: Text;
    /** 描述 */
    description?: Text;
    /** 图标 */
    icon: string;
    /** 排序值 */
    sort: number;
    /** 类型 */
    type: string;
    /** 示例 */
    examples: any[];
}

export interface StringType extends Base {
    type: 'string';
    /** 正则表达式 */
    pattern?: string;
    /** 最小长度 */
    minLength?: number;
    /** 最大长度 */
    maxLength?: number;
}

export interface NumberType extends Base {
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

export interface BooleanType extends Base {
    type: 'boolean';
}

export interface LiteralType extends Base {
    type: 'literal';
    /** 字面量值 */
    value: string | number | boolean | null;
}

export interface EnumType extends Base {
    type: 'enum';
    /** 枚举值 */
    values: (string | number | boolean | null)[];
}

export interface NullType extends Base {
    type: 'null';
}

export interface AnyType extends Base {
    type: 'any';
}

export interface ArrayType extends Base {
    type: 'array';
    /** 数组元素类型 */
    itemType: Type;
    /** 最小长度 */
    minItems?: number;
    /** 最大长度 */
    maxItems?: number;
}

export interface ObjectType extends Base {
    type: 'object';
    /** 属性 */
    properties: Record<string, Type>;
    /** 必填属性 */
    required: string[];
    /** 允许额外属性 */
    additionalProperties?: boolean;
}

export interface TupleType extends Base {
    type: 'tuple';
    /** 元组元素类型 */
    items: Type[];
}

export interface AnyOfType extends Base {
    type: 'anyOf';
    /** 任意类型 */
    types: Type[];
}

export interface AllOfType extends Base {
    type: 'allOf';
    /** 所有类型 */
    types: Type[];
}

export interface OneOfType extends Base {
    type: 'oneOf';
    /** 任意类型 */
    types: Type[];
}

export interface EmailType extends Base {
    type: 'email';
    /** 匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的域 */
    domain: string[];
}

export interface UUIDType extends Base {
    type: 'uuid';
}

export interface CUIDType extends Base {
    type: 'cuid';
}

export interface GUIDType extends Base {
    type: 'guid';
}

export interface ULIDType extends Base {
    type: 'ulid';
}

export interface NanoIDType extends Base {
    type: 'nanoid';
    /** 长度 */
    length?: number;
    /** 字母表 */
    alphabet?: string;
}

export interface ColorType extends Base {
    type: 'color';
    /** 颜色匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的颜色格式 */
    format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'[];
}

export interface TimezoneType extends Base {
    type: 'timezone';
}

export interface URLType extends Base {
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

export interface Base32Type extends Binary {
    type: 'base32';
}

export interface Base36Type extends Binary {
    type: 'base36';
}

export interface Base64Type extends Binary {
    type: 'base64';
}

export interface Base64URLType extends Binary {
    type: 'base64url';
}

export interface HexType extends Binary {
    type: 'hex';
}

export interface HashType extends Base {
    type: 'hash';
    /** 哈希算法 */
    algorithm: 'md5' | 'sha1' | 'sha128' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512';
}

export interface IPv4Type extends Base {
    type: 'ipv4';
    /** 匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的网段范围 */
    range: string[];
}

export interface IPv6Type extends Base {
    type: 'ipv6';
    /** 匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的网段范围 */
    range: string[];
}

export interface CIDRv4Type extends Base {
    type: 'cidrv4';
}

export interface CIDRv6Type extends Base {
    type: 'cidrv6';
}

export interface MACType extends Base {
    type: 'mac';
    /** 匹配模式 */
    mode: 'whitelist' | 'blacklist' | 'none';
    /** 允许/禁止的 MAC 地址范围 */
    range: string[];
}

export interface DateType extends Base {
    type: 'date';
}

export interface TimeType extends Base {
    type: 'time';
    /** 精度 */
    precision?: number;
}

export interface DateTimeType extends Base {
    type: 'datetime';
    /** 允许时区偏移 */
    offset: boolean;
    /** 允许为本地时间 */
    local: boolean;
    /** 精度 */
    precision?: number;
}

export interface DurationType extends Base {
    type: 'duration';
}

export interface ReferenceType extends Base {
    type: 'ref';
    /** 引用路径 */
    ref: string;
}

export interface CodecType extends Base {
    type: 'codec';
    /** 输入类型 */
    input: Type;
    /** 输出类型 */
    output: Type;
    /** 正向（输入）解码函数 (parse/decode) */
    forward: string;
    /** 反向（输出）编码函数 (encode)*/
    backward: string;
}

type BasicType = StringType | NumberType | BooleanType | LiteralType | EnumType | NullType | AnyType;
type CompositeType = ArrayType | ObjectType | TupleType | AnyOfType | AllOfType | OneOfType;
type FormattedType = EmailType | UUIDType | CUIDType | GUIDType | ULIDType | NanoIDType | URLType;
type BinaryBasedType = Base32Type | Base36Type | Base64Type | Base64URLType | HexType | HashType;
type NetworkType = IPv4Type | IPv6Type | CIDRv4Type | CIDRv6Type | MACType;
type TimeBasedType = DateType | TimeType | DateTimeType | DurationType | TimezoneType;

type Type = BasicType | CompositeType | FormattedType | BinaryBasedType | NetworkType | TimeBasedType | ReferenceType | CodecType;

export type BuiltinType = Type;
import type { Text } from './text'

export interface AppDefinition {
    /** 应用名称 */
    name: Text
    /** 应用描述 */
    description: Text
    /** 多语言配置 */
    languages: {
        /** 应用默认语言 */
        default: string
        /** 支持的语言列表 */
        supported: string[]
    }
}

/** 函数表达式定义 */
export interface FunctionExpressionDefinition {
    /** 函数表达式 ID */
    id: string
    /** 函数表达式名称 */
    name: Text
    /** 函数表达式描述 */
    description: Text
}

export interface SchemaDefinition {
    /** 模式 ID */
    id: string
    /** 模式名称 */
    name: Text
    /** 模式描述 */
    description: Text
}
export interface EndpointDefinition { }
export interface RequestDefinition { }
export interface ResponseDefinition { }
export interface ErrorDefinition { }
export interface SecurityDefinition { }
export interface VersionDefinition { }

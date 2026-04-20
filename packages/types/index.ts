export * from './builtin-types'


declare global {
    type BuiltinType = import('./builtin-types').BuiltinType;
}

export { };

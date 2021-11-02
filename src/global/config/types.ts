

export enum ConfigVarType {
    STRING = 'string',
    INTEGER = 'int',
    FLOAT = 'float',
    BOOLEAN = 'bool'
};

type ConfigVarValue = number | boolean | string;

export type { ConfigVarValue };
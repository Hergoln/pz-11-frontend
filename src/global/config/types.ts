

export enum ConfigVarType {
    STRING = 'string',
    INTEGER = 'int',
    FLOAT = 'float',
    BOOLEAN = 'bool'
};

interface GameConfig {
    variables: ConfigVariable[];
}

interface ConfigVariable {
    name: string;
    type: ConfigVarType;
    value?: ConfigVarValue;
}

type ConfigVarValue = number | boolean | string;



export type { ConfigVarValue, ConfigVariable, GameConfig };


export enum ConfigVarType {
    STRING = 'string',
    INTEGER = 'int',
    FLOAT = 'float',
    BOOLEAN = 'bool'
};

const getConfigTypeForString = (s: string) => {
    //@ts-ignore
    return Object.keys(ConfigVarType).find((key: string) => ConfigVarType[key] === s);
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


export { getConfigTypeForString };
export type { ConfigVarValue, ConfigVariable, GameConfig };
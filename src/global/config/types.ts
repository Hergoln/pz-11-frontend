

export enum ConfigVarType {
    STRING = 'STRING',
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    BOOLEAN = 'BOOLEAN'
};

const getConfigTypeForString = (s: string) => {
    //@ts-ignore
    return Object.keys(ConfigVarType).find((key: string) => ConfigVarType[key] === s);
};

const isNumericVariable = (variable: ConfigVariable) => (variable.type === ConfigVarType.FLOAT || variable.type === ConfigVarType.INTEGER);

interface ConfigVariableMap {
    [varName: string]: ConfigVariable;
}

interface GameConfig {
    variables: ConfigVariableMap;
}

interface ConfigVariable {
    readableName: string;
    type: ConfigVarType;
    value?: ConfigVarValue;
    max?: number;
    min?: number;
}

type ConfigVarValue = number | boolean | string;

interface GameConfigDTO {

}

interface ConfigVariableDTO {

}

const mapResponseToConfig = (response: object) => {};

export { getConfigTypeForString, mapResponseToConfig, isNumericVariable };
export type { ConfigVarValue, ConfigVariable, ConfigVariableMap, GameConfig };
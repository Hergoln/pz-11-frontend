

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

const mapResponseToConfig = (response: object): GameConfig => {
    return {
        //@ts-ignore
        variables: {...Object.keys(response.variables).map((key: string) => {
            //@ts-ignore
            const variable = response.variables[key];
            const varName = variable.readable_name;
            variable.readableName = varName;
            delete variable.readable_name;
            return variable;
        })}
    }
};

export { getConfigTypeForString, mapResponseToConfig, isNumericVariable };
export type { ConfigVarValue, ConfigVariable, ConfigVariableMap, GameConfig };


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
    const vars = {};
    //@ts-ignore
    Object.keys(response.variables).forEach((key: string) => {
        //@ts-ignore
        const variable = response.variables[key];
        const newVar = Object.assign({}, variable);
        const varName = variable.readable_name;
        delete newVar.readable_name;
        newVar.readableName = varName;
        //@ts-ignore
        vars[key] = newVar;
    });
    return {
        variables: vars
    };
};

const mapConfigToResponse = (config: GameConfig): object => {
    const vars = {};
    Object.keys(config.variables).forEach((key: string) => {
        const variable = config.variables[key];
        const newVar = Object.assign({}, variable);
        const varName = variable.readableName;
        //@ts-ignore
        delete newVar.readableName;
        //@ts-ignore
        newVar.readable_name = varName;
        //@ts-ignore
        vars[key] = newVar;
    });
    return {
        variables: vars
    };
}

export { getConfigTypeForString, mapResponseToConfig, isNumericVariable, mapConfigToResponse };
export type { ConfigVarValue, ConfigVariable, ConfigVariableMap, GameConfig };
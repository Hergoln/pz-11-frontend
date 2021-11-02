import React, { useEffect } from 'react';
import { ConfigVarType } from '../../global/config/types';

interface GameConfig {
    variables: ConfigVariable[];
}

interface ConfigVariable {
    name: string;
    type: ConfigVarType;
    value?: number | boolean | string;
}

interface Props {
    gameType: string;
}

const GameConfigAccordion = ({ gameType }: Props) => {

    const formatVariableName = (varName: string, varType: ConfigVarType) => { };

    //note: after backend creates an endpoint to return game config then it should be moved to useEffect with useState
    const configMock = {
        variables: [
            {
                name: 'players_count',
                type: ConfigVarType.INTEGER,
                value: 0
            },
            {
                name: 'whatever',
                type: ConfigVarType.STRING,
                value: ''
            },
            {
                name: 'ecks_deee',
                type: ConfigVarType.FLOAT,
                value: 21.37
            },
            {
                name: 'ecks_deee_2',
                type: ConfigVarType.BOOLEAN,
                value: true
            }
        ]
    };

    useEffect(() => { }, []);

    return (
        <div></div>
    );
};

export default GameConfigAccordion;
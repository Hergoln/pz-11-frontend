import React, { useEffect, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { ConfigVarType, ConfigVarValue } from '../../global/config/types';

interface GameConfig {
    variables: ConfigVariable[];
}

interface ConfigVariable {
    name: string;
    type: ConfigVarType;
    value?: ConfigVarValue;
}

interface Props {
    gameType: string;
}

const GameConfigAccordion = ({ gameType }: Props) => {

    const formatVariableName = (varName: string, varType: ConfigVarType) => {
        return varName;
    };

    //@ts-ignore
    const getInputForType = (varType: ConfigVarType) => {
        let comp;
        switch (varType) {
            case ConfigVarType.BOOLEAN:
                comp = <Checkbox />
                break;
            case ConfigVarType.FLOAT:
                comp = <TextField />
                break;
            case ConfigVarType.INTEGER:
                comp = <TextField />
                break;
            case ConfigVarType.STRING:
                comp = <TextField />
                break;
        };
        return comp;
    };

    const setConfigVar = (name: string, value: ConfigVarValue) => { };

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

    const [config, setConfig] = useState<GameConfig>({ variables: [] });

    useEffect(() => { setConfig(configMock); }, []);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Game configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Variable</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            config.variables.map((variableData: ConfigVariable) => {
                                return (
                                    <TableRow>
                                        <TableCell>{formatVariableName(variableData.name, variableData.type)}</TableCell>
                                        <TableCell>{variableData.type.toString()}</TableCell>
                                        <TableCell>{getInputForType(variableData.type)}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default GameConfigAccordion;
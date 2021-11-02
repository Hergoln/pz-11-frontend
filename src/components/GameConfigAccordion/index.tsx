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
import { FormControlLabel } from '@mui/material';

import { ConfigVarType, ConfigVarValue } from '../../global/config/types';
import { NoIncrementInput } from './styled';
import { capitalize } from '../../global/util/stringOperations';

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

    const formatVariableName = (varName: string) => {
        return capitalize(varName.split("_").join(" "));
    };

    const setConfigVar = (name: string, value: ConfigVarValue) => { };

    const getInputForType = (varType: ConfigVarType) => {
        let comp;
        switch (varType) {
            case ConfigVarType.BOOLEAN:
                comp = <FormControlLabel control={<Checkbox />} label="Enabled" />
                break;
            case ConfigVarType.FLOAT:
                comp = <NoIncrementInput inputProps={{ pattern: /-?[0-9]+\.[0-9]+/, maxLength: 20, type: 'number' }} placeholder="E.g. 0.01" variant="standard" />
                break;
            case ConfigVarType.INTEGER:
                comp = <NoIncrementInput inputProps={{ maxLength: 20, type: 'number' }} placeholder="E.g. 100" variant="standard" />
                break;
            case ConfigVarType.STRING:
                comp = <TextField placeholder="Type any text here..." variant="standard" inputProps={{ maxLength: 150 }} />
                break;
        };
        return comp;
    };


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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><b>Variable</b></TableCell>
                                {/* <TableCell align="left">Type</TableCell> */}
                                <TableCell align="left"><b>Value</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                config.variables.map((variableData: ConfigVariable) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{formatVariableName(variableData.name)}</TableCell>
                                            {/* <TableCell>{variableData.type.toString()}</TableCell> */}
                                            <TableCell>{getInputForType(variableData.type)}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default GameConfigAccordion;
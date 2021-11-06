import React, { ChangeEvent, useEffect, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ConfigVarType, ConfigVarValue, GameConfig, ConfigVariable } from '../../global/config/types';
import { NoIncrementInput, AccordionSummary } from './styled';
import { capitalize } from '../../global/util/stringOperations';




interface Props {
    gameType: string;
    gameConfig: GameConfig;
}

const GameConfigAccordion = ({ gameType, gameConfig }: Props) => {

    const formatVariableName = (varName: string) => {
        return capitalize(varName.split("_").join(" "));
    };

    const setConfigVar = (name: string, value: ConfigVarValue) => {
        //@ts-ignore
        const configVar = getConfigVar(name);
        if (configVar) {
            configVar.value = value;
        }
        console.log(configVar);
    };

    const getConfigVar = (name: string) => {
        return gameConfig.variables.find((variable: ConfigVariable) => variable.name === name);
    }

    const getInputFor = (configVar: ConfigVariable) => {
        let comp;
        switch (configVar.type) {
            case ConfigVarType.BOOLEAN:
                comp = <FormControlLabel
                    //@ts-ignore
                    control={<Checkbox defaultChecked={configVar.value} onClick={() => setConfigVar(configVar.name, !configVar.value)} />}
                    label="Enabled"
                />;
                break;
            case ConfigVarType.FLOAT:
                comp = <NoIncrementInput
                    //note: this is unoptimized as fuck; think about how we can improve on this design
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setConfigVar(configVar.name, event.target.value)}
                    defaultValue={configVar.value}
                    inputProps={{ pattern: /-?[0-9]+\.[0-9]+/, maxLength: 20, type: 'number' }}
                    placeholder="E.g. 0.01"
                    variant="standard"
                />;
                break;
            case ConfigVarType.INTEGER:
                comp = <NoIncrementInput
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setConfigVar(configVar.name, event.target.value)}
                    defaultValue={configVar.value}
                    inputProps={{ maxLength: 20, type: 'number' }}
                    placeholder="E.g. 100"
                    variant="standard"
                />;
                break;
            case ConfigVarType.STRING:
                comp = <TextField
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setConfigVar(configVar.name, event.target.value)}
                    defaultValue={configVar.value}
                    placeholder="Type any text here..."
                    variant="standard"
                    inputProps={{ maxLength: 150 }}
                />;
                break;
        };
        return comp;
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Game configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><b>Variable</b></TableCell>
                                <TableCell align="left"><b>Value</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                gameConfig.variables.map((variableData: ConfigVariable) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{formatVariableName(variableData.name)}</TableCell>
                                            <TableCell>{getInputFor(variableData)}</TableCell>
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
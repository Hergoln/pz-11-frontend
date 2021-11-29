import React, { ChangeEvent } from 'react';

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

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
    ConfigVarType,
    ConfigVarValue,
    GameConfig,
    ConfigVariable,
    isNumericVariable,
} from '../../global/config/types';
import { NoIncrementInput, AccordionSummary } from './styled';
import { clamp, clampUpper, clampLower } from '../../global/util/mathUtils';

interface Props {
    gameConfig: GameConfig;
}

const GameConfigAccordion = ({ gameConfig }: Props) => {
    const setConfigVar = (name: string, value: ConfigVarValue) => {
        const variable = gameConfig.variables[name];
        variable.value = value;
        if (isNumericVariable(variable)) {
            if (variable.min && variable.max) {
                //@ts-ignore
                variable.value = clamp(variable.value, variable.min, variable.max);
            } else if (variable.min && !variable.max) {
                //@ts-ignore
                variable.value = clampLower(variable.value, variable.min);
            } else {
                //@ts-ignore
                variable.value = clampUpper(variable.value, variable.max);
            }
        }
    };

    const getInputFor = (name: string, configVar: ConfigVariable) => {
        let comp;
        switch (configVar.type) {
            case ConfigVarType.BOOLEAN:
                comp = (
                    <FormControlLabel
                        control={
                            <Checkbox
                                //@ts-ignore
                                defaultChecked={configVar.value}
                                onClick={() => setConfigVar(name, !configVar.value)}
                            />
                        }
                        label="Enabled"
                    />
                );
                break;
            case ConfigVarType.FLOAT:
                comp = (
                    <NoIncrementInput
                        //note: this is unoptimized as fuck; think about how we can improve on this design
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setConfigVar(name, parseFloat(event.target.value));
                        }}
                        defaultValue={configVar.value}
                        inputProps={{
                            pattern: /-?[0-9]+\.[0-9]+/,
                            maxLength: 20,
                            type: 'number',
                        }}
                        placeholder="E.g. 0.01"
                        variant="standard"
                    />
                );
                break;
            case ConfigVarType.INTEGER:
                comp = (
                    <NoIncrementInput
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setConfigVar(name, parseInt(event.target.value))
                        }
                        defaultValue={configVar.value}
                        inputProps={{ maxLength: 20, type: 'number' }}
                        placeholder="E.g. 100"
                        variant="standard"
                    />
                );
                break;
            case ConfigVarType.STRING:
                comp = (
                    <TextField
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setConfigVar(name, event.target.value)
                        }
                        defaultValue={configVar.value}
                        placeholder="Type any text here..."
                        variant="standard"
                        inputProps={{ maxLength: 150 }}
                    />
                );
                break;
        }
        return comp;
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Game configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box marginBottom={5}>
                    <h2>
                        <b>Note</b>
                    </h2>
                    <h3 style={{ fontSize: 16 }}>
                        If your input value is out of specified min/max range then it will be
                        clipped to fit (e.g. if you input 0 when min is 2 then it will set the value
                        to 2 under the hood)
                    </h3>
                </Box>
                <TableContainer style={{ overflow: 'auto', maxHeight: 350 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">
                                    <b>Option</b>
                                </TableCell>
                                <TableCell>
                                    <b>Minimum value</b>
                                </TableCell>
                                <TableCell>
                                    <b>Maximum value</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Current value</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(gameConfig.variables).map(
                                (varName: string, index: number) => {
                                    const variable = gameConfig.variables[varName];
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{variable.readableName}</TableCell>
                                            <TableCell>{variable.min ?? 'N/A'}</TableCell>
                                            <TableCell>{variable.max ?? 'N/A'}</TableCell>
                                            <TableCell>{getInputFor(varName, variable)}</TableCell>
                                        </TableRow>
                                    );
                                }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default GameConfigAccordion;

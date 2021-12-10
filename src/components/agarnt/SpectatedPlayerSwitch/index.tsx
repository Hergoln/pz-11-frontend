import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { clampWrapping } from '../../../global/util/mathUtils';
//@ts-ignore
import styled from 'styled-components';

interface SwitchProps {
    spectatedSetter: (newName: string) => void;
    playerNames: string[];
    currentSpectatedName: string;
}

const DecoratedBox = styled(Box)`
    display: block;
    position: absolute;
    z-index: 999;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
`;

const Component = ({ currentSpectatedName, playerNames, spectatedSetter }: SwitchProps) => {
    const currentIndex = playerNames.findIndex(
        (name: string, index: number) => playerNames[index] === name
    );

    const selectionDisabled = playerNames.length <= 1;

    return (
        <DecoratedBox>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button
                    onClick={() =>
                        spectatedSetter(
                            playerNames[clampWrapping(currentIndex - 1, 0, playerNames.length)]
                        )
                    }
                    disabled={selectionDisabled}
                    style={{ color: 'black' }}
                >
                    {'<'}
                </Button>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'column',
                        marginTop: 10,
                    }}
                >
                    <h3>{currentSpectatedName}</h3>
                </div>
                <Button
                    onClick={() => {
                        spectatedSetter(
                            playerNames[clampWrapping(currentIndex + 1, 0, playerNames.length)]
                        );
                    }}
                    disabled={selectionDisabled}
                    style={{ color: 'black' }}
                >
                    {'>'}
                </Button>
            </Box>
        </DecoratedBox>
    );
};

const SpectatedPlayerSwitch = styled(Component)`
    font-weight: bold;
    font-size: 20px;
    top: 10px;
`;

export default SpectatedPlayerSwitch;

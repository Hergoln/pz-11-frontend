import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { clampWrapping } from '../../../global/util/mathUtils';
//@ts-ignore
import styled from 'styled-components';
import { DecoratedBox, SpectatedPlayerNameText } from './styled';

interface SwitchProps {
    spectatedSetter: (newName: string) => void;
    playerNames: string[];
    currentSpectatedName: string;
}

const SpectatedPlayerSwitch = ({
    currentSpectatedName,
    playerNames,
    spectatedSetter,
}: SwitchProps) => {
    const currentIndex = playerNames.findIndex((name: string) => name === currentSpectatedName);

    const selectionDisabled = playerNames.length <= 1;

    return (
        <DecoratedBox>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Button
                    onClick={() => {
                        spectatedSetter(
                            playerNames[clampWrapping(currentIndex - 1, 0, playerNames.length - 1)]
                        );
                    }}
                    disabled={selectionDisabled}
                    style={{ color: 'black' }}
                >
                    {'<'}
                </Button>
                <SpectatedPlayerNameText>
                    <h3>{currentSpectatedName}</h3>
                </SpectatedPlayerNameText>
                <Button
                    onClick={() => {
                        spectatedSetter(
                            playerNames[clampWrapping(currentIndex + 1, 0, playerNames.length - 1)]
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

export default SpectatedPlayerSwitch;

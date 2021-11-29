import React, { useEffect, useState, MouseEvent } from 'react';
//@ts-ignore
import { Redirect } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
    GameLostText,
    GameLostBigText,
    ButtonsParent,
    ContentContainer,
    GameLostWindow,
} from './styled';

interface OverlayProps {
    gameLostText: string;
    onRetry: (event: MouseEvent) => void;
    playerScore: number;
    open: boolean;
    waitTime: number;
}

const GameLostScreen = (props: OverlayProps) => {
    const [currentTime, setCurrentTime] = useState(props.waitTime);
    const [intervalID, setIntervalID] = useState(null);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (props.open && !!!intervalID) {
            //@ts-ignore
            setIntervalID(window.setInterval(() => setCurrentTime((time) => time - 1), 1000));
        }

        return () => {
            //@ts-ignore
            currentTime <= 0 && clearInterval(intervalID);
        };
    }, [props.open, intervalID, currentTime]);

    return (
        <>
            {redirect && <Redirect to="/" />}
            <Backdrop open={props.open} style={{ zIndex: 999999 }}>
                <GameLostWindow>
                    <GameLostText>{props.gameLostText}</GameLostText>
                    <ContentContainer>
                        <GameLostBigText>{`Your score: ${props.playerScore}`}</GameLostBigText>
                        <ButtonsParent>
                            <Button
                                onClick={props.onRetry}
                                disabled={currentTime > 0}
                                variant="outlined"
                                style={{ width: 200 }}
                            >
                                {currentTime > 0 ? `Please wait (${currentTime})` : 'Retry'}
                            </Button>
                            <Button
                                onClick={() => setRedirect(true)}
                                variant="outlined"
                                style={{ width: 200 }}
                            >
                                Exit
                            </Button>
                        </ButtonsParent>
                    </ContentContainer>
                </GameLostWindow>
            </Backdrop>
        </>
    );
};

export default GameLostScreen;

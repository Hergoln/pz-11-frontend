import React, { useEffect, useState, MouseEvent } from 'react';
import { Backdrop } from '@mui/material';

import { GameLostText, GameLostBigText, GameLostLayout } from './styled';

interface OverlayProps {
    gameLostText: string;
    onClick: (event: MouseEvent) => void;
    open: boolean;
    waitTime: number;
}

const GameLostOverlay = (props: OverlayProps) => {
    const [currentTime, setCurrentTime] = useState(props.waitTime);
    const [intervalID, setIntervalID] = useState(null);

    const handleClick = (event: MouseEvent) => currentTime <= 0 && props.onClick(event);

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
        <Backdrop onClick={handleClick} open={props.open} style={{ zIndex: 999999 }}>
            <GameLostLayout>
                <GameLostText>{props.gameLostText}</GameLostText>
                <GameLostText>You can try again in:</GameLostText>
                <GameLostBigText>
                    {currentTime > 0 ? `${currentTime} seconds` : 'now!'}
                </GameLostBigText>
            </GameLostLayout>
        </Backdrop>
    );
};

export default GameLostOverlay;

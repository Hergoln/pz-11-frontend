import React, { ChangeEvent, useState } from 'react';
//@ts-ignore
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';

import 'antd/dist/antd.css';

import { JoinGameFooterContainer, StyledGameIdInput, StyledPlayerNameInput, InputsParent } from './styled';
import { StatusCodes } from 'http-status-codes';

interface Props {
    onCancel?: () => void;
    [x: string]: any;
}

export const JoinGameModal = ({ onCancel, ...modalProps }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [canJoin, setCanJoin] = useState(false);
    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [gameType, setGameType] = useState('');

    const handleJoinGame = async () => {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/games/${gameId}`);
        if (response.status == StatusCodes.OK) {
            toast.success("Game key correct! Redirecting...", { autoClose: 1000 });
            localStorage.setItem('player-name', playerName);
            localStorage.setItem('agarnt-game-key', gameId);
            //@ts-ignore
            setGameType(response.data.game_type);
            setRedirect(true);
        } else {
            toast.error("Sorry but the supplied game key doesn't match any of the games.");
        }
        setIsLoading(false);
    };

    //@ts-ignore
    const canPlayerJoinGame = (event: ChangeEvent<HTMLInputElement>) => setCanJoin(playerName && gameId);
    //@ts-ignore
    const updateGameId = (event: ChangeEvent<HTMLInputElement>) => setGameId(event.target.value);

    const updatePlayerName = (event: ChangeEvent<HTMLInputElement>) => setPlayerName(event.target.value);

    const handleGameKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
        canPlayerJoinGame(event);
        updateGameId(event);
    };

    const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        canPlayerJoinGame(event);
        updatePlayerName(event);
    };

    return (
        <Modal okText="Join game" cancelText="Exit" footer={
            [
                <JoinGameFooterContainer key={0}>
                    <Button type="primary" onClick={handleJoinGame} style={{ marginRight: 10 }} loading={isLoading} disabled={!canJoin}>
                        {!isLoading ? 'Join game' : 'Joining...'}
                    </Button>
                    <Button onClick={onCancel} style={{ marginLeft: 10 }}>
                        Exit
                    </Button>
                </JoinGameFooterContainer>
            ]
        } closable={true} onCancel={onCancel} {...modalProps}>
            {redirect && <Redirect to={`/${gameType.toLowerCase()}`} />}
            <h2 style={{ textAlign: 'center', marginBottom: 25 }}>Input ongoing game ID to join</h2>
            <InputsParent>
                <StyledPlayerNameInput onChange={handlePlayerNameChange} placeholder="Player name..." maxLength={35} />
                <StyledGameIdInput onChange={handleGameKeyChange} placeholder="Game key..." maxLength={50} />
            </InputsParent>
        </Modal>
    );
};
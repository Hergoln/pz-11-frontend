import React, { ChangeEvent, useState } from 'react';
//@ts-ignore
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';

import 'antd/dist/antd.css';

import {
    JoinGameFooterContainer,
    StyledGameIdInput,
    StyledPlayerNameInput,
    InputsParent,
} from './styled';
import { StatusCodes } from 'http-status-codes';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { OngoingGamesList } from './OngoingGamesList';

interface Props {
    onCancel?: () => void;
    [x: string]: any;
}

export const JoinGameModal = ({ onCancel, ...modalProps }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [canJoin, setCanJoin] = useState(false);
    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [isSpectator, setIsSpectator] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [gameType, setGameType] = useState('');

    const handleJoinGame = async () => {
        setIsLoading(true);
        try {
            await axios.get(
                `${process.env.REACT_APP_API_SERVER_URL}/games/${gameId}/${encodeURIComponent(
                    playerName
                )}`
            );
        } catch (error) {
            //@ts-ignore
            toast.error(error.response.data.message);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_SERVER_URL}/games/${gameId}`
            );
            //@ts-ignore
            setGameType(response.data.game_type);
            setRedirect(true);
        } catch (error) {
            //@ts-ignore
            toast.error(error.response.data.message);
        }
        setIsLoading(false);
    };

    const canPlayerJoinGame = (eventResult: string, otherValue: string) =>
        setCanJoin(!!eventResult && !!otherValue);
    const updateGameId = (event: ChangeEvent<HTMLInputElement>) => setGameId(event.target.value);

    const updatePlayerName = (event: ChangeEvent<HTMLInputElement>) =>
        setPlayerName(event.target.value);

    const handleGameKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateGameId(event);
        canPlayerJoinGame(event.target.value, playerName);
    };

    const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updatePlayerName(event);
        canPlayerJoinGame(event.target.value, gameId);
    };

    return (
        <Modal
            okText="Join game"
            cancelText="Exit"
            footer={[
                <JoinGameFooterContainer key={0}>
                    <Button
                        type="primary"
                        onClick={handleJoinGame}
                        style={{ marginRight: 10 }}
                        loading={isLoading}
                        disabled={!canJoin}
                    >
                        {!isLoading ? 'Join game' : 'Joining...'}
                    </Button>
                    <Button onClick={onCancel} style={{ marginLeft: 10 }}>
                        Exit
                    </Button>
                </JoinGameFooterContainer>,
            ]}
            closable={true}
            onCancel={onCancel}
            {...modalProps}
        >
            {redirect && (
                <Redirect
                    to={{
                        pathname: `/${gameType.toLowerCase()}`,
                        state: {
                            isSpectator: isSpectator,
                            playerName: playerName,
                            sessionId: gameId,
                        },
                    }}
                />
            )}
            <h2 style={{ textAlign: 'center', marginBottom: 25 }}>Input ongoing game ID to join</h2>
            <InputsParent>
                <StyledPlayerNameInput
                    onChange={handlePlayerNameChange}
                    placeholder="Player name..."
                    maxLength={35}
                />
                <StyledGameIdInput
                    onChange={handleGameKeyChange}
                    placeholder="Game key..."
                    maxLength={50}
                />
                <Checkbox
                    onChange={(event: CheckboxChangeEvent) => setIsSpectator(event.target.checked)}
                    style={{ marginLeft: 10 }}
                >
                    Join as spectator
                </Checkbox>
                <OngoingGamesList />
            </InputsParent>
        </Modal>
    );
};

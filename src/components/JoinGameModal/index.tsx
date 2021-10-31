import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';

import 'antd/dist/antd.css';

import { JoinGameFooterContainer, StyledGameIdInput } from './styled';

interface Props {
    onCancel?: () => void;
    [x: string]: any;
}

export const JoinGameModal = ({ onCancel, ...modalProps }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [canJoin, setCanJoin] = useState(false);
    const [gameId, setGameId] = useState('');

    const handleJoinGame = async () => {
        setIsLoading(true);
        const baseUrl = process.env.REACT_APP_API_SERVER_URL;
        axios.put(`${baseUrl}/games/${gameId}`).then(response => {
            toast.success("Game found! You will soon be redirected...");
            setTimeout(() => {
                //redirect user to another page here, passing required data (such as game ID etc.) along
            }, 2000);
        }).catch(_err => {
            toast.error("Cannot join game. It seems like the server is not responding or the game ID is not valid");
        });
        setIsLoading(false);
    };

    //@ts-ignore
    const canPlayerJoinGame = (event: ChangeEvent<HTMLInputElement>) => setCanJoin(event.target && event.target.value.length > 0);
    //@ts-ignore
    const updateGameId = (event: ChangeEvent<HTMLInputElement>) => setGameId(event.target.value);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        canPlayerJoinGame(event);
        updateGameId(event);
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
        } closable={false} {...modalProps}>
            <h2 style={{ textAlign: 'center', marginBottom: 25 }}>Input ongoing game ID to join</h2>
            <StyledGameIdInput onChange={handleChange} placeholder="Game key..." maxLength={50} />
        </Modal>
    );
};
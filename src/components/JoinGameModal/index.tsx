import React, {SyntheticEvent, useState} from 'react';

import {Button, Modal} from 'antd';
import 'antd/dist/antd.css';

import { GameIdInput } from './styled';

interface Props {
    onJoinGame?: () => void;
    onCancel?: () => void;
    modalProps?: object;
}

export const JoinGameModal = ({ onJoinGame, onCancel, modalProps }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [canJoin, setCanJoin] = useState(false);

    const handleJoinGame = () => {
        setIsLoading(true);
        if (onJoinGame) onJoinGame();
        setTimeout(() => setIsLoading(false), 2000); //temporary check if it works;
    };

    //@ts-ignore
    const canPlayerJoinGame = (event: ChangeEvent<HTMLInputElement>) => setCanJoin(event.target && event.target.value.length > 0);

    return (
        <Modal okText="Join game" cancelText="Exit" footer={
            [
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <Button type="primary" onClick={handleJoinGame} style={{marginRight: 10}} loading={isLoading} disabled={!canJoin}>
                        {!isLoading ? 'Join game' : 'Joining...'}
                    </Button>
                    <Button onClick={onCancel} style={{marginLeft: 10}}>
                        Exit
                    </Button>
                </div>
            ]
        } {...modalProps}>
            <h2 style={{textAlign: 'center', marginBottom: 25}}>Input ongoing game ID to join</h2>
            <div style={{marginLeft: 10, marginRight: 10}}>
                <input placeholder="Game key..." onChange={canPlayerJoinGame} style={{width: '100%'}} />
            </div>
        </Modal>
    );
};
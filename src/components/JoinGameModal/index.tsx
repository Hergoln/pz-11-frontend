import React, {useState} from 'react';

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

    const handleJoinGame = () => {
        setIsLoading(true);
        if (onJoinGame) onJoinGame();
        setTimeout(() => setIsLoading(false), 2000); //temporary check if it works;
    };

    return (
        <Modal okText="Join game" cancelText="Exit" footer={
            [
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <Button type="primary" onClick={handleJoinGame} style={{marginRight: 10}} loading={isLoading}>
                        {!isLoading ? 'Join game' : 'Joining...'}
                    </Button>
                    <Button onClick={onCancel} style={{marginLeft: 10}}>
                        Exit
                    </Button>
                </div>
            ]
        } {...modalProps}>
            <h2>Input ongoing game ID to join</h2>
            <GameIdInput placeholder="Game key" />
        </Modal>
    );
};
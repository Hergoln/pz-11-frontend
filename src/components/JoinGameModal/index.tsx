import React, {SyntheticEvent, useState} from 'react';

import {Button, Modal} from 'antd';
import 'antd/dist/antd.css';

import { JoinGameFooterContainer, StyledGameIdInput } from './styled';

interface Props {
    onJoinGame?: () => void;
    onCancel?: () => void;
    modalProps?: object;
}

export const JoinGameModal = ({ onJoinGame, onCancel, modalProps }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [canJoin, setCanJoin] = useState(false);

    const handleJoinGame = async () => {
        setIsLoading(true);
        onJoinGame?.();
        await new Promise(resolve => setTimeout(resolve, 2000)); //temporary, to check if setting button as loading works
        setIsLoading(false);
    };

    //@ts-ignore
    const canPlayerJoinGame = (event: ChangeEvent<HTMLInputElement>) => setCanJoin(event.target && event.target.value.length > 0);

    return (
        <Modal okText="Join game" cancelText="Exit" footer={
            [
                <JoinGameFooterContainer>
                    <Button type="primary" onClick={handleJoinGame} style={{marginRight: 10}} loading={isLoading} disabled={!canJoin}>
                        {!isLoading ? 'Join game' : 'Joining...'}
                    </Button>
                    <Button onClick={onCancel} style={{marginLeft: 10}}>
                        Exit
                    </Button>
                </JoinGameFooterContainer>
            ]
        } {...modalProps}>
            <h2 style={{textAlign: 'center', marginBottom: 25}}>Input ongoing game ID to join</h2>
            <StyledGameIdInput canPlayerJoinGame={canPlayerJoinGame} />
        </Modal>
    );
};
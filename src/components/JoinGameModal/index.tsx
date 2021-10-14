import React, {useState} from 'react';

import {Modal} from 'antd';
import 'antd/dist/antd.css';

import { GameIdInput } from './styled';

interface Props {
    onJoinGame?: () => void;
    onCancel?: () => void;
    modalProps?: object;
}

export const JoinGameModal = ({ onJoinGame, onCancel, modalProps }: Props) => {

    return (
        <Modal okText="Join game" cancelText="Exit" onOk={onJoinGame} onCancel={onCancel} {...modalProps}>
            <h2>Input ongoing game ID to join</h2>
            <GameIdInput placeholder="Game key"/>
        </Modal>
    );
};
import React, { useState } from 'react';

import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

import ApiSelect from '../ApiSelect';

interface Props {
    onCreateGame?: (id: string) => void;
    onCancel?: () => void;
    [x: string]: any;
}

export const CreateGameModal = ({ onCreateGame, onCancel, ...modalProps }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [gameType, setGameType] = useState('');
    const [gameName, setGameName] = useState('');

    const handleCreateGame = async () => {
        setIsLoading(true);
        const requestUrl = `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/games/`;
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
        await axios.post(requestUrl, {
            type: 'agarnt',
            name: 'Just work for fuck\'s sake'
        }, options).then(response => {
            console.log("Game created! response: " + response.data);
        }).catch(err => {
            console.log("server made a fucky wucky uwu");
            console.log(err);
        });
        setIsLoading(false);
    };

    return (
        <Modal okText="Create game" cancelText="Exit" footer={
            [
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }} key={0}>
                    <Button type="primary" onClick={handleCreateGame} style={{ marginRight: 10 }} loading={isLoading}>
                        {!isLoading ? 'Create game' : 'Creating...'}
                    </Button>
                    <Button onClick={onCancel} style={{ marginLeft: 10 }}>
                        Exit
                    </Button>
                </div>
            ]
        } closable={false} {...modalProps}>
            <h2 style={{ textAlign: 'center', marginBottom: 25 }}>Copy code and share with your friends</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <TextField
                    placeholder="Game session name..."
                    label="Game session name"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required={true}
                />
                <ApiSelect
                    resourceEndpoint={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/games/`}
                    displayNameExtractor={(item: object) => item.toString()}
                    onSelect={(event) => console.log(event)}
                    required={true}
                    label="Game type"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    placeholder="Game key..."
                    id="standard-read-only-input"
                    label="Game code"
                    defaultValue="xUGHg7j"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                />
            </div>
        </Modal>
    );
};
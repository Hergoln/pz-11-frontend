import React, { useState, ChangeEvent } from 'react';

import { ReactComponent as ClipboardIcon } from '../../assets/images/svg/clipboard.svg';

import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
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
    const [gameKey, setGameKey] = useState('');

    const validateInputs = () => {
        return gameType && gameName;
    };

    const handleCreateGame = async () => {

        if (!validateInputs()) {
            toast.warning("It seems like your input game data is incorrect. Please check it and try again.");
            return;
        }

        setIsLoading(true);
        const requestUrl = `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/games/`;
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
        await axios.post(requestUrl, {
            type: gameType,
            name: gameName
        }, options).then((response) => {
            /*
                response structure:
                id - uuid
                name - game name - string
                type - game type - string
            */
            //@ts-ignore
            setGameKey(response.data.id);
            toast.success(`Game created successfully! Check a textfield on the bottom for the game id!`);
        }).catch(err => {
            toast.error("Server made a fucky wucky uwu: " + err.toString());
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setGameName(event.target.value)}
                />
                <ApiSelect
                    resourceEndpoint={`${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/games/`}
                    displayNameExtractor={(item: object) => item.toString()}
                    onSelect={(event: ChangeEvent<HTMLInputElement>) => setGameType(event.target.value)}
                    required={true}
                    label="Game type"
                    defaultValue=""
                />
                <TextField
                    placeholder="Game key..."
                    id="standard-read-only-input"
                    label="Game code"
                    defaultValue="xUGHg7j"
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <Tooltip title="Copy to clipboard">
                                <ClipboardIcon
                                    width={24}
                                    height={24}
                                    onClick={() => navigator.clipboard.writeText(gameKey)} cursor="pointer"
                                />
                            </Tooltip>
                        )
                    }}
                    variant="standard"
                    value={gameKey}
                />
            </div>
        </Modal>
    );
};
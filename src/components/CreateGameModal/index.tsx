import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
//@ts-ignore
import { Redirect } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

import { StatusCodes } from 'http-status-codes';

import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

import { ReactComponent as ClipboardIcon } from '../../assets/images/svg/clipboard.svg';
import ApiSelect from '../ApiSelect';
import GameConfigAccordion from '../GameConfigAccordion';

import { mapResponseToConfig, mapConfigToResponse } from '../../global/config/types';
import { capitalize } from '../../global/util/stringOperations';

interface Props {
    onCreateGame?: (id: string) => void;
    onCancel?: () => void;
    [x: string]: any;
}

export const CreateGameModal = ({ onCreateGame, onCancel, ...modalProps }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [gameCreated, setGameCreated] = useState(false);
    const [gameType, setGameType] = useState('');
    const [gameName, setGameName] = useState('');
    const [gameKey, setGameKey] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [copyTooltipText, setCopyTooltipText] = useState('Copy to clipboard');
    const [redirect, setRedirect] = useState(false);
    const [config, setConfig] = useState({ variables: {} });

    const fetchConfigForGame = async (gameType: string) => {
        const fetchUrl = `${
            process.env.REACT_APP_API_SERVER_URL
        }/game_config/${gameType.toLowerCase()}`;
        const response = await axios.get(fetchUrl);
        if (response.status === StatusCodes.OK) {
            const newConfig = mapResponseToConfig(response.data);
            setConfig(newConfig);
        } else {
            toast.error(
                'Error while fetching config from the server. Cause: ' + response.statusText
            );
        }
    };

    const validateCreateGameInputs = () => {
        return gameType && gameName;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(gameKey);
        setCopyTooltipText('Copied!');
    };

    const handleCreateGame = async () => {
        if (!validateCreateGameInputs()) {
            toast.warning(
                'It seems like your input game data is incorrect. Please check it and try again.'
            );
            return;
        }

        setIsLoading(true);
        const requestUrl = `${process.env.REACT_APP_API_SERVER_URL}/games/`;
        const gameConfig = mapConfigToResponse(config);
        const response = await axios.post(requestUrl, {
            type: gameType.toLowerCase(),
            name: gameName,
            config: gameConfig,
        });
        if (response.status === StatusCodes.OK) {
            //@ts-ignore
            setGameKey(response.data.session_id);
            toast.success(
                `Game created successfully! Check a textfield on the bottom for the game id!`
            );
            setGameCreated(true);
        } else {
            toast.error('Server made a fucky wucky UwU');
        }
        /*
            response structure:
            id - uuid
            name - game name - string
            type - game type - string
        */
        setIsLoading(false);
    };

    const handleJoinGame = async () => {
        if (redirect) return;
        if (!!!playerName) {
            toast.error('Please input your player name!', { autoClose: 1500 });
            return;
        }
        const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER_URL}/games/${gameKey}`
        );
        if (response.status === StatusCodes.OK) {
            toast.info('Game key correct! Redirecting...', { autoClose: 1000 });
            localStorage.setItem('player-name', playerName);
            localStorage.setItem('agarnt-game-key', gameKey);
            setRedirect(true);
        } else {
            toast.error("Sorry but the supplied game key doesn't match any of the games.");
        }
    };

    const topInputProps = gameCreated
        ? {
              onChange: (event: ChangeEvent<HTMLInputElement>) => setPlayerName(event.target.value),
              placeholder: 'Player name...',
              label: 'Player name',
              value: playerName,
          }
        : {
              onChange: (event: ChangeEvent<HTMLInputElement>) => setGameName(event.target.value),
              placeholder: 'Game session name...',
              label: 'Game session name',
              value: gameName,
          };

    return (
        <Modal
            footer={[
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }} key={0}>
                    <Button
                        type="primary"
                        onClick={gameCreated ? handleJoinGame : handleCreateGame}
                        style={{ marginRight: 10 }}
                        loading={isLoading}
                    >
                        {!isLoading
                            ? gameCreated
                                ? 'Join game'
                                : 'Create game'
                            : gameCreated
                            ? 'Joining game...'
                            : 'Creating game...'}
                    </Button>
                    <Button onClick={onCancel} style={{ marginLeft: 10 }}>
                        Exit
                    </Button>
                </div>,
            ]}
            closable={true}
            onCancel={onCancel}
            {...modalProps}
        >
            {redirect && <Redirect to={`/${gameType.toLowerCase()}`} />}
            <h2 style={{ textAlign: 'center', marginBottom: 25 }}>
                Copy code and share with your friends
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <TextField
                    variant="standard"
                    required={true}
                    inputProps={{ maxLength: 35 }}
                    {...topInputProps}
                />
                <ApiSelect
                    resourceEndpoint={`${process.env.REACT_APP_API_SERVER_URL}/games/types/`}
                    //@ts-ignore
                    displayNameExtractor={(item: object) => capitalize(item.toString())}
                    checkThroughKeys={['game_types']}
                    onSelect={(event: ChangeEvent<HTMLInputElement>) => {
                        setGameType(event.target.value);
                        fetchConfigForGame(event.target.value);
                    }}
                    required={true}
                    label="Game"
                    defaultValue=""
                />
                <TextField
                    placeholder="Game key..."
                    id="standard-read-only-input"
                    label="Game code"
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <Tooltip
                                title={copyTooltipText}
                                onClose={() =>
                                    setTimeout(() => setCopyTooltipText('Copy to clipboard'), 500)
                                }
                            >
                                <ClipboardIcon
                                    width={24}
                                    height={24}
                                    onClick={copyToClipboard}
                                    cursor="pointer"
                                />
                            </Tooltip>
                        ),
                    }}
                    variant="standard"
                    value={gameKey}
                />
                {gameType && !gameCreated && <GameConfigAccordion gameConfig={config} />}
            </div>
        </Modal>
    );
};

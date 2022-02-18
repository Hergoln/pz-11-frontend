import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
//@ts-ignore
import { Redirect } from 'react-router-dom';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import ApiSelect from '../ApiSelect';
import { capitalize } from '../../global/util/stringOperations';

interface Props {
    onCancel?: () => void;
    [x: string]: any;
}

export const FetchGameArchiveModal = ({onCancel, ...modalProps }: Props) => {
    const [gameType, setGameType] = useState('');

    const handleFetchArchive = async () => {
        const fetchUrl = `${
            process.env.REACT_APP_API_SERVER_URL
        }/stts-pckg/${gameType.toLowerCase()}`;
        window.open(fetchUrl);
    };

    return (
        <Modal
            footer={[
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }} key={0}>
                    <Button
                        type="primary"
                        onClick={handleFetchArchive}
                        style={{ marginRight: 10 }} 
                    > 
                    Download Archive
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
            <h2 style={{ textAlign: 'center', marginBottom: 25 }}>
                Download Zip archives for your bots to learn
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <ApiSelect
                    resourceEndpoint={`${process.env.REACT_APP_API_SERVER_URL}/games/types/`}
                    //@ts-ignore
                    displayNameExtractor={(item: object) => capitalize(item.toString())}
                    checkThroughKeys={['game_types']}
                    onSelect={(event: ChangeEvent<HTMLInputElement>) => {
                        setGameType(event.target.value);
                    }}
                    required={true}
                    label="Game"
                    defaultValue=""
                />
            </div>
        </Modal>
    );
};

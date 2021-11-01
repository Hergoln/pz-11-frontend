import React, {useState} from 'react';

import {Button, Modal} from 'antd';
import 'antd/dist/antd.css';

import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
    onCreateGame?: (id: string) => void;
    onCancel?: () => void;
    [x: string]: any;
}

export const CreateGameModal = ({ onCreateGame, onCancel, ...modalProps }: Props) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleCreateGame = async () => {
        setIsLoading(true);
        //await new Promise(resolve => setTimeout(resolve, 2000)); //temporary, to check if setting button as loading works
        axios.post('/games/', {
            title: "Hello World!",
            body: "This is a new post."
          }).then(response => console.log(response.data)).catch(err => toast.error("server made a fucky wucky uwu"));
        setIsLoading(false);
    };

    return (
        <Modal okText="Create game" cancelText="Exit" footer={
            [
                <div style={{display: 'flex', width: '100%',  justifyContent: 'center'}}>
                    <Button type="primary" onClick={handleCreateGame} style={{ marginRight: 10 }} loading={isLoading}>
                        {!isLoading ? 'Create game' : 'Creating...'}
                    </Button>
                    <Button onClick={onCancel} style={{ marginLeft: 10 }}>
                        Exit
                    </Button>
                </div>
            ]
        } closable={true} maskClosable={true} {...modalProps}>
            <h2 style={{ textAlign: 'center', marginBottom: 25 }}>Copy code and share with your friends</h2>
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
        </Modal>
    );
};
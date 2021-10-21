import React, { useState, useEffect } from 'react';
import { w3cwebsocket as Websocket } from 'websocket';

interface WebsocketProps {
    gameId: string;
    onMessageReceived?: () => void;
}

type Connection = Websocket | null;

export const WebsocketHandler = ({ gameId, onMessageReceived }: WebsocketProps) => {

    const [connection, setConnection] = useState<Connection>(null);

    useEffect(() => {
        if (connection === null) {
            //@ts-ignore
            setConnection(new Websocket(process.env.API_SERVER_URL));
        }

        return () => {
            connection?.close();
        };
    }, [connection]);

    return (<></>);
};
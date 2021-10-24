import React, { useState, useEffect } from 'react';
import { w3cwebsocket as Websocket, IMessageEvent, ICloseEvent } from 'websocket';

interface WebsocketProps {
    gameId: string;
    onMessageReceived: (event: IMessageEvent) => void;
    onConnectionClosed?: (event: ICloseEvent) => void;
    onError?: (error: Error) => void;
}

type Connection = Websocket | null;

export const WebsocketHandler = ({ gameId, onMessageReceived, onConnectionClosed, onError }: WebsocketProps) => {

    const [connection, setConnection] = useState<Connection>(null);

    useEffect(() => {
        if (connection === null) {
            console.log(`${process.env.REACT_APP_API_WEBSOCKET_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}`);
            const socket = new Websocket(`${process.env.REACT_APP_API_WEBSOCKET_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}`);
            socket.onmessage = onMessageReceived;
            // @ts-ignore
            socket.onclose = onConnectionClosed;
            // @ts-ignore
            socket.onerror = onError;
            setConnection(socket);
        }

        //returned function cleans up resources used/set up during useEffect
        return () => {
            connection?.close();
        };
    }, [connection, onMessageReceived, onConnectionClosed, onError]);

    return (<></>);
};
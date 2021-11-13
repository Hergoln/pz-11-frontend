import React, { useState, useEffect, useCallback } from 'react';
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

    const handleGameKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (connection !== null && connection.readyState === Websocket.OPEN) {
                connection.send(`pressed key: ${event.code}`);
            }
        }, [connection]);


    useEffect(() => {
        if (connection === null) {
            //todo: pass gameId in the websocket connection url so backend can add us to a correct game session
            const socket = new Websocket(`${process.env.REACT_APP_API_WEBSOCKET_SERVER_URL}`);
            socket.onmessage = onMessageReceived;
            // @ts-ignore
            socket.onclose = onConnectionClosed;
            // @ts-ignore
            socket.onerror = onError;
            setConnection(socket);
        }

        window.addEventListener('keydown', handleGameKeyDown);

        return () => {
            window.removeEventListener('keydown', handleGameKeyDown);
            connection?.close();
        };
    }, [connection, onMessageReceived, onConnectionClosed, onError, handleGameKeyDown]);

    return (<div></div>);
};
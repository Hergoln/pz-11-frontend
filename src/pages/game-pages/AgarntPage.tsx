import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { WebsocketHandler } from '../../components/WebsocketHandler';
import Circle from '../../components/threejs/Circle';
import AgarntPlayer from '../../players/AgarntPlayer';

function AgarntPage() {

    //todo: open websocket connection to the server and register callbacks
    //todo: use physics to move the circle around

    const canvasRef = useRef();

    useEffect(() => {
        //@ts-ignore
        canvasRef.current.width = window.innerWidth;
        //@ts-ignore
        canvasRef.current.height = window.innerHeight;
    });

    function initGameListeners(event: WebSocketEventMap['open']) {
        document.addEventListener('keydown', handleAgarntInput);
    }

    function cleanupGameListeners(event: WebSocketEventMap['close']) {
        document.removeEventListener('keydown', handleAgarntInput);
    }

    function handleGameMessage(event: WebSocketEventMap['message']) {
    }

    function handleAgarntInput(event: KeyboardEvent) {

    }

    const websocketOptions = {
        onOpen: initGameListeners,
        onClose: cleanupGameListeners,
        onMessage: handleGameMessage,
        onError: (event: WebSocketEventMap['error']) => console.log("server made a fucky wucky UwU")
    };

    const {
        sendMessage,
        sendJsonMessage,
        readyState,
    } = useWebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL);

    return (
        //@ts-ignore
        <Canvas ref={canvasRef} orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
            <ambientLight />
            <AgarntPlayer color={'blue'} />
        </Canvas>
    );
};

export default AgarntPage;
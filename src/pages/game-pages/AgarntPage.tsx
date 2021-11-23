import React, { useRef, useState, useEffect } from 'react';
import { Canvas, RenderCallback } from '@react-three/fiber';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ungzip, gzip } from 'pako';
import AgarntPlayer from '../../components/agarnt/AgarntPlayer';
import {
    AgarntPlayerState,
    AgarntState,
    AgarntStateDTO,
    INITIAL_STATE,
    mapAgarntDTOToState,
} from '../../global/game-states/agarnt';
import RandomColorCircle from '../../components/agarnt/RandomColorCircle';
import encodeUtf8 from '../../global/util/encodeUtf8';
import decodeUtf8 from '../../global/util/decodeUtf8';
import GameLostOverlay from '../../components/agarnt/GameLostOverlay';

interface InputMap {
    UP: boolean;
    DOWN: boolean;
    LEFT: boolean;
    RIGHT: boolean;
}

interface InputMapDTO {
    U: boolean;
    D: boolean;
    L: boolean;
    R: boolean;
}

const mapInputToDTO = (data: InputMap) => {
    return {
        directions: {
            U: data.UP,
            D: data.DOWN,
            R: data.RIGHT,
            L: data.LEFT,
        },
    };
};

function AgarntPage() {
    const FOOD_RADIUS = 0.25;

    const canvasRef = useRef();
    const [connectState, setConnectState] = useState<ReadyState>(ReadyState.UNINSTANTIATED);
    const [gameState, setGameState] = useState<AgarntState>(INITIAL_STATE);
    const [currentInput] = useState<InputMap>({
        UP: false,
        DOWN: false,
        LEFT: false,
        RIGHT: false,
    });
    const [camera, setCamera] = useState({});

    useEffect(() => {
        //@ts-ignore
        canvasRef.current.width = window.innerWidth;
        //@ts-ignore
        canvasRef.current.height = window.innerHeight;
    });

    function initGameListeners(_event: WebSocketEventMap['open']) {
        document.addEventListener('keydown', handleAgarntKeyDown);
        document.addEventListener('keyup', handleAgarntKeyUp);
    }

    function cleanupGameListeners(_event: WebSocketEventMap['close']) {
        document.removeEventListener('keydown', handleAgarntKeyDown);
        document.removeEventListener('keyup', handleAgarntKeyUp);
    }

    async function handleGameMessage(event: WebSocketEventMap['message']) {
        if (event.data.error) {
            console.log('server made a fucky wucky');
        } else {
            const message = await event.data.arrayBuffer();
            const newStateDTO: AgarntStateDTO = JSON.parse(decodeUtf8(ungzip(message)));
            const newState = mapAgarntDTOToState(newStateDTO);
            if (camera) {
                //@ts-ignore
                camera.position.x = newState.player.x;
                //@ts-ignore
                camera.position.y = newState.player.y;
            }
            setGameState(newState);
        }
    }

    function handleAgarntKeyDown(event: KeyboardEvent) {
        //@ts-ignore
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                currentInput.UP = true;
                break;

            case 's':
            case 'ArrowDown':
                currentInput.DOWN = true;
                break;

            case 'd':
            case 'ArrowRight':
                currentInput.RIGHT = true;
                break;

            case 'a':
            case 'ArrowLeft':
                currentInput.LEFT = true;
                break;
        }
    }

    function handleAgarntKeyUp(event: KeyboardEvent) {
        //@ts-ignore
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                currentInput.UP = false;
                break;

            case 's':
            case 'ArrowDown':
                currentInput.DOWN = false;
                break;

            case 'd':
            case 'ArrowRight':
                currentInput.RIGHT = false;
                break;

            case 'a':
            case 'ArrowLeft':
                currentInput.LEFT = false;
                break;
        }
    }

    function reconnect() {}

    const websocketClosed = (state: ReadyState) =>
        state === ReadyState.CLOSING || state === ReadyState.CLOSED;

    const websocketOptions = {
        onOpen: initGameListeners,
        onClose: cleanupGameListeners,
        onMessage: handleGameMessage,
        //@ts-ignore
        onError: (_event: WebSocketEventMap['error']) =>
            console.log('server made a fucky wucky UwU'),
        shouldReconnect: (_event: any) =>
            connectState === ReadyState.CLOSING || connectState === ReadyState.CLOSED,
    };

    const gameSessionId = localStorage.getItem('agarnt-game-key') || '';
    const currentPlayerName = localStorage.getItem('player-name') || '';

    //@ts-ignore
    const websocketUrl = `${
        process.env.REACT_APP_API_WEBSOCKET_SERVER_URL
    }/join_to_game?session_id=${encodeURIComponent(gameSessionId)}&player_name=${encodeURIComponent(
        currentPlayerName
    )}`;

    const { sendMessage, readyState } = useWebSocket(websocketUrl, websocketOptions);
    // setConnectState(readyState); do not just set state here; this shit will re-render infinitely; first check if it changed

    const playerRenderFunc: RenderCallback = (state, _delta) => {
        if (!!!camera) {
            setCamera(state.camera);
        }
        const message = JSON.stringify(mapInputToDTO(currentInput));
        const compressedMessage = gzip(encodeUtf8(message));
        sendMessage(compressedMessage);
    };

    return (
        <>
            <Canvas
                //@ts-ignore
                ref={canvasRef}
                orthographic
                camera={{ zoom: 25, position: [0, 0, 100] }}
            >
                <ambientLight />
                {/* pass position and other stuff here, move it from agarnt player  */}
                <AgarntPlayer
                    position={[gameState.player.x, gameState.player.y, 0]}
                    currentRadius={gameState.player.radius}
                    frameCallback={playerRenderFunc}
                    playerName={currentPlayerName}
                />
                {
                    /* here we will render all of the other players */
                    gameState.players.map(
                        ({ radius, x, y, name }: AgarntPlayerState, index: number) => {
                            return (
                                <AgarntPlayer
                                    key={index}
                                    currentRadius={radius}
                                    position={[x, y, 0]}
                                    playerName={name}
                                />
                            );
                        }
                    )
                }
                {
                    /*and here will be foods*/
                    gameState.food.map((food: number[], index: number) => {
                        //@ts-ignore
                        return (
                            <RandomColorCircle
                                key={index}
                                args={[FOOD_RADIUS, 32]}
                                position={[food[0], food[1], 0]}
                            />
                        );
                    })
                }
            </Canvas>
            <GameLostOverlay
                open={
                    /*connectState === ReadyState.CLOSING || connectState === ReadyState.CLOSED*/ true
                }
                onClick={reconnect}
                waitTime={5}
                gameLostText="You were eaten!"
            />
        </>
    );
}

export default AgarntPage;

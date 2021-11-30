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
import { clampLower } from '../../global/util/mathUtils';
import GameLostScreen from '../../components/agarnt/GameLostScreen';

import DefaultBackground from '../../assets/images/default-background.jpeg';
import CanvasImage from '../../components/threejs/CanvasImage';

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
    const FOOD_RADIUS = 0.35;
    const BASE_ZOOM = 25;

    const canvasRef = useRef();
    const [gameState, setGameState] = useState<AgarntState>(INITIAL_STATE);
    const [currentInput] = useState<InputMap>({
        UP: false,
        DOWN: false,
        LEFT: false,
        RIGHT: false,
    });
    const [camera, setCamera] = useState(null);

    const websocketClosed = (state: ReadyState) =>
        state === ReadyState.CLOSING || state === ReadyState.CLOSED;

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
            if (camera && newState) {
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

    const websocketOptions = {
        onOpen: initGameListeners,
        onClose: cleanupGameListeners,
        onMessage: handleGameMessage,
        onError: (_event: WebSocketEventMap['error']) =>
            console.log('server made a fucky wucky UwU'),
    };

    const gameSessionId = localStorage.getItem('agarnt-game-key') || '';
    const currentPlayerName = localStorage.getItem('player-name') || '';

    const websocketUrl = `${
        process.env.REACT_APP_API_WEBSOCKET_SERVER_URL
    }/join_to_game?session_id=${encodeURIComponent(gameSessionId)}&player_name=${encodeURIComponent(
        currentPlayerName
    )}`;

    const { sendMessage, readyState } = useWebSocket(websocketUrl, websocketOptions);

    const playerRenderFunc: RenderCallback = (state, _delta) => {
        if (!!!camera) {
            setCamera(state.camera);
        }
        const message = JSON.stringify(mapInputToDTO(currentInput));
        const compressedMessage = gzip(encodeUtf8(message));
        sendMessage(compressedMessage);

        if (camera) {
            //@ts-ignore
            camera.zoom = BASE_ZOOM - gameState.player.radius;
            //@ts-ignore
            camera.updateProjectionMatrix();
        }
    };

    return (
        <>
            <h2 style={{ marginTop: 25, marginLeft: 25 }}>Score: {gameState.score}</h2>
            <Canvas
                //@ts-ignore
                ref={canvasRef}
                orthographic
                camera={{ zoom: 20, position: [0, 0, 100] }}
            >
                <ambientLight />
                {
                    /* here we will render all of the other players */
                    gameState.players.map(
                        ({ radius, x, y, name }: AgarntPlayerState, index: number) => {
                            return (
                                <AgarntPlayer
                                    key={index}
                                    currentRadius={radius}
                                    position={[x, y, radius]}
                                    playerName={name}
                                />
                            );
                        }
                    )
                }
                <AgarntPlayer
                    position={[gameState.player.x, gameState.player.y, gameState.player.radius]}
                    currentRadius={gameState.player.radius}
                    frameCallback={playerRenderFunc}
                    playerName={currentPlayerName}
                />
                {
                    /*and here will be foods*/
                    gameState.food.map((food: number[]) => {
                        return (
                            <RandomColorCircle
                                key={food.toString()}
                                args={[FOOD_RADIUS, 32]}
                                position={[food[0], food[1], FOOD_RADIUS]}
                            />
                        );
                    })
                }
            </Canvas>
            <GameLostScreen
                playerScore={gameState.score}
                open={websocketClosed(readyState)}
                onRetry={() => window.location.reload()}
                waitTime={5}
                gameLostText="You were eaten!"
            />
        </>
    );
}

export default AgarntPage;

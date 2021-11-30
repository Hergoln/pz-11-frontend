import React, { useRef, useState, useEffect } from 'react';
import { Canvas, RenderCallback } from '@react-three/fiber';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ungzip, gzip } from 'pako';
import { ScoreDisplay } from './styled';
import AgarntPlayer from '../../../components/agarnt/AgarntPlayer';
import {
    AgarntPlayerState,
    AgarntState,
    AgarntStateDTO,
    INITIAL_STATE,
    mapAgarntDTOToState,
} from '../../../global/game-states/agarnt';
import RandomColorCircle from '../../../components/agarnt/RandomColorCircle';
import encodeUtf8 from '../../../global/util/encodeUtf8';
import decodeUtf8 from '../../../global/util/decodeUtf8';
import { clampLower } from '../../../global/util/mathUtils';
import GameLostScreen from '../../../components/agarnt/GameLostScreen';

import DefaultBackground from '../../../assets/images/default-background.jpeg';
import CanvasImage from '../../../components/threejs/CanvasImage';
import { InputMap, mapInputToDTO } from './types';

function AgarntPage() {
    const RADIUS_SCALE_FACTOR = 5;
    const FOOD_RADIUS = 0.5 / RADIUS_SCALE_FACTOR;
    const BASE_ZOOM = 100;
    const MIN_ZOOM = 5;

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
                camera.position.x = newState.player.x / RADIUS_SCALE_FACTOR;
                //@ts-ignore
                camera.position.y = newState.player.y / RADIUS_SCALE_FACTOR;
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

    const scaleCameraZoom = (radius: number) => {
        //@ts-ignore
        camera.zoom = clampLower(BASE_ZOOM - radius * 1.5, MIN_ZOOM);
        //@ts-ignore
        camera.updateProjectionMatrix();
    };

    const playerRenderFunc: RenderCallback = (state, _delta) => {
        if (!!!camera) {
            setCamera(state.camera);
        }
        const message = JSON.stringify(mapInputToDTO(currentInput));
        const compressedMessage = gzip(encodeUtf8(message));
        sendMessage(compressedMessage);

        //todo: scale other players and food back up after eating a lot
        if (camera) scaleCameraZoom(gameState.player.radius);
    };

    return (
        <>
            <ScoreDisplay marginLeft={5} zIndex={9999}>
                Score: {gameState.score}
            </ScoreDisplay>
            <Canvas
                //@ts-ignore
                ref={canvasRef}
                orthographic
                camera={{ zoom: 20, position: [0, 0, 100] }}
            >
                <CanvasImage
                    img={DefaultBackground}
                    width={gameState.boardSize[0]}
                    height={gameState.boardSize[1]}
                />
                <ambientLight />
                {
                    /* here we will render all of the other players */
                    gameState.players.map(
                        ({ radius, x, y, name }: AgarntPlayerState, index: number) => {
                            return (
                                <AgarntPlayer
                                    key={index}
                                    currentRadius={radius / RADIUS_SCALE_FACTOR}
                                    position={[
                                        x / RADIUS_SCALE_FACTOR,
                                        y / RADIUS_SCALE_FACTOR,
                                        radius,
                                    ]}
                                    playerName={name}
                                />
                            );
                        }
                    )
                }
                <AgarntPlayer
                    position={[
                        gameState.player.x / RADIUS_SCALE_FACTOR,
                        gameState.player.y / RADIUS_SCALE_FACTOR,
                        gameState.player.radius,
                    ]}
                    currentRadius={gameState.player.radius / RADIUS_SCALE_FACTOR}
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
                                position={[
                                    food[0] / RADIUS_SCALE_FACTOR,
                                    food[1] / RADIUS_SCALE_FACTOR,
                                    FOOD_RADIUS,
                                ]}
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

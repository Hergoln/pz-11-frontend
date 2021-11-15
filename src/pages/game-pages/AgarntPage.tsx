import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, RenderCallback, useFrame, useThree } from '@react-three/fiber';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import AgarntPlayer from '../../players/AgarntPlayer';
import { AgarntPlayerState, INITIAL_STATE, Food } from '../../global/game-states/agarnt';
import getRandomCssColor from '../../global/util/getRandomCssColor';
import RandomColorCircle from '../../components/agarnt/RandomColorCircle';

interface InputMap {
    UP: boolean;
    DOWN: boolean;
    LEFT: boolean;
    RIGHT: boolean;
}

function AgarntPage() {

    //todo: use physics to move the circle around

    const FOOD_RADIUS = 0.1;

    const canvasRef = useRef();
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [currentInput, setCurrentInput] = useState<InputMap>({
        UP: false,
        DOWN: false,
        LEFT: false,
        RIGHT: false,
    });

    const playerColor = useMemo(() => getRandomCssColor(), []);

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

    function handleGameMessage(event: WebSocketEventMap['message']) {
        if (event.data.error) {
            console.log("server made a fucky wucky");
        } else {
            // console.log("response" + event.data.toString());
            const newState = JSON.parse(event.data);
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
        onError: (event: WebSocketEventMap['error']) => console.log("server made a fucky wucky UwU")
    };

    const gameSessionId = localStorage.getItem("agarnt-game-key");
    const currentPlayerName = localStorage.getItem("player-name");

    //@ts-ignore
    const websocketUrl = `${process.env.REACT_APP_API_WEBSOCKET_SERVER_URL}/join_to_game?session_id=${encodeURIComponent(gameSessionId)}&player_name=${encodeURIComponent(currentPlayerName)}`

    const {
        sendMessage,
    } = useWebSocket(websocketUrl, websocketOptions);

    const playerRenderFunc: RenderCallback = (_state, _delta) => {
        const message = JSON.stringify({
            directions: currentInput,
        });
        sendMessage(message);
        // console.log(gameState.player.x, gameState.player.y)
    };

    const { x, y, radius } = gameState.player;

    console.log(x, y);

    return (
        //@ts-ignore
        <Canvas ref={canvasRef} orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
            <ambientLight />
            {/* pass position and other stuff here, move it from agarnt player  */}
            <AgarntPlayer color={playerColor} position={[x, y, 0]} currentRadius={radius} frameCallback={playerRenderFunc} />
            {
                /* here we will render all of the other players */
                gameState.players.map(({ radius, x, y }: AgarntPlayerState, index: number) => {
                    //@ts-ignore
                    return <RandomColorCircle key={index} radius={radius} position={[x, y, 0]} />;
                })
            }
            {
                /*and here will be foods*/
                gameState.food.map((food: Food, index: number) => {
                    //todo: make agarnt player without camera that assigns its own color inside (to stop color flickering)
                    //@ts-ignore
                    return <RandomColorCircle key={index} radius={FOOD_RADIUS} position={[food[0], food[1], 0]} />;
                })
            }
        </Canvas>
    );
};

export default AgarntPage;
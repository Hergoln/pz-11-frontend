import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, RenderCallback, useFrame, useThree } from '@react-three/fiber';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import Circle from '../../components/threejs/Circle';
import AgarntPlayer from '../../players/AgarntPlayer';
import { AgarntPlayerState, INITIAL_STATE } from '../../global/game-states/agarnt';

function AgarntPage() {

    //todo: use physics to move the circle around

    const canvasRef = useRef();
    const [gameState, setGameState] = useState(INITIAL_STATE);
    const [moveDirection, setMoveDirection] = useState([0, 0]);
    const [playerPosition, setPlayerPosition] = useState([0, 0, 0]); //todo: randomize this shit

    const playerColor = useMemo(() => getRandomColor(), []);

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

    //note: this is a temporary useEffect to check if everything works correctly with inputs
    useEffect(() => {
        //@ts-ignore
        initGameListeners(null);
        //@ts-ignore
        return () => cleanupGameListeners(null);
    });

    function handleGameMessage(event: WebSocketEventMap['message']) {
        const newState = JSON.parse(event.data);
        setGameState(newState);
    }

    function handleAgarntKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                setMoveDirection([moveDirection[0], 1]);
                break;
            case 's':
                setMoveDirection([moveDirection[0], -1])
                break;
            case 'a':
                setMoveDirection([-1, moveDirection[1]])
                break;
            case 'd':
                setMoveDirection([1, moveDirection[1]])
                break;
        }
    }

    function handleAgarntKeyUp(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                setMoveDirection([moveDirection[0], 0]);
                break;
            case 's':
                setMoveDirection([moveDirection[0], 0])
                break;
            case 'a':
                setMoveDirection([0, moveDirection[1]])
                break;
            case 'd':
                setMoveDirection([0, moveDirection[1]])
                break;
        }
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const websocketOptions = {
        onOpen: initGameListeners,
        onClose: cleanupGameListeners,
        onMessage: handleGameMessage,
        onError: (event: WebSocketEventMap['error']) => console.log("server made a fucky wucky UwU")
    };

    // const {
    //     sendMessage,
    //     sendJsonMessage,
    //     readyState,
    // } = useWebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL, websocketOptions);

    const playerRenderFunc: RenderCallback = (_state, delta) => {
        const speed = 5;
        const translateX = moveDirection[0] * delta * speed;
        const translateY = moveDirection[1] * delta * speed;
        setPlayerPosition([playerPosition[0] + translateX, playerPosition[1] + translateY, playerPosition[2]]);
    };

    return (
        //@ts-ignore
        <Canvas ref={canvasRef} orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
            <ambientLight />
            {/* pass position and other stuff here, move it from agarnt player  */}
            <AgarntPlayer color={playerColor} position={playerPosition} frameCallback={playerRenderFunc} />
            {
                /* here we will render all of the other players */
                gameState.players.map((player: AgarntPlayerState) => {
                    //@ts-ignore
                    return <Circle color={getRandomColor()} args={[player.radius, 32]} position={[player.x, player.y, 0]} />;
                })
            }
            {
                /*and here will be foods*/
                gameState.foods.map((food: { x: number, y: number }) => {
                    //@ts-ignore
                    return <Circle color={getRandomColor()} args={[0.05, 32]} position={[food.x, food.y, 0]} />;
                })
            }
        </Canvas>
    );
};

export default AgarntPage;
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { WebsocketHandler } from '../../components/WebsocketHandler';
import Circle from '../../components/threejs/Circle';
import AgarntPlayer from '../../players/AgarntPlayer';

function AgarntPage() {

    //todo: use useMemo to instantiate AgarntPlayer and store its value
    //todo: use useMemo to instantiate Orthographic camera
    //todo: open websocket connection to the server and register callbacks
    //todo: use physics to move the circle around
    //todo: make circle more r o u n d
    //todo: increase canvas size to fit window size
    //todo: create a player movement vector (and set its directions on keyboard key press)

    const canvasRef = useRef();

    useEffect(() => {
        //@ts-ignore
        canvasRef.current.width = window.innerWidth;
        //@ts-ignore
        canvasRef.current.height = window.innerHeight;
    });

    return (
        //@ts-ignore
        <Canvas ref={canvasRef} orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
            <ambientLight />
            <AgarntPlayer color={'blue'} />
        </Canvas>
    );
};

export default AgarntPage;
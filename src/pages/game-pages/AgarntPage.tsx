import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { WebsocketHandler } from '../../components/WebsocketHandler';
import Circle from '../../components/threejs/Circle';

function AgarntPage() {

    //todo: use useMemo to instantiate AgarntPlayer and store its value
    //todo: use useMemo to instantiate Orthographic camera
    //todo: open websocket connection to the server and register callbacks
    //todo: use physics to move the circle around
    //todo: make circle more r o u n d
    //todo: increase canvas size to fit window size
    //todo: Circle should be just a shape, player should have its own circle (with updated positions through the keyboard listener)
    //todo: create a player movement vector (and set its directions on keyboard key press)


    return (
        <Canvas>
            <ambientLight />
            <Circle position={[1, 1, 0]} />
        </Canvas>
    );
};

export default AgarntPage;
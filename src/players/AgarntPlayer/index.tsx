//@ts-nocheck
import React, { useRef, useEffect, useState, useMemo, KeyboardEvent } from 'react';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { useThree, useFrame, use, RenderCallback } from '@react-three/fiber';
import Circle from '../../components/threejs/Circle';

interface PlayerProps {
    color: string;
    position: number[3];
    currentRadius: number;
    frameCallback: RenderCallback;
}

const START_RADIUS = 0.2;

const AgarntPlayer = ({ color, position, currentRadius, frameCallback }: PlayerProps) => {

    const { camera } = useThree();

    const cameraSmoothTween = useMemo(() => new TWEEN.Tween(camera.position), [camera]);

    //todo: create a function calculating speed in relation to radius

    useFrame((_state, _delta) => {
        frameCallback?.(_state, _delta);
        TWEEN.update();
        cameraSmoothTween.to(
            {
                x: position[0],
                y: position[1],
                z: camera.position.z
            }, 0).
            start();
    });

    return <Circle color={color} args={[currentRadius, 32]} position={position} />;
};

export default AgarntPlayer;
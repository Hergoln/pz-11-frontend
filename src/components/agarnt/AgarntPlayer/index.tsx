//@ts-nocheck
import React, { useRef, useEffect, useState, useMemo, KeyboardEvent } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { useThree, useFrame, useLoader, RenderCallback } from '@react-three/fiber';
import RandomColorCircle from '../RandomColorCircle';
import Text from '../../threejs/Text';
import Roboto from '../../../assets/fonts/Roboto_Regular.json';


interface PlayerProps {
    position: number[];
    currentRadius: number;
    playerName: string;
    cameraShouldFollow?: boolean;
    frameCallback?: RenderCallback;
}

const START_NAME_SIZE = 0.5;

const AgarntPlayer = ({ position, currentRadius, cameraShouldFollow, playerName, frameCallback }: PlayerProps) => {

    const { camera } = useThree();

    const cameraSmoothTween = useMemo(() => new TWEEN.Tween(camera.position), [camera]);
    const nameFont = useMemo(() => {
        return new FontLoader().parse(Roboto); //i know there is useLoader but there was a whole lot of shit going on with this so lets leave it as useMemo
    }, []);

    useFrame((_state, _delta) => {
        frameCallback?.(_state, _delta);
        if (cameraShouldFollow) {
            TWEEN.update();
            cameraSmoothTween.to(
                {
                    x: position[0],
                    y: position[1],
                    z: camera.position.z
                }, 0).
                start();
        }
    });

    return (
        <group>
            <RandomColorCircle args={[currentRadius, 32]} position={position} />
            <Text displayText={playerName} font={nameFont} size={currentRadius / 3} height={1} position={[position[0], position[1]]} />
        </group>
    );
};

export default AgarntPlayer;
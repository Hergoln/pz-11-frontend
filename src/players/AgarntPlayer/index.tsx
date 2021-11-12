//@ts-nocheck
import React, { useRef, useEffect, useState, useMemo, KeyboardEvent } from 'react';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { useThree, useFrame, use, RenderCallback } from '@react-three/fiber';
import Circle from '../../components/threejs/Circle';

interface PlayerProps {
    color: string;
    position: number[3];
    frameCallback: RenderCallback;
}

const START_RADIUS = 0.2;

const AgarntPlayer = ({ color, position, frameCallback }: PlayerProps) => {
    const circleRef = useRef();


    const { camera } = useThree();

    const cameraSmoothTween = useMemo(() => new TWEEN.Tween(camera.position), [camera]);

    const [radius, setRadius] = useState(START_RADIUS);

    //todo: create a function calculating speed in relation to radius

    useFrame(frameCallback);

    useFrame((_state, _delta) => {
        TWEEN.update();
        cameraSmoothTween.to(
            {
                x: circleRef.current.position.x,
                y: circleRef.current.position.y,
                z: camera.position.z
            }, 100).
            easing(TWEEN.Easing.Cubic.Out).
            start();
    });

    return <Circle color={color} args={[radius, 32]} ref={circleRef} position={position} />;
};

export default AgarntPlayer;
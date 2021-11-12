//@ts-nocheck
import React, { useRef, useEffect, useState, useMemo, KeyboardEvent } from 'react';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { useThree, useFrame, use } from '@react-three/fiber';
import Circle from '../../components/threejs/Circle';

interface PlayerProps {
    color: string;
}

const START_RADIUS = 0.2;

const AgarntPlayer = ({ color }: PlayerProps) => {
    const circleRef = useRef();


    const { camera } = useThree();

    const cameraSmoothTween = useMemo(() => {
        console.log("henlo");
        return new TWEEN.Tween(camera.position);
    }, [camera]);

    const [moveDirection, setMoveDirection] = useState([0, 0]);
    const [radius, setRadius] = useState(START_RADIUS);

    //todo: create a function calculating speed in relation to radius
    const speed = 5;

    function moveCircle(event: KeyboardEvent) {
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

    function clearMoveDirection(event: KeyboardEvent) {
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

    useEffect(() => {
        document.addEventListener('keydown', moveCircle);
        document.addEventListener('keyup', clearMoveDirection);
        return () => {
            document.removeEventListener('keydown', moveCircle);
            document.removeEventListener('keyup', clearMoveDirection);
        };
    });

    useFrame((state, delta) => {
        TWEEN.update();
        const translateX = moveDirection[0] * delta * speed;
        const translateY = moveDirection[1] * delta * speed;
        circleRef.current.translateX(translateX);
        circleRef.current.translateY(translateY);
        cameraSmoothTween.to(
            {
                x: circleRef.current.position.x,
                y: circleRef.current.position.y,
                z: camera.position.z
            }, 100).
            easing(TWEEN.Easing.Cubic.Out).
            start();
    });

    return <Circle color={color} args={[radius, 32]} ref={circleRef} />;
};

export default AgarntPlayer;
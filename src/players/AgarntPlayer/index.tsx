//@ts-nocheck
import React, { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import Circle from '../../components/threejs/Circle';

interface PlayerProps {
    color: string;
}

const START_RADIUS = 0.2;

const AgarntPlayer = ({ color }: PlayerProps) => {
    const circleRef = useRef();

    const { camera } = useThree();
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
        const translateX = moveDirection[0] * delta * speed;
        const translateY = moveDirection[1] * delta * speed;
        circleRef.current.translateX(translateX);
        circleRef.current.translateY(translateY);
        //todo: remake this to use lerp maybe?
        const z = camera.position.z;
        const pos = camera.position.lerpVectors(camera.position, circleRef.current.position, 0.25);
        pos.z = z;
    });

    return <Circle color={'blue'} args={[radius, 32]} ref={circleRef} />;
};

export default AgarntPlayer;
import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'


const Circle = (props) => {

    const ref = useRef();

    const step = 0.2;

    function moveCircle(event) {
        switch (event.key) {
            case 'w':
                //@ts-ignore
                ref.current.position.y += step
                break;
            case 's':
                //@ts-ignore
                ref.current.position.y += -step
                break;
            case 'a':
                //@ts-ignore
                ref.current.position.x += -step
                break;
            case 'd':
                //@ts-ignore
                ref.current.position.x += step
                break;
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', moveCircle);
        return () => {
            document.removeEventListener('keydown', moveCircle);
        };
    });

    return (
        <mesh {...props} ref={ref}>
            <circleGeometry radius={50} segments={32} />
            <meshStandardMaterial color={'red'} />
        </mesh>
    );
};

export default Circle;
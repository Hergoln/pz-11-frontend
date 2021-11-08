import React, { useRef, useEffect, KeyboardEvent } from 'react';
import Circle from '../../components/threejs/Circle';

const AgarntPlayer = () => {
    const circleRef = useRef();

    const step = 0.2;

    //@ts-ignore
    function moveCircle(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                //@ts-ignore
                circleRef.current.position.y += step
                break;
            case 's':
                //@ts-ignore
                circleRef.current.position.y += -step
                break;
            case 'a':
                //@ts-ignore
                circleRef.current.position.x += -step
                break;
            case 'd':
                //@ts-ignore
                circleRef.current.position.x += step
                break;
        }
    }

    useEffect(() => {
        //@ts-ignore
        document.addEventListener('keydown', moveCircle);
        return () => {
            //@ts-ignore
            document.removeEventListener('keydown', moveCircle);
        };
    });

    //@ts-ignore
    return <Circle radius={32} color={'red'} segments={32} ref={circleRef} />;
};

export default AgarntPlayer;
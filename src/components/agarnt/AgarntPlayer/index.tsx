//@ts-nocheck
import { useMemo } from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { useFrame, RenderCallback } from '@react-three/fiber';
import RandomColorCircle from '../RandomColorCircle';
import Text from '../../threejs/Text';
import Roboto from '../../../assets/fonts/Roboto_Regular.json';


interface PlayerProps {
    position: number[];
    currentRadius: number;
    playerName: string;
    frameCallback?: RenderCallback;
}

const AgarntPlayer = ({ position, currentRadius, playerName, frameCallback }: PlayerProps) => {

    const nameFont = useMemo(() => {
        return new FontLoader().parse(Roboto); //i know there is useLoader but there was a whole lot of shit going on with this so lets leave it as useMemo
    }, []);

    useFrame((_state, _delta) => {
        frameCallback?.(_state, _delta);
    });

    return (
        <group>
            <RandomColorCircle args={[currentRadius, 32]} position={position} />
            <Text displayText={playerName} font={nameFont} size={currentRadius / 3} height={1} position={[position[0], position[1]]} />
        </group>
    );
};

export default AgarntPlayer;
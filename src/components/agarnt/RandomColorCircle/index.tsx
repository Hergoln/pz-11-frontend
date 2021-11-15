import React, { useMemo } from 'react';
import Circle from '../../threejs/Circle';
import getRandomCssColor from '../../../global/util/getRandomCssColor';

interface CircleProps {
    position: number[];
    radius: number;
}

const RandomColorCircle = ({ position, radius }: CircleProps) => {

    const color = useMemo(() => getRandomCssColor(), []);

    //@ts-ignore
    return <Circle args={[radius, 32]} position={position} color={color} />
};

export default RandomColorCircle;
import React, { useMemo } from 'react';
import Circle from '../../threejs/Circle';
import getRandomCssColor from '../../../global/util/getRandomCssColor';

interface CircleProps {
    position: number[];
    args: any[];
}

const RandomColorCircle = ({ position, args }: CircleProps) => {

    const color = useMemo(() => getRandomCssColor(), []);

    //@ts-ignore
    return <Circle args={args} position={position} color={color} />
};

export default RandomColorCircle;
import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

export default function CanvasImage({ width, height, img }) {
    const texture = useLoader(THREE.TextureLoader, img);
    console.log(texture);
    return (
        <mesh>
            <planeBufferGeometry args={[width, height]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}

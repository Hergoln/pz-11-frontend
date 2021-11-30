import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

export default function CanvasImage({ width, height, img }) {
    const texture = useMemo(() => {
        return new THREE.TextureLoader().load(img);
    }, [img]);
    return (
        <mesh>
            <planeBufferGeometry args={[width, height]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}

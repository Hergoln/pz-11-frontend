import * as THREE from 'three';
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

extend({ TextGeometry });

export default function Text({
    displayText,
    font,
    size = 14,
    height = 5,
    position = [0, 0],
    hAlign = 'center',
    vAlign = 'center',
    color = 'black',
}) {
    const meshRef = useRef();
    const fontConfig = useMemo(() => {
        return {
            font: font,
            size: size,
            height: height,
        };
    }, [font, size, height]);

    useLayoutEffect(() => {
        const size = new THREE.Vector3();
        meshRef.current.geometry.computeBoundingBox();
        meshRef.current.geometry.boundingBox.getSize(size);
        meshRef.current.position.x =
            hAlign === 'center'
                ? position[0] - size.x / 2
                : hAlign === 'right'
                ? position[0] + size.x / 2
                : position[0];
        meshRef.current.position.y =
            vAlign === 'center'
                ? position[1] - size.y / 2
                : vAlign === 'bottom'
                ? position[0] + size.y / 2
                : position[0];
    });

    return (
        <mesh ref={meshRef} position={position}>
            <textGeometry args={[displayText, fontConfig]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
}

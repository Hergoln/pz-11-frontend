import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'


const Circle = React.forwardRef((props, ref) => (
    <mesh {...props} ref={ref}>
        <circleGeometry radius={props.radius} segments={props.segments} />
        <meshStandardMaterial color={props.color} />
    </mesh>
));

export default Circle;
import React from 'react'


const Circle = React.forwardRef(({ color, args, ...props }, ref) => {
    return (
        <mesh {...props} ref={ref}>
            <circleGeometry args={args} attach="geometry" />
            <meshStandardMaterial color={color} attach="material" />
        </mesh>
    )
});

export default Circle;
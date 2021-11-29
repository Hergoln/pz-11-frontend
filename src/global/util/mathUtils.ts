

const clamp = (value: number, min: number, max: number) => 
    value > max ? max : (value < min ? min : value);

const clampUpper = (value: number, max: number) => value > max ? max : value;
const clampLower = (value: number, min: number) => value < min ? min : value;

export { clamp, clampLower, clampUpper };
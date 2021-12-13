const clamp = (value: number, min: number, max: number) =>
    value > max ? max : value < min ? min : value;

const clampUpper = (value: number, max: number) => (value > max ? max : value);
const clampLower = (value: number, min: number) => (value < min ? min : value);

const clampWrapping = (value: number, min: number, max: number) =>
    value > max ? min : value < min ? max : value;

export { clamp, clampLower, clampUpper, clampWrapping };

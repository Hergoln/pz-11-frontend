import randomFromRange from './randomFromRange';

export default function getRandomCssColor(lowerBound: number, upperBound: number) {
    const r = Math.floor(randomFromRange(lowerBound, upperBound));
    const g = Math.floor(randomFromRange(lowerBound, upperBound));
    const b = Math.floor(randomFromRange(lowerBound, upperBound));
    return `rgb(${r}, ${g}, ${b})`;
}

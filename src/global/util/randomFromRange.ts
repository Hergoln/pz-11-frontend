export default function randomFromRange(lowerBound: number, upperBound: number) {
    return Math.random() * (upperBound - lowerBound) + lowerBound;
}

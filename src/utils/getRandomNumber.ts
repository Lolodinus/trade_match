export function getRandomNumber(maxValue: number, minValue: number = 0,) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}